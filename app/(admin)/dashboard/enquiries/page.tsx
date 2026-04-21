import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

/** Admin — view all contact form enquiries. */
export default async function EnquiriesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  /* Mark all as read */
  await prisma.enquiry.updateMany({ where: { read: false }, data: { read: true } });

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-[32px] text-ink">Enquiries</h1>
        <p className="text-ink-soft mt-1">{enquiries.length} total</p>
      </div>

      <div className="flex flex-col gap-4">
        {enquiries.length === 0 && (
          <div className="bg-white border border-rule rounded-lg p-12 text-center text-ink-faint font-serif italic">
            No enquiries yet.
          </div>
        )}
        {enquiries.map((e) => (
          <div key={e.id} className="bg-white border border-rule rounded-lg p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="font-sans font-semibold text-[15px] text-ink">{e.name}</div>
                <div className="font-sans text-[13px] text-ink-faint mt-0.5">
                  <a href={`tel:${e.phone}`} className="hover:text-gold-deep">{e.phone}</a>
                  {e.email && <> · <a href={`mailto:${e.email}`} className="hover:text-gold-deep">{e.email}</a></>}
                </div>
              </div>
              <div className="font-sans text-[12px] text-ink-faint whitespace-nowrap">
                {new Date(e.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {e.service && (
                <span className="px-2.5 py-1 bg-cream-warm border border-rule font-sans text-[11px] tracking-[0.1em] uppercase text-gold-deep">
                  {e.service}
                </span>
              )}
              {e.day && (
                <span className="px-2.5 py-1 bg-cream-warm border border-rule font-sans text-[11px] tracking-[0.1em] uppercase text-ink-faint">
                  {e.day}
                </span>
              )}
            </div>

            {e.message && (
              <p className="font-serif text-[15px] text-ink-soft italic leading-[1.6]">
                "{e.message}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
