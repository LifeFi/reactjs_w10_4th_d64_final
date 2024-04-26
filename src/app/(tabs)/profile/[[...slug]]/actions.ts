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

export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  NotFound();
}
