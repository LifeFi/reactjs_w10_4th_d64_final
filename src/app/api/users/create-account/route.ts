import { NextRequest } from "next/server";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
  // console.log("@server | create-account.ts | POST | request.body", request);

  const foundUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (foundUser) {
    // 200 OK
    return Response.json({
      ok: false,
      message: "Account already exists! Please log in!",
    });
  }
  await db.user.create({
    data: {
      name,
      email,
    },
  });
  // 201 Created
  return Response.json({
    ok: true,
    message: "Account created! Please log-in!",
  });
}
