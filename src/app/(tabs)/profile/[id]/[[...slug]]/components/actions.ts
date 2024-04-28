"use server";
import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";

const formSchema = z.object({
  // 본인 Profile을 수정하는 것인지 체크 필요
  // userId: z.number(),
  avatar: z.string().nullish(),
  cover: z.string().nullish(),
  bio: z.string({}).trim(),
});

export async function updateProfile(prevState: any, formData: FormData) {
  const data = {
    userId: formData.get("userId"),
    avatar: formData.get("avatar"),
    cover: formData.get("cover"),
    bio: formData.get("bio"),
  };

  const result = await formSchema.spa(data);
  console.log("result", result);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const session = await getSession();
    const user = await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        avatar: result.data.avatar ?? undefined,
        cover: result.data.cover ?? undefined,
        bio: result.data.bio ?? undefined,
      },
      select: {
        id: true,
      },
    });
    revalidatePath(`/profile/${session.id}/[...slug]`);
    redirect(`/profile/${session.id}`);
  }
}
