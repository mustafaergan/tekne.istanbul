import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getService, services } from "@/lib/services";
import { BookingPanel } from "@/components/BookingPanel";
import { Icon } from "@/components/Icon";
import { price } from "@/lib/format";
import { ServiceCard } from "@/components/ServiceCard";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: s.title, description: `${s.short} ${s.description}`.slice(0, 160), alternates: { canonical: `/${s.slug}/` } };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((o) => o.category === s.category && o.slug !== s.slug).slice(0, 3);

  return (
    <>
      <section className="waves text-white">
        <div className="wrap pb-14 pt-28">
          <Link href="/#hizmetler" className="text-sm text-sea-100/80 hover:text-white">
            ← {categories[s.category]}
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: s.tone }}>
              <Icon name={s.icon} className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold sm:text-5xl">{s.title}</h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-sea-100/90">{s.short}</p>
        </div>
      </section>

      <div className="wrap -mt-6 grid gap-8 lg:grid-cols-[1fr_440px]">
        <div className="order-2 pt-6 lg:order-1 lg:pt-14">
          <p className="text-lg leading-relaxed">{s.description}</p>
          <dl className="mt-8 grid grid-cols-3 gap-3 text-sm">
            {s.duration && (
              <div className="rounded-xl border border-line bg-white p-4">
                <dt className="text-dim">Süre</dt>
                <dd className="mt-1 font-semibold">{s.duration}</dd>
              </div>
            )}
            {s.capacity && (
              <div className="rounded-xl border border-line bg-white p-4">
                <dt className="text-dim">Kişi</dt>
                <dd className="mt-1 font-semibold">{s.capacity}</dd>
              </div>
            )}
            <div className="rounded-xl border border-line bg-white p-4">
              <dt className="text-dim">Fiyat</dt>
              <dd className="mt-1 font-semibold">{price(s.priceFrom)}</dd>
            </div>
          </dl>
          <h2 className="mt-10 text-xl font-semibold">Neler var?</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {s.includes.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-ok">✓</span>
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-6">
            <BookingPanel s={s} />
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <section className="wrap pt-16">
          <h2 className="text-xl font-semibold">Bunlara da bakın</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ServiceCard key={o.slug} s={o} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
