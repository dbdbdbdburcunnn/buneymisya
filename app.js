const STORE_KEY = "defterim.data";
const CLOUD_KEY = "defterim.cloud";
const DIRTY_KEY = "defterim.dirty";
const API = "https://api.jsonbin.io/v3/b";
const DEFAULT_KEY = "$2a$10$SK5kRKhW5Chnu0LRk2v90ONtlnP8GRAJVkgb21zEfkCt.TT0vxL9y";
const DEFAULT_BIN = "";
const API_ROOT = "https://api.jsonbin.io/v3";
const BIN_NAME = "Bizee Özel";
const POLL_MS = 60000;
const IDLE_MS = 5 * 60000;
const VIEW_KEY = "defterim.view";
const PROFILES = { burcun: "Burcun", dodom: "Dodom" };
// Şifreler düz yazı olarak tutulmaz; Ekim1901. anahtarıyla PBKDF2 özeti alınır.
const PW_SALT = "Ekim1901.";
const LOCK_HASH = "f3fce4f7f8614b328fc8b14a5a88f0d24243d4dee5b36534cb66815052d65eed"; // Şifreler bölümünün kilidi (Ekim1901.)
const PW_HASH = {
  burcun: "181371d3a4b370e3c5ff72d8e21b7154386659ab9619bd63936d5a199a2e879c",
  dodom: "58a2ecb4e10e322c388cf932c7c168bc64e909a427fa22af03a3fb3791b57d3e"
};
const LIST_EXTRA = ["letters"];
const SECTIONS = [
  "accounts", "recipes", "notes", "plans", "films",
  "emails", "growth", "favorites", "doodle", "mood", "ideas", "wishlist"
];
const STACKS = ["recipes", "plans", "growth", "wishlist"];
const MOODS = ["😊 Harika", "🙂 İyi", "😐 Fena değil", "😔 Üzgün", "😣 Stresli"];
const SALE = ["Sadece bende", "Satılık", "Satıldı"];
const PRIORITY = ["Çok istiyorum", "İstiyorum", "Belki"];
const FAV_KINDS = [
  { k: "Müzik", add: "Müzik ekle", link: "Dinle" },
  { k: "Film / dizi", add: "Film / dizi ekle", link: "İzle" },
  { k: "Site", add: "Site ekle", link: "Siteyi aç" },
  { k: "Yemek", add: "Yemek ekle", link: "Aç" },
  { k: "Kitap", add: "Kitap ekle", link: "Aç" },
  { k: "Mekan", add: "Mekan ekle", link: "Konumu aç" },
  { k: "Diğer", add: "Diğer ekle", link: "Aç" }
];
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
  { id: "letters", name: "Birbirimize", hint: "Notlar ve sürpriz mektuplar" },
  { id: "pet", name: "Canavarlarımız", hint: "Her gün bakım ister" },
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
const HOME_TILES = ["letters", "pet", "word", "growth", "films", "favorites", "doodle", "mood", "ideas", "wishlist"];
const VIEW_IDS = ["home", "letters", "pet", "word", ...SECTIONS];
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
  letters: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/><path d="M12 17.5s-2.6-1.6-2.6-3.1c0-.8.6-1.4 1.3-1.4.6 0 1 .3 1.3.8.3-.5.7-.8 1.3-.8.7 0 1.3.6 1.3 1.4 0 1.5-2.6 3.1-2.6 3.1Z"/>',
  pet: '<path d="M7 8.5 5.5 4l4 2.6M17 8.5 18.5 4l-4 2.6"/><path d="M4 14.5a8 7.5 0 0 1 16 0V17a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z"/><path d="M9.5 13h.01M14.5 13h.01M10 16.5q2 1.5 4 0"/>',
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
let favFilter = "all";
const searchQ = {};
let cloud = loadCloud();
let pushTimer = null;
let pushing = false;
let pendingPush = false;
let pollTimer = null;
let lastActive = Date.now();
let lastRemote = null;

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
      { name: "kind", label: "Tür", type: "select", options: FAV_KINDS.map(x => x.k) },
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
  [...SECTIONS, ...LIST_EXTRA].forEach(sec => { if (!Array.isArray(d[sec])) d[sec] = []; });
  d.bulmaca = normalizePuzzle(d.bulmaca);
  d.pets = normalizePets(d.pets, d.pet);
  delete d.pet;
  d.deleted = normalizeDeleted(d.deleted);
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
    updated: Number(src.updated) || 0,
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
  P.updated = Date.now();
  pzBad = new Set();
  const pts = Math.max(10, cfg.base + cur.words.length * 2 - cur.penalty);
  cur.earned = pts;
  P.points += pts;
  P.solved++;
  P.byLevel[cur.lv]++;
  petMark("puzzle");
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

/* ---------- Canavar ---------- */

const PET_COLORS = ["#B39BFF", "#FFA3C2", "#6DD8C6", "#FFC56E", "#8DBBFF"];
const PET_COLORS_OLD = ["#8E6FE0", "#F07FA0", "#3FA99D", "#F2A541", "#5B8DEF"];
const PET_STATS = [
  { k: "food", name: "Tokluk", icon: "🍓", rate: 4 },
  { k: "fun", name: "Eğlence", icon: "⚽", rate: 3 },
  { k: "clean", name: "Temizlik", icon: "🫧", rate: 2 },
  { k: "energy", name: "Enerji", icon: "💤", rate: 2.5 }
];
const PET_ACTIONS = {
  feed: { label: "Besle", icon: "🍓", fx: ["🍓", "🍪", "🍎"], change: { food: 35 }, says: "besledi", full: "food", fullMsg: "Karnı tok, şimdilik yemek istemiyor" },
  play: { label: "Oyna", icon: "⚽", fx: ["⚽", "✨", "🎈"], change: { fun: 30, energy: -12 }, says: "oynadı", full: "fun", fullMsg: "Çok eğlendi, biraz dinlensin" },
  wash: { label: "Yıka", icon: "🫧", fx: ["🫧", "🫧", "🧼"], change: { clean: 45 }, says: "yıkadı", full: "clean", fullMsg: "Zaten tertemiz" },
  sleep: { label: "Uyut", icon: "💤", fx: ["💤", "🌙", "⭐"], change: { energy: 60 }, says: "uyuttu", full: "energy", fullMsg: "Uykusu yok, enerjisi dolu" }
};
const PET_TASKS = [
  { id: "feed", title: "Canavarı besle", xp: 10 },
  { id: "play", title: "Canavarla oyna", xp: 10 },
  { id: "wash", title: "Canavarı yıka", xp: 10 },
  { id: "mood", title: "Bugün nasıl hissettiğini işaretle", xp: 10, go: "home" },
  { id: "note", title: "Bir not ya da fikir yaz", xp: 15, go: "notes" },
  { id: "puzzle", title: "Bir bulmaca çöz", xp: 20, go: "word" },
  { id: "plan", title: "Bir planı tamamla", xp: 15, go: "plans" },
  { id: "letter", title: "Diğerine bir not bırak", xp: 15, go: "letters" }
];
const PET_STAGES = ["Bebek canavar", "Minik canavar", "Genç canavar", "Koca canavar"];
const LEVEL_XP = 100;
const ALL_DONE_BONUS = 30;
let petFx = null;
let petRenaming = false;
let petShow = "";
const PET_DEFAULTS = {
  burcun: { name: "Pofuduk", color: "#FFA3C2" },
  dodom: { name: "Boncuk", color: "#8DBBFF" }
};
const myPet = () => data.pets[profile];

function normalizePets(src, legacy) {
  const out = {};
  Object.keys(PROFILES).forEach(k => {
    const raw = src && typeof src === "object" && src[k] ? src[k] : legacy && typeof legacy === "object" ? JSON.parse(JSON.stringify(legacy)) : null;
    if (raw && !(src && src[k]) && k !== "burcun") {
      delete raw.name;
      delete raw.color;
    }
    out[k] = normalizePet(raw, PET_DEFAULTS[k]);
  });
  return out;
}

function normalizePet(p, def) {
  const dflt = def || PET_DEFAULTS.burcun;
  const src = p && typeof p === "object" ? p : {};
  const st = src.stats && typeof src.stats === "object" ? src.stats : {};
  const clamp = v => Math.min(100, Math.max(0, Number(v)));
  return {
    name: typeof src.name === "string" && src.name.trim() ? src.name.trim().slice(0, 24) : dflt.name,
    color: PET_COLORS.includes(src.color) ? src.color : PET_COLORS_OLD.includes(src.color) ? PET_COLORS[PET_COLORS_OLD.indexOf(src.color)] : dflt.color,
    xp: Math.max(0, Number(src.xp) || 0),
    stats: Object.fromEntries(PET_STATS.map(s => [s.k, Number.isFinite(Number(st[s.k])) && st[s.k] !== null ? clamp(st[s.k]) : 80])),
    at: Number(src.at) || Date.now(),
    day: typeof src.day === "string" ? src.day : "",
    done: src.done && typeof src.done === "object" ? src.done : {},
    streak: Number(src.streak) || 0,
    lastFull: typeof src.lastFull === "string" ? src.lastFull : "",
    tasks: Array.isArray(src.tasks) ? src.tasks.filter(t => t && t.id && typeof t.title === "string") : [],
    coins: Number.isFinite(Number(src.coins)) && src.coins !== null && src.coins !== undefined ? Math.max(0, Number(src.coins)) : Math.floor((Number(src.xp) || 0) / 5),
    owned: Array.isArray(src.owned) ? src.owned.filter(id => SHOP.some(x => x.id === id)) : [],
    wear: Object.fromEntries(Object.keys(SLOTS).filter(k => src.wear && SHOP.some(x => x.id === src.wear[k] && x.slot === k && Array.isArray(src.owned) && src.owned.includes(x.id))).map(k => [k, src.wear[k]])),
    weeks: trimWeeks(src.weeks),
    prizeWeek: typeof src.prizeWeek === "string" ? src.prizeWeek : "",
    log: Array.isArray(src.log) ? src.log.filter(l => l && l.t).slice(0, 12) : [],
    updated: Number(src.updated) || 0
  };
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return ymd(d);
}

