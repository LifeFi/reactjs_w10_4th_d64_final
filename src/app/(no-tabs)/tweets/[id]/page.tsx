import NotFound from "@/app/not-found";
import AvatarCircle from "@/components/avatar-circle";
import LikeComponent from "@/components/like-client-component";
import { EllipsisHorizontalIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { getCachedTweet, getReplies, getTweet } from "./actions";
import Tweet from "@/components/tweet";
import { getUser } from "@/app/(tabs)/profile/[id]/[[...slug]]/actions";

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NotFound();
  }
  const tweet = await getCachedTweet(id);
  const replies = await getReplies(id);
  const user = await getUser();

  return (
    <div className="flex flex-col item-center py-4 gap-4">
      <div className="px-6">
        <div className="flex justify-center w-full h-7"></div>
        <div className="flex gap-2 mb-3">
          <Link
            href={`/profile/${tweet.user.id}`}
            className="hover:underline flex gap-2"
          >
            <AvatarCircle
              avatarUrl={tweet.user.avatar}
              className="hover:scale-110 transition"
            />
            <span className="font-semibold">{tweet?.user.username}</span>
          </Link>

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
          ))}
        </div>
        <LikeComponent tweetId={id} userId={tweet.userId} />
      </div>

      <Link
        href={`/tweets/${tweet.id}/add`}
        className="flex w-full gap-3 pb-3 border-b border-t border-neutral-200 px-6 py-4"
      >
        <AvatarCircle avatarUrl={user?.avatar} />
        <div className="flex flex-col w-full">
          <div className="text-lg text-neutral-700 h-16">답글 게시하기</div>
          <div className="flex justify-between w-full ">
            <PhotoIcon className="w-12 cursor-pointer text-twitter-blue rounded-full p-2 hover:bg-blue-50" />
            <div className="flex justify-center items-center rounded-full w-16 bg-twitter-blue text-white opacity-50 text-sm">
              답글
            </div>
          </div>
        </div>
      </Link>

      <div className="w-full px-4">
        {replies.map((reply, index) => (
          <Tweet key={index} tweet={reply} />
        ))}
      </div>
    </div>
  );
}
