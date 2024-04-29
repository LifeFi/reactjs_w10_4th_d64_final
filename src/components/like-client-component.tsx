"use client";
import { getCachedLikeStatus } from "@/app/(no-tabs)/tweets/actions";
import LikeButton from "@/components/like-button";
import { useEffect, useState } from "react";

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
  }>({ likeCount: 0, isLiked: false });
  useEffect(() => {
    const fetchLikeStatus = async () => {
      const { likeCount, isLiked } = await getCachedLikeStatus(tweetId, userId);
      setLikeState({
        likeCount,
        isLiked,
      });
      // console.log("SetLikeState ================", { likeCount, isLiked });
    };
    fetchLikeStatus();
  }, [tweetId, userId]);

  return (
    <div className="flex flex-col item-center py-4 px-6 gap-4">
      {likeState && (
        <LikeButton
          isLiked={likeState.isLiked}
          likeCount={likeState.likeCount}
          tweetId={tweetId}
          setLikeState={setLikeState}
        />
      )}
    </div>
  );
}
