import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

/** Admin — view all newsletter subscribers. */
export default async function SubscribersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const active = subscribers.filter((s) => s.active).length;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-[32px] text-ink">Subscribers</h1>
        <p className="text-ink-soft mt-1">{active} active of {subscribers.length} total</p>
      </div>

      <div className="bg-white border border-rule rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-rule bg-cream-warm">
              <th className="px-6 py-3 text-left font-sans text-[11px] tracking-[0.15em] uppercase text-ink-faint">Email</th>
              <th className="px-4 py-3 text-left font-sans text-[11px] tracking-[0.15em] uppercase text-ink-faint">Status</th>
              <th className="px-6 py-3 text-right font-sans text-[11px] tracking-[0.15em] uppercase text-ink-faint">Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 && (
              <tr>
                <td className="px-6 py-8 text-center text-ink-faint font-serif italic" colSpan={3}>
                  No subscribers yet.
                </td>
              </tr>
            )}
            {subscribers.map((s) => (
              <tr key={s.id} className="border-b border-rule last:border-0 hover:bg-cream-warm/30">
                <td className="px-6 py-3 font-sans text-[14px] text-ink">{s.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded font-sans text-[11px] font-medium ${s.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {s.active ? "Active" : "Unsubscribed"}
                  </span>
                </td>
                <td className="px-6 py-3 text-right font-sans text-[12px] text-ink-faint">
                  {new Date(s.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
