const STORE_KEY = "defterim.data";
const CLOUD_KEY = "defterim.cloud";
const DIRTY_KEY = "defterim.dirty";
const API = "https://api.jsonbin.io/v3/b";
const DEFAULT_KEY = "$2a$10$SK5kRKhW5Chnu0LRk2v90ONtlnP8GRAJVkgb21zEfkCt.TT0vxL9y";
const DEFAULT_BIN = "";
const CLOUD_OFF_KEY = "defterim.cloud.off";
const SECTIONS = ["accounts", "recipes", "notes", "plans", "films", "goals"];
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
const $ = id => document.getElementById(id);

let data = null;
let current = null;
let editingId = null;
let toastTimer = null;
let filmFilter = "all";
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
    if (localStorage.getItem(CLOUD_OFF_KEY) === "1") return null;
  } catch {
    return null;
  }
  return DEFAULT_KEY && DEFAULT_BIN ? { key: DEFAULT_KEY, bin: DEFAULT_BIN } : null;
}

function storeCloud(c) {
  cloud = c;
  try {
    if (c) {
      localStorage.setItem(CLOUD_KEY, JSON.stringify(c));
      localStorage.removeItem(CLOUD_OFF_KEY);
    } else {
      localStorage.removeItem(CLOUD_KEY);
      localStorage.setItem(CLOUD_OFF_KEY, "1");
    }
  } catch {}
}

function autoSetupAllowed() {
  try { return !!DEFAULT_KEY && localStorage.getItem(CLOUD_OFF_KEY) !== "1"; } catch { return false; }
}

function markClean() {
  try { localStorage.removeItem(DIRTY_KEY); } catch {}
}

function isDirty() {
  try { return localStorage.getItem(DIRTY_KEY) === "1"; } catch { return false; }
}

function setStatus(state, text) {
  const el = $("syncStatus");
  el.dataset.state = state;
  el.textContent = text;
}

function errorText(e) {
  return e instanceof TypeError ? "İnternet bağlantısı kurulamadı." : e.message;
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
  setStatus("saving", "Kaydediliyor…");
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
    if (!pendingPush) setStatus("ok", "Buluta kaydedildi");
  } catch (e) {
    pendingPush = true;
    setStatus("error", "Buluta kaydedilemedi, bu cihazda duruyor");
    toast(errorText(e));
  } finally {
    pushing = false;
  }
}

async function syncOnOpen() {
  if (!cloud && autoSetupAllowed() && !DEFAULT_BIN) {
    setStatus("saving", "Bulut hazırlanıyor…");
    try {
      const id = await cloudCreate(DEFAULT_KEY, data);
      storeCloud({ key: DEFAULT_KEY, bin: id });
      markClean();
      setStatus("ok", "Buluta bağlı");
      toast(`Bulut hazır. Bin ID: ${id}`);
    } catch (e) {
      setStatus("error", "Buluta ulaşılamadı, bu cihazdakiler gösteriliyor");
      toast(errorText(e));
    }
    return;
  }
  if (!cloud) {
    setStatus("local", "Sadece bu cihazda");
    return;
  }
  if (isDirty() && hasContent(data)) {
    pendingPush = true;
    setStatus("saving", "Kaydediliyor…");
    await pushNow();
    return;
  }
  setStatus("saving", "Buluttan yükleniyor…");
  try {
    const rec = await cloudRead(cloud);
    if (hasContent(rec)) {
      data = normalizeData(rec);
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
      render();
      setStatus("ok", "Buluta bağlı");
    } else if (hasContent(data)) {
      pendingPush = true;
      await pushNow();
    } else {
      setStatus("ok", "Buluta bağlı");
    }
  } catch (e) {
    setStatus("error", "Buluta ulaşılamadı, bu cihazdakiler gösteriliyor");
    toast(errorText(e));
  }
}

