"use server";
import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";

const formSchema = z.object({
  bio: z.string({}).trim(),
});

export async function editProfile(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    bio: formData.get("bio"),
  };

  const result = await formSchema.spa(data);
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
        bio: result.data.bio,
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/profile/[...slug]");
    redirect("/profile");
  }
}
