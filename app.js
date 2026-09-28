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
  { id: "word", name: "Kelime oyunu", hint: "Kelimeyi 6 hakta bul" },
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
  word: '<rect x="3" y="6" width="5" height="5" rx="1"/><rect x="9.5" y="6" width="5" height="5" rx="1"/><rect x="16" y="6" width="5" height="5" rx="1"/><path d="M3 15h18M3 19h12"/>',
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
  d.word = normalizeWord(d.word);
  return d;
}

function normalizeWord(w) {
  const out = Object.assign({ played: 0, won: 0, streak: 0, best: 0, cur: null }, w && typeof w === "object" ? w : {});
  if (!out.cur || typeof out.cur.word !== "string" || !Array.isArray(out.cur.guesses)) out.cur = null;
  return out;
}

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---------- Kelime oyunu ---------- */

const WORDS = [
  "KALEM", "KİTAP", "MASAL", "GÜNEŞ", "DENİZ", "ÇİÇEK", "SEVGİ", "HAYAT", "BULUT", "KÖPEK",
  "BALIK", "ÇOCUK", "ARABA", "DÜNYA", "GÜZEL", "MUTLU", "ELMAS", "ŞEKER", "ÇANTA", "KAHVE",
  "LİMON", "ZAMAN", "ÇAYIR", "TATLI", "MELEK", "ÖZLEM", "RESİM", "HAYAL", "GÜLÜŞ", "ÇİLEK",
  "KİRAZ", "ARMUT", "ÇORBA", "PİLAV", "SAHİL", "YAZAR", "BAHAR", "SABAH", "AKŞAM", "HAFTA",
  "MÜZİK", "ŞARKI", "SANAT", "GİTAR", "KOLYE", "YÜZÜK", "GÖLGE", "DALGA", "ORMAN", "NEHİR",
  "KAYIK", "BEBEK", "ANNEM", "PERDE", "SOFRA", "TABAK", "KAŞIK", "ÇATAL", "GURUR", "SABIR",
  "HUZUR", "KEYİF", "AŞKIM", "CANIM", "SEVDA", "GÖNÜL", "YILAN", "TİLKİ", "ASLAN", "ZEBRA",
  "PANDA", "KUZEY", "GÜNEY", "ŞÖLEN", "DÜĞÜN", "SAKİN", "TEPSİ", "KUMRU", "KARGA", "SERÇE"
];
const ALPHABET = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ";
const KB = ["ERTYUIOPĞÜ", "ASDFGHJKLŞİ", "ZCVBNMÖÇ"];
const MAX_TRY = 6;
let wordInput = "";

function freshGame() {
  return { word: WORDS[Math.floor(Math.random() * WORDS.length)], guesses: [], done: false, won: false };
}

function scoreGuess(g, w) {
  const a = [...g];
  const b = [...w];
  const res = Array(5).fill("miss");
  const left = {};
  for (let i = 0; i < 5; i++) {
    if (a[i] === b[i]) res[i] = "hit";
    else left[b[i]] = (left[b[i]] || 0) + 1;
  }
  for (let i = 0; i < 5; i++) {
    if (res[i] !== "hit" && left[a[i]] > 0) {
      res[i] = "near";
      left[a[i]]--;
    }
  }
  return res;
}

function keyStates(cur) {
  const rank = { miss: 1, near: 2, hit: 3 };
  const st = {};
  cur.guesses.forEach(g => {
    const chars = [...g];
    scoreGuess(g, cur.word).forEach((r, i) => {
      if (!st[chars[i]] || rank[r] > rank[st[chars[i]]]) st[chars[i]] = r;
    });
  });
  return st;
}

