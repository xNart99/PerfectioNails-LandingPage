import Image from "next/image";
import Link from "next/link";

const previewPosts = [
  {
    slug: "soft-glam-autumn-brisbane-nail-trends",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&auto=format&fit=crop",
    category: "Trends",
    readTime: "5 min read",
    date: "Apr 2026",
    title: "Soft-glam for autumn: the Brisbane nail trends we're loving right now",
    excerpt: "Milk baths, coffee chromes and the quiet return of the almond shape — here's what your nail artist is reaching for this April.",
    num: "01/24",
  },
  {
    slug: "gel-manicure-last-three-weeks",
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=700&auto=format&fit=crop",
    category: "Care",
    readTime: "4 min read",
    date: "Mar 2026",
    title: "How to make a gel manicure last three full weeks (without the lift)",
    excerpt: "Most early lifting isn't the gel — it's what happened 30 seconds before we applied it. Seven small habits that change everything.",
    num: "02/24",
  },
  {
    slug: "perfect-saturday-camp-hill",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=700&auto=format&fit=crop",
    category: "Camp Hill",
    readTime: "6 min read",
    date: "Mar 2026",
    title: "A perfect Saturday in Camp Hill — coffee, nails, and where to wander next",
    excerpt: "Our favourite local loop: flat white at Martha St., fresh set at Samuel St., and a slow walk through Whites Hill Reserve.",
    num: "03/24",
  },
];

/**
 * Blog preview section on the landing page.
 * Shows 3 latest posts; data is static here (replaced by DB data in Part 3).
 */
export default function BlogPreview() {
  return (
    <section id="journal" className="py-[clamp(72px,10vw,140px)] bg-cream-warm relative">
      <div className="container">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-8 mb-14 reveal">
          <div>
            <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
              Journal
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,72px)] mt-4">
              Notes from the studio.
            </h2>
            <p className="text-ink-soft max-w-[440px] mt-3.5">
              Seasonal trends, honest care advice and the occasional Camp Hill favourite — written slowly, by the same hands doing your nails.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
          {previewPosts.map(({ slug, image, category, readTime, date, title, excerpt, num }) => (
            <article
              key={slug}
              className="bg-cream border border-rule overflow-hidden transition-all duration-[400ms] flex flex-col hover:border-gold hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_oklch(0.2_0.01_80/0.25)]"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <div className="flex gap-3.5 font-sans text-[10px] tracking-[0.2em] uppercase text-ink-faint mb-3.5">
                  <span className="text-gold-deep font-medium">{category}</span>
                  <span>{readTime}</span>
                  <span>{date}</span>
                </div>
                <h3 className="font-serif text-[22px] leading-[1.25] mb-3 transition-colors duration-300 group-hover:text-gold-deep">
                  {title}
                </h3>
                <p className="text-[14.5px] text-ink-soft leading-[1.55] mb-5 flex-1">{excerpt}</p>
                <div className="flex justify-between items-center font-sans text-[11px] tracking-[0.12em] uppercase pt-4 border-t border-rule-soft">
                  <Link
                    href={`/journal/${slug}`}
                    className="inline-flex items-center gap-1.5 text-ink font-medium hover:text-gold-deep hover:gap-3 transition-all duration-300"
                  >
                    Read the story →
                  </Link>
                  <span className="text-ink-faint">{num}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-sans text-[12px] tracking-[0.22em] uppercase font-medium border border-ink text-ink bg-transparent transition-all duration-300 hover:bg-ink hover:text-cream"
          >
            Browse the Journal
          </Link>
        </div>
      </div>
    </section>
  );
}
