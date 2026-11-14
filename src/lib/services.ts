// Tüm hizmetler bu listeden gelir. Yeni hizmet eklemek için listeye bir kayıt ekleyin.
// booking:
//   "takvim"  -> müşteri tarih ve saat seçip rezervasyon talebi bırakır (ileride ödeme bu adıma eklenecek)
//   "servis"  -> bakım/usta gibi işler: tarih yok, iş türü ve not alınır
// Her hizmette "Beni arayın" seçeneği de vardır (yalnızca ad + telefon).

export type Booking = "takvim" | "servis";
export type Category = "kiralama" | "tur" | "bakim";

export type Service = {
  slug: string;
  title: string;
  category: Category;
  short: string;
  description: string;
  includes: string[];
  duration?: string;
  capacity?: string;
  priceFrom?: number; // TL, yoksa "Fiyat sorunuz"
  booking: Booking;
  times?: string[]; // takvimde gösterilecek saatler
  icon: IconName;
  tone: string; // kart rengi
  jobTypes?: string[]; // servis formunda iş türü seçenekleri
};

export type IconName = "ring" | "cup" | "moon" | "jetski" | "oar" | "speed" | "yacht" | "wrench" | "engine";

export const categories: Record<Category, string> = {
  kiralama: "Kiralama",
  tur: "Özel turlar",
  bakim: "Bakım ve usta",
};

