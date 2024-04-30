"use client";

import AvatarCircle from "../../../../../../components/avatar-circle";
import { getUser } from "@/app/(tabs)/profile/[id]/[[...slug]]/actions";
import { useEffect, useRef, useState } from "react";
import { User } from "@prisma/client";
import FormButton from "@/components/form-button";
import BackButton from "@/components/back-button";
import { CameraIcon } from "@heroicons/react/24/outline";
import TextInput from "@/components/text-input";
import { useFormState } from "react-dom";
import { updateProfile } from "./actions";
import { getUploadUrl } from "@/app/(tabs)/tweets/add/components/actions";
import Image from "next/image";

export default function ProfileEdit() {
  const [user, setUser] = useState<User>();
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [uploadAvatarUrl, setUploadAvatarUrl] = useState<string>();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [coverPreview, setCoverPreview] = useState<string>();
  const [uploadCoverUrl, setUploadCoverUrl] = useState<string>();
  const [coverUrl, setCoverUrl] = useState<string>();
  const [coverFile, setCoverFile] = useState<File>();

  useEffect(() => {
    getUser().then((user) => setUser(user));
  }, []);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textRef = textareaRef.current;
    if (textRef) {
      textRef.style.height = `auto`;
      textRef.style.height = `${textRef.scrollHeight}px`;
    }
  };

  const onAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);

    setAvatarPreview(url);
    setAvatarFile(file);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadAvatarUrl(uploadURL);
      setAvatarUrl(
        `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL}/${id}`
      );
    }
  };

  const onCoverChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);

    setCoverPreview(url);
    setCoverFile(file);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadCoverUrl(uploadURL);
      setCoverUrl(
        `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DELIVERY_URL}/${id}`
      );
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    if (avatarFile && uploadAvatarUrl && avatarUrl) {
      const cloudflareForm = new FormData();
      cloudflareForm.append("file", avatarFile);
      const response = await fetch(uploadAvatarUrl, {
        method: "post",
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
      formData.set("avatar", avatarUrl);
    }
    if (coverFile && uploadCoverUrl && coverUrl) {
      const cloudflareForm = new FormData();
      cloudflareForm.append("file", coverFile);
      const response = await fetch(uploadCoverUrl, {
        method: "post",
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
      formData.set("cover", coverUrl);
    }

    return updateProfile(_, formData);
  };

  const [state, dispatch] = useFormState(interceptAction, null);

  return (
    <>
      <div className="h-14">
        <BackButton />
      </div>
      <div className="flex flex-col item-center pb-8 gap-4 relative">
        <label
          htmlFor="cover"
          className="relative bg-white cursor-pointer flex justify-center items-center group"
        >
          {coverPreview ? (
            <div
              style={{
                backgroundImage: `url(${coverPreview})`,
                objectFit: "cover",
              }}
              className="h-40 w-full"
            ></div>
          ) : user?.cover ? (
            <Image
              src={`${user?.cover}/public`}
              alt="cover"
              width={640}
              height={640}
              style={{ objectFit: "cover" }}
              className="h-40 w-full"
            />
          ) : (
            <div className="bg-[#CFD9DE] h-40 w-full flex justify-center items-center"></div>
          )}
          <CameraIcon className="absolute size-12 rounded-full bg-slate-900 opacity-80 p-3 text-white stroke-2 group-hover:bg-neutral-600" />
        </label>

        <input
          onChange={onCoverChange}
          type="file"
          multiple
          id="cover"
          name="cover"
          accept="image/*"
          className="hidden"
        />

        <label
          htmlFor="avatar"
          className="absolute top-28 left-4 bg-white rounded-full size-30 p-1 cursor-pointer flex justify-center items-center group"
        >
          {avatarPreview ? (
            <div
              style={{
                backgroundImage: `url(${avatarPreview})`,
              }}
              className="size-28 border-neutral-300 bg-cover rounded-full relative"
            ></div>
          ) : (
            <AvatarCircle avatarUrl={user?.avatar} size={28} />
          )}
          <div
            className="absolute rounded-full size-30 p-1
          cursor-pointer flex justify-center items-center pointer-events-none group"
          >
            <CameraIcon className="size-12 rounded-full bg-slate-900 opacity-80 p-3 text-white stroke-2 group-hover:bg-neutral-600" />
          </div>
        </label>

        <input
          onChange={onAvatarChange}
          type="file"
          multiple
          id="avatar"
          name="avatar"
          accept="image/*"
          className="hidden"
        />
        <div className="pt-12" />
        <div className="font-bold min-h-10 text-lg px-6">{user?.username}</div>
        <form action={dispatch} className="flex flex-col gap-3 px-5">
          <TextInput
            name={"bio"}
            displayName="자기소개"
            className="min-h-32 border border-neutral-300 rounded-md"
            onChange={handleResizeHeight}
            onFocus={handleResizeHeight}
            ref={textareaRef}
            defaultValue={user?.bio ?? ""}
            errors={state?.fieldErrors.bio}
          />

          <div className="absolute -top-14 right-0 pr-6">
            <FormButton
              text="저장"
              hasOverlay={true}
              className="w-32 mt-2 rounded-full  hover:scale-110 active:scale-95 transition"
            />
          </div>
        </form>
      </div>
    </>
  );
}
