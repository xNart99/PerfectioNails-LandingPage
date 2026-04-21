import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { FileText, Mail, MessageSquare, PlusCircle } from "lucide-react";

/** Admin dashboard — shows quick stats and recent activity. */
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const [totalPosts, publishedPosts, subscribers, unreadEnquiries] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.subscriber.count({ where: { active: true } }),
    prisma.enquiry.count({ where: { read: false } }),
  ]);

  const recentPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, slug: true, title: true, published: true, category: true, createdAt: true },
  });

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-serif text-[32px] text-ink">Welcome back 👋</h1>
        <p className="text-ink-soft mt-1">Here's what's happening with your journal.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total posts", value: totalPosts, icon: FileText, color: "text-ink" },
          { label: "Published", value: publishedPosts, icon: FileText, color: "text-green-600" },
          { label: "Subscribers", value: subscribers, icon: Mail, color: "text-gold-deep" },
          { label: "Unread enquiries", value: unreadEnquiries, icon: MessageSquare, color: "text-red-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg p-5 border border-rule">
            <div className={`${color} mb-2`}>
              <Icon size={20} />
            </div>
            <div className="font-serif text-[32px] text-ink">{value}</div>
            <div className="font-sans text-[12px] text-ink-faint mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-10">
        <Link
          href="/dashboard/posts/new"
          className="inline-flex items-center gap-2 px-5 py-3 font-sans text-[12px] tracking-[0.15em] uppercase font-medium bg-ink text-cream border border-ink hover:bg-gold-deep hover:border-gold-deep transition-all"
        >
          <PlusCircle size={14} />
          Write a post
        </Link>
        <Link
          href="/dashboard/enquiries"
          className="inline-flex items-center gap-2 px-5 py-3 font-sans text-[12px] tracking-[0.15em] uppercase font-medium border border-rule text-ink hover:border-gold transition-all"
        >
          <MessageSquare size={14} />
          View enquiries {unreadEnquiries > 0 && `(${unreadEnquiries} new)`}
        </Link>
      </div>

      {/* Recent posts */}
      <div className="bg-white rounded-lg border border-rule overflow-hidden">
        <div className="px-6 py-4 border-b border-rule flex items-center justify-between">
          <h2 className="font-sans text-[14px] font-semibold text-ink">Recent posts</h2>
          <Link href="/dashboard/posts" className="font-sans text-[12px] text-gold-deep hover:underline">
            View all →
          </Link>
        </div>
        <table className="w-full">
          <tbody>
            {recentPosts.length === 0 && (
              <tr>
                <td className="px-6 py-8 text-center text-ink-faint font-serif italic" colSpan={3}>
                  No posts yet — write your first one!
                </td>
              </tr>
            )}
            {recentPosts.map((post) => (
              <tr key={post.id} className="border-b border-rule last:border-0 hover:bg-cream-warm/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-sans text-[14px] text-ink font-medium">{post.title}</div>
                  <div className="font-sans text-[12px] text-ink-faint mt-0.5">{post.category}</div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-block px-2 py-0.5 rounded font-sans text-[11px] font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/dashboard/posts/${post.id}/edit`}
                    className="font-sans text-[12px] text-gold-deep hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
