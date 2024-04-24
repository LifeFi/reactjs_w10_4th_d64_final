import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType, withApiSession } from "@/lib/withSession";
import db from "@/lib/db";
import { IronSession, IronSessionData } from "iron-session";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
  session: IronSession<IronSessionData>
) {
  const user = session.user;
  console.log("@server | me.ts :", user);

  if (!user?.id) {
    return res.status(401).json({ ok: false, message: "Plz log in" });
  }
  const foundUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!foundUser) {
    return res.status(404).json({ ok: false, message: "Not found User" });
  }
  return res.status(200).json({ ok: true, ...foundUser });
}

export default withApiSession(handler);
// export default handler;
