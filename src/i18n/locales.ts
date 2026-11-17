export const locales = ["tr", "en", "ar", "fr", "it"] as const;
export type Locale = (typeof locales)[number];
export const otherLocales = ["en", "ar", "fr", "it"] as const satisfies readonly Locale[];

export const isLocale = (s: string): s is Locale => (locales as readonly string[]).includes(s);

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  ar: "العربية",
  fr: "Français",
  it: "Italiano",
};

export const ogLocale: Record<Locale, string> = { tr: "tr_TR", en: "en_US", ar: "ar_AR", fr: "fr_FR", it: "it_IT" };
export const intlLocale: Record<Locale, string> = { tr: "tr-TR", en: "en-GB", ar: "ar", fr: "fr-FR", it: "it-IT" };
export const dir = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

/** Bir dilin kök yolu: tr -> "/", diğerleri -> "/en/" */
export const home = (l: Locale) => (l === "tr" ? "/" : `/${l}/`);
/** Dil içi yol: path("en", "jet-ski-rental") -> "/en/jet-ski-rental/" */
export const path = (l: Locale, slug: string) => `${home(l)}${slug}/`;

/** Gizlilik sayfasının her dildeki adresi */
export const privacySlug: Record<Locale, string> = { tr: "kvkk", en: "privacy", ar: "privacy", fr: "confidentialite", it: "privacy" };

/** İptal ve değişiklik koşulları sayfasının adresi */
export const policySlug: Record<Locale, string> = {
  tr: "iptal-kosullari",
  en: "cancellation-policy",
  ar: "cancellation-policy",
  fr: "conditions-annulation",
  it: "condizioni-cancellazione",
};
