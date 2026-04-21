import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = "https://perfectionails.com.au";

/**
 * Dynamic sitemap — includes static pages and all published blog posts.
 * Regenerated at build time (ISR) so new posts are automatically included.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updatedAt: Date }[] = [];

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    /* DB not connected at build time — skip dynamic entries */
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/journal`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/journal/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
