"use client";

import { Dispatch, SetStateAction, useOptimistic, useTransition } from "react";
import { dislikeTweet, likeTweet } from "@/app/(tabs)/tweets/actions";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

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
    // console.log("likeButton start");
    // console.log("state before reduverFn: ", state);

    // reducerFn(undefined);
    startTransition(() => reducerFn(undefined));
    console.log("state after reduverFn: ", state);
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
    if (setLikeState) {
      setLikeState((previousState) => ({
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1,
      }));
    }
    console.log("likeButton end");
  };
  return (
    <div className="flex items-center justify-start">
      <button
        onClick={onClick}
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
      <span className="text-neutral-500"> {state.likeCount}</span>
    </div>
  );
}
