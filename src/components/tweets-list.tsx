"use client";
import {
  GetMoreTweetsOptionsProps,
  InitialTweets,
  getMoreTweets,
} from "@/app/(tabs)/home/actions";
import useUser from "@/lib/useUser";
import { useEffect, useRef, useState } from "react";
import LoadingTweetSkeleton from "./loading-tweet-skeleton";
import Tweet from "./tweet";

interface TweetsProps {
  initialTweets: InitialTweets;
  options?: GetMoreTweetsOptionsProps;
}

export default function TweetsList({ initialTweets, options }: TweetsProps) {
  // const { userId, filter } = options || {};
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const laodMore = useRef<HTMLSpanElement>(null);
  const { user, isLoading: isUserLoading } = useUser();

  useEffect(() => {
    const currentLoadMore = laodMore.current;
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && laodMore.current) {
          observer.unobserve(laodMore.current);
          setIsLoading(true);
          const newTweets = await getMoreTweets(page + 1, options);
          if (newTweets.length !== 0) {
            setTweets((prev) => [...prev, ...newTweets]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (currentLoadMore) {
      observer.observe(currentLoadMore);
    }
    return () => {
      if (currentLoadMore) {
        // 전체 observer 모두 없애고 싶을 때.
        // observer.disconnect();
        observer.unobserve(currentLoadMore);
      }
    };
  }, [page, laodMore, options]);

  return (
    <div className="flex flex-col mb-20">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} user={user} />
      ))}
      {!isLastPage ? (
        <span
          ref={laodMore}
          className="text-sm text-neutral-400 bg-transparent w-full px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? <LoadingTweetSkeleton /> : "더보기"}
        </span>
      ) : null}
    </div>
  );
}