function renderWord() {
  const w = data.word;
  if (!w.cur) w.cur = freshGame();
  const cur = w.cur;
  const typed = [...wordInput];
  const rows = [];
  for (let r = 0; r < MAX_TRY; r++) {
    let cells;
    if (r < cur.guesses.length) {
      const chars = [...cur.guesses[r]];
      const sc = scoreGuess(cur.guesses[r], cur.word);
      cells = chars.map((ch, i) => `<span class="w-t ${sc[i]}">${esc(ch)}</span>`).join("");
    } else if (r === cur.guesses.length && !cur.done) {
      cells = Array.from({ length: 5 }, (_, i) => `<span class="w-t ${typed[i] ? "fill" : ""}">${esc(typed[i] || "")}</span>`).join("");
    } else {
      cells = '<span class="w-t"></span>'.repeat(5);
    }
    rows.push(`<div class="w-row">${cells}</div>`);
  }
  const st = keyStates(cur);
  const kb = KB.map((row, ri) => `<div class="w-kb">${ri === 2 ? '<button type="button" class="w-k wide" data-wkey="ENTER">Gir</button>' : ""}${[...row].map(l => `<button type="button" class="w-k ${st[l] || ""}" data-wkey="${l}">${l}</button>`).join("")}${ri === 2 ? '<button type="button" class="w-k wide" data-wkey="DEL" aria-label="Sil">⌫</button>' : ""}</div>`).join("");
  const msg = cur.done
    ? (cur.won ? `Bildin! Kelime ${cur.word}.` : `Olmadı, kelime ${cur.word}.`)
    : `${MAX_TRY - cur.guesses.length} hakkın var. Yeşil doğru yerde, sarı yanlış yerde.`;
  $("wordView").innerHTML = `
    <header class="view-head">
      <div class="view-title">
        <span class="view-icon" aria-hidden="true">${iconSvg("word")}</span>
        <div><h2>Kelime oyunu</h2><p class="view-sub">${w.played ? `${w.played} oyun, ${w.won} galibiyet, ${w.streak} seri, en iyi ${w.best}` : "5 harfli gizli kelimeyi 6 hakta bul"}</p></div>
      </div>
      <div class="view-tools"><button class="btn primary" type="button" data-wnew="1">Yeni kelime</button></div>
    </header>
    <div class="w-wrap">
      <p class="w-msg" role="status">${esc(msg)}</p>
      <div class="w-grid">${rows.join("")}</div>
      ${kb}
    </div>`;
}

function handleWordKey(k) {
  const cur = data.word.cur;
  if (!cur || cur.done) return;
  if (k === "ENTER") {
    submitGuess();
    return;
  }
  if (k === "DEL") wordInput = [...wordInput].slice(0, -1).join("");
  else if ([...wordInput].length < 5) wordInput += k;
  renderWord();
}

function submitGuess() {
  const w = data.word;
  const cur = w.cur;
  if ([...wordInput].length < 5) {
    toast("5 harfli bir kelime yaz");
    return;
  }
  const won = wordInput === cur.word;
  cur.guesses.push(wordInput);
  wordInput = "";
  if (won || cur.guesses.length >= MAX_TRY) {
    cur.done = true;
    cur.won = won;
    w.played++;
    if (won) {
      w.won++;
      w.streak++;
      w.best = Math.max(w.best, w.streak);
    } else {
      w.streak = 0;
    }
  }
  save();
  renderWord();
  renderHome();
  if (cur.done) toast(won ? "Tebrikler, buldun!" : `Kelime: ${cur.word}`);
}

function newWordGame() {
  const w = data.word;
  if (w.cur && !w.cur.done && w.cur.guesses.length) {
    w.played++;
    w.streak = 0;
  }
  w.cur = freshGame();
  wordInput = "";
  save();
  renderWord();
  renderHome();
}

document.addEventListener("keydown", e => {
  if (active !== "word" || !$("login").hidden || document.querySelector("dialog[open]")) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
  if (e.key === "Enter") {
    if (t && t.tagName === "BUTTON") return;
    e.preventDefault();
    handleWordKey("ENTER");
  } else if (e.key === "Backspace") {
    e.preventDefault();
    handleWordKey("DEL");
  } else if (e.key.length === 1) {
    const ch = e.key.toLocaleUpperCase("tr");
    if (ALPHABET.includes(ch)) handleWordKey(ch);
  }
});

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
  out.word = normalizeWord(d && d.word);
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
      data = normalizeData(rec);
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
    const w = data.word;
    return w.played ? `${w.won} galibiyet, ${w.streak} seri` : "Hemen dene";
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

  $("home").innerHTML = `
    <div class="top-row">
      <div class="hero">
        <div>
          <h1>${greeting()} ${esc(PROFILES[profile])} <span class="heart" aria-hidden="true">♡</span></h1>
          <p class="hero-sub">Bugün harika şeyler başarabilirsin.</p>
        </div>
        <p class="hero-quote">${esc(quoteOf(0))}</p>
        <button class="hero-chip" type="button" data-open="word">Kelime oyunu${data.word.played ? `: ${data.word.won} galibiyet` : ""}</button>
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
  const wk = e.target.closest("[data-wkey]");
  if (wk) {
    handleWordKey(wk.dataset.wkey);
    return;
  }
  if (e.target.closest("[data-wnew]")) {
    newWordGame();
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
