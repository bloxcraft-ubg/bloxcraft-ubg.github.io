const grid = document.getElementById("grid");

let DATA = {
  blox: [],
  gn: [],
  elite: [],
  sea: [],
  ugs: [],
  seraph: []
};

let CURRENT = [];
let FILTERED = [];

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
      name: g.name,
      img: 'https://cdn.jsdelivr.net/gh/freebuisness/covers@main/' + g.cover.replace('{COVER_URL}',''),
      url: '/app-viewer/gn-math/?gn-id=' + g.id
    }));
}

async function loadElite(){
  if(DATA.elite.length) return;

  const r = await fetch("https://cdn.jsdelivr.net/gh/elite-gamez/elite-gamez.github.io@main/games.json");
  const d = await r.json();

  DATA.elite = d.map(g => ({
    name: g.title,
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

  const r = await fetch("https://cdn.jsdelivr.net/gh/DominumNetwork/dominum@main/src/assets/libraries/seraph/games.json");
  const d = await r.json();

  const BASE = "https://cdn.jsdelivr.net/gh/a456pur/seraph@main/games/";

  DATA.seraph = d.map(g => {
    const remaining = g.url.replace(BASE, "");

    return {
      name: g.name,
      img: g.img,
      url: '/app-viewer/seraph/?view=' + encodeURIComponent(remaining)
    };
  });
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

    if(cat === "all"){
      await Promise.all([
        loadBlox(),
        loadGN(),
        loadElite(),
        loadSea(),
        loadUGS(),
        loadSeraph()
      ]);

      CURRENT = Object.values(DATA).flat();
    } else {
      CURRENT = DATA[cat];
    }

    FILTERED = CURRENT;
    updateCount();
    render();
  };
});

search.oninput = () => {
  const v = search.value.toLowerCase();

  FILTERED = CURRENT.filter(g =>
    g.name.toLowerCase().includes(v)
  );

  updateCount();
  render();
};

function render(){
  const fallback = "https://via.placeholder.com/300x200?text=Game";

  grid.innerHTML = FILTERED
    .filter(g => g && g.name && g.url)
    .map((g,i)=>{

      let cls = "game-card";
      if((i+1)%16 === 0) cls += " big";

      return `
      <div class="${cls}">
        <img 
          loading="lazy"
          decoding="async"
          src="${g.img || fallback}"
          onerror="this.src='${fallback}'"
        >
        <h3>${g.name}</h3>
        <a class="play-btn" href="${g.url}">Play</a>
      </div>`;
    }).join("");
}

function updateCount(){
  count.textContent = FILTERED.length + " games";
}

(async ()=>{
  await loadBlox();
  CURRENT = DATA.blox;
  FILTERED = CURRENT;
  updateCount();
  render();
})();
