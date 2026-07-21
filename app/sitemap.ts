import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getPublishedPosts } from "@/lib/cms/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date();
  const staticPaths = [
    "",
    "/meet-ryan",
    "/priorities",
    "/issues",
    "/events",
    "/hb202",
    "/press",
    "/contact",
    "/donate",
    "/session-summary/2024",
    "/privacy-policy",
    "/terms",
  ];

  const posts = await getPublishedPosts();
  const issuePaths = posts.map((p) => `/issues/${p.slug}`);

  return [...staticPaths, ...issuePaths].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.7,
  }));
}
