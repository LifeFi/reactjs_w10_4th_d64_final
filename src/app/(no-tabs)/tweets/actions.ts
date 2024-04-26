"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";

export async function likeTweet(tweetId: number) {
  await new Promise((r) => setTimeout(r, 1000));
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
  } catch (e) {}
}

export async function dislikeTweet(tweetId: number) {
  await new Promise((r) => setTimeout(r, 1000));
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
  } catch (e) {}
}

export async function getLikeStatus(tweetId: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: session.id!,
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

export async function getCachedLikeStatus(tweetId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`tweet-like-status-${tweetId}`],
  });
  return cachedOperation(tweetId);
}
