import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Shell";
import { Skyline } from "@/components/Skyline";
import "./globals.css";

export const metadata: Metadata = { title: "Sayfa bulunamadı | tekne.istanbul", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="tr">
      <body>
        <Header lang="tr" />
        <main>
          <section className="waves relative overflow-hidden text-white">
            <div className="wrap relative pb-4 pt-32">
              <p className="text-sm uppercase tracking-widest text-white/80">404</p>
              <h1 className="mt-3 text-4xl font-bold">Bu sayfa denize düştü.</h1>
              <p className="mt-3 text-lg text-white/90">Page not found · الصفحة غير موجودة · Page introuvable · Pagina non trovata</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/" className="btn btn-primary">
                  Ana sayfa
                </Link>
                <Link href="/en/" className="btn bg-white/15 text-white hover:bg-white/25">
                  Home (English)
                </Link>
              </div>
            </div>
            <Skyline />
          </section>
        </main>
        <Footer lang="tr" />
      </body>
    </html>
  );
}
