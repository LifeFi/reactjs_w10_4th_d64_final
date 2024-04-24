import { NextRequest } from "next/server";
import getSession from "@/lib/session";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const session = await getSession();
  console.log("@server | login.ts | session.id", session.id);
  const foundUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!foundUser) {
    console.log("@server login.ts | user not found");
    return Response.json({ ok: false, message: "user not found" });
  }
  session.id = foundUser.id;

  console.log("@server | login.ts | foundUser session.id", session.id);
  await session.save();
  console.log("@server | login.ts | session.save()");

  // return Response.json({ ok: true, message: "Log-in Success" });
  // 상태코드를 명확하게 지정하려면, new 생성자로 Response 객체를 생성해야 한다고 함.
  // 첫번째 인자로 문자열만 받으므로, JSON.stringify()로 객체를 문자열로 변환.
  return new Response(
    JSON.stringify({ ok: true, ...foundUser, message: "Log-in Success" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
