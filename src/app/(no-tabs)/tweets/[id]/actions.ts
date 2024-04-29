"use server";
import { unstable_cache as nextCache } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Tweet as TweetModel } from "@prisma/client";

export async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          replies: true,
          inReplies: true,
        },
      },
    },
  });
  if (tweet) {
    return tweet;
  }
  redirect("/404");
}

export async function getCachedTweet(tweetId: number) {
  const cachedOperation = nextCache(getTweet, ["tweet-detail"], {
    tags: [`tweet-detail-${tweetId}`],
    revalidate: 60,
  });
  return cachedOperation(tweetId);
}

export interface TweetWithUser extends TweetModel {
  _count: {
    replies: number;
    inReplies: number;
  };
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
}

export async function getReplies(id: number) {
  const tweets = await db.tweet.findMany({
    where: {
      parentTweetId: id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          replies: true,
          inReplies: true,
        },
      },
    },
  });
  if (tweets) {
    return tweets;
  }
  redirect("/404");
}
