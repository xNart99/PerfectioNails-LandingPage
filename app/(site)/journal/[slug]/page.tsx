import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PostCard, { PostCardProps } from "@/components/blog/PostCard";

interface BlogPostPageProps {
  params: { slug: string };
}

/**
 * Blog post page.
 * In Part 3 this will fetch real content from the database.
 * For now it renders a static sample post.
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  /* TODO (Part 3): fetch post from DB and return dynamic metadata */
  return {
    title: "Soft-glam for autumn: the Brisbane nail trends we're loving right now",
    description:
      "A Camp Hill nail tech's guide to the April 2026 trends — milk baths, coffee chromes, almond shapes and the three looks we're quietly retiring.",
    openGraph: {
      type: "article",
      url: `https://perfectionails.com.au/journal/${params.slug}`,
      images: [{ url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&auto=format&fit=crop" }],
    },
  };
}

const relatedPosts: PostCardProps[] = [
  {
    slug: "gel-manicure-last-three-weeks",
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=700&auto=format&fit=crop",
    category: "Care",
    readTime: "4 min",
    date: "Mar 2026",
    title: "How to make a gel manicure last three full weeks",
    excerpt: "Seven small habits that change everything.",
  },
  {
    slug: "sns-vs-gel-brisbane-climate",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=700&auto=format&fit=crop",
    category: "Trends",
    readTime: "5 min",
    date: "Feb 2026",
    title: "Is SNS better than gel? A Brisbane comparison",
    excerpt: "Six clients, six weeks, photographed everything.",
  },
  {
    slug: "bridal-nails-2026-camp-hill",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=700&auto=format&fit=crop",
    category: "Trends",
    readTime: "7 min",
    date: "Jan 2026",
    title: "Bridal nails 2026: five looks our Camp Hill brides are booking",
    excerpt: "Pearl tips, glazed donut and the quiet chrome.",
  },
];

const trendItems = [
  {
    num: "01",
    title: "The Milk Bath",
    body: "A sheer, warm white with just a whisper of pink underneath — think the colour of café latte foam, not office paper. Works on any skin tone, photographs beautifully, and hides grow-out for longer than you'd expect. Ask for it on an almond or short-square shape.",
  },
  {
    num: "02",
    title: "Coffee Chrome",
    body: "The chrome trend that refused to die, but grown up. Warm espresso brown base, mirror-chrome powder on top — the effect is wet, expensive and surprisingly office-friendly. Pair it with gold jewellery and you're done.",
  },
  {
    num: "03",
    title: "The Almond Comeback",
    body: "Short squares had their moment. Almond is back — but shorter, softer, and a little more rounded at the tip than the spiky 2019 version. It's the shape asking for soft colours and simple art. 95% of our gel bookings this month went to this shape.",
  },
  {
    num: "04",
    title: "Ribbon French",
    body: "A hand-painted micro tip, 1–1.5mm wide, done in soft gold instead of white. Reads as French from across the room, reads as art up close. Our go-to for clients who \"don't usually do french\" but want something that lasts through a wedding.",
  },
  {
    num: "05",
    title: "Single-Flower Orchid",
    body: "One hand-painted orchid on the ring finger, rest of the set in the softest milk-bath nude. We've painted this so many times this month it's earned its own name in our books — the \"Samuel Street special.\" A love letter to our shopfront florals.",
  },
];

export default function BlogPostPage({ params: _ }: BlogPostPageProps) {
  return (
    <>
      <article>
        {/* Post hero */}
        <header className="pt-[160px] pb-[60px] text-center max-w-[820px] mx-auto px-[clamp(20px,4vw,56px)]">
          {/* Breadcrumb */}
          <div className="flex justify-center gap-2.5 font-sans text-[11px] tracking-[0.2em] uppercase text-ink-faint mb-8">
            <Link href="/" className="hover:text-gold-deep transition-colors">Home</Link>
            <span className="text-gold">/</span>
            <Link href="/journal" className="hover:text-gold-deep transition-colors">Journal</Link>
            <span className="text-gold">/</span>
            <span>Trends</span>
          </div>

          <div className="inline-block px-3.5 py-1.5 border border-gold text-gold-deep font-sans text-[10px] tracking-[0.25em] uppercase font-medium mb-7">
            Trends · April 2026
          </div>

          <h1 className="font-display text-[clamp(44px,6vw,76px)] leading-[1.05] mb-8">
            Soft-glam for autumn: the Brisbane nail trends we're loving right now
          </h1>

          <p className="font-serif italic text-[20px] leading-[1.55] text-ink-soft max-w-[640px] mx-auto mb-10">
            Milk baths, coffee chromes and the quiet return of the almond shape — a field guide to what your nail artist is reaching for this season.
          </p>

          {/* Byline */}
          <div className="flex justify-center items-center gap-3.5 py-[22px] border-t border-b border-rule max-w-[560px] mx-auto">
            <div className="w-11 h-11 rounded-full bg-gold text-ink font-serif text-[18px] grid place-items-center flex-shrink-0">C</div>
            <div className="text-left text-[13px]">
              <strong className="block text-ink font-medium">Chi Nguyen</strong>
              <span className="text-ink-faint font-sans text-[11px] tracking-[0.15em] uppercase">Founder · 12 years nail artistry</span>
            </div>
            <div className="w-px h-8 bg-rule mx-1" />
            <div className="text-left text-[13px]">
              <strong className="block text-ink font-medium">5 min read</strong>
              <span className="text-ink-faint font-sans text-[11px] tracking-[0.15em] uppercase">21 April 2026</span>
            </div>
          </div>
        </header>

        {/* Cover image */}
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,56px)] mt-10">
          <div className="aspect-[16/9] relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1400&auto=format&fit=crop"
              alt="Autumn nail trends 2026"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article body */}
        <div className="prose-nail max-w-[720px] mx-auto py-20 px-[clamp(20px,4vw,56px)] relative z-[2]">

          {/* Table of contents — floating sidebar on desktop */}
          <aside className="hidden xl:block sticky top-[100px] float-right w-[200px] -mr-[260px] pl-6 border-l border-rule text-[13px] mb-8">
            <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-deep font-medium mb-4">
              In this story
            </div>
            <ul className="list-none space-y-2">
              {["Why now", "The five we love", "What we're retiring", "Book the look"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "")}`} className="text-ink-soft hover:text-gold-deep transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <p className="lede">
            April in Brisbane is a weird in-between. The air is cooling but the sun still thinks it's summer, the wardrobe is half linen and half wool, and our clients are arriving in the studio with two kinds of energy — bored of their summer look, not quite ready for anything dark. So what are we actually painting?
          </p>

          <p>
            Over the last four weeks at Perfectionails we've quietly watched the same five finishes get booked over and over again. They're soft, they're warm, and they photograph beautifully against a flat white. Here's the full list — along with three trends we're politely saying goodbye to.
          </p>

          <h2 id="why-now">Why "soft-glam" feels right, right now</h2>
          <p>
            If 2025 was loud — chromes that could stop traffic, french tips in neon, full-set charms — 2026 is whispering. There's a broader design shift happening in Brisbane: quieter interiors, longer hair, subtler makeup. Nails are catching up.
          </p>

          <blockquote>
            A good nude in 2026 is not a beige. It's a warm, slightly milky, slightly pink, slightly grey — and it changes with the light.
            <cite>— Chi, from the chair</cite>
          </blockquote>

          <h2 id="the-five-we-love">The five looks we're loving right now</h2>

          {trendItems.map(({ num, title, body }) => (
            <div key={num} className="grid grid-cols-[100px_1fr] gap-5 py-7 border-b border-rule items-start">
              <div className="font-display text-[48px] text-gold-deep leading-[0.9]">{num}</div>
              <div>
                <h3 className="mt-0 mb-2.5">{title}</h3>
                <p className="text-[17px] leading-[1.6] mb-0">{body}</p>
              </div>
            </div>
          ))}

          {/* Inline image */}
          <figure className="my-12 -mx-[60px] max-md:mx-0">
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1200&auto=format&fit=crop"
                alt="The Samuel Street special — orchid on milk-bath almond set"
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="font-mono text-[11px] tracking-[0.12em] text-ink-faint mt-3 text-center">
              The "Samuel Street special" — a single orchid on an almond milk-bath set.
            </figcaption>
          </figure>

          {/* Pull quote */}
          <div className="my-14 py-10 text-center border-t border-b border-gold">
            <p className="font-display text-[36px] leading-[1.15] text-ink m-0">
              "The best 2026 nail is the one you forget you're wearing until someone compliments it."
            </p>
            <span className="block font-sans text-[11px] tracking-[0.22em] uppercase text-gold-deep mt-[18px]">
              Chi Nguyen · Perfectionails
            </span>
          </div>

          <h2 id="what-were-retiring">What we're (politely) retiring</h2>
          <p>No judgement — trends come and go and nothing is forever. But three things we quietly won't be suggesting this autumn:</p>

          <ul>
            <li><strong>Extra-long coffin shapes.</strong> Hard to keep clean, harder to type on, and no longer the flex they were two years ago.</li>
            <li><strong>High-pigment neon pinks and greens.</strong> Still a summer joy, but they clash with autumn linens. Revisit in October.</li>
            <li><strong>Heavy 3D charms on daily-wear sets.</strong> Beautiful for a shoot, exhausting by day three. Keep them for events.</li>
          </ul>

          <h2 id="book-the-look">Want to try one of these?</h2>
          <p>
            All five looks above are on our regular{" "}
            <Link href="/#services">services menu</Link> — no "trend tax," no hidden upsell. If you'd like to book one in,{" "}
            <a href="tel:0489191550">give us a call on 0489 191 550</a>, text the studio, or walk in.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 my-10">
            {["nail trends", "Brisbane", "autumn 2026", "gel manicure", "almond shape", "milk bath"].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-2 font-sans text-[11px] tracking-[0.15em] uppercase text-ink-soft border border-rule hover:border-gold hover:text-gold-deep transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share bar */}
          <div className="flex items-center gap-3.5 py-10 border-t border-b border-rule my-10">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-ink-faint mr-auto">
              Share this story
            </span>
            {[
              { label: "Instagram", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg> },
              { label: "Facebook", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.3-2 2-2h2V2h-3c-3 0-4.5 1.8-4.5 4.5V10H6v4h3.5v8H13z"/></svg> },
              { label: "Copy link", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg> },
            ].map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 border border-rule rounded-full grid place-items-center text-ink-soft hover:bg-ink hover:text-cream hover:border-ink transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-ink text-cream py-[72px] text-center relative z-[2]">
          <div className="container">
            <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold font-medium">
              Book a chair
            </div>
            <h3 className="font-display text-[clamp(36px,5vw,56px)] text-cream mt-4 mb-5 font-normal">
              Try a soft-glam set this week.
            </h3>
            <p className="text-[color-mix(in_oklab,oklch(0.985_0.008_85)_72%,transparent)] max-w-[480px] mx-auto mb-7">
              We keep our diary small — Thursdays late and Sunday afternoons are usually our quietest slots. Walk-in welcome, or call ahead for nail art.
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
            {relatedPosts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
