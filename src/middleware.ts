import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("🔥 MIDDLEWARE RUNNING:", req.nextUrl.pathname);
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;
  if (!token) {
    if(path.startsWith("/profile/") ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  if(token) {
    if(path === "/login" || path === "/signup") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/signup"],
};
