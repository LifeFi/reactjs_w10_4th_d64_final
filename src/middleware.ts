import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/session";

interface Routes {
  [key: string]: boolean;
}

// Array 로 includes 사용하는 것보다, dic(map) 사용하는 것이 더 빠르다.
const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

// middleware가 호출되는 조건을 조절.
// 코드 실행이 아닌, image, ico 등 가져오는 부분에서는 제외.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
