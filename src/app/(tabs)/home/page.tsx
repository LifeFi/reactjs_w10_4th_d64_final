import db from "@/lib/db";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
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
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <div>Home</div>
      <div className="flex flex-col gap-3">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="flex flex-col">
            <Link href={`/tweets/${tweet.id}`}>
              <div className="flex overflow-x-scroll gap-1 transition">
                {JSON.parse(tweet?.photos ?? "[]").map((photoUrl: string) => (
                  <Image
                    key={photoUrl}
                    src={`${photoUrl}/public`}
                    width={320}
                    height={320}
                    alt={photoUrl}
                    className="size-80 aspect-square border-neutral-300 bg-cover rounded-2xl relative"
                  />
                  // <div>{photoUrl}</div>
                ))}
              </div>
              <span>{tweet.content}</span>
            </Link>
            <span>{tweet.user.username}</span>
            <span>{tweet.createdAt.toLocaleDateString()}</span>
          </div>
        ))}
      </div>
      <Link
        href="/tweets/add"
        className="fixed bottom-3 right-1/2 translate-x-full max-w-screen-sm"
      >
        <PlusCircleIcon className="size-14" />
      </Link>
    </div>
  );
}
