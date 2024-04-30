import NotFound from "@/app/not-found";
import AddTweet from "../../add/components/add-tweet";
import { getCachedTweet, getTweet } from "../actions";

export default async function AddToTweet({
  params: { id },
}: {
  params: { id: string };
}) {
  const toTweetId = Number(id);
  if (isNaN(toTweetId)) {
    return NotFound();
  }

  const tweet = await getTweet(toTweetId);

  return <AddTweet toTweet={tweet} />;
}
