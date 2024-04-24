import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function POST() {
  const session = await getSession();
  session.destroy();
  // redirect 의 return type 은 never 임.
  // => 이 함수가 exception 이나 함수 실행을 종결시킨다 것을 의미.
  // => redirect() 사용시, Response 사용을 할 수 없는 것 같다.
  // redirect("/");
  return Response.json({ ok: true });
}
