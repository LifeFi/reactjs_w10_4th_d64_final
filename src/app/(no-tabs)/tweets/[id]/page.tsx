import NotFound from "@/app/not-found";
import AvatarCircle from "@/components/avatar-circle";
import LikeButton from "@/components/like-button-old";
import LikeComponent from "@/components/like-client-component";
import db from "@/lib/db";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  if (tweet) {
    return tweet;
  }
  redirect("/404");
}

function getCachedTweet(tweetId: number) {
  const cachedOperation = nextCache(getTweet, ["tweet-detail"], {
    tags: [`tweet-detail-${tweetId}`],
    revalidate: 60,
  });
  return cachedOperation(tweetId);
}

export default async function Tweet({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NotFound();
  }
  const tweet = await getCachedTweet(id);

  return (
    <div className="flex flex-col item-center py-4 px-6 gap-4">
      <div className="flex justify-center w-full h-7"></div>
      <div className="flex gap-2">
        <AvatarCircle avatarUrl="" />
        <span className="font-semibold">{tweet?.user.username}</span>
        <div className="flex-grow"></div>
        <EllipsisHorizontalIcon className="size-8 text-neutral-500 rounded-full hover:bg-neutral-200 p-1 cursor-pointer" />
      </div>
      <span className="whitespace-pre-wrap">{tweet?.content}</span>
      <div className="flex overflow-x-scroll gap-1 transition">
        {JSON.parse(tweet?.photos ?? "[]").map((photoUrl: string) => (
          <Image
            key={photoUrl}
            src={`${photoUrl}/public`}
            width={640}
            height={640}
            alt={photoUrl}
            className="size-full border-neutral-300 bg-cover rounded-2xl relative"
          />

          // <div>{photoUrl}</div>
        ))}
      </div>
      <LikeComponent tweetId={id} userId={tweet.userId} />
    </div>
  );
}
