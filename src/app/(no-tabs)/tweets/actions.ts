"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";

export async function likeTweet(tweetId: number) {
  // await new Promise((r) => setTimeout(r, 1000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    console.log("likeTweet");

    revalidateTag(`tweet-like-status-${tweetId}`);
  } catch (e) {
    console.log("likeTweet Error");
    revalidateTag(`tweet-like-status-${tweetId}`);
  }
}

export async function dislikeTweet(tweetId: number) {
  // await new Promise((r) => setTimeout(r, 1000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    console.log("dislikeTweet");
    revalidateTag(`tweet-like-status-${tweetId}`);
  } catch (e) {
    console.log("dislikeTweet Error");
    revalidateTag(`tweet-like-status-${tweetId}`);
  }
}

export async function getLikeStatus(tweetId: number, userId: number) {
  console.log("getLikeStatus called!!!!");
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
  console.log(likeCount, isLiked);
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export async function getCachedLikeStatus(tweetId: number, userId: number) {
  console.log("getCachedLikeStatus called!!!!");
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`tweet-like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
}
