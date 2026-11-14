"use client";

import Link from "next/link";
import { useState } from "react";
import { services, type Service } from "@/lib/services";
import { Calendar } from "./Calendar";
import { longDate } from "@/lib/format";
import { site } from "@/lib/site";
import { path, privacySlug, type Locale } from "@/i18n/locales";
import { ui } from "@/i18n/ui";

type Kind = "rezervasyon" | "geri-arama" | "servis";
type ErrKey = "name" | "phone" | "date" | "time";
type State = { status: "idle" | "sending" | "done" | "error"; message?: string; errors?: Partial<Record<ErrKey, string>> };

// Tek gönderim noktası: /api/talep.php. Ödeme gelince rezervasyon adımından sonra buraya eklenecek.
// Sunucu hata alanlarını döndürür; mesajlar burada sayfanın dilinde gösterilir.
async function send(lang: Locale, data: Record<string, string>): Promise<State> {
  const e = ui[lang].errors;
  try {
    const r = await fetch("/api/talep.php", { method: "POST", body: new URLSearchParams(data) });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.ok) return { status: "done" };
    if (r.status === 422 && j.errors) {
      const errors: State["errors"] = {};
      for (const k of Object.keys(j.errors)) if (k in e) errors[k as ErrKey] = e[k as ErrKey];
      return { status: "error", message: e.check, errors };
    }
    return { status: "error", message: r.status === 429 ? e.rate : e.server };
  } catch {
    return { status: "error", message: e.network(site.phone) };
  }
}

// Yönetim sayfası Türkçe: talep hangi dilden gelirse gelsin hizmet adı Türkçe kaydedilir.
const trTitle = (id: string) => services.find((s) => s.id === id)?.text.tr.title ?? "Genel";

function useForm(lang: Locale, kind: Kind, service: string) {
  const [state, setState] = useState<State>({ status: "idle" });
  const submit = async (e: React.FormEvent<HTMLFormElement>, extra: Record<string, string> = {}) => {
    e.preventDefault();
    const data: Record<string, string> = { kind, service, serviceTitle: trTitle(service), lang, ...extra };
    new FormData(e.currentTarget).forEach((v, k) => (data[k] = String(v)));
    setState({ status: "sending" });
    setState(await send(lang, data));
  };
  return { state, submit };
}

function Err({ m }: { m?: string }) {
  return m ? <p className="mt-1 text-sm text-err">{m}</p> : null;
}

