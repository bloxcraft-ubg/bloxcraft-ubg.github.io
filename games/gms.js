const grid = document.getElementById("grid");
const featuredGrid = document.getElementById("featuredGrid");
const recommendedGrid = document.getElementById("recommendedGrid");
const featuredSection = document.getElementById("featuredSection");
const recommendedSection = document.getElementById("recommendedSection");
const allSection = document.getElementById("allSection");
const search = document.getElementById("search");
const count = document.getElementById("count");

const PAGE_SIZE = 60;
const FEATURED_LIMIT = 100000;
const RECOMMENDED_LIMIT = 100000;
const FALLBACK_IMG = "/1f3ae.png";
const LIB_BASE = "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/libraries/";

const DATA = {
  blox: [], gn: [], elite: [], sea: [], ugs: [], seraph: [],
  ckv: [], hydra: [], ccported: [], googleclass: [], truffled: [],
  nowgg: [], alexrworlds: [], lupine: [], "3kh0": [], "3kh0lite": [],
  tglsc: [], selenite: [], velera: []
};

const FEATURED = {
  blox: [], gn: [], elite: [], sea: [], ugs: [], seraph: [],
  ckv: [], hydra: [], ccported: [], googleclass: [], truffled: [],
  nowgg: [], alexrworlds: [], lupine: [], "3kh0": [], "3kh0lite": [],
  tglsc: [], selenite: [], velera: []
};

const RECOMMENDED = {
  blox: [], gn: [], elite: [], sea: [], ugs: [], seraph: [],
  ckv: [], hydra: [], ccported: [], googleclass: [], truffled: [],
  nowgg: [], alexrworlds: [], lupine: [], "3kh0": [], "3kh0lite": [],
  tglsc: [], selenite: [], velera: []
};

let CURRENT = [];
let CURRENT_FEATURED = [];
let CURRENT_RECOMMENDED = [];
let FILTERED = [];
let FILTERED_FEATURED = [];
let FILTERED_RECOMMENDED = [];
let RENDERED = 0;
let OBSERVER_SENTINEL = null;

const OBSERVER = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    RESET_OBSERVER_ONLY();
    renderMain(false);
  }
}, { rootMargin: "300px" });

function safeArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "object") {
    if (Array.isArray(v.games)) return v.games;
    if (Array.isArray(v.data)) return v.data;
    if (Array.isArray(v.list)) return v.list;
    if (Array.isArray(v.assets)) return v.assets;

    const vals = Object.values(v);
    const objectsOnly = vals.filter(x => x && typeof x === "object" && !Array.isArray(x));

    if (objectsOnly.length > 0) {
      return Object.entries(v)
        .filter(([, val]) => val && typeof val === "object" && !Array.isArray(val))
        .map(([k, val]) => ({ ...val, _idFallback: k }));
    }
  }
  return [];
}

function normalize(g) {
  if (!g || !g.name || !g.url) return null;
  return {
    name: g.name,
    img: g.img || FALLBACK_IMG,
    altImg: g.altImg || null,
    url: g.url
  };
}

function dedupeGames(list) {
  const seen = new Set();
  const out = [];

  for (const item of list || []) {
    const g = normalize(item);
    if (!g) continue;
    const key = (g.name || "").trim().toLowerCase() + "||" + (g.url || "").trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(g);
  }

  return out;
}

async function fetchLibraryList(lib, jsonName) {
  try {
    const r = await fetch(`${LIB_BASE}${lib}/${jsonName}`);
    if (!r.ok) return [];
    const d = await r.json();
    return dedupeGames(safeArray(d));
  } catch (e) {
    return [];
  }
}

async function loadLibraryExtras(cat) {
  const lib = cat.toLowerCase();
  const [popular, recommended] = await Promise.all([
    fetchLibraryList(lib, "popular.json"),
    fetchLibraryList(lib, "recommended.json")
  ]);

  FEATURED[cat] = popular;
  RECOMMENDED[cat] = recommended;
}

const withTimeout = (fn, ms = 4000) => Promise.race([
  fn(),
  new Promise(resolve => setTimeout(resolve, ms))
]);

async function loadBlox() {
  try {
    const r = await fetch("/games/gms.json");
    if (!r.ok) return;
    DATA.blox = dedupeGames(safeArray(await r.json()).map(normalize).filter(Boolean));
  } catch (e) {}
}

