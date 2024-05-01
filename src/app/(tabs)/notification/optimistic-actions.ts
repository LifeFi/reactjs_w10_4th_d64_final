"use server";

import { unstable_cache as NextCache } from "next/cache";

const data = {
  isLiked: false,
  likeCount: 0,
};

export const cachedToggleLike = NextCache(toogleLike, ["toogleLike"]);

export async function toogleLike() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  data.isLiked = !data.isLiked;
  data.likeCount = data.likeCount + 1;
  console.log("data", data);

  return data;
}

export const getCachedLikeStatus = NextCache(getLikeStatus, ["getLikeStatus"]);

export async function getLikeStatus() {
  return data;
}
