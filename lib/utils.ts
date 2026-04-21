/**
 * Converts a post title into a URL-safe slug.
 * e.g. "Soft-glam for Autumn!" → "soft-glam-for-autumn"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Estimates reading time from HTML content string.
 * Average reading speed: 200 words/min.
 */
export function estimateReadTime(html: string): string {
  const wordCount = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
}

/**
 * Formats a Date as "21 Apr 2026".
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
