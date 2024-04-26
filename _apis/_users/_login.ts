import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType, withApiSession } from "../../src/lib/withSession";
import db from "../../src/lib/db";
import { IronSession, IronSessionData } from "iron-session";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
  session: IronSession<IronSessionData>
) {
  if (req.method === "POST") {
    const { email } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      console.log("@server login.ts | user not found");
      return res.status(404).json({ ok: false, message: "user not found" });
    }
    session.user = {
      id: user.id,
    };
    console.log("@server | session.user", session.user);
    await session.save();
    console.log("@server login.ts | session.save()");

    return res.status(200).json({ ok: true, message: "Log-in Success" });
  }
  return res.status(405).json({ ok: false, message: "Method Not Allowed" });
}

export default withApiSession(handler);
