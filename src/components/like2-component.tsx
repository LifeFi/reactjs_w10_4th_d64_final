"use client";
import { getCachedLikeStatus } from "@/app/(no-tabs)/tweets/actions";
import NotFound from "@/app/not-found";
import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";
import { useEffect, useState } from "react";
import { boolean } from "zod";
/* 
async function getLikeStatus(tweetId: number, userId: number) {
  // nextCache 내에서는 cookie 사용할 수 없다고 함. => 인자로 id 전달.
  // const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  if (isLiked) {
    return {
      likeCount,
      isLiked: Boolean(isLiked),
    };
  }
  // 우선 오류 방지를 위해 임시로 아래와 같이 처리
  return {
    likeCount: 0,
    isLiked: false,
  };
}

function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`tweet-like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
} */

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
  }>();
  useEffect(() => {
    const fetchLikeStatus = async () => {
      const { likeCount, isLiked } = await getCachedLikeStatus(tweetId, userId);
      setLikeState({
        likeCount,
        isLiked,
      });
      console.log("SetLikeState ================");
    };
    fetchLikeStatus();
  }, []);

  return (
    <div className="flex flex-col item-center py-4 px-6 gap-4">
      {likeState && (
        <LikeButton
          isLiked={likeState.isLiked}
          likeCount={likeState.likeCount}
          tweetId={tweetId}
        />
      )}
    </div>
  );
}
