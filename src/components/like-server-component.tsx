import { getCachedLikeStatus } from "@/app/(no-tabs)/tweets/actions";
import LikeButton from "@/components/like-button";

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
