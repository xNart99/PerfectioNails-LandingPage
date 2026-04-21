import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { PlusCircle, Pencil, Globe, FileText } from "lucide-react";
import DeletePostButton from "@/components/admin/DeletePostButton";

/** Admin — list of all posts with publish status and edit/delete actions. */
export default async function PostsListPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, slug: true, title: true, category: true,
      published: true, publishedAt: true, createdAt: true, readTime: true,
    },
  });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[32px] text-ink">All Posts</h1>
          <p className="text-ink-soft mt-1">{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link
          href="/dashboard/posts/new"
          className="inline-flex items-center gap-2 px-5 py-3 font-sans text-[12px] tracking-[0.15em] uppercase font-medium bg-ink text-cream border border-ink hover:bg-gold-deep hover:border-gold-deep transition-all"
        >
          <PlusCircle size={14} />
          New post
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-rule overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-rule bg-cream-warm">
              <th className="px-6 py-3 text-left font-sans text-[11px] tracking-[0.15em] uppercase text-ink-faint">Title</th>
              <th className="px-4 py-3 text-left font-sans text-[11px] tracking-[0.15em] uppercase text-ink-faint">Category</th>
              <th className="px-4 py-3 text-left font-sans text-[11px] tracking-[0.15em] uppercase text-ink-faint">Status</th>
              <th className="px-4 py-3 text-left font-sans text-[11px] tracking-[0.15em] uppercase text-ink-faint">Date</th>
              <th className="px-6 py-3 text-right font-sans text-[11px] tracking-[0.15em] uppercase text-ink-faint">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td className="px-6 py-12 text-center text-ink-faint font-serif italic" colSpan={5}>
                  No posts yet.{" "}
                  <Link href="/dashboard/posts/new" className="text-gold-deep hover:underline">Write your first one →</Link>
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-rule last:border-0 hover:bg-cream-warm/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-sans text-[14px] text-ink font-medium line-clamp-1">{post.title}</div>
                  <div className="font-mono text-[11px] text-ink-faint mt-0.5">{post.slug}</div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-[12px] text-gold-deep">{post.category}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-sans text-[11px] font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {post.published ? <><Globe size={10} /> Published</> : <><FileText size={10} /> Draft</>}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="font-sans text-[12px] text-ink-faint">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })
                      : new Date(post.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    {post.published && (
                      <Link
                        href={`/journal/${post.slug}`}
                        target="_blank"
                        className="font-sans text-[12px] text-ink-faint hover:text-ink transition-colors"
                      >
                        View ↗
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/posts/${post.id}/edit`}
                      className="inline-flex items-center gap-1.5 font-sans text-[12px] text-gold-deep hover:underline"
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                    <DeletePostButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
