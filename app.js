const STORE_KEY = "defterim.data";
const CLOUD_KEY = "defterim.cloud";
const DIRTY_KEY = "defterim.dirty";
const API = "https://api.jsonbin.io/v3/b";
const DEFAULT_KEY = "$2a$10$SK5kRKhW5Chnu0LRk2v90ONtlnP8GRAJVkgb21zEfkCt.TT0vxL9y";
const DEFAULT_BIN = "";
const VIEW_KEY = "defterim.view";
const PROFILES = { burcun: "Burcun", dodom: "Dodom" };
// Şifreler düz yazı olarak tutulmaz; Ekim1901. anahtarıyla PBKDF2 özeti alınır.
const PW_SALT = "Ekim1901.";
const LOCK_HASH = "f3fce4f7f8614b328fc8b14a5a88f0d24243d4dee5b36534cb66815052d65eed"; // Şifreler bölümünün kilidi (Ekim1901.)
const PW_HASH = {
  burcun: "181371d3a4b370e3c5ff72d8e21b7154386659ab9619bd63936d5a199a2e879c",
  dodom: "58a2ecb4e10e322c388cf932c7c168bc64e909a427fa22af03a3fb3791b57d3e"
};
const SECTIONS = [
  "accounts", "recipes", "notes", "plans", "films",
  "emails", "growth", "favorites", "doodle", "mood", "ideas", "wishlist"
];
const STACKS = ["recipes", "plans", "growth", "wishlist"];
const MOODS = ["😊 Harika", "🙂 İyi", "😐 Fena değil", "😔 Üzgün", "😣 Stresli"];
const SALE = ["Sadece bende", "Satılık", "Satıldı"];
const PRIORITY = ["Çok istiyorum", "İstiyorum", "Belki"];
const QUOTES = [
  "Küçük adımlar, büyük hayallere götürür.",
  "Hayaller planlarla gerçekleşir.",
  "Kendine iyi bak, her şey yolunda olacak.",
  "Bugün biraz daha kendin için.",
  "Güzel şeyler zaman alır.",
  "Her gün küçük bir ilerleme yeter.",
  "Sakin kal, devam et.",
  "Bugün dünden bir adım ilerideydin.",
  "Küçük mutluluklar büyük farklar yaratır.",
  "Nefes al, yavaşla, yeniden başla."
];
const TOGGLE_MSG = {
  wishlist: ["Harika, aldın!", "Listeye geri döndü"],
  growth: ["Dinledin, güzel!", "Dinlenecekler listesine döndü"]
};

