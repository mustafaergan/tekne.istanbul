import Link from "next/link";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";
import { CallbackForm } from "@/components/BookingPanel";
import { site, waLink } from "@/lib/site";
import { WaIcon } from "@/components/Icon";
import { Gulls, Skyline } from "@/components/Skyline";
import { businessLd, buildMetadata, JsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

export const homeMetadata = (l: Locale) => buildMetadata(l, { kind: "home" }, ui[l].meta.title, ui[l].meta.description, { absoluteTitle: true });

export function HomeView({ lang }: { lang: Locale }) {
  const t = ui[lang];
  const rent = services.filter((s) => s.category !== "bakim");
  const care = services.filter((s) => s.category === "bakim");

  return (
    <>
      <JsonLd data={businessLd(lang)} />
      <section className="waves relative overflow-hidden text-white">
        <Gulls className="absolute end-[12%] top-24 hidden w-28 text-white/70 sm:block" />
        <div className="wrap relative pb-6 pt-32 sm:pb-2 sm:pt-40">
          <p className="text-sm font-medium uppercase tracking-widest text-white/80">{t.hero.kicker}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">{t.hero.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#hizmetler" className="btn btn-primary">
              {t.hero.cta}
            </Link>
            <a href={waLink(t.wa.rent)} target="_blank" rel="noopener" className="btn bg-white/15 text-white hover:bg-white/25">
              <WaIcon /> WhatsApp
            </a>
          </div>
        </div>
        <Skyline />
      </section>

      <section id="hizmetler" className="wrap scroll-mt-6 pt-8">
        <h2 className="text-2xl font-bold sm:text-3xl">{t.rent.title}</h2>
        <p className="mt-2 text-dim">{t.rent.sub}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rent.map((s) => (
            <ServiceCard key={s.id} s={s} lang={lang} />
          ))}
        </div>
      </section>

      <section id="bakim" className="wrap scroll-mt-6 pt-16">
        <h2 className="text-2xl font-bold sm:text-3xl">{t.care.title}</h2>
        <p className="mt-2 text-dim">{t.care.sub}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {care.map((s) => (
            <ServiceCard key={s.id} s={s} lang={lang} />
          ))}
        </div>
      </section>

      <section className="wrap pt-16">
        <div className="grid gap-8 rounded-3xl bg-gradient-to-br from-sea-800 to-sea-700 p-6 text-white sm:p-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t.undecided.title}</h2>
            <p className="mt-3 text-sea-100/90">{t.undecided.sub}</p>
            <a href={`tel:${site.phoneHref}`} className="mt-4 inline-block text-2xl font-semibold text-accent" dir="ltr">
              {site.phone}
            </a>
          </div>
          <div className="rounded-2xl bg-white p-5 text-ink">
            <CallbackForm lang={lang} service="genel" />
          </div>
        </div>
      </section>

      <section className="wrap grid gap-10 pt-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">{t.intro.title}</h2>
          {t.intro.text.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-dim">
              {p}
            </p>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t.faq.title}</h2>
          <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {t.faq.items.map(([q, a]) => (
              <details key={q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="text-sea-700 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-dim">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
