"use client";
import { InitialTweets, getMoreTweets } from "@/app/(tabs)/home/actions";
import AvatarCircle from "@/components/avatar-circle";
import LikeComponent from "@/components/like2-component";
import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface TweetsProps {
  initialTweets: InitialTweets;
}

export default function TweetsList({ initialTweets }: TweetsProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newTweets = await getMoreTweets(page + 1);
          if (newTweets.length !== 0) {
            setTweets((prev) => [...prev, ...newTweets]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="flex flex-col mb-20">
      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          className="border-b px-2 py-4 last:border-none trantition hover:bg-neutral-100"
        >
          <div className="flex gap-2">
            <AvatarCircle avatarUrl={tweet.user.avatar} />

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
                <div>
                  <ChatBubbleOvalLeftIcon className="size-9 text-sm cursor-pointer rounded-full p-1 hover:bg-blue-100 transition" />
                  <span className="mx-1">3</span>
                </div>
                <div>
                  <LikeComponent tweetId={tweet.id} userId={tweet.userId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* {!isLastPage ? (
        <span
          ref={trigger}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null} */}
    </div>
  );
}
