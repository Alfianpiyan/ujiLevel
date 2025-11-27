import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });

  console.log("TOKEN ROLE:", token?.role); 

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.role;
  const path = req.nextUrl.pathname;

  // admin
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // petugas
  if (path.startsWith("/petugas") && role !== "petugas") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // user
  if (path.startsWith("/user") && role !== "calon_siswa") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*", "/petugas/:path*", "/user/:path*"],
};
