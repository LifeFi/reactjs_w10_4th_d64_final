import Link from "next/link";
import { getUser, logOut } from "./actions";
import AvatarCircle from "@/components/avatar-circle";
import ProfileEdit from "@/app/(tabs)/profile/[id]/[[...slug]]/components/profile-edit";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import ModalButton from "@/components/modal-button";
import LogoutButton from "@/components/logout-button";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TweetsList from "@/components/tweets-list";
import {
  GetMoreTweetsOptionsProps,
  getMoreTweets,
} from "../../../home/actions";

export default async function Profile({
  params: { id, slug },
}: {
  params: { id: number; slug: string[] | undefined };
}) {
  console.log(slug);
  const userId = Number(id);
  const user = await getUser(userId);

  const tabs = ["tweets", "replies", "likes", "edit"];
  const tab = slug && tabs.includes(slug[0]) ? slug[0] : "tweets";
  const options: GetMoreTweetsOptionsProps = {
    userId,
    filter: tab === "tweets" ? "all" : tab === "replies" ? "replies" : "likes",
  };
  const initialTweets = await getMoreTweets(0, options);

  return (
    <>
      {tab === "edit" ? (
        <ProfileEdit />
      ) : (
        <div className="flex flex-col item-center pb-8 gap-4 relative">
          {user?.cover ? (
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
          {user?.isMe ? (
            <ModalButton
              icon={
                <Cog6ToothIcon className=" absolute size-10 right-4 top-4 cursor-pointer bg-neutral-50 hover:bg-neutral-200 rounded-full p-1" />
              }
              // isDefaultOpen={true}
            >
              <div className="bg-white w-96 h-40 p-3 flex flex-col items-center rounded-xl">
                <div className="text-lg">설정</div>
                {/* 서버 컴포넌트에서 onClick 버튼 넣으니 오류 나서, 컴포넌트로 분리하니 문제 해결됨. */}
                <div className="flex pt-8 gap-3 mr-6">
                  <ArrowRightStartOnRectangleIcon className="size-6" />
                  <LogoutButton />
                </div>
              </div>
            </ModalButton>
          ) : null}

          <div className="absolute top-28 left-4 bg-white rounded-full size-30 p-1">
            <AvatarCircle avatarUrl={user?.avatar} size={28} />
          </div>
          {user?.isMe ? (
            <Link
              href={`/profile/${id}/edit`}
              className="self-end rounded-full border border-neutral-300 text-sm font-bold py-2 px-4 mr-4 hover:bg-neutral-200 transition"
            >
              프로필 수정
            </Link>
          ) : null}

          <div className="font-bold min-h-10  text-lg mb-5 px-6">
            {user?.username}
          </div>
          <div className="px-6 min-h-10 whitespace-pre-wrap">{user?.bio}</div>
          <div className="grid grid-cols-3 *:flex *:justify-center hover:*:bg-neutral-200 *:py-2 border-b *:transition cursor-pointer">
            <Link
              href={`/profile/${id}`}
              className={`${
                tab === "tweets" ? "font-bold border-b-4 border-blue-400" : ""
              }`}
            >
              게시물
            </Link>
            <Link
              href={`/profile/${id}/replies`}
              className={`${
                tab === "replies" ? "font-bold border-b-4 border-blue-400" : ""
              }`}
            >
              답글
            </Link>
            <Link
              href={`/profile/${id}/likes`}
              className={`${
                tab === "likes" ? "font-bold border-b-4 border-blue-400" : ""
              }`}
            >
              마음에 들어요
            </Link>
          </div>

          <TweetsList initialTweets={initialTweets} options={options} />
        </div>
      )}
    </>
  );
}