function Contact({ lang, errors, note }: { lang: Locale; errors?: State["errors"]; note?: string }) {
  const t = ui[lang].booking;
  return (
    <>
      <div>
        <label className="mb-1 block text-sm font-medium">{t.name}</label>
        <input name="name" className="field" autoComplete="name" required />
        <Err m={errors?.name} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">{t.phone}</label>
        <input name="phone" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder={t.phonePh} dir="ltr" required />
        <Err m={errors?.phone} />
      </div>
      {note && (
        <div>
          <label className="mb-1 block text-sm font-medium">{note}</label>
          <textarea name="note" className="field min-h-24" />
        </div>
      )}
      {/* bot tuzağı */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
    </>
  );
}

function Footnote({ lang }: { lang: Locale }) {
  const [a, link, b] = ui[lang].booking.footnote;
  return (
    <p className="text-xs text-dim">
      {a}
      <Link href={path(lang, privacySlug[lang])} className="underline">
        {link}
      </Link>
      {b}
    </p>
  );
}

function Done({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl bg-sea-100 p-5" role="status">
      <div className="text-lg font-semibold text-sea-800">{title}</div>
      <p className="mt-1 text-sm text-sea-800">{text}</p>
    </div>
  );
}

function Submit({ busy, label, sending }: { busy: boolean; label: string; sending: string }) {
  return (
    <button type="submit" className="btn btn-primary w-full" disabled={busy}>
      {busy ? sending : label}
    </button>
  );
}

export function CallbackForm({ lang, service }: { lang: Locale; service: string }) {
  const t = ui[lang].booking;
  const { state, submit } = useForm(lang, "geri-arama", service);
  if (state.status === "done") return <Done title={t.doneCallTitle} text={t.doneCallText} />;
  return (
    <form onSubmit={(e) => submit(e)} className="space-y-4" noValidate>
      <Contact lang={lang} errors={state.errors} />
      {state.message && <p className="text-sm text-err">{state.message}</p>}
      <Submit busy={state.status === "sending"} label={t.submitCall} sending={t.sending} />
      <Footnote lang={lang} />
    </form>
  );
}

function ReservationForm({ lang, s }: { lang: Locale; s: Service }) {
  const t = ui[lang].booking;
  const { state, submit } = useForm(lang, "rezervasyon", s.id);
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState(2);

  if (state.status === "done")
    return <Done title={t.doneResTitle} text={t.doneResText(`${date ? longDate(lang, date) : ""} ${time ?? ""}`.trim())} />;

  return (
    <form onSubmit={(e) => submit(e, { date: date ?? "", time: time ?? "", guests: String(guests) })} className="space-y-5" noValidate>
      <div>
        <div className="mb-2 text-sm font-semibold">{t.step1}</div>
        <Calendar lang={lang} value={date} onChange={setDate} />
        <Err m={state.errors?.date} />
      </div>
      {date && (
        <div>
          <div className="mb-2 text-sm font-semibold">{t.step2}</div>
          <div className="flex flex-wrap gap-2" dir="ltr">
            {(s.times ?? []).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setTime(h)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  time === h ? "border-sea-700 bg-sea-700 text-white" : "border-line bg-white hover:border-sea-500"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
          <Err m={state.errors?.time} />
        </div>
      )}
      {date && time && (
        <>
          <div>
            <div className="mb-2 text-sm font-semibold">{t.step3}</div>
            <div className="flex items-center gap-3">
              <button type="button" className="btn btn-ghost h-10 w-10 !p-0" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label={t.peopleLess}>
                −
              </button>
              <span className="w-8 text-center text-lg font-semibold">{guests}</span>
              <button type="button" className="btn btn-ghost h-10 w-10 !p-0" onClick={() => setGuests((g) => Math.min(99, g + 1))} aria-label={t.peopleMore}>
                +
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-sea-100 px-4 py-3 text-sm text-sea-800">
            {t.summary(s.text[lang].title, longDate(lang, date), time, guests)}
          </div>
          <div className="space-y-4">
            <div className="text-sm font-semibold">{t.step4}</div>
            <Contact lang={lang} errors={state.errors} note={t.noteOptional} />
          </div>
          {state.message && <p className="text-sm text-err">{state.message}</p>}
          <Submit busy={state.status === "sending"} label={t.submitReserve} sending={t.sending} />
          <p className="text-xs text-dim">{t.noPayment}</p>
          <Footnote lang={lang} />
        </>
      )}
    </form>
  );
}

function ServiceForm({ lang, s }: { lang: Locale; s: Service }) {
  const t = ui[lang].booking;
  const tx = s.text[lang];
  const { state, submit } = useForm(lang, "servis", s.id);
  if (state.status === "done") return <Done title={t.doneResTitle} text={t.doneServiceText} />;
  return (
    <form onSubmit={(e) => submit(e)} className="space-y-4" noValidate>
      <div>
        <label className="mb-1 block text-sm font-medium">{t.jobType}</label>
        {/* değer olarak Türkçe iş türü gönderilir (yönetim sayfası Türkçe) */}
        <select name="jobType" className="field" defaultValue={s.text.tr.jobTypes?.[0]}>
          {tx.jobTypes?.map((j, i) => (
            <option key={j} value={s.text.tr.jobTypes?.[i] ?? j}>
              {j}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t.boat}</label>
          <input name="boat" className="field" placeholder={t.boatPh} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t.location}</label>
          <input name="location" className="field" placeholder={t.locationPh} />
        </div>
      </div>
      <Contact lang={lang} errors={state.errors} note={t.notePrompt} />
      {state.message && <p className="text-sm text-err">{state.message}</p>}
      <Submit busy={state.status === "sending"} label={t.submitService} sending={t.sending} />
      <Footnote lang={lang} />
    </form>
  );
}

export function BookingPanel({ lang, id }: { lang: Locale; id: string }) {
  const s = services.find((x) => x.id === id)!;
  const t = ui[lang].booking;
  const [tab, setTab] = useState<"main" | "call">("main");
  const tabs = [
    ["main", s.booking === "takvim" ? t.pickDate : t.describeJob],
    ["call", t.callMe],
  ] as const;
  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5 grid grid-cols-2 rounded-full bg-sand p-1 text-sm font-semibold" role="tablist">
        {tabs.map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`rounded-full py-2 transition ${tab === k ? "bg-white shadow-sm" : "text-dim"}`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "call" ? (
        <>
          <p className="mb-4 text-sm text-dim">{t.callIntro}</p>
          <CallbackForm lang={lang} service={s.id} />
        </>
      ) : s.booking === "takvim" ? (
        <ReservationForm lang={lang} s={s} />
      ) : (
        <ServiceForm lang={lang} s={s} />
      )}
    </div>
  );
}
