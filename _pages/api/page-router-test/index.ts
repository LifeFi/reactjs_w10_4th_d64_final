import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType, withApiSession } from "@/lib/withSession";
import { IronSession, IronSessionData } from "iron-session";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
  session: IronSession<IronSessionData>
) {
  const user = session.user;
  console.log("@server | Page Router ( API Routes ) :", user);

  return res.status(200).json({ ok: true });
}

export default withApiSession(handler);
// export default handler;
