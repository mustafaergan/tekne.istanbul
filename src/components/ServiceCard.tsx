import Link from "next/link";
import type { Service } from "@/lib/services";
import { Icon } from "./Icon";
import { price } from "@/lib/format";
import { path, type Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

export function ServiceCard({ s, lang }: { s: Service; lang: Locale }) {
  const tx = s.text[lang];
  const t = ui[lang].card;
  return (
    <Link
      href={path(lang, tx.slug)}
      className="group flex flex-col rounded-2xl border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:border-sea-500 hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: s.tone }}>
        <Icon name={s.icon} />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{tx.title}</h3>
      <p className="mt-1 flex-1 text-sm text-dim">{tx.short}</p>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-ink">{price(lang, s.priceFrom)}</span>
        <span className="font-semibold text-sea-700 group-hover:underline">{s.booking === "takvim" ? t.pickDate : t.leaveRequest}</span>
      </div>
    </Link>
  );
}
