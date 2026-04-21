import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CategoryNav from "@/components/blog/CategoryNav";
import PostCard, { PostCardProps } from "@/components/blog/PostCard";
import NewsletterBlock from "@/components/blog/NewsletterBlock";

export const metadata: Metadata = {
  title: "The Journal — Nail Care Tips, Trends & Camp Hill Notes",
  description:
    "Seasonal nail trends, honest care advice and Camp Hill stories from Perfectionails — a boutique nail studio on Samuel Street, Brisbane.",
  alternates: { canonical: "https://perfectionails.com.au/journal" },
};

/* ---------- Static seed data (replaced by DB queries in Part 3) ---------- */
const featured = {
  slug: "soft-glam-autumn-brisbane-nail-trends",
  image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&auto=format&fit=crop",
  category: "Trends",
  readTime: "5 min read",
  date: "21 Apr 2026",
  author: "Chi Nguyen",
  title: "Soft-glam for autumn: the Brisbane nail trends we're loving right now",
  excerpt: "Milk baths, coffee chromes, and the quiet return of the almond shape. A field guide to what your nail artist is reaching for this season — and the three we're politely retiring.",
};

const posts: PostCardProps[] = [
  {
    slug: "gel-manicure-last-three-weeks",
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=700&auto=format&fit=crop",
    category: "Care",
    readTime: "4 min",
    date: "Mar 2026",
    title: "How to make a gel manicure last three full weeks (without the lift)",
    excerpt: "Most early lifting isn't the gel — it's what happened thirty seconds before we applied it. Seven small habits that change everything.",
  },
  {
    slug: "perfect-saturday-camp-hill",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=700&auto=format&fit=crop",
    category: "Camp Hill",
    readTime: "6 min",
    date: "Mar 2026",
    title: "A perfect Saturday in Camp Hill — coffee, nails, and where to wander next",
    excerpt: "Our favourite local loop: flat white at Martha St., fresh set at Samuel St., and a slow walk through Whites Hill Reserve.",
  },
  {
    slug: "bitten-to-beautiful-nail-rehab",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=700&auto=format&fit=crop",
    category: "Before & After",
    readTime: "3 min",
    date: "Feb 2026",
    title: "From bitten to beautiful: one client's six-month nail rehab journey",
    excerpt: "What can happen in 24 weeks when you stop picking, stop biting, and let a patient nail tech do the rest. Real photos, real honesty.",
  },
  {
    slug: "sns-vs-gel-brisbane-climate",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=700&auto=format&fit=crop",
    category: "Trends",
    readTime: "5 min",
    date: "Feb 2026",
    title: "Is SNS better than gel? A nail tech's honest comparison for Brisbane climates",
    excerpt: "Humidity, swimming, that brutal Queensland summer — which finish actually survives? We put six clients through the test and photographed everything.",
  },
  {
    slug: "evening-ritual-cuticles",
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=700&auto=format&fit=crop",
    category: "Care",
    readTime: "4 min",
    date: "Feb 2026",
    title: "The three-minute evening ritual that completely changed my cuticles",
    excerpt: "A bottle of oil, two drops, and thirty seconds at bedtime. Here's the routine we quietly recommend to every guest — and the products we actually use.",
  },
  {
    slug: "bridal-nails-2026-camp-hill",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=700&auto=format&fit=crop",
    category: "Trends",
    readTime: "7 min",
    date: "Jan 2026",
    title: "Bridal nails 2026: five looks our Camp Hill brides are actually asking for",
    excerpt: "Pearl tips, glazed-donut, quiet chrome and the \"barely there\" french that photographs beautifully. Plus timing, trials and what to tell your artist.",
  },
  {
    slug: "nails-peel-summer-fix",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=700&auto=format&fit=crop",
    category: "Care",
    readTime: "3 min",
    date: "Jan 2026",
    title: "Why your nails peel in summer — and the fix that actually works",
    excerpt: "Brisbane humidity plus air-con plus hand sanitiser equals the dreaded peel. A short, practical note from the chair.",
  },
  {
    slug: "five-businesses-samuel-street",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=700&auto=format&fit=crop",
    category: "Camp Hill",
    readTime: "5 min",
    date: "Jan 2026",
    title: "Five small businesses on Samuel Street we'd send our own mums to",
    excerpt: "The florist, the coffee, the butcher, the bookshop — and one very good bakery. Our little love letter to the strip we call home.",
  },
  {
    slug: "acrylic-damaged-nails-rescue",
    image: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?w=700&auto=format&fit=crop",
    category: "Before & After",
    readTime: "4 min",
    date: "Dec 2025",
    title: "We transformed these acrylics-damaged nails in one visit — here's how",
    excerpt: "Thin, bendy, and a little heartbroken — one guest's rescue with a full soak-off, IBX treatment, and a very gentle SNS reset.",
  },
];

const POSTS_PER_PAGE = 9;

interface JournalPageProps {
  searchParams: { category?: string; page?: string };
}

/**
 * Blog listing page.
 * Supports category filtering and pagination via URL search params.
 * CategoryNav is wrapped in Suspense because it uses useSearchParams().
 */
export default function JournalPage({ searchParams }: JournalPageProps) {
  const category = searchParams.category ?? "all";
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));

  const filtered = category === "all"
    ? posts
    : posts.filter((p) => p.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-") === category);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <>
      {/* Hero */}
      <section className="pt-[180px] pb-20 text-center border-b border-rule relative">
        <div className="container">
          <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
            The Journal
          </div>
          <h1 className="font-display text-[clamp(64px,10vw,140px)] leading-none my-5">
            Notes from<br />the{" "}
            <em className="font-serif italic font-light text-gold-deep">studio.</em>
          </h1>
          <p className="max-w-[560px] mx-auto text-ink-soft text-[17px]">
            Seasonal trends, honest care advice and the occasional Camp Hill favourite — written slowly, by the same hands doing your nails.
          </p>
        </div>
      </section>

      {/* Category filter — wrapped in Suspense for client-side hook */}
      <Suspense fallback={null}>
        <CategoryNav />
      </Suspense>

      {/* Featured post */}
      {category === "all" && page === 1 && (
        <section className="py-20 border-b border-rule">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(32px,6vw,80px)] items-center">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2.5 font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-5 before:content-['✦']">
                  Editor&apos;s pick · April 2026
                </div>
                <h2 className="font-display text-[clamp(40px,5.5vw,64px)] leading-[1.05] mb-6">
                  {featured.title}
                </h2>
                <p className="font-serif text-[19px] text-ink-soft leading-[1.55] mb-7">
                  {featured.excerpt}
                </p>
                <div className="flex gap-6 font-sans text-[11px] tracking-[0.18em] uppercase text-ink-faint py-[18px] border-t border-b border-rule mb-7">
                  <span className="text-gold-deep font-medium">{featured.category}</span>
                  <span>{featured.readTime}</span>
                  <span>{featured.date}</span>
                  <span>By {featured.author}</span>
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
                <PostCard key={post.slug} {...post} />
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
