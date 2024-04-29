import AvatarCircle from "@/components/avatar-circle";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { getMoreTweets, revalidateHome } from "./actions";
import TweetsList from "@/components/tweets-list";
import { getUser } from "../profile/[id]/[[...slug]]/actions";
import ModalButton from "@/components/modal-button";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import LogoutButton from "@/components/logout-button";
import logoImg from "/public/ox-logo.png";

export default async function Home() {
  const initialTweets = await getMoreTweets(0);
  const user = await getUser();
  console.log(initialTweets);
  return (
    <>
      <div className="flex flex-col item-center py-4 gap-4">
        <div className="flex justify-center relative">
          <form action={revalidateHome}>
            <button className="hover:bg-blue-50 rounded-full transition">
              <Image src={logoImg} alt="ox-logo.png" width={80} height={80} />
            </button>
          </form>

          <Link
            href={`/profile/${user?.id}`}
            className="absolute left-2 top-6  hover:underline "
          >
            <AvatarCircle
              avatarUrl={user?.avatar}
              className="hover:scale-110 transition"
            />
          </Link>
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
        </div>

        <TweetsList initialTweets={initialTweets} />

        <div className="fixed bottom-16 w-full max-w-screen-sm  flex justify-end">
          <Link
            href="/tweets/add"
            className="mr-10 bg-white rounded-full hover:scale-110  active:scale-95 transition"
          >
            <PlusCircleIcon className="size-14" />
          </Link>
        </div>
      </div>
    </>
  );
}
