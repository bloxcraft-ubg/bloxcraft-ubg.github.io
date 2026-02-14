const iframe=document.getElementById("contentFrame");
const htmlContainer=document.getElementById("htmlContainer");
const home=document.getElementById("home");
const extraOverlay=document.getElementById("extraOverlay");
const extraNavGroup=document.getElementById("extraNavGroup");

const predefinedExtras=[
  {name:"Tools",link:"/tools",svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M246.9 82.3L271 67.8C292.6 54.8 317.3 48 342.5 48C379.3 48 414.7 62.6 440.7 88.7L504.6 152.6C519.6 167.6 528 188 528 209.2L528 240.1L547.7 259.8L547.7 259.8C563.3 244.2 588.6 244.2 604.3 259.8C620 275.4 619.9 300.7 604.3 316.4L540.3 380.4C524.7 396 499.4 396 483.7 380.4C468 364.8 468.1 339.5 483.7 323.8L464 304L433.1 304C411.9 304 391.5 295.6 376.5 280.6L327.4 231.5C312.4 216.5 304 196.1 304 174.9L304 162.2C304 151 298.1 140.5 288.5 134.8L246.9 109.8C236.5 103.6 236.5 88.6 246.9 82.4zM50.7 466.7L272.8 244.6L363.3 335.1L141.2 557.2C116.2 582.2 75.7 582.2 50.7 557.2C25.7 532.2 25.7 491.7 50.7 466.7z"/></svg>'},
  {name:"Updates",link:"/updates",svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24"> <path d="M128 0c13.3 0 24 10.7 24 24l0 40 144 0 0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40 48 0c26.5 0 48 21.5 48 48l0 48L32 160l0-48c0-26.5 21.5-48 48-48l48 0 0-40c0-13.3 10.7-24 24-24zM416 192l0 224c0 26.5-21.5 48-48 48L80 464c-26.5 0-48-21.5-48-48L32 192l384 0zM312 248c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0zM88 248c-13.3 0-24 10.7-24 24s10.7 24 24 24l160 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 248zM248 344c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0zM88 344c-13.3 0-24 10.7-24 24s10.7 24 24 24l96 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 344z" fill="currentColor"/> </svg>'},
];

let extraNavs=JSON.parse(localStorage.getItem("extraNavs")||"[]");

function clearContent(){
  iframe.style.display="none";
  iframe.src="";
  htmlContainer.style.display="none";
  htmlContainer.innerHTML="";
}

function showHome(){
  clearContent();
  home.style.display="flex";
}

async function loadPage(url){
  home.style.display="none";
  clearContent();
  iframe.src=url;
  iframe.style.display="block";
}

function toggleExtraOverlay(){
  extraOverlay.style.display=extraOverlay.style.display==="flex"?"none":"flex";
}

function renderExtraNavGroup(){
  extraNavGroup.innerHTML="";
  extraNavs.forEach(e=>{
    const btn=document.createElement("button");
    btn.className="nav-btn";
    btn.innerHTML=e.svg;
    btn.onclick=()=>loadPage(e.link);
    extraNavGroup.appendChild(btn);
  });
}

function renderExtraOverlay(){
  const container = document.getElementById("extraList");
  container.innerHTML = "";

  predefinedExtras.forEach(item => {
    const div = document.createElement("div");
    div.className = "extraItem";
    div.innerHTML = `<div class="extraIconPreview">${item.svg}</div><span>${item.name}</span>`;

    const exists = extraNavs.find(x => x.name === item.name);

    if(!exists){
      const addBtn = document.createElement("button");
      addBtn.textContent = "Add";
      addBtn.onclick = () => {
        extraNavs.push(item);
        localStorage.setItem("extraNavs", JSON.stringify(extraNavs));
        renderExtraNavGroup();
        renderExtraOverlay();
      };
      div.appendChild(addBtn);
    } else {
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.onclick = () => {
        extraNavs = extraNavs.filter(x => x.name !== item.name);
        localStorage.setItem("extraNavs", JSON.stringify(extraNavs));
        renderExtraNavGroup();
        renderExtraOverlay();
      };
      div.appendChild(removeBtn);
    }

    container.appendChild(div);
  });
}

renderExtraNavGroup();
renderExtraOverlay();


function exportSiteSave(){
  const localStorageData = {};
  for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    localStorageData[key] = localStorage.getItem(key);
  }

  const cookies = document.cookie
    .split("; ")
    .filter(Boolean)
    .map(c => {
      const eq = c.indexOf("=");
      return {
        name: c.substring(0, eq),
        value: c.substring(eq + 1)
      };
    });

  const saveData = {
    version: 1,
    timestamp: Date.now(),
    localStorage: localStorageData,
    cookies: cookies
  };

  const blob = new Blob(
    [JSON.stringify(saveData, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bloxcraft-site-save.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}

function importSiteSave(input){
  const file = input.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try{
      const data = JSON.parse(reader.result);

      if(data.localStorage){
        Object.keys(data.localStorage).forEach(key=>{
          localStorage.setItem(key, data.localStorage[key]);
        });
      }

      if(Array.isArray(data.cookies)){
        data.cookies.forEach(c=>{
          document.cookie = `${c.name}=${c.value}; path=/`;
        });
      }

      if(typeof renderExtraNavGroup === "function") renderExtraNavGroup();
      if(typeof renderExtraOverlay === "function") renderExtraOverlay();

      alert("Site save imported successfully!\nReloading page…");
      location.reload();
    }catch(err){
      alert("Invalid save file.");
    }
  };
  reader.readAsText(file);

  input.value = "";
}
