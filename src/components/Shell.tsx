import Link from "next/link";
import { phoneFor, site, waLink } from "@/lib/site";
import { WaIcon } from "./Icon";
import { LangSwitch } from "./LangSwitch";
import { dir, home, path, policySlug, privacySlug, type Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";
import "@/app/globals.css";

function Logo() {
  return (
    <>
      tekne<span className="text-accent">.</span>istanbul
    </>
  );
}

export function Header({ lang }: { lang: Locale }) {
  const t = ui[lang].nav;
  return (
    <header className="absolute inset-x-0 top-0 z-20 text-white">
      <div className="wrap flex h-16 items-center justify-between gap-3">
        <Link href={home(lang)} className="text-lg font-bold tracking-tight" dir="ltr">
          <Logo />
        </Link>
        <nav className="flex items-center gap-3 text-sm sm:gap-5">
          <Link href={`${home(lang)}#hizmetler`} className="hidden opacity-90 hover:opacity-100 md:inline">
            {t.services}
          </Link>
          <Link href={`${home(lang)}#bakim`} className="hidden opacity-90 hover:opacity-100 md:inline">
            {t.care}
          </Link>
          <LangSwitch lang={lang} label={t.language} />
          <a href={`tel:${site.phoneHref}`} className="rounded-full bg-white/15 px-4 py-2 font-medium hover:bg-white/25">
            {t.call}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ lang }: { lang: Locale }) {
  const t = ui[lang].footer;
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="wrap grid gap-6 py-10 text-sm text-dim sm:grid-cols-3">
        <div>
          <div className="text-base font-bold text-ink" dir="ltr">
            <Logo />
          </div>
          <p className="mt-2">{t.tagline}</p>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-ink">{t.contact}</div>
          <a className="block hover:text-ink" href={`tel:${site.phoneHref}`} dir="ltr">
            {phoneFor(lang)}
          </a>
          <a className="block hover:text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-ink">{t.info}</div>
          <Link className="block hover:text-ink" href={path(lang, policySlug[lang])}>
            {t.policy}
          </Link>
          <Link className="block hover:text-ink" href={path(lang, privacySlug[lang])}>
            {t.privacy}
          </Link>
          <span className="block">© {new Date().getFullYear()} tekne.istanbul</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat({ lang }: { lang: Locale }) {
  return (
    <a
      href={waLink(ui[lang].wa.hello)}
      target="_blank"
      rel="noopener"
      aria-label={ui[lang].wa.float}
      className="fixed bottom-5 end-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105"
    >
      <WaIcon className="h-7 w-7" />
    </a>
  );
}

/** Her kök layout'un ortak iskeleti */
export function Document({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} dir={dir(lang)}>
      <body>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
        <WhatsAppFloat lang={lang} />
      </body>
    </html>
  );
}
