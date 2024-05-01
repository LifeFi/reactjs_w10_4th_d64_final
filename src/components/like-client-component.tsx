"use client";
import {
  getCachedLikeStatus,
  getLikeStatus,
} from "@/app/(tabs)/tweets/actions";
import LikeButton from "@/components/like-button";
import { randomUUID } from "crypto";
import { useEffect, useLayoutEffect, useState } from "react";

export default function LikeComponent({
  tweetId,
  userId,
}: {
  tweetId: number;
  userId: number;
}) {
  const [likeState, setLikeState] = useState<{
    likeCount: number;
    isLiked: boolean;
  }>({
    likeCount: 0,
    isLiked: false,
  });

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const fetchedStatus = await getCachedLikeStatus(tweetId, userId);
      setLikeState(fetchedStatus);
      // console.log("@useEffect | fetchLikeStatus: ", fetchedStatus);
      // console.log("SetLikeState ================", { likeCount, isLiked });
    };
    fetchLikeStatus();
  }, [tweetId, userId]);
  // console.log("LikeComponent | likeState: ", likeState);

  return (
    <>
      {likeState ? (
        <LikeButton
          isLiked={likeState.isLiked}
          likeCount={likeState.likeCount}
          tweetId={tweetId}
          setLikeState={setLikeState}
        />
      ) : null}
    </>
  );
}