export const services: Service[] = [
  {
    slug: "evlilik-teklifi",
    title: "Teknede evlilik teklifi",
    category: "tur",
    short: "Boğaz'ın ortasında, sadece ikiniz için hazırlanmış bir teklif.",
    description:
      "Süslenmiş tekne, çiçek, pasta ve isterseniz fotoğrafçı ile unutulmaz bir an. Saati ve rotayı siz seçin, gerisini biz hazırlayalım.",
    includes: ["Özel tekne ve kaptan", "Balon ve çiçek süsleme", "Pasta ve içecek", "İsteğe bağlı fotoğrafçı ve müzisyen"],
    duration: "2 saat",
    capacity: "2–10 kişi",
    booking: "takvim",
    times: ["11:00", "14:00", "17:00", "19:00", "21:00"],
    icon: "ring",
    tone: "#c2416b",
  },
  {
    slug: "teknede-kahvalti",
    title: "Teknede kahvaltı",
    category: "tur",
    short: "Serpme kahvaltı eşliğinde sabah Boğaz turu.",
    description:
      "Sabahın sakin saatlerinde Boğaz'da serpme kahvaltı. Ailenizle, arkadaşlarınızla ya da ekibinizle tekneyi tamamen size ayırıyoruz.",
    includes: ["Serpme kahvaltı", "Sınırsız çay", "Kaptan ve mürettebat", "Boğaz rotası"],
    duration: "3 saat",
    capacity: "2–20 kişi",
    booking: "takvim",
    times: ["08:00", "09:00", "10:00"],
    icon: "cup",
    tone: "#d9822b",
  },
  {
    slug: "gece-mehtap-turu",
    title: "Gece mehtap turu",
    category: "tur",
    short: "Işıklı köprülerin altında akşam yemeği ve müzik.",
    description:
      "Gün batımından sonra Boğaz'ın ışıkları arasında sakin bir tur. Akşam yemeği, meze ya da sadece içecekle; tercih sizin.",
    includes: ["Özel tekne ve kaptan", "İsteğe bağlı akşam yemeği", "Müzik sistemi", "Köprüler arası rota"],
    duration: "2–3 saat",
    capacity: "2–30 kişi",
    booking: "takvim",
    times: ["19:00", "20:00", "21:00", "22:00"],
    icon: "moon",
    tone: "#3b4cb8",
  },
  {
    slug: "yat-kiralama",
    title: "Yat ve tekne kiralama",
    category: "kiralama",
    short: "Doğum günü, kutlama ya da iş toplantısı için saatlik tekne.",
    description:
      "Kişi sayınıza ve bütçenize uygun tekneyi buluyoruz. Saatlik ya da günlük, kaptanlı kiralama.",
    includes: ["Kaptanlı tekne", "Saatlik veya günlük", "İkram seçenekleri", "Organizasyon desteği"],
    duration: "Saatlik / günlük",
    capacity: "2–50 kişi",
    booking: "takvim",
    times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
    icon: "yacht",
    tone: "#0e7490",
  },
  {
    slug: "jet-ski-kiralama",
    title: "Jet ski kiralama",
    category: "kiralama",
    short: "Eğitmen eşliğinde ya da ehliyetliyseniz kendiniz sürün.",
    description:
      "Yaz sezonu boyunca saatlik jet ski kiralama. Can yeleği ve kısa güvenlik bilgilendirmesi dahil.",
    includes: ["Can yeleği", "Güvenlik bilgilendirmesi", "İsteğe bağlı eğitmen", "Yakıt dahil"],
    duration: "30 dk / 1 saat",
    capacity: "1–2 kişi",
    booking: "takvim",
    times: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    icon: "jetski",
    tone: "#0891b2",
  },
  {
    slug: "hiz-motoru-kiralama",
    title: "Hız motoru kiralama",
    category: "kiralama",
    short: "Kaptanlı sürat teknesiyle hızlı Boğaz turu ya da transfer.",
    description:
      "Kısa sürede Boğaz'ı baştan sona gezmek ya da bir noktadan diğerine hızlıca geçmek için kaptanlı hız motoru.",
    includes: ["Kaptan", "Can yeleği", "Tur veya transfer", "Yakıt dahil"],
    duration: "1 saat ve üzeri",
    capacity: "1–8 kişi",
    booking: "takvim",
    times: ["10:00", "12:00", "14:00", "16:00", "18:00"],
    icon: "speed",
    tone: "#be123c",
  },
  {
    slug: "kurek-teknesi-kiralama",
    title: "Kürek teknesi kiralama",
    category: "kiralama",
    short: "Sahil boyunca sakin bir kürek keyfi.",
    description: "Saatlik kürek teknesi ve kano kiralama. Çocuklu aileler için can yeleği dahil.",
    includes: ["Can yeleği", "Saatlik kiralama", "Çocuk yeleği", "Kısa bilgilendirme"],
    duration: "1 saat",
    capacity: "1–4 kişi",
    booking: "takvim",
    times: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    icon: "oar",
    tone: "#15803d",
  },
  {
    slug: "tekne-bakimi",
    title: "Tekne bakımı",
    category: "bakim",
    short: "Sezon öncesi bakım, temizlik, zehirli boya, kışlama.",
    description:
      "Teknenizin periyodik bakımını, temizliğini ve sezon hazırlığını güvendiğimiz ustalarla planlıyoruz. İşi anlatın, size fiyat ve tarih verelim.",
    includes: ["Periyodik bakım", "Zehirli boya ve cila", "İç-dış temizlik", "Kışlama ve çekek"],
    booking: "servis",
    jobTypes: ["Periyodik bakım", "Zehirli boya / cila", "Temizlik", "Kışlama / çekek", "Diğer"],
    icon: "wrench",
    tone: "#475569",
  },
  {
    slug: "usta-bul",
    title: "Usta bul",
    category: "bakim",
    short: "Motor, elektrik, tesisat, branda: doğru ustayı bulalım.",
    description:
      "Arızayı ya da yapılacak işi yazın; işine bakan, güvendiğimiz ustalardan uygun olanı size yönlendirelim.",
    includes: ["Motor ustası", "Elektrik ve elektronik", "Tesisat", "Branda, döşeme, ahşap"],
    booking: "servis",
    jobTypes: ["Motor", "Elektrik / elektronik", "Tesisat", "Branda / döşeme", "Ahşap / fiberglas", "Diğer"],
    icon: "engine",
    tone: "#7c3aed",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
