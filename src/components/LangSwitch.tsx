"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { home, isLocale, localeNames, locales, path, policySlug, privacySlug, type Locale } from "@/i18n/locales";
import { services } from "@/lib/services";

/** Şu anki sayfanın diğer dillerdeki karşılığı */
function counterpart(pathname: string, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const from: Locale = parts[0] && isLocale(parts[0]) ? parts[0] : "tr";
  const slug = from === "tr" ? parts[0] : parts[1];
  if (!slug) return home(to);
  if (slug === privacySlug[from]) return path(to, privacySlug[to]);
  if (slug === policySlug[from]) return path(to, policySlug[to]);
  const s = services.find((x) => x.text[from].slug === slug);
  return s ? path(to, s.text[to].slug) : home(to);
}

export function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() || "/";
  const ref = useRef<HTMLDetailsElement>(null);

  // dışarı tıklayınca kapat
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) ref.current.open = false;
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <details ref={ref} className="relative">
      <summary
        className="flex cursor-pointer list-none items-center gap-1 rounded-full bg-white/15 px-3 py-2 text-sm font-medium uppercase hover:bg-white/25 [&::-webkit-details-marker]:hidden"
        aria-label={label}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        {lang}
      </summary>
      <ul className="absolute end-0 z-30 mt-2 min-w-36 overflow-hidden rounded-xl border border-line bg-white py-1 text-ink shadow-lg">
        {locales.map((l) => (
          <li key={l}>
            <a
              href={counterpart(pathname, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? "true" : undefined}
              className={`block px-4 py-2 text-sm hover:bg-sea-100 ${l === lang ? "font-semibold text-sea-700" : ""}`}
            >
              {localeNames[l]}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
