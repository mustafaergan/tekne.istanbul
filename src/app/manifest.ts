import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "tekne.istanbul",
    short_name: "tekne.istanbul",
    description: "İstanbul tekne kiralama, Boğaz turları ve tekne bakımı",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f9fc",
    theme_color: "#0569a8",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
