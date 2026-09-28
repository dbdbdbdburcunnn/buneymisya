const STORE_KEY = "defterim.data";
const SECTIONS = ["recipes", "accounts", "notes"];
const $ = id => document.getElementById(id);

let data = null;
let view = "recipes";
let editingId = null;
let toastTimer = null;

const views = {
  recipes: {
    title: "Tarifler",
    add: "Tarif ekle",
    search: "Tariflerde ara",
    empty: "Henüz tarif yok. İlk tarifini eklemek için “Tarif ekle”ye bas.",
    fields: [
      { name: "title", label: "Tarif adı", required: true },
      { name: "category", label: "Kategori", placeholder: "Makarna, çorba, tatlı…" },
      { name: "time", label: "Süre", placeholder: "Örn. 30 dk" },
      { name: "ingredients", label: "Malzemeler", hint: "Her satıra bir malzeme yaz.", type: "textarea", rows: 6 },
      { name: "steps", label: "Yapılışı", hint: "Her satıra bir adım yaz.", type: "textarea", rows: 8 }
    ]
  },
  accounts: {
    title: "Hesaplar",
    add: "Hesap ekle",
    search: "Hesaplarda ara",
    empty: "Henüz kayıtlı hesap yok. “Hesap ekle” ile başla.",
    fields: [
      { name: "title", label: "Hesap adı", placeholder: "Gmail, Netflix, banka…", required: true },
      { name: "email", label: "E-posta veya kullanıcı adı" },
      { name: "password", label: "Şifre", type: "password" },
      { name: "url", label: "Site adresi", placeholder: "https://" },
      { name: "note", label: "Not", type: "textarea", rows: 3 }
    ]
  },
  notes: {
    title: "Notlar",
    add: "Not ekle",
    search: "Notlarda ara",
    empty: "Henüz not yok. Unutmak istemediğin ilk şeyi “Not ekle” ile yaz.",
    fields: [
      { name: "title", label: "Başlık", required: true },
      { name: "body", label: "Not", type: "textarea", rows: 10 }
    ]
  }
};

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const d = raw ? JSON.parse(raw) : {};
    SECTIONS.forEach(sec => { if (!Array.isArray(d[sec])) d[sec] = []; });
    return d;
  } catch {
    return { recipes: [], accounts: [], notes: [] };
  }
}

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch {
    toast("Kaydedilemedi. Tarayıcı depolaması dolu ya da kapalı olabilir.");
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

const templates = {
  recipes: r => {
    const ing = lines(r.ingredients);
    const st = lines(r.steps);
    const meta = [r.category, r.time].filter(Boolean).map(m => `<span class="tag">${esc(m)}</span>`).join("");
    return `<details class="item recipe">
      <summary><span class="item-title">${esc(r.title)}</span>${meta}</summary>
      <div class="recipe-body">
        ${ing.length ? `<h4>Malzemeler</h4><ul>${ing.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}
        ${st.length ? `<h4>Yapılışı</h4><ol>${st.map(i => `<li>${esc(i)}</li>`).join("")}</ol>` : ""}
        <div class="item-actions"><button class="btn small" data-action="edit" data-id="${esc(r.id)}">Düzenle</button></div>
      </div>
    </details>`;
  },
  accounts: a => {
    const link = safeUrl(a.url);
    return `<article class="item account">
      <div class="account-head">
        <span class="item-title">${esc(a.title)}</span>
        ${link ? `<a href="${esc(link)}" target="_blank" rel="noopener noreferrer">Siteyi aç</a>` : ""}
      </div>
      ${a.email ? `<div class="field-row">
        <span class="field-label">Kullanıcı</span>
        <span class="field-value">${esc(a.email)}</span>
        <span class="row-btns"><button class="btn small ghost" data-action="copy" data-field="email" data-id="${esc(a.id)}">Kopyala</button></span>
      </div>` : ""}
      ${a.password ? `<div class="field-row">
        <span class="field-label">Şifre</span>
        <span class="field-value secret">••••••••</span>
        <span class="row-btns">
          <button class="btn small ghost" data-action="reveal" data-id="${esc(a.id)}">Göster</button>
          <button class="btn small ghost" data-action="copy" data-field="password" data-id="${esc(a.id)}">Kopyala</button>
        </span>
      </div>` : ""}
      ${a.note ? `<p class="account-note">${esc(a.note)}</p>` : ""}
      <div class="item-actions"><button class="btn small" data-action="edit" data-id="${esc(a.id)}">Düzenle</button></div>
    </article>`;
  },
  notes: n => {
    const date = new Date(n.updated || n.created).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    return `<article class="item note">
      <span class="item-title">${esc(n.title)}</span>
      <p class="note-date">${esc(date)}</p>
      ${n.body ? `<p class="note-body">${esc(n.body)}</p>` : ""}
      <div class="item-actions"><button class="btn small" data-action="edit" data-id="${esc(n.id)}">Düzenle</button></div>
    </article>`;
  }
};

function matches(item, q) {
  if (!q) return true;
  const text = Object.entries(item)
    .filter(([k]) => !["id", "password", "created", "updated"].includes(k))
    .map(([, v]) => v)
    .join(" ")
    .toLocaleLowerCase("tr");
  return text.includes(q);
}

function sorted(items) {
  const list = [...items];
  if (view === "notes") return list.sort((a, b) => (b.updated || 0) - (a.updated || 0));
  return list.sort((a, b) => String(a.title).localeCompare(String(b.title), "tr"));
}

function render() {
  const cfg = views[view];
  SECTIONS.forEach(s => { $("c-" + s).textContent = data[s].length || ""; });
  document.querySelectorAll(".tab").forEach(t => {
    if (t.dataset.view === view) t.setAttribute("aria-current", "page");
    else t.removeAttribute("aria-current");
  });
  $("viewTitle").textContent = cfg.title;
  $("addBtn").textContent = cfg.add;
  $("search").placeholder = cfg.search;
  const q = $("search").value.trim().toLocaleLowerCase("tr");
  const items = sorted(data[view].filter(i => matches(i, q)));
  $("list").innerHTML = items.length
    ? items.map(templates[view]).join("")
    : `<p class="empty">${q ? "Aramanla eşleşen kayıt yok." : esc(cfg.empty)}</p>`;
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
  return `<label for="${id}">${esc(f.label)}</label>${hint}<input id="${id}" name="${f.name}" type="text" autocomplete="off" value="${esc(value)}"${ph}${req}>`;
}

function openEditor(item) {
  const cfg = views[view];
  editingId = item ? item.id : null;
  $("editorTitle").textContent = item ? "Düzenle" : cfg.add;
  $("fields").innerHTML = cfg.fields.map(f => fieldHtml(f, item ? item[f.name] || "" : "")).join("");
  $("deleteBtn").hidden = !item;
  $("editor").showModal();
  const first = $("fields").querySelector("input, textarea");
  if (first) first.focus();
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `defterim-yedek-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("Yedek indirildi");
}

document.querySelectorAll(".tab").forEach(t => {
  t.addEventListener("click", () => {
    view = t.dataset.view;
    $("search").value = "";
    render();
  });
});

$("search").addEventListener("input", render);
$("addBtn").addEventListener("click", () => openEditor(null));
$("cancelBtn").addEventListener("click", () => $("editor").close());
$("exportBtn").addEventListener("click", exportBackup);
$("importBtn").addEventListener("click", () => $("fileInput").click());

$("list").addEventListener("click", e => {
  const b = e.target.closest("[data-action]");
  if (!b) return;
  const item = data[view].find(x => x.id === b.dataset.id);
  if (!item) return;
  const action = b.dataset.action;
  if (action === "edit") {
    openEditor(item);
  } else if (action === "copy") {
    copy(item[b.dataset.field]);
  } else if (action === "reveal") {
    const span = b.closest(".field-row").querySelector(".secret");
    const shown = b.dataset.shown === "1";
    span.textContent = shown ? "••••••••" : item.password;
    b.dataset.shown = shown ? "0" : "1";
    b.textContent = shown ? "Göster" : "Gizle";
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
  const fd = new FormData(e.target);
  const values = {};
  views[view].fields.forEach(f => {
    const v = String(fd.get(f.name) || "");
    values[f.name] = f.type === "password" ? v : v.trim();
  });
  if (!values.title) return;
  const now = Date.now();
  if (editingId) {
    const item = data[view].find(x => x.id === editingId);
    if (item) Object.assign(item, values, { updated: now });
  } else {
    data[view].push({ id: newId(), created: now, updated: now, ...values });
  }
  save();
  $("editor").close();
  render();
  toast("Kaydedildi");
});

$("deleteBtn").addEventListener("click", () => {
  if (!editingId || !confirm("Bu kayıt kalıcı olarak silinecek. Emin misin?")) return;
  data[view] = data[view].filter(x => x.id !== editingId);
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
    save();
    render();
    toast("Yedek yüklendi");
  } catch {
    toast("Bu dosya geçerli bir Defterim yedeği değil.");
  }
});

data = load();
render();
