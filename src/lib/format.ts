import { intlLocale, type Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

export const price = (l: Locale, n?: number, unit?: "saat" | "paket" | "kisi") =>
  n ? ui[l].card.priceFrom(n.toLocaleString(intlLocale[l])) + (unit === "saat" ? ` ${ui[l].card.perHour}` : "") : ui[l].card.askPrice;

export const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const longDate = (l: Locale, iso: string) =>
  new Intl.DateTimeFormat(intlLocale[l], { day: "numeric", month: "long", year: "numeric", weekday: "long" }).format(parse(iso));

export const monthTitle = (l: Locale, d: Date) =>
  new Intl.DateTimeFormat(intlLocale[l], { month: "long", year: "numeric" }).format(d);

/** Pazartesiden başlayan kısa gün adları */
export const weekdays = (l: Locale) =>
  Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(intlLocale[l], { weekday: "short" }).format(new Date(2024, 0, 1 + i)), // 1 Ocak 2024 pazartesi
  );

export const dayNumber = (l: Locale, d: Date) => new Intl.DateTimeFormat(intlLocale[l], { day: "numeric" }).format(d);
