import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser() {
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
  notFound();
}

async function Username() {
  //await new Promise((resolve) => setTimeout(resolve, 10000));
  const user = await getUser();
  return <h1>반가워요! {user?.username}님!</h1>;
}

export default async function Profile() {
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <Suspense fallback={"반가워요!"}>
        <Username />
      </Suspense>
      <form action={logOut}>
        <button>로그아웃</button>
      </form>
    </div>
  );
}
