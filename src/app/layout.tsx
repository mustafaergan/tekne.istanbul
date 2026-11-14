import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header, WhatsAppFloat } from "@/components/Shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "tekne.istanbul | Tekne kiralama, Boğaz turları, tekne bakımı", template: "%s | tekne.istanbul" },
  description:
    "İstanbul'da tekne ve yat kiralama, teknede evlilik teklifi, kahvaltı, gece mehtap turu, jet ski, hız motoru, kürek teknesi; tekne bakımı ve usta bulma.",
  openGraph: { type: "website", locale: "tr_TR", siteName: "tekne.istanbul" },
};

export const viewport: Viewport = { themeColor: "#0a5f8f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
