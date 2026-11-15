// Sitenin genel bilgileri. Numara ve e-postayı buradan değiştirin.
// TODO: e-posta adresi netleşince güncellenecek.
import type { Locale } from "@/i18n/locales";

export const site = {
  name: "tekne.istanbul",
  url: "https://tekne.istanbul",
  phone: "0552 942 27 22", // Türkçe sayfalarda görünen
  phoneIntl: "+90 552 942 27 22", // diğer dillerde görünen
  phoneHref: "+905529422722", // tel: bağlantısı
  whatsapp: "905529422722", // wa.me bağlantısı (başında + olmadan)
  email: "info@tekne.istanbul",
};

export const phoneFor = (l: Locale) => (l === "tr" ? site.phone : site.phoneIntl);

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
