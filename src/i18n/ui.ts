import type { Locale } from "./locales";

type Dict = {
  nav: { services: string; care: string; call: string; language: string };
  hero: { kicker: string; title: string; sub: string; cta: string };
  rent: { title: string; sub: string };
  care: { title: string; sub: string };
  undecided: { title: string; sub: string };
  intro: { title: string; text: string[] };
  faq: { title: string; items: [string, string][] };
  categories: { kiralama: string; tur: string; bakim: string };
  card: { pickDate: string; leaveRequest: string; priceFrom: (n: string) => string; askPrice: string };
  page: { duration: string; people: string; price: string; includes: string; seeAlso: string; home: string };
  booking: {
    pickDate: string; describeJob: string; callMe: string; callIntro: string;
    step1: string; step2: string; step3: string; step4: string;
    name: string; phone: string; phonePh: string; noteOptional: string; notePrompt: string;
    jobType: string; boat: string; boatPh: string; location: string; locationPh: string;
    submitReserve: string; submitCall: string; submitService: string; sending: string;
    noPayment: string; footnote: [string, string, string];
    summary: (title: string, date: string, time: string, n: number) => string;
    peopleLess: string; peopleMore: string;
    doneCallTitle: string; doneCallText: string;
    doneResTitle: string; doneResText: (when: string) => string;
    doneServiceText: string;
  };
  errors: { name: string; phone: string; date: string; time: string; check: string; rate: string; server: string; network: (p: string) => string };
  calendar: { prev: string; next: string };
  footer: { contact: string; info: string; privacy: string; tagline: string };
  wa: { hello: string; rent: string; float: string };
  meta: { title: string; description: string };
  privacy: { title: string; body: string[] };
};

