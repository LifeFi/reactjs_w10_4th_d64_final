"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { tweetSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { getTweet } from "../../[id]/actions";
import { connect } from "http2";

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

interface RefInfo {
  parentTweet?: { connect: { id: number } };
  inReplyToTweet?: { connect: { id: number } };
}

export async function postTweet(formData: FormData) {
  const data = {
    photos: formData.get("photos"),
    content: formData.get("content"),
    replyTo: formData.get("replyTo"),
  };
  const result = tweetSchema.safeParse(data);
  console.log("formData", formData);

  console.log("result", result);
  if (!result.success) {
    return result.error.flatten();
  } else {
    try {
      const session = await getSession();

      if (session.id) {
        const refInfoObj: RefInfo = {};
        if (result.data.replyTo) {
          const refTweetId = Number(result.data.replyTo);
          const refTweet = await getTweet(refTweetId);
          console.log("refTweet", refTweet);

          if (refTweet.parentTweetId) {
            refInfoObj.parentTweet = {
              connect: {
                id: refTweet.parentTweetId,
              },
            };
            refInfoObj.inReplyToTweet = {
              connect: {
                id: refTweetId,
              },
            };
          } else {
            refInfoObj.parentTweet = {
              connect: {
                id: refTweetId,
              },
            };
          }
        }
        console.log("refInfoArray", refInfoObj);
        const tweet = await db.tweet.create({
          data: {
            content: result.data.content,
            photos: result.data.photos,
            user: {
              connect: {
                id: session.id,
              },
            },
            ...refInfoObj,
          },
          select: {
            id: true,
            parentTweetId: true,
          },
        });

        // redirect(`/tweets/${tweet.id}`);
        revalidatePath("/home");
        return tweet;
      }
    } catch (e) {
      return e;
    }
  }
}