function openCloud() {
  $("cloudKey").value = cloud ? cloud.key : DEFAULT_KEY;
  $("cloudBin").value = cloud ? cloud.bin : "";
  $("cloudError").textContent = "";
  $("cloudDisconnect").hidden = !cloud;
  $("cloudSubmit").textContent = cloud ? "Kaydet ve eşitle" : "Bağlan";
  $("cloudDialog").showModal();
  $("cloudKey").focus();
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

function formatDate(ymd) {
  const d = new Date(ymd + "T00:00:00");
  if (isNaN(d)) return "";
  return d.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
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

const editBtn = (sec, id) =>
  `<div class="item-actions"><button class="btn small" data-action="edit" data-sec="${sec}" data-id="${esc(id)}">Düzenle</button></div>`;

const templates = {
  accounts: a => {
    const link = safeUrl(a.url);
    return `<article class="item account">
      <div class="account-head">
        <span class="item-title">${esc(a.title)}</span>
        ${link ? `<a href="${esc(link)}" target="_blank" rel="noopener noreferrer">Siteyi aç</a>` : ""}
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
    </article>`;
  },
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
  notes: n => {
    const date = new Date(n.updated || n.created).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    return `<article class="item note">
      <span class="item-title">${esc(n.title)}</span>
      <p class="note-date">${esc(date)}</p>
      ${n.body ? `<p class="note-body">${esc(n.body)}</p>` : ""}
      ${editBtn("notes", n.id)}
    </article>`;
  },
  plans: p => {
    const late = p.date && !p.done && p.date < todayStr();
    const dateText = p.date ? formatDate(p.date) : "";
    return `<article class="item plan ${p.done ? "done" : ""}">
      <input type="checkbox" class="check" data-action="toggle" data-sec="plans" data-id="${esc(p.id)}" ${p.done ? "checked" : ""} aria-label="Tamamlandı olarak işaretle">
      <div>
        <span class="item-title">${esc(p.title)}</span>
        ${dateText ? `<span class="plan-date ${late ? "late" : ""}">${esc(dateText)}${late ? ", tarihi geçti" : ""}</span>` : ""}
        ${p.detail ? `<p class="plan-detail">${esc(p.detail)}</p>` : ""}
      </div>
      ${editBtn("plans", p.id)}
    </article>`;
  },
  films: f => {
    const tags = [f.kind, f.genre, f.platform].filter(Boolean).map(t => `<span class="tag">${esc(t)}</span>`).join("");
    const rating = Number(f.rating) || 0;
    const stars = [1, 2, 3, 4, 5].map(n =>
      `<button type="button" class="star ${n <= rating ? "on" : ""}" data-action="rate" data-val="${n}" data-sec="films" data-id="${esc(f.id)}" aria-label="${n} yıldız">★</button>`
    ).join("");
    return `<article class="item film ${f.watched ? "watched" : ""}">
      <span class="item-title">${esc(f.title)}</span>
      ${tags ? `<div class="film-tags">${tags}</div>` : ""}
      ${f.by ? `<p class="film-note">Öneren: ${esc(f.by)}</p>` : ""}
      ${f.note ? `<p class="film-note">${esc(f.note)}</p>` : ""}
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
  }
};

function matches(item, q) {
  if (!q) return true;
  return Object.entries(item)
    .filter(([k]) => !["id", "password", "created", "updated", "done", "watched", "rating", "progress", "target", "doneAt"].includes(k))
    .map(([, v]) => v)
    .join(" ")
    .toLocaleLowerCase("tr")
    .includes(q);
}

function sorted(sec, items) {
  const list = [...items];
  const byTitle = (a, b) => String(a.title).localeCompare(String(b.title), "tr");
  if (sec === "notes") return list.sort((a, b) => (b.updated || 0) - (a.updated || 0));
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
    const isDone = x => (Number(x.progress) || 0) >= Math.max(1, Number(x.target) || 1);
    return list.sort((a, b) => {
      if (isDone(a) !== isDone(b)) return isDone(a) ? 1 : -1;
      return (a.created || 0) - (b.created || 0);
    });
  }
  return list.sort(byTitle);
}

function renderSection(sec, q) {
  let pool = data[sec].filter(i => matches(i, q));
  if (sec === "films" && filmFilter !== "all") pool = pool.filter(f => (filmFilter === "done") === !!f.watched);
  const items = sorted(sec, pool);
  const total = data[sec].length;
  let openCount = total;
  if (sec === "plans") openCount = data.plans.filter(p => !p.done).length;
  if (sec === "films") openCount = data.films.filter(f => !f.watched).length;
  if (sec === "goals") openCount = data.goals.filter(x => (Number(x.progress) || 0) < Math.max(1, Number(x.target) || 1)).length;
  $("c-" + sec).textContent = total ? String(openCount) : "";
  $("list-" + sec).innerHTML = items.length
    ? items.map(templates[sec]).join("")
    : `<p class="empty">${q ? "Aramanla eşleşen kayıt yok." : esc(views[sec].empty)}</p>`;
}

function render() {
  const q = $("search").value.trim().toLocaleLowerCase("tr");
  SECTIONS.forEach(sec => renderSection(sec, q));
  renderGame();
  document.querySelectorAll("#filmFilters .chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.filter === filmFilter)));
}

function fieldHtml(f, value) {
  const id = "f-" + f.name;
  const hint = f.hint ? `<span class="hint">${esc(f.hint)}</span>` : "";
  const ph = f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : "";
  const req = f.required ? " required" : "";
  if (f.type === "textarea") {
    return `<label for="${id}">${esc(f.label)}</label>${hint}<textarea id="${id}" name="${f.name}" rows="${f.rows || 4}"${ph}>${esc(value)}</textarea>`;
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

function openEditor(sec, item) {
  current = sec;
  editingId = item ? item.id : null;
  $("editorTitle").textContent = item ? "Düzenle" : views[sec].add;
  $("fields").innerHTML = views[sec].fields.map(f => fieldHtml(f, item ? item[f.name] || "" : "")).join("");
  $("deleteBtn").hidden = !item;
  $("editor").showModal();
  const first = $("fields").querySelector("input, textarea, select");
  if (first) first.focus();
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `defterim-yedek-${todayStr()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("Yedek indirildi");
}

document.querySelectorAll("[data-add]").forEach(b => {
  b.addEventListener("click", () => openEditor(b.dataset.add, null));
});

$("search").addEventListener("input", render);
document.querySelectorAll("#filmFilters .chip").forEach(c => {
  c.addEventListener("click", () => {
    filmFilter = c.dataset.filter;
    render();
  });
});
$("cancelBtn").addEventListener("click", () => $("editor").close());
$("exportBtn").addEventListener("click", exportBackup);
$("importBtn").addEventListener("click", () => $("fileInput").click());

document.querySelector(".page").addEventListener("click", e => {
  const b = e.target.closest("[data-action]");
  if (!b) return;
  const sec = b.dataset.sec;
  const item = sec && data[sec] ? data[sec].find(x => x.id === b.dataset.id) : null;
  if (!item) return;
  const action = b.dataset.action;
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
    toast(item.done ? "Tamamlandı" : "Yeniden açıldı");
  }
});

$("fields").addEventListener("click", e => {
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
    const extras = { plans: { done: false }, films: { watched: false, rating: 0 }, goals: { progress: 0 } };
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

$("fileInput").addEventListener("change", async e => {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  try {
    const p = JSON.parse(await file.text());
    if (!p || !SECTIONS.some(sec => Array.isArray(p[sec]))) throw new Error();
    if (!confirm("Bu cihazdaki kayıtlar, yedekteki kayıtlarla değiştirilecek. Devam edilsin mi?")) return;
    SECTIONS.forEach(sec => { data[sec] = Array.isArray(p[sec]) ? p[sec] : []; });
    data.game = normalizeGame(p.game);
    save();
    render();
    toast("Yedek yüklendi");
  } catch {
    toast("Bu dosya geçerli bir Defterim yedeği değil.");
  }
});

$("syncStatus").addEventListener("click", openCloud);
$("cloudBtn").addEventListener("click", openCloud);
$("cloudCancel").addEventListener("click", () => $("cloudDialog").close());

$("cloudDialog").addEventListener("click", e => {
  const b = e.target.closest('[data-pw="toggle"]');
  if (!b) return;
  const input = b.closest(".pw").querySelector("input");
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  b.textContent = show ? "Gizle" : "Göster";
});

$("cloudDisconnect").addEventListener("click", () => {
  if (!confirm("Bulut bağlantısı kesilecek. Kayıtların bu cihazda ve JSONBin'de durmaya devam eder. Devam edilsin mi?")) return;
  storeCloud(null);
  markClean();
  pendingPush = false;
  clearTimeout(pushTimer);
  setStatus("local", "Sadece bu cihazda");
  $("cloudDialog").close();
  toast("Bulut bağlantısı kesildi");
});

$("cloudForm").addEventListener("submit", async e => {
  e.preventDefault();
  const key = $("cloudKey").value.trim();
  const bin = $("cloudBin").value.trim();
  const err = $("cloudError");
  const btn = $("cloudSubmit");
  err.textContent = "";
  if (!key) return;
  btn.disabled = true;
  try {
    if (!bin) {
      const id = await cloudCreate(key, data);
      storeCloud({ key, bin: id });
      markClean();
      setStatus("ok", "Buluta kaydedildi");
      $("cloudDialog").close();
      toast("Yeni bin oluşturuldu, kayıtların buluta yüklendi.");
      return;
    }
    const c = { key, bin };
    const rec = await cloudRead(c);
    if (hasContent(rec)) {
      if (hasContent(data) && !confirm("Buluttaki kayıtlar bu cihazdakilerin yerine geçecek. Devam edilsin mi?")) return;
      storeCloud(c);
      data = normalizeData(rec);
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
      markClean();
      render();
      setStatus("ok", "Buluta bağlı");
      toast("Buluttaki kayıtlar yüklendi");
    } else {
      storeCloud(c);
      pendingPush = true;
      await pushNow();
      toast("Kayıtların buluta yüklendi");
    }
    $("cloudDialog").close();
  } catch (x) {
    err.textContent = errorText(x);
  } finally {
    btn.disabled = false;
  }
});

window.addEventListener("online", () => { if (cloud && pendingPush) pushNow(); });

window.addEventListener("pagehide", () => {
  if (cloud && pendingPush) {
    clearTimeout(pushTimer);
    cloudWrite(cloud, data, true).then(markClean).catch(() => {});
  }
});

data = load();
render();
syncOnOpen();
