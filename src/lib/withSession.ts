import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession, IronSession, IronSessionData } from "iron-session";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

//  https://www.npmjs.com/package/iron-session/v/8.0.1
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const sessionOptions = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    samSite: "none",
    httpOnly: true,
  },
};

export function withApiSession(
  fn: (
    req: NextApiRequest,
    res: NextApiResponse,
    session: IronSession<IronSessionData>
  ) => any
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getIronSession<IronSession<IronSessionData>>(
      req,
      res,
      sessionOptions
    );
    console.log("@server | withSession: ", session);
    return await fn(req, res, session);
  };
}
