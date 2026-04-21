import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard, { PostCardProps } from "@/components/blog/PostCard";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&auto=format&fit=crop";

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-AU", { month: "short", year: "numeric" });
}

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!post) return {};

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    openGraph: {
      type: "article",
      url: `https://perfectionails.com.au/journal/${post.slug}`,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!post) notFound();

  const related = await prisma.post.findMany({
    where: { published: true, category: post.category, slug: { not: post.slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const toCardProps = (p: typeof post): PostCardProps => ({
    slug: p.slug,
    image: p.coverImage ?? FALLBACK_IMAGE,
    category: p.category,
    readTime: p.readTime,
    date: formatDateShort(p.publishedAt),
    title: p.title,
    excerpt: p.excerpt,
  });

  return (
    <>
      <article>
        {/* Post hero */}
        <header className="pt-[160px] pb-[60px] text-center max-w-[820px] mx-auto px-[clamp(20px,4vw,56px)]">
          {/* Breadcrumb */}
          <div className="flex justify-center gap-2.5 font-sans text-[11px] tracking-[0.2em] uppercase text-ink-faint mb-8">
            <Link href="/" className="hover:text-gold-deep transition-colors">
              Home
            </Link>
            <span className="text-gold">/</span>
            <Link
              href="/journal"
              className="hover:text-gold-deep transition-colors"
            >
              Journal
            </Link>
            <span className="text-gold">/</span>
            <span>{post.category}</span>
          </div>

          <div className="inline-block px-3.5 py-1.5 border border-gold text-gold-deep font-sans text-[10px] tracking-[0.25em] uppercase font-medium mb-7">
            {post.category} · {formatDate(post.publishedAt)}
          </div>

          <h1 className="font-display text-[clamp(44px,6vw,76px)] leading-[1.05] mb-8">
            {post.title}
          </h1>

          <p className="font-serif italic text-[20px] leading-[1.55] text-ink-soft max-w-[640px] mx-auto mb-10">
            {post.excerpt}
          </p>

          {/* Byline */}
          <div className="flex justify-center items-center gap-3.5 py-[22px] border-t border-b border-rule max-w-[560px] mx-auto">
            <div className="w-11 h-11 rounded-full bg-gold text-ink font-serif text-[18px] grid place-items-center flex-shrink-0">
              A
            </div>
            <div className="text-left text-[13px]">
              <strong className="block text-ink font-medium">
                Perfectionails
              </strong>
              <span className="text-ink-faint font-sans text-[11px] tracking-[0.15em] uppercase">
                Camp Hill Nail Studio
              </span>
            </div>
            <div className="w-px h-8 bg-rule mx-1" />
            <div className="text-left text-[13px]">
              <strong className="block text-ink font-medium">
                {post.readTime}
              </strong>
              <span className="text-ink-faint font-sans text-[11px] tracking-[0.15em] uppercase">
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,56px)] mt-10">
            <div className="aspect-[16/9] relative overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article body */}
        <div
          className="prose-nail max-w-[720px] mx-auto py-20 px-[clamp(20px,4vw,56px)] relative z-[2]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="max-w-[720px] mx-auto px-[clamp(20px,4vw,56px)] pb-10">
            <div className="flex flex-wrap gap-2.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-2 font-sans text-[11px] tracking-[0.15em] uppercase text-ink-soft border border-rule hover:border-gold hover:text-gold-deep transition-all cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA banner */}
        <div className="bg-ink text-cream py-[72px] text-center relative z-[2]">
          <div className="container">
            <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold font-medium">
              Book a chair
            </div>
            <h3 className="font-display text-[clamp(36px,5vw,56px)] text-cream mt-4 mb-5 font-normal">
              Ready to book?
            </h3>
            <p className="text-[color-mix(in_oklab,oklch(0.985_0.008_85)_72%,transparent)] max-w-[480px] mx-auto mb-7">
              Thursdays late and Sunday afternoons are usually our quietest
              slots. Walk-in welcome, or call ahead for nail art.
            </p>
            <a
              href="tel:0489191550"
              className="inline-flex items-center gap-2.5 px-8 py-4 font-sans text-[12px] tracking-[0.22em] uppercase font-medium border border-gold bg-gold text-cream transition-all duration-300 hover:bg-gold-deep hover:border-gold-deep"
            >
              Call 0489 191 550
            </a>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-[100px] bg-cream-warm">
          <div className="container">
            <div className="text-center mb-14">
              <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
                Keep reading
              </div>
              <h2 className="font-display text-[clamp(40px,5vw,60px)] mt-4">
                More from the journal.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <PostCard key={p.slug} {...toCardProps(p)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
