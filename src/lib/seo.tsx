import type { Metadata } from "next";
import { home, locales, ogLocale, path, policySlug, privacySlug, type Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";
import { services, type Service } from "./services";
import { site } from "./site";

/** Sayfa anahtarı: ana sayfa, gizlilik ya da bir hizmetin id'si */
export type PageKey = { kind: "home" } | { kind: "privacy" } | { kind: "policy" } | { kind: "service"; id: string };

export function pagePath(l: Locale, key: PageKey): string {
  if (key.kind === "home") return home(l);
  if (key.kind === "privacy") return path(l, privacySlug[l]);
  if (key.kind === "policy") return path(l, policySlug[l]);
  const s = services.find((x) => x.id === key.id)!;
  return path(l, s.text[l].slug);
}

export const abs = (p: string) => `${site.url}${p}`;

/** hreflang: her dil + x-default (Türkçe) */
export function languages(key: PageKey): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of locales) out[l] = abs(pagePath(l, key));
  out["x-default"] = abs(pagePath("tr", key));
  return out;
}

export function buildMetadata(l: Locale, key: PageKey, title: string, description: string, opts: { absoluteTitle?: boolean; noindex?: boolean } = {}): Metadata {
  const url = abs(pagePath(l, key));
  if (!opts.absoluteTitle) title = `${title} | tekne.istanbul`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languages(key) },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "tekne.istanbul",
      locale: ogLocale[l],
      alternateLocale: locales.filter((x) => x !== l).map((x) => ogLocale[x]),
      images: [{ url: abs("/og.png"), width: 1200, height: 630, alt: "tekne.istanbul" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [abs("/og.png")] },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const ORG_ID = `${site.url}/#isletme`;

export function businessLd(l: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "TravelAgency"],
        "@id": ORG_ID,
        name: "tekne.istanbul",
        url: abs(home(l)),
        description: ui[l].meta.description,
        telephone: site.phoneHref,
        email: site.email,
        image: abs("/og.png"),
        logo: abs("/icon.svg"),
        address: { "@type": "PostalAddress", addressLocality: "İstanbul", addressCountry: "TR" },
        areaServed: { "@type": "City", name: "Istanbul" },
        availableLanguage: ["tr", "en", "ar", "fr", "it"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: ui[l].nav.services,
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.text[l].title, url: abs(pagePath(l, { kind: "service", id: s.id })) },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#site`,
        url: site.url,
        name: "tekne.istanbul",
        inLanguage: l,
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "FAQPage",
        inLanguage: l,
        mainEntity: ui[l].faq.items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };
}

export function serviceLd(l: Locale, s: Service) {
  const tx = s.text[l];
  const url = abs(pagePath(l, { kind: "service", id: s.id }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: tx.title,
        description: tx.description,
        url,
        inLanguage: l,
        serviceType: tx.title,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: "Istanbul" },
        ...(s.priceFrom
          ? { offers: { "@type": "Offer", priceCurrency: "TRY", price: s.priceFrom, url, availability: "https://schema.org/InStock" } }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui[l].page.home, item: abs(home(l)) },
          { "@type": "ListItem", position: 2, name: tx.title, item: url },
        ],
      },
    ],
  };
}
