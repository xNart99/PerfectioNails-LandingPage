import { withAuth } from "next-auth/middleware";

/**
 * Protects all /dashboard/* routes.
 * NextAuth's withAuth middleware redirects to /login if no valid session.
 */
export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
