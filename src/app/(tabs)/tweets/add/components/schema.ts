import { z } from "zod";
import { getTweet } from "../../[id]/actions";

export const tweetSchema = z.object({
  // string().optional() : string | undefined
  // string().nullable() : string | null
  // string().nullish() : string | null | undefined
  photos: z.string().nullish(),
  content: z.string({
    required_error: "무슨 일이 일어나고 있는지 알려주세요.",
  }),
  replyTo: z.string().nullish(),
});

export type TweetType = z.infer<typeof tweetSchema>;
