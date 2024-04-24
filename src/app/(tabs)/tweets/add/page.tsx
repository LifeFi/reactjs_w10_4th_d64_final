"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import { getUploadUrl, postTweet } from "./actions";
import FormButton from "@/components/form-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TweetType, tweetSchema } from "./schema";
import TextInput from "@/components/text-input";

export default function Add() {
  const [previews, setPreviews] = useState<string[]>([]);
  // 객체 리스트로 만들면 더 간단해질 듯.
  const [uploadPhotoUrls, setUploadPhotoUrls] = useState<string[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<TweetType>({
    resolver: zodResolver(tweetSchema),
  });
  setValue("photos", "");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { onChange, ref } = register("content");

  const handleResizeHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textRef = textareaRef.current;
    if (textRef) {
      textRef.style.height = `auto`;
      textRef.style.height = `${textRef.scrollHeight}px`;
    }
    onChange(event); // React Hook Form의 onChange 실행
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    const uploadFiles = Array.from(files);

    setPreviews((prev) => [...prev, ...urls]);
    setPhotoFiles((prev) => [...prev, ...uploadFiles]);

    const uploadUrls: string[] = [];
    const downloadUrls: string[] = [];

    const getUploadUrlsPromises = uploadFiles.map(async (file) => {
      return getUploadUrl().then(({ success, result }) => {
        if (success) {
          const { id, uploadURL } = result;
          uploadUrls.push(uploadURL);
          downloadUrls.push(
            `https://imagedelivery.net/OBj4-AubflPByVfhX39jxA/${id}`
          );
        }
      });
    });
    await Promise.all(getUploadUrlsPromises);

    setUploadPhotoUrls((prev) => [...prev, ...uploadUrls]);
    setPhotoUrls((prev) => [...prev, ...downloadUrls]);
  };
  /*   useEffect(() => {
    console.log("useEffect / photoUrls", photoUrls);
    console.log("useEffect / photoFiles", photoFiles);
    console.log("useEffect / uploadPhotoUrls", uploadPhotoUrls);
  }, [photoUrls]); */

  const removePhoto = (index: number) => {
    setPreviews((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    setPhotoFiles((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
    setUploadPhotoUrls((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
    setPhotoUrls((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const onSubmit = handleSubmit(async (data: TweetType) => {
    console.log("handleSubit called!!!!!!!");

    if (photoFiles) {
      const uploadPhotoPromises = photoFiles.map((file, index) => {
        const cloudflareForm = new FormData();
        // const metadata = {
        //   description: "reactjs-w10-4th-d64-final-project",
        // };

        cloudflareForm.append("file", file);
        // !! 메타 데이터 추가 계속 실패 => 추후 다시 시도
        // cloudflareForm.append("metadata", JSON.stringify(metadata));
        return fetch(uploadPhotoUrls[index], {
          method: "post",
          body: cloudflareForm,
        });
      });
      const uploadPhotoResponses = await Promise.all(uploadPhotoPromises);
      for (const response of uploadPhotoResponses) {
        if (response.status !== 200) {
          return;
        }
      }
    }

    const formData = new FormData();
    // console.log("data", data);
    formData.append("content", data.content);
    formData.append("photos", JSON.stringify(photoUrls));
    // formData.append("photos", "포토 리스트");
    // console.log("formData.content", formData.getAll("content"));
    // console.log("formData.photos", formData.getAll("photos"));
    const errors = await postTweet(formData);
    if (errors) {
      console.log("errors", errors);
      // setError("")
    }
  });

  const onValid = async () => {
    // if (getValues("photos")) {
    //   setValue("photos", "포토 리스트");
    // }
    // console.log(getValues());

    await onSubmit();
  };

  return (
    <div>
      <div>Tweet Add</div>
      <form action={onValid} className="flex flex-col">
        {previews.length > 0 ? (
          <div className="flex overflow-x-scroll gap-1 transition">
            {previews.map((preview, index) => {
              // console.log("previews", previews);
              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${preview})`,
                  }}
                  className="size-80 aspect-square border-neutral-300 bg-cover rounded-2xl relative"
                >
                  <div
                    onClick={() => {
                      // console.log("removePhoto", index);
                      return removePhoto(index);
                    }}
                    className="size-10 absolute right-2 top-2 bg-gray-600 rounded-full cursor-pointer"
                  >
                    <XMarkIcon className="text-white" />
                  </div>
                </div>
              );
            })}
            <div className="text-neutral-400 text-sm">
              {errors.photos?.message ?? ""}
            </div>
          </div>
        ) : null}

        <TextInput
          // name 을 위해서 register
          // - onChange, ref 는 아래에서 overrinding
          {...register("content")}
          onChange={handleResizeHeight}
          ref={(element) => {
            ref(element);
            textareaRef.current = element;
          }}
          placeholder="무슨 일이 일어나고 있나요?"
          required
          className="overflow-y-hidden "
        />

        <label htmlFor="photos">
          <PhotoIcon className="w-10 cursor-pointer" />
        </label>
        <input
          onChange={onImageChange}
          type="file"
          multiple
          id="photos"
          name="photos"
          accept="image/*"
          className="hidden"
        />
        <FormButton text="게시하기" />
      </form>
    </div>
  );
}