async function loadGN() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/freebuisness/assets/zones.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.gn = dedupeGames(safeArray(d)
      .filter(g => g.id !== -1 && g.name && !g.name.startsWith("[!]"))
      .map(g => ({
        name: g.name,
        img: "https://cdn.jsdelivr.net/gh/freebuisness/covers@main/" + (g.cover || "").replace("{COVER_URL}", ""),
        url: "/app-viewer/gn-math/?gn-id=" + g.id
      })));
  } catch (e) {}
}

async function loadElite() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharuniscool/elite-gamez.github.io@main/games.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.elite = dedupeGames(safeArray(d).map(g => ({
      name: g.title || "Unknown",
      img: "https://cdn.jsdelivr.net/gh/tharuniscool/elite-gamez.github.io@main/" + g.image,
      url: "/app-viewer/elite-gamez?url=" + encodeURIComponent(g.url)
    })));
  } catch (e) {}
}

async function loadSea() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/sea-bean-unblocked/sde@main/zzz.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.sea = dedupeGames(safeArray(d).map(g => {
      const cover = (g.cover || "").replace("{COVER_URL}/", "");
      return {
        name: g.name || "Unknown",
        img: cover.startsWith("http")
          ? cover
          : "https://cdn.jsdelivr.net/gh/sea-bean-unblocked/Singlemile@main/Icon/" + cover,
        url: "/app-viewer/sea-bean?view=" + encodeURIComponent(g.id)
      };
    }));
  } catch (e) {}
}

async function loadUGS() {
  const repos = ["tharun9772/ugs-1", "tharun9772/ugs-2", "tharun9772/ugs-3"];

  const results = await Promise.all(repos.map(async repo => {
    try {
      const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets/api_generated/github/" + repo + "/file.json");
      if (!r.ok) return [];
      const d = await r.json();
      return safeArray(d)
        .filter(f => f.type === "file" && f.name?.startsWith("cl") && f.name?.endsWith(".html"))
        .map(f => ({
          name: f.name.replace(/^cl/, "").replace(".html", ""),
          img: "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/5968517.png",
          url: "/app-viewer/ugs-files?view=" + encodeURIComponent(f.name)
        }));
    } catch (e) {
      return [];
    }
  }));

  DATA.ugs = dedupeGames(results.flat());
}

async function loadSeraph() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/DominumNetwork/dominum@main/src/assets/libraries/seraph/games.json");
    if (!r.ok) return;
    const d = await r.json();
    const BASE = "https://cdn.jsdelivr.net/gh/a456pur/seraph@main/games/";

    DATA.seraph = dedupeGames(safeArray(d).map(g => ({
      name: g.name || "Unknown",
      img: g.img || "",
      url: "/app-viewer/seraph/?view=" + (g.url ? g.url.replace(BASE, "") : "")
    })));
  } catch (e) {}
}

async function loadCKV() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/carbonicality/ChickenKingsVault@main/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.ckv = dedupeGames(safeArray(d)
      .map(g => {
        const gameUrl = g?.html || g?.url;
        if (!gameUrl) return null;

        return {
          name: g.name || g.title || "Unknown",
          img: g.img || g.image || g.thumb || FALLBACK_IMG,
          url: "/app-viewer/chicken-kings-vault/?view=" + encodeURIComponent(gameUrl)
        };
      })
      .filter(Boolean));
  } catch (e) {}
}

