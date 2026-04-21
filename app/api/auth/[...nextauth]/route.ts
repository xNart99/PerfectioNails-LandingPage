import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/** NextAuth catch-all handler — handles /api/auth/* routes. */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
