import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "KVKK aydınlatma metni" };

// TODO: şirket unvanı ve adresi netleşince veri sorumlusu bilgisi güncellenecek.
export default function Kvkk() {
  return (
    <div className="wrap max-w-3xl pt-28">
      <h1 className="text-3xl font-bold">KVKK aydınlatma metni</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-dim">
        <p>
          tekne.istanbul olarak, sitemizdeki formlar aracılığıyla bize ilettiğiniz ad, telefon numarası, rezervasyon tarihi ve
          notlarınızı yalnızca talebinize dönüş yapmak, rezervasyonunuzu planlamak ve sizinle iletişim kurmak amacıyla işliyoruz.
        </p>
        <p>
          Bu veriler 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun 5. maddesinde yer alan &quot;bir sözleşmenin kurulması
          veya ifasıyla doğrudan ilgili olması&quot; hukuki sebebine dayanılarak işlenir. Talebinizi yerine getirmek için gerekli
          olduğu ölçüde hizmeti verecek tekne sahibi veya usta ile paylaşılabilir; başka amaçla üçüncü kişilere aktarılmaz.
        </p>
        <p>
          Verileriniz talebinizin sonuçlanmasından itibaren en fazla 2 yıl saklanır, ardından silinir. Kanun&apos;un 11. maddesi
          kapsamındaki haklarınızı kullanmak (verilerinize erişme, düzeltme, silme vb.) için{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          adresine yazabilirsiniz.
        </p>
      </div>
    </div>
  );
}