async function loadHydra() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharuniscool/hydra-assets@main/gmes.json");
    if (!r.ok) return;
    const d = await r.json();

    let rawArray = [];
    if (Array.isArray(d)) {
      rawArray = d;
    } else if (d && typeof d === "object") {
      rawArray = Array.isArray(d.games) ? d.games :
                 Array.isArray(d.data) ? d.data :
                 Array.isArray(d.list) ? d.list :
                 Object.values(d);
    }

    DATA.hydra = dedupeGames(rawArray.map(g => {
      if (!g || typeof g !== "object") return null;

      const file = g.file_name || g.link || g.url;
      if (!file) return null;

      let thumb = g.thumb || g.image || g.img || FALLBACK_IMG;
      if (thumb !== FALLBACK_IMG && !thumb.startsWith("http")) {
        thumb = "https://cdn.jsdelivr.net/gh/tharuniscool/hydra-assets@main/" + thumb.replace(/^\/+/, "");
      }

      return {
        name: g.title || g.name || "Unknown",
        img: thumb,
        url: "/app-viewer/hydra-network/?view=" + encodeURIComponent(file)
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadCCPorted() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/ccported-stupid-game-lib.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.ccported = dedupeGames(safeArray(d)
      .map(g => {
        const id = g?.Id || g?.id || g?._idFallback;
        if (!id) return null;

        let img = g?.img || g?.image || g?.thumb || g?.thumbnail || FALLBACK_IMG;
        if (g?.base) img = g.base + "/thumb.jpg";

        return {
          name: g.name || g.title || "Game " + id,
          img: img,
          url: "/app-viewer/ccported/?view=" + encodeURIComponent(id)
        };
      })
      .filter(Boolean));
  } catch (e) {}
}

async function loadGoogleClass() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/bloxcraft-st/google-class-files@main/assets/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.googleclass = dedupeGames(safeArray(d).map(g => ({
      name: g.name || "Unknown",
      img: g.img || "",
      url: "/app-viewer/google-class/?view=" + encodeURIComponent(g.url)
    })));
  } catch (e) {}
}

