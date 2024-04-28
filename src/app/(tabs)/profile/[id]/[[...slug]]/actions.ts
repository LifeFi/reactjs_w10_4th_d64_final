"use server";

import getSession from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import NotFound from "@/app/not-found";

export const logOut = async () => {
  const session = await getSession();
  await session.destroy();
  const cookie = cookies();
  console.log(cookie);

  redirect("/");
};

export async function getUser(userId?: number) {
  // await new Promise((r) => setTimeout(r, 2000));
  const session = await getSession();
  const isMe = userId ? session.id === userId : true;
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: userId || session.id,
      },
    });
    if (user) {
      return {
        ...user,
        isMe,
      };
    }
  }
  NotFound();
}
