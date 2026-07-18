const grid = document.getElementById("grid");
const featuredGrid = document.getElementById("featuredGrid");
const recommendedGrid = document.getElementById("recommendedGrid");
const topicsGrid = document.getElementById("topicsGrid");
const favoritesRecentGrid = document.getElementById("favoritesRecentGrid");
const featuredSection = document.getElementById("featuredSection");
const recommendedSection = document.getElementById("recommendedSection");
const topicsSection = document.getElementById("topicsSection");
const favoritesRecentSection = document.getElementById("favoritesRecentSection");
const allSection = document.getElementById("allSection");
const search = document.getElementById("search");
const count = document.getElementById("count");
const librariesContainer = document.getElementById("librariesContainer");
const topicsContainer = document.getElementById("topicsContainer");
const PAGE_SIZE = 60;
const FEATURED_LIMIT = 100000;
const RECOMMENDED_LIMIT = 100000;
const FALLBACK_IMG = "/1f3ae.png";
const LIB_BASE = "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/libraries/";
const TOPIC_BASE = "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/topics/";
const DATA = {
  blox: [], 
  gn: [], 
  elite: [], 
  ugs: [], 
  seraph: [],
  ckv: [], 
  hydra: [], 
  ccported: [], 
  googleclass: [], 
  truffled: [],
  nowgg: [], 
  alexrworlds: [], 
  lupine: [], 
  "3kh0": [], 
  "3kh0lite": [],
  tglsc: [], 
  selenite: [], 
  velera: [], 
  frogies: [], 
  ubg42: [], 
  epicway: [],
  noahh: [], 
  youtube: [], 
  solo: [], 
  degloveed: [], 
  kruated: [], 
  pizzalite: [],
  maz: [],
  shuttleproxy: []
};

const FEATURED = JSON.parse(JSON.stringify(DATA));
const RECOMMENDED = JSON.parse(JSON.stringify(DATA));
const CACHED_TOPICS_RAW = {}; 
let TOPIC_METADATA = [];
let ACTIVE_LIBS = new Set(["all"]);
let ACTIVE_TOPICS = new Set(["none"]);
let CURRENT = [];
let CURRENT_FEATURED = [];
let CURRENT_RECOMMENDED = [];
let CURRENT_TOPICS = [];
let FILTERED = [];
let FILTERED_FEATURED = [];
let FILTERED_RECOMMENDED = [];
let FILTERED_TOPICS = [];
let FAVORITES = JSON.parse(localStorage.getItem("ubg_favorites")) || [];
let RECENTLY_PLAYED = JSON.parse(localStorage.getItem("ubg_recent")) || [];
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
    img: g.img || g.IMG || g.image || FALLBACK_IMG,
    altImg: g.altImg || null,
    url: g.url || g.URL,
    engine: g.engine || null
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

const withTimeout = (fn, ms = 4000) => Promise.race([
  fn(),
  new Promise(resolve => setTimeout(resolve, ms))
]);

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