async function loadTruffled() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/aukak/truffled@main/public/js/json/g.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.truffled = dedupeGames(safeArray(d).map(g => {
      if (!g.url) return null;

      const thumb = (g.thumbnail || "")
        .replace(/^\/+/, "")
        .replace(/^png\/games\//, "");

      return {
        name: g.name,
        img: thumb
          ? "https://cdn.jsdelivr.net/gh/aukak/truffled@main/public/png/games/" + thumb
          : FALLBACK_IMG,
        url: "/sail/embed/#https://truffled.lol/" + g.url.replace(/^\/+/, "")
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadNowGG() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/nowgg.fun/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.nowgg = dedupeGames(safeArray(d).map(g => {
      if (!g.name || !g.url) return null;

      let cleanUrl = g.url.trim();
      if (!cleanUrl.startsWith("http")) cleanUrl = "https://" + cleanUrl;

      return {
        name: g.name,
        img: g.img || FALLBACK_IMG,
        url: "/sail/embed/#" + cleanUrl
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadAlexrworlds() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/dskjfoisjfsjio/alexrsworld@latest/singlefilegames.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.alexrworlds = dedupeGames(safeArray(d).map(g => ({
      name: g.title || "Unknown",
      img: g.img || FALLBACK_IMG,
      url: "/app-viewer/alexr-world-s/?view=" + encodeURIComponent(g.title)
    })));
  } catch (e) {}
}

async function loadLupine() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/LupineVault@main/assets/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.lupine = dedupeGames(safeArray(d).map(g => {
      if (!g.name) return null;

      const encoded = encodeURIComponent(g.name);

      return {
        name: g.name,
        img: "https://cdn.jsdelivr.net/gh/tharun9772/LupineVault@main/assets/images/games/tile/" + encoded + ".png",
        altImg: "https://cdn.jsdelivr.net/gh/tharun9772/LupineVault@main/assets/images/games/large/" + encoded + ".png",
        url: "/app-viewer/LupineVault/?view=" + encoded
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function load3kh0() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/3kh0/3kh0-assets.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA["3kh0"] = dedupeGames(safeArray(d).map(name => ({
      name,
      img: "https://raw.githack.com/tharun9772/3kh0-assets/main/" + name + "/splash.png",
      url: "/app-viewer/3kh0/?view=" + encodeURIComponent(name)
    })));
  } catch (e) {}
}

async function load3kh0Lite() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/3kh0/3kh0-lite.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA["3kh0lite"] = dedupeGames(safeArray(d).map(g => ({
      name: g.title || "Unknown",
      img: "https://raw.githack.com/3kh0/3kh0-lite/main/" + g.imgSrc,
      url: "/app-viewer/3kh0/lite/?view=" + encodeURIComponent(g.link)
    })));
  } catch (e) {}
}

async function loadTGLSC() {
  try {
    const r = await fetch("https://math-question-generator.dk-ubg.workers.dev/bloxy/ubg/games.json");
    if (!r.ok) return;
    const d = await r.json();
    const base = "https://math-question-generator.dk-ubg.workers.dev";

    DATA.tglsc = dedupeGames(safeArray(d).map(g => {
      if (!g?.title || !g?.embed_url) return null;

      return {
        name: g.title,
        img: base + "/" + (g.thumbnail || "").replace(/^\/+/, ""),
        url: "/sail/embed/#" + g.embed_url.replace(/^https?:\/\//, "")
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadSelenite() {
  try {
    const r = await fetch("https://math-quests-cc.dk-ubg.workers.dev/resources/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.selenite = dedupeGames(safeArray(d).map(g => {
      if (!g?.name || !g?.image || !g?.directory) return null;

      const dir = String(g.directory).replace(/^\/+/, "").replace(/\/+$/, "");

      return {
        name: g.name,
        img: "https://math-quests-cc.dk-ubg.workers.dev/resources/semag/" + dir + "/" + g.image,
        url: "/sail/embed/#https://selenite.cc/resources/semag/" + dir + "/index.html"
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadVelera() {
  try {
    const r = await fetch("https://math-of-cc.dk-ubg.workers.dev/data/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.velera = dedupeGames(safeArray(d).map(g => {
      if (!g?.title || !g?.location) return null;

      return {
        name: g.title,
        img: "https://math-of-cc.dk-ubg.workers.dev/" + String(g.image || "").replace(/^\/+/, ""),
        url: "/sail/embed/#https://velara.cc/" + String(g.location || "").replace(/^\/+/, "")
      };
    }).filter(Boolean));
  } catch (e) {}
}

const LOADER_MAP = {
  blox: loadBlox, gn: loadGN, elite: loadElite, sea: loadSea, ugs: loadUGS,
  seraph: loadSeraph, ckv: loadCKV, hydra: loadHydra, ccported: loadCCPorted,
  googleclass: loadGoogleClass, truffled: loadTruffled, nowgg: loadNowGG,
  alexrworlds: loadAlexrworlds, lupine: loadLupine, "3kh0": load3kh0,
  "3kh0lite": load3kh0Lite, tglsc: loadTGLSC, selenite: loadSelenite,
  velera: loadVelera
};

const CATEGORY_KEYS = Object.keys(DATA);

async function loadCategory(cat) {
  if (!cat || cat === "all") return;
  await Promise.allSettled([
    withTimeout(() => LOADER_MAP[cat] ? LOADER_MAP[cat]() : Promise.resolve(), 4000),
    withTimeout(() => loadLibraryExtras(cat), 4000)
  ]);
}

async function loadAllCategories() {
  await Promise.allSettled(CATEGORY_KEYS.map(cat => loadCategory(cat)));
}

function applyFilter(list, query) {
  const q = (query || "").toLowerCase().trim();
  return dedupeGames(list).filter(g => g?.name?.toLowerCase().includes(q));
}

function getCombinedAllFromMap(map) {
  return dedupeGames(Object.values(map).flat());
}

function createCard(g) {
  const card = document.createElement("div");
  card.className = "game-card";

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = g.img || FALLBACK_IMG;

  img.onerror = () => {
    if (g.altImg && !img.dataset.retried) {
      img.dataset.retried = "true";
      img.src = g.altImg;
    } else {
      img.src = FALLBACK_IMG;
    }
  };

  const title = document.createElement("h3");
  title.textContent = g.name;

  const link = document.createElement("a");
  link.className = "play-btn";
  link.href = g.url;
  link.textContent = "Play";

  card.append(img, title, link);
  return card;
}

function renderSectionGrid(target, list, options = {}) {
  if (!target) return;
  target.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = options.emptyText || "No games found.";
    target.appendChild(empty);
    return;
  }

  const frag = document.createDocumentFragment();
  const limit = typeof options.limit === "number" ? options.limit : list.length;

  list.slice(0, limit).forEach(g => {
    frag.appendChild(createCard(g));
  });

  target.appendChild(frag);
}

function renderMain(reset = false) {
  if (!grid) return;

  if (reset) {
    grid.innerHTML = "";
    RENDERED = 0;
  }

  const valid = FILTERED.filter(g => g && g.name && g.url);
  const slice = valid.slice(RENDERED, RENDERED + PAGE_SIZE);
  const frag = document.createDocumentFragment();

  for (const g of slice) {
    frag.appendChild(createCard(g));
  }

  grid.appendChild(frag);
  RENDERED += slice.length;

  if (RENDERED < valid.length) {
    setupObserver();
  }
}

function setupObserver() {
  if (OBSERVER_SENTINEL) OBSERVER_SENTINEL.remove();
  OBSERVER_SENTINEL = document.createElement("div");
  grid.appendChild(OBSERVER_SENTINEL);
  OBSERVER.observe(OBSERVER_SENTINEL);
}

function RESET_OBSERVER_ONLY() {
  OBSERVER.disconnect();
  if (OBSERVER_SENTINEL) {
    OBSERVER_SENTINEL.remove();
    OBSERVER_SENTINEL = null;
  }
}

function RESET_RENDER() {
  RENDERED = 0;
  RESET_OBSERVER_ONLY();
}

function updateCount() {
  if (count) {
    count.textContent = FILTERED.length + " games";
  }
}

function renderEverything() {
  renderSectionGrid(featuredGrid, FILTERED_FEATURED, {
    limit: FEATURED_LIMIT,
    emptyText: "No featured games found."
  });

  renderSectionGrid(recommendedGrid, FILTERED_RECOMMENDED, {
    limit: RECOMMENDED_LIMIT,
    emptyText: "No recommended games found."
  });

  RESET_RENDER();
  updateCount();
  renderMain(true);

  featuredSection.style.display = "";
  recommendedSection.style.display = "";
  allSection.style.display = "";
}

function setCurrentCategoryData(cat) {
  if (cat === "all") {
    CURRENT = getCombinedAllFromMap(DATA);
    CURRENT_FEATURED = getCombinedAllFromMap(FEATURED);
    CURRENT_RECOMMENDED = getCombinedAllFromMap(RECOMMENDED);
  } else {
    CURRENT = dedupeGames(DATA[cat] || []);
    CURRENT_FEATURED = dedupeGames(FEATURED[cat] || []);
    CURRENT_RECOMMENDED = dedupeGames(RECOMMENDED[cat] || []);
  }

  const query = search ? search.value : "";
  FILTERED = applyFilter(CURRENT, query);
  FILTERED_FEATURED = applyFilter(CURRENT_FEATURED, query);
  FILTERED_RECOMMENDED = applyFilter(CURRENT_RECOMMENDED, query);
}

function toggleSection(sectionEl, forceExpanded) {
  if (!sectionEl) return;
  const isCollapsed = sectionEl.classList.contains("collapsed");
  const shouldExpand = typeof forceExpanded === "boolean" ? forceExpanded : isCollapsed;
  sectionEl.classList.toggle("collapsed", !shouldExpand);
  const btn = sectionEl.querySelector(".section-header");
  if (btn) btn.setAttribute("aria-expanded", shouldExpand ? "true" : "false");
}

document.querySelectorAll(".section-header").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.closest(".section");
    toggleSection(section);
  });
});

document.querySelectorAll(".cat").forEach(el => {
  el.onclick = async () => {
    document.querySelectorAll(".cat").forEach(c => c.classList.remove("active"));
    el.classList.add("active");

    const cat = el.dataset.cat;

    CURRENT = [];
    CURRENT_FEATURED = [];
    CURRENT_RECOMMENDED = [];
    FILTERED = [];
    FILTERED_FEATURED = [];
    FILTERED_RECOMMENDED = [];
    RESET_RENDER();

    if (cat === "all") {
      await loadAllCategories();
    } else {
      await loadCategory(cat);
    }

    setCurrentCategoryData(cat);
    renderEverything();
  };
});

if (search) {
  search.oninput = () => {
    const activeTab = document.querySelector(".cat.active");
    const cat = activeTab ? activeTab.dataset.cat : "blox";
    setCurrentCategoryData(cat);
    renderEverything();
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = document.querySelector(".cat.active");
  const cat = activeTab ? activeTab.dataset.cat : "blox";

  if (cat === "all") {
    await loadAllCategories();
  } else {
    await loadCategory(cat);
  }

  setCurrentCategoryData(cat);
  renderEverything();
});
