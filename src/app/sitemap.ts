import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/${s.slug}/`, priority: 0.8 })),
    { url: `${site.url}/kvkk/`, priority: 0.2 },
  ];
}
