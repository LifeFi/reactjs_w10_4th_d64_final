export const dynamic = "force-dynamic";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log(
    "\x1b[33m================================ @server | me api hit!!!"
  );
  const { id } = await getSession();
  console.log(
    "\x1b[33m================================ @server | me.ts session.id:",
    id
  );

  if (!id) {
    return Response.json({ ok: false, message: "Plz log in" });
  }
  const foundUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  console.log(
    "\x1b[33m================================ @server | me db hit!!! foundUser:",
    Boolean(foundUser)
  );

  if (!foundUser) {
    return Response.json({ ok: false, message: "Not found User" });
  }
  return Response.json({ ok: true, ...foundUser });
}

// async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseType>,
//   session: IronSession<IronSessionData>
// ) {
//   const user = session.user;
//   console.log("@server | me.ts :", user);

//   if (!user?.id) {
//     return res.status(401).json({ ok: false, message: "Plz log in" });
//   }
//   const foundUser = await db.user.findUnique({
//     where: {
//       id: user.id,
//     },
//   });

//   if (!foundUser) {
//     return res.status(404).json({ ok: false, message: "Not found User" });
//   }
//   return res.status(200).json({ ok: true, ...foundUser });
// }

// export default withApiSession(handler);
// // export default handler;
