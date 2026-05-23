import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { issues } from "@/data/issues";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  const staticPaths = [
    "",
    "/meet-ryan",
    "/priorities",
    "/record",
    "/issues",
    "/events",
    "/hb202",
    "/scholarships",
    "/press",
    "/contact",
    "/get-involved",
    "/donate",
    "/session-summary/2024",
  ];

  const issuePaths = issues.map((i) => `/issues/${i.slug}`);

  return [...staticPaths, ...issuePaths].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.7,
  }));
}
