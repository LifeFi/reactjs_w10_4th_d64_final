import AvatarCircle from "@/components/avatar-circle";
import LikeComponent from "@/components/like-component";
import db from "@/lib/db";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

async function getTweets() {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
}

export default async function Home() {
  const tweets = await getTweets();
  console.log(tweets);
  return (
    <div className="flex flex-col item-center py-4 gap-4">
      <div className="flex justify-center">
        <Image src="/ox-logo.png" alt="ox-logo.png" width={80} height={80} />
      </div>
      <div className="flex flex-col mb-20">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="border-b px-2 py-4 last:border-none trantition hover:bg-neutral-100"
          >
            <div className="flex gap-2">
              <AvatarCircle avatarUrl="" />

              <div className="flex flex-col w-full">
                <div className="flex gap-5">
                  <span className="font-semibold">{tweet.user.username}</span>
                  <span>{tweet.createdAt.toLocaleDateString()}</span>
                  <div className="flex-grow"></div>
                  <EllipsisHorizontalIcon className="size-8 text-neutral-500 rounded-full hover:bg-neutral-200 p-1 cursor-pointer" />
                </div>
                <Link href={`/tweets/${tweet.id}`} className="hover:underline">
                  <span className="flex w-full min-h-10">{tweet.content}</span>
                  <div className="flex overflow-x-scroll gap-1 transition">
                    {JSON.parse(tweet?.photos ?? "[]").map(
                      (photoUrl: string) => (
                        <Image
                          key={photoUrl}
                          src={`${photoUrl}/public`}
                          width={640}
                          height={640}
                          alt={photoUrl}
                          className="size-full border-neutral-300 bg-cover rounded-2xl relative"
                        />
                        // <div>{photoUrl}</div>
                      )
                    )}
                  </div>
                </Link>
                <div className="grid grid-cols-5 my-1 *:flex *:items-center *:text-neutral-400">
                  <div>
                    <ChatBubbleOvalLeftIcon className="size-9 text-sm cursor-pointer rounded-full p-1 hover:bg-blue-100 transition" />
                    <span className="mx-1">3</span>
                  </div>
                  <div>
                    <LikeComponent tweetId={tweet.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
