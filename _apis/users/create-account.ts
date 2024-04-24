import { NextApiRequest, NextApiResponse } from "next";
import db from "../../src/lib/db";
import { ResponseType } from "../../src/lib/withSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { name, email } = req.body;
    const foundUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (foundUser) {
      // 200 OK
      return res
        .status(200)
        .json({ ok: false, message: "Account already exists! Please log in!" });
    }
    await db.user.create({
      data: {
        name,
        email,
      },
    });
    // 201 Created
    return res
      .status(201)
      .json({ ok: true, message: "Account created! Please log-in!" });
  }
  // 405 Method Not Allowed
  return res.status(405).json({ ok: false, message: "Method Not Allowed" });
}
