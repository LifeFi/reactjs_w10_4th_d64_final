import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType, withApiSession } from "../../src/lib/withSession";
import { IronSession, IronSessionData } from "iron-session";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
  session: IronSession<IronSessionData>
) {
  if (req.method === "POST") {
    console.log("@server | logout.ts | session.user", session.user);
    session.destroy();
    console.log("@server | logout.ts | session.destroy()");

    return res.status(200).json({ ok: true, message: "Log-out Success" });
  }
  return res.status(405).json({ ok: false, message: "Method Not Allowed" });
}

export default withApiSession(handler);
