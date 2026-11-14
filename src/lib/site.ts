// Sitenin genel bilgileri. Numara ve e-postayı buradan değiştirin.
// TODO: gerçek numara ve e-posta gelince güncellenecek.
export const site = {
  name: "tekne.istanbul",
  url: "https://tekne.istanbul",
  tagline: "Boğaz'da tekne kiralama, turlar ve tekne bakımı",
  phone: "+90 500 000 00 00", // ekranda görünen
  phoneHref: "+905000000000", // tel: bağlantısı
  whatsapp: "905000000000", // wa.me bağlantısı (başında + olmadan)
  email: "info@tekne.istanbul",
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
