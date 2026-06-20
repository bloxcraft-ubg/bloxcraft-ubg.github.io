const grid = document.getElementById("grid");
const search = document.getElementById("search");
const count = document.getElementById("count");

const PAGE_SIZE = 60;

const DATA = {
  blox: [], gn: [], elite: [], sea: [], ugs: [], seraph: [],
  ckv: [], hydra: [], ccported: [], googleclass: [], truffled: [],
  nowgg: [], alexrworlds: [], lupine: [], "3kh0": [], "3kh0lite": [],
  tglsc: [], selenite: [], velera: []
};

let CURRENT = [];
let FILTERED = [];
let RENDERED = 0;
let OBSERVER_SENTINEL = null;

const OBSERVER = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    RESET_OBSERVER_ONLY();
    render(false);
  }
}, { rootMargin: "300px" });

function safeArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === 'object') {
    if (Array.isArray(v.games)) return v.games;
    if (Array.isArray(v.data)) return v.data;
    if (Array.isArray(v.list)) return v.list;
    if (Array.isArray(v.assets)) return v.assets;

    const vals = Object.values(v);
    const objectsOnly = vals.filter(x => x && typeof x === 'object' && !Array.isArray(x));
    
    if (objectsOnly.length > 0) {
       return Object.entries(v)
         .filter(([, val]) => val && typeof val === 'object' && !Array.isArray(val))
         .map(([k, val]) => ({ ...val, _idFallback: k }));
    }
  }
  return [];
}

function normalize(g) {
  if (!g || !g.name || !g.url) return null;
  return {
    name: g.name,
    img: g.img || "/1f3ae.png",
    altImg: g.altImg || null,
    url: g.url
  };
}

const withTimeout = (fn, ms = 4000) => Promise.race([
  fn(),
  new Promise(resolve => setTimeout(resolve, ms))
]);

async function loadBlox() {
  try {
    const r = await fetch("/games/gms.json");
    if (!r.ok) return;
    DATA.blox = safeArray(await r.json()).map(normalize).filter(Boolean);
  } catch (e) {}
}

async function loadGN() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/freebuisness/assets/zones.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.gn = safeArray(d)
      .filter(g => g.id !== -1 && g.name && !g.name.startsWith("[!]"))
      .map(g => ({
        name: g.name,
        img: "https://cdn.jsdelivr.net/gh/freebuisness/covers@main/" + (g.cover || "").replace("{COVER_URL}", ""),
        url: "/app-viewer/gn-math/?gn-id=" + g.id
      }));
  } catch (e) {}
}

async function loadElite() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharuniscool/elite-gamez.github.io@main/games.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.elite = safeArray(d).map(g => ({
      name: g.title || "Unknown",
      img: "https://cdn.jsdelivr.net/gh/tharuniscool/elite-gamez.github.io@main/" + g.image,
      url: "/app-viewer/elite-gamez?url=" + encodeURIComponent(g.url)
    }));
  } catch (e) {}
}

async function loadSea() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/sea-bean-unblocked/sde@main/zzz.json");
    if (!r.ok) return;
    const d = await r.json();
    DATA.sea = safeArray(d).map(g => {
      const cover = (g.cover || "").replace("{COVER_URL}/", "");
      return {
        name: g.name || "Unknown",
        img: cover.startsWith("http")
          ? cover
          : "https://cdn.jsdelivr.net/gh/sea-bean-unblocked/Singlemile@main/Icon/" + cover,
        url: "/app-viewer/sea-bean?view=" + encodeURIComponent(g.id)
      };
    });
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
  
  DATA.ugs = results.flat();
}

async function loadSeraph() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/DominumNetwork/dominum@main/src/assets/libraries/seraph/games.json");
    if (!r.ok) return;
    const d = await r.json();
    const BASE = "https://cdn.jsdelivr.net/gh/a456pur/seraph@main/games/";

    DATA.seraph = safeArray(d).map(g => ({
      name: g.name || "Unknown",
      img: g.img || "",
      url: "/app-viewer/seraph/?view=" + (g.url ? g.url.replace(BASE, "") : "")
    }));
  } catch (e) {}
}

async function loadCKV() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/carbonicality/ChickenKingsVault@main/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.ckv = safeArray(d)
      .map(g => {
        const gameUrl = g?.html || g?.url;
        if (!gameUrl) return null;

        return {
          name: g.name || g.title || "Unknown",
          img: g.img || g.image || g.thumb || "/1f3ae.png",
          url: "/app-viewer/chicken-kings-vault/?view=" + encodeURIComponent(gameUrl)
        };
      })
      .filter(Boolean);
  } catch (e) {}
}

