import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CategoryNav from "@/components/blog/CategoryNav";
import PostCard, { PostCardProps } from "@/components/blog/PostCard";
import NewsletterBlock from "@/components/blog/NewsletterBlock";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Journal — Nail Care Tips, Trends & Camp Hill Notes",
  description:
    "Seasonal nail trends, honest care advice and Camp Hill stories from Perfectionails — a boutique nail studio on Samuel Street, Brisbane.",
  alternates: { canonical: "https://perfectionails.com.au/journal" },
};

const POSTS_PER_PAGE = 9;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&auto=format&fit=crop";

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-AU", { month: "short", year: "numeric" });
}

function formatDateLong(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface JournalPageProps {
  searchParams: { category?: string; page?: string };
}

export default async function JournalPage({ searchParams }: JournalPageProps) {
  const category = searchParams.category ?? "all";
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));

  const allPosts = await prisma.post.findMany({
    where: {
      published: true,
      ...(category !== "all"
        ? {
            category: {
              mode: "insensitive",
              equals: category
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            },
          }
        : {}),
    },
    orderBy: { publishedAt: "desc" },
  });

  const featured = category === "all" && page === 1 ? allPosts[0] : null;
  const gridPosts = featured ? allPosts.slice(1) : allPosts;

  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const paged = gridPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  const toCardProps = (p: (typeof allPosts)[0]): PostCardProps => ({
    slug: p.slug,
    image: p.coverImage ?? FALLBACK_IMAGE,
    category: p.category,
    readTime: p.readTime,
    date: formatDate(p.publishedAt),
    title: p.title,
    excerpt: p.excerpt,
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-[180px] pb-20 text-center border-b border-rule relative">
        <div className="container">
          <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
            The Journal
          </div>
          <h1 className="font-display text-[clamp(64px,10vw,140px)] leading-none my-5">
            Notes from
            <br />
            the{" "}
            <em className="font-serif italic font-light text-gold-deep">
              studio.
            </em>
          </h1>
          <p className="max-w-[560px] mx-auto text-ink-soft text-[17px]">
            Seasonal trends, honest care advice and the occasional Camp Hill
            favourite — written slowly, by the same hands doing your nails.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <Suspense fallback={null}>
        <CategoryNav />
      </Suspense>

      {/* Featured post */}
      {featured && (
        <section className="py-20 border-b border-rule">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(32px,6vw,80px)] items-center">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={featured.coverImage ?? FALLBACK_IMAGE}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2.5 font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-5 before:content-['✦']">
                  Editor&apos;s pick · {formatDateLong(featured.publishedAt)}
                </div>
                <h2 className="font-display text-[clamp(40px,5.5vw,64px)] leading-[1.05] mb-6">
                  {featured.title}
                </h2>
                <p className="font-serif text-[19px] text-ink-soft leading-[1.55] mb-7">
                  {featured.excerpt}
                </p>
                <div className="flex gap-6 font-sans text-[11px] tracking-[0.18em] uppercase text-ink-faint py-[18px] border-t border-b border-rule mb-7">
                  <span className="text-gold-deep font-medium">
                    {featured.category}
                  </span>
                  <span>{featured.readTime}</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                </div>
                <Link
                  href={`/journal/${featured.slug}`}
                  className="inline-flex items-center gap-2.5 px-8 py-4 font-sans text-[12px] tracking-[0.22em] uppercase font-medium border border-ink bg-ink text-cream transition-all duration-300 hover:bg-gold-deep hover:border-gold-deep"
                >
                  Read the story
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="py-20">
        <div className="container">
          {paged.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-12">
              {paged.map((post) => (
                <PostCard key={post.slug} {...toCardProps(post)} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-soft py-20 font-serif text-[20px] italic">
              No posts in this category yet — check back soon.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              {page > 1 && (
                <Link
                  href={`/journal?${new URLSearchParams({ ...(category !== "all" ? { category } : {}), page: String(page - 1) })}`}
                  className="px-4 h-10 border border-rule font-sans text-[11px] tracking-[0.2em] uppercase text-ink-soft hover:border-gold hover:text-ink transition-all flex items-center"
                >
                  ← Prev
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/journal?${new URLSearchParams({ ...(category !== "all" ? { category } : {}), page: String(p) })}`}
                  className={`w-10 h-10 border font-serif text-[15px] flex items-center justify-center transition-all duration-200
                    ${p === page ? "bg-ink text-cream border-ink" : "border-rule text-ink-soft hover:border-gold"}`}
                >
                  {p}
                </Link>
              ))}

              {page < totalPages && (
                <Link
                  href={`/journal?${new URLSearchParams({ ...(category !== "all" ? { category } : {}), page: String(page + 1) })}`}
                  className="px-4 h-10 border border-rule font-sans text-[11px] tracking-[0.2em] uppercase text-ink-soft hover:border-gold hover:text-ink transition-all flex items-center"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <NewsletterBlock />
    </>
  );
}
