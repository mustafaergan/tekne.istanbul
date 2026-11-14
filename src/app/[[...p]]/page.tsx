import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeView, homeMetadata } from "@/views/HomeView";
import { ServiceView, serviceMetadata } from "@/views/ServiceView";
import { PrivacyView, privacyMetadata } from "@/views/PrivacyView";
import { allPaths, resolve } from "./route-map";

export const dynamicParams = false;
export const generateStaticParams = allPaths;

type Props = { params: Promise<{ p?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolve((await params).p);
  if (!r) return {};
  if (r.view === "home") return homeMetadata(r.lang);
  if (r.view === "privacy") return privacyMetadata(r.lang);
  return serviceMetadata(r.lang, r.s);
}

export default async function Page({ params }: Props) {
  const r = resolve((await params).p);
  if (!r) notFound();
  if (r.view === "home") return <HomeView lang={r.lang} />;
  if (r.view === "privacy") return <PrivacyView lang={r.lang} />;
  return <ServiceView lang={r.lang} s={r.s} />;
}