async function loadHydra() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/Hydra-Network/hydra-assets@main/gmes.json");
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

    DATA.hydra = rawArray.map(g => {
      if (!g || typeof g !== "object") return null;
      
      const file = g.file_name || g.link || g.url;
      if (!file) return null;

      let thumb = g.thumb || g.image || g.img || "/1f3ae.png";
      if (thumb !== "/1f3ae.png" && !thumb.startsWith("http")) {
        thumb = "https://cdn.jsdelivr.net/gh/Hydra-Network/hydra-assets@main/" + thumb.replace(/^\/+/, "");
      }

      return {
        name: g.title || g.name || "Unknown",
        img: thumb,
        url: "/app-viewer/hydra-network/?view=" + encodeURIComponent(file)
      };
    }).filter(Boolean);
  } catch (e) {}
}

async function loadCCPorted() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/ccported-stupid-game-lib.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.ccported = safeArray(d)
      .map(g => {
        const id = g?.Id || g?.id || g?._idFallback;
        if (!id) return null;
        
        let img = g?.img || g?.image || g?.thumb || g?.thumbnail || "/1f3ae.png";
        if (g?.base) img = g.base + "/thumb.jpg";

        return {
          name: g.name || g.title || "Game " + id,
          img: img,
          url: "/app-viewer/ccported/?view=" + encodeURIComponent(id)
        };
      })
      .filter(Boolean);
  } catch (e) {}
}

async function loadGoogleClass() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/bloxcraft-st/google-class-files@main/assets/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.googleclass = safeArray(d).map(g => ({
      name: g.name || "Unknown",
      img: g.img || "",
      url: "/app-viewer/google-class/?view=" + encodeURIComponent(g.url)
    }));
  } catch (e) {}
}

async function loadTruffled() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/aukak/truffled@main/public/js/json/g.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.truffled = safeArray(d).map(g => {
      if (!g.url) return null;

      const thumb = (g.thumbnail || "")
        .replace(/^\/+/, "")
        .replace(/^png\/games\//, "");

      return {
        name: g.name,
        img: thumb
          ? "https://cdn.jsdelivr.net/gh/aukak/truffled@main/public/png/games/" + thumb
          : "/1f3ae.png",
        url: "/sail/embed/#https://truffled.lol/" + g.url.replace(/^\/+/, "")
      };
    }).filter(Boolean);
  } catch (e) {}
}

async function loadNowGG() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/nowgg.fun/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.nowgg = safeArray(d).map(g => {
      if (!g.name || !g.url) return null;

      let cleanUrl = g.url.trim();
      if (!cleanUrl.startsWith("http")) cleanUrl = "https://" + cleanUrl;

      return {
        name: g.name,
        img: g.img || "/1f3ae.png",
        url: "/sail/embed/#" + cleanUrl
      };
    }).filter(Boolean);
  } catch (e) {}
}

async function loadAlexrworlds() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/dskjfoisjfsjio/alexrsworld@latest/singlefilegames.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.alexrworlds = safeArray(d).map(g => ({
      name: g.title || "Unknown",
      img: g.img || "/1f3ae.png",
      url: "/app-viewer/alexr-world-s/?view=" + encodeURIComponent(g.title)
    }));
  } catch (e) {}
}

async function loadLupine() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/LupineVault@main/assets/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.lupine = safeArray(d).map(g => {
      if (!g.name) return null;

      const encoded = encodeURIComponent(g.name);

      return {
        name: g.name,
        img: "https://cdn.jsdelivr.net/gh/tharun9772/LupineVault@main/assets/images/games/tile/" + encoded + ".png",
        altImg: "https://cdn.jsdelivr.net/gh/tharun9772/LupineVault@main/assets/images/games/large/" + encoded + ".png",
        url: "/app-viewer/LupineVault/?view=" + encoded
      };
    }).filter(Boolean);
  } catch (e) {}
}

async function load3kh0() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/3kh0/3kh0-assets.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA["3kh0"] = safeArray(d).map(name => ({
      name,
      img: "https://raw.githack.com/tharun9772/3kh0-assets/main/" + name + "/splash.png",
      url: "/app-viewer/3kh0/?view=" + encodeURIComponent(name)
    }));
  } catch (e) {}
}

async function load3kh0Lite() {
  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/3kh0/3kh0-lite.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA["3kh0lite"] = safeArray(d).map(g => ({
      name: g.title || "Unknown",
      img: "https://raw.githack.com/3kh0/3kh0-lite/main/" + g.imgSrc,
      url: "/app-viewer/3kh0/lite/?view=" + encodeURIComponent(g.link)
    }));
  } catch (e) {}
}