async function loadBlox() {
  try {
    const r = await fetch("/games/blockers.json");
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

async function loadUGS() {
  try {
    const r = await fetch("https://raw.githack.com/bubbls/ugs-singlefile/main/games.js");
    if (!r.ok) return;
    const text = await r.text();
    const arrayMatch = text.match(/let\s+files\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) return;
    const arrayContent = arrayMatch[1];
    const stringRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g;
    let match;
    const extractedFiles = [];

    while ((match = stringRegex.exec(arrayContent)) !== null) {
      extractedFiles.push(match[1] || match[2]);
    }
    
    DATA.ugs = dedupeGames(extractedFiles
      .filter(f => f && f.toLowerCase().startsWith("cl"))
      .map(f => {
        const normalizedName = f.includes(".") && f.lastIndexOf(".") > 0 ? f : f + ".html";
        const displayName = f.replace(/^cl/i, "").replace(/\.html$/i, "");

        return {
          name: displayName || f,
          img: "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/5968517.png",
          url: "/app-viewer/ugs-files?view=" + encodeURIComponent(normalizedName)
        };
      })
    );
  } catch (e) {
    console.error("Error parsing external UGS files:", e);
  }
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
    DATA.ckv = dedupeGames(safeArray(d).map(g => {
      const gameUrl = g?.html || g?.url;
      if (!gameUrl) return null;
      return {
        name: g.name || g.title || "Unknown",
        img: "https://cdn.jsdelivr.net/gh/carbonicality/ChickenKingsVault@main/gameimages/" + (g.img || g.image || g.thumb || FALLBACK_IMG),
        url: "/app-viewer/chicken-kings-vault/?view=" + encodeURIComponent(gameUrl)
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadHydra() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharuniscool/hydra-assets@main/gmes.json");
    if (!r.ok) return;
    const d = await r.json();
    let rawArray = Array.isArray(d) ? d : safeArray(d);
    DATA.hydra = dedupeGames(rawArray.map(g => {
      if (!g || typeof g !== "object") return null;
      const file = g.file_name || g.link || g.url;
      if (!file) return null;
      let thumb = g.thumb || g.image || g.img || FALLBACK_IMG;
      if (thumb !== FALLBACK_IMG && !thumb.startsWith("http")) {
        thumb = "https://cdn.jsdelivr.net/gh/tharuniscool/hydra-assets@main/" + thumb.replace(/^\/+/, "");
      }
      return { name: g.title || g.name || "Unknown", img: thumb, url: "/app-viewer/hydra-network/?view=" + encodeURIComponent(file) };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadCCPorted() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/ccported-stupid-game-lib.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.ccported = dedupeGames(safeArray(d).map(g => {
      const id = g?.Id || g?.id || g?._idFallback;
      if (!id) return null;
      let img = g?.img || g?.image || g?.thumb || g?.thumbnail || FALLBACK_IMG;
      if (g?.base) img = g.base + "/thumb.jpg";
      return { name: g.name || g.title || "Game " + id, img: img, url: "/app-viewer/ccported/?view=" + encodeURIComponent(id) };
    }).filter(Boolean));
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
      const thumb = (g.thumbnail || "").replace(/^\/+/, "").replace(/^png\/games\//, "");
      return {
        name: g.name,
        img: thumb ? "https://cdn.jsdelivr.net/gh/aukak/truffled@main/public/png/games/" + thumb : FALLBACK_IMG,
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
      return { name: g.name, img: g.img || FALLBACK_IMG, url: "/sail/embed/#" + cleanUrl };
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

async function loadFrogies() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/libraries/frogies/gms.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.frogies = dedupeGames(safeArray(d).map(g => ({ name: g.title, img: g.IMG || FALLBACK_IMG, url: g.URL })));
  } catch (e) {}
}

async function loadUbg42() {
  try {
    const r = await fetch("https://multible-questions.dk-ubg.workers.dev/gms/bloxy/gaming.json");
    if (!r.ok) return;
    const d = await r.json();
    const base = "https://multible-questions.dk-ubg.workers.dev";
    DATA.ubg42 = dedupeGames(safeArray(d).map(g => {
      if (!g?.NAME || !g?.URL) return null;
      let imgUrl = g.IMG ? `${base}/${g.IMG}` : FALLBACK_IMG;
      imgUrl = imgUrl.replace(/(https?:\/\/)|(\/)+/g, "$1$2");
      return { name: g.NAME, url: g.URL, img: imgUrl };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadEpicway() {
  try {
    const [resJson, resJs] = await Promise.all([
      fetch("https://aisian-calc.dk-ubg.workers.dev/games/loader.json"),
      fetch("https://aisian-calc.dk-ubg.workers.dev/games/load.js")
    ]);
    if (!resJson.ok || !resJs.ok) return;
    const gamesData = await resJson.json();
    const jsText = await resJs.text();
    const sourcesMap = {};
    const regex = /['"]?(\w+)['"]?\s*:\s*\{[^}]*?url\s*:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(jsText)) !== null) {
      sourcesMap[match[1]] = match[2];
    }
    DATA.epicway = dedupeGames(safeArray(gamesData).map(g => {
      if (!g || !g.url) return null;
      const idMatch = g.url.match(/[?&]id=(\d+)/);
      if (!idMatch) return null;
      const id = idMatch[1];
      const embedUrl = sourcesMap[id];
      if (!embedUrl) return null;
      const cleanEmbedUrl = embedUrl.trim().replace(/^\/+/, "");
      let finalUrl = "/sail/embed/#https://wilway.today/" + cleanEmbedUrl;
      finalUrl = finalUrl.replace(/([^:]\/)\/+/g, "$1");
      let imgUrl = "https://aisian-calc.dk-ubg.workers.dev/" + (g.img || "").replace(/^\/+/, "");
      imgUrl = imgUrl.replace(/([^:]\/)\/+/g, "$1");
      return { name: g.title || g.display || "Unknown", img: imgUrl, url: finalUrl };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadNoahh() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/libraries/noahh/gms_replaced.json");
    if (!r.ok) return;
    const rawText = await r.text();
    const fixedJsonText = rawText
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
      .replace(/,\s*([\]}])/g, '$1');
    const d = JSON.parse(fixedJsonText);
    DATA.noahh = dedupeGames(safeArray(d).map(g => {
      if (!g) return null;
      const title = g.title || g.name;
      const url = g.url || g.link;
      if (!title || !url) return null;
      return {
        name: title,
        img: g.image || g.img || FALLBACK_IMG,
        url: url.replace("https://cdn.jsdelivr.net/gh/NoahsAmazingTutoringHelp/Noahs-Calculus-Tutor/", "/app-viewer/noah/?view=")
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadYoutube() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/libraries/youtube/gms.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.youtube = dedupeGames(safeArray(d).map(g => {
      if (!g || !g.name) return null;
      return { name: g.name, img: "/youtube.png", url: "/app-viewer/youtube-playables/?view=" + encodeURIComponent(g.name) };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadSolo() {
  try {
    const r = await fetch("https://stromg-quests.dk-ubg.workers.dev/g.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.solo = dedupeGames(safeArray(d).map(g => {
      if (!g || !g.alt || !g.url) return null;
      let imgUrl = ("https://stromg-quests.dk-ubg.workers.dev/" + (g.img || "")).replace(/([^:]\/)\/+/g, "$1");
      let finalUrl = ("/sail/embed/#play.qatual.com/" + (g.url || "")).replace(/([^:]\/)\/+/g, "$1");
      return { name: g.alt, img: imgUrl, url: finalUrl };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadDegloved() {
  try {
    const r = await fetch("/games/data/json/degloved.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.degloveed = dedupeGames(safeArray(d).map(g => {
      if (!g || !g.name || !g.url) return null;
      return {
        name: g.name,
        img: "https://winf-dictionary.dk-ubg.workers.dev/cdn/proxy/image/" + (g.thumbnail || ""),
        url: "/sail/embed/#" + g.url
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadKruated() {
  try {
    const r = await fetch("/games/data/json/kruated.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.kruated = dedupeGames(safeArray(d).map(g => {
      if (!g || !g.name || !g.url) return null;
      return {
        name: g.name,
        img: "https://winf-dictionary.dk-ubg.workers.dev/cdn/proxy/image/" + (g.thumbnail || ""),
        url: "/sail/embed/#" + g.url
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadPizzalite() {
  try {
    const r = await fetch("/games/data/json/petezah.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.pizzalite = dedupeGames(safeArray(d).map(g => {
      if (!g || !g.name || !g.url) return null;
      return {
        name: g.name,
        img: "https://winf-dictionary.dk-ubg.workers.dev/cdn/proxy/image/" + (g.thumbnail || ""),
        url: "/sail/embed/#" + g.url
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadMaz() {
  try {
    const r = await fetch("/games/data/json/the-marz-lib.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.maz = dedupeGames(safeArray(d).map(g => {
      if (!g || !g.title || !g.url) return null;
      return {
        name: g.title,
        img: "https://winf-dictionary.dk-ubg.workers.dev/cdn/proxy/image/https://themarzlibrary.org" + g.img,
        url: "/sail/embed/#https://themarzlibrary.org" + g.url
      };
    }).filter(Boolean));
  } catch (e) {}
}

async function loadShuttleProxy() {
  try {
    const r = await fetch("/games/data/json/shuttleproxy.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.shuttleproxy = dedupeGames(safeArray(d).map(g => {
      if (!g || !g.name || !g.root) return null;
      
      const cleanRoot = g.root.endsWith('/') ? g.root : g.root + '/';
      const cleanImg = g.img ? (g.img.startsWith('/') ? g.img.slice(1) : g.img) : '';
      
      return {
        name: g.name,
        img: "https://winf-dictionary.dk-ubg.workers.dev/cdn/proxy/image/https://assets.shuttlemath.com/" + cleanRoot + cleanImg,
        url: "/sail/embed/#https://assets.shuttlemath.com/" + g.root
      };
    }).filter(Boolean));
  } catch (e) {}
}

const LOADER_MAP = {
  blox: loadBlox, 
  gn: loadGN, 
  elite: loadElite, 
  ugs: loadUGS,
  seraph: loadSeraph, 
  ckv: loadCKV, 
  hydra: loadHydra, 
  ccported: loadCCPorted,
  googleclass: loadGoogleClass, 
  truffled: loadTruffled, 
  nowgg: loadNowGG,
  alexrworlds: loadAlexrworlds, 
  lupine: loadLupine, 
  "3kh0": load3kh0,
  "3kh0lite": load3kh0Lite, 
  tglsc: loadTGLSC, 
  selenite: loadSelenite,
  velera: loadVelera, 
  frogies: loadFrogies, 
  ubg42: loadUbg42, 
  epicway: loadEpicway,
  noahh: loadNoahh, 
  youtube: loadYoutube, 
  solo: loadSolo,
  degloveed: loadDegloved, 
  kruated: loadKruated, 
  pizzalite: loadPizzalite,
  maz: loadMaz,
  shuttleproxy: loadShuttleProxy
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

async function fetchTopicData(topicId) {
  if (CACHED_TOPICS_RAW[topicId]) return CACHED_TOPICS_RAW[topicId];
  try {
    const res = await fetch(`${TOPIC_BASE}${topicId}.json`);
    if (!res.ok) return [];
    const json = await res.json();
    const processed = safeArray(json).map(g => {
      const normalizedItem = normalize(g);
      if (normalizedItem && g.engine) normalizedItem.engine = g.engine.toLowerCase().trim();
      return normalizedItem;
    }).filter(Boolean);

    CACHED_TOPICS_RAW[topicId] = processed;
    return processed;
  } catch (e) {
    return [];
  }
}

async function resolveActiveTopicsData() {
  if (ACTIVE_TOPICS.has("none") || ACTIVE_TOPICS.size === 0) return [];
  
  const targetIds = new Set();
  
  ACTIVE_TOPICS.forEach(id => {
    targetIds.add(id);
    const meta = TOPIC_METADATA.find(t => t.id === id);
    if (meta && meta.include) {
      meta.include.split(",").forEach(inc => {
        const cleaned = inc.trim().toLowerCase();
        if (cleaned) targetIds.add(cleaned);
      });
    }
  });

  const arrays = await Promise.all(Array.from(targetIds).map(id => fetchTopicData(id)));
  return dedupeGames(arrays.flat());
}

function applyFilter(list, query) {
  const q = (query || "").toLowerCase().trim();
  return list.filter(g => g?.name?.toLowerCase().includes(q));
}

function getCombinedAllFromMap(map) {
  return dedupeGames(Object.values(map).flat());
}

function createCard(g) {
  const card = document.createElement("div");
  card.className = "game-card";

  const favBtn = document.createElement("button");
  favBtn.className = "fav-btn";
  favBtn.type = "button";
  favBtn.innerHTML = "★";
  favBtn.setAttribute("aria-label", "Favorite Game");

  const isFav = FAVORITES.some(f => f.name === g.name && f.url === g.url);
  if (isFav) favBtn.classList.add("active");

  favBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const index = FAVORITES.findIndex(f => f.name === g.name && f.url === g.url);
    if (index > -1) {
      FAVORITES.splice(index, 1);
      favBtn.classList.remove("active");
    } else {
      FAVORITES.push(g);
      favBtn.classList.add("active");
    }
    localStorage.setItem("ubg_favorites", JSON.stringify(FAVORITES));
    pipelineUpdate();
  };

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
  
  link.onclick = () => {
    RECENTLY_PLAYED = RECENTLY_PLAYED.filter(r => !(r.name === g.name && r.url === g.url));
    RECENTLY_PLAYED.unshift(g);
    if (RECENTLY_PLAYED.length > 15) {
      RECENTLY_PLAYED = RECENTLY_PLAYED.slice(0, 15);
    }
    localStorage.setItem("ubg_recent", JSON.stringify(RECENTLY_PLAYED));
    pipelineUpdate();
  };

  card.append(favBtn, img, title, link);
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

  if (RENDERED < valid.length) setupObserver();
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
  const query = search ? search.value : "";
  
  if (ACTIVE_TOPICS.has("none") || FILTERED_TOPICS.length === 0) {
    topicsSection.style.display = "none";
  } else {
    topicsSection.style.display = "";
    renderSectionGrid(topicsGrid, FILTERED_TOPICS, { emptyText: "No matching engine games for this topic." });
  }

  const filteredFavs = applyFilter(FAVORITES, query);
  const filteredRecents = applyFilter(RECENTLY_PLAYED, query);
  const uniqueRecents = filteredRecents.filter(recent => 
    !filteredFavs.some(fav => fav.name === recent.name && fav.url === recent.url)
  );

  if (filteredFavs.length === 0 && uniqueRecents.length === 0) {
    favoritesRecentSection.style.display = "none";
  } else {
    favoritesRecentSection.style.display = "";
    renderSectionGrid(favoritesRecentGrid, [...filteredFavs, ...uniqueRecents]);
  }

  renderSectionGrid(featuredGrid, FILTERED_FEATURED, { limit: FEATURED_LIMIT, emptyText: "No popular games found." });
  renderSectionGrid(recommendedGrid, FILTERED_RECOMMENDED, { limit: RECOMMENDED_LIMIT, emptyText: "No recommended games found." });

  RESET_RENDER();
  updateCount();
  renderMain(true);

  featuredSection.style.display = "";
  recommendedSection.style.display = "";
  allSection.style.display = "";
}

async function pipelineUpdate() {
  const query = search ? search.value : "";

  let combinedRaw = [];
  let combinedFeatured = [];
  let combinedRecommended = [];

  if (ACTIVE_LIBS.has("all")) {
    combinedRaw = getCombinedAllFromMap(DATA);
    combinedFeatured = getCombinedAllFromMap(FEATURED);
    combinedRecommended = getCombinedAllFromMap(RECOMMENDED);
  } else {
    ACTIVE_LIBS.forEach(libKey => {
      if (DATA[libKey]) combinedRaw.push(...DATA[libKey]);
      if (FEATURED[libKey]) combinedFeatured.push(...FEATURED[libKey]);
      if (RECOMMENDED[libKey]) combinedRecommended.push(...RECOMMENDED[libKey]);
    });
    combinedRaw = dedupeGames(combinedRaw);
    combinedFeatured = dedupeGames(combinedFeatured);
    combinedRecommended = dedupeGames(combinedRecommended);
  }

  let topicsRaw = await resolveActiveTopicsData();
  if (!ACTIVE_LIBS.has("all") && ACTIVE_LIBS.size > 0) {
    topicsRaw = topicsRaw.filter(game => game.engine && ACTIVE_LIBS.has(game.engine));
  }

  FILTERED = applyFilter(combinedRaw, query);
  FILTERED_FEATURED = applyFilter(combinedFeatured, query);
  FILTERED_RECOMMENDED = applyFilter(combinedRecommended, query);
  FILTERED_TOPICS = applyFilter(topicsRaw, query);

  renderEverything();
}

function buildDynamicCategoryLayouts() {
  librariesContainer.innerHTML = "";
  
  const allEl = document.createElement("div");
  allEl.className = `cat ${ACTIVE_LIBS.has("all") ? "active" : ""}`;
  allEl.textContent = "All";
  allEl.dataset.cat = "all";
  allEl.onclick = async () => {
    RESET_RENDER();
    ACTIVE_LIBS.clear();
    ACTIVE_LIBS.add("all");
    await loadAllCategories();
    syncUISelectedClasses();
    await pipelineUpdate();
  };
  librariesContainer.appendChild(allEl);

  const libraryKeys = [
    { id: "blox", name: "Bloxcraft UBG" }, 
    { id: "gn", name: "GN-Math" }, 
    { id: "elite", name: "Elite Gamez" },
    { id: "ugs", name: "Ultimate Game Stash" }, 
    { id: "seraph", name: "Seraph" },
    { id: "ckv", name: "Chicken Kings Vault" }, 
    { id: "hydra", name: "Hydra" }, 
    { id: "ccported", name: "CCPorted" },
    { id: "googleclass", name: "Google Class" }, 
    { id: "truffled", name: "Truffled" }, 
    { id: "nowgg", name: "Now.GG" },
    { id: "alexrworlds", name: "Alexr's World" }, 
    { id: "lupine", name: "LupineVault" }, 
    { id: "3kh0", name: "3kh0" },
    { id: "3kh0lite", name: "3kh0 Lite" }, 
    { id: "tglsc", name: "TGLSC" }, 
    { id: "selenite", name: "Selenite" },
    { id: "velera", name: "Velera" }, 
    { id: "frogies", name: "Frogie's Arcade" }, 
    { id: "ubg42", name: "UBG42" },
    { id: "epicway", name: "Epicway" }, 
    { id: "noahh", name: "Noah's Tutoring Hub" }, 
    { id: "youtube", name: "YouTube Playables" },
    { id: "solo", name: "Solo Central" },
    { id: "degloveed", name: "Degloved" }, 
    { id: "kruated", name: "Kruated Phear" }, 
    { id: "pizzalite", name: "Petezah Lite" },
    { id: "maz", name: "The Marz Library" },
    { id: "shuttleproxy", name: "Shuttle Math" }
  ];

  libraryKeys.forEach(lib => {
    const el = document.createElement("div");
    el.className = `cat ${ACTIVE_LIBS.has(lib.id) ? "active" : ""}`;
    el.textContent = lib.name;
    el.dataset.cat = lib.id;
    el.onclick = async () => {
      RESET_RENDER();
      if (ACTIVE_LIBS.has("all")) ACTIVE_LIBS.delete("all");
      
      if (ACTIVE_LIBS.has(lib.id)) {
        ACTIVE_LIBS.delete(lib.id);
        if (ACTIVE_LIBS.size === 0) ACTIVE_LIBS.add("all"); 
      } else {
        ACTIVE_LIBS.add(lib.id);
      }

      await Promise.all(Array.from(ACTIVE_LIBS).map(c => loadCategory(c)));
      syncUISelectedClasses();
      await pipelineUpdate();
    };
    librariesContainer.appendChild(el);
  });

  topicsContainer.innerHTML = "";
  const noneEl = document.createElement("div");
  noneEl.className = `cat ${ACTIVE_TOPICS.has("none") ? "active" : ""}`;
  noneEl.textContent = "None";
  noneEl.dataset.topic = "none";
  noneEl.onclick = () => {
    ACTIVE_TOPICS.clear();
    ACTIVE_TOPICS.add("none");
    syncUISelectedClasses();
    pipelineUpdate();
  };
  topicsContainer.appendChild(noneEl);

  TOPIC_METADATA.forEach(topic => {
    const el = document.createElement("div");
    el.className = `cat ${ACTIVE_TOPICS.has(topic.id) ? "active" : ""}`;
    el.textContent = topic.name;
    el.dataset.topic = topic.id;
    el.onclick = async () => {
      if (ACTIVE_TOPICS.has("none")) ACTIVE_TOPICS.delete("none");

      if (ACTIVE_TOPICS.has(topic.id)) {
        ACTIVE_TOPICS.delete(topic.id);
        if (ACTIVE_TOPICS.size === 0) ACTIVE_TOPICS.add("none");
      } else {
        ACTIVE_TOPICS.add(topic.id);
      }
      syncUISelectedClasses();
      await pipelineUpdate();
    };
    topicsContainer.appendChild(el);
  });
}

function syncUISelectedClasses() {
  document.querySelectorAll("#librariesContainer .cat").forEach(el => {
    el.classList.toggle("active", ACTIVE_LIBS.has(el.dataset.cat));
  });
  document.querySelectorAll("#topicsContainer .cat").forEach(el => {
    el.classList.toggle("active", ACTIVE_TOPICS.has(el.dataset.topic));
  });
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

if (search) {
  search.oninput = () => {
    pipelineUpdate();
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/games/topics.json");
    if (res.ok) TOPIC_METADATA = safeArray(await res.json());
  } catch(e) {
    TOPIC_METADATA = [];
  }

  buildDynamicCategoryLayouts();
  
  if (ACTIVE_LIBS.has("all")) {
    await loadAllCategories();
  } else {
    await Promise.all(Array.from(ACTIVE_LIBS).map(c => loadCategory(c)));
  }

  await pipelineUpdate();
});
