import { MetadataRoute } from "next";

/** Robots.txt — allow all crawlers, disallow the admin panel. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/login"],
      },
    ],
    sitemap: "https://perfectionails.com.au/sitemap.xml",
  };
}
