// Tüm sayfa adresleri tek yerden çözülür:
//   /                  -> tr ana sayfa        /en/              -> en ana sayfa
//   /teknede-kahvalti/ -> tr hizmet           /en/jet-ski-rental/ -> en hizmet
//   /kvkk/             -> tr gizlilik         /en/privacy/      -> en gizlilik
import { isLocale, locales, privacySlug, type Locale } from "@/i18n/locales";
import { getService, services, type Service } from "@/lib/services";

export type Resolved = { lang: Locale } & ({ view: "home" } | { view: "privacy" } | { view: "service"; s: Service });

export function resolve(p: string[] = []): Resolved | null {
  const [a, b, ...rest] = p.map(decodeURIComponent);
  if (rest.length) return null;
  const lang: Locale = a && isLocale(a) && a !== "tr" ? a : "tr";
  const slug = lang === "tr" ? a : b;
  if (lang === "tr" && b) return null;
  if (!slug) return { lang, view: "home" };
  if (slug === privacySlug[lang]) return { lang, view: "privacy" };
  const s = getService(lang, slug);
  return s ? { lang, view: "service", s } : null;
}

export function allPaths(): { p: string[] }[] {
  const out: { p: string[] }[] = [];
  for (const l of locales) {
    const pre = l === "tr" ? [] : [l];
    out.push({ p: pre });
    out.push({ p: [...pre, privacySlug[l]] });
    for (const s of services) out.push({ p: [...pre, s.text[l].slug] });
  }
  return out;
}
