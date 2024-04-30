import { User } from "@prisma/client";
import Link from "next/link";
import AvatarCircle from "./avatar-circle";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import LikeComponent from "./like-client-component";
import { TweetWithUser } from "@/app/(tabs)/tweets/[id]/actions";
import { formatDate } from "@/lib/utils";

export default function TweetItem({
  tweet,
  user,
  displayMode = "list",
  verticalLine = false,
}: {
  tweet: TweetWithUser;
  user?: User;
  displayMode?: "list" | "detail" | "reply";
  verticalLine?: boolean;
}) {
  return (
    <div
      className={`pt-3 last:border-none trantition hover:bg-neutral-100 
      /* ${displayMode !== "reply" && !verticalLine && "pt-3"} */
      
      `}
    >
      <div className="flex flex-col gap-2 px-2">
        <div className="flex gap-2 items-center">
          <Link href={`/profile/${tweet.user.id}`} className="hover:underline">
            <AvatarCircle
              avatarUrl={tweet.user.avatar}
              className="hover:scale-110 transition"
            />
          </Link>

          <Link
            href={`/profile/${tweet.user.id}`}
            className="hover:underline mr-5"
          >
            <span className="font-semibold">{tweet.user.username}</span>
          </Link>
          <span className="text-sm text-neutral-500">
            {formatDate(tweet.createdAt.toString())}
          </span>
          <div className="flex-grow"></div>
          <EllipsisHorizontalIcon className="size-8 text-neutral-500 rounded-full hover:bg-neutral-200 p-1 cursor-pointer" />
        </div>
        <div className="flex gap-2">
          {displayMode !== "detail" && (
            <div className="w-10 flex justify-center">
              {verticalLine && <div className="w-0.5 bg-neutral-200"></div>}
            </div>
          )}
          <div className="w-full">
            {displayMode == "reply" ? (
              <span className="flex min-h-10 whitespace-pre-wrap">
                {tweet.content}
              </span>
            ) : (
              <>
                <Link href={`/tweets/${tweet.id}`} className="hover:underline">
                  <span className="flex w-full min-h-10 whitespace-pre-wrap">
                    {tweet.content}
                  </span>
                  <div className="flex overflow-x-scroll gap-1 transition mt-2 px-2">
                    {JSON.parse(tweet?.photos ?? "[]").map(
                      (photoUrl: string) => (
                        <Image
                          key={photoUrl}
                          src={`${photoUrl}/public`}
                          width={640}
                          height={640}
                          alt={photoUrl}
                          className="w-full border-neutral-300 bg-cover rounded-2xl relative"
                        />
                        // <div>{photoUrl}</div>
                      )
                    )}
                  </div>
                </Link>
                <div className="grid grid-cols-5 mt-1 mb-3 *:flex *:items-center *:text-neutral-400">
                  <Link href={`/tweets/${tweet.id}/add`}>
                    <ChatBubbleOvalLeftIcon className="size-9 text-sm cursor-pointer rounded-full p-1 hover:bg-blue-100 transition" />
                    <span className="mx-1">
                      {tweet.parentTweetId
                        ? tweet._count.inReplies
                        : tweet._count.replies}
                    </span>
                  </Link>
                  {user && (
                    <LikeComponent tweetId={tweet.id} userId={user.id} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {displayMode !== "reply" && !verticalLine && (
        <div className="border-b border-neutral-200 pb-3 w-full"></div>
      )}
    </div>
  );
}
