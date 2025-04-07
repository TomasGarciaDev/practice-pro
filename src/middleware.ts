import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(async function middleware(req: NextRequest) {}, {
  isReturnCurrentPage: true,
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - auth
     * - favicon.ico (favicon file)
     * - robots.txt
     * - images
     * - homepage (represented with $ after beginning /)
     * - about
     */
    "/((?!api|_next/static|_next/image|about|auth|favicon.ico|robots.txt|images|$).*)",
  ],
};
