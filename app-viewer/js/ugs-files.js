const params = new URLSearchParams(window.location.search);
let view = params.get("view");

const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const openNewTab = document.getElementById("openNewTab");
const closeViewer = document.getElementById("closeViewer");

function cleanName(name) {
  return name.replace(/^cl/i, "").replace(/\.html$/i, "");
}

function show404() {
  viewerFrame.srcdoc = `
    <style>
      body{
        background:black;
        color:white;
        font-family:sans-serif;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        font-size:20px;
      }
    </style>
    404 - Game Not Found
  `;
  viewerTitle.textContent = "Not Found";
}

async function load() {
  if (!view) return show404();
  view = view.replace(/^"+|"+$/g, "").trim();
  let filename = view.endsWith(".html") ? view : (view + ".html");
  const gameUrl = `https://raw.githack.com/bubbls/ugs-singlefile/main/UGS-Files/${encodeURIComponent(filename)}`;

  try {
    const res = await fetch(gameUrl);
    if (!res.ok) return show404(); 

    const html = await res.text();

    viewerTitle.textContent = cleanName(filename);
    viewerFrame.srcdoc = html;
    
    openNewTab.onclick = (e) => {
      e.preventDefault();
      const w = window.open("about:blank", "_blank");
      if (w) {
        w.document.open();
        w.document.write(html);
        w.document.close();
      }
    };
  } catch (e) {
    console.error("Error direct loading viewer file:", e);
    show404();
  }
}

load();
