"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

/** Wraps children with NextAuth SessionProvider for client-side session access. */
export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