const NAV = [
  { id: "home", name: "Ana sayfa" },
  { id: "notes", name: "Notlar", hint: "Düşünceler, fikirler, yapılacaklar" },
  { id: "emails", name: "E-posta adresleri", hint: "Kişisel ve önemli e-postalar" },
  { id: "accounts", name: "Şifreler", hint: "Güvenli giriş bilgilerin" },
  { id: "recipes", name: "Tarifler", hint: "Lezzetli tarifler, favorilerin" },
  { id: "word", name: "Bulmaca", hint: "Gazete usulü, çözdükçe zorlaşır" },
  { id: "plans", name: "Planlar", hint: "Yapacaklarını listele" },
  { id: "growth", name: "Müzik önerileri", hint: "Dinle, keşfet, paylaş" },
  { id: "films", name: "Film ve dizi", hint: "İzlenecekler ve puanların" },
  { id: "favorites", name: "Favoriler", hint: "Siteler, müzikler, filmler" },
  { id: "doodle", name: "Çizim", hint: "Resimlerini yükle, satılığa koy" },
  { id: "mood", name: "Hissettiklerim", hint: "Hislerini yaz, hafifle" },
  { id: "ideas", name: "Fikir kutusu", hint: "Aklına gelen her şey" },
  { id: "wishlist", name: "İstek listem", hint: "Hayali kur, biriktir" }
];
const HOME_TILES = ["word", "growth", "films", "favorites", "doodle", "mood", "ideas", "wishlist"];
const VIEW_IDS = ["home", "word", ...SECTIONS];
const nameOf = id => (NAV.find(n => n.id === id) || {}).name || id;

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M10 20v-5h4v5"/>',
  notes: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  emails: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  accounts: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  recipes: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M8 7c0-1.5 1-2 1-3.5M12 7c0-1.5 1-2 1-3.5M16 7c0-1.5 1-2 1-3.5"/>',
  word: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/><path d="M15.5 3.5h5v5h-5zM3.5 15.5h5v5h-5z" fill="currentColor"/>',
  plans: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/>',
  growth: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  films: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  favorites: '<path d="m12 3.5 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.9l6-.9Z"/>',
  doodle: '<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.8 2-1.7 0-1.2-1-1.6-1-2.6 0-.9.7-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3Z"/><path d="M7.5 11h.01M10 7.5h.01M14.5 7.5h.01"/>',
  mood: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.2 4.2 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  ideas: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  wishlist: '<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M3 9h18M12 9v11M12 9S9 8.5 8.5 6.5 10 4 12 6c2-2 3.5-.5 3.5.5S12 9 12 9Z"/>'
};
const iconSvg = id => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[id] || ""}</svg>`;
const $ = id => document.getElementById(id);

let data = null;
let current = null;
let editingId = null;
let toastTimer = null;
let filmFilter = "all";
let active = "home";
let beforeSearch = "home";
let profile = "burcun";
let pendingProfile = null;
let accountsUnlocked = false;
let failCount = 0;
let saleFilter = "all";
const searchQ = {};
let cloud = loadCloud();
let pushTimer = null;
let pushing = false;
let pendingPush = false;

const views = {
  accounts: {
    add: "Hesap ekle",
    empty: "Henüz kayıtlı hesap yok. Mail adresini ve şifresini “Hesap ekle” ile kaydet.",
    fields: [
      { name: "title", label: "Hesap adı", placeholder: "Gmail, Instagram, banka…", required: true },
      { name: "email", label: "Mail adresi veya kullanıcı adı" },
      { name: "password", label: "Şifre", type: "password" },
      { name: "url", label: "Site adresi", placeholder: "https://" },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  },
  recipes: {
    add: "Tarif ekle",
    empty: "Henüz tarif yok. İlk tarifini “Tarif ekle” ile yaz.",
    fields: [
      { name: "title", label: "Tarif adı", required: true },
      { name: "category", label: "Kategori", placeholder: "Makarna, çorba, tatlı…" },
      { name: "time", label: "Süre", placeholder: "Örn. 30 dk" },
      { name: "ingredients", label: "Malzemeler", hint: "Her satıra bir malzeme yaz.", type: "textarea", rows: 6 },
      { name: "steps", label: "Yapılışı", hint: "Her satıra bir adım yaz.", type: "textarea", rows: 8 }
    ]
  },
  notes: {
    add: "Not ekle",
    empty: "Henüz not yok. Unutmak istemediğin ilk şeyi “Not ekle” ile yaz.",
    fields: [
      { name: "title", label: "Başlık", required: true },
      { name: "body", label: "Not", type: "textarea", rows: 10 }
    ]
  },
  plans: {
    add: "Plan ekle",
    empty: "Henüz plan yok. Yapacaklarını “Plan ekle” ile listele.",
    fields: [
      { name: "title", label: "Ne yapılacak?", required: true },
      { name: "date", label: "Tarih", type: "date" },
      { name: "detail", label: "Ayrıntı", type: "textarea", rows: 4 }
    ]
  },
  films: {
    add: "Öneri ekle",
    empty: "Henüz öneri yok. Duyduğun bir film ya da diziyi “Öneri ekle” ile kaydet.",
    fields: [
      { name: "title", label: "Adı", required: true },
      { name: "kind", label: "Tür", type: "select", options: ["Film", "Dizi", "Belgesel", "Anime"] },
      { name: "genre", label: "Kategori", placeholder: "Komedi, gerilim, dram…" },
      { name: "platform", label: "Nerede izlenir?", placeholder: "Netflix, Disney+, sinema…" },
      { name: "by", label: "Kim önerdi?" },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  },
  emails: {
    add: "Adres ekle",
    empty: "Henüz e-posta adresi yok. Önemli adreslerini “Adres ekle” ile kaydet.",
    fields: [
      { name: "title", label: "Etiket", placeholder: "Kişisel, iş, alışveriş…", required: true },
      { name: "address", label: "E-posta adresi" },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  },
  growth: {
    add: "Müzik ekle",
    empty: "Henüz müzik önerisi yok. Duyduğun bir şarkıyı “Müzik ekle” ile kaydet.",
    fields: [
      { name: "title", label: "Şarkı / albüm adı", required: true },
      { name: "artist", label: "Sanatçı" },
      { name: "kind", label: "Tür", type: "select", options: ["Şarkı", "Albüm", "Sanatçı", "Çalma listesi"] },
      { name: "by", label: "Kim önerdi?" },
      { name: "url", label: "Bağlantı", placeholder: "https://" },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  },
  favorites: {
    add: "Favori ekle",
    empty: "Henüz favori yok. Sevdiğin site, şarkı ya da yemeği “Favori ekle” ile kaydet.",
    fields: [
      { name: "title", label: "Adı", required: true },
      { name: "kind", label: "Tür", type: "select", options: ["Site", "Müzik", "Film / dizi", "Yemek", "Diğer"] },
      { name: "url", label: "Bağlantı", placeholder: "https://" },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  },
  doodle: {
    add: "Resim ekle",
    empty: "Henüz resim yok. “Resim ekle” ile bir resim yükle, istersen satılığa koy.",
    fields: [
      { name: "title", label: "Başlık", required: true },
      { name: "img", label: "Resim", type: "image" },
      { name: "sale", label: "Durumu", type: "select", options: SALE },
      { name: "price", label: "Satış fiyatı", placeholder: "₺500" },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  },
  mood: {
    add: "Hissim ekle",
    empty: "Henüz kayıt yok. Bugün nasıl hissettiğini “Hissim ekle” ile yaz.",
    fields: [
      { name: "title", label: "Kısa başlık", placeholder: "Bugünün özeti", required: true },
      { name: "date", label: "Tarih", type: "date", default: () => todayStr() },
      { name: "mood", label: "Nasıl hissediyorsun?", type: "select", options: MOODS },
      { name: "body", label: "Neler hissettin?", type: "textarea", rows: 5 },
      { name: "gratitude", label: "Bugün güzel olan ne?", type: "textarea", rows: 3 }
    ]
  },
  ideas: {
    add: "Fikir ekle",
    empty: "Henüz fikir yok. Aklına gelen ilk şeyi “Fikir ekle” ile kutuya at.",
    fields: [
      { name: "title", label: "Fikir", required: true },
      { name: "category", label: "Kategori", placeholder: "İş, hobi, hediye…" },
      { name: "body", label: "Ayrıntı", type: "textarea", rows: 6 }
    ]
  },
  wishlist: {
    add: "İstek ekle",
    empty: "Henüz istek yok. Hayalini kurduğun şeyi “İstek ekle” ile biriktir.",
    fields: [
      { name: "title", label: "İstediğin şey", required: true },
      { name: "price", label: "Yaklaşık fiyat", placeholder: "₺1.250" },
      { name: "priority", label: "Ne kadar istiyorsun?", type: "select", options: PRIORITY },
      { name: "url", label: "Bağlantı", placeholder: "https://" },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  }
};

function load() {
  let d = {};
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) d = JSON.parse(raw) || {};
  } catch {
    d = {};
  }
  SECTIONS.forEach(sec => { if (!Array.isArray(d[sec])) d[sec] = []; });
  d.bulmaca = normalizePuzzle(d.bulmaca);
  delete d.word;
  return d;
}

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---------- Bulmaca ---------- */

const BANK_RAW = `
ADA|Etrafı suyla çevrili kara parçası|Denizin ortasında kalan toprak
ARI|Bal yapan böcek|Kovanın çalışkan sakini
AŞK|Sevda|Leyla ile Mecnun'u tüketen duygu
AYI|Kış uykusuna yatan iri hayvan|Balı en çok seven orman sakini
BAL|Arının ürettiği tatlı|Petekte saklanan lezzet
BEL|Vücudun orta kısmı|Kemerin sarıldığı yer
BAŞ|Kafa|Vücudun en üst kısmı
CAM|Pencerelerdeki saydam madde|Kumun eritilmesiyle elde edilir
CAN|Ruh, hayat|Kedinin dokuz tane olduğuna inanılan
ÇAY|Demlenerek içilen içecek|Rize'nin ünlü yaprağı
ÇAM|İğne yapraklı ağaç|Yılbaşında süslenen ağaç
ÇÖL|Kumlu ve kurak yer|Devenin yurdu
DAĞ|Yüksek yer şekli|Ağrı ya da Erciyes
DİL|Tat alma organı|Hem organ hem lisan
DİZ|Bacaktaki eklem|Çökünce yere değen yer
DEV|Masallardaki iri yaratık|Kocaman, çok büyük
DUA|Yakarış|Allah'a yalvarma
ELA|Yeşile çalan göz rengi|Açık kahve ile yeşil arası göz
FAL|Gelecekten haber verme|Kahve telvesiyle bakılan
GÖL|Karayla çevrili durgun su|Van ya da Tuz
GÖZ|Görme organı|Hem bakar hem ağlar
HAL|Durum, vaziyet|Sebze ve meyvenin toptan satıldığı yer
HAN|Eski konaklama yapısı|Kervanların gecelediği yapı
HAK|Adalet, doğruluk|Hukukun korumaya çalıştığı
HAZ|Zevk, keyif|Lezzet alma duygusu
İKİ|Birden sonra gelen sayı|Bir çiftte kaç tane var?
KAR|Kışın gökten düşen beyaz tanecikler|Kayak yapılan beyaz örtü
KAŞ|Gözün üstündeki kıllar|Yapayım derken göz çıkarılan
KİL|Çömlek yapılan toprak|Seramiğin ham maddesi
KOL|Omuzdan ele uzanan organ|Gömleğin kısa ya da uzun olabilen parçası
KUŞ|Kanatlı, tüylü hayvan|Serçe de kartal da
KÜP|Altı yüzlü cisim|Sayının üçüncü kuvveti
KUM|Plajdaki ince taneler|Çölü kaplayan
KIŞ|Soğuk mevsim|Kar yağan mevsim
KEK|Fırında pişen hamur tatlısı|Çayın yanında dilimlenen
KOY|Küçük körfez|Denizin karaya sokulduğu girinti
MUZ|Sarı kabuklu uzun meyve|Maymunların sevdiği meyve
MUM|Fitilli aydınlatma aracı|Elektrik kesilince yakılan
MİL|Uzunluk ölçüsü|Denizcilerin mesafe birimi
NAR|Kırmızı taneli meyve|Ekşisi salataya tat verir
NOT|Kısa yazı|Karnede ders başına verilen
OYA|İğneyle yapılan süs|Yazmanın kenarına işlenen incelik
PUL|Mektuba yapıştırılır|Balığın üstünü kaplayan
RUH|Can, tin|Bedenin karşıtı
SAZ|Bağlama|Âşıkların telli çalgısı
SES|Seda|Kulağın duyduğu
SÜT|İneğin verdiği içecek|Beyaz ve besleyici içecek
SIR|Gizli şey|Kimseye söylenmeyen
SAÇ|Başta uzayan kıllar|Kuaförde kesilen
SAL|Tahtadan basit taşıt|Kütüklerden yapılan su taşıtı
ŞAL|Omuza atılan örtü|Geniş atkı
TAÇ|Kralın başındaki|Kraliçenin başındaki süs
TAT|Lezzet|Dilin algıladığı
TEL|İnce metal şerit|Gitarın ses çıkaran parçası
TUZ|Yemeğe atılan beyaz taneler|Denizden de elde edilen lezzet verici
TÜY|Kuşun üstünü kaplayan|Yastığın içine konan hafif şey
YAZ|Sıcak mevsim|Haziranla başlayan mevsim
YOL|Gidilen güzergâh|Asfaltı da patikası da olan
YÜZ|Surat, çehre|Doksan dokuzdan sonra gelen sayı
ZİL|Kapıdaki ses düğmesi|Okulda teneffüsü haber veren
ZAR|Tavlada atılan küp|Altı yüzlü, noktalı küp
ÇİĞ|Pişmemiş|Sabah otların üstündeki su damlaları
BOŞ|Dolu olmayan|İçi hâlî
ÇİT|Bahçe sınırındaki engel|Bahçeyi çeviren alçak tahta
FİL|Hortumlu hayvan|En büyük kara hayvanı
BUZ|Donmuş su|Soğuk içeceğe atılan küp
SİS|Pus|Görüşü kapatan hava olayı
ÇAĞ|Devir|Taş, Tunç ya da Demir
YIL|Sene|On iki aylık süre
GÜÇ|Kuvvet|Zor, çetin
HIZ|Sürat|Kilometre saatle ölçülen
MOR|Menekşe rengi|Kırmızı ile mavinin karışımı
GRİ|Kül rengi|Siyah ile beyazın arası
ALTI|Beşten sonraki sayı|Zarın en büyük sayısı
BEŞ|Dörtten sonraki sayı|Bir eldeki parmak sayısı
BİN|On kere yüz|Dokuz yüz doksan dokuzdan sonra
ELLİ|Yarım yüz|Beş kere on
YEDİ|Haftadaki gün sayısı|Gökkuşağındaki renk sayısı
SEKİZ|Ahtapotun kol sayısı|Yediden sonra gelen
DOKUZ|Sekizden sonraki sayı|Kedinin canı kaç tane?
KIRK|Otuz dokuzdan sonraki sayı|Bir fincan kahvenin hatırı kaç yıl?
VAN|Kedisiyle ünlü şehir|Akdamar Adası'nın gölüne adını veren il
RİZE|Çay şehri|Karadeniz'de yeşil yaprak diyarı
ÇİN|Seddiyle ünlü ülke|Pekin'in ülkesi
DİŞ|Çiğnemeye yarayan|Süt olanı çocuklukta dökülür
ÇENE|Yüzün alt kısmı|Konuşkan kişinin düşük olduğu söylenen
ALIN|Kaşların üstü|Teri emeği anlatan yer
OMUZ|Kolun gövdeye bağlandığı yer|Yükün atıldığı yer
KALP|Yürek|Kan pompalayan organ
BEYİN|Düşünme organı|Kafatasının içindeki
KEMİK|İskeletin parçası|Köpeğin sevdiği
PARMAK|Elde beş tane|Yüzüğün takıldığı
TIRNAK|Parmak ucundaki sert tabaka|Ojeyle boyanan
DİRSEK|Kolun büküldüğü eklem|Masaya dayanan kol eklemi
BİLEK|Saatin takıldığı yer|El ile kolun birleştiği yer
BOYUN|Kolyenin takıldığı yer|Baş ile gövdeyi birleştiren
KULAK|İşitme organı|Küpenin takıldığı yer
DUDAK|Ağzın kenarları|Rujla boyanan
YANAK|Yüzün iki yanı|Utanınca kızaran
AYAK|Yürümeye yarayan organ|Pabucun giyildiği yer
BURUN|Koku alma organı|Yüzün ortasındaki çıkıntı
ANNE|Ana|Doğuran kadın
ATEŞ|Alev|Vücut ısısının yükselmesi
AYNA|Görüntüyü yansıtan cam|Kendimize baktığımız eşya
BORÇ|Ödenmesi gereken|Alacağın karşıtı
DEVE|Hörgüçlü hayvan|Çöl gemisi
DOST|Arkadaş|Kara günde belli olan
ELMA|Kırmızı ya da yeşil meyve|Newton'un başına düştüğü anlatılan
ERİK|Ekşi yaz meyvesi|Yeşili tuzla yenen meyve
ETEK|Kadın giysisi|Mini ya da uzun olan alt giysi
FARE|Kemirgen|Kedinin kovaladığı, bilgisayarı da yönetir
GECE|Karanlık vakit|Gündüzün karşıtı
GEMİ|Deniz taşıtı|Limana yanaşan büyük tekne
HALI|Yere serilen dokuma|Masallarda uçan olanı var
HAVA|Soluduğumuz|Gökyüzünün durumu
İNCİ|İstiridyenin içindeki|Kolyede dizilen beyaz tane
İPEK|Böcekten elde edilen kumaş|Bursa'nın ünlü kumaşı
KAPI|Giriş yeri|Anahtarla açılır
KEDİ|Miyavlayan hayvan|Pisi
KENT|Şehir|Büyük yerleşim yeri
LALE|Soğanlı bahar çiçeği|Bir devre adını veren çiçek
MASA|Üzerinde yemek yenen mobilya|Dört ayağı var ama yürümez
MAVİ|Gökyüzü rengi|Denizin rengi
NANE|Ferahlatıcı yeşil ot|Limonla kaynatılan yeşil yaprak
OKUL|Mektep|Öğretmen ile öğrencinin buluştuğu yer
OYUN|Eğlence etkinliği|Satranç da saklambaç da
ÖDÜL|Mükâfat|Başarının karşılığı
PARA|Nakit|Alışverişte verilen
PİDE|Yassı fırın ekmeği|Ramazan'da kuyruğu olan ekmek
RÜYA|Düş|Uykuda görülen
SAAT|Zamanı gösteren alet|Tik tak eder
SOBA|Isıtıcı|Odun ya da kömürle yanan ısıtıcı
ŞAKA|Latife|Güldürmek için yapılan takılma
ŞİİR|Nazım|Şairin eseri
TAHT|Hükümdarın koltuğu|Kralın oturduğu yer
TEPE|Küçük dağ|Doruk
UÇAK|Tayyare|Havada yolcu taşıyan
UMUT|Ümit|Asla kaybedilmemesi gereken
ÜZÜM|Salkımlı meyve|Pekmezi yapılan bağ meyvesi
VAZO|Çiçek konan kap|Çiçeklik
YAZI|Kaleme alınan metin|Paranın turanın öbür yüzü
ZEKİ|Akıllı|Kafası iyi çalışan
AKIL|Us|Zekânın kaynağı
BERE|Yumuşak şapka|Ressamların sevdiği başlık
DERE|Küçük akarsu|Irmaktan küçük su
EMEK|Zahmet, çaba|Alın teri
FİLM|Sinema eseri|Beyaz perdede izlenen
KAYA|Büyük taş|Sarp taş kütlesi
KUZU|Koyun yavrusu|Melemeyi yeni öğrenen yavru
LİRA|Türk para birimi|Yüz kuruşun karşılığı
ORAK|Ekin biçme aleti|Hilal biçimli tarım aleti
PERİ|Masal varlığı|Kanatlı küçük masal kızı
RENK|Kırmızı, mavi gibi|Gökkuşağında yedi tane olan
SEMA|Gökyüzü|Mevlevilerin dönerek yaptığı ayin
UZAY|Evren|Astronotların gittiği yer
YAKA|Gömleğin boyun kısmı|Kıyı, sahil
KALE|Surlu yapı|Futbolda gol atılan yer
KULE|Yüksek yapı|Galata ya da Kız
CAMİ|Namaz kılınan yer|Minareli ibadethane
KÖŞK|Bahçeli büyük ev|Bahçe içindeki zarif konut
KAMP|Çadırlı konaklama|Açık havada geceleme
MÜZE|Eserlerin sergilendiği yer|Topkapı da Ayasofya da
DERS|Okulda işlenen konu|Hayattan alınan
SORU|Sual|Cevabı aranan
ZARF|Mektup kılıfı|Pulu üstüne yapıştırılan
TREN|Raylı taşıt|Lokomotifin çektiği
KOŞU|Hızlı adımlarla ilerleme|Maraton da bir...
DOLU|Buz yağışı|Hem boşun karşıtı hem yağış
MART|Yılın üçüncü ayı|İlkbaharın ilk ayı
OCAK|Yılın ilk ayı|Hem ay hem mutfaktaki ateş yeri
SALI|Haftanın ikinci günü|Pazartesiden sonra gelen gün
CUMA|Haftanın beşinci günü|Perşembeden sonra gelen gün
MARS|Kızıl gezegen|Dünya'nın dış komşusu
KEÇİ|Boynuzlu, sakallı hayvan|Kayalara tırmanan inatçı hayvan
İNEK|Süt veren hayvan|Möö der
EŞEK|Uzun kulaklı binek|Anırır
KURT|Uluyan yırtıcı|Sürüden kuzu kapan yırtıcı
AŞÇI|Yemek yapan|Şef
ŞAİR|Ozan|Dizeleri yazan
SARI|Limon rengi|Altının rengi
NEŞE|Sevinç|Kahkahanın kaynağı
ÖFKE|Kızgınlık|Hiddet
ŞİFA|İyileşme|Hastaya dilenen
AĞIR|Hafifin karşıtı|Kilosu fazla
ASIR|Yüzyıl|Yüz yıllık süre
UYDU|Gezegen etrafında dönen|Ay, Dünya'nın doğal olanı
BOZA|Kışın içilen ekşimsi içecek|Leblebi serpilerek içilen
VADİ|İki dağ arası|Dağlar arasındaki çukur
ROMA|Kolezyum'un şehri|Yedi tepe üstüne kurulu İtalyan başkenti
KALEM|Yazı aracı|Kurşun ya da tükenmez olabilir
KİTAP|Okunan ciltli eser|Sayfaları olan bilgi kaynağı
MASAL|Peri ve devlerin anlatıldığı öykü|"Bir varmış bir yokmuş" diye başlar
GÜNEŞ|Gündüz ışık veren yıldız|Dünyanın etrafında döndüğü yıldız
DENİZ|Derya|Tuzlu büyük su
ÇİÇEK|Bitkinin renkli kısmı|Arının konduğu
SEVGİ|Muhabbet|Kalpten gelen yakınlık
HAYAT|Yaşam|Ömür
BULUT|Gökteki su buharı kümesi|Yağmuru getiren gri küme
KÖPEK|Havlayan hayvan|İnsanın en sadık dostu
BALIK|Solungaçla soluyan hayvan|Hamsi de levrek de
ÇOCUK|Küçük insan|Bayramda harçlık alan
ARABA|Otomobil|Dört tekerli taşıt
DÜNYA|Yaşadığımız gezegen|Güneş'e üçüncü gezegen
GÜZEL|Hoş, alımlı|Çirkinin karşıtı
MUTLU|Sevinçli|Mesut
ELMAS|Değerli parlak taş|Karbonun en sert hâli
ŞEKER|Tatlandırıcı|Pancardan elde edilir
ÇANTA|Eşya taşınan kap|Omza ya da ele alınan kap
KAHVE|Telveli içecek|Fincanda içilir, falı bakılır
LİMON|Ekşi sarı meyve|Ekşiliğiyle bilinen turunçgil
ZAMAN|Vakit|Saatin ölçtüğü
TATLI|Şekerli yiyecek|Yemekten sonra yenen
MELEK|Kanatlı iyi varlık|Çok iyi kalpli kişiye de denir
ÖZLEM|Hasret|Uzaktakine duyulan
RESİM|Tablo|Fırçayla yapılan
HAYAL|Düş|Kurulan ama henüz gerçek olmayan
ÇİLEK|Kırmızı küçük meyve|Pastanın süsü, ilkbahar meyvesi
KİRAZ|Çift çift sallanan meyve|Mayısta olgunlaşan kırmızı meyve
ARMUT|Ayvaya benzeyen meyve|Sapının dibi şişkin sulu meyve
ÇORBA|Kaşıkla içilen yemek|Mercimek ya da ezogelin
PİLAV|Pirinç yemeği|Tavuklu ya da nohutlu olabilir
SAHİL|Kıyı|Deniz kenarı
YAZAR|Kitap yazan kişi|Muharrir
BAHAR|Çiçeklerin açtığı mevsim|Kışla yaz arasındaki mevsim
SABAH|Günün ilk vakti|Gece bitince başlayan
AKŞAM|Güneşin battığı vakit|Günün sonu
HAFTA|Yedi gün|Pazartesi başlar pazar biter
MÜZİK|Musiki|Kulakla dinlenen sanat
ŞARKI|Söylenen ezgi|Nakaratı olan
SANAT|Güzel eser yaratma|Resim, müzik, heykel
GİTAR|Telli çalgı|Altı telli çalgı
KOLYE|Boyna takılan takı|Gerdanlık
YÜZÜK|Parmağa takılan takı|Nişanda takılan
GÖLGE|Işığın engellendiği yer|Sabah uzun, öğlen kısa olan
DALGA|Suyun kabarması|Sörfçüyü taşıyan hareket
ORMAN|Ağaçlık alan|Koru
NEHİR|Irmak|Denize dökülen akarsu
KAYIK|Küçük tekne|Kürekle yürür
BEBEK|Yeni doğmuş|Oyuncak olanı da var
PERDE|Pencereyi örten kumaş|Tiyatroda açılıp kapanan
SOFRA|Yemek masası|Yemek için kurulan
TABAK|Yemek konan kap|Porselen kap
KAŞIK|Çorba içilen araç|Çatalın yanında
ÇATAL|Yemek aracı|Üç ya da dört dişli
GURUR|Onur|Kibir değil, özsaygı
SABIR|Tahammül|Sonu selamet olan
HUZUR|Rahatlık|Dinginlik
KEYİF|Zevk|Neşe, hoşnutluk
SEVDA|Aşk|Karadeniz türkülerinin kara olanı
GÖNÜL|Kalp|Yürek
YILAN|Sürüngen|Tıslayan, ayaksız hayvan
TİLKİ|Kurnaz hayvan|Kırmızı kuyruklu
ASLAN|Ormanlar kralı|Yeleli hayvan
ZEBRA|Çizgili at|Siyah beyaz çizgili
PANDA|Bambu yiyen ayı|Siyah beyaz ayı
KUZEY|Şimal|Pusulanın gösterdiği yön
GÜNEY|Cenup|Kuzeyin karşıtı
ŞÖLEN|Ziyafet|Büyük yemekli toplantı
DÜĞÜN|Evlenme töreni|Gelin ile damadın günü
SAKİN|Durgun|Heyecansız
TEPSİ|Düz kap|Baklava pişirilen
KUMRU|Güvercine benzer kuş|İzmir'in ünlü sandviçi
KARGA|Siyah kuş|Gaklayan
SERÇE|Küçük kuş|Çatılarda cıvıldayan
TAVUK|Kümes hayvanı|Yumurtlayan
BİBER|Acı ya da tatlı sebze|Dolması yapılır
CEVİZ|Sert kabuklu yemiş|Beyne benzeyen
SABUN|Temizlik maddesi|Köpüren
ALTIN|Sarı değerli maden|Kuyumcuda satılan
ŞEHİR|Kent|Büyük yerleşim
TARLA|Ekin alanı|Tarım yapılan toprak
SİNEK|Vızıldayan böcek|Tavana konan uçucu
BAHÇE|Çiçek ekilen alan|Evin önündeki yeşil yer
SİMİT|Susamlı halka|Çayla yenen susamlı hamur
BARIŞ|Sulh|Savaşın karşıtı
SAVAŞ|Harp|Barışın karşıtı
KARAR|Hüküm|Verilen son söz
PASTA|Doğum günü tatlısı|Mumların dikildiği tatlı
ADRES|Bir yerin tarifi|Zarfa yazılan konum
KÖPRÜ|İki yakayı bağlar|Boğaz'da birkaç tane var
KİRPİ|Dikenli hayvan|Top gibi büzülen dikenli
HAVUÇ|Turuncu sebze|Tavşanın sevdiği
TÜRKÜ|Halk şarkısı|Anadolu'nun ezgisi
KAVUN|Sarı yaz meyvesi|Kışlığı da olan tatlı meyve
MANTI|Kayseri yemeği|Yoğurtla yenen küçük hamur
BÖREK|Yufka yemeği|Su ya da sigara olur
LOKUM|Yumuşak şekerleme|Bayramda ikram edilen
DUYGU|His|Kalpten gelen
DOLAP|Eşya saklanan mobilya|Gardırop
ZAFER|Yengi|Galibiyet
YARIŞ|Müsabaka|Birinci olmaya çalışılan
ÖRNEK|Misal|Model
CEVAP|Yanıt|Sorunun karşılığı
ÇARŞI|Pazar yeri|Kapalı olanı İstanbul'da
DERGİ|Mecmua|Aylık ya da haftalık yayın
ROMAN|Uzun anlatı|Yazarın uzun eseri
PİLOT|Tayyareci|Uçağı kullanan
ASKER|Er|Vatan nöbeti tutan
POLİS|Emniyet görevlisi|Karakolda çalışan
TERZİ|Elbise diken|Makasla kumaşı biçen
FIRIN|Ekmek pişen yer|Hem dükkan hem mutfak aleti
KÖYLÜ|Köyde yaşayan|Kentlinin karşıtı
SARAY|Padişahın evi|Dolmabahçe ya da Topkapı
KONAK|Büyük ev|Paşaların oturduğu yapı
ÇADIR|Kamp barınağı|Bezden taşınabilir ev
TATİL|Dinlenme zamanı|Okullar kapanınca başlayan
BÖCEK|Küçük eklembacaklı|Haşere
MARTI|Deniz kuşu|Vapurun peşindeki simit avcısı
KOYUN|Yünlü hayvan|Kuzunun annesi
HOROZ|Sabah öten kümes hayvanı|Tavuğun eşi
ÖRDEK|Vakvaklayan|Gölde yüzen paytak kuş
YUNUS|Deniz memelisi|Zeki ve oyuncu deniz hayvanı
ŞAHİN|Yırtıcı kuş|Doğangillerden avcı kuş
FİDAN|Genç ağaç|Dikilen körpe ağaç
SÖĞÜT|Dalları sarkan ağaç|Salkım olanı su kenarında
ÇINAR|Ulu gölge ağacı|Asırlık olanı meydanları süsler
İNCİR|Tatlı yaz meyvesi|Aydın'ın meşhur meyvesi
NOHUT|Baklagil|Humusun ham maddesi
KABAK|Sebze|Tatlısı da yapılan sebze
SOĞAN|Göz yaşartan sebze|Kuru ya da taze olan yumru
KÖFTE|Kıymadan yapılan|İnegöl ya da Tekirdağ usulü
AYRAN|Yoğurtlu içecek|Kebabın yanına içilen
HELVA|Tahinden yapılan tatlı|İrmikle de yapılır
REÇEL|Meyve ile şeker|Kahvaltıda ekmeğe sürülen
EKMEK|Fırında pişen temel gıda|Somunu da bazlaması da olan
KEBAP|Şişte pişen et|Adana ya da Urfa usulü
DÖNER|Dikey şişte pişen et|Dürümü yapılan et
SALEP|Kışın sıcak içecek|Tarçın serpilen sütlü içecek
AŞURE|Kırk malzemeli tatlı|Muharrem'de pişirilen
YAYLA|Dağdaki serin otlak|Karadeniz'de yazın çıkılan yer
BALON|Şişirilen oyuncak|Doğum gününde patlatılan
TAVLA|Zarla oynanan oyun|Şeşbeş atılan oyun
YÜZME|Suda ilerleme|Kulaç atılan spor
GÜREŞ|Er meydanı sporu|Kırkpınar'da yapılan
ROKET|Uzaya giden araç|Füze
HEDİYE|Armağan|Doğum gününde verilen
HÜZÜN|Keder|Sonbaharın duygusu
KORKU|Endişe|Cesaretin karşıtı
MERAK|Bilme isteği|Kediyi öldürdüğü söylenen
KİBAR|Nazik|İnce davranışlı
CİMRİ|Eli sıkı|Cömertin karşıtı
YALAN|Uydurma söz|Mumu yatsıya kadar yanan
HAFİF|Ağırın karşıtı|Tüy gibi
SICAK|Soğuğun karşıtı|Yazın havası
SOĞUK|Sıcağın karşıtı|Kışın havası
BEYAZ|Ak|Karın rengi
SİYAH|Kara|Gecenin rengi
PEMBE|Açık kırmızı|Pamuk şekerin rengi
YEŞİL|Çimen rengi|Doğanın rengi
VENÜS|Çoban Yıldızı|Sabah ve akşam parlayan gezegen
NİSAN|Yılın dördüncü ayı|Çocuk Bayramı'nın ayı
MAYIS|Yılın beşinci ayı|Gençlik ve Spor Bayramı'nın ayı
EYLÜL|Yılın dokuzuncu ayı|Okulların açıldığı ay
KASIM|Yılın on birinci ayı|Sonbaharın son ayı
ŞUBAT|Yılın en kısa ayı|Yılın ikinci ayı
PAZAR|Haftanın son günü|Hem gün hem alışveriş yeri
POSTA|Mektup gönderme hizmeti|Mektubu kapıya getiren hizmet
KAĞIT|Yazı yazılan yaprak|Ağaçtan üretilen beyaz yaprak
SİLGİ|Kurşun kalem izini yok eden|Kalemin arkasındaki lastik
İZMİR|Ege'nin incisi|Kordon'u olan şehir
BURSA|Yeşil şehir|Uludağ'ın eteğindeki şehir
KONYA|Mevlana'nın şehri|Etli ekmeğiyle ünlü il
ADANA|Kebabıyla ünlü şehir|Seyhan'ın kıyısındaki il
SİNOP|Türkiye'nin en kuzey ili|Karadeniz'in doğal limanlı şehri
PARİS|Işıklar şehri|Eyfel'in bulunduğu başkent
ATİNA|Akropolis'in şehri|Yunanistan'ın başkenti
MISIR|Piramitlerin ülkesi|Hem ülke hem tahıl
DEPREM|Zelzele|Fay hattının kırılması
YAĞMUR|Gökten düşen su|Şemsiye açtıran
YILDIZ|Gece parlayan gök cismi|Kayanı dilek tutturur
TOPRAK|Yer, arz|Ekin ekilen
GÖZLÜK|Gözün önüne takılan|Güneşe karşı takılan camlar
DOKTOR|Hekim|Hastayı iyileştiren
MEKTUP|Name|Zarfla gönderilir
BALKON|Taraça|Evin dışa çıkıntı yapan yeri
DOLMUŞ|Kısa mesafe minibüsü|Dolunca kalkan araç
TAKVİM|Günleri gösteren|Yaprak yaprak koparılan
KAPLAN|Çizgili büyük kedi|Bengal'in yırtıcısı
SİNCAP|Fındık toplayan kemirgen|Ağaçtan ağaca zıplayan
KARPUZ|Kırmızı içli iri meyve|Yazın peynirle yenen
FINDIK|Karadeniz yemişi|Giresun'un ürünü
YASTIK|Başın konduğu|Uykunun arkadaşı
YORGAN|Kalın örtü|Kışın üstümüze örttüğümüz
MACERA|Serüven|Heyecanlı olay
SİNEMA|Film izlenen yer|Beyaz perde
KONSER|Müzik dinletisi|Sahnede canlı müzik
GAZETE|Günlük yayın|Bulmacası da olan yayın
HİKAYE|Öykü|Anlatı
RESSAM|Resim yapan|Fırça ustası
KAPTAN|Gemiyi yöneten|Takımın lideri
BERBER|Saç kesen|Tıraş eden usta
BAKKAL|Mahalle dükkanı|Veresiye defteri olan
ÇİFTÇİ|Rençper|Toprağı işleyen
ECZANE|İlaç satılan yer|Nöbetçisi gece de açık olan
BAYRAM|Kutlama günü|Şekeri ve kurbanı olan
TAVŞAN|Uzun kulaklı hayvan|Kaplumbağayla yarışan
BAYKUŞ|Gece kuşu|Gece öten iri gözlü kuş
LEYLEK|Uzun bacaklı göçmen kuş|Bebek getirdiğine inanılan
BALİNA|En büyük memeli|Okyanusun devi
KARTAL|Yırtıcı kuş|Kuşların kralı
NERGİS|Kokulu kış çiçeği|Adını kendine hayran bir efsaneden alan çiçek
ZAMBAK|Beyaz çiçek|Masumiyetin simgesi beyaz çiçek
SÜMBÜL|Kokulu bahar çiçeği|Salkım çiçekli soğanlı bitki
ORKİDE|Tropikal süs çiçeği|Kökünden salep elde edilen çiçek ailesi
KAKTÜS|Dikenli bitki|Az su isteyen çöl bitkisi
YAPRAK|Ağacın yeşil kısmı|Sonbaharda dökülen
ZEYTİN|Yağı çıkarılan meyve|Kahvaltıda siyah ya da yeşil
KAYISI|Turuncu meyve|Malatya'nın meyvesi
ANANAS|Tropikal meyve|Taç gibi yapraklı meyve
PEYNİR|Sütten yapılan|Beyazı da kaşarı da olan
YOĞURT|Mayalanmış süt|Ayranın ham maddesi
SÜTLAÇ|Pirinçli tatlı|Fırında üstü kızartılan tatlı
KÜNEFE|Peynirli kadayıf tatlısı|Hatay'ın sıcak tatlısı
ŞELALE|Çağlayan|Yüksekten dökülen su
MAĞARA|İn|Yarasaların yuvası
VOLKAN|Yanardağ|Lav püskürten dağ
KANYON|Derin vadi|Irmağın oyduğu dar vadi
DEFTER|Not yazılan sayfalar|Çizgili ya da kareli olan
CETVEL|Düz çizgi çizme aracı|Santimetreli okul aracı
PERGEL|Daire çizme aracı|İki bacaklı geometri aleti
HARİTA|Kroki|Atlasın sayfası
PUSULA|Yön bulma aracı|İbresi kuzeyi gösteren
DÜRBÜN|Uzağı yakınlaştıran|Çift mercekli gözlem aleti
DOMİNO|Taşlarla oynanan oyun|Noktalı taşların oyunu
FUTBOL|Top oyunu|On bir kişilik takım oyunu
OTOBÜS|Toplu taşıma aracı|Durakta beklenen
ADALET|Hakkaniyet|Terazi simgeli değer
CÖMERT|Eli açık|Cimrinin karşıtı
TEMBEL|Üşengeç|Çalışkanın karşıtı
DÜRÜST|Doğru sözlü|Yalan söylemeyen
GERÇEK|Hakikat|Yalanın karşıtı
SAĞLIK|Sıhhat|Hastalığın karşıtı
HAYRET|Şaşkınlık|Şaşırma hâli
HEYKEL|Yontu|Taştan oyulan sanat eseri
SANİYE|Dakikanın altmışta biri|Saatin en kısa birimi
DAKİKA|Altmış saniye|Saatin altmışta biri
MEVSİM|Yılın dörtte biri|İlkbahar, yaz, güz ya da kış
TEMMUZ|Yılın yedinci ayı|Yazın en sıcak ayı
ARALIK|Yılın son ayı|Hem ay hem iki şey arasındaki boşluk
SATÜRN|Halkalı gezegen|Güneş'e altıncı gezegen
ANKARA|Başkentimiz|Anıtkabir'in şehri
EDİRNE|Selimiye'nin şehri|Tava ciğeriyle ünlü il
MARDİN|Taş evleriyle ünlü şehir|Mezopotamya'ya bakan tarihi il
LONDRA|İngiltere'nin başkenti|Big Ben'in şehri
KAHİRE|Mısır'ın başkenti|Nil kıyısındaki büyük başkent
FRANSA|Eyfel'in ülkesi|Başkenti Paris olan ülke
İTALYA|Çizme biçimli ülke|Pizzanın anavatanı
YÜZÜCÜ|Havuzda yarışan sporcu|Kulaç atan sporcu
KAYNAK|Pınar|Suyun çıktığı yer
KAHRAMAN|Yiğit|Masalın ejderhayı yenen kişisi
ANAHTAR|Kilidi açan|Kapının dostu
PENCERE|Işık alan açıklık|Camlı açıklık
ŞEMSİYE|Yağmurda açılan|Güneşliği de olan
TELEFON|Uzaktan konuşma aracı|Cebimizdeki akıllı alet
TİYATRO|Sahne sanatı|Perdesi açılan sanat
HASTANE|Şifahane|Doktorların çalıştığı yer
KUYUMCU|Takı satan|Altın ve pırlanta satıcısı
KELEBEK|Renkli kanatlı böcek|Tırtıldan dönüşen
ÖRÜMCEK|Ağ ören|Sekiz bacaklı
KARINCA|Çalışkan küçük böcek|Yuvada binlercesi yaşayan
PAPAĞAN|Konuşan kuş|Taklitçi renkli kuş
KANARYA|Sarı ötücü kuş|Kafeste öten sarı kuş
AHTAPOT|Sekiz kollu deniz hayvanı|Mürekkep püskürten
PAPATYA|Beyaz çiçek|Seviyor sevmiyor diye yaprakları koparılır
MENEKŞE|Mor çiçek|Gölgede açan küçük mor çiçek
ŞEFTALİ|Tüylü kabuklu meyve|Bursa'nın meşhur yaz meyvesi
PATATES|Kızartması yapılan yumru|Toprak elması
DOMATES|Kırmızı sebze|Salçası yapılan
FASULYE|Kuru ya da taze sebze|Kurusu pilavla yenen
ISPANAK|Yeşil yapraklı sebze|Demir deposu kış sebzesi
YUMURTA|Tavuğun verdiği|Omlet yapılan
GÖZLEME|Sacda pişen|Köy kahvaltısının hamur işi
BAKLAVA|Şerbetli tatlı|Gaziantep'in meşhur tatlısı
KADAYIF|Tel şeklinde hamur tatlısı|Künefenin hamuru
UÇURTMA|İpli uçan oyuncak|Rüzgarla göğe yükselen kağıt
SATRANÇ|Şah mat|Vezir ve piyonlu oyun
BİLMECE|Muamma|Cevabı düşünülerek bulunan soru
TEBEŞİR|Tahtaya yazılan|Kara tahtanın kalemi
GEZEGEN|Yıldız etrafında dönen gök cismi|Mars da Jüpiter de
FIRTINA|Bora|Şiddetli rüzgar ve yağış
RÜZGAR|Yel|Uçurtmayı uçuran
HAZİRAN|Yazın ilk ayı|Yılın altıncı ayı
AĞUSTOS|Yılın sekizinci ayı|Zafer Bayramı'nın ayı
TURUNCU|Portakal rengi|Kırmızıyla sarının karışımı
KIRMIZI|Al|Kan rengi
CESARET|Yiğitlik|Korkunun karşıtı
DOSTLUK|Arkadaşlık|Kara günde sınanan bağ
TRABZON|Sümela'nın şehri|Karadeniz'in liman kenti
ANTALYA|Turizm başkenti|Kaleiçi'nin şehri
JAPONYA|Güneşin doğduğu ülke|Başkenti Tokyo olan ülke
MOSKOVA|Rusya'nın başkenti|Kızıl Meydan'ın şehri
ÖĞRETMEN|Muallim|Sınıfın başındaki kişi
GÜVERCİN|Barış kuşu|Mektup taşıyan kuş
GELİNCİK|Kırmızı kır çiçeği|Tarlaları kızıla boyayan narin çiçek
KARANFİL|Yakaya takılan çiçek|Hem çiçek hem baharat
PORTAKAL|Turuncu meyve|Suyu sıkılan kış meyvesi
MERCİMEK|Kırmızı ya da yeşil baklagil|Çorbası meşhur bakliyat
PATLICAN|Mor sebze|Karnıyarık yapılan
SARIMSAK|Kokulu baharat|Cacıkta bulunan keskin yumru
MAYDANOZ|Yeşil ot|Lahmacuna konan yeşillik
TEREYAĞI|Sütten yapılan yağ|Kahvaltıda bala eşlik eden
DONDURMA|Soğuk tatlı|Maraş usulü olanı uzar
LAHMACUN|İnce kıymalı hamur|Maydanozla dürülen
SALINCAK|Parkta sallanılan|İple asılan oturak
KAYDIRAK|Parkta kayılan|Merdiveninden çıkılıp inilen
VOLEYBOL|File üstünden oynanan|Smaç yapılan oyun
BİSİKLET|İki tekerli pedallı taşıt|Zinciri ve pedalı olan
ÇARŞAMBA|Haftanın ortası|Salıdan sonra gelen gün
LACİVERT|Koyu mavi|Gece mavisi
KARANLIK|Işıksız|Gecenin hâli
AYDINLIK|Işıklı|Karanlığın karşıtı
ÇALIŞKAN|Gayretli|Tembelin karşıtı
YILDIRIM|Şimşek|Gökten inen elektrik
GÖKYÜZÜ|Sema|Bulutların yeri
GÖKKUŞAĞI|Yağmur sonrası renkli kuşak|Yedi renkli yay
SAKLAMBAÇ|Saklanma oyunu|Sobelenen çocuk oyunu
MANDALİNA|Kolay soyulan turunçgil|Portakalın küçük kardeşi
KÜTÜPHANE|Kitaplık|Kitapların ödünç alındığı yer
`;

const BANK = (() => {
  const seen = new Set();
  const out = [];
  BANK_RAW.split("\n").forEach(line => {
    const [w, a, b] = line.split("|").map(s => (s || "").trim());
    if (!w || !a || seen.has(w)) return;
    seen.add(w);
    out.push({ w, a, b: b || a, n: [...w].length });
  });
  return out;
})();

const LEVELS = [
  { name: "Kolay", size: 9, count: 8, min: 3, max: 6, hard: 0, base: 40 },
  { name: "Orta", size: 11, count: 12, min: 3, max: 7, hard: 0.4, base: 70 },
  { name: "Zor", size: 13, count: 16, min: 3, max: 8, hard: 0.75, base: 110 },
  { name: "Usta", size: 15, count: 21, min: 4, max: 9, hard: 1, base: 160 }
];
const UNLOCK_AT = 3;
const ALPHABET = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ";
const KB = ["ERTYUIOPĞÜ", "ASDFGHJKLŞİ", "ZCVBNMÖÇ"];
let pzSel = null;
let pzBad = new Set();
let pzWarned = false;

const ck = (r, c) => r + "," + c;
const lenOf = x => [...x.w].length;

function normalizePuzzle(p) {
  const src = p && typeof p === "object" ? p : {};
  const out = {
    unlocked: Math.min(Math.max(0, Number(src.unlocked) || 0), LEVELS.length - 1),
    pick: Number(src.pick) || 0,
    solved: Number(src.solved) || 0,
    points: Number(src.points) || 0,
    no: Number(src.no) || 0,
    byLevel: LEVELS.map((_, i) => Number(Array.isArray(src.byLevel) && src.byLevel[i]) || 0),
    recent: Array.isArray(src.recent) ? src.recent.filter(x => typeof x === "string").slice(0, 150) : [],
    cur: null
  };
  out.pick = Math.min(Math.max(0, out.pick), out.unlocked);
  const c = src.cur;
  if (c && Array.isArray(c.words) && c.words.length && c.rows > 0 && c.cols > 0 && c.words.every(x => x && typeof x.w === "string")) {
    out.cur = {
      lv: Math.min(Math.max(0, Number(c.lv) || 0), LEVELS.length - 1),
      no: Number(c.no) || out.no,
      rows: c.rows,
      cols: c.cols,
      words: c.words,
      fill: c.fill && typeof c.fill === "object" ? c.fill : {},
      shown: Array.isArray(c.shown) ? c.shown : [],
      penalty: Number(c.penalty) || 0,
      done: !!c.done,
      earned: Number(c.earned) || 0
    };
  }
  return out;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function tryBuild(size, count, pool) {
  const g = Array.from({ length: size }, () => Array(size).fill(""));
  const own = Array.from({ length: size }, () => Array(size).fill(0));
  const placed = [];
  const used = new Set();
  const at = (r, c) => (r >= 0 && c >= 0 && r < size && c < size ? g[r][c] : "");
  const fits = (ch, r, c, d) => {
    const dr = d, dc = 1 - d, L = ch.length;
    const er = r + dr * (L - 1), ec = c + dc * (L - 1);
    if (r < 0 || c < 0 || er >= size || ec >= size) return -1;
    if (at(r - dr, c - dc) || at(er + dr, ec + dc)) return -1;
    let cross = 0;
    for (let i = 0; i < L; i++) {
      const rr = r + dr * i, cc = c + dc * i, v = g[rr][cc];
      if (v) {
        if (v !== ch[i] || own[rr][cc] & (d ? 2 : 1)) return -1;
        cross++;
      } else if (at(rr + dc, cc + dr) || at(rr - dc, cc - dr)) {
        return -1;
      }
    }
    return cross;
  };
  const put = (e, ch, r, c, d) => {
    ch.forEach((x, i) => {
      const rr = r + d * i, cc = c + (1 - d) * i;
      g[rr][cc] = x;
      own[rr][cc] |= d ? 2 : 1;
    });
    placed.push({ e, r, c, d });
    used.add(e.w);
  };
  const mid = (size - 1) / 2;
  const first = pool.find(e => e.n >= 5) || pool[0];
  const fch = [...first.w];
  put(first, fch, Math.floor(size / 2), Math.floor((size - fch.length) / 2), 0);
  for (let pass = 0; pass < 2 && placed.length < count; pass++) {
    for (const e of pool) {
      if (placed.length >= count) break;
      if (used.has(e.w)) continue;
      const ch = [...e.w];
      let best = null;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const v = g[r][c];
          if (!v) continue;
          for (let i = 0; i < ch.length; i++) {
            if (ch[i] !== v) continue;
            for (const d of [0, 1]) {
              const sr = d ? r - i : r, sc = d ? c : c - i;
              const s = fits(ch, sr, sc, d);
              if (s < 1) continue;
              const cr = sr + (d * (ch.length - 1)) / 2, cc = sc + ((1 - d) * (ch.length - 1)) / 2;
              const score = s * 8 - (Math.abs(cr - mid) + Math.abs(cc - mid)) * 0.6 + Math.random() * 3;
              if (!best || score > best.score) best = { r: sr, c: sc, d, score };
            }
          }
        }
      }
      if (best) put(e, ch, best.r, best.c, best.d);
    }
  }
  return placed;
}

function buildPuzzle(lv) {
  const P = data.bulmaca;
  const cfg = LEVELS[lv];
  const k = P.byLevel[lv] || 0;
  const count = cfg.count + Math.min(4, Math.floor(k / 2));
  const hard = Math.min(1, cfg.hard + k * 0.05);
  const recent = new Set(P.recent);
  const fit = BANK.filter(e => e.n >= cfg.min && e.n <= cfg.max);
  let best = [];
  for (let t = 0; t < 12 && best.length < count; t++) {
    const pool = shuffle(fit.filter(e => !recent.has(e.w)))
      .concat(shuffle(fit.filter(e => recent.has(e.w))))
      .slice(0, 170);
    const got = tryBuild(cfg.size, count, pool);
    if (got.length > best.length) best = got;
  }
  let r0 = Infinity, c0 = Infinity, r1 = 0, c1 = 0;
  best.forEach(p => {
    const L = p.e.n;
    r0 = Math.min(r0, p.r);
    c0 = Math.min(c0, p.c);
    r1 = Math.max(r1, p.d ? p.r + L - 1 : p.r);
    c1 = Math.max(c1, p.d ? p.c : p.c + L - 1);
  });
  const words = best.map(p => ({
    w: p.e.w,
    r: p.r - r0,
    c: p.c - c0,
    d: p.d,
    q: Math.random() < hard ? p.e.b : p.e.a
  }));
  const starts = [...new Set(words.map(x => x.r * 1000 + x.c))].sort((a, b) => a - b);
  words.forEach(x => { x.n = starts.indexOf(x.r * 1000 + x.c) + 1; });
  P.no++;
  return { lv, no: P.no, rows: r1 - r0 + 1, cols: c1 - c0 + 1, words, fill: {}, shown: [], penalty: 0, done: false, earned: 0 };
}

function newPuzzle(lv) {
  const P = data.bulmaca;
  P.pick = lv;
  P.cur = buildPuzzle(lv);
  P.recent = [...P.cur.words.map(x => x.w), ...P.recent].slice(0, 150);
  pzSel = null;
  pzBad = new Set();
  pzWarned = false;
  saveLocal();
}

function cellsOf(x) {
  return [...x.w].map((_, i) => (x.d ? ck(x.r + i, x.c) : ck(x.r, x.c + i)));
}

function solMap(cur) {
  const m = {};
  cur.words.forEach(x => {
    const cells = cellsOf(x);
    [...x.w].forEach((ch, i) => { m[cells[i]] = ch; });
  });
  return m;
}

function wordAt(cur, r, c, d) {
  return cur.words.find(x => {
    if (x.d !== d) return false;
    const L = lenOf(x);
    return d ? x.c === c && r >= x.r && r < x.r + L : x.r === r && c >= x.c && c < x.c + L;
  });
}

function orderedWords(cur) {
  return [...cur.words].sort((a, b) => a.d - b.d || a.n - b.n);
}

function setSel(key, d) {
  const [r, c] = key.split(",").map(Number);
  pzSel = { r, c, d };
}

function selectWord(x) {
  const cur = data.bulmaca.cur;
  const keys = cellsOf(x);
  setSel(keys.find(k => !cur.fill[k]) || keys[0], x.d);
}

function bmJump(step, onlyOpen) {
  const cur = data.bulmaca.cur;
  const list = orderedWords(cur);
  const w = pzSel ? wordAt(cur, pzSel.r, pzSel.c, pzSel.d) : null;
  let i = w ? list.indexOf(w) : -1;
  for (let n = 0; n < list.length; n++) {
    i = (i + step + list.length) % list.length;
    if (!onlyOpen || cellsOf(list[i]).some(k => !cur.fill[k])) {
      selectWord(list[i]);
      return;
    }
  }
}

function bmType(ch) {
  const cur = data.bulmaca.cur;
  if (!cur || cur.done || !pzSel) return;
  const w = wordAt(cur, pzSel.r, pzSel.c, pzSel.d);
  if (!w) return;
  const keys = cellsOf(w);
  const shown = new Set(cur.shown);
  let i = keys.indexOf(ck(pzSel.r, pzSel.c));
  while (i < keys.length && shown.has(keys[i])) i++;
  if (i >= keys.length) {
    bmJump(1, true);
    renderWord();
    return;
  }
  cur.fill[keys[i]] = ch;
  pzBad.delete(keys[i]);
  let j = i + 1;
  while (j < keys.length && shown.has(keys[j])) j++;
  if (j < keys.length) setSel(keys[j], w.d);
  else if (keys.every(k => cur.fill[k])) bmJump(1, true);
  else setSel(keys[i], w.d);
  afterChange();
}

function bmBack() {
  const cur = data.bulmaca.cur;
  if (!cur || cur.done || !pzSel) return;
  const w = wordAt(cur, pzSel.r, pzSel.c, pzSel.d);
  if (!w) return;
  const keys = cellsOf(w);
  const shown = new Set(cur.shown);
  const i = keys.indexOf(ck(pzSel.r, pzSel.c));
  if (cur.fill[keys[i]] && !shown.has(keys[i])) {
    delete cur.fill[keys[i]];
    pzBad.delete(keys[i]);
  } else {
    let j = i - 1;
    while (j >= 0 && shown.has(keys[j])) j--;
    if (j >= 0) {
      delete cur.fill[keys[j]];
      pzBad.delete(keys[j]);
      setSel(keys[j], w.d);
    }
  }
  pzWarned = false;
  saveLocal();
  renderWord();
}

function bmArrow(key) {
  const cur = data.bulmaca.cur;
  const sol = solMap(cur);
  const dir = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }[key];
  if (!dir) return;
  const d = dir[0] ? 1 : 0;
  if (pzSel.d !== d && wordAt(cur, pzSel.r, pzSel.c, d)) {
    pzSel.d = d;
    renderWord();
    return;
  }
  let r = pzSel.r + dir[0], c = pzSel.c + dir[1];
  while (r >= 0 && c >= 0 && r < cur.rows && c < cur.cols) {
    if (sol[ck(r, c)]) {
      pzSel = { r, c, d: wordAt(cur, r, c, d) ? d : 1 - d };
      renderWord();
      return;
    }
    r += dir[0];
    c += dir[1];
  }
}

function bmFlip() {
  const cur = data.bulmaca.cur;
  if (wordAt(cur, pzSel.r, pzSel.c, 1 - pzSel.d)) pzSel.d = 1 - pzSel.d;
  renderWord();
}

function bmCell(key) {
  const cur = data.bulmaca.cur;
  if (!cur) return;
  const [r, c] = key.split(",").map(Number);
  if (pzSel && pzSel.r === r && pzSel.c === c) {
    bmFlip();
    return;
  }
  const d = pzSel ? pzSel.d : 0;
  pzSel = { r, c, d: wordAt(cur, r, c, d) ? d : 1 - d };
  renderWord();
}

function bmPickWord(i) {
  const cur = data.bulmaca.cur;
  const x = cur && cur.words[i];
  if (!x || cur.done) return;
  selectWord(x);
  renderWord();
  if (window.matchMedia("(max-width: 900px)").matches) {
    const main = document.querySelector(".bm-main");
    if (main) main.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function bmCheck() {
  const cur = data.bulmaca.cur;
  const sol = solMap(cur);
  pzBad = new Set(Object.keys(sol).filter(k => cur.fill[k] && cur.fill[k] !== sol[k]));
  renderWord();
  if (pzBad.size) toast(`${pzBad.size} yanlış harf kırmızıyla işaretlendi`);
  else toast("Şu ana kadar yazdıkların doğru");
}

function bmReveal(whole) {
  const cur = data.bulmaca.cur;
  if (!cur || cur.done || !pzSel) return;
  const w = wordAt(cur, pzSel.r, pzSel.c, pzSel.d);
  if (!w) return;
  const sol = solMap(cur);
  const here = ck(pzSel.r, pzSel.c);
  let keys;
  if (whole) keys = cellsOf(w);
  else if (cur.fill[here] !== sol[here]) keys = [here];
  else keys = cellsOf(w).filter(k => cur.fill[k] !== sol[k]).slice(0, 1);
  let n = 0;
  keys.forEach(k => {
    if (cur.fill[k] === sol[k]) return;
    cur.fill[k] = sol[k];
    if (!cur.shown.includes(k)) cur.shown.push(k);
    pzBad.delete(k);
    n++;
  });
  if (!n) {
    toast("Bu kelimedeki harfler zaten doğru");
    return;
  }
  cur.penalty += n * 4;
  toast(`${n} harf açıldı, puandan ${n * 4} düştü`);
  afterChange();
}

function afterChange() {
  const cur = data.bulmaca.cur;
  const sol = solMap(cur);
  const keys = Object.keys(sol);
  if (keys.every(k => cur.fill[k] === sol[k])) {
    finishPuzzle();
    return;
  }
  if (keys.every(k => cur.fill[k])) {
    if (!pzWarned) {
      pzWarned = true;
      toast("Tüm kareler dolu ama yanlış harf var. Kontrol et'e bas.");
    }
  } else {
    pzWarned = false;
  }
  saveLocal();
  renderWord();
}

function finishPuzzle() {
  const P = data.bulmaca;
  const cur = P.cur;
  const cfg = LEVELS[cur.lv];
  cur.done = true;
  pzBad = new Set();
  const pts = Math.max(10, cfg.base + cur.words.length * 2 - cur.penalty);
  cur.earned = pts;
  P.points += pts;
  P.solved++;
  P.byLevel[cur.lv]++;
  let msg = `Tebrikler, çözdün! +${pts} puan`;
  if (cur.lv === P.unlocked && P.unlocked < LEVELS.length - 1 && P.byLevel[cur.lv] >= UNLOCK_AT) {
    P.unlocked++;
    P.pick = P.unlocked;
    msg = `Yeni seviye açıldı: ${LEVELS[P.unlocked].name}!`;
  }
  save();
  renderWord();
  renderHome();
  toast(msg);
}

function bmLevel(lv) {
  const P = data.bulmaca;
  if (lv > P.unlocked) {
    toast("Bu seviye henüz kilitli");
    return;
  }
  if (P.cur && P.cur.lv === lv && !P.cur.done) {
    P.pick = lv;
    return;
  }
  newPuzzle(lv);
  renderWord();
}

function bmKey(k) {
  if (k === "DEL") bmBack();
  else if (k === "NEXT") {
    bmJump(1, false);
    renderWord();
  } else bmType(k);
}

function bmAction(a) {
  const P = data.bulmaca;
  if (a === "new") {
    newPuzzle(P.pick);
    renderWord();
    window.scrollTo(0, 0);
    return;
  }
  if (!P.cur || P.cur.done) return;
  if (a === "prev" || a === "next") {
    bmJump(a === "next" ? 1 : -1, false);
    renderWord();
  } else if (a === "check") bmCheck();
  else if (a === "letter") bmReveal(false);
  else if (a === "word") bmReveal(true);
}

function renderWord() {
  const P = data.bulmaca;
  if (!P.cur) newPuzzle(P.pick);
  const cur = P.cur;
  const sol = solMap(cur);
  const ordered = orderedWords(cur);
  if (!pzSel || !sol[ck(pzSel.r, pzSel.c)]) pzSel = { r: ordered[0].r, c: ordered[0].c, d: ordered[0].d };
  let aw = wordAt(cur, pzSel.r, pzSel.c, pzSel.d);
  if (!aw) {
    pzSel.d = 1 - pzSel.d;
    aw = wordAt(cur, pzSel.r, pzSel.c, pzSel.d);
  }
  const onSet = new Set(aw && !cur.done ? cellsOf(aw) : []);
  const here = cur.done ? "" : ck(pzSel.r, pzSel.c);
  const shown = new Set(cur.shown);
  const numAt = {};
  cur.words.forEach(x => { numAt[ck(x.r, x.c)] = x.n; });

  let cells = "";
  for (let r = 0; r < cur.rows; r++) {
    for (let c = 0; c < cur.cols; c++) {
      const k = ck(r, c);
      if (!sol[k]) {
        cells += '<span class="bm-x"></span>';
        continue;
      }
      const cls = ["bm-c"];
      if (onSet.has(k)) cls.push("on");
      if (k === here) cls.push("cur");
      if (pzBad.has(k)) cls.push("bad");
      if (shown.has(k)) cls.push("shown");
      if (cur.done) cls.push("ok");
      cells += `<button type="button" class="${cls.join(" ")}" data-bm-cell="${k}" aria-label="${r + 1}. satır, ${c + 1}. sütun${cur.fill[k] ? ", " + esc(cur.fill[k]) : ""}">${numAt[k] ? `<i>${numAt[k]}</i>` : ""}<b>${esc(cur.fill[k] || "")}</b></button>`;
    }
  }

  const clueList = d => ordered.filter(x => x.d === d).map(x => {
    const full = cellsOf(x).every(k => cur.fill[k]);
    const on = x === aw && !cur.done;
    return `<li><button type="button" class="bm-clue${on ? " on" : ""}${full ? " full" : ""}" data-bm-word="${cur.words.indexOf(x)}"><strong>${x.n}</strong><span>${esc(x.q)} <em>(${lenOf(x)})</em></span></button></li>`;
  }).join("");

  const chips = LEVELS.map((L, i) => {
    const locked = i > P.unlocked;
    return `<button type="button" class="chip" data-bm-lv="${i}" aria-pressed="${i === cur.lv}"${locked ? " disabled" : ""}>${locked ? "🔒 " : ""}${esc(L.name)}</button>`;
  }).join("");
  const info = P.unlocked < LEVELS.length - 1
    ? `${Math.max(1, UNLOCK_AT - P.byLevel[P.unlocked])} bulmaca daha çöz, ${LEVELS[P.unlocked + 1].name} açılsın`
    : "Tüm seviyeler açık, her bulmaca bir öncekinden biraz daha zor";

  const kb = KB.map((row, ri) =>
    `<div class="bm-kr">${ri === 2 ? '<button type="button" class="bm-k wide" data-bmkey="NEXT">Sonraki</button>' : ""}${[...row].map(l => `<button type="button" class="bm-k" data-bmkey="${l}">${l}</button>`).join("")}${ri === 2 ? '<button type="button" class="bm-k wide" data-bmkey="DEL" aria-label="Sil">⌫</button>' : ""}</div>`
  ).join("");

  const bar = cur.done
    ? `<div class="bm-bar is-done"><div class="bm-q"><strong>Bulmaca tamam!</strong>${cur.earned} puan kazandın.</div></div>`
    : `<div class="bm-bar">
        <button type="button" class="bm-arrow" data-bm="prev" aria-label="Önceki soru">‹</button>
        <div class="bm-q" aria-live="polite"><strong>${aw.n} ${aw.d ? "Aşağı" : "Sağa"}</strong>${esc(aw.q)} <em>(${lenOf(aw)})</em></div>
        <button type="button" class="bm-arrow" data-bm="next" aria-label="Sonraki soru">›</button>
      </div>`;

  const tools = cur.done
    ? `<div class="bm-done"><button type="button" class="btn primary" data-bm="new">Sonraki bulmaca</button></div>`
    : `<div class="bm-tools">
        <button type="button" class="btn small" data-bm="check">Kontrol et</button>
        <button type="button" class="btn small" data-bm="letter">Harf aç</button>
        <button type="button" class="btn small" data-bm="word">Kelimeyi aç</button>
      </div>
      <div class="bm-kb">${kb}</div>`;

  $("wordView").innerHTML = `
    <header class="view-head">
      <div class="view-title">
        <span class="view-icon" aria-hidden="true">${iconSvg("word")}</span>
        <div><h2>Bulmaca</h2><p class="view-sub">Bulmaca ${cur.no}, ${esc(LEVELS[cur.lv].name)}. Toplam ${P.solved} çözüldü, ${P.points} puan</p></div>
      </div>
      <div class="view-tools"><button class="btn primary" type="button" data-bm="new">Yeni bulmaca</button></div>
    </header>
    <div class="bm-levels" role="group" aria-label="Seviye">${chips}<span class="bm-info">${esc(info)}</span></div>
    <div class="bm">
      <div class="bm-main">
        ${bar}
        <div class="bm-board${cur.done ? " is-done" : ""}" style="--cols:${cur.cols}">${cells}</div>
        ${tools}
      </div>
      <aside class="bm-clues" aria-label="Sorular">
        <h4>Soldan sağa</h4>
        <ol>${clueList(0)}</ol>
        <h4>Yukarıdan aşağıya</h4>
        <ol>${clueList(1)}</ol>
      </aside>
    </div>`;
}

document.addEventListener("keydown", e => {
  if (active !== "word" || !$("login").hidden || document.querySelector("dialog[open]")) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
  const cur = data.bulmaca.cur;
  if (!cur || cur.done || !pzSel) return;
  const otherBtn = t && t.tagName === "BUTTON" && !t.hasAttribute("data-bm-cell");
  const k = e.key;
  if (k === "Backspace" || k === "Delete") {
    e.preventDefault();
    bmBack();
  } else if (k === "Enter") {
    if (otherBtn) return;
    e.preventDefault();
    bmJump(e.shiftKey ? -1 : 1, false);
    renderWord();
  } else if (k === " ") {
    if (otherBtn) return;
    e.preventDefault();
    bmFlip();
  } else if (k.startsWith("Arrow")) {
    e.preventDefault();
    bmArrow(k);
  } else if (k.length === 1) {
    const ch = k.toLocaleUpperCase("tr");
    if (ALPHABET.includes(ch)) {
      e.preventDefault();
      bmType(ch);
    }
  }
});

function saveLocal() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch {}
}

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
    if (cloud) localStorage.setItem(DIRTY_KEY, "1");
  } catch {
    toast("Kaydedilemedi. Tarayıcı depolaması dolu ya da kapalı olabilir.");
  }
  schedulePush();
}

function normalizeData(d) {
  const out = {};
  SECTIONS.forEach(sec => { out[sec] = Array.isArray(d && d[sec]) ? d[sec] : []; });
  out.bulmaca = normalizePuzzle(d && d.bulmaca);
  return out;
}

function hasContent(d) {
  return !!d && SECTIONS.some(sec => Array.isArray(d[sec]) && d[sec].length > 0);
}

function loadCloud() {
  try {
    const c = JSON.parse(localStorage.getItem(CLOUD_KEY) || "null");
    if (c && c.key && c.bin) return c;
  } catch {}
  return DEFAULT_KEY && DEFAULT_BIN ? { key: DEFAULT_KEY, bin: DEFAULT_BIN } : null;
}

function storeCloud(c) {
  cloud = c;
  try { localStorage.setItem(CLOUD_KEY, JSON.stringify(c)); } catch {}
}

function markClean() {
  try { localStorage.removeItem(DIRTY_KEY); } catch {}
}

function isDirty() {
  try { return localStorage.getItem(DIRTY_KEY) === "1"; } catch { return false; }
}

async function responseError(res) {
  let m = "";
  try { m = (await res.json()).message || ""; } catch {}
  if (res.status === 401) return new Error("API anahtarı hatalı.");
  if (res.status === 404) return new Error("Bin bulunamadı. Bin ID'yi kontrol et.");
  if (res.status === 403) return new Error(m || "İzin yok ya da istek hakkın doldu.");
  return new Error(m || `Sunucu hatası (${res.status}).`);
}

async function cloudRead(c) {
  const res = await fetch(`${API}/${encodeURIComponent(c.bin)}/latest`, {
    headers: { "X-Master-Key": c.key, "X-Bin-Meta": "false" }
  });
  if (!res.ok) throw await responseError(res);
  const j = await res.json();
  return j && j.record && j.metadata ? j.record : j;
}

async function cloudWrite(c, body, keepalive = false) {
  const res = await fetch(`${API}/${encodeURIComponent(c.bin)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Master-Key": c.key },
    body: JSON.stringify(body),
    keepalive
  });
  if (!res.ok) throw await responseError(res);
}

