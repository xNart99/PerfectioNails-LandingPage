"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { label: "All", value: "all", count: 24 },
  { label: "Trends", value: "trends", count: 8 },
  { label: "Nail Care", value: "care", count: 7 },
  { label: "Before & After", value: "before-after", count: 5 },
  { label: "Camp Hill", value: "camp-hill", count: 4 },
];

/**
 * Sticky category filter bar on the blog listing page.
 * Writes the selected category to the URL search param so the page
 * can be bookmarked and server-rendered with the correct filter.
 */
export default function CategoryNav() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("category") ?? "all";

  const select = (value: string) => {
    const url = value === "all" ? "/journal" : `/journal?category=${value}`;
    router.push(url, { scroll: false });
  };

  return (
    <div className="flex justify-center gap-1 py-5 border-b border-rule flex-wrap sticky top-[72px] bg-[color-mix(in_oklab,oklch(0.985_0.008_85)_92%,transparent)] backdrop-blur-[10px] z-40">
      {categories.map(({ label, value, count }) => (
        <button
          key={value}
          onClick={() => select(value)}
          className={`px-[22px] py-2.5 font-sans text-[11px] tracking-[0.22em] uppercase font-medium border transition-all duration-200 cursor-pointer
            ${active === value
              ? "border-ink text-ink"
              : "border-transparent text-ink-soft hover:text-gold-deep"
            }`}
        >
          {label}
          <span className="inline-block ml-1.5 text-[9px] text-gold-deep align-super">
            {String(count).padStart(2, "0")}
          </span>
        </button>
      ))}
    </div>
  );
}
