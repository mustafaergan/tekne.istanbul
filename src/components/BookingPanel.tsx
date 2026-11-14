"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/lib/services";
import { Calendar } from "./Calendar";
import { longDate } from "@/lib/format";
import { site } from "@/lib/site";

type Kind = "rezervasyon" | "geri-arama" | "servis";
type State = { status: "idle" | "sending" | "done" | "error"; message?: string; errors?: Record<string, string> };

// Tek gönderim noktası: /api/talep.php. Ödeme gelince rezervasyon adımından sonra buraya eklenecek.
async function send(data: Record<string, string>): Promise<State> {
  try {
    const body = new URLSearchParams(data);
    const r = await fetch("/api/talep.php", { method: "POST", body });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.ok) return { status: "done" };
    return {
      status: "error",
      message: j.error ?? `Talebiniz gönderilemedi. Lütfen ${site.phone} numarasını arayın.`,
      errors: j.errors,
    };
  } catch {
    return { status: "error", message: `Bağlantı kurulamadı. Lütfen ${site.phone} numarasını arayın.` };
  }
}

function useForm(kind: Kind, service: string) {
  const [state, setState] = useState<State>({ status: "idle" });
  const submit = async (e: React.FormEvent<HTMLFormElement>, extra: Record<string, string> = {}) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = { kind, service, ...extra };
    fd.forEach((v, k) => (data[k] = String(v)));
    setState({ status: "sending" });
    setState(await send(data));
  };
  return { state, submit };
}

function Err({ m }: { m?: string }) {
  return m ? <p className="mt-1 text-sm text-err">{m}</p> : null;
}

