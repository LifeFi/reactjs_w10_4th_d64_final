"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import { getUploadUrl, postTweet } from "./actions";
import FormButton from "@/components/form-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TweetType, tweetSchema } from "./schema";
import TextInput from "@/components/text-input";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
            `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL}/${id}`
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
    console.log("handleSubmit called!!!!!!!");

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
    const tweet: any = await postTweet(formData);

    if (tweet instanceof Error) {
      console.log("errors : ", errors);
      // setError("")
    } else {
      router.replace(`/tweets/${tweet.id}`);
    }
  });

  const onValid = async () => {
    // if (getValues("photos")) {
    //   setValue("photos", "포토 리스트");
    // }
    // console.log(getValues());

    await onSubmit();
    // console.log("tweet", tweet);
    // router.replace(`/tweets/${tweet.id}`);
  };

  return (
    <div className="flex flex-col item-center py-4 px-6 gap-4">
      <div className="flex w-full justify-center min-h-6"></div>
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
          className="border-none min-h-28 rounded-md my-2"
        />

        <label htmlFor="photos">
          <PhotoIcon className="w-12 cursor-pointer text-twitter-blue rounded-full p-2 hover:bg-blue-50" />
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
        <div className="fixed top-2 left-1/2 -translate-x-1/2 w-full max-w-screen-sm flex justify-end pr-6">
          <FormButton
            text="게시하기"
            className="w-32 rounded-full hover:scale-110 active:scale-95 transition"
          />
        </div>
      </form>
    </div>
  );
}
