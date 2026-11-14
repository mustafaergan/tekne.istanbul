"use client";

import { useState } from "react";
import { dayNumber, isoDate, monthTitle, weekdays } from "@/lib/format";
import type { Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

const MAX_MONTHS_AHEAD = 6;

export function Calendar({ lang, value, onChange }: { lang: Locale; value?: string; onChange: (iso: string) => void }) {
  const t = ui[lang].calendar;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7; // Pazartesi ile başla
  const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: count }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];

  const monthsAhead = (view.getFullYear() - today.getFullYear()) * 12 + view.getMonth() - today.getMonth();
  const move = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1));
  const navBtn = "h-9 w-9 rounded-lg hover:bg-sand disabled:opacity-30 rtl:rotate-180";

  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <button type="button" onClick={() => move(-1)} disabled={monthsAhead <= 0} className={navBtn} aria-label={t.prev}>
          ‹
        </button>
        <div className="font-semibold">{monthTitle(lang, view)}</div>
        <button type="button" onClick={() => move(1)} disabled={monthsAhead >= MAX_MONTHS_AHEAD} className={navBtn} aria-label={t.next}>
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-dim">
        {weekdays(lang).map((d) => (
          <div key={d} className="truncate py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const iso = isoDate(d);
          const past = d < today;
          const sel = value === iso;
          return (
            <button
              key={i}
              type="button"
              disabled={past}
              onClick={() => onChange(iso)}
              aria-pressed={sel}
              aria-label={iso}
              className={`aspect-square rounded-lg text-sm transition ${
                sel
                  ? "bg-sea-700 font-semibold text-white"
                  : past
                    ? "text-line"
                    : "hover:bg-sea-100" + (iso === isoDate(today) ? " font-semibold text-sea-700" : "")
              }`}
            >
              {dayNumber(lang, d)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
