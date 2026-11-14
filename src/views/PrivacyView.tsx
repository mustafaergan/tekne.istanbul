import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

// TODO: şirket unvanı ve adresi netleşince veri sorumlusu bilgisi eklenecek.
export const privacyMetadata = (l: Locale) =>
  buildMetadata(l, { kind: "privacy" }, ui[l].privacy.title, ui[l].privacy.body[0].slice(0, 158));

export function PrivacyView({ lang }: { lang: Locale }) {
  const t = ui[lang].privacy;
  return (
    <div className="wrap max-w-3xl pt-28">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-dim">
        {t.body.map((p, i) => {
          const [a, b] = p.split("{email}");
          return (
            <p key={i}>
              {a}
              {b !== undefined && (
                <>
                  <a className="underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  {b}
                </>
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