function Contact({ errors, note }: { errors?: Record<string, string>; note?: string }) {
  return (
    <>
      <div>
        <label className="mb-1 block text-sm font-medium">Adınız</label>
        <input name="name" className="field" autoComplete="name" required />
        <Err m={errors?.name} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Telefon</label>
        <input name="phone" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx" required />
        <Err m={errors?.phone} />
      </div>
      {note && (
        <div>
          <label className="mb-1 block text-sm font-medium">{note}</label>
          <textarea name="note" className="field min-h-24" />
          <Err m={errors?.note} />
        </div>
      )}
      {/* bot tuzağı */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
    </>
  );
}

function Footnote() {
  return (
    <p className="text-xs text-dim">
      Gönder&apos;e basarak <Link href="/kvkk/" className="underline">KVKK aydınlatma metnini</Link> okuduğunuzu kabul edersiniz.
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

function Submit({ busy, label }: { busy: boolean; label: string }) {
  return (
    <button type="submit" className="btn btn-primary w-full" disabled={busy}>
      {busy ? "Gönderiliyor…" : label}
    </button>
  );
}

export function CallbackForm({ service, serviceTitle }: { service: string; serviceTitle: string }) {
  const { state, submit } = useForm("geri-arama", service);
  if (state.status === "done")
    return <Done title="Teşekkürler!" text="Numaranızı aldık, en kısa sürede sizi arayacağız." />;
  return (
    <form onSubmit={(e) => submit(e, { serviceTitle })} className="space-y-4" noValidate>
      <Contact errors={state.errors} />
      {state.message && <p className="text-sm text-err">{state.message}</p>}
      <Submit busy={state.status === "sending"} label="Beni arayın" />
      <Footnote />
    </form>
  );
}

function ReservationForm({ s }: { s: Service }) {
  const { state, submit } = useForm("rezervasyon", s.slug);
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState(2);

  if (state.status === "done")
    return (
      <Done
        title="Talebiniz alındı!"
        text={`${date ? longDate(date) : ""} ${time ?? ""} için uygunluğu kontrol edip sizi arayacağız. Ödeme ve detaylar telefonda netleşecek.`}
      />
    );

  const step2 = Boolean(date && time);
  return (
    <form
      onSubmit={(e) => submit(e, { serviceTitle: s.title, date: date ?? "", time: time ?? "", guests: String(guests) })}
      className="space-y-5"
      noValidate
    >
      <div>
        <div className="mb-2 text-sm font-semibold">1. Gün seçin</div>
        <Calendar value={date} onChange={(d) => setDate(d)} />
        <Err m={state.errors?.date} />
      </div>
      {date && (
        <div>
          <div className="mb-2 text-sm font-semibold">2. Saat seçin</div>
          <div className="flex flex-wrap gap-2">
            {(s.times ?? []).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  time === t ? "border-sea-700 bg-sea-700 text-white" : "border-line bg-white hover:border-sea-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <Err m={state.errors?.time} />
        </div>
      )}
      {step2 && (
        <>
          <div>
            <div className="mb-2 text-sm font-semibold">3. Kaç kişi?</div>
            <div className="flex items-center gap-3">
              <button type="button" className="btn btn-ghost h-10 w-10 !p-0" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Azalt">
                −
              </button>
              <span className="w-8 text-center text-lg font-semibold">{guests}</span>
              <button type="button" className="btn btn-ghost h-10 w-10 !p-0" onClick={() => setGuests((g) => Math.min(99, g + 1))} aria-label="Artır">
                +
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-sea-100 px-4 py-3 text-sm text-sea-800">
            <b>{s.title}</b>: {longDate(date!)}, saat {time}, {guests} kişi
          </div>
          <div className="space-y-4">
            <div className="text-sm font-semibold">4. Size nasıl ulaşalım?</div>
            <Contact errors={state.errors} note="Eklemek istedikleriniz (isteğe bağlı)" />
          </div>
          {state.message && <p className="text-sm text-err">{state.message}</p>}
          <Submit busy={state.status === "sending"} label="Rezervasyon talebi gönder" />
          <p className="text-xs text-dim">Şimdi ödeme alınmaz. Uygunluğu teyit edip sizi arayacağız.</p>
          <Footnote />
        </>
      )}
    </form>
  );
}

function ServiceForm({ s }: { s: Service }) {
  const { state, submit } = useForm("servis", s.slug);
  if (state.status === "done")
    return <Done title="Talebiniz alındı!" text="İşinize uygun ustayla görüşüp size fiyat ve tarih için döneceğiz." />;
  return (
    <form onSubmit={(e) => submit(e, { serviceTitle: s.title })} className="space-y-4" noValidate>
      <div>
        <label className="mb-1 block text-sm font-medium">İş türü</label>
        <select name="jobType" className="field" defaultValue={s.jobTypes?.[0]}>
          {s.jobTypes?.map((j) => (
            <option key={j}>{j}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Tekne tipi / boyu</label>
          <input name="boat" className="field" placeholder="ör. 9 m motoryat" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Tekne nerede?</label>
          <input name="location" className="field" placeholder="ör. Kalamış Marina" />
        </div>
      </div>
      <Contact errors={state.errors} note="Kısaca ne yapılacak?" />
      {state.message && <p className="text-sm text-err">{state.message}</p>}
      <Submit busy={state.status === "sending"} label="Talep gönder" />
      <Footnote />
    </form>
  );
}

export function BookingPanel({ s }: { s: Service }) {
  const [tab, setTab] = useState<"main" | "call">("main");
  const mainLabel = s.booking === "takvim" ? "Tarih seç" : "İşi anlat";
  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5 grid grid-cols-2 rounded-full bg-sand p-1 text-sm font-semibold">
        {(
          [
            ["main", mainLabel],
            ["call", "Beni arayın"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`rounded-full py-2 transition ${tab === k ? "bg-white shadow-sm" : "text-dim"}`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "call" ? (
        <>
          <p className="mb-4 text-sm text-dim">Sadece adınızı ve numaranızı bırakın, sizi arayalım.</p>
          <CallbackForm service={s.slug} serviceTitle={s.title} />
        </>
      ) : s.booking === "takvim" ? (
        <ReservationForm s={s} />
      ) : (
        <ServiceForm s={s} />
      )}
    </div>
  );
}
