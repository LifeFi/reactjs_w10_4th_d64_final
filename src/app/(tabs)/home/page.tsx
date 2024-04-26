import AvatarCircle from "@/components/avatar-circle";
import LikeComponent from "@/components/like-component";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { getMoreTweets } from "./actions";
import TweetsList from "@/components/tweets-list";

export default async function Home() {
  const initialTweets = await getMoreTweets(0);
  console.log(initialTweets);
  return (
    <div className="flex flex-col item-center py-4 gap-4">
      <div className="flex justify-center">
        <Image src="/ox-logo.png" alt="ox-logo.png" width={80} height={80} />
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
  );
}
