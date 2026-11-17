import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { phoneFor, site, waLink } from "@/lib/site";
import { home, type Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

// Ödeme sistemi gelince kapora ve iade süreleri buraya, ayrıca mesafeli satış sözleşmesi ayrı sayfa olarak eklenecek.
export const policyMetadata = (l: Locale) => buildMetadata(l, { kind: "policy" }, ui[l].policy.title, ui[l].policy.description);

export function PolicyView({ lang }: { lang: Locale }) {
  const t = ui[lang];
  return (
    <div className="wrap max-w-3xl pt-28">
      <h1 className="text-3xl font-bold">{t.policy.title}</h1>
      <div className="mt-8 space-y-6">
        {t.policy.body.map(([h, p]) => (
          <section key={h}>
            <h2 className="text-lg font-semibold">{h}</h2>
            <p className="mt-2 leading-relaxed text-dim">{p}</p>
          </section>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={`tel:${site.phoneHref}`} className="btn btn-primary" dir="ltr">
          {phoneFor(lang)}
        </a>
        <a href={waLink(t.wa.hello)} target="_blank" rel="noopener" className="btn btn-ghost">
          WhatsApp
        </a>
        <Link href={home(lang)} className="btn btn-ghost">
          {t.page.home}
        </Link>
      </div>
    </div>
  );
}
