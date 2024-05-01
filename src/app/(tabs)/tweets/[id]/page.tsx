import NotFound from "@/app/not-found";
import AvatarCircle from "@/components/avatar-circle";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getCachedTweet, getReplies } from "./actions";
import { getUser } from "@/app/(tabs)/profile/[id]/[[...slug]]/actions";
import TweetItem from "@/components/tweet-item";

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
  console.log("@server | tweet: ", tweet.id, " ============ ");

  return (
    <div className="flex flex-col item-center py-4 gap-4">
      <div className="flex justify-center w-full h-7">{Date.now()}</div>
      <TweetItem
        tweet={tweet}
        user={user}
        displayMode="detail"
        verticalLine={true}
      />
      <Link
        href={`/tweets/${tweet.id}/add`}
        className="flex w-full gap-3 border-t border-b border-neutral-200 px-2 py-4 group hover:bg-neutral-50"
      >
        <AvatarCircle avatarUrl={user?.avatar} />
        <div className="flex flex-col w-full">
          <div className="text-neutral-700 h-16 p-2 mb-2 rounded-lg border border-transparent group-hover:border-blue-300 group-hover:text-twitter-blue transition">
            답글 게시하기
          </div>
          <div className="flex justify-between w-full ">
            <PhotoIcon className="w-12 cursor-pointer text-twitter-blue rounded-full p-2 hover:bg-blue-50" />
            <div className="flex justify-center items-center rounded-full w-16 h-10 bg-twitter-blue text-white opacity-50 text-md">
              답글
            </div>
          </div>
        </div>
      </Link>

      <div className="w-full">
        {replies.map((reply, index, array) => {
          return (
            <TweetItem
              key={index}
              tweet={reply}
              user={user}
              verticalLine={
                index !== array.length - 1 &&
                (reply.id === array[index + 1].inReplyToTweetId ||
                  reply.inReplyToTweetId === array[index + 1].inReplyToTweetId)
              }
            />
          );
        })}
      </div>
      <div className="py-20" />
    </div>
  );
}
