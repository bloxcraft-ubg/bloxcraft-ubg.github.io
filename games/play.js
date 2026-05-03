const grid = document.getElementById("grid");
const search = document.getElementById("search");
const count = document.getElementById("count");

const PAGE_SIZE = 60;

let DATA = {
  blox: [],
  gn: [],
  elite: [],
  sea: [],
  ugs: [],
  seraph: [],
  ckv: [],
  hydra: [],
  ccported: [],
  googleclass: []
};

let CURRENT = [];
let FILTERED = [];

let RENDERED = 0;
let OBSERVER_SENTINEL = null;

/* -------------------- LOADERS -------------------- */

async function loadBlox(){
  if(DATA.blox.length) return;
  const r = await fetch('/games/games.json');
  DATA.blox = await r.json();
}

async function loadGN(){
  if(DATA.gn.length) return;

  const r = await fetch('https://cdn.jsdelivr.net/gh/freebuisness/assets/zones.json');
  const d = await r.json();

  DATA.gn = d
    .filter(g => g.id !== -1 && !g.name.startsWith("[!]"))
    .map(g => ({
      name: g.name || "Unknown",
      img: 'https://cdn.jsdelivr.net/gh/freebuisness/covers@main/' + (g.cover || "").replace('{COVER_URL}',''),
      url: '/app-viewer/gn-math/?gn-id=' + g.id
    }));
}

async function loadElite(){
  if(DATA.elite.length) return;

  const r = await fetch("https://cdn.jsdelivr.net/gh/elite-gamez/elite-gamez.github.io@main/games.json");
  const d = await r.json();

  DATA.elite = d.map(g => ({
    name: g.title || "Unknown",
    img: 'https://cdn.jsdelivr.net/gh/elite-gamez/elite-gamez.github.io@main/' + g.image,
    url: '/app-viewer/elite-gamez?url=' + encodeURIComponent(g.url)
  }));
}

async function loadSea(){
  if(DATA.sea.length) return;

  const r = await fetch("https://cdn.jsdelivr.net/gh/sea-bean-unblocked/sde@main/zzz.json");
  const d = await r.json();

  DATA.sea = d.map(g => {
    const cover = (g.cover || "").replace("{COVER_URL}/", "");

    return {
      name: g.name || "Unknown",
      img: cover.startsWith("http")
        ? cover
        : 'https://cdn.jsdelivr.net/gh/sea-bean-unblocked/Singlemile@main/Icon/' + cover,
      url: '/app-viewer/sea-bean?view=' + encodeURIComponent(g.id)
    };
  });
}

async function loadUGS(){
  if(DATA.ugs.length) return;

  const repos = [
    "tharun9772/ugs-1",
    "tharun9772/ugs-2",
    "tharun9772/ugs-3"
  ];

  let games = [];

  for(const repo of repos){
    try{
      const r = await fetch(`https://api.github.com/repos/${repo}/contents/`);
      const d = await r.json();

      d.forEach(f => {
        if(f.type === "file" && f.name.startsWith("cl") && f.name.endsWith(".html")){
          games.push({
            name: f.name.replace(/^cl/,"").replace(".html",""),
            img: "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/5968517.png",
            url: '/app-viewer/ugs-files?view=' + encodeURIComponent(f.name)
          });
        }
      });

    }catch(e){
      console.warn("UGS failed:", repo);
    }
  }

  DATA.ugs = games;
}

async function loadSeraph(){
  if(DATA.seraph.length) return;

  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/DominumNetwork/dominum@main/src/assets/libraries/seraph/games.json");
    const d = await r.json();

    const BASE = "https://cdn.jsdelivr.net/gh/a456pur/seraph@main/games/";

    DATA.seraph = d.map(g => ({
      name: g.name || "Unknown",
      img: g.img,
      url: '/app-viewer/seraph/?view=' + (g.url ? g.url.replace(BASE, "") : "")
    }));

  } catch(e){
    console.error("Seraph failed:", e);
  }
}

async function loadCKV(){
  if(DATA.ckv.length) return;

  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/carbonicality/ChickenKingsVault@main/games.json");
    const d = await r.json();

    DATA.ckv = d.map(g => ({
      name: g.name || "Unknown",
      img: g.img
        ? "https://cdn.jsdelivr.net/gh/carbonicality/ChickenKingsVault@main/images/" + g.img
        : "",
      url: "/app-viewer/chicken-kings-vault/?view=" + g.html
    }));

  } catch(e){
    console.error("CKV failed:", e);
  }
}

