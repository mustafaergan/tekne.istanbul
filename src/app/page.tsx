import Link from "next/link";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";
import { CallbackForm } from "@/components/BookingPanel";
import { site, waLink } from "@/lib/site";
import { WaIcon } from "@/components/Icon";

export default function Home() {
  const rent = services.filter((s) => s.category !== "bakim");
  const care = services.filter((s) => s.category === "bakim");

  return (
    <>
      <section className="waves text-white">
        <div className="wrap pb-20 pt-32 sm:pb-28 sm:pt-40">
          <p className="text-sm font-medium uppercase tracking-widest text-sea-100/80">İstanbul Boğazı</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Teknenizi seçin, tarihinizi seçin. Gerisini biz halledelim.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-sea-100/90">
            Evlilik teklifinden jet skiye, teknede kahvaltıdan gece turuna; tekne bakımı ve usta da bizden.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#hizmetler" className="btn btn-primary">
              Hizmetlere bak
            </Link>
            <a href={waLink("Merhaba, tekne kiralamak istiyorum.")} target="_blank" rel="noopener" className="btn bg-white/15 text-white hover:bg-white/25">
              <WaIcon /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="hizmetler" className="wrap scroll-mt-6 pt-16">
        <h2 className="text-2xl font-bold sm:text-3xl">Kiralama ve özel turlar</h2>
        <p className="mt-2 text-dim">Hizmeti seçin, takvimden gün ve saati işaretleyin. Uygunluğu teyit edip sizi arıyoruz.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rent.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
      </section>

      <section id="bakim" className="wrap scroll-mt-6 pt-16">
        <h2 className="text-2xl font-bold sm:text-3xl">Tekne bakımı ve usta</h2>
        <p className="mt-2 text-dim">Teknenizin işini anlatın; güvendiğimiz ustalardan fiyat ve tarih alıp size dönelim.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {care.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
      </section>

      <section className="wrap pt-16">
        <div className="grid gap-8 rounded-3xl bg-sea-900 p-6 text-white sm:p-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Karar veremediniz mi?</h2>
            <p className="mt-3 text-sea-100/90">
              Adınızı ve telefonunuzu bırakın, ne istediğinizi birlikte konuşalım. Ya da hemen arayın:
            </p>
            <a href={`tel:${site.phoneHref}`} className="mt-4 inline-block text-2xl font-semibold text-accent">
              {site.phone}
            </a>
          </div>
          <div className="rounded-2xl bg-white p-5 text-ink">
            <CallbackForm service="genel" serviceTitle="Genel" />
          </div>
        </div>
      </section>
    </>
  );
}
