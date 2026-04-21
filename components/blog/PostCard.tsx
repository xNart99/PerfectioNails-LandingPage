import Image from "next/image";
import Link from "next/link";

export interface PostCardProps {
  slug: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
}

/** Reusable blog post card used in the grid and related posts. */
export default function PostCard({ slug, image, category, readTime, date, title, excerpt }: PostCardProps) {
  return (
    <article className="flex flex-col cursor-pointer group transition-all duration-[400ms] hover:-translate-y-1">
      <div className="aspect-[4/3] relative overflow-hidden mb-5">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-[800ms] group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex gap-3 font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint mb-3">
        <span className="text-gold-deep font-medium">{category}</span>
        <span>{readTime}</span>
        <span>{date}</span>
      </div>

      <h3 className="font-serif text-[24px] leading-[1.2] mb-2.5 transition-colors duration-300 group-hover:text-gold-deep">
        {title}
      </h3>

      <p className="text-[14.5px] text-ink-soft leading-[1.55] mb-3.5 flex-1">{excerpt}</p>

      <Link
        href={`/journal/${slug}`}
        className="font-sans text-[11px] tracking-[0.2em] uppercase font-medium text-ink pb-0.5 border-b border-gold self-start hover:text-gold-deep transition-colors"
      >
        Continue reading →
      </Link>
    </article>
  );
}