async function loadHydra(){
  if(DATA.hydra.length) return;

  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/Hydra-Network/hydra-assets@main/gmes.json");
    const d = await r.json();

    DATA.hydra = d.map(g => ({
      name: g.title || "Unknown",
      img: g.thumb
        ? "https://cdn.jsdelivr.net/gh/Hydra-Network/hydra-assets@main/" + g.thumb
        : "",
      url: "/app-viewer/hydra-network/?view=" + g.file_name
    }));

  } catch(e){
    console.error("Hydra failed:", e);
  }
}

async function loadCCPorted(){
  if(DATA.ccported.length) return;

  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/ccported-stupid-game-lib.json");
    const d = await r.json();

    DATA.ccported = d.map(g => {
      if(!g.base || !g.Id) return null;

      return {
        name: (g.name && g.name.trim()) ? g.name : "Game " + g.Id,
        img: g.base + "/thumb.jpg",
        url: "/app-viewer/ccported/?view=" + g.Id
      };
    }).filter(Boolean);

  } catch(e){
    console.error("CCPorted failed:", e);
  }
}

async function loadGoogleClass(){
  if(DATA.googleclass.length) return;

  try {
    const r = await fetch("https://cdn.jsdelivr.net/gh/bloxcraft-st/google-class-files@main/assets/games.json");
    const d = await r.json();

    DATA.googleclass = d.map(g => ({
      name: g.name || "Unknown",
      img: g.img || "",
      url: "/app-viewer/google-class/?view=" + encodeURIComponent(g.url)
    }));

  } catch(e){
    console.error("GoogleClass failed:", e);
  }
}



document.querySelectorAll(".cat").forEach(btn=>{
  btn.onclick = async () => {

    document.querySelectorAll(".cat").forEach(c=>c.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;

    if(cat === "blox") await loadBlox();
    if(cat === "gn") await loadGN();
    if(cat === "elite") await loadElite();
    if(cat === "sea") await loadSea();
    if(cat === "ugs") await loadUGS();
    if(cat === "seraph") await loadSeraph();
    if(cat === "ckv") await loadCKV();
    if(cat === "hydra") await loadHydra();
    if(cat === "ccported") await loadCCPorted();
    if(cat === "googleclass") await loadGoogleClass();

    if(cat === "all"){
      await Promise.all([
        loadBlox(),
        loadGN(),
        loadElite(),
        loadSea(),
        loadUGS(),
        loadSeraph(),
        loadCKV(),
        loadHydra(),
        loadCCPorted(),
        loadGoogleClass()
      ]);

      CURRENT = Object.values(DATA).flat();
    } else {
      CURRENT = DATA[cat] || [];
    }

    FILTERED = CURRENT;

    RESET_RENDER();
    updateCount();
    render(true);
  };
});



search.oninput = () => {
  const v = search.value.toLowerCase();

  FILTERED = CURRENT.filter(g =>
    g?.name?.toLowerCase?.().includes(v)
  );

  RESET_RENDER();
  updateCount();
  render(true);
};



function render(reset = false){
  const fallback = "/1f3ae.png";

  if(reset){
    grid.innerHTML = "";
    RENDERED = 0;
  }

  const slice = FILTERED
    .filter(g => g && g.name && g.url)
    .slice(RENDERED, RENDERED + PAGE_SIZE);

  const frag = document.createDocumentFragment();

  for(const g of slice){

    const card = document.createElement("div");
    card.className = "game-card";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.src = g.img || fallback;
    img.onerror = () => img.src = fallback;

    const title = document.createElement("h3");
    title.textContent = g.name;

    const link = document.createElement("a");
    link.className = "play-btn";
    link.href = g.url;
    link.textContent = "Play";

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(link);

    frag.appendChild(card);
  }

  grid.appendChild(frag);

  RENDERED += slice.length;

  setupObserver();
}



function setupObserver(){
  if(OBSERVER_SENTINEL) return;

  OBSERVER_SENTINEL = document.createElement("div");
  OBSERVER_SENTINEL.id = "sentinel";
  grid.appendChild(OBSERVER_SENTINEL);

  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      OBSERVER_SENTINEL.remove();
      OBSERVER_SENTINEL = null;

      render(false);
    }
  }, {
    rootMargin: "300px"
  });

  observer.observe(OBSERVER_SENTINEL);
}



function RESET_RENDER(){
  RENDERED = 0;

  if(OBSERVER_SENTINEL){
    OBSERVER_SENTINEL.remove();
    OBSERVER_SENTINEL = null;
  }
}

function updateCount(){
  count.textContent = FILTERED.length + " games";
}



(async ()=>{
  await loadBlox();
  CURRENT = DATA.blox;
  FILTERED = CURRENT;

  updateCount();
  render(true);
})();
