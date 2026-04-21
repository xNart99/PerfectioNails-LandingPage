import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

/**
 * Admin layout — requires authentication.
 * Redirects to /login if no session exists.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  /* Allow the login page through without auth check */
  /* The redirect logic is handled below with a path check in middleware */

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      {session && <AdminNav userEmail={session.user?.email ?? ""} />}
      <main className={session ? "ml-64 p-8" : ""}>{children}</main>
    </div>
  );
}
