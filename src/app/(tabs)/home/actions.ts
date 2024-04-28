"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface GetMoreTweetsOptionsProps {
  userId?: number;
  filter?: "all" | "replies" | "likes";
}

// 객체 인자의 초기값을 세팅하는 방법.
export async function getMoreTweets(
  page: number,
  options: GetMoreTweetsOptionsProps = { filter: "all" }
) {
  const { userId, filter } = options;
  const tweets = await db.tweet.findMany({
    where: {
      user: userId
        ? filter !== "likes"
          ? {
              id: userId,
            }
          : undefined
        : undefined,
      AND: [
        // userId && filter === "replies"
        //   ? {
        //       replyTo: {
        //         not: null,
        //       },
        //     }
        //   : {},
        filter === "likes"
          ? {
              likes: {
                some: {
                  userId,
                },
              },
            }
          : {},
      ],
    },
    include: {
      user: {
        select: {
          id: true,
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

export async function revalidateHome() {
  revalidatePath("/home");
}
