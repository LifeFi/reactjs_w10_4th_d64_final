import { User } from "@prisma/client";
import Link from "next/link";
import AvatarCircle from "./avatar-circle";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import LikeComponent from "./like-client-component";
import { TweetWithUser } from "@/app/(no-tabs)/tweets/[id]/actions";

export default function Tweet({
  tweet,
  user,
  shortMode = false,
}: {
  tweet: TweetWithUser;
  user?: User;
  shortMode?: boolean;
}) {
  return (
    <div
      className={`border-b px-2 py-4 last:border-none trantition hover:bg-neutral-100 ${
        shortMode && "border-none"
      }`}
    >
      <div className="flex gap-2">
        <Link href={`/profile/${tweet.user.id}`} className="hover:underline">
          <AvatarCircle
            avatarUrl={tweet.user.avatar}
            className="hover:scale-110 transition"
          />
        </Link>

        <div className="flex flex-col w-full">
          <div className="flex gap-5">
            <Link
              href={`/profile/${tweet.user.id}`}
              className="hover:underline "
            >
              <span className="font-semibold">{tweet.user.username}</span>
            </Link>
            <span>{tweet.createdAt.toLocaleDateString()}</span>
            <div className="flex-grow"></div>
            <EllipsisHorizontalIcon className="size-8 text-neutral-500 rounded-full hover:bg-neutral-200 p-1 cursor-pointer" />
          </div>
          {shortMode ? (
            <span className="flex w-full min-h-10 whitespace-pre-wrap">
              {tweet.content}
            </span>
          ) : (
            <>
              <Link href={`/tweets/${tweet.id}`} className="hover:underline">
                <span className="flex w-full min-h-10 whitespace-pre-wrap">
                  {tweet.content}
                </span>
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
              </Link>
              <div className="grid grid-cols-5 my-1 *:flex *:items-center *:text-neutral-400">
                <Link href={`/tweets/${tweet.id}/add`}>
                  <ChatBubbleOvalLeftIcon className="size-9 text-sm cursor-pointer rounded-full p-1 hover:bg-blue-100 transition" />
                  <span className="mx-1">{tweet._count.replies}</span>
                </Link>
                <div>
                  {user && (
                    <LikeComponent tweetId={tweet.id} userId={user.id} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
