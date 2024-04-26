import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";

function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`tweet-like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
}

async function getLikeStatus(tweetId: number, userId: number) {
  // nextCache 내에서는 cookie 사용할 수 없다고 함. => 인자로 id 전달.
  // const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export default async function LikeComponent({ tweetId }: { tweetId: number }) {
  const session = await getSession();
  const { likeCount, isLiked } = await getCachedLikeStatus(
    tweetId,
    session.id!
  );
  return (
    <div className="flex flex-col item-center py-4 px-6 gap-4">
      <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweetId} />
    </div>
  );
}
