import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import { services } from "@/lib/services";
import { abs, languages, pagePath, type PageKey } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const keys: [PageKey, number][] = [
    [{ kind: "home" }, 1],
    ...services.map((s): [PageKey, number] => [{ kind: "service", id: s.id }, 0.8]),
    [{ kind: "privacy" }, 0.2],
  ];
  const now = new Date();
  return keys.flatMap(([key, priority]) =>
    locales.map((l) => ({
      url: abs(pagePath(l, key)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: l === "tr" ? priority : priority * 0.9,
      alternates: { languages: languages(key) },
    })),
  );
}