async function loadTGLSC() {
  try {
    const r = await fetch("https://math-question-generator.dk-ubg.workers.dev/bloxy/ubg/games.json");
    if (!r.ok) return;
    const d = await r.json();
    const base = "https://math-question-generator.dk-ubg.workers.dev";

    DATA.tglsc = safeArray(d).map(g => {
      if (!g?.title || !g?.embed_url) return null;

      return {
        name: g.title,
        img: base + "/" + (g.thumbnail || "").replace(/^\/+/, ""),
        url: "/sail/embed/#" + g.embed_url.replace(/^https?:\/\//, ""),
        category: g.category,
        status: g.status
      };
    }).filter(Boolean);
  } catch (e) {}
}

async function loadSelenite() {
  try {
    const r = await fetch("https://math-quests-cc.dk-ubg.workers.dev/resources/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.selenite = safeArray(d).map(g => {
      if (!g?.name || !g?.image || !g?.directory) return null;

      const dir = String(g.directory).replace(/^\/+/, "").replace(/\/+$/, "");

      return {
        name: g.name,
        img: "https://math-quests-cc.dk-ubg.workers.dev/resources/semag/" + dir + "/" + g.image,
        url: "/sail/embed/#https://selenite.cc/resources/semag/" + dir + "/index.html"
      };
    }).filter(Boolean);
  } catch (e) {}
}

async function loadVelera() {
  try {
    const r = await fetch("https://math-of-cc.dk-ubg.workers.dev/data/games.json");
    if (!r.ok) return;
    const d = await r.json();

    DATA.velera = safeArray(d).map(g => {
      if (!g?.title || !g?.location) return null;

      return {
        name: g.title,
        img: "https://math-of-cc.dk-ubg.workers.dev/" + String(g.image || "").replace(/^\/+/, ""),
        url: "/sail/embed/#https://velara.cc/" + String(g.location || "").replace(/^\/+/, "")
      };
    }).filter(Boolean);
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

document.querySelectorAll(".cat").forEach(el => {
  el.onclick = async () => {
    document.querySelectorAll(".cat").forEach(c => c.classList.remove("active"));
    el.classList.add("active");

    const cat = el.dataset.cat;

    CURRENT = [];
    FILTERED = [];
    RESET_RENDER();

    if (cat === "all") {
      await Promise.allSettled(Object.values(LOADER_MAP).map(fn => withTimeout(fn, 4000)));
      CURRENT = Object.values(DATA).flat();
    } else {
      if (LOADER_MAP[cat]) await LOADER_MAP[cat]();
      CURRENT = DATA[cat] || [];
    }

    const v = search.value.toLowerCase().trim();
    FILTERED = CURRENT.filter(g => g?.name?.toLowerCase().includes(v));
    RESET_RENDER();
    updateCount();
    render(true);
  };
});

if (search) {
  search.oninput = () => {
    const v = search.value.toLowerCase().trim();
    FILTERED = CURRENT.filter(g => g?.name?.toLowerCase().includes(v));
    RESET_RENDER();
    updateCount();
    render(true);
  };
}

function render(reset = false) {
  if (!grid) return;
  const fallback = "/1f3ae.png";

  if (reset) {
    grid.innerHTML = "";
    RENDERED = 0;
  }

  const valid = FILTERED.filter(g => g && g.name && g.url);
  const slice = valid.slice(RENDERED, RENDERED + PAGE_SIZE);
  const frag = document.createDocumentFragment();

  for (const g of slice) {
    const card = document.createElement("div");
    card.className = "game-card";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = g.img || fallback;

    img.onerror = () => {
      if (g.altImg && !img.dataset.retried) {
        img.dataset.retried = "true";
        img.src = g.altImg;
      } else {
        img.src = fallback;
      }
    };

    const title = document.createElement("h3");
    title.textContent = g.name;

    const link = document.createElement("a");
    link.className = "play-btn";
    link.href = g.url;
    link.textContent = "Play";

    card.append(img, title, link);
    frag.appendChild(card);
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

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = document.querySelector(".cat.active");
  const cat = activeTab ? activeTab.dataset.cat : "blox";

  if (cat === "all") {
    await Promise.allSettled(Object.values(LOADER_MAP).map(fn => withTimeout(fn, 4000)));
    CURRENT = Object.values(DATA).flat();
  } else {
    if (LOADER_MAP[cat]) await LOADER_MAP[cat]();
    CURRENT = DATA[cat] || [];
  }

  const query = search ? search.value.toLowerCase().trim() : "";
  FILTERED = CURRENT.filter(g => g?.name?.toLowerCase().includes(query));

  updateCount();
  render(true);
});