function petNow(pet) {
  const h = Math.max(0, (Date.now() - pet.at) / 3600000);
  const out = {};
  PET_STATS.forEach(s => { out[s.k] = Math.max(0, Math.min(100, pet.stats[s.k] - s.rate * h)); });
  return out;
}

const petDone = pet => (pet.day === todayStr() ? pet.done : {});
const petAllTasks = pet => [...PET_TASKS, ...pet.tasks.map(t => ({ id: "c:" + t.id, title: t.title, xp: 10, custom: t.id }))];
const petLevel = pet => 1 + Math.floor(pet.xp / LEVEL_XP);
const petStage = pet => { const l = petLevel(pet); return l >= 10 ? 3 : l >= 6 ? 2 : l >= 3 ? 1 : 0; };
const petStreak = pet => (pet.lastFull === todayStr() || pet.lastFull === yesterdayStr() ? pet.streak : 0);

function petMood(stats) {
  const vals = PET_STATS.map(s => stats[s.k]);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  if (stats.energy < 20) return "sleepy";
  if (Math.min(...vals) < 8 || avg < 25) return "cry";
  if (avg < 50) return "sad";
  if (avg >= 72) return "happy";
  return "ok";
}

function petSays(pet, stats, mine = true) {
  const low = PET_STATS.filter(s => stats[s.k] < 30).sort((a, b) => stats[a.k] - stats[b.k])[0];
  if (low) return { food: "Karnım çok acıktı…", fun: "Canım sıkıldı, oynayalım mı?", clean: "Biraz kirlendim, yıkar mısın?", energy: "Uykum geldi…" }[low.k];
  if (petMood(stats) === "sad") return "Biraz ilgi bekliyorum, beni unutma…";
  const tasks = petAllTasks(pet);
  const done = petDone(pet);
  if (tasks.every(t => done[t.id])) return mine ? "Bugün harikaydın, seni çok seviyorum!" : "Bugün çok iyi bakıldım!";
  const lines = ["Bugün neler yapıyoruz?", "Yanımda olmana bayılıyorum!", "Görevleri birlikte bitirelim!", "Biraz ilgi iyi gelir."];
  return lines[new Date().getHours() % lines.length];
}

let petSvgSeq = 0;

function mixHex(a, b, t) {
  const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const x = p(a), y = p(b);
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
}

