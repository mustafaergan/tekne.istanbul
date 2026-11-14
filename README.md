# tekne.istanbul

Tekne kiralama, özel turlar (evlilik teklifi, kahvaltı, gece turu), jet ski, hız motoru, kürek teknesi; tekne bakımı ve usta bulma.

Next.js statik site (`out/`) + formlar için küçük bir PHP API + MySQL.

## Nerede ne var
| Ne | Dosya |
|---|---|
| Telefon, WhatsApp, e-posta | `src/lib/site.ts` |
| Hizmetler (başlık, açıklama, fiyat, saatler) | `src/lib/services.ts` |
| Takvim ve formlar | `src/components/BookingPanel.tsx`, `Calendar.tsx` |
| Form API'si | `public/api/talep.php` (ortak kod: `public/api/lib.php`) |
| Talep yönetimi | `public/yonetim/index.php` → https://tekne.istanbul/yonetim/ |

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
