import Link from "next/link";
import { services, type Service } from "@/lib/services";
import { BookingPanel } from "@/components/BookingPanel";
import { Icon } from "@/components/Icon";
import { price } from "@/lib/format";
import { ServiceCard } from "@/components/ServiceCard";
import { Skyline } from "@/components/Skyline";
import { buildMetadata, JsonLd, serviceLd } from "@/lib/seo";
import { home, type Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

export const serviceMetadata = (l: Locale, s: Service) => {
  const tx = s.text[l];
  return buildMetadata(l, { kind: "service", id: s.id }, tx.seoTitle, `${tx.short} ${tx.description}`.slice(0, 158));
};

export function ServiceView({ lang, s }: { lang: Locale; s: Service }) {
  const t = ui[lang];
  const tx = s.text[lang];
  const others = services.filter((o) => o.category === s.category && o.id !== s.id).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceLd(lang, s)} />
      <section className="waves relative overflow-hidden text-white">
        <div className="wrap relative pb-4 pt-28">
          <nav aria-label="breadcrumb" className="text-sm text-white/80">
            <Link href={home(lang)} className="hover:text-white">
              {t.page.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`${home(lang)}#${s.category === "bakim" ? "bakim" : "hizmetler"}`} className="hover:text-white">
              {t.categories[s.category]}
            </Link>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: s.tone }}>
              <Icon name={s.icon} className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold sm:text-5xl">{tx.title}</h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{tx.short}</p>
        </div>
        <Skyline />
      </section>

      <div className="wrap grid gap-8 lg:grid-cols-[1fr_440px]">
        <div className="order-2 lg:order-1 lg:pt-4">
          <p className="text-lg leading-relaxed">{tx.description}</p>
          <dl className="mt-8 grid grid-cols-3 gap-3 text-sm">
            {tx.duration && (
              <div className="rounded-xl border border-line bg-white p-4">
                <dt className="text-dim">{t.page.duration}</dt>
                <dd className="mt-1 font-semibold">{tx.duration}</dd>
              </div>
            )}
            {tx.capacity && (
              <div className="rounded-xl border border-line bg-white p-4">
                <dt className="text-dim">{t.page.people}</dt>
                <dd className="mt-1 font-semibold">{tx.capacity}</dd>
              </div>
            )}
            <div className="rounded-xl border border-line bg-white p-4">
              <dt className="text-dim">{t.page.price}</dt>
              <dd className="mt-1 font-semibold">{price(lang, s.priceFrom)}</dd>
            </div>
          </dl>
          <h2 className="mt-10 text-xl font-semibold">{t.page.includes}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {tx.includes.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-ok">✓</span>
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-6">
            <BookingPanel lang={lang} id={s.id} />
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <section className="wrap pt-16">
          <h2 className="text-xl font-semibold">{t.page.seeAlso}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ServiceCard key={o.id} s={o} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