export const ui: Record<Locale, Dict> = {
  tr: {
    nav: { services: "Hizmetler", care: "Bakım ve usta", call: "Ara", language: "Dil" },
    hero: {
      kicker: "İstanbul Boğazı",
      title: "Teknenizi seçin, tarihinizi seçin. Gerisini biz halledelim.",
      sub: "Evlilik teklifinden jet skiye, teknede kahvaltıdan gece turuna; tekne bakımı ve usta da bizden.",
      cta: "Hizmetlere bak",
    },
    rent: { title: "Kiralama ve özel turlar", sub: "Hizmeti seçin, takvimden gün ve saati işaretleyin. Uygunluğu teyit edip sizi arıyoruz." },
    care: { title: "Tekne bakımı ve usta", sub: "Teknenizin işini anlatın; güvendiğimiz ustalardan fiyat ve tarih alıp size dönelim." },
    undecided: { title: "Karar veremediniz mi?", sub: "Adınızı ve telefonunuzu bırakın, ne istediğinizi birlikte konuşalım. Ya da hemen arayın:" },
    intro: {
      title: "İstanbul'da tekne kiralama",
      text: [
        "tekne.istanbul, İstanbul Boğazı'nda tekne ve yat kiralamayı, özel Boğaz turlarını ve tekne bakımını tek yerde toplar. Kaptanlı tekne kiralama, saatlik yat kiralama, teknede doğum günü ve evlilik teklifi organizasyonu, teknede kahvaltı ve gece mehtap turu için tarih seçip talep bırakabilirsiniz.",
        "Yaz aylarında jet ski, hız motoru ve kürek teknesi kiralama seçenekleri sunuyoruz. Tekne sahipleri için ise periyodik bakım, zehirli boya, kışlama ve motor, elektrik, tesisat gibi işler için güvenilir usta buluyoruz.",
      ],
    },
    faq: {
      title: "Sık sorulan sorular",
      items: [
        ["Rezervasyon için ödeme gerekiyor mu?", "Hayır. Sitede bıraktığınız talep ön rezervasyondur. Uygunluğu teyit ettikten sonra sizi arar, fiyatı ve ödeme şeklini telefonda netleştiririz."],
        ["Tekneler nereden kalkıyor?", "Hizmete ve tekneye göre Kuruçeşme, Bebek, Arnavutköy, Karaköy, Kadıköy ve Üsküdar gibi Boğaz'ın iki yakasındaki iskelelerden kalkış yapılabilir. Size en yakın noktayı birlikte seçiyoruz."],
        ["Tekneler kaptanlı mı?", "Evet, yat ve tekne kiralamalarımızın tamamı kaptan ve mürettebatla birliktedir. Jet ski ve kürek teknesinde can yeleği ve güvenlik bilgilendirmesi verilir."],
        ["Hava kötü olursa ne oluyor?", "Rüzgâr veya yağış nedeniyle tur güvenli değilse sizinle birlikte yeni bir tarih belirliyoruz."],
      ],
    },
    categories: { kiralama: "Kiralama", tur: "Özel turlar", bakim: "Bakım ve usta" },
    card: { pickDate: "Tarih seç →", leaveRequest: "Talep bırak →", priceFrom: (n) => `${n} TL'den başlayan`, askPrice: "Fiyat için sorun" },
    page: { duration: "Süre", people: "Kişi", price: "Fiyat", includes: "Neler var?", seeAlso: "Bunlara da bakın", home: "Ana sayfa" },
    booking: {
      pickDate: "Tarih seç", describeJob: "İşi anlat", callMe: "Beni arayın", callIntro: "Sadece adınızı ve numaranızı bırakın, sizi arayalım.",
      step1: "1. Gün seçin", step2: "2. Saat seçin", step3: "3. Kaç kişi?", step4: "4. Size nasıl ulaşalım?",
      name: "Adınız", phone: "Telefon", phonePh: "05xx xxx xx xx", noteOptional: "Eklemek istedikleriniz (isteğe bağlı)", notePrompt: "Kısaca ne yapılacak?",
      jobType: "İş türü", boat: "Tekne tipi / boyu", boatPh: "ör. 9 m motoryat", location: "Tekne nerede?", locationPh: "ör. Kalamış Marina",
      submitReserve: "Rezervasyon talebi gönder", submitCall: "Beni arayın", submitService: "Talep gönder", sending: "Gönderiliyor…",
      noPayment: "Şimdi ödeme alınmaz. Uygunluğu teyit edip sizi arayacağız.",
      footnote: ["Gönder'e basarak ", "KVKK aydınlatma metnini", " okuduğunuzu kabul edersiniz."],
      summary: (t, d, h, n) => `${t}: ${d}, saat ${h}, ${n} kişi`,
      peopleLess: "Azalt", peopleMore: "Artır",
      doneCallTitle: "Teşekkürler!", doneCallText: "Numaranızı aldık, en kısa sürede sizi arayacağız.",
      doneResTitle: "Talebiniz alındı!", doneResText: (w) => `${w} için uygunluğu kontrol edip sizi arayacağız. Ödeme ve detaylar telefonda netleşecek.`,
      doneServiceText: "İşinize uygun ustayla görüşüp size fiyat ve tarih için döneceğiz.",
    },
    errors: {
      name: "Adınızı yazın.", phone: "Geçerli bir telefon numarası yazın.", date: "Geçerli bir gün seçin.", time: "Saat seçin.",
      check: "Lütfen işaretli alanları kontrol edin.", rate: "Çok fazla deneme yapıldı. Lütfen bizi arayın.", server: "Talebiniz kaydedilemedi. Lütfen bizi telefonla arayın.",
      network: (p) => `Bağlantı kurulamadı. Lütfen ${p} numarasını arayın.`,
    },
    calendar: { prev: "Önceki ay", next: "Sonraki ay" },
    footer: { contact: "İletişim", info: "Bilgi", privacy: "KVKK aydınlatma metni", tagline: "Boğaz'da tekne kiralama, turlar ve tekne bakımı" },
    wa: { hello: "Merhaba, tekne.istanbul sitesinden yazıyorum.", rent: "Merhaba, tekne kiralamak istiyorum.", float: "WhatsApp ile yazın" },
    meta: {
      title: "İstanbul Tekne Kiralama, Yat Kiralama ve Boğaz Turları | tekne.istanbul",
      description: "İstanbul Boğazı'nda kaptanlı tekne ve yat kiralama, teknede evlilik teklifi, kahvaltı, gece mehtap turu, jet ski, hız motoru, kürek teknesi; tekne bakımı ve usta bulma. Takvimden tarih seçin.",
    },
    privacy: {
      title: "KVKK aydınlatma metni",
      body: [
        "tekne.istanbul olarak, sitemizdeki formlar aracılığıyla bize ilettiğiniz ad, telefon numarası, rezervasyon tarihi ve notlarınızı yalnızca talebinize dönüş yapmak, rezervasyonunuzu planlamak ve sizinle iletişim kurmak amacıyla işliyoruz.",
        "Bu veriler 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 5. maddesinde yer alan \"bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması\" hukuki sebebine dayanılarak işlenir. Talebinizi yerine getirmek için gerekli olduğu ölçüde hizmeti verecek tekne sahibi veya usta ile paylaşılabilir; başka amaçla üçüncü kişilere aktarılmaz.",
        "Verileriniz talebinizin sonuçlanmasından itibaren en fazla 2 yıl saklanır, ardından silinir. Kanun'un 11. maddesi kapsamındaki haklarınızı kullanmak (verilerinize erişme, düzeltme, silme vb.) için {email} adresine yazabilirsiniz.",
      ],
    },
  },

  en: {
    nav: { services: "Services", care: "Maintenance", call: "Call", language: "Language" },
    hero: {
      kicker: "Istanbul Bosphorus",
      title: "Pick your boat, pick your date. We'll handle the rest.",
      sub: "From marriage proposals to jet skis, breakfast cruises to moonlight tours; boat maintenance and technicians too.",
      cta: "See services",
    },
    rent: { title: "Rentals and private tours", sub: "Choose a service and mark a day and time on the calendar. We confirm availability and call you back." },
    care: { title: "Boat maintenance and technicians", sub: "Tell us what your boat needs; we get a price and date from trusted technicians and get back to you." },
    undecided: { title: "Not sure yet?", sub: "Leave your name and phone number and we'll talk it through. Or call us now:" },
    intro: {
      title: "Boat rental in Istanbul",
      text: [
        "tekne.istanbul brings boat and yacht rental, private Bosphorus tours and boat maintenance together in one place. Pick a date and send a request for a skippered boat, an hourly yacht charter, a birthday or marriage proposal on a boat, a breakfast cruise or a moonlight tour on the Bosphorus.",
        "In summer we also offer jet ski, speedboat and rowing boat rentals. For boat owners, we arrange periodic maintenance, antifouling, winterizing and reliable technicians for engine, electrical and plumbing work.",
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        ["Do I need to pay to book?", "No. The request you send on the site is a pre-booking. Once we confirm availability we call you and agree on the price and payment method by phone."],
        ["Where do the boats depart from?", "Depending on the service and boat, departures are possible from piers on both sides of the Bosphorus such as Kuruçeşme, Bebek, Arnavutköy, Karaköy, Kadıköy and Üsküdar. We choose the closest point together."],
        ["Do the boats come with a captain?", "Yes, all yacht and boat rentals include a captain and crew. Jet ski and rowing boat rentals include life jackets and a safety briefing."],
        ["What if the weather is bad?", "If wind or rain makes the trip unsafe, we set a new date together with you."],
      ],
    },
    categories: { kiralama: "Rentals", tur: "Private tours", bakim: "Maintenance" },
    card: { pickDate: "Pick a date →", leaveRequest: "Send a request →", priceFrom: (n) => `From ${n} TRY`, askPrice: "Ask for a price" },
    page: { duration: "Duration", people: "Guests", price: "Price", includes: "What's included", seeAlso: "You may also like", home: "Home" },
    booking: {
      pickDate: "Pick a date", describeJob: "Describe the job", callMe: "Call me back", callIntro: "Just leave your name and number and we'll call you.",
      step1: "1. Choose a day", step2: "2. Choose a time", step3: "3. How many guests?", step4: "4. How can we reach you?",
      name: "Your name", phone: "Phone", phonePh: "+44 7xxx xxxxxx", noteOptional: "Anything to add (optional)", notePrompt: "What needs to be done?",
      jobType: "Type of work", boat: "Boat type / length", boatPh: "e.g. 9 m motor yacht", location: "Where is the boat?", locationPh: "e.g. Kalamış Marina",
      submitReserve: "Send booking request", submitCall: "Call me back", submitService: "Send request", sending: "Sending…",
      noPayment: "No payment now. We confirm availability and call you.",
      footnote: ["By sending you confirm you have read the ", "privacy notice", "."],
      summary: (t, d, h, n) => `${t}: ${d}, ${h}, ${n} ${n === 1 ? "guest" : "guests"}`,
      peopleLess: "Fewer", peopleMore: "More",
      doneCallTitle: "Thank you!", doneCallText: "We've got your number and will call you shortly.",
      doneResTitle: "Request received!", doneResText: (w) => `We'll check availability for ${w} and call you. Payment and details will be agreed by phone.`,
      doneServiceText: "We'll talk to the right technician and get back to you with a price and date.",
    },
    errors: {
      name: "Please enter your name.", phone: "Please enter a valid phone number with country code.", date: "Please choose a valid day.", time: "Please choose a time.",
      check: "Please check the highlighted fields.", rate: "Too many attempts. Please call us.", server: "Your request could not be saved. Please call us.",
      network: (p) => `Connection failed. Please call ${p}.`,
    },
    calendar: { prev: "Previous month", next: "Next month" },
    footer: { contact: "Contact", info: "Info", privacy: "Privacy notice", tagline: "Boat rental, tours and boat maintenance on the Bosphorus" },
    wa: { hello: "Hello, I'm writing from the tekne.istanbul website.", rent: "Hello, I'd like to rent a boat.", float: "Message us on WhatsApp" },
    meta: {
      title: "Istanbul Boat Rental, Yacht Charter and Bosphorus Tours | tekne.istanbul",
      description: "Skippered boat and yacht rental on the Istanbul Bosphorus: marriage proposals, breakfast cruises, moonlight tours, jet ski, speedboat and rowing boat rentals; boat maintenance and technicians. Pick a date online.",
    },
    privacy: {
      title: "Privacy notice",
      body: [
        "tekne.istanbul processes the name, phone number, booking date and notes you send through the forms on this site only to respond to your request, plan your booking and contact you.",
        "This data is processed under Article 5 of the Turkish Personal Data Protection Law No. 6698 (KVKK), as it is directly related to the conclusion or performance of a contract. It may be shared with the boat owner or technician providing the service only as far as needed to fulfil your request, and is not transferred to third parties for any other purpose.",
        "Your data is kept for up to 2 years after your request is completed and then deleted. To exercise your rights (access, correction, deletion, etc.) write to {email}.",
      ],
    },
  },

  ar: {
    nav: { services: "الخدمات", care: "الصيانة", call: "اتصل", language: "اللغة" },
    hero: {
      kicker: "مضيق البوسفور، إسطنبول",
      title: "اختر قاربك، اختر موعدك. ونحن نتولى الباقي.",
      sub: "من طلب الزواج إلى الدراجات المائية، ومن الفطور على القارب إلى جولة ضوء القمر؛ وصيانة القوارب والفنيين أيضاً.",
      cta: "تصفح الخدمات",
    },
    rent: { title: "التأجير والجولات الخاصة", sub: "اختر الخدمة وحدد اليوم والساعة من التقويم. نتأكد من التوفر ونتصل بك." },
    care: { title: "صيانة القوارب والفنيون", sub: "أخبرنا بما يحتاجه قاربك؛ نحصل على السعر والموعد من فنيين موثوقين ونعود إليك." },
    undecided: { title: "لم تقرر بعد؟", sub: "اترك اسمك ورقم هاتفك ولنتحدث معاً. أو اتصل بنا الآن:" },
    intro: {
      title: "تأجير القوارب في إسطنبول",
      text: [
        "يجمع tekne.istanbul تأجير القوارب واليخوت والجولات الخاصة في البوسفور وصيانة القوارب في مكان واحد. اختر موعداً وأرسل طلباً لقارب مع قبطان، أو يخت بالساعة، أو حفلة عيد ميلاد أو طلب زواج على القارب، أو فطور على متن القارب، أو جولة ليلية تحت ضوء القمر.",
        "في الصيف نوفر أيضاً تأجير الدراجات المائية والقوارب السريعة وقوارب التجديف. ولأصحاب القوارب نرتب الصيانة الدورية والطلاء المضاد للحشف والتخزين الشتوي وفنيين موثوقين للمحركات والكهرباء والسباكة.",
      ],
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        ["هل يجب الدفع للحجز؟", "لا. الطلب الذي ترسله عبر الموقع هو حجز مبدئي. بعد التأكد من التوفر نتصل بك ونتفق على السعر وطريقة الدفع عبر الهاتف."],
        ["من أين تنطلق القوارب؟", "حسب الخدمة والقارب، يمكن الانطلاق من أرصفة على ضفتي البوسفور مثل كوروتشيشمه وبيبك وأرناؤوط كوي وكاراكوي وكاديكوي وأسكدار. نختار معاً أقرب نقطة إليك."],
        ["هل تأتي القوارب مع قبطان؟", "نعم، جميع عمليات تأجير اليخوت والقوارب تشمل قبطاناً وطاقماً. وتأجير الدراجات المائية وقوارب التجديف يشمل سترات النجاة وشرحاً للسلامة."],
        ["ماذا لو كان الطقس سيئاً؟", "إذا كانت الرياح أو الأمطار تجعل الرحلة غير آمنة، نحدد معك موعداً جديداً."],
      ],
    },
    categories: { kiralama: "التأجير", tur: "جولات خاصة", bakim: "الصيانة" },
    card: { pickDate: "← اختر موعداً", leaveRequest: "← أرسل طلباً", priceFrom: (n) => `ابتداءً من ${n} ليرة`, askPrice: "اسأل عن السعر" },
    page: { duration: "المدة", people: "الأشخاص", price: "السعر", includes: "ماذا يشمل؟", seeAlso: "قد يعجبك أيضاً", home: "الرئيسية" },
    booking: {
      pickDate: "اختر موعداً", describeJob: "صف العمل", callMe: "اتصلوا بي", callIntro: "فقط اترك اسمك ورقمك وسنتصل بك.",
      step1: "١. اختر اليوم", step2: "٢. اختر الساعة", step3: "٣. كم عدد الأشخاص؟", step4: "٤. كيف نتواصل معك؟",
      name: "اسمك", phone: "الهاتف", phonePh: "+966 5x xxx xxxx", noteOptional: "ملاحظات إضافية (اختياري)", notePrompt: "ما العمل المطلوب؟",
      jobType: "نوع العمل", boat: "نوع القارب / طوله", boatPh: "مثلاً يخت بمحرك ٩ م", location: "أين القارب؟", locationPh: "مثلاً مرسى كالاميش",
      submitReserve: "أرسل طلب الحجز", submitCall: "اتصلوا بي", submitService: "أرسل الطلب", sending: "جارٍ الإرسال…",
      noPayment: "لا يتم الدفع الآن. نتأكد من التوفر ونتصل بك.",
      footnote: ["بالإرسال تؤكد أنك قرأت ", "إشعار الخصوصية", "."],
      summary: (t, d, h, n) => `${t}: ${d}، الساعة ${h}، ${n} أشخاص`,
      peopleLess: "أقل", peopleMore: "أكثر",
      doneCallTitle: "شكراً لك!", doneCallText: "وصلنا رقمك وسنتصل بك قريباً.",
      doneResTitle: "تم استلام طلبك!", doneResText: (w) => `سنتحقق من التوفر في ${w} ونتصل بك. يتم الاتفاق على الدفع والتفاصيل عبر الهاتف.`,
      doneServiceText: "سنتحدث مع الفني المناسب ونعود إليك بالسعر والموعد.",
    },
    errors: {
      name: "يرجى كتابة اسمك.", phone: "يرجى كتابة رقم هاتف صحيح مع رمز الدولة.", date: "يرجى اختيار يوم صحيح.", time: "يرجى اختيار الساعة.",
      check: "يرجى مراجعة الحقول المحددة.", rate: "محاولات كثيرة. يرجى الاتصال بنا.", server: "تعذر حفظ طلبك. يرجى الاتصال بنا.",
      network: (p) => `تعذر الاتصال. يرجى الاتصال على ${p}.`,
    },
    calendar: { prev: "الشهر السابق", next: "الشهر التالي" },
    footer: { contact: "التواصل", info: "معلومات", privacy: "إشعار الخصوصية", tagline: "تأجير القوارب والجولات وصيانة القوارب في البوسفور" },
    wa: { hello: "مرحباً، أكتب إليكم من موقع tekne.istanbul.", rent: "مرحباً، أرغب في استئجار قارب.", float: "راسلنا على واتساب" },
    meta: {
      title: "تأجير القوارب واليخوت وجولات البوسفور في إسطنبول | tekne.istanbul",
      description: "تأجير قوارب ويخوت مع قبطان في مضيق البوسفور بإسطنبول: طلب الزواج، الفطور على القارب، جولة ضوء القمر، الدراجات المائية والقوارب السريعة وقوارب التجديف؛ صيانة القوارب والفنيون. اختر موعدك عبر الإنترنت.",
    },
    privacy: {
      title: "إشعار الخصوصية",
      body: [
        "يعالج tekne.istanbul الاسم ورقم الهاتف وتاريخ الحجز والملاحظات التي ترسلها عبر نماذج الموقع فقط للرد على طلبك وتنظيم حجزك والتواصل معك.",
        "تتم معالجة هذه البيانات وفق المادة 5 من قانون حماية البيانات الشخصية التركي رقم 6698 لكونها مرتبطة مباشرة بإبرام العقد أو تنفيذه. وقد تتم مشاركتها مع مالك القارب أو الفني مقدم الخدمة بالقدر اللازم لتنفيذ طلبك فقط، ولا تُنقل إلى أطراف ثالثة لأي غرض آخر.",
        "تُحفظ بياناتك لمدة أقصاها سنتان بعد انتهاء طلبك ثم تُحذف. لممارسة حقوقك (الاطلاع، التصحيح، الحذف وغيرها) راسلنا على {email}.",
      ],
    },
  },

  fr: {
    nav: { services: "Services", care: "Entretien", call: "Appeler", language: "Langue" },
    hero: {
      kicker: "Bosphore, Istanbul",
      title: "Choisissez votre bateau et votre date. On s'occupe du reste.",
      sub: "De la demande en mariage au jet ski, du petit-déjeuner à bord à la croisière au clair de lune ; entretien de bateaux et techniciens aussi.",
      cta: "Voir les services",
    },
    rent: { title: "Locations et croisières privées", sub: "Choisissez un service, indiquez le jour et l'heure sur le calendrier. Nous confirmons la disponibilité et vous rappelons." },
    care: { title: "Entretien de bateaux et techniciens", sub: "Décrivez les besoins de votre bateau ; nous obtenons un prix et une date auprès de techniciens de confiance." },
    undecided: { title: "Vous hésitez encore ?", sub: "Laissez votre nom et votre numéro, nous en parlerons ensemble. Ou appelez-nous :" },
    intro: {
      title: "Location de bateau à Istanbul",
      text: [
        "tekne.istanbul réunit la location de bateaux et de yachts, les croisières privées sur le Bosphore et l'entretien de bateaux au même endroit. Choisissez une date et envoyez une demande pour un bateau avec skipper, un yacht à l'heure, un anniversaire ou une demande en mariage à bord, un petit-déjeuner ou une croisière au clair de lune.",
        "En été, nous proposons aussi la location de jet ski, de bateau rapide et de barque. Pour les propriétaires, nous organisons l'entretien périodique, l'antifouling, l'hivernage et des techniciens fiables pour le moteur, l'électricité et la plomberie.",
      ],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        ["Faut-il payer pour réserver ?", "Non. La demande envoyée sur le site est une pré-réservation. Après confirmation de la disponibilité, nous vous appelons pour convenir du prix et du mode de paiement."],
        ["D'où partent les bateaux ?", "Selon le service et le bateau, les départs sont possibles depuis les quais des deux rives du Bosphore : Kuruçeşme, Bebek, Arnavutköy, Karaköy, Kadıköy, Üsküdar. Nous choisissons ensemble le point le plus proche."],
        ["Les bateaux sont-ils avec skipper ?", "Oui, toutes nos locations de yachts et de bateaux incluent un capitaine et un équipage. Les gilets de sauvetage et un briefing sécurité sont fournis pour le jet ski et la barque."],
        ["Et en cas de mauvais temps ?", "Si le vent ou la pluie rendent la sortie dangereuse, nous fixons une nouvelle date avec vous."],
      ],
    },
    categories: { kiralama: "Locations", tur: "Croisières privées", bakim: "Entretien" },
    card: { pickDate: "Choisir une date →", leaveRequest: "Envoyer une demande →", priceFrom: (n) => `À partir de ${n} TRY`, askPrice: "Prix sur demande" },
    page: { duration: "Durée", people: "Personnes", price: "Prix", includes: "Ce qui est inclus", seeAlso: "À découvrir aussi", home: "Accueil" },
    booking: {
      pickDate: "Choisir une date", describeJob: "Décrire le travail", callMe: "Rappelez-moi", callIntro: "Laissez simplement votre nom et votre numéro, nous vous rappelons.",
      step1: "1. Choisissez un jour", step2: "2. Choisissez une heure", step3: "3. Combien de personnes ?", step4: "4. Comment vous joindre ?",
      name: "Votre nom", phone: "Téléphone", phonePh: "+33 6 xx xx xx xx", noteOptional: "Autre chose à ajouter (facultatif)", notePrompt: "Que faut-il faire ?",
      jobType: "Type de travaux", boat: "Type / longueur du bateau", boatPh: "ex. yacht à moteur de 9 m", location: "Où est le bateau ?", locationPh: "ex. Marina de Kalamış",
      submitReserve: "Envoyer la demande de réservation", submitCall: "Rappelez-moi", submitService: "Envoyer la demande", sending: "Envoi…",
      noPayment: "Aucun paiement maintenant. Nous confirmons la disponibilité et vous appelons.",
      footnote: ["En envoyant, vous confirmez avoir lu la ", "politique de confidentialité", "."],
      summary: (t, d, h, n) => `${t} : ${d}, ${h}, ${n} ${n > 1 ? "personnes" : "personne"}`,
      peopleLess: "Moins", peopleMore: "Plus",
      doneCallTitle: "Merci !", doneCallText: "Nous avons bien reçu votre numéro et vous appellerons très vite.",
      doneResTitle: "Demande reçue !", doneResText: (w) => `Nous vérifions la disponibilité pour le ${w} et vous appelons. Le paiement et les détails seront réglés par téléphone.`,
      doneServiceText: "Nous contactons le bon technicien et revenons vers vous avec un prix et une date.",
    },
    errors: {
      name: "Veuillez saisir votre nom.", phone: "Veuillez saisir un numéro valide avec l'indicatif du pays.", date: "Veuillez choisir un jour valide.", time: "Veuillez choisir une heure.",
      check: "Veuillez vérifier les champs indiqués.", rate: "Trop de tentatives. Merci de nous appeler.", server: "Votre demande n'a pas pu être enregistrée. Merci de nous appeler.",
      network: (p) => `Connexion impossible. Appelez le ${p}.`,
    },
    calendar: { prev: "Mois précédent", next: "Mois suivant" },
    footer: { contact: "Contact", info: "Infos", privacy: "Politique de confidentialité", tagline: "Location de bateaux, croisières et entretien sur le Bosphore" },
    wa: { hello: "Bonjour, je vous écris depuis le site tekne.istanbul.", rent: "Bonjour, je souhaite louer un bateau.", float: "Écrivez-nous sur WhatsApp" },
    meta: {
      title: "Location de bateau et yacht à Istanbul, croisières sur le Bosphore | tekne.istanbul",
      description: "Location de bateaux et yachts avec skipper sur le Bosphore à Istanbul : demande en mariage, petit-déjeuner à bord, croisière au clair de lune, jet ski, bateau rapide, barque ; entretien et techniciens. Choisissez votre date en ligne.",
    },
    privacy: {
      title: "Politique de confidentialité",
      body: [
        "tekne.istanbul traite le nom, le numéro de téléphone, la date de réservation et les notes envoyés via les formulaires du site uniquement pour répondre à votre demande, organiser votre réservation et vous contacter.",
        "Ces données sont traitées sur la base de l'article 5 de la loi turque n° 6698 sur la protection des données personnelles (KVKK), car elles sont directement liées à la conclusion ou à l'exécution d'un contrat. Elles peuvent être partagées avec le propriétaire du bateau ou le technicien dans la mesure nécessaire, et ne sont transmises à aucun tiers à d'autres fins.",
        "Vos données sont conservées au maximum 2 ans après la fin de votre demande, puis supprimées. Pour exercer vos droits (accès, rectification, suppression, etc.), écrivez à {email}.",
      ],
    },
  },

  it: {
    nav: { services: "Servizi", care: "Manutenzione", call: "Chiama", language: "Lingua" },
    hero: {
      kicker: "Bosforo, Istanbul",
      title: "Scegli la barca, scegli la data. Al resto pensiamo noi.",
      sub: "Dalla proposta di matrimonio alla moto d'acqua, dalla colazione in barca al tour al chiaro di luna; anche manutenzione e tecnici nautici.",
      cta: "Vedi i servizi",
    },
    rent: { title: "Noleggi e tour privati", sub: "Scegli il servizio e segna giorno e ora sul calendario. Verifichiamo la disponibilità e ti richiamiamo." },
    care: { title: "Manutenzione barche e tecnici", sub: "Raccontaci cosa serve alla tua barca; otteniamo prezzo e data da tecnici di fiducia e ti ricontattiamo." },
    undecided: { title: "Ancora indeciso?", sub: "Lascia nome e numero di telefono e ne parliamo insieme. Oppure chiamaci subito:" },
    intro: {
      title: "Noleggio barche a Istanbul",
      text: [
        "tekne.istanbul riunisce noleggio di barche e yacht, tour privati sul Bosforo e manutenzione delle barche in un unico posto. Scegli una data e invia una richiesta per una barca con skipper, uno yacht a ore, un compleanno o una proposta di matrimonio a bordo, una colazione in barca o un tour al chiaro di luna.",
        "In estate offriamo anche noleggio di moto d'acqua, motoscafi e barche a remi. Per i proprietari organizziamo manutenzione periodica, antivegetativa, rimessaggio invernale e tecnici affidabili per motore, impianto elettrico e idraulico.",
      ],
    },
    faq: {
      title: "Domande frequenti",
      items: [
        ["Devo pagare per prenotare?", "No. La richiesta inviata dal sito è una pre-prenotazione. Dopo aver verificato la disponibilità ti chiamiamo e concordiamo prezzo e modalità di pagamento al telefono."],
        ["Da dove partono le barche?", "A seconda del servizio e della barca, si parte dai moli su entrambe le sponde del Bosforo, come Kuruçeşme, Bebek, Arnavutköy, Karaköy, Kadıköy e Üsküdar. Scegliamo insieme il punto più vicino."],
        ["Le barche hanno lo skipper?", "Sì, tutti i noleggi di yacht e barche includono capitano ed equipaggio. Per moto d'acqua e barche a remi sono inclusi giubbotti di salvataggio e un briefing sulla sicurezza."],
        ["E se il tempo è brutto?", "Se vento o pioggia rendono l'uscita poco sicura, fissiamo insieme una nuova data."],
      ],
    },
    categories: { kiralama: "Noleggi", tur: "Tour privati", bakim: "Manutenzione" },
    card: { pickDate: "Scegli la data →", leaveRequest: "Invia richiesta →", priceFrom: (n) => `Da ${n} TRY`, askPrice: "Prezzo su richiesta" },
    page: { duration: "Durata", people: "Persone", price: "Prezzo", includes: "Cosa è incluso", seeAlso: "Potrebbe interessarti anche", home: "Home" },
    booking: {
      pickDate: "Scegli la data", describeJob: "Descrivi il lavoro", callMe: "Richiamatemi", callIntro: "Lascia solo nome e numero, ti richiamiamo noi.",
      step1: "1. Scegli il giorno", step2: "2. Scegli l'ora", step3: "3. Quante persone?", step4: "4. Come possiamo contattarti?",
      name: "Il tuo nome", phone: "Telefono", phonePh: "+39 3xx xxx xxxx", noteOptional: "Altro da aggiungere (facoltativo)", notePrompt: "Cosa bisogna fare?",
      jobType: "Tipo di lavoro", boat: "Tipo / lunghezza della barca", boatPh: "es. motoryacht di 9 m", location: "Dove si trova la barca?", locationPh: "es. Marina di Kalamış",
      submitReserve: "Invia richiesta di prenotazione", submitCall: "Richiamatemi", submitService: "Invia richiesta", sending: "Invio…",
      noPayment: "Nessun pagamento ora. Verifichiamo la disponibilità e ti chiamiamo.",
      footnote: ["Inviando confermi di aver letto l'", "informativa sulla privacy", "."],
      summary: (t, d, h, n) => `${t}: ${d}, ore ${h}, ${n} ${n === 1 ? "persona" : "persone"}`,
      peopleLess: "Meno", peopleMore: "Più",
      doneCallTitle: "Grazie!", doneCallText: "Abbiamo ricevuto il tuo numero e ti chiameremo a breve.",
      doneResTitle: "Richiesta ricevuta!", doneResText: (w) => `Verifichiamo la disponibilità per ${w} e ti chiamiamo. Pagamento e dettagli verranno concordati al telefono.`,
      doneServiceText: "Parliamo con il tecnico giusto e ti ricontattiamo con prezzo e data.",
    },
    errors: {
      name: "Inserisci il tuo nome.", phone: "Inserisci un numero valido con prefisso internazionale.", date: "Scegli un giorno valido.", time: "Scegli un orario.",
      check: "Controlla i campi evidenziati.", rate: "Troppi tentativi. Chiamaci.", server: "Non è stato possibile salvare la richiesta. Chiamaci.",
      network: (p) => `Connessione non riuscita. Chiama il ${p}.`,
    },
    calendar: { prev: "Mese precedente", next: "Mese successivo" },
    footer: { contact: "Contatti", info: "Info", privacy: "Informativa sulla privacy", tagline: "Noleggio barche, tour e manutenzione sul Bosforo" },
    wa: { hello: "Ciao, vi scrivo dal sito tekne.istanbul.", rent: "Ciao, vorrei noleggiare una barca.", float: "Scrivici su WhatsApp" },
    meta: {
      title: "Noleggio barche e yacht a Istanbul, tour sul Bosforo | tekne.istanbul",
      description: "Noleggio di barche e yacht con skipper sul Bosforo a Istanbul: proposta di matrimonio, colazione in barca, tour al chiaro di luna, moto d'acqua, motoscafo e barca a remi; manutenzione e tecnici. Scegli la data online.",
    },
    privacy: {
      title: "Informativa sulla privacy",
      body: [
        "tekne.istanbul tratta nome, numero di telefono, data di prenotazione e note inviati tramite i moduli del sito solo per rispondere alla tua richiesta, organizzare la prenotazione e contattarti.",
        "I dati sono trattati ai sensi dell'articolo 5 della legge turca n. 6698 sulla protezione dei dati personali (KVKK), in quanto direttamente collegati alla conclusione o esecuzione di un contratto. Possono essere condivisi con il proprietario della barca o il tecnico solo nella misura necessaria e non sono ceduti a terzi per altri scopi.",
        "I dati sono conservati al massimo 2 anni dalla conclusione della richiesta e poi cancellati. Per esercitare i tuoi diritti (accesso, rettifica, cancellazione, ecc.) scrivi a {email}.",
      ],
    },
  },
};
