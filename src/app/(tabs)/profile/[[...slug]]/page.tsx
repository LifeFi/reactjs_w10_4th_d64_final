import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser } from "./actions";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import AvatarCircle from "@/components/avatar-circle";
import ProfileEdit from "@/app/(tabs)/profile/[[...slug]]/_components/profile-edit";
import { CameraIcon } from "@heroicons/react/24/outline";

export default async function Profile({
  params: { slug },
}: {
  params: { slug: string[] | undefined };
}) {
  console.log(slug);
  const user = await getUser();
  const tabs = ["tweets", "replies", "likes", "edit"];
  const tab = slug && tabs.includes(slug[0]) ? slug[0] : "tweets";

  return (
    <>
      {tab === "edit" ? (
        <ProfileEdit />
      ) : (
        <div className="flex flex-col item-center pb-8 gap-4 relative">
          <div className="bg-[#CFD9DE] h-40"></div>
          <div className="absolute top-28 left-4 bg-white rounded-full size-30 p-1">
            <AvatarCircle avatarUrl={user?.avatar} size={28} />
          </div>
          <Link
            href="/profile/edit"
            className="self-end rounded-full border border-neutral-300 text-sm font-bold py-2 px-4 mr-4 hover:bg-neutral-200 transition"
          >
            프로필 수정
          </Link>
          <div className="font-bold min-h-10  text-lg mb-5 px-6">
            {user?.username}
          </div>
          <div className="px-6 min-h-10">{user?.bio}</div>
          <div className="grid grid-cols-3 *:flex *:justify-center hover:*:bg-neutral-200 *:py-2 border-b *:transition cursor-pointer">
            <Link
              href="/profile"
              className={`${
                tab === "tweets" ? "font-bold border-b-4 border-blue-400" : ""
              }`}
            >
              게시물
            </Link>
            <Link
              href="/profile/replies"
              className={`${
                tab === "replies" ? "font-bold border-b-4 border-blue-400" : ""
              }`}
            >
              답글
            </Link>
            <Link
              href="/profile/likes"
              className={`${
                tab === "likes" ? "font-bold border-b-4 border-blue-400" : ""
              }`}
            >
              마음에 들어요
            </Link>
          </div>

          <div></div>
        </div>
      )}
    </>
  );
}
