"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
    skip: page * 5,
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getMoreTweets>;
