"use client";

import { useOptimistic, useTransition } from "react";
import { dislikeTweet, likeTweet } from "@/app/(no-tabs)/tweets/actions";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );

  const onClick = async () => {
    console.log("likeButton start");
    startTransition(() => reducerFn(undefined));
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
    console.log("likeButton end");
  };
  return (
    <div className="flex items-center justify-start">
      <button
        onClick={onClick}
        className={`size-10 flex items-center justify-center gap-2 text-neutral-400 text-sm  rounded-full p-1 transition ${
          state.isLiked ? " text-red-500" : "hover:bg-red-100"
        }`}
      >
        {state.isLiked ? (
          <SolidHeartIcon className="size-7 animate-appear" />
        ) : (
          <OutlineHeartIcon className="size-7 " />
        )}
      </button>
      <span className="text-neutral-500"> {state.likeCount}</span>
    </div>
  );
}
