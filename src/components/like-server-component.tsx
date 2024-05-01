import { getCachedLikeStatus } from "@/app/(tabs)/tweets/actions";
import LikeButton from "@/components/like-button";
import getSession from "@/lib/session";

export default async function LikeComponent({
  tweetId,
  userId,
}: {
  tweetId: number;
  userId: number;
}) {
  const { likeCount, isLiked } = await getCachedLikeStatus(tweetId, userId);
  return (
    <div className="flex flex-col item-center py-4 px-6 gap-4">
      <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweetId} />
    </div>
  );
}
