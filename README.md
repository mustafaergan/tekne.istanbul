# tekne.istanbul

Tekne kiralama, özel turlar (evlilik teklifi, kahvaltı, gece turu), jet ski, hız motoru, kürek teknesi; tekne bakımı ve usta bulma.

Next.js statik site (`out/`) + formlar için küçük bir PHP API + MySQL.

## Nerede ne var
| Ne | Dosya |
|---|---|
| Telefon, WhatsApp, e-posta | `src/lib/site.ts` |
| Hizmetler (5 dilde başlık, açıklama, adres, SEO başlığı; fiyat, saatler) | `src/lib/services.ts` |
| Arayüz metinleri, SSS, gizlilik metni (5 dil) | `src/i18n/ui.ts` |
| Diller ve adres kuralları | `src/i18n/locales.ts`, `src/app/[[...p]]/route-map.ts` |
| SEO: meta, hreflang, JSON-LD | `src/lib/seo.tsx`, `src/app/sitemap.ts` |
| Paylaşım görseli | `public/og.png` (üretmek için `node scripts/og.mjs`) |
| Takvim ve formlar | `src/components/BookingPanel.tsx`, `Calendar.tsx` |
| Form API'si | `public/api/talep.php` (ortak kod: `public/api/lib.php`) |
| Talep yönetimi | `public/yonetim/index.php` → https://tekne.istanbul/yonetim/ |

## Diller
Türkçe kökte (`/`, `/teknede-kahvalti/`), diğerleri önekli: `/en/`, `/ar/` (sağdan sola), `/fr/`, `/it/`.
Her hizmetin her dilde kendi adresi var (ör. `/fr/petit-dejeuner-bateau/`). Sayfalar birbirine hreflang ile bağlı, x-default Türkçe.
Talepler `lang` sütunuyla kaydedilir; yönetim sayfasında Türkçe dışındakiler etiketle görünür.

## Talepler
Üç tür talep tek tabloya (`requests`) düşer: `rezervasyon` (tarih + saat + kişi), `geri-arama` (ad + telefon), `servis` (bakım/usta).
Yönetim sayfasında durum (yeni → arandı → onaylandı → tamamlandı / iptal), ödeme durumu, tutar ve not tutulur.

Sunucudaki ayar dosyaları (repoda yok): `~/.tekne/db.php`, `~/.tekne/admin.php`, isteğe bağlı `~/.tekne/smtp.php` (e-posta bildirimi).

## Ödeme (ileride)
Tabloda `payment_status` ve `amount` alanları hazır. Ödeme sağlayıcısı (iyzico, PayTR) eklenince rezervasyon gönderildikten sonra
ödeme sayfasına yönlendirilip dönüşte `payment_status='odendi'` yapılacak.

## Yayına alma
```bash
npm run build
git add -A && git commit -m "..." && git push
```
Sunucuda cron her 5 dakikada `master`'ı `~/repositories/tekne.istanbul`'a çeker, değiştiyse `out/` içeriğini `~/tekne.istanbul/`'a kopyalar.
`out/` commit edilmezse site değişmez. Kayıt: `~/logs/tekne-deploy.log`.
