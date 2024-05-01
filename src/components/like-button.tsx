"use client";

import {
  Dispatch,
  SetStateAction,
  useOptimistic,
  useRef,
  useTransition,
} from "react";
import { dislikeTweet, likeTweet } from "@/app/(tabs)/tweets/actions";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { createKey } from "next/dist/shared/lib/router/router";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
  // setLiksState 는 like-component 가 client component 일 때 사용.
  // like-component 가 server components 이면, setstate 받아서 업데이트하지 않아도
  // like/dislikeTweet 함수에서 revalidateTag 호출하면서 자동으로 UI에 반영됨.
  setLikeState?: Dispatch<
    SetStateAction<{
      likeCount: number;
      isLiked: boolean;
    }>
  >;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
  setLikeState,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => {
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1,
      };
    }
  );

  const toggleAction = async () => {
    console.log("likeButton start");

    reducerFn(undefined);

    if (setLikeState) {
      setLikeState((prev) => {
        console.log("prev setLikeState ( after await ): ", prev);
        return {
          isLiked: !prev.isLiked,
          likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        };
      });
    }
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
    console.log("like/dislike fetch end!!!!");

    // setTriggerNubmer && setTriggerNubmer((prev) => prev + 1);
    // clikcedNumberRef.current = 0;
    // isLoadingRef.current = false;

    console.log("likeButton end");
  };
  return (
    <div className="flex items-center justify-start">
      <form action={toggleAction}>
        <button
          className={`size-10 flex items-center justify-center gap-2 text-neutral-400 text-sm rounded-full p-1 transition ${
            state.isLiked ? "text-red-500" : "hover:bg-red-100"
          }`}
        >
          {state.isLiked ? (
            <SolidHeartIcon className="size-7 animate-appear" />
          ) : (
            <OutlineHeartIcon className="size-7 " />
          )}
        </button>
      </form>
      <span className="text-neutral-500"> {state.likeCount}</span>
    </div>
  );
}
