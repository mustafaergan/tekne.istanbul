import type { Metadata, Viewport } from "next";
import { Document } from "@/components/Shell";
import { site } from "@/lib/site";
import { allPaths, resolve } from "./route-map";

export const dynamicParams = false;
export const generateStaticParams = allPaths;

export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: "tekne.istanbul", template: "%s | tekne.istanbul" } };
export const viewport: Viewport = { themeColor: "#0569a8" };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ p?: string[] }> }) {
  const { p } = await params;
  return <Document lang={resolve(p)?.lang ?? "tr"}>{children}</Document>;
}
