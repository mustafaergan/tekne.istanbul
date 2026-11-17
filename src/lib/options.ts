// Rezervasyon seçenekleri: kalkış iskeleleri ve ek hizmetler (5 dil).
// Veritabanına Türkçe adlarıyla kaydedilir (yönetim Türkçe).
import type { Locale } from "@/i18n/locales";

type L = Record<Locale, string>;

/** Boğaz'ın iki yakasındaki kalkış noktaları. Yer adları her dilde aynıdır. */
export const piers = ["Kuruçeşme", "Bebek", "Arnavutköy", "Ortaköy", "Beşiktaş", "Kabataş", "Karaköy", "İstinye", "Kadıköy", "Üsküdar"] as const;

export const anyPier: L = { tr: "Fark etmez", en: "No preference", ar: "لا يهم", fr: "Peu importe", it: "Indifferente" };

export type ExtraId = "susleme" | "pasta" | "fotograf" | "muzik" | "yemek" | "transfer" | "cicek";

export const extras: Record<ExtraId, L> = {
  susleme: { tr: "Balon ve süsleme", en: "Balloons and decoration", ar: "بالونات وزينة", fr: "Ballons et décoration", it: "Palloncini e decorazioni" },
  pasta: { tr: "Pasta", en: "Cake", ar: "كعكة", fr: "Gâteau", it: "Torta" },
  fotograf: { tr: "Fotoğrafçı", en: "Photographer", ar: "مصور", fr: "Photographe", it: "Fotografo" },
  muzik: { tr: "Müzisyen / DJ", en: "Musician / DJ", ar: "موسيقي / دي جي", fr: "Musicien / DJ", it: "Musicista / DJ" },
  yemek: { tr: "Yemek veya meze", en: "Dinner or meze", ar: "عشاء أو مقبلات", fr: "Dîner ou mezzés", it: "Cena o meze" },
  transfer: { tr: "Otelden transfer", en: "Hotel transfer", ar: "نقل من الفندق", fr: "Transfert depuis l'hôtel", it: "Transfer dall'hotel" },
  cicek: { tr: "Çiçek buketi", en: "Flower bouquet", ar: "باقة زهور", fr: "Bouquet de fleurs", it: "Mazzo di fiori" },
};

/** Süre etiketi: 0.5 -> "30 dk", 2 -> "2 saat" */
export const hoursLabel = (l: Locale, h: number): string => {
  if (h < 1) {
    const m = Math.round(h * 60);
    return { tr: `${m} dk`, en: `${m} min`, ar: `${m} دقيقة`, fr: `${m} min`, it: `${m} min` }[l];
  }
  const n = h.toLocaleString(l === "ar" ? "ar" : l);
  return {
    tr: `${n} saat`,
    en: `${n} ${h === 1 ? "hour" : "hours"}`,
    ar: h === 1 ? "ساعة" : h === 2 ? "ساعتان" : `${n} ساعات`,
    fr: `${n} ${h < 2 ? "heure" : "heures"}`,
    it: `${n} ${h === 1 ? "ora" : "ore"}`,
  }[l];
};