function petSvg(pet, stats, mood, stage) {
  const id = "pg" + (++petSvgSeq);
  const c = pet.color;
  const light = mixHex(c, "#FFFFFF", 0.5);
  const belly = mixHex(c, "#FFFFFF", 0.62);
  const shade = mixHex(c, "#2A1030", 0.18);
  const line = mixHex(c, "#2A1030", 0.42);
  const ink = "#2E1A3B";
  const wear = petWear(pet);
  const s = [0.8, 0.9, 0.98, 1.05][stage];
  const sw = `stroke="${line}" stroke-width="2.6" stroke-linejoin="round"`;
  const happy = mood === "happy";

  const ear = `<path d="M60 86C46 66 44 42 56 34C70 38 82 56 84 70Z" fill="${c}" ${sw}/><path d="M62 74C55 60 54 48 58 43C66 48 73 58 75 66Z" fill="#FFB3C8" opacity=".85"/>`;
  const ears = `<g class="pet-ear l">${ear}</g><g class="pet-ear r" transform="translate(200 0) scale(-1 1)">${ear}</g>`;
  const hornSize = [0, 0.75, 1, 1.3][stage];
  const horn = `<path d="M86 60C83 48 86 38 91 34C95 40 96 50 95 58Z" fill="#FFF1C9" stroke="#E8C77A" stroke-width="2" stroke-linejoin="round"/>`;
  const top = stage === 0
    ? `<path d="M100 54C100 46 101 41 103 36" stroke="#4FAE5B" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M103 38C96 29 87 31 85 36C91 41 98 41 103 38Z" fill="#8EDC86" stroke="#4FAE5B" stroke-width="1.6"/><path d="M103 38C108 28 119 28 121 33C115 39 108 41 103 38Z" fill="#6CCB6B" stroke="#4FAE5B" stroke-width="1.6"/>`
    : `<g transform="translate(91 58) scale(${hornSize}) translate(-91 -58)">${horn}</g><g transform="translate(109 58) scale(${hornSize}) translate(-109 -58) translate(200 0) scale(-1 1)">${horn}</g>`;

  const armY = happy ? 128 : 140;
  const armRot = happy ? 40 : 18;
  const arms = `<ellipse class="pet-arm" cx="42" cy="${armY}" rx="9" ry="14" fill="${c}" ${sw} transform="rotate(${armRot} 42 ${armY})"/><ellipse class="pet-arm r" cx="158" cy="${armY}" rx="9" ry="14" fill="${c}" ${sw} transform="rotate(${-armRot} 158 ${armY})"/>`;
  const foot = x => `<ellipse cx="${x}" cy="180" rx="15" ry="9.5" fill="${shade}" ${sw}/><circle cx="${x - 6}" cy="183" r="2" fill="${light}"/><circle cx="${x}" cy="184.5" r="2" fill="${light}"/><circle cx="${x + 6}" cy="183" r="2" fill="${light}"/>`;

  let eyes = "";
  let mouth = "";
  let extra = "";
  const eyeOpen = (x, sad) => `<g class="pet-eye"><ellipse cx="${x}" cy="118" rx="${stage === 0 ? 14 : 13}" ry="${stage === 0 ? 16 : 15}" fill="url(#${id}e)"/><circle cx="${x + 4.5}" cy="${sad ? 114 : 111.5}" r="5.6" fill="#FFFFFF"/><circle cx="${x - 4.5}" cy="124.5" r="2.6" fill="#FFFFFF" opacity=".9"/>${happy ? `<circle cx="${x + 5}" cy="122" r="1.2" fill="#FFFFFF"/>` : ""}</g>`;
  if (mood === "sleepy") {
    eyes = `<path d="M65 117q11 9 22 0M113 117q11 9 22 0" stroke="${ink}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
    mouth = `<ellipse cx="100" cy="138" rx="4.5" ry="5.5" fill="#7A2E46"/>`;
    extra += `<g class="pet-z" fill="${line}" font-family="Figtree, sans-serif" font-weight="800"><text x="146" y="72" font-size="18">z</text><text x="160" y="56" font-size="13">z</text></g>`;
  } else {
    const sad = mood === "sad" || mood === "cry";
    eyes = eyeOpen(76, sad) + eyeOpen(124, sad);
    if (sad) eyes += `<path d="M64 101L83 96M136 101L117 96" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`;
    if (happy) {
      mouth = `<path d="M90 132Q100 147 110 132Z" fill="#7A2E46" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/><path d="M94.5 139Q100 145 105.5 139Q100 137 94.5 139Z" fill="#FF8FAB"/><path d="M93 132.5l2.6 4.4 2.4-4.4z" fill="#FFFFFF"/>`;
      extra += `<path class="pet-spark" d="M164 74l2.2 6.2 6.2 2.2-6.2 2.2-2.2 6.2-2.2-6.2-6.2-2.2 6.2-2.2z" fill="#FFD84D"/><path class="pet-spark b" d="M34 92l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" fill="#FFD84D"/>`;
    } else if (mood === "ok") {
      mouth = `<path d="M90 134q5 6 10 0q5 6 10 0" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M102 134.5l2.2 3.8 2-3.8z" fill="#FFFFFF"/>`;
    } else if (mood === "sad") {
      mouth = `<path d="M92 141q8-7 16 0" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    } else {
      mouth = `<path d="M89 141q5.5-5 11 0q5.5 5 11 0" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      extra += `<path d="M66 131q-4 11 0 18q4-7 0-18z" fill="#8FD3FF"/><path d="M134 131q-4 11 0 18q4-7 0-18z" fill="#8FD3FF"/>`;
    }
  }
  if (stats.clean < 30) {
    extra += `<ellipse cx="64" cy="156" rx="6" ry="4" fill="#8A6A4A" opacity=".35"/><ellipse cx="134" cy="164" rx="7" ry="4.5" fill="#8A6A4A" opacity=".35"/><ellipse cx="118" cy="76" rx="4" ry="3" fill="#8A6A4A" opacity=".3"/><path d="M150 96q4-6 0-12M158 100q4-6 0-12" stroke="#9AA36A" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  }

  return `<svg class="pet-svg" viewBox="0 0 200 200" role="img" aria-label="${esc(pet.name)}">
    <defs>
      <radialGradient id="${id}b" cx="38%" cy="30%" r="75%">
        <stop offset="0" stop-color="${light}"/>
        <stop offset=".55" stop-color="${c}"/>
        <stop offset="1" stop-color="${shade}"/>
      </radialGradient>
      <radialGradient id="${id}k" cx="50%" cy="40%" r="60%">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity=".9"/>
        <stop offset="1" stop-color="${belly}" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="${id}e" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1E1230"/>
        <stop offset="1" stop-color="#5B3F8C"/>
      </linearGradient>
      <radialGradient id="${id}c">
        <stop offset="0" stop-color="#FF7FA6" stop-opacity=".75"/>
        <stop offset="1" stop-color="#FF7FA6" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="190" rx="${Math.round(56 * s)}" ry="6.5" fill="rgba(40,20,50,.14)"/>
    <g class="pet-body" transform="translate(100 188) scale(${s}) translate(-100 -188)">
      <path class="pet-tail" d="M154 164C174 164 184 146 175 136C170 147 163 152 150 152Z" fill="${c}" ${sw}/>
      ${ears}
      ${top}
      ${foot(78)}${foot(122)}
      <path d="M100 52C143 52 167 88 167 128C167 164 139 183 100 183C61 183 33 164 33 128C33 88 57 52 100 52Z" fill="url(#${id}b)" ${sw}/>
      <ellipse cx="100" cy="150" rx="40" ry="30" fill="url(#${id}k)"/>
      <ellipse cx="72" cy="78" rx="17" ry="9" fill="#FFFFFF" opacity=".38" transform="rotate(-28 72 78)"/>
      <circle cx="89" cy="70" r="3.2" fill="#FFFFFF" opacity=".5"/>
      ${arms}
      <ellipse cx="58" cy="134" rx="13" ry="9" fill="url(#${id}c)"/>
      <ellipse cx="142" cy="134" rx="13" ry="9" fill="url(#${id}c)"/>
      ${eyes}${mouth}
      ${wear.neck}
      <g transform="translate(100 118) scale(1.2 1.1) translate(-100 -106)">${wear.eyes}</g>
      <g transform="translate(100 63) scale(1.1) translate(-100 -72)">${wear.head}</g>
    </g>
    ${extra}
    ${petCrown(pet)}
  </svg>`;
}

const SHOP = [
  { id: "party", slot: "head", name: "Parti şapkası", icon: "🎉", price: 40 },
  { id: "bow", slot: "head", name: "Fiyonk", icon: "🎀", price: 50 },
  { id: "beanie", slot: "head", name: "Bere", icon: "🧶", price: 70 },
  { id: "flowers", slot: "head", name: "Çiçek tacı", icon: "🌸", price: 90 },
  { id: "cowboy", slot: "head", name: "Kovboy şapkası", icon: "🤠", price: 120 },
  { id: "round", slot: "eyes", name: "Yuvarlak gözlük", icon: "👓", price: 50 },
  { id: "sun", slot: "eyes", name: "Güneş gözlüğü", icon: "🕶️", price: 80 },
  { id: "hearts", slot: "eyes", name: "Kalp gözlük", icon: "💖", price: 110 },
  { id: "bowtie", slot: "neck", name: "Papyon", icon: "👔", price: 45 },
  { id: "scarf", slot: "neck", name: "Atkı", icon: "🧣", price: 65 },
  { id: "pearls", slot: "neck", name: "İnci kolye", icon: "📿", price: 130 }
];
const SLOTS = { head: "Baş", eyes: "Göz", neck: "Boyun" };
const ALL_DONE_STARS = 6;
const WEEK_PRIZE = 30;
let shopSlot = "head";
let petSynced = false;
const starsOf = xp => Math.round(xp / 5);

function weekKey(d = new Date()) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return ymd(x);
}

function lastWeekKey() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return weekKey(d);
}

function trimWeeks(w) {
  const out = {};
  Object.keys(w || {}).sort().slice(-8).forEach(k => { out[k] = Number(w[k]) || 0; });
  return out;
}

function addWeek(pet, pts, when) {
  const k = weekKey(when ? new Date(when) : new Date());
  pet.weeks = trimWeeks({ ...pet.weeks, [k]: Math.max(0, (Number(pet.weeks[k]) || 0) + pts) });
}

function weekWinner(key) {
  const sc = Object.keys(PROFILES).map(k => [k, Number((data.pets[k].weeks || {})[key]) || 0]);
  const max = Math.max(...sc.map(x => x[1]));
  if (!max) return null;
  const top = sc.filter(x => x[1] === max);
  return top.length === 1 ? top[0][0] : "tie";
}

function claimWeekPrize() {
  if (!$("login").hidden || (cloud && !petSynced)) return;
  const pet = myPet();
  const lw = lastWeekKey();
  if (pet.prizeWeek === lw || weekWinner(lw) !== profile) return;
  pet.prizeWeek = lw;
  pet.coins += WEEK_PRIZE;
  petLog("haftanın şampiyonu oldu 👑");
  pet.updated = Date.now();
  save();
  renderPet();
  setTimeout(() => toast(`Geçen haftanın şampiyonu sensin! +${WEEK_PRIZE} ⭐`), 700);
}

function petWear(pet) {
  const parts = { head: "", eyes: "", neck: "" };
  const ink = "#2B1B22";
  const heart = (cx, cy) => `M${cx} ${cy + 14}C${cx - 26} ${cy - 2} ${cx - 13} ${cy - 23} ${cx} ${cy - 9}C${cx + 13} ${cy - 23} ${cx + 26} ${cy - 2} ${cx} ${cy + 14}Z`;
  const w = pet.wear || {};
  const head = {
    party: `<path d="M82 74L100 26L118 74Z" fill="#FF6B8B"/><path d="M91 52L109 52L113 62L87 62Z" fill="#FFFFFF" opacity=".75"/><circle cx="100" cy="26" r="6.5" fill="#FFD54A"/>`,
    bow: `<path d="M128 72L108 60L110 86ZM128 72L148 60L146 86Z" fill="#FF5C8A"/><circle cx="128" cy="72" r="6.5" fill="#E0406E"/>`,
    beanie: `<path d="M64 82Q64 38 100 38Q136 38 136 82Z" fill="#4C7AE0"/><path d="M62 74Q100 64 138 74L138 86Q100 76 62 86Z" fill="#3A62C4"/><circle cx="100" cy="36" r="8" fill="#FFFFFF"/>`,
    flowers: `<path d="M62 84Q100 54 138 84" stroke="#5DBB63" stroke-width="3.5" fill="none"/>${[[70, 78, "#FF7AA2"], [84, 68, "#FFD54A"], [100, 64, "#7FD1FF"], [116, 68, "#FFD54A"], [130, 78, "#FF7AA2"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="7.5" fill="${c}"/><circle cx="${x}" cy="${y}" r="3" fill="#FFFFFF" opacity=".85"/>`).join("")}`,
    cowboy: `<path d="M78 72Q76 38 92 42Q100 48 108 42Q124 38 122 72Z" fill="#A0683A"/><path d="M78 62h44v8h-44z" fill="#5A3418"/><ellipse cx="100" cy="73" rx="56" ry="9" fill="#8B5A2B"/>`
  };
  const eyes = {
    round: `<circle cx="80" cy="106" r="18" fill="#FFFFFF" fill-opacity=".12" stroke="${ink}" stroke-width="4"/><circle cx="120" cy="106" r="18" fill="#FFFFFF" fill-opacity=".12" stroke="${ink}" stroke-width="4"/><path d="M98 104q2-4 4 0M62 102L46 96M138 102L154 96" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    sun: `<rect x="59" y="93" width="40" height="27" rx="12" fill="#1E1E2A"/><rect x="101" y="93" width="40" height="27" rx="12" fill="#1E1E2A"/><path d="M99 101h2M59 100L46 95M141 100L154 95" stroke="#1E1E2A" stroke-width="4" stroke-linecap="round"/><path d="M66 100h9M108 100h9" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".5"/>`,
    hearts: `<path d="${heart(80, 106)}" fill="#FF4F7B" fill-opacity=".9" stroke="#C2185B" stroke-width="2"/><path d="${heart(120, 106)}" fill="#FF4F7B" fill-opacity=".9" stroke="#C2185B" stroke-width="2"/><path d="M99 102h2" stroke="#C2185B" stroke-width="3"/>`
  };
  const neck = {
    bowtie: `<path d="M100 166L83 156L83 176ZM100 166L117 156L117 176Z" fill="#3D5AFE"/><circle cx="100" cy="166" r="5.5" fill="#2A3EB1"/>`,
    scarf: `<path d="M44 146Q100 176 156 146L156 158Q100 190 44 158Z" fill="#E85D4A"/><path d="M118 164L124 196L137 192L129 162Z" fill="#D14836"/><path d="M60 156Q100 178 140 156" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".5" stroke-dasharray="6 6"/>`,
    pearls: Array.from({ length: 9 }, (_, i) => {
      const x = 68 + i * 8;
      const y = 168 - ((x - 100) / 32) ** 2 * 13;
      return `<circle cx="${x}" cy="${y.toFixed(1)}" r="4.2" fill="#FFFFFF" stroke="#D9CFE6" stroke-width="1.2"/>`;
    }).join("")
  };
  if (head[w.head]) parts.head = head[w.head];
  if (eyes[w.eyes]) parts.eyes = eyes[w.eyes];
  if (neck[w.neck]) parts.neck = neck[w.neck];
  return parts;
}

function petCrown(pet) {
  const owner = Object.keys(data.pets || {}).find(k => data.pets[k] === pet);
  return owner && weekWinner(lastWeekKey()) === owner
    ? `<g transform="translate(18 22) rotate(-18)"><path d="M0 22L0 6L8 14L15 2L22 14L30 6L30 22Z" fill="#F5C542" stroke="#D9A21B" stroke-width="2" stroke-linejoin="round"/><circle cx="15" cy="16" r="2.8" fill="#FF4F7B"/></g>`
    : "";
}

function shopClick(id) {
  const pet = myPet();
  const it = SHOP.find(x => x.id === id);
  if (!it) return;
  pet.owned = pet.owned || [];
  pet.wear = pet.wear || {};
  if (!pet.owned.includes(id)) {
    if (pet.coins < it.price) {
      toast(`${it.price - pet.coins} ⭐ daha lazım. Görevleri yaparak kazanabilirsin.`);
      return;
    }
    pet.coins -= it.price;
    pet.owned.push(id);
    pet.wear[it.slot] = id;
    petLog(`${it.name.toLocaleLowerCase("tr")} aldı`);
    toast(`${it.name} alındı!`);
  } else if (pet.wear[it.slot] === id) {
    delete pet.wear[it.slot];
  } else {
    pet.wear[it.slot] = id;
  }
  pet.updated = Date.now();
  petFx = { kind: "play", owner: profile, until: Date.now() + 1000 };
  save();
  renderPet();
  renderHome();
}

function weekCard(owner) {
  const key = weekKey();
  const keys = Object.keys(PROFILES);
  const scores = keys.map(k => Number((data.pets[k].weeks || {})[key]) || 0);
  const max = Math.max(1, ...scores);
  const top = Math.max(...scores);
  const daysLeft = 7 - ((new Date().getDay() + 6) % 7);
  const lw = weekWinner(lastWeekKey());
  const last = !lw ? "" : lw === "tie"
    ? "Geçen hafta berabere bitti."
    : `Geçen haftanın şampiyonu: ${esc(data.pets[lw].name)} (${esc(PROFILES[lw])}) 👑`;
  const rows = keys.map((k, i) => `<div class="week-row${k === owner ? " me" : ""}">
      <div class="week-top"><span>${top && scores[i] === top ? "👑 " : ""}${esc(data.pets[k].name)} <em>${esc(PROFILES[k])}</em></span><strong>${scores[i]} puan</strong></div>
      <div class="progress"><div class="progress-fill" style="width:${(scores[i] / max) * 100}%"></div></div>
    </div>`).join("");
  return `<section class="card plain pet-week">
    <header class="card-head"><h3>🏆 Haftalık yarışma</h3><span class="pet-count">${daysLeft === 1 ? "Son gün" : daysLeft + " gün kaldı"}</span></header>
    ${rows}
    <p class="pet-hint">Görev puanları pazartesi sıfırlanır. Hafta sonunda önde olan canavar bir hafta taç takar, sahibi ${WEEK_PRIZE} ⭐ kazanır.${last ? " " + last : ""}</p>
  </section>`;
}

function shopCard() {
  const pet = myPet();
  const wear = pet.wear || {};
  const owned = pet.owned || [];
  const tabs = Object.entries(SLOTS).map(([k, v]) =>
    `<button type="button" class="chip" data-shop-slot="${k}" aria-pressed="${k === shopSlot}">${esc(v)}</button>`
  ).join("");
  const items = SHOP.filter(x => x.slot === shopSlot).map(it => {
    const has = owned.includes(it.id);
    const on = wear[it.slot] === it.id;
    const label = on ? "Giyiyor ✓" : has ? "Giy" : `⭐ ${it.price}`;
    return `<button type="button" class="shop-item${on ? " on" : ""}${!has && pet.coins < it.price ? " poor" : ""}" data-shop="${it.id}">
      <span class="shop-icon" aria-hidden="true">${it.icon}</span><span class="shop-name">${esc(it.name)}</span><span class="shop-price">${label}</span>
    </button>`;
  }).join("");
  return `<section class="card plain pet-shop">
    <header class="card-head"><h3>Mağaza</h3><span class="pet-count">⭐ ${pet.coins}</span></header>
    <div class="filters">${tabs}</div>
    <div class="shop-grid">${items}</div>
    <p class="pet-hint">Her görev yıldız kazandırır. Aldığın bir eşyaya tekrar dokunarak çıkarabilirsin.</p>
  </section>`;
}

/* ---------- Birbirimize notlar ---------- */

const PAPERS = [["pink", "Pembe"], ["yellow", "Sarı"], ["blue", "Mavi"]];
let letterTab = "in";
let letterColor = "pink";
let letterDraft = "";
let letterDate = "";
const letterSkip = new Set();

const otherOf = p => Object.keys(PROFILES).find(k => k !== p);
const letterOpen = l => !l.openAt || l.openAt <= todayStr();
const inboxOf = p => data.letters.filter(l => l.to === p);
const unreadCount = () => inboxOf(profile).filter(l => !l.readAt && letterOpen(l)).length;

function letterCard(l) {
  const incoming = l.to === profile;
  const col = PAPERS.some(p => p[0] === l.color) ? l.color : "pink";
  if (incoming && !letterOpen(l)) {
    return `<article class="letter paper-${col} locked">
      <p class="letter-from">🔒 ${esc(PROFILES[l.from])} sana bir sürpriz bıraktı</p>
      <p class="letter-text">${esc(formatDate(l.openAt))} günü açılacak.</p>
    </article>`;
  }
  const status = incoming ? "" : !letterOpen(l)
    ? `🔒 ${esc(formatDate(l.openAt))} günü açılacak`
    : l.readAt ? `Okundu ✓ ${esc(petClock(l.readAt))}` : "Henüz okunmadı";
  return `<article class="letter paper-${col}${incoming && !l.readAt ? " unread" : ""}">
    <p class="letter-from">${incoming ? esc(PROFILES[l.from]) + "'dan" : esc(PROFILES[l.to]) + "'a"}</p>
    <p class="letter-text">${esc(l.text)}</p>
    <div class="letter-foot">
      <span>${esc(dateShort(l.created))}${status ? " · " + status : ""}</span>
      ${incoming && !l.readAt ? `<button type="button" class="btn small" data-letter-read="${esc(l.id)}">Okudum ♡</button>` : ""}
      ${incoming && l.readAt ? `<button type="button" class="btn small ghost" data-letter-reply="1">Cevap yaz</button>` : ""}
      ${!incoming ? `<button type="button" class="btn small danger" data-letter-del="${esc(l.id)}">Sil</button>` : ""}
    </div>
  </article>`;
}

function renderLetters() {
  const el = $("lettersView");
  if (!el) return;
  if (!el.dataset.built) {
    el.dataset.built = "1";
    el.innerHTML = `
      <header class="view-head">
        <div class="view-title">
          <span class="view-icon" aria-hidden="true">${iconSvg("letters")}</span>
          <div><h2>Birbirimize</h2><p class="view-sub" id="letterSub"></p></div>
        </div>
      </header>
      <section class="card plain letter-compose">
        <header class="card-head"><h3 id="letterTo"></h3></header>
        <textarea id="letterText" rows="4" maxlength="2000" placeholder="Aklından geçenleri yaz…" aria-label="Not"></textarea>
        <div class="letter-opts">
          <label class="letter-date-l" for="letterDate">Sürpriz olsun, şu gün açılsın <span class="hint">İsteğe bağlı</span></label>
          <input type="date" id="letterDate">
          <div class="letter-papers" role="group" aria-label="Kağıt rengi" id="letterPapers"></div>
          <button type="button" class="btn primary" data-letter-send="1">Gönder 💌</button>
        </div>
      </section>
      <div class="filters" id="letterTabs" role="group" aria-label="Notlar"></div>
      <div class="letter-list" id="letterList"></div>`;
    $("letterText").addEventListener("input", e => { letterDraft = e.target.value; });
    $("letterDate").addEventListener("input", e => { letterDate = e.target.value; });
    $("letterDate").min = todayStr();
  }
  const other = otherOf(profile);
  const unread = unreadCount();
  $("letterTo").textContent = `${PROFILES[other]}'a not bırak`;
  $("letterSub").textContent = unread ? `${unread} okunmamış notun var` : "Birbirinize notlar ve sürpriz mektuplar";
  if (document.activeElement !== $("letterText")) $("letterText").value = letterDraft;
  if (document.activeElement !== $("letterDate")) $("letterDate").value = letterDate;
  $("letterPapers").innerHTML = PAPERS.map(([k, v]) =>
    `<button type="button" class="paper-dot paper-${k}" data-letter-paper="${k}" aria-pressed="${k === letterColor}" aria-label="${v} kağıt"></button>`
  ).join("");
  const sent = data.letters.filter(l => l.from === profile).length;
  const got = inboxOf(profile).length;
  $("letterTabs").innerHTML = `
    <button type="button" class="chip" data-letter-tab="in" aria-pressed="${letterTab === "in"}">Gelenler (${got})${unread ? ` <b class="chip-dot">${unread}</b>` : ""}</button>
    <button type="button" class="chip" data-letter-tab="out" aria-pressed="${letterTab === "out"}">Gönderdiklerim (${sent})</button>`;
  const list = (letterTab === "in" ? inboxOf(profile) : data.letters.filter(l => l.from === profile))
    .slice()
    .sort((a, b) => (b.created || 0) - (a.created || 0));
  $("letterList").innerHTML = list.length
    ? list.map(letterCard).join("")
    : `<p class="empty">${letterTab === "in" ? `Henüz ${esc(PROFILES[other])} sana not bırakmadı.` : "Henüz not göndermedin. İlk notu yukarıdan yaz."}</p>`;
}

function sendLetter() {
  const text = letterDraft.trim();
  if (!text) {
    toast("Önce bir şeyler yaz");
    $("letterText").focus();
    return;
  }
  const now = Date.now();
  const to = otherOf(profile);
  const openAt = letterDate && letterDate > todayStr() ? letterDate : "";
  data.letters.push({ id: newId(), from: profile, to, text: text.slice(0, 2000), color: letterColor, openAt, created: now, updated: now, readAt: 0 });
  letterDraft = "";
  letterDate = "";
  $("letterText").value = "";
  $("letterDate").value = "";
  petMark("letter");
  save();
  letterTab = "out";
  renderLetters();
  renderPet();
  renderHome();
  updateBadges();
  toast(openAt ? `Sürpriz not ${formatDate(openAt)} günü açılacak` : `${PROFILES[to]} notunu görecek 💌`);
}

function readLetter(id) {
  const l = data.letters.find(x => x.id === id);
  if (!l || l.to !== profile || l.readAt) return;
  l.readAt = Date.now();
  l.updated = l.readAt;
  save();
  renderLetters();
  renderHome();
  updateBadges();
}

function checkLetters() {
  if (!$("login").hidden || document.querySelector("dialog[open]")) return;
  const l = inboxOf(profile)
    .filter(x => !x.readAt && letterOpen(x) && !letterSkip.has(x.id))
    .sort((a, b) => (a.created || 0) - (b.created || 0))[0];
  if (!l) return;
  const col = PAPERS.some(p => p[0] === l.color) ? l.color : "pink";
  $("letterPaper").className = "letter letter-pop paper-" + col;
  $("letterPaper").innerHTML = `<p class="letter-from">💌 ${esc(PROFILES[l.from])} sana not bıraktı</p><p class="letter-text">${esc(l.text)}</p><p class="letter-foot"><span>${esc(dateShort(l.created))}</span></p>`;
  const d = $("letterBox");
  d.returnValue = "";
  d.dataset.id = l.id;
  d.showModal();
}

function updateBadges() {
  const n = data && profile ? unreadCount() : 0;
  document.querySelectorAll("[data-badge='letters']").forEach(b => {
    b.textContent = n;
    b.hidden = !n;
  });
}

function petLog(text, pet = myPet()) {
  pet.log = [{ t: Date.now(), who: profile, text }, ...pet.log].slice(0, 12);
}

function petMark(key) {
  const pet = myPet();
  const today = todayStr();
  if (pet.day !== today) {
    pet.day = today;
    pet.done = {};
  }
  if (pet.done[key]) return false;
  const tasks = petAllTasks(pet);
  const task = tasks.find(t => t.id === key);
  if (!task) return false;
  const before = petLevel(pet);
  const stageBefore = petStage(pet);
  pet.done[key] = { who: profile, t: Date.now() };
  pet.xp += task.xp;
  pet.coins += starsOf(task.xp);
  addWeek(pet, task.xp);
  let msg = `Görev tamam: ${task.title} (+${task.xp} XP, +${starsOf(task.xp)} ⭐)`;
  if (tasks.every(t => pet.done[t.id])) {
    pet.xp += ALL_DONE_BONUS;
    pet.coins += ALL_DONE_STARS;
    addWeek(pet, ALL_DONE_BONUS);
    pet.streak = pet.lastFull === yesterdayStr() ? pet.streak + 1 : 1;
    pet.lastFull = today;
    msg = `Bugünün bütün görevleri tamam! +${ALL_DONE_BONUS} XP, +${ALL_DONE_STARS} ⭐ bonus`;
  }
  if (petLevel(pet) > before) {
    msg = petStage(pet) > stageBefore
      ? `${pet.name} büyüdü! Artık bir ${PET_STAGES[petStage(pet)].toLocaleLowerCase("tr")}`
      : `${pet.name} seviye ${petLevel(pet)} oldu!`;
  }
  pet.updated = Date.now();
  setTimeout(() => toast(msg), 900);
  return true;
}

function petUnmark(key) {
  const pet = myPet();
  const done = petDone(pet);
  if (!done[key]) return;
  const task = petAllTasks(pet).find(t => t.id === key);
  if (pet.lastFull === todayStr()) {
    pet.xp = Math.max(0, pet.xp - ALL_DONE_BONUS);
    pet.coins = Math.max(0, pet.coins - ALL_DONE_STARS);
    addWeek(pet, -ALL_DONE_BONUS);
    pet.streak = Math.max(0, pet.streak - 1);
    pet.lastFull = pet.streak ? yesterdayStr() : "";
  }
  delete pet.done[key];
  if (task) {
    pet.xp = Math.max(0, pet.xp - task.xp);
    pet.coins = Math.max(0, pet.coins - starsOf(task.xp));
    addWeek(pet, -task.xp);
  }
  pet.updated = Date.now();
}

function petAction(kind) {
  const a = PET_ACTIONS[kind];
  const pet = myPet();
  if (!a) return;
  const cur = petNow(pet);
  if (cur[a.full] >= 95) {
    toast(a.fullMsg);
    return;
  }
  Object.entries(a.change).forEach(([k, v]) => { cur[k] = Math.round(Math.max(0, Math.min(100, cur[k] + v)) * 10) / 10; });
  PET_STATS.forEach(s => { cur[s.k] = Math.round(cur[s.k] * 10) / 10; });
  pet.stats = cur;
  pet.at = Date.now();
  petLog(a.says);
  pet.updated = Date.now();
  if (PET_TASKS.some(t => t.id === kind)) petMark(kind);
  petFx = { kind, owner: profile, until: Date.now() + 1500 };
  save();
  renderPet();
  renderHome();
}

function petClock(t) {
  const d = new Date(t);
  const time = d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  return ymd(d) === todayStr() ? time : `${d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" })} ${time}`;
}

function renderPet() {
  const el = $("petView");
  if (!el) return;
  const owner = PROFILES[petShow] ? petShow : profile;
  const mine = owner === profile;
  const pet = data.pets[owner];
  const stats = petNow(pet);
  const mood = petMood(stats);
  const stage = petStage(pet);
  const done = petDone(pet);
  const tasks = petAllTasks(pet);
  const nDone = tasks.filter(t => done[t.id]).length;
  const into = pet.xp % LEVEL_XP;
  const streak = petStreak(pet);
  const fx = petFx && petFx.until > Date.now() && petFx.owner === owner ? petFx : null;
  const fxList = fx ? (fx.kind === "love" ? ["❤️", "💕", "❤️"] : PET_ACTIONS[fx.kind].fx) : [];
  const ownerName = PROFILES[owner];

  const fxHtml = fxList.map((e, i) => `<span class="pet-fx" style="--x:${(i - 1) * 34}px;--d:${i * 0.14}s" aria-hidden="true">${e}</span>`).join("");
  const statsHtml = PET_STATS.map(s => {
    const v = Math.round(stats[s.k]);
    return `<div class="pet-stat${v < 30 ? " low" : ""}">
      <div class="pet-stat-top"><span>${s.icon} ${esc(s.name)}</span><strong>${v}%</strong></div>
      <div class="progress"><div class="progress-fill" style="width:${v}%"></div></div>
    </div>`;
  }).join("");
  const actions = mine
    ? `<div class="pet-actions">${Object.entries(PET_ACTIONS).map(([k, a]) =>
        `<button type="button" class="pet-act" data-pet-act="${k}"><span aria-hidden="true">${a.icon}</span>${esc(a.label)}</button>`
      ).join("")}</div>`
    : `<div class="pet-visit">
        <button type="button" class="pet-act" data-pet-love="${owner}"><span aria-hidden="true">❤️</span>Sev</button>
        <p>Bu ${esc(ownerName)}'un canavarı. Bakımını ${esc(ownerName)} yapıyor, sen ona sevgi gönderebilirsin.</p>
      </div>`;
  const swatches = mine
    ? `<div class="pet-colors" role="group" aria-label="Renk seç">${PET_COLORS.map(col =>
        `<button type="button" class="pet-swatch" style="background:${col}" data-pet-color="${col}" aria-pressed="${col === pet.color}" aria-label="Renk"></button>`
      ).join("")}</div>`
    : "";

  const taskRows = tasks.map(t => {
    const d = done[t.id];
    const sub = d ? "Yapıldı" : `+${t.xp} XP`;
    if (t.custom && mine) {
      return `<li class="pet-task${d ? " done" : ""}">
        <input type="checkbox" class="check" data-pet-task="${esc(t.id)}" ${d ? "checked" : ""} aria-label="Tamamlandı">
        <span class="pet-task-t"><span>${esc(t.title)}</span><em>${sub}</em></span>
        <button type="button" class="icon-btn pet-del" data-pet-del="${esc(t.custom)}" aria-label="Görevi sil">×</button>
      </li>`;
    }
    return `<li class="pet-task${d ? " done" : ""}">
      <span class="pet-tick" aria-hidden="true">${d ? "✓" : ""}</span>
      <span class="pet-task-t"><span>${esc(t.title)}</span><em>${sub}</em></span>
      ${mine && !d && t.go ? `<button type="button" class="btn small ghost" data-open="${t.go}">Git</button>` : ""}
    </li>`;
  }).join("");

  const log = pet.log.length
    ? `<ul>${pet.log.slice(0, 8).map(l => `<li>${esc(PROFILES[l.who] || "")} ${esc(l.text)}<time>${esc(petClock(l.t))}</time></li>`).join("")}</ul>`
    : `<p class="mini-empty">${mine ? "Henüz bakım yapılmadı. İlk bakımı sen yap!" : "Henüz bakım yapılmadı."}</p>`;

  const switcher = Object.keys(PROFILES).map(k =>
    `<button type="button" class="chip pet-chip" data-pet-show="${k}" aria-pressed="${k === owner}">${k === profile ? "Benim" : esc(PROFILES[k]) + "'un"}: ${esc(data.pets[k].name)}</button>`
  ).join("");

  el.innerHTML = `
    <header class="view-head">
      <div class="view-title">
        <span class="view-icon" aria-hidden="true">${iconSvg("pet")}</span>
        <div><h2>Canavarlarımız</h2><p class="view-sub">${mine ? "Senin canavarın" : esc(ownerName) + "'un canavarı"}: seviye ${petLevel(pet)}${streak ? `, ${streak} günlük seri` : ""}</p></div>
      </div>
    </header>
    <div class="filters pet-switch" role="group" aria-label="Canavar seç">${switcher}</div>
    <div class="pet-layout">
      <section class="pet-card${mine ? "" : " visiting"}">
        <div class="pet-top">
          <div><h3 class="pet-name">${esc(pet.name)}</h3><p class="pet-meta">⭐ ${pet.coins} · ${esc(ownerName)}'un ${esc(PET_STAGES[stage].toLocaleLowerCase("tr"))}ı, seviye ${petLevel(pet)}</p></div>
          ${mine && !petRenaming ? '<button type="button" class="btn small ghost" data-pet="rename">Adını değiştir</button>' : ""}
        </div>
        ${mine && petRenaming ? `<form class="pet-rename" data-pet-form="rename" autocomplete="off">
          <input name="name" maxlength="24" value="${esc(pet.name)}" aria-label="Yeni ad" required>
          <button type="submit" class="btn small primary">Kaydet</button>
          <button type="button" class="btn small" data-pet="cancel">Vazgeç</button>
        </form>` : ""}
        <div class="pet-stage${fx ? ` act act-${fx.kind}` : ""}">
          ${petSvg(pet, stats, mood, stage)}
          <p class="pet-bubble">${esc(petSays(pet, stats, mine))}</p>
          ${fxHtml}
        </div>
        <div class="pet-xp"><div class="progress"><div class="progress-fill" style="width:${into}%"></div></div><span>${into}/${LEVEL_XP} XP</span></div>
        <div class="pet-stats">${statsHtml}</div>
        ${actions}
        ${swatches}
      </section>
      <div class="pet-side">
        ${weekCard(owner)}
        <section class="card plain">
          <header class="card-head"><h3>${mine ? "Bugünkü görevlerin" : esc(ownerName) + "'un bugünkü görevleri"}</h3><span class="pet-count">${nDone}/${tasks.length}</span></header>
          <div class="progress slim"><div class="progress-fill" style="width:${tasks.length ? (nDone / tasks.length) * 100 : 0}%"></div></div>
          <ul class="pet-tasklist">${taskRows}</ul>
          ${mine ? `<form class="pet-addtask" data-pet-form="task" autocomplete="off">
            <input name="title" maxlength="60" placeholder="Kendi görevini ekle, örn. 2 litre su iç" aria-label="Yeni görev">
            <button type="submit" class="btn small primary">Ekle</button>
          </form>
          <p class="pet-hint">Görevler her gün yenilenir. Hepsini bitirince canavarın bonus XP kazanır.</p>` : ""}
        </section>
        ${mine ? shopCard() : ""}
        <section class="card plain pet-log">
          <header class="card-head"><h3>Son olanlar</h3></header>
          ${log}
        </section>
      </div>
    </div>`;
}

document.addEventListener("submit", e => {
  const f = e.target.closest("[data-pet-form]");
  if (!f) return;
  e.preventDefault();
  const pet = myPet();
  const v = String(new FormData(f).get(f.dataset.petForm === "rename" ? "name" : "title") || "").trim();
  if (!v) return;
  if (f.dataset.petForm === "rename") {
    pet.name = v.slice(0, 24);
    petRenaming = false;
    petLog(`adını “${pet.name}” yaptı`);
    toast("Yeni adı " + pet.name);
  } else {
    pet.tasks.push({ id: newId(), title: v.slice(0, 60), by: profile });
    toast("Görev eklendi");
  }
  pet.updated = Date.now();
  save();
  renderPet();
  renderHome();
});

function petLove(owner) {
  const pet = data.pets[owner];
  if (!pet || owner === profile) return;
  const cur = petNow(pet);
  cur.fun = Math.min(100, cur.fun + 8);
  PET_STATS.forEach(s => { cur[s.k] = Math.round(cur[s.k] * 10) / 10; });
  pet.stats = cur;
  pet.at = Date.now();
  petLog("sevgi gönderdi", pet);
  pet.updated = Date.now();
  petFx = { kind: "love", owner, until: Date.now() + 1500 };
  save();
  renderPet();
  toast(`${pet.name} çok sevindi!`);
}

async function petClick(e) {
  const slot = e.target.closest("[data-shop-slot]");
  if (slot) {
    shopSlot = slot.dataset.shopSlot;
    renderPet();
    return true;
  }
  const shop = e.target.closest("[data-shop]");
  if (shop) {
    shopClick(shop.dataset.shop);
    return true;
  }
  const lt = e.target.closest("[data-letter-tab]");
  if (lt) {
    letterTab = lt.dataset.letterTab;
    renderLetters();
    return true;
  }
  const lp = e.target.closest("[data-letter-paper]");
  if (lp) {
    letterColor = lp.dataset.letterPaper;
    renderLetters();
    return true;
  }
  if (e.target.closest("[data-letter-send]")) {
    sendLetter();
    return true;
  }
  if (e.target.closest("[data-letter-reply]")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    $("letterText").focus({ preventScroll: true });
    return true;
  }
  const lr = e.target.closest("[data-letter-read]");
  if (lr) {
    readLetter(lr.dataset.letterRead);
    return true;
  }
  const ld = e.target.closest("[data-letter-del]");
  if (ld) {
    const l = data.letters.find(x => x.id === ld.dataset.letterDel);
    if (!l || l.from !== profile) return true;
    if (!(await askDelete(l.text.slice(0, 40) + (l.text.length > 40 ? "…" : "")))) return true;
    data.deleted[l.id] = Date.now();
    data.letters = data.letters.filter(x => x.id !== l.id);
    save();
    renderLetters();
    renderHome();
    return true;
  }
  const show = e.target.closest("[data-pet-show]");
  if (show) {
    petShow = show.dataset.petShow;
    petRenaming = false;
    renderPet();
    return !show.hasAttribute("data-open");
  }
  const love = e.target.closest("[data-pet-love]");
  if (love) {
    petLove(love.dataset.petLove);
    return true;
  }
  const act = e.target.closest("[data-pet-act]");
  if (act) {
    petAction(act.dataset.petAct);
    return true;
  }
  const btn = e.target.closest("[data-pet]");
  if (btn) {
    petRenaming = btn.dataset.pet === "rename";
    renderPet();
    if (petRenaming) {
      const inp = document.querySelector('[data-pet-form="rename"] input');
      if (inp) {
        inp.focus();
        inp.select();
      }
    }
    return true;
  }
  const col = e.target.closest("[data-pet-color]");
  if (col) {
    myPet().color = col.dataset.petColor;
    myPet().updated = Date.now();
    save();
    renderPet();
    renderHome();
    return true;
  }
  const task = e.target.closest("[data-pet-task]");
  if (task) {
    if (task.checked) petMark(task.dataset.petTask);
    else petUnmark(task.dataset.petTask);
    save();
    renderPet();
    renderHome();
    return true;
  }
  const del = e.target.closest("[data-pet-del]");
  if (del) {
    const t = myPet().tasks.find(x => x.id === del.dataset.petDel);
    if (!t || !(await askDelete(t.title))) return true;
    petUnmark("c:" + t.id);
    myPet().tasks = myPet().tasks.filter(x => x.id !== t.id);
    myPet().updated = Date.now();
    save();
    renderPet();
    renderHome();
    return true;
  }
  return false;
}

function mergePet(a, b) {
  if (!a) return b;
  if (!b) return a;
  const [n, o] = (Number(b.updated) || 0) > (Number(a.updated) || 0) ? [b, a] : [a, b];
  if (n === o || !o.day || o.day !== n.day) return n;
  const extra = Object.keys(o.done || {}).filter(k => !(n.done || {})[k]);
  if (!extra.length) return n;
  const all = petAllTasks(n);
  const m = { ...n, done: { ...n.done }, log: [...n.log] };
  extra.forEach(k => {
    const t = all.find(x => x.id === k);
    if (!t) return;
    m.done[k] = o.done[k];
    m.xp += t.xp;
    m.coins = (m.coins || 0) + starsOf(t.xp);
    m.weeks = { ...m.weeks };
    const wk = weekKey(new Date(o.done[k].t || Date.now()));
    m.weeks[wk] = (Number(m.weeks[wk]) || 0) + t.xp;
  });
  const seen = new Set(m.log.map(l => l.t + ":" + l.who));
  (o.log || []).forEach(l => { if (!seen.has(l.t + ":" + l.who)) m.log.push(l); });
  m.log = m.log.sort((x, y) => y.t - x.t).slice(0, 12);
  m.updated = Math.max(n.updated, o.updated) + 1;
  return m;
}

function saveLocal() {
  if (data.bulmaca) data.bulmaca.updated = Date.now();
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

function normalizeDeleted(d) {
  const out = {};
  const limit = Date.now() - 180 * 86400000;
  if (d && typeof d === "object") {
    Object.entries(d).forEach(([id, t]) => {
      const n = Number(t) || 0;
      if (n > limit) out[id] = n;
    });
  }
  return out;
}

function normalizeData(d) {
  const out = {};
  [...SECTIONS, ...LIST_EXTRA].forEach(sec => { out[sec] = Array.isArray(d && d[sec]) ? d[sec].filter(x => x && x.id) : []; });
  out.bulmaca = normalizePuzzle(d && d.bulmaca);
  out.pets = normalizePets(d && d.pets, d && d.pet);
  out.deleted = normalizeDeleted(d && d.deleted);
  return out;
}

function looksLikeOurs(d) {
  return !!d && typeof d === "object" && SECTIONS.some(sec => Array.isArray(d[sec]));
}

const stampOf = x => Number(x.updated) || Number(x.created) || 0;

function mergeData(a, b) {
  const deleted = normalizeDeleted(a.deleted);
  Object.entries(normalizeDeleted(b.deleted)).forEach(([id, t]) => { deleted[id] = Math.max(deleted[id] || 0, t); });
  const out = {};
  [...SECTIONS, ...LIST_EXTRA].forEach(sec => {
    const m = new Map();
    [...(a[sec] || []), ...(b[sec] || [])].forEach(x => {
      if (!x || !x.id || deleted[x.id]) return;
      const cur = m.get(x.id);
      if (!cur || stampOf(x) > stampOf(cur)) m.set(x.id, x);
    });
    out[sec] = [...m.values()];
  });
  const pa = a.bulmaca, pb = b.bulmaca;
  out.bulmaca = (Number(pb && pb.updated) || 0) > (Number(pa && pa.updated) || 0) ? pb : pa;
  out.pets = {};
  Object.keys(PROFILES).forEach(k => { out.pets[k] = mergePet(a.pets && a.pets[k], b.pets && b.pets[k]); });
  out.deleted = deleted;
  return out;
}

function sigOf(d) {
  return [...SECTIONS, ...LIST_EXTRA].map(sec => (d[sec] || []).map(x => x.id + ":" + stampOf(x)).sort().join(",")).join("|") +
    "|" + Object.keys(d.deleted || {}).sort().join(",") +
    "|" + ((d.bulmaca && d.bulmaca.updated) || 0) +
    "|" + Object.keys(PROFILES).map(k => (d.pets && d.pets[k] && d.pets[k].updated) || 0).join(",");
}

function adopt(next) {
  if (sigOf(next) === sigOf(data)) return false;
  const oldPz = data.bulmaca;
  data = next;
  if (data.bulmaca !== oldPz) {
    pzSel = null;
    pzBad = new Set();
    pzWarned = false;
  }
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch {}
  render();
  checkLetters();
  return true;
}

function loadCloud() {
  if (DEFAULT_KEY && DEFAULT_BIN) return { key: DEFAULT_KEY, bin: DEFAULT_BIN, shared: true };
  try {
    const c = JSON.parse(localStorage.getItem(CLOUD_KEY) || "null");
    if (c && c.key && c.bin) return c;
  } catch {}
  return null;
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
    headers: { "X-Master-Key": c.key, "X-Bin-Meta": "false" },
    cache: "no-store"
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
    headers: { "Content-Type": "application/json", "X-Master-Key": key, "X-Bin-Private": "true", "X-Bin-Name": BIN_NAME },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw await responseError(res);
  const j = await res.json();
  const id = j && j.metadata && j.metadata.id;
  if (!id) throw new Error("Bin oluşturulamadı.");
  return id;
}

async function listBins(key) {
  const out = [];
  let last = "";
  for (let page = 0; page < 20; page++) {
    const res = await fetch(`${API_ROOT}/c/uncategorized/bins${last ? "/" + encodeURIComponent(last) : ""}`, {
      headers: { "X-Master-Key": key, "X-Sort-Order": "ascending" },
      cache: "no-store"
    });
    if (!res.ok) throw await responseError(res);
    const arr = await res.json();
    if (!Array.isArray(arr) || !arr.length) break;
    arr.forEach(x => {
      const id = x.record || x.id || (x.metadata && x.metadata.id);
      if (!id) return;
      out.push({
        id,
        name: (x.snippetMeta && x.snippetMeta.name) || x.name || (x.metadata && x.metadata.name) || "",
        at: Date.parse(x.createdAt || (x.metadata && x.metadata.createdAt) || "") || 0
      });
    });
    if (arr.length < 10) break;
    last = out[out.length - 1].id;
  }
  return out;
}

async function resolveSharedBin() {
  const key = DEFAULT_KEY;
  const bins = await listBins(key);
  const named = bins.filter(b => b.name === BIN_NAME);
  const cands = (named.length ? named : bins).slice(0, 15);
  if (cloud && cloud.bin && !cands.some(b => b.id === cloud.bin)) cands.push({ id: cloud.bin, at: Infinity });
  const found = [];
  for (const b of cands) {
    try {
      const rec = await cloudRead({ key, bin: b.id });
      if (looksLikeOurs(rec)) found.push({ ...b, rec });
    } catch {}
  }
  let merged = data;
  found.forEach(f => { merged = mergeData(merged, normalizeData(f.rec)); });
  let main;
  if (found.length) {
    found.sort((x, y) => x.at - y.at);
    main = found[0].id;
  } else {
    main = await cloudCreate(key, merged);
  }
  storeCloud({ key, bin: main, shared: true });
  merged = mergeData(data, merged);
  await cloudWrite(cloud, merged);
  lastRemote = merged;
  markClean();
  adopt(merged);
}

function schedulePush() {
  if (!cloud) return;
  pendingPush = true;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(pushNow, 800);
}

async function pushNow() {
  if (!cloud || !cloud.shared || !pendingPush) return;
  if (pushing) {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushNow, 800);
    return;
  }
  pushing = true;
  pendingPush = false;
  try {
    const remote = normalizeData(await cloudRead(cloud));
    const merged = mergeData(data, remote);
    if (sigOf(merged) !== sigOf(remote)) await cloudWrite(cloud, merged);
    lastRemote = merged;
    markClean();
    adopt(mergeData(data, merged));
  } catch {
    pendingPush = true;
    toast("Buluta kaydedilemedi, kayıtların bu cihazda duruyor.");
  } finally {
    pushing = false;
  }
}

async function pullNow() {
  if (!cloud || !cloud.shared || pushing) return;
  try {
    const remote = normalizeData(await cloudRead(cloud));
    lastRemote = remote;
    const merged = mergeData(data, remote);
    adopt(merged);
    if (isDirty() || sigOf(merged) !== sigOf(remote)) {
      pendingPush = true;
      schedulePush();
    }
  } catch {}
}

function startPolling() {
  if (pollTimer) return;
  pollTimer = setInterval(() => {
    if (document.hidden || !$("login").hidden || pendingPush) return;
    if (Date.now() - lastActive > IDLE_MS) return;
    pullNow();
  }, POLL_MS);
}

async function syncOnOpen() {
  if (!DEFAULT_KEY) return;
  if (!cloud || !cloud.shared) {
    try {
      await resolveSharedBin();
    } catch {
      toast("Ortak kayıtlara ulaşılamadı, bu cihazdaki kayıtlar gösteriliyor.");
      return;
    }
  } else {
    await pullNow();
  }
  petSynced = true;
  claimWeekPrize();
  checkLetters();
  startPolling();
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
  petShow = p;
  petRenaming = false;
  document.documentElement.dataset.theme = p;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = p === "dodom" ? "#050810" : "#2B1720";
  relock();
  $("login").hidden = true;
  $("loginPw").value = "";
  render();
  window.scrollTo(0, 0);
  claimWeekPrize();
  setTimeout(checkLetters, 400);
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
  ${authorLine(n)}
  ${editBtn(sec, n.id)}
</article>`;

const taskCard = (sec, x, sub = "") => `<article class="item task ${x.done ? "done" : ""}">
  <input type="checkbox" class="check" data-action="toggle" data-sec="${sec}" data-id="${esc(x.id)}" ${x.done ? "checked" : ""} aria-label="Tamamlandı olarak işaretle">
  <div><span class="item-title">${esc(x.title)}</span>${sub}${authorLine(x)}</div>
  ${editBtn(sec, x.id)}
</article>`;

const noteLine = t => (t ? `<p class="film-note">${esc(t)}</p>` : "");

const authorLine = x => (PROFILES[x.author] ? `<p class="author" data-who="${x.author}">${esc(PROFILES[x.author])} tarafından girildi</p>` : "");

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
      ${authorLine(a)}
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
        ${authorLine(r)}
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
      ${authorLine(e)}
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
      ${authorLine(f)}
      ${editBtn("films", f.id)}
    </article>`;
  },
  favorites: f => `<article class="item fav">
      <div class="item-head"><span class="item-title">${esc(f.title)}</span>${extLink(f.url, (FAV_KINDS.find(x => x.k === f.kind) || { link: "Aç" }).link)}</div>
      ${tags([f.kind])}
      ${noteLine(f.note)}
      ${authorLine(f)}
      ${editBtn("favorites", f.id)}
    </article>`,
  doodle: d => {
    const st = d.sale === "Satılık" ? "on" : d.sale === "Satıldı" ? "done" : "";
    return `<article class="item doodle ${st ? "sale-" + st : ""}">
      <span class="item-title">${esc(d.title)}</span>
      ${st ? tags([d.sale, st === "on" ? d.price : ""]) : ""}
      ${String(d.img || "").startsWith("data:image/") ? `<img class="doodle-img" src="${esc(d.img)}" alt="${esc(d.title)}">` : ""}
      ${noteLine(d.note)}
      ${authorLine(d)}
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
      ${authorLine(m)}
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
  if (sec === "letters") {
    const n = unreadCount();
    return n ? `${n} okunmamış not` : data.letters.length ? `${data.letters.length} not` : "Henüz boş";
  }
  if (sec === "pet") {
    const pet = myPet();
    const t = petAllTasks(pet);
    const d = t.filter(x => petDone(pet)[x.id]).length;
    return `${d}/${t.length} görev, seviye ${petLevel(pet)}`;
  }
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
    `<button class="nav-item" type="button" data-open="${n.id}">${iconSvg(n.id)}<span>${esc(n.name)}</span>${n.id === "letters" ? '<b class="nav-badge" data-badge="letters" hidden></b>' : ""}</button>`
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
    const favs = sec === "favorites"
      ? `<div class="fav-adds" role="group" aria-label="Favori ekle">${FAV_KINDS.map(x => `<button type="button" class="btn small" data-add="favorites" data-kind="${esc(x.k)}">+ ${esc(x.add)}</button>`).join("")}</div>
        <div class="filters" id="favFilters" role="group" aria-label="Filtre"></div>`
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
      ${filters}${sfilters}${favs}
      <div class="${STACKS.includes(sec) ? "stack" : "grid"}" id="list-${sec}"></div>
    </section>`;
  }).join("") + '<section class="view" data-sec="pet" id="petView" hidden></section><section class="view" data-sec="letters" id="lettersView" hidden></section>';
}

function renderSection(sec) {
  const q = searchQ[sec] || "";
  let pool = data[sec].filter(i => matches(i, q));
  if (sec === "films" && filmFilter !== "all") pool = pool.filter(f => (filmFilter === "done") === !!f.watched);
  if (sec === "doodle" && saleFilter !== "all") pool = pool.filter(x => x.sale === saleFilter);
  if (sec === "favorites") {
    const counts = {};
    data.favorites.forEach(x => { counts[x.kind] = (counts[x.kind] || 0) + 1; });
    const kinds = FAV_KINDS.filter(x => counts[x.k]);
    if (favFilter !== "all" && !counts[favFilter]) favFilter = "all";
    $("favFilters").innerHTML = kinds.length > 1
      ? [`<button type="button" class="chip" data-ffilter="all" aria-pressed="${favFilter === "all"}">Hepsi</button>`]
        .concat(kinds.map(x => `<button type="button" class="chip" data-ffilter="${esc(x.k)}" aria-pressed="${favFilter === x.k}">${esc(x.k)} (${counts[x.k]})</button>`)).join("")
      : "";
    if (favFilter !== "all") pool = pool.filter(x => x.kind === favFilter);
  }
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

  const todayMood = data.mood.find(m => m.date === today && m.author === profile);
  const moodCard = `<section class="card" data-tone="mood">
    <header class="card-head"><span class="card-icon">${iconSvg("mood")}</span><h3>Bugün nasıl hissediyorsun?</h3></header>
    <div class="mood-pick">${MOODS.map(m => {
      const [emoji, ...rest] = m.split(" ");
      const label = rest.join(" ");
      return `<button type="button" class="mood-btn ${todayMood && todayMood.mood === m ? "on" : ""}" data-action="quickmood" data-val="${esc(m)}" title="${esc(label)}" aria-label="${esc(label)}">${emoji}</button>`;
    }).join("")}</div>
    <button class="link-btn" type="button" data-open="mood">Hissettiklerime git →</button>
  </section>`;

  const pet = myPet();
  const ps = petNow(pet);
  const ptasks = petAllTasks(pet);
  const pdone = ptasks.filter(t => petDone(pet)[t.id]).length;
  const others = Object.keys(PROFILES).filter(k => k !== profile).map(k => {
    const op = data.pets[k];
    const os = petNow(op);
    const ot = petAllTasks(op);
    return `<button type="button" class="pet-other" data-open="pet" data-pet-show="${k}">${petSvg(op, os, petMood(os), petStage(op))}<span><strong>${esc(op.name)}</strong> ${esc(PROFILES[k])}'un, ${ot.filter(t => petDone(op)[t.id]).length}/${ot.length} görev</span></button>`;
  }).join("");
  const petCard = `<section class="card" data-tone="pet">
    <header class="card-head"><span class="card-icon">${iconSvg("pet")}</span><h3>${esc(pet.name)}</h3></header>
    <div class="pet-mini">${petSvg(pet, ps, petMood(ps), petStage(pet))}<div><p>${esc(petSays(pet, ps))}</p><p class="mini-empty">${pdone}/${ptasks.length} görev tamam</p></div></div>
    ${others}
    <button class="link-btn" type="button" data-open="pet" data-pet-show="${profile}">Canavarıma git →</button>
  </section>`;

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
        <div class="hero-chips">
          ${unreadCount() ? `<button class="hero-chip" type="button" data-open="letters">💌 ${unreadCount()} yeni not</button>` : ""}
          <button class="hero-chip" type="button" data-open="word">Bulmaca${solved ? `: ${solved} çözüldü` : ""}</button>
        </div>
      </div>
    </div>
    <div class="cards four">${["notes", "emails", "accounts", "recipes"].map(miniCard).join("")}</div>
    <div class="cards two">${petCard}${moodCard}</div>
    <h3 class="section-title">Daha fazlası için</h3>
    <div class="tiles">${tiles}</div>`;
}

function quickMood(val) {
  const now = Date.now();
  const day = todayStr();
  const m = data.mood.find(x => x.date === day && x.author === profile);
  if (m) {
    m.mood = val;
    m.updated = now;
  } else {
    data.mood.push({ id: newId(), created: now, updated: now, author: profile, title: "Günün ruh hali", date: day, mood: val, body: "", gratitude: "" });
  }
  petMark("mood");
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

let navDepth = 0;

function updateBack() {
  const b = $("backBtn");
  if (b) b.hidden = active === "home";
}

function goBack() {
  document.body.classList.remove("nav-open");
  if (active === "search") {
    $("gsearch").value = "";
    openView(beforeSearch, false);
    return;
  }
  if (navDepth > 0) {
    history.back();
    return;
  }
  openView("home", true, true);
  try { history.replaceState({ sec: "home" }, "", "#home"); } catch {}
}

function openView(sec, fromUser, fromHistory) {
  if (sec !== "search" && !VIEW_IDS.includes(sec)) sec = "home";
  if (sec === "accounts" && !accountsUnlocked) {
    if (fromUser) askLock().then(ok => { if (ok) openView("accounts", true); });
    if (fromUser) return;
    sec = "home";
  }
  const prev = active;
  active = sec;
  if (sec === "pet") petRenaming = false;
  if (fromUser && !fromHistory && sec !== prev && sec !== "search") {
    try {
      history.pushState({ sec }, "", "#" + sec);
      navDepth++;
    } catch {}
  }
  updateBack();
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
  renderPet();
  renderLetters();
  renderHome();
  updateBadges();
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
  const presetKind = !item && preset && FAV_KINDS.find(x => x.k === preset.kind);
  $("editorTitle").textContent = item ? "Düzenle" : presetKind ? presetKind.add : views[sec].add;
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

document.addEventListener("click", async e => {
  if (await petClick(e)) return;
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
    openEditor(add.dataset.add, null, add.dataset.kind ? { kind: add.dataset.kind } : null);
    return;
  }
  const ff = e.target.closest("[data-ffilter]");
  if (ff) {
    favFilter = ff.dataset.ffilter;
    renderSection("favorites");
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
    if (sec === "plans" && item.done) petMark("plan");
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
    data[current].push({ id: newId(), created: now, updated: now, author: profile, ...(extras[current] || {}), ...values });
    if (current === "notes" || current === "ideas") petMark("note");
    if (current === "mood" && values.date === todayStr()) petMark("mood");
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
  data.deleted[editingId] = Date.now();
  data[current] = data[current].filter(x => x.id !== editingId);
  save();
  $("editor").close();
  render();
  toast("Silindi");
});

window.addEventListener("online", () => {
  if (!cloud) return;
  if (pendingPush) pushNow();
  else pullNow();
});

window.addEventListener("focus", () => { if (!pendingPush) pullNow(); });

["pointerdown", "keydown", "scroll", "touchstart"].forEach(ev => {
  window.addEventListener(ev, () => {
    const wasIdle = Date.now() - lastActive > IDLE_MS;
    lastActive = Date.now();
    if (wasIdle && cloud && !pendingPush) pullNow();
  }, { passive: true });
});

window.addEventListener("pagehide", () => {
  if (cloud && cloud.shared && pendingPush) {
    clearTimeout(pushTimer);
    const body = lastRemote ? mergeData(data, lastRemote) : data;
    cloudWrite(cloud, body, true).then(markClean).catch(() => {});
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
    if (cloud && !pendingPush) pullNow();
  }
});

/* ---------- Başlangıç ---------- */

window.addEventListener("popstate", e => {
  document.querySelectorAll("dialog[open]").forEach(d => d.close());
  document.body.classList.remove("nav-open");
  navDepth = Math.max(0, navDepth - 1);
  openView((e.state && e.state.sec) || "home", false, true);
  window.scrollTo(0, 0);
});

data = load();
$("menuBtn").insertAdjacentHTML("afterend", '<button class="back-btn" id="backBtn" type="button" aria-label="Geri" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg><span>Geri</span></button>');
$("backBtn").addEventListener("click", goBack);
document.body.insertAdjacentHTML("beforeend", `<dialog id="letterBox" class="confirm letter-dlg">
  <form method="dialog">
    <div id="letterPaper"></div>
    <div class="confirm-actions">
      <button type="submit" value="later" class="btn">Sonra</button>
      <button type="submit" value="read" class="btn primary">Okudum ♡</button>
    </div>
  </form>
</dialog>`);
$("letterBox").addEventListener("close", () => {
  const d = $("letterBox");
  if (d.returnValue === "read") readLetter(d.dataset.id);
  else letterSkip.add(d.dataset.id);
  setTimeout(checkLetters, 350);
});
buildNav();
buildViews();
try { active = localStorage.getItem(VIEW_KEY) || "home"; } catch {}
const startHash = location.hash.slice(1);
if (VIEW_IDS.includes(startHash)) active = startHash;
openView(active, false);
try { history.replaceState({ sec: active }, "", "#" + active); } catch {}
render();
tick();
setInterval(tick, 30000);
setInterval(() => {
  if (document.hidden) return;
  const pv = $("petView");
  if (active === "pet" && pv && !pv.contains(document.activeElement)) renderPet();
  if (active === "home") renderHome();
}, 300000);
syncOnOpen();
