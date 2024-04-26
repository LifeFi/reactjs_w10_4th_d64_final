"use client";

import Link from "next/link";
import AvatarCircle from "../../../../../components/avatar-circle";
import { getUser } from "@/app/(tabs)/profile/[[...slug]]/actions";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import FormButton from "@/components/form-button";
import BackButton from "@/components/back-button";
import { ArrowLeftIcon, CameraIcon } from "@heroicons/react/24/outline";
import Input from "@/components/input";
import TextInput from "@/components/text-input";

export default function ProfileEdit() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then((user) => setUser(user));
  }, []);

  return (
    <>
      <div className="h-14">
        <BackButton />
      </div>
      <div className="flex flex-col item-center pb-8 gap-4 relative">
        <div className="bg-[#CFD9DE] h-40 flex justify-center items-center">
          <CameraIcon className="size-12 rounded-full bg-slate-900 opacity-50 p-3 text-white stroke-2" />
        </div>

        <div className="absolute top-28 left-4 bg-white rounded-full size-30 p-1">
          <AvatarCircle avatarUrl={user?.avatar} size={28} />
        </div>
        <div className="pt-12" />
        <div className="font-bold min-h-10 text-lg px-6">{user?.username}</div>
        <TextInput
          name={"bio"}
          displayName="자기소개"
          className="min-h-32"
          defaultValue={user?.bio ?? ""}
        />

        <div className="fixed top-2 left-1/2 -translate-x-1/2 w-full max-w-screen-sm flex justify-end pr-6">
          <FormButton
            text="저장"
            className="w-32 rounded-full  hover:scale-110 active:scale-95 transition"
          />
        </div>
      </div>
    </>
  );
}
