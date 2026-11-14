import Link from "next/link";
import { site, waLink } from "@/lib/site";
import { WaIcon } from "./Icon";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 text-white">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          tekne<span className="text-accent">.</span>istanbul
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/#hizmetler" className="hidden opacity-90 hover:opacity-100 sm:inline">
            Hizmetler
          </Link>
          <Link href="/#bakim" className="hidden opacity-90 hover:opacity-100 sm:inline">
            Bakım ve usta
          </Link>
          <a href={`tel:${site.phoneHref}`} className="rounded-full bg-white/15 px-4 py-2 font-medium hover:bg-white/25">
            Ara
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="wrap grid gap-6 py-10 text-sm text-dim sm:grid-cols-3">
        <div>
          <div className="text-base font-bold text-ink">
            tekne<span className="text-accent">.</span>istanbul
          </div>
          <p className="mt-2">{site.tagline}</p>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-ink">İletişim</div>
          <a className="block hover:text-ink" href={`tel:${site.phoneHref}`}>
            {site.phone}
          </a>
          <a className="block hover:text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-ink">Bilgi</div>
          <Link className="block hover:text-ink" href="/kvkk/">
            KVKK aydınlatma metni
          </Link>
          <span className="block">© {new Date().getFullYear()} tekne.istanbul</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={waLink("Merhaba, tekne.istanbul sitesinden yazıyorum.")}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp ile yazın"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105"
    >
      <WaIcon className="h-7 w-7" />
    </a>
  );
}