async function cloudCreate(key, body) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Master-Key": key, "X-Bin-Private": "true", "X-Bin-Name": "Bizee Özel" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw await responseError(res);
  const j = await res.json();
  const id = j && j.metadata && j.metadata.id;
  if (!id) throw new Error("Bin oluşturulamadı.");
  return id;
}

function schedulePush() {
  if (!cloud) return;
  pendingPush = true;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(pushNow, 1500);
}

async function pushNow() {
  if (!cloud || !pendingPush) return;
  if (pushing) {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushNow, 800);
    return;
  }
  pushing = true;
  pendingPush = false;
  try {
    await cloudWrite(cloud, data);
    markClean();
  } catch {
    pendingPush = true;
    toast("Buluta kaydedilemedi, kayıtların bu cihazda duruyor.");
  } finally {
    pushing = false;
  }
}

async function syncOnOpen() {
  if (!cloud && DEFAULT_KEY && !DEFAULT_BIN) {
    try {
      const id = await cloudCreate(DEFAULT_KEY, data);
      storeCloud({ key: DEFAULT_KEY, bin: id });
      markClean();
    } catch {
      toast("Buluta ulaşılamadı, kayıtların bu cihazda duruyor.");
    }
    return;
  }
  if (!cloud) return;
  if (isDirty() && hasContent(data)) {
    pendingPush = true;
    await pushNow();
    return;
  }
  try {
    const rec = await cloudRead(cloud);
    if (hasContent(rec)) {
      const localPz = data.bulmaca;
      data = normalizeData(rec);
      const remotePz = data.bulmaca;
      if (localPz && (localPz.solved > remotePz.solved || (localPz.solved === remotePz.solved && localPz.no >= remotePz.no))) {
        data.bulmaca = localPz;
      } else {
        pzSel = null;
        pzBad = new Set();
      }
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
      render();
    } else if (hasContent(data)) {
      pendingPush = true;
      await pushNow();
    }
  } catch {
    toast("Buluta ulaşılamadı, bu cihazdaki kayıtlar gösteriliyor.");
  }
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function lines(s) {
  return String(s || "").split("\n").map(x => x.trim()).filter(Boolean);
}

function safeUrl(u) {
  const v = String(u || "").trim();
  if (!v) return "";
  const withScheme = /^https?:\/\//i.test(v) ? v : "https://" + v;
  try {
    const url = new URL(withScheme);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function newId() {
  return window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function todayStr() { return ymd(new Date()); }

function formatDate(s) {
  const d = new Date(s + "T00:00:00");
  if (isNaN(d)) return "";
  return d.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function dateShort(ms) {
  return new Date(ms).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

function generatePassword(len = 16) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*?-_";
  const buf = new Uint32Array(len);
  crypto.getRandomValues(buf);
  let out = "";
  for (let i = 0; i < len; i++) out += chars[buf[i] % chars.length];
  return out;
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text || "");
    toast("Kopyalandı");
  } catch {
    toast("Kopyalanamadı. Metni elle seçip kopyala.");
  }
}

/* ---------- Şifreler kilidi ---------- */

function askLock() {
  return new Promise(resolve => {
    const d = $("lockBox");
    $("lockPw").value = "";
    $("lockErr").textContent = "";
    d.returnValue = "";
    d.addEventListener("close", () => resolve(d.returnValue === "ok"), { once: true });
    d.showModal();
    $("lockPw").focus();
  });
}

function relock() {
  accountsUnlocked = false;
  if (active === "accounts") openView("home", false);
}

/* ---------- Giriş ve tema ---------- */

async function hashPw(pw) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(PW_SALT), iterations: 200000, hash: "SHA-256" }, key, 256);
  return [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function showLogin() {
  pendingProfile = null;
  relock();
  $("loginPick").hidden = false;
  $("loginForm").hidden = true;
  $("loginPw").value = "";
  $("loginErr").textContent = "";
  $("login").hidden = false;
}

function pickProfile(p) {
  if (!PROFILES[p]) return;
  pendingProfile = p;
  $("loginPick").hidden = true;
  $("loginForm").hidden = false;
  $("loginWho").textContent = PROFILES[p];
  $("loginPw").value = "";
  $("loginErr").textContent = "";
  $("loginPw").focus();
}

async function submitLogin(e) {
  e.preventDefault();
  if (!pendingProfile) return;
  const err = $("loginErr");
  if (!(window.crypto && crypto.subtle)) {
    err.textContent = "Bu tarayıcıda şifre kontrolü çalışmıyor. Siteyi https ile aç.";
    return;
  }
  const btn = $("loginGo");
  btn.disabled = true;
  try {
    const h = await hashPw($("loginPw").value);
    if (h === PW_HASH[pendingProfile]) {
      failCount = 0;
      setProfile(pendingProfile);
    } else {
      failCount++;
      err.textContent = "Şifre yanlış.";
      $("loginPw").value = "";
      await new Promise(r => setTimeout(r, Math.min(failCount, 5) * 800));
    }
  } catch {
    err.textContent = "Şifre kontrol edilemedi.";
  } finally {
    btn.disabled = false;
  }
}

function setProfile(p) {
  if (!PROFILES[p]) p = "burcun";
  profile = p;
  document.documentElement.dataset.theme = p;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = p === "dodom" ? "#050810" : "#2B1720";
  relock();
  $("login").hidden = true;
  $("loginPw").value = "";
  render();
  window.scrollTo(0, 0);
}

/* ---------- Kart şablonları ---------- */

const editBtn = (sec, id) =>
  `<div class="item-actions"><button class="btn small" data-action="edit" data-sec="${sec}" data-id="${esc(id)}">Düzenle</button></div>`;

const tags = arr => {
  const html = arr.filter(Boolean).map(t => `<span class="tag">${esc(t)}</span>`).join("");
  return html ? `<div class="tags">${html}</div>` : "";
};

const extLink = (url, label = "Aç") => {
  const link = safeUrl(url);
  return link ? `<a class="ext" href="${esc(link)}" target="_blank" rel="noopener noreferrer">${label}</a>` : "";
};

const noteCard = (sec, n, extra = "") => `<article class="item note">
  <span class="item-title">${esc(n.title)}</span>
  <p class="note-date">${esc(dateShort(n.updated || n.created))}</p>
  ${extra}
  ${n.body ? `<p class="note-body">${esc(n.body)}</p>` : ""}
  ${editBtn(sec, n.id)}
</article>`;

const taskCard = (sec, x, sub = "") => `<article class="item task ${x.done ? "done" : ""}">
  <input type="checkbox" class="check" data-action="toggle" data-sec="${sec}" data-id="${esc(x.id)}" ${x.done ? "checked" : ""} aria-label="Tamamlandı olarak işaretle">
  <div><span class="item-title">${esc(x.title)}</span>${sub}</div>
  ${editBtn(sec, x.id)}
</article>`;

const noteLine = t => (t ? `<p class="film-note">${esc(t)}</p>` : "");

const templates = {
  accounts: a => `<article class="item account">
      <div class="item-head">
        <span class="item-title">${esc(a.title)}</span>
        ${extLink(a.url, "Siteyi aç")}
      </div>
      <div class="cred">
        <span class="cred-label">Mail</span>
        <div class="cred-line">
          <span class="cred-value">${a.email ? esc(a.email) : "—"}</span>
          ${a.email ? `<span class="row-btns"><button class="btn small ghost" data-action="copy" data-field="email" data-sec="accounts" data-id="${esc(a.id)}">Kopyala</button></span>` : ""}
        </div>
      </div>
      <div class="cred">
        <span class="cred-label">Şifre</span>
        <div class="cred-line">
          <span class="cred-value ${a.password ? "secret" : ""}">${a.password ? "••••••••" : "—"}</span>
          ${a.password ? `<span class="row-btns">
            <button class="btn small ghost" data-action="reveal" data-sec="accounts" data-id="${esc(a.id)}">Göster</button>
            <button class="btn small ghost" data-action="copy" data-field="password" data-sec="accounts" data-id="${esc(a.id)}">Kopyala</button>
          </span>` : ""}
        </div>
      </div>
      ${a.note ? `<p class="account-note">${esc(a.note)}</p>` : ""}
      ${editBtn("accounts", a.id)}
    </article>`,
  recipes: r => {
    const ing = lines(r.ingredients);
    const st = lines(r.steps);
    const meta = [r.category, r.time].filter(Boolean).map(m => `<span class="tag">${esc(m)}</span>`).join("");
    return `<details class="item recipe">
      <summary><span class="item-title">${esc(r.title)}</span>${meta}</summary>
      <div class="recipe-body">
        <div>${ing.length ? `<h4>Malzemeler</h4><ul>${ing.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}</div>
        <div>${st.length ? `<h4>Yapılışı</h4><ol>${st.map(i => `<li>${esc(i)}</li>`).join("")}</ol>` : ""}</div>
        ${editBtn("recipes", r.id)}
      </div>
    </details>`;
  },
  notes: n => noteCard("notes", n),
  ideas: n => noteCard("ideas", n, tags([n.category])),
  plans: p => {
    const late = p.date && !p.done && p.date < todayStr();
    const dateText = p.date ? formatDate(p.date) : "";
    return taskCard("plans", p,
      `${dateText ? `<span class="plan-date ${late ? "late" : ""}">${esc(dateText)}${late ? ", tarihi geçti" : ""}</span>` : ""}${p.detail ? `<p class="plan-detail">${esc(p.detail)}</p>` : ""}`);
  },
  growth: g => taskCard("growth", g,
    tags([g.kind, g.artist]) + (g.by ? `<p class="film-note">Öneren: ${esc(g.by)}</p>` : "") + noteLine(g.note) +
    (safeUrl(g.url) ? `<p class="film-note">${extLink(g.url, "Dinle")}</p>` : "")),
  wishlist: w => taskCard("wishlist", w, tags([w.priority, w.price]) + noteLine(w.note) + (safeUrl(w.url) ? `<p class="film-note">${extLink(w.url, "Bağlantıyı aç")}</p>` : "")),
  emails: e => `<article class="item email">
      <span class="item-title">${esc(e.title)}</span>
      <div class="cred">
        <div class="cred-line">
          <span class="cred-value">${e.address ? esc(e.address) : "—"}</span>
          ${e.address ? `<span class="row-btns"><button class="btn small ghost" data-action="copy" data-field="address" data-sec="emails" data-id="${esc(e.id)}">Kopyala</button></span>` : ""}
        </div>
      </div>
      ${e.note ? `<p class="account-note">${esc(e.note)}</p>` : ""}
      ${editBtn("emails", e.id)}
    </article>`,
  films: f => {
    const rating = Number(f.rating) || 0;
    const stars = [1, 2, 3, 4, 5].map(n =>
      `<button type="button" class="star ${n <= rating ? "on" : ""}" data-action="rate" data-val="${n}" data-sec="films" data-id="${esc(f.id)}" aria-label="${n} yıldız">★</button>`
    ).join("");
    return `<article class="item film ${f.watched ? "watched" : ""}">
      <span class="item-title">${esc(f.title)}</span>
      ${tags([f.kind, f.genre, f.platform])}
      ${f.by ? `<p class="film-note">Öneren: ${esc(f.by)}</p>` : ""}
      ${noteLine(f.note)}
      <div class="film-status">
        <label class="watch"><input type="checkbox" class="check" data-action="watch" data-sec="films" data-id="${esc(f.id)}" ${f.watched ? "checked" : ""}>İzledik</label>
        <span class="stars" role="group" aria-label="Puan">${stars}</span>
      </div>
      ${editBtn("films", f.id)}
    </article>`;
  },
  favorites: f => `<article class="item fav">
      <div class="item-head"><span class="item-title">${esc(f.title)}</span>${extLink(f.url)}</div>
      ${tags([f.kind])}
      ${noteLine(f.note)}
      ${editBtn("favorites", f.id)}
    </article>`,
  doodle: d => {
    const st = d.sale === "Satılık" ? "on" : d.sale === "Satıldı" ? "done" : "";
    return `<article class="item doodle ${st ? "sale-" + st : ""}">
      <span class="item-title">${esc(d.title)}</span>
      ${st ? tags([d.sale, st === "on" ? d.price : ""]) : ""}
      ${String(d.img || "").startsWith("data:image/") ? `<img class="doodle-img" src="${esc(d.img)}" alt="${esc(d.title)}">` : ""}
      ${noteLine(d.note)}
      ${editBtn("doodle", d.id)}
    </article>`;
  },
  mood: m => {
    const parts = String(m.mood || "").split(" ");
    const emoji = parts[0] || "";
    const label = parts.slice(1).join(" ");
    return `<article class="item mood">
      <div class="mood-head">
        <span class="mood-emoji" aria-hidden="true">${esc(emoji)}</span>
        <div><span class="item-title">${esc(m.title)}</span>${m.date ? `<span class="plan-date">${esc(formatDate(m.date))}${label ? ", " + esc(label) : ""}</span>` : ""}</div>
      </div>
      ${m.body ? `<p class="note-body">${esc(m.body)}</p>` : ""}
      ${m.gratitude ? `<p class="gratitude"><span>Güzel olan:</span> ${esc(m.gratitude)}</p>` : ""}
      ${editBtn("mood", m.id)}
    </article>`;
  }
};

const SKIP_KEYS = ["id", "password", "created", "updated", "done", "watched", "rating", "progress", "target", "doneAt", "img"];

function matches(item, q) {
  if (!q) return true;
  return Object.entries(item)
    .filter(([k]) => !SKIP_KEYS.includes(k))
    .map(([, v]) => v)
    .join(" ")
    .toLocaleLowerCase("tr")
    .includes(q);
}


function sorted(sec, items) {
  const list = [...items];
  const byTitle = (a, b) => String(a.title).localeCompare(String(b.title), "tr");
  const doneLast = (a, b) => (!!a.done !== !!b.done ? (a.done ? 1 : -1) : 0);
  const byDateDesc = (a, b) => (b.date || "").localeCompare(a.date || "") || (b.created || 0) - (a.created || 0);
  if (sec === "notes" || sec === "ideas" || sec === "doodle") return list.sort((a, b) => (b.updated || 0) - (a.updated || 0));
  if (sec === "mood") return list.sort(byDateDesc);
  if (sec === "growth") return list.sort((a, b) => doneLast(a, b) || byTitle(a, b));
  if (sec === "wishlist") {
    return list.sort((a, b) => doneLast(a, b) || PRIORITY.indexOf(a.priority) - PRIORITY.indexOf(b.priority) || byTitle(a, b));
  }
  if (sec === "plans") {
    return list.sort((a, b) => {
      if (!!a.done !== !!b.done) return a.done ? 1 : -1;
      if (a.done) return (b.updated || 0) - (a.updated || 0);
      if (a.date && b.date) return a.date.localeCompare(b.date) || byTitle(a, b);
      if (a.date || b.date) return a.date ? -1 : 1;
      return (a.created || 0) - (b.created || 0);
    });
  }
  if (sec === "films") {
    return list.sort((a, b) => (!!a.watched !== !!b.watched ? (a.watched ? 1 : -1) : byTitle(a, b)));
  }
  return list.sort(byTitle);
}

function openCountOf(sec) {
  const d = data[sec];
  if (["plans", "growth", "wishlist"].includes(sec)) return d.filter(x => !x.done).length;
  if (sec === "films") return d.filter(f => !f.watched).length;
  return d.length;
}

function subtitle(sec) {
  if (sec === "word") {
    const P = data.bulmaca;
    return P.solved ? `${P.solved} çözüldü, ${LEVELS[P.unlocked].name}` : "Hemen başla";
  }
  const total = data[sec].length;
  const open = openCountOf(sec);
  if (!total) return "Henüz boş";
  switch (sec) {
    case "accounts": return `${total} hesap`;
    case "recipes": return `${total} tarif`;
    case "notes": return `${total} not`;
    case "emails": return `${total} adres`;
    case "ideas": return `${total} fikir`;
    case "favorites": return `${total} favori`;
    case "doodle": {
      const n = data.doodle.filter(x => x.sale === "Satılık").length;
      return `${total} resim${n ? `, ${n} satılık` : ""}`;
    }
    case "mood": return `${total} gün`;
    case "plans": return open ? `${open} bekleyen plan` : "Hepsi tamam";
    case "growth": return open ? `${open} dinlenecek` : "Hepsi dinlendi";
    case "wishlist": return open ? `${open} istek` : "Hepsi tamam";
    case "films": return open ? `${open} izlenecek` : "Hepsi izlendi";
    default: return "";
  }
}

/* ---------- Görünümleri kur ---------- */

function buildNav() {
  $("nav").innerHTML = NAV.map(n =>
    `<button class="nav-item" type="button" data-open="${n.id}">${iconSvg(n.id)}<span>${esc(n.name)}</span></button>`
  ).join("");
}

function buildViews() {
  $("views").innerHTML = SECTIONS.map(sec => {
    const v = views[sec];
    const filters = sec === "films"
      ? `<div class="filters" id="filmFilters" role="group" aria-label="Filtre">
          <button type="button" class="chip" data-filter="all">Hepsi</button>
          <button type="button" class="chip" data-filter="todo">İzlenecekler</button>
          <button type="button" class="chip" data-filter="done">İzlediklerimiz</button>
        </div>`
      : "";
    const sfilters = sec === "doodle"
      ? `<div class="filters" id="saleFilters" role="group" aria-label="Filtre">
          <button type="button" class="chip" data-sfilter="all">Hepsi</button>
          <button type="button" class="chip" data-sfilter="Satılık">Satılık</button>
          <button type="button" class="chip" data-sfilter="Satıldı">Satıldı</button>
        </div>`
      : "";
    return `<section class="view" data-sec="${sec}" hidden>
      <header class="view-head">
        <div class="view-title">
          <span class="view-icon" aria-hidden="true">${iconSvg(sec)}</span>
          <div><h2>${esc(nameOf(sec))}</h2><p class="view-sub" id="s-${sec}"></p></div>
        </div>
        <div class="view-tools">
          <input type="search" data-search="${sec}" placeholder="Ara" aria-label="${esc(nameOf(sec))} içinde ara">
          <button class="btn primary" data-add="${sec}" type="button">${esc(v.add)}</button>
        </div>
      </header>
      ${filters}${sfilters}
      <div class="${STACKS.includes(sec) ? "stack" : "grid"}" id="list-${sec}"></div>
    </section>`;
  }).join("");
}

function renderSection(sec) {
  const q = searchQ[sec] || "";
  let pool = data[sec].filter(i => matches(i, q));
  if (sec === "films" && filmFilter !== "all") pool = pool.filter(f => (filmFilter === "done") === !!f.watched);
  if (sec === "doodle" && saleFilter !== "all") pool = pool.filter(x => x.sale === saleFilter);
  const items = sorted(sec, pool);
  $("s-" + sec).textContent = subtitle(sec);
  $("list-" + sec).innerHTML = items.length
    ? items.map(templates[sec]).join("")
    : `<p class="empty">${q ? "Aramanla eşleşen kayıt yok." : esc(views[sec].empty)}</p>`;
}

/* ---------- Ana sayfa ---------- */

function greeting() {
  const h = new Date().getHours();
  if (h < 6) return "İyi geceler";
  if (h < 12) return "Günaydın";
  if (h < 18) return "İyi günler";
  if (h < 22) return "İyi akşamlar";
  return "İyi geceler";
}

function quoteOf(shift) {
  const d = new Date();
  const day = Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 86400000);
  return QUOTES[(day + shift) % QUOTES.length];
}

function miniCard(sec) {
  const locked = sec === "accounts" && !accountsUnlocked;
  const rows = locked ? [] : sorted(sec, data[sec]).slice(0, 4).map(x => x.title);
  const list = locked
    ? `<p class="mini-empty">Şifre ile korunuyor.</p>`
    : rows.length
    ? `<ul class="mini-list">${rows.map(r => `<li>${esc(r)}</li>`).join("")}</ul>`
    : `<p class="mini-empty">${esc(views[sec].empty.split(".")[0])}.</p>`;
  return `<section class="card" data-tone="${sec}">
    <header class="card-head"><span class="card-icon">${iconSvg(sec)}</span><h3>${esc(nameOf(sec))}</h3><button class="icon-btn" type="button" data-add="${sec}" aria-label="${esc(views[sec].add)}">+</button></header>
    ${list}
    <button class="link-btn" type="button" data-open="${sec}">Tümünü gör →</button>
  </section>`;
}

function checkList(sec, items) {
  return `<ul class="check-list">${items.map(x => `<li><label class="check-row"><input type="checkbox" class="check" data-action="toggle" data-sec="${sec}" data-id="${esc(x.id)}"><span>${esc(x.title)}</span>${sec === "plans" && x.date && x.date < todayStr() ? `<em>gecikti</em>` : ""}</label></li>`).join("")}</ul>`;
}

function renderHome() {
  const today = todayStr();

  const todayMood = data.mood.find(m => m.date === today);
  const moodCard = `<section class="card" data-tone="mood">
    <header class="card-head"><span class="card-icon">${iconSvg("mood")}</span><h3>Bugün nasıl hissediyorsun?</h3></header>
    <div class="mood-pick">${MOODS.map(m => {
      const [emoji, ...rest] = m.split(" ");
      const label = rest.join(" ");
      return `<button type="button" class="mood-btn ${todayMood && todayMood.mood === m ? "on" : ""}" data-action="quickmood" data-val="${esc(m)}" title="${esc(label)}" aria-label="${esc(label)}">${emoji}</button>`;
    }).join("")}</div>
    <button class="link-btn" type="button" data-open="mood">Hissettiklerime git →</button>
  </section>`;

  const quoteCard = `<section class="card quote-card"><p class="script">${esc(quoteOf(3))}</p></section>`;

  const tiles = HOME_TILES.map(id => {
    const n = NAV.find(x => x.id === id);
    return `<button class="tile" type="button" data-tone="${id}" data-open="${id}">
      <span class="tile-icon">${iconSvg(id)}</span>
      <span class="tile-name">${esc(n.name)}</span>
      <span class="tile-hint">${esc(n.hint)}</span>
      <span class="tile-sub">${esc(subtitle(id))}</span>
    </button>`;
  }).join("");

  const solved = data.bulmaca.solved;
  $("home").innerHTML = `
    <div class="top-row">
      <div class="hero">
        <div>
          <h1>${greeting()} ${esc(PROFILES[profile])} <span class="heart" aria-hidden="true">♡</span></h1>
          <p class="hero-sub">Bugün harika şeyler başarabilirsin.</p>
        </div>
        <p class="hero-quote">${esc(quoteOf(0))}</p>
        <button class="hero-chip" type="button" data-open="word">Bulmaca${solved ? `: ${solved} çözüldü` : ""}</button>
      </div>
    </div>
    <div class="cards four">${["notes", "emails", "accounts", "recipes"].map(miniCard).join("")}</div>
    <div class="cards two">${moodCard}${quoteCard}</div>
    <h3 class="section-title">Daha fazlası için</h3>
    <div class="tiles">${tiles}</div>`;
}

function quickMood(val) {
  const now = Date.now();
  const day = todayStr();
  const m = data.mood.find(x => x.date === day);
  if (m) {
    m.mood = val;
    m.updated = now;
  } else {
    data.mood.push({ id: newId(), created: now, updated: now, title: "Günün ruh hali", date: day, mood: val, body: "", gratitude: "" });
  }
  save();
  render();
  toast("Günlüğüne eklendi");
}

/* ---------- Genel arama ---------- */

function renderSearch(q) {
  const hits = [];
  SECTIONS.forEach(sec => data[sec].forEach(i => { if (matches(i, q)) hits.push({ sec, i }); }));
  $("searchSub").textContent = hits.length ? `${hits.length} sonuç` : "Eşleşen kayıt yok";
  $("searchList").innerHTML = hits.slice(0, 40).map(h =>
    `<button type="button" class="hit" data-tone="${h.sec}" data-open="${h.sec}"><span class="hit-sec">${esc(nameOf(h.sec))}</span><span class="hit-title">${esc(h.i.title || "")}</span></button>`
  ).join("");
}

/* ---------- Gezinme ve çizim ---------- */

function openView(sec, fromUser) {
  if (sec !== "search" && !VIEW_IDS.includes(sec)) sec = "home";
  if (sec === "accounts" && !accountsUnlocked) {
    if (fromUser) askLock().then(ok => { if (ok) openView("accounts", true); });
    if (fromUser) return;
    sec = "home";
  }
  active = sec;
  if (sec !== "search") {
    try { localStorage.setItem(VIEW_KEY, sec); } catch {}
    if (fromUser) $("gsearch").value = "";
  }
  document.querySelectorAll(".view").forEach(v => { v.hidden = v.dataset.sec !== sec; });
  document.querySelectorAll("#nav .nav-item").forEach(t => t.setAttribute("aria-current", String(t.dataset.open === sec)));
  if (fromUser) {
    document.body.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }
}

function render() {
  SECTIONS.forEach(sec => renderSection(sec));
  renderWord();
  renderHome();
  document.querySelectorAll("#saleFilters .chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.sfilter === saleFilter)));
  document.querySelectorAll("#filmFilters .chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.filter === filmFilter)));
}

/* ---------- Resim yükleme ---------- */

let imgVal = "";

function setPreview() {
  const p = $("imgPrev");
  if (!p) return;
  const ok = String(imgVal).startsWith("data:image/");
  p.hidden = !ok;
  if (ok) p.src = imgVal;
  const rm = document.querySelector('[data-img="remove"]');
  if (rm) rm.hidden = !ok;
}

function loadImage(file) {
  if (!file || !file.type.startsWith("image/")) {
    toast("Lütfen bir resim seç.");
    return;
  }
  const rd = new FileReader();
  rd.onload = () => {
    const im = new Image();
    im.onload = () => {
      const k = Math.min(1, 700 / Math.max(im.width, im.height));
      const c = document.createElement("canvas");
      c.width = Math.round(im.width * k);
      c.height = Math.round(im.height * k);
      const x = c.getContext("2d");
      x.fillStyle = "#FFFFFF";
      x.fillRect(0, 0, c.width, c.height);
      x.drawImage(im, 0, 0, c.width, c.height);
      imgVal = c.toDataURL("image/jpeg", 0.72);
      setPreview();
    };
    im.onerror = () => toast("Resim açılamadı.");
    im.src = rd.result;
  };
  rd.readAsDataURL(file);
}

/* ---------- Düzenleyici ---------- */

function fieldHtml(f, value) {
  const id = "f-" + f.name;
  const hint = f.hint ? `<span class="hint">${esc(f.hint)}</span>` : "";
  const ph = f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : "";
  const req = f.required ? " required" : "";
  if (f.type === "textarea") {
    return `<label for="${id}">${esc(f.label)}</label>${hint}<textarea id="${id}" name="${f.name}" rows="${f.rows || 4}"${ph}>${esc(value)}</textarea>`;
  }
  if (f.type === "image") {
    return `<label for="imgFile">${esc(f.label)}</label><span class="hint">Telefondan ya da bilgisayardan bir resim seç.</span>
      <input id="imgFile" type="file" accept="image/*">
      <img id="imgPrev" class="doodle-img" alt="Seçilen resim" hidden>
      <div class="pad-tools"><button type="button" class="btn small danger" data-img="remove" hidden>Resmi kaldır</button></div>`;
  }
  if (f.type === "password") {
    return `<label for="${id}">${esc(f.label)}</label>
      <div class="pw">
        <input id="${id}" name="${f.name}" type="password" autocomplete="new-password" value="${esc(value)}">
        <button type="button" class="btn small ghost" data-pw="toggle">Göster</button>
        <button type="button" class="btn small ghost" data-pw="gen">Oluştur</button>
      </div>`;
  }
  if (f.type === "select") {
    const opts = f.options.map(o => `<option ${o === value ? "selected" : ""}>${esc(o)}</option>`).join("");
    return `<label for="${id}">${esc(f.label)}</label><select id="${id}" name="${f.name}">${opts}</select>`;
  }
  if (f.type === "number") {
    return `<label for="${id}">${esc(f.label)}</label><input id="${id}" name="${f.name}" type="number" min="1" max="100000" inputmode="numeric" value="${esc(value)}"${ph}>`;
  }
  const type = f.type === "date" ? "date" : "text";
  return `<label for="${id}">${esc(f.label)}</label>${hint}<input id="${id}" name="${f.name}" type="${type}" autocomplete="off" value="${esc(value)}"${ph}${req}>`;
}

function openEditor(sec, item, preset) {
  current = sec;
  editingId = item ? item.id : null;
  imgVal = "";
  $("editorTitle").textContent = item ? "Düzenle" : views[sec].add;
  $("fields").innerHTML = views[sec].fields.map(f => {
    let v = "";
    if (item) v = item[f.name] || "";
    else if (preset && preset[f.name]) v = preset[f.name];
    else if (f.default) v = f.default();
    return fieldHtml(f, v);
  }).join("");
  $("deleteBtn").hidden = !item;
  $("editor").showModal();
  const imgField = views[sec].fields.find(f => f.type === "image");
  if (imgField) {
    imgVal = item ? item[imgField.name] || "" : "";
    setPreview();
  }
  const first = $("fields").querySelector("input, textarea, select");
  if (first) first.focus();
}

/* ---------- Olaylar ---------- */

document.addEventListener("click", e => {
  const prof = e.target.closest("[data-profile]");
  if (prof) {
    pickProfile(prof.dataset.profile);
    return;
  }
  const cell = e.target.closest("[data-bm-cell]");
  if (cell) {
    bmCell(cell.dataset.bmCell);
    return;
  }
  const key = e.target.closest("[data-bmkey]");
  if (key) {
    bmKey(key.dataset.bmkey);
    return;
  }
  const clue = e.target.closest("[data-bm-word]");
  if (clue) {
    bmPickWord(Number(clue.dataset.bmWord));
    return;
  }
  const lv = e.target.closest("[data-bm-lv]");
  if (lv) {
    bmLevel(Number(lv.dataset.bmLv));
    return;
  }
  const bm = e.target.closest("[data-bm]");
  if (bm) {
    bmAction(bm.dataset.bm);
    return;
  }
  const open = e.target.closest("[data-open]");
  if (open) {
    openView(open.dataset.open, true);
    return;
  }
  const add = e.target.closest("[data-add]");
  if (add) {
    openEditor(add.dataset.add, null);
    return;
  }
  const sf = e.target.closest("[data-sfilter]");
  if (sf) {
    saleFilter = sf.dataset.sfilter;
    render();
    return;
  }
  const filter = e.target.closest("[data-filter]");
  if (filter) {
    filmFilter = filter.dataset.filter;
    render();
  }
});

document.addEventListener("input", e => {
  const inp = e.target.closest("[data-search]");
  if (!inp) return;
  searchQ[inp.dataset.search] = inp.value.trim().toLocaleLowerCase("tr");
  renderSection(inp.dataset.search);
});

$("gsearch").addEventListener("input", e => {
  const q = e.target.value.trim().toLocaleLowerCase("tr");
  if (!q) {
    if (active === "search") openView(beforeSearch, false);
    return;
  }
  if (active !== "search") beforeSearch = active;
  renderSearch(q);
  openView("search", false);
});

$("menuBtn").addEventListener("click", () => document.body.classList.toggle("nav-open"));
$("scrim").addEventListener("click", () => document.body.classList.remove("nav-open"));
$("switchBtn").addEventListener("click", () => {
  document.body.classList.remove("nav-open");
  showLogin();
});
$("loginForm").addEventListener("submit", submitLogin);
$("loginBack").addEventListener("click", showLogin);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") document.body.classList.remove("nav-open");
});

$("cancelBtn").addEventListener("click", () => $("editor").close());

$("lockCancel").addEventListener("click", () => $("lockBox").close("no"));
$("lockForm").addEventListener("submit", async e => {
  e.preventDefault();
  const err = $("lockErr");
  if (!(window.crypto && crypto.subtle)) {
    err.textContent = "Bu tarayıcıda şifre kontrolü çalışmıyor. Siteyi https ile aç.";
    return;
  }
  const btn = $("lockGo");
  btn.disabled = true;
  try {
    if ((await hashPw($("lockPw").value)) === LOCK_HASH) {
      failCount = 0;
      accountsUnlocked = true;
      renderHome();
      $("lockBox").close("ok");
    } else {
      failCount++;
      err.textContent = "Şifre yanlış.";
      $("lockPw").value = "";
      await new Promise(r => setTimeout(r, Math.min(failCount, 5) * 800));
    }
  } catch {
    err.textContent = "Şifre kontrol edilemedi.";
  } finally {
    btn.disabled = false;
  }
});

document.querySelector(".panel").addEventListener("click", e => {
  const b = e.target.closest("[data-action]");
  if (!b) return;
  const action = b.dataset.action;
  if (action === "quickmood") {
    quickMood(b.dataset.val);
    return;
  }
  const sec = b.dataset.sec;
  const item = sec && data[sec] ? data[sec].find(x => x.id === b.dataset.id) : null;
  if (!item) return;
  if (action === "edit") {
    openEditor(sec, item);
  } else if (action === "copy") {
    copy(item[b.dataset.field]);
  } else if (action === "reveal") {
    const span = b.closest(".cred-line").querySelector(".secret");
    const shown = b.dataset.shown === "1";
    span.textContent = shown ? "••••••••" : item.password;
    b.dataset.shown = shown ? "0" : "1";
    b.textContent = shown ? "Göster" : "Gizle";
  } else if (action === "watch") {
    item.watched = b.checked;
    item.updated = Date.now();
    save();
    render();
    toast(item.watched ? "İzlediklerimize eklendi" : "İzleneceklere geri alındı");
  } else if (action === "rate") {
    const val = Number(b.dataset.val);
    item.rating = item.rating === val ? 0 : val;
    if (item.rating && !item.watched) item.watched = true;
    item.updated = Date.now();
    save();
    render();
  } else if (action === "toggle") {
    item.done = b.checked;
    item.updated = Date.now();
    save();
    render();
    const say = TOGGLE_MSG[sec] || ["Tamamlandı", "Yeniden açıldı"];
    toast(item.done ? say[0] : say[1]);
  }
});

$("fields").addEventListener("click", e => {
  if (e.target.closest("[data-img]")) {
    imgVal = "";
    $("imgFile").value = "";
    setPreview();
    return;
  }
  const b = e.target.closest("[data-pw]");
  if (!b) return;
  const wrap = b.closest(".pw");
  const input = wrap.querySelector("input");
  const toggle = wrap.querySelector('[data-pw="toggle"]');
  if (b.dataset.pw === "toggle") {
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    toggle.textContent = show ? "Gizle" : "Göster";
  } else {
    input.value = generatePassword();
    input.type = "text";
    toggle.textContent = "Gizle";
  }
});

$("fields").addEventListener("change", e => {
  if (e.target.id === "imgFile") loadImage(e.target.files[0]);
});

$("editorForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!current) return;
  const fd = new FormData(e.target);
  const values = {};
  views[current].fields.forEach(f => {
    if (f.type === "image") {
      values[f.name] = imgVal;
      return;
    }
    const v = String(fd.get(f.name) || "");
    values[f.name] = f.type === "password" ? v : v.trim();
  });
  if (!values.title) return;
  const now = Date.now();
  if (editingId) {
    const item = data[current].find(x => x.id === editingId);
    if (item) {
      Object.assign(item, values, { updated: now });
    }
  } else {
    const extras = {
      plans: { done: false },
      growth: { done: false },
      wishlist: { done: false },
      films: { watched: false, rating: 0 }
    };
    data[current].push({ id: newId(), created: now, updated: now, ...(extras[current] || {}), ...values });
  }
  save();
  $("editor").close();
  render();
  toast("Kaydedildi");
});

function askDelete(title) {
  return new Promise(resolve => {
    const d = $("confirmBox");
    $("confirmName").textContent = title ? "“" + title + "”" : "";
    d.returnValue = "";
    d.addEventListener("close", () => resolve(d.returnValue === "yes"), { once: true });
    d.showModal();
  });
}

$("deleteBtn").addEventListener("click", async () => {
  if (!current || !editingId) return;
  const target = data[current].find(x => x.id === editingId);
  if (!(await askDelete(target && target.title))) return;
  data[current] = data[current].filter(x => x.id !== editingId);
  save();
  $("editor").close();
  render();
  toast("Silindi");
});

window.addEventListener("online", () => { if (cloud && pendingPush) pushNow(); });

window.addEventListener("pagehide", () => {
  if (cloud && pendingPush) {
    clearTimeout(pushTimer);
    cloudWrite(cloud, data, true).then(markClean).catch(() => {});
  }
});

function tick() {
  const d = new Date();
  $("today").textContent = d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  $("time").textContent = d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    tick();
    renderHome();
  }
});

/* ---------- Başlangıç ---------- */

data = load();
buildNav();
buildViews();
try { active = localStorage.getItem(VIEW_KEY) || "home"; } catch {}
openView(active, false);
render();
tick();
setInterval(tick, 30000);
syncOnOpen();
