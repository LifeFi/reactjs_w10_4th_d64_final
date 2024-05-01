"use client";

import { Dispatch, SetStateAction, useOptimistic, useState } from "react";
import { cachedToggleLike, toogleLike } from "./optimistic-actions";

export default function OptimisticButton({
  isLiked,
  likeCount,
  setLikeStatus,
}: {
  isLiked: boolean;
  likeCount: number;
  setLikeStatus: Dispatch<
    SetStateAction<{
      isLiked: boolean;
      likeCount: number;
    }>
  >;
}) {
  const [trigger, setTrigger] = useState(false);
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => {
      // console.log(previousState.isLiked, previousState.likeCount);
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1 + 1000
          : previousState.likeCount + 1 + 1000,
      };
    }
  );
  const action = async () => {
    reducerFn(undefined);
    console.log(state.isLiked, state.likeCount);
    cachedToggleLike();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("state.likeCount", state.likeCount);

    setLikeStatus((prev) => ({
      isLiked: prev.isLiked,
      likeCount: prev.likeCount + 10,
    }));
  };
  return (
    <div>
      <div>{state.isLiked ? "좋아함" : "아직임"}</div>
      <div>{state.likeCount}</div>
      <form action={action}>
        <button>좋아요 버튼</button>
      </form>
    </div>
  );
}
