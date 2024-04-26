"use server";

import getSession from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Router from "next/router";

export const logOut = async () => {
  const session = await getSession();
  await session.destroy();
  const cookie = cookies();
  console.log(cookie);

  redirect("/");
};
