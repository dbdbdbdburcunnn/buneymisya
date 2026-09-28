const STORE_KEY = "defterim.data";
const CLOUD_KEY = "defterim.cloud";
const DIRTY_KEY = "defterim.dirty";
const API = "https://api.jsonbin.io/v3/b";
const DEFAULT_KEY = "$2a$10$SK5kRKhW5Chnu0LRk2v90ONtlnP8GRAJVkgb21zEfkCt.TT0vxL9y";
const DEFAULT_BIN = "";
const VIEW_KEY = "defterim.view";
const OWNER = "Neri"; // Kenar çubuğunda ve karşılama mesajında görünen isim
const SECTIONS = [
  "accounts", "recipes", "notes", "plans", "films", "goals",
  "emails", "shopping", "health", "growth", "favorites", "doodle",
  "voice", "mood", "ideas", "wishlist", "countdown"
];
const STACKS = ["recipes", "plans", "shopping", "growth", "wishlist"];
const XP_STEP = 10;
const XP_WIN = 100;
const XP_LEVEL = 200;
const LEVEL_NAMES = ["Çaylak", "Hevesli", "Kararlı", "Azimli", "Disiplinli", "Usta", "Şampiyon", "Efsane"];
const BADGES = [
  { id: "first-step", name: "İlk adım", test: g => g.steps >= 1 },
  { id: "first-win", name: "İlk zafer", test: g => g.wins >= 1 },
  { id: "streak-3", name: "3 gün seri", test: g => g.bestStreak >= 3 },
  { id: "streak-7", name: "7 gün seri", test: g => g.bestStreak >= 7 },
  { id: "wins-5", name: "5 hedef", test: g => g.wins >= 5 },
  { id: "steps-100", name: "100 adım", test: g => g.steps >= 100 },
  { id: "xp-1000", name: "Bin puan", test: g => g.xp >= 1000 },
  { id: "streak-30", name: "30 gün seri", test: g => g.bestStreak >= 30 }
];
const MOODS = ["😊 Harika", "🙂 İyi", "😐 Fena değil", "😔 Üzgün", "😣 Stresli"];
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
  shopping: ["Alındı", "Listeye geri döndü"],
  wishlist: ["Harika, aldın!", "Listeye geri döndü"],
  growth: ["Tamamlandı, tebrikler!", "Yeniden açıldı"]
};
const WEEK = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const NAV = [
  { id: "home", name: "Ana sayfa" },
  { id: "notes", name: "Notlar", hint: "Düşünceler, fikirler, yapılacaklar" },
  { id: "emails", name: "E-posta adresleri", hint: "Kişisel ve önemli e-postalar" },
  { id: "accounts", name: "Şifreler", hint: "Güvenli giriş bilgilerin" },
  { id: "recipes", name: "Tarifler", hint: "Lezzetli tarifler, favorilerin" },
  { id: "goals", name: "Hedefler", hint: "Hayallerine giden yol" },
  { id: "plans", name: "Planlar", hint: "Yapacaklarını listele" },
  { id: "calendar", name: "Takvim", hint: "Planla, organize et" },
  { id: "shopping", name: "Alışveriş listesi", hint: "Eksikler, ihtiyaçlar" },
  { id: "health", name: "Sağlık ve spor", hint: "Su, spor, uyku takibi" },
  { id: "growth", name: "Kişisel gelişim", hint: "Oku, öğren, büyü" },
  { id: "films", name: "Film ve dizi", hint: "İzlenecekler ve puanların" },
  { id: "favorites", name: "Favoriler", hint: "Siteler, müzikler, filmler" },
  { id: "doodle", name: "Doodle ve ilham", hint: "Çiz, hayal et, tasarla" },
  { id: "voice", name: "Sesli notlar", hint: "Konuş, yazıya dönüşsün" },
  { id: "mood", name: "Duygu günlüğü", hint: "Hislerini yaz, hafifle" },
  { id: "ideas", name: "Fikir kutusu", hint: "Aklına gelen her şey" },
  { id: "wishlist", name: "İstek listem", hint: "Hayali kur, biriktir" },
  { id: "countdown", name: "Geri sayımlar", hint: "Özel günler, tatiller" }
];
const HOME_TILES = ["health", "growth", "films", "favorites", "doodle", "voice", "mood", "ideas", "wishlist", "countdown"];
const VIEW_IDS = ["home", "calendar", ...SECTIONS];
const nameOf = id => (NAV.find(n => n.id === id) || {}).name || id;

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M10 20v-5h4v5"/>',
  notes: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  emails: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  accounts: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  recipes: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M8 7c0-1.5 1-2 1-3.5M12 7c0-1.5 1-2 1-3.5M16 7c0-1.5 1-2 1-3.5"/>',
  goals: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  plans: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>',
  shopping: '<path d="M3 4h2.5l2 11h10l2-8H6.5"/><circle cx="9" cy="19.5" r="1.2"/><circle cx="17" cy="19.5" r="1.2"/>',
  health: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>',
  growth: '<path d="M12 21v-8"/><path d="M12 13c0-3.5-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5Z"/><path d="M12 15c0-3 2-5 6-5 0 3-2 5-6 5Z"/>',
  films: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  favorites: '<path d="m12 3.5 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.9l6-.9Z"/>',
  doodle: '<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.8 2-1.7 0-1.2-1-1.6-1-2.6 0-.9.7-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3Z"/><path d="M7.5 11h.01M10 7.5h.01M14.5 7.5h.01"/>',
  voice: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>',
  mood: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.2 4.2 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  ideas: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  wishlist: '<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M3 9h18M12 9v11M12 9S9 8.5 8.5 6.5 10 4 12 6c2-2 3.5-.5 3.5.5S12 9 12 9Z"/>',
  countdown: '<path d="M7 3h10M7 21h10M8 3c0 5 4 5 4 9s-4 4-4 9M16 3c0 5-4 5-4 9s4 4 4 9"/>'
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
let recognizer = null;
const searchQ = {};
const calState = { y: new Date().getFullYear(), m: new Date().getMonth(), sel: "" };
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
  goals: {
    add: "Hedef ekle",
    empty: "Henüz hedef yok. Küçük bir hedefle başla, her adımda puan kazan.",
    fields: [
      { name: "title", label: "Hedef", placeholder: "Kitap oku, spor yap, su iç…", required: true },
      { name: "target", label: "Kaç kez?", type: "number", placeholder: "30" },
      { name: "unit", label: "Birim", placeholder: "gün, sayfa, antrenman…" },
      { name: "deadline", label: "Son tarih", type: "date" },
      { name: "reward", label: "Tamamlayınca ödülün", placeholder: "Sevdiğin restorana git…" }
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
  shopping: {
    add: "Ürün ekle",
    clear: true,
    empty: "Liste boş. Eksiklerini “Ürün ekle” ile yaz.",
    fields: [
      { name: "title", label: "Ne alınacak?", required: true },
      { name: "qty", label: "Miktar", placeholder: "2 kg, 1 paket…" }
    ]
  },
  health: {
    add: "Kayıt ekle",
    empty: "Henüz kayıt yok. Bugün yaptığın hareketi ya da içtiğin suyu “Kayıt ekle” ile yaz.",
    fields: [
      { name: "title", label: "Ne yaptın?", placeholder: "Yürüyüş, yoga, su içme…", required: true },
      { name: "kind", label: "Tür", type: "select", options: ["Spor", "Yürüyüş", "Su", "Uyku", "Beslenme", "Diğer"] },
      { name: "amount", label: "Süre ya da miktar", placeholder: "45 dk, 2 litre…" },
      { name: "date", label: "Tarih", type: "date", default: () => todayStr() },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  },
  growth: {
    add: "Ekle",
    empty: "Henüz bir şey yok. Okumak, öğrenmek ya da alışkanlık edinmek istediğin şeyi “Ekle” ile yaz.",
    fields: [
      { name: "title", label: "Ne öğreniyorsun?", placeholder: "Kitap, kurs, alışkanlık…", required: true },
      { name: "kind", label: "Tür", type: "select", options: ["Kitap", "Kurs", "Makale", "Alışkanlık", "Diğer"] },
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
    add: "İlham ekle",
    empty: "Henüz ilham yok. Aklına takılan bir fikri, rengi ya da alıntıyı “İlham ekle” ile sakla.",
    fields: [
      { name: "title", label: "Başlık", required: true },
      { name: "kind", label: "Tür", type: "select", options: ["Çizim fikri", "Renk paleti", "Alıntı", "Görsel bağlantısı", "Diğer"] },
      { name: "color", label: "Renk", type: "color" },
      { name: "url", label: "Bağlantı", placeholder: "https://" },
      { name: "body", label: "Ayrıntı", type: "textarea", rows: 4 }
    ]
  },
  voice: {
    add: "Sesli not ekle",
    empty: "Henüz sesli not yok. “Sesli not ekle” diyip konuşmaya başla, söylediklerin yazıya dönüşsün.",
    fields: [
      { name: "title", label: "Başlık", required: true },
      { name: "body", label: "Not", type: "voice", rows: 8, hint: "“Konuşarak yaz” düğmesine bas, söylediklerin yazıya dökülür." }
    ]
  },
  mood: {
    add: "Gün ekle",
    empty: "Henüz kayıt yok. Bugün nasıl hissettiğini “Gün ekle” ile yaz.",
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
  },
  countdown: {
    add: "Geri sayım ekle",
    empty: "Henüz geri sayım yok. Özel bir günü “Geri sayım ekle” ile bekle.",
    fields: [
      { name: "title", label: "Ne için?", placeholder: "Doğum günü, tatil, sınav…", required: true },
      { name: "date", label: "Tarih", type: "date", required: true },
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
  d.game = normalizeGame(d.game);
  return d;
}

function normalizeGame(g) {
  const base = { xp: 0, steps: 0, wins: 0, bestStreak: 0, days: [], badges: [] };
  const out = Object.assign(base, g && typeof g === "object" ? g : {});
  if (!Array.isArray(out.days)) out.days = [];
  if (!Array.isArray(out.badges)) out.badges = [];
  return out;
}

function levelOf(xp) {
  return Math.floor(xp / XP_LEVEL) + 1;
}

function levelName(level) {
  return LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];
}

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function currentStreak(days) {
  const set = new Set(days);
  const d = new Date();
  if (!set.has(ymd(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(ymd(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

function checkBadges() {
  const g = data.game;
  const earned = [];
  BADGES.forEach(b => {
    if (!g.badges.includes(b.id) && b.test(g)) {
      g.badges.push(b.id);
      earned.push(b.name);
    }
  });
  return earned;
}

function addXp(amount) {
  const g = data.game;
  const before = levelOf(g.xp);
  g.xp = Math.max(0, g.xp + amount);
  return levelOf(g.xp) > before;
}

function stepGoal(goal, dir) {
  const g = data.game;
  const target = Math.max(1, Number(goal.target) || 1);
  const was = Number(goal.progress) || 0;
  const wasDone = was >= target;
  if (dir > 0 && wasDone) return;
  if (dir < 0 && was <= 0) return;
  goal.progress = was + dir;
  goal.updated = Date.now();
  const nowDone = goal.progress >= target;
  let levelUp = false;
  const msgs = [];
  if (dir > 0) {
    g.steps++;
    const today = todayStr();
    if (!g.days.includes(today)) g.days.push(today);
    if (g.days.length > 400) g.days = g.days.slice(-400);
    g.bestStreak = Math.max(g.bestStreak, currentStreak(g.days));
    levelUp = addXp(XP_STEP) || levelUp;
    if (nowDone && !wasDone) {
      g.wins++;
      goal.doneAt = Date.now();
      levelUp = addXp(XP_WIN) || levelUp;
      msgs.push(goal.reward ? `Hedef tamamlandı, +${XP_STEP + XP_WIN} puan! Ödülün: ${goal.reward}` : `Hedef tamamlandı, +${XP_STEP + XP_WIN} puan!`);
    } else {
      msgs.push(`+${XP_STEP} puan`);
    }
  } else {
    g.steps = Math.max(0, g.steps - 1);
    addXp(-XP_STEP);
    if (wasDone && !nowDone) {
      g.wins = Math.max(0, g.wins - 1);
      addXp(-XP_WIN);
      delete goal.doneAt;
    }
    msgs.push("Bir adım geri alındı");
  }
  const badges = checkBadges();
  if (levelUp) {
    const lv = levelOf(g.xp);
    msgs.unshift(`Seviye atladın! Seviye ${lv}: ${levelName(lv)}`);
  }
  if (badges.length) msgs.push(`Yeni rozet: ${badges.join(", ")}`);
  save();
  render();
  toast(msgs.join(". "));
  if (levelUp) flash($("game"), "levelup");
  if (nowDone && !wasDone) {
    const card = document.querySelector(`.goal[data-goal="${CSS.escape(goal.id)}"]`);
    if (card) flash(card, "win");
  }
}

function flash(el, cls) {
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 1000);
}

function renderGame() {
  const g = data.game;
  const lv = levelOf(g.xp);
  const into = g.xp % XP_LEVEL;
  const streak = currentStreak(g.days);
  $("game").innerHTML = `
    <div class="level-badge" aria-hidden="true">${lv}</div>
    <div>
      <div class="level-name">Seviye ${lv}: ${esc(levelName(lv))}</div>
      <div class="level-sub">${g.xp} puan, sonraki seviyeye ${XP_LEVEL - into} puan</div>
      <div class="xp-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${XP_LEVEL}" aria-valuenow="${into}"><div class="xp-fill" style="width:${(into / XP_LEVEL) * 100}%"></div></div>
    </div>
    <div class="streak">
      <div class="streak-num">${streak}</div>
      <div class="streak-label">gün seri</div>
    </div>
    <div class="badges">${BADGES.map(b => `<span class="badge ${g.badges.includes(b.id) ? "on" : ""}" title="${g.badges.includes(b.id) ? "Kazanıldı" : "Henüz kazanılmadı"}">${esc(b.name)}</span>`).join("")}</div>`;
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
  out.game = normalizeGame(d && d.game);
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
    headers: { "Content-Type": "application/json", "X-Master-Key": key, "X-Bin-Private": "true", "X-Bin-Name": "Defterim" },
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

function todayStr() {
  return ymd(new Date());
}

function daysUntil(s) {
  const a = new Date(s + "T00:00:00");
  const b = new Date(todayStr() + "T00:00:00");
  return Math.round((a - b) / 86400000);
}

function formatDate(ymd) {
  const d = new Date(ymd + "T00:00:00");
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
  voice: n => noteCard("voice", n),
  ideas: n => noteCard("ideas", n, tags([n.category])),
  plans: p => {
    const late = p.date && !p.done && p.date < todayStr();
    const dateText = p.date ? formatDate(p.date) : "";
    return taskCard("plans", p,
      `${dateText ? `<span class="plan-date ${late ? "late" : ""}">${esc(dateText)}${late ? ", tarihi geçti" : ""}</span>` : ""}${p.detail ? `<p class="plan-detail">${esc(p.detail)}</p>` : ""}`);
  },
  shopping: s => taskCard("shopping", s, s.qty ? `<span class="plan-date">${esc(s.qty)}</span>` : ""),
  growth: g => taskCard("growth", g, tags([g.kind]) + noteLine(g.note)),
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
  goals: g => {
    const target = Math.max(1, Number(g.target) || 1);
    const progress = Math.min(Number(g.progress) || 0, target);
    const done = progress >= target;
    const pct = Math.round((progress / target) * 100);
    const unit = g.unit ? " " + esc(g.unit) : "";
    const late = g.deadline && !done && g.deadline < todayStr();
    return `<article class="item goal ${done ? "complete" : ""}" data-goal="${esc(g.id)}">
      <span class="item-title">${esc(g.title)}</span>
      ${g.deadline ? `<span class="goal-meta ${late ? "plan-date late" : ""}">Son tarih: ${esc(formatDate(g.deadline))}${late ? ", geçti" : ""}</span>` : ""}
      ${g.reward ? `<p class="goal-reward"><span>Ödül:</span> ${esc(g.reward)}</p>` : ""}
      <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${target}" aria-valuenow="${progress}"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="goal-count">
        ${done ? `<span class="goal-done">Tamamlandı, ${target}${unit}</span>` : `<strong>${progress} / ${target}${unit}</strong>`}
        <span class="goal-btns">
          <button type="button" class="btn small" data-action="step" data-dir="-1" data-sec="goals" data-id="${esc(g.id)}" aria-label="Bir adım geri al" ${progress <= 0 ? "disabled" : ""}>−</button>
          ${done ? "" : `<button type="button" class="btn small primary" data-action="step" data-dir="1" data-sec="goals" data-id="${esc(g.id)}">+1</button>`}
        </span>
      </div>
      ${editBtn("goals", g.id)}
    </article>`;
  },
  health: h => `<article class="item health">
      <div class="health-top"><span class="item-title">${esc(h.title)}</span>${h.amount ? `<strong class="health-amount">${esc(h.amount)}</strong>` : ""}</div>
      ${tags([h.kind])}
      ${h.date ? `<span class="plan-date">${esc(formatDate(h.date))}</span>` : ""}
      ${noteLine(h.note)}
      ${editBtn("health", h.id)}
    </article>`,
  favorites: f => `<article class="item fav">
      <div class="item-head"><span class="item-title">${esc(f.title)}</span>${extLink(f.url)}</div>
      ${tags([f.kind])}
      ${noteLine(f.note)}
      ${editBtn("favorites", f.id)}
    </article>`,
  doodle: d => {
    const col = /^#[0-9a-f]{6}$/i.test(d.color || "") ? d.color : "#E8B4C0";
    return `<article class="item doodle" style="--dot:${col}">
      <div class="item-head"><span class="item-title">${esc(d.title)}</span>${extLink(d.url)}</div>
      ${tags([d.kind])}
      ${d.body ? `<p class="note-body">${esc(d.body)}</p>` : ""}
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
  },
  countdown: c => {
    const n = c.date ? daysUntil(c.date) : null;
    let big = "—";
    let small = "";
    if (n === 0) big = "Bugün";
    else if (n > 0) { big = String(n); small = "gün kaldı"; }
    else if (n < 0) { big = String(-n); small = "gün geçti"; }
    return `<article class="item count ${n !== null && n < 0 ? "past" : ""}">
      <div class="count-num"><strong>${esc(big)}</strong><span>${small}</span></div>
      <div>
        <span class="item-title">${esc(c.title)}</span>
        ${c.date ? `<span class="plan-date">${esc(formatDate(c.date))}</span>` : ""}
        ${noteLine(c.note)}
      </div>
      ${editBtn("countdown", c.id)}
    </article>`;
  }
};

const SKIP_KEYS = ["id", "password", "created", "updated", "done", "watched", "rating", "progress", "target", "doneAt", "color"];

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
  if (sec === "notes" || sec === "voice" || sec === "ideas") return list.sort((a, b) => (b.updated || 0) - (a.updated || 0));
  if (sec === "health" || sec === "mood") return list.sort(byDateDesc);
  if (sec === "shopping") return list.sort((a, b) => doneLast(a, b) || (a.created || 0) - (b.created || 0));
  if (sec === "growth") return list.sort((a, b) => doneLast(a, b) || byTitle(a, b));
  if (sec === "wishlist") {
    return list.sort((a, b) => doneLast(a, b) || PRIORITY.indexOf(a.priority) - PRIORITY.indexOf(b.priority) || byTitle(a, b));
  }
  if (sec === "countdown") {
    const key = c => {
      if (!c.date) return 1e9;
      const n = daysUntil(c.date);
      return n >= 0 ? n : 1e6 - n;
    };
    return list.sort((a, b) => key(a) - key(b));
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
  if (sec === "goals") {
    return list.sort((a, b) => {
      if (goalDone(a) !== goalDone(b)) return goalDone(a) ? 1 : -1;
      return (a.created || 0) - (b.created || 0);
    });
  }
  return list.sort(byTitle);
}

const goalDone = x => (Number(x.progress) || 0) >= Math.max(1, Number(x.target) || 1);
const goalPct = g => Math.round((Math.min(Number(g.progress) || 0, Math.max(1, Number(g.target) || 1)) / Math.max(1, Number(g.target) || 1)) * 100);

function openCountOf(sec) {
  const d = data[sec];
  if (["plans", "shopping", "growth", "wishlist"].includes(sec)) return d.filter(x => !x.done).length;
  if (sec === "films") return d.filter(f => !f.watched).length;
  if (sec === "goals") return d.filter(x => !goalDone(x)).length;
  return d.length;
}

function subtitle(sec) {
  const total = data[sec].length;
  const open = openCountOf(sec);
  if (sec === "goals") {
    const lv = levelOf(data.game.xp);
    const streak = currentStreak(data.game.days);
    return `Seviye ${lv}${streak ? `, ${streak} gün seri` : ""}`;
  }
  if (!total) return "Henüz boş";
  switch (sec) {
    case "accounts": return `${total} hesap`;
    case "recipes": return `${total} tarif`;
    case "notes": case "voice": return `${total} not`;
    case "emails": return `${total} adres`;
    case "ideas": return `${total} fikir`;
    case "favorites": return `${total} favori`;
    case "doodle": return `${total} ilham`;
    case "mood": return `${total} gün`;
    case "plans": return open ? `${open} bekleyen plan` : "Hepsi tamam";
    case "shopping": return open ? `${open} ürün alınacak` : "Liste tamam";
    case "growth": return open ? `${open} devam eden` : "Hepsi tamam";
    case "wishlist": return open ? `${open} istek` : "Hepsi tamam";
    case "films": return open ? `${open} izlenecek` : "Hepsi izlendi";
    case "health": {
      const n = data.health.filter(h => h.date && daysUntil(h.date) >= -6 && daysUntil(h.date) <= 0).length;
      return `${n} kayıt bu hafta`;
    }
    case "countdown": {
      const n = data.countdown.filter(c => c.date && daysUntil(c.date) >= 0).length;
      return n ? `${n} yaklaşan` : "Hepsi geçti";
    }
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
    const game = sec === "goals" ? `<div class="game" id="game"></div>` : "";
    const clear = v.clear ? `<button class="btn" data-clear="${sec}" type="button">Alınanları temizle</button>` : "";
    return `<section class="view" data-sec="${sec}" hidden>
      <header class="view-head">
        <div class="view-title">
          <span class="view-icon" aria-hidden="true">${iconSvg(sec)}</span>
          <div><h2>${esc(nameOf(sec))}</h2><p class="view-sub" id="s-${sec}"></p></div>
        </div>
        <div class="view-tools">
          <input type="search" data-search="${sec}" placeholder="Ara" aria-label="${esc(nameOf(sec))} içinde ara">
          ${clear}
          <button class="btn primary" data-add="${sec}" type="button">${esc(v.add)}</button>
        </div>
      </header>
      ${filters}${game}
      <div class="${STACKS.includes(sec) ? "stack" : "grid"}" id="list-${sec}"></div>
    </section>`;
  }).join("");
}

function renderSection(sec) {
  const q = searchQ[sec] || "";
  let pool = data[sec].filter(i => matches(i, q));
  if (sec === "films" && filmFilter !== "all") pool = pool.filter(f => (filmFilter === "done") === !!f.watched);
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
  const rows = sorted(sec, data[sec]).slice(0, 4).map(x => x.title);
  const list = rows.length
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
  const lv = levelOf(data.game.xp);
  const streak = currentStreak(data.game.days);
  const today = todayStr();

  const todayPlans = sorted("plans", data.plans).filter(p => !p.done && (!p.date || p.date <= today)).slice(0, 5);
  const planCard = `<section class="card plain" data-tone="plans">
    <header class="card-head"><span class="card-icon">${iconSvg("plans")}</span><h3>Bugünün planı</h3><button class="icon-btn" type="button" data-add="plans" aria-label="Plan ekle">+</button></header>
    ${todayPlans.length ? checkList("plans", todayPlans) : `<p class="mini-empty">Bugün için bekleyen plan yok. Kendine zaman ayır ♡</p>`}
    <button class="link-btn" type="button" data-open="plans">Tüm planlar →</button>
  </section>`;

  const goals = sorted("goals", data.goals).filter(g => !goalDone(g)).slice(0, 4);
  const goalCard = `<section class="card" data-tone="goals">
    <header class="card-head"><span class="card-icon">${iconSvg("goals")}</span><h3>Hedeflerim</h3><button class="icon-btn" type="button" data-add="goals" aria-label="Hedef ekle">+</button></header>
    ${goals.length
      ? `<ul class="goal-list">${goals.map(g => `<li class="goal-mini"><div class="goal-mini-top"><span>${esc(g.title)}</span><em>%${goalPct(g)}</em></div><div class="progress slim"><div class="progress-fill" style="width:${goalPct(g)}%"></div></div></li>`).join("")}</ul>`
      : `<p class="mini-empty">Küçük bir hedefle başla, her adımda puan kazan.</p>`}
    <button class="link-btn" type="button" data-open="goals">Tüm hedefler →</button>
  </section>`;

  const now = new Date();
  const monthTitle = now.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
  const calCard = `<section class="card plain" data-tone="calendar">
    <header class="card-head"><span class="card-icon">${iconSvg("calendar")}</span><h3 style="text-transform:capitalize">${esc(monthTitle)}</h3></header>
    ${monthGrid(now.getFullYear(), now.getMonth(), true)}
    <button class="link-btn" type="button" data-open="calendar">Tüm etkinlikler →</button>
  </section>`;

  const shop = sorted("shopping", data.shopping).filter(x => !x.done).slice(0, 6);
  const shopCard = `<section class="card plain" data-tone="shopping">
    <header class="card-head"><span class="card-icon">${iconSvg("shopping")}</span><h3>Alışveriş listesi</h3><button class="icon-btn" type="button" data-add="shopping" aria-label="Ürün ekle">+</button></header>
    ${shop.length ? checkList("shopping", shop) : `<p class="mini-empty">Liste boş, alınacak bir şey yok.</p>`}
    <button class="link-btn" type="button" data-open="shopping">Tüm liste →</button>
  </section>`;

  const todayMood = data.mood.find(m => m.date === today);
  const moodCard = `<section class="card" data-tone="mood">
    <header class="card-head"><span class="card-icon">${iconSvg("mood")}</span><h3>Bugün nasıl hissediyorsun?</h3></header>
    <div class="mood-pick">${MOODS.map(m => {
      const [emoji, ...rest] = m.split(" ");
      const label = rest.join(" ");
      return `<button type="button" class="mood-btn ${todayMood && todayMood.mood === m ? "on" : ""}" data-action="quickmood" data-val="${esc(m)}" title="${esc(label)}" aria-label="${esc(label)}">${emoji}</button>`;
    }).join("")}</div>
    <button class="link-btn" type="button" data-open="mood">Duygu günlüğüne git →</button>
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
          <h1>${greeting()} ${esc(OWNER)} <span class="heart" aria-hidden="true">♡</span></h1>
          <p class="hero-sub">Bugün harika şeyler başarabilirsin.</p>
        </div>
        <p class="hero-quote">${esc(quoteOf(0))}</p>
        <button class="hero-chip" type="button" data-open="goals">Seviye ${lv}: ${esc(levelName(lv))}${streak ? `, ${streak} gün seri` : ""}</button>
      </div>
      ${planCard}
    </div>
    <div class="cards four">${["notes", "emails", "accounts", "recipes"].map(miniCard).join("")}</div>
    <div class="cards three">${goalCard}${calCard}${shopCard}</div>
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

/* ---------- Takvim ---------- */

function eventMap() {
  const map = {};
  const add = d => { if (d) map[d] = (map[d] || 0) + 1; };
  data.plans.forEach(p => add(p.date));
  data.countdown.forEach(c => add(c.date));
  data.goals.forEach(g => add(g.deadline));
  return map;
}

function eventsOn(day) {
  const ev = [];
  data.plans.forEach(p => { if (p.date === day) ev.push({ sec: "plans", title: p.title, done: !!p.done }); });
  data.countdown.forEach(c => { if (c.date === day) ev.push({ sec: "countdown", title: c.title }); });
  data.goals.forEach(g => { if (g.deadline === day) ev.push({ sec: "goals", title: g.title + " (son tarih)", done: goalDone(g) }); });
  return ev;
}

function monthGrid(y, m, compact) {
  const map = eventMap();
  const today = todayStr();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const count = new Date(y, m + 1, 0).getDate();
  let cells = WEEK.map(w => `<span class="cal-h">${w}</span>`).join("");
  cells += "<span></span>".repeat(offset);
  for (let d = 1; d <= count; d++) {
    const s = ymd(new Date(y, m, d));
    const cls = ["cal-d", s === today ? "today" : "", map[s] ? "has" : "", !compact && s === calState.sel ? "sel" : ""].filter(Boolean).join(" ");
    cells += compact
      ? `<span class="${cls}">${d}</span>`
      : `<button type="button" class="${cls}" data-day="${s}" aria-label="${esc(formatDate(s))}">${d}</button>`;
  }
  return `<div class="cal-grid">${cells}</div>`;
}

function renderCalendar() {
  if (!calState.sel) calState.sel = todayStr();
  const { y, m, sel } = calState;
  const title = new Date(y, m, 1).toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
  const ev = eventsOn(sel);
  $("calendar").innerHTML = `
    <header class="view-head">
      <div class="view-title">
        <span class="view-icon" aria-hidden="true">${iconSvg("calendar")}</span>
        <div><h2>Takvim</h2><p class="view-sub">Planların, geri sayımların ve hedef tarihlerin burada</p></div>
      </div>
      <div class="view-tools"><button class="btn primary" type="button" data-addplan="${sel}">Bu güne plan ekle</button></div>
    </header>
    <div class="cal-layout">
      <section class="card plain">
        <div class="cal-nav">
          <button class="icon-btn" type="button" data-cal="prev" aria-label="Önceki ay">‹</button>
          <h3>${esc(title)}</h3>
          <button class="icon-btn" type="button" data-cal="next" aria-label="Sonraki ay">›</button>
        </div>
        ${monthGrid(y, m, false)}
        <button class="link-btn" type="button" data-cal="today">Bugüne dön</button>
      </section>
      <section class="card plain day-card">
        <h3>${esc(formatDate(sel))}</h3>
        ${ev.length
          ? `<ul class="event-list">${ev.map(e => `<li><button type="button" class="event ${e.done ? "done" : ""}" data-tone="${e.sec}" data-open="${e.sec}"><span>${esc(e.title)}</span><em>${esc(nameOf(e.sec))}</em></button></li>`).join("")}</ul>`
          : `<p class="mini-empty">Bu gün için kayıt yok.</p>`}
      </section>
    </div>`;
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
  renderGame();
  renderHome();
  renderCalendar();
  document.querySelectorAll("#filmFilters .chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.filter === filmFilter)));
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
  if (f.type === "voice") {
    return `<label for="${id}">${esc(f.label)}</label>${hint}
      <textarea id="${id}" name="${f.name}" rows="${f.rows || 6}"${ph}>${esc(value)}</textarea>
      <div class="voice-row"><button type="button" class="btn small" data-voice="${id}">Konuşarak yaz</button><span class="voice-state" id="voiceState"></span></div>`;
  }
  if (f.type === "color") {
    const v = /^#[0-9a-f]{6}$/i.test(value) ? value : "#E8B4C0";
    return `<label for="${id}">${esc(f.label)}</label><input id="${id}" name="${f.name}" type="color" class="color-input" value="${esc(v)}">`;
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
  const first = $("fields").querySelector("input, textarea, select");
  if (first) first.focus();
}

function toggleVoice(btn) {
  const state = $("voiceState");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    state.textContent = "Bu tarayıcı sesle yazmayı desteklemiyor. Chrome ya da Safari dene.";
    return;
  }
  if (recognizer) {
    recognizer.stop();
    return;
  }
  const area = $(btn.dataset.voice);
  const r = new SR();
  let failed = false;
  r.lang = "tr-TR";
  r.continuous = true;
  r.interimResults = false;
  r.onresult = ev => {
    let text = "";
    for (let i = ev.resultIndex; i < ev.results.length; i++) {
      if (ev.results[i].isFinal) text += ev.results[i][0].transcript + " ";
    }
    text = text.trim();
    if (text) area.value = (area.value.trim() ? area.value.trim() + " " : "") + text;
  };
  r.onerror = () => {
    failed = true;
    state.textContent = "Mikrofona erişilemedi. Tarayıcı iznini kontrol et.";
  };
  r.onend = () => {
    recognizer = null;
    btn.textContent = "Konuşarak yaz";
    if (!failed) state.textContent = "";
  };
  recognizer = r;
  btn.textContent = "Durdur";
  state.textContent = "Dinliyorum…";
  r.start();
}

/* ---------- Olaylar ---------- */

document.addEventListener("click", e => {
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
  const addPlan = e.target.closest("[data-addplan]");
  if (addPlan) {
    openEditor("plans", null, { date: addPlan.dataset.addplan });
    return;
  }
  const day = e.target.closest("[data-day]");
  if (day) {
    calState.sel = day.dataset.day;
    renderCalendar();
    return;
  }
  const cal = e.target.closest("[data-cal]");
  if (cal) {
    const dir = cal.dataset.cal;
    if (dir === "today") {
      const n = new Date();
      calState.y = n.getFullYear();
      calState.m = n.getMonth();
      calState.sel = todayStr();
    } else {
      calState.m += dir === "next" ? 1 : -1;
      if (calState.m < 0) { calState.m = 11; calState.y--; }
      if (calState.m > 11) { calState.m = 0; calState.y++; }
    }
    renderCalendar();
    return;
  }
  const filter = e.target.closest("[data-filter]");
  if (filter) {
    filmFilter = filter.dataset.filter;
    render();
    return;
  }
  const clear = e.target.closest("[data-clear]");
  if (clear) {
    const sec = clear.dataset.clear;
    const n = data[sec].filter(x => x.done).length;
    if (!n) {
      toast("Alınmış ürün yok");
      return;
    }
    if (!confirm(`${n} ürün listeden silinecek. Emin misin?`)) return;
    data[sec] = data[sec].filter(x => !x.done);
    save();
    render();
    toast("Temizlendi");
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
document.addEventListener("keydown", e => {
  if (e.key === "Escape") document.body.classList.remove("nav-open");
});

$("cancelBtn").addEventListener("click", () => $("editor").close());
$("editor").addEventListener("close", () => { if (recognizer) recognizer.stop(); });

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
  } else if (action === "step") {
    stepGoal(item, Number(b.dataset.dir));
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
  const v = e.target.closest("[data-voice]");
  if (v) {
    toggleVoice(v);
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

$("editorForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!current) return;
  const fd = new FormData(e.target);
  const values = {};
  views[current].fields.forEach(f => {
    const v = String(fd.get(f.name) || "");
    values[f.name] = f.type === "password" ? v : v.trim();
  });
  if (!values.title) return;
  const now = Date.now();
  if (current === "goals") values.target = String(Math.max(1, Math.round(Number(values.target) || 10)));
  if (editingId) {
    const item = data[current].find(x => x.id === editingId);
    if (item) {
      Object.assign(item, values, { updated: now });
      if (current === "goals" && (Number(item.progress) || 0) > Number(item.target)) item.progress = Number(item.target);
    }
  } else {
    const extras = {
      plans: { done: false },
      shopping: { done: false },
      growth: { done: false },
      wishlist: { done: false },
      films: { watched: false, rating: 0 },
      goals: { progress: 0 }
    };
    const extra = extras[current] || {};
    data[current].push({ id: newId(), created: now, updated: now, ...extra, ...values });
  }
  save();
  $("editor").close();
  render();
  toast("Kaydedildi");
});

$("deleteBtn").addEventListener("click", () => {
  if (!current || !editingId || !confirm("Bu kayıt kalıcı olarak silinecek. Emin misin?")) return;
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

$("brandName").textContent = OWNER;
data = load();
buildNav();
buildViews();
try { active = localStorage.getItem(VIEW_KEY) || "home"; } catch {}
openView(active, false);
render();
tick();
setInterval(tick, 30000);
syncOnOpen();
