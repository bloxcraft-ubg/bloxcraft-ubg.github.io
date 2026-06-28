const params = new URLSearchParams(window.location.search);
const view = params.get("view");
const BASE = "https://cdn.jsdelivr.net/gh/NoahsAmazingTutoringHelp/Noahs-Calculus-Tutor/";
const JSON_URL = "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/libraries/noahh/gms_replaced.json";

const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const openNewTab = document.getElementById("openNewTab");

function show404(){
  viewerFrame.srcdoc = "<h1 style='color:white;background:black;height:100vh;display:flex;align-items:center;justify-content:center;'>404</h1>";
}

if(!view){
  show404();
} else {
  fetch(JSON_URL)
    .then(r => r.text())
    .then(rawText => {
      const fixedJsonText = rawText
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
        .replace(/,\s*([\]}])/g, '$1');
      
      return JSON.parse(fixedJsonText);
    })
    .then(data => {

      const game = data.find(g => {
        const urlStr = g.url || "";
        return urlStr.endsWith(view);
      });

      if(!game) throw new Error("Game entry missing from JSON schema list");

      const fullUrl = BASE + view;
      viewerTitle.textContent = game.title || game.name;

      fetch(fullUrl)
        .then(r => r.text())
        .then(html => {
          viewerFrame.srcdoc = html;
        });

      openNewTab.onclick = async () => {
        try {
          const html = await fetch(fullUrl).then(r => r.text());
          const tab = window.open("about:blank");
          if(tab) {
            tab.document.write(html);
            tab.document.close();
          }
        } catch (e) {
          console.error("Failed to inject window resource instance:", e);
        }
      };

    })
    .catch((err) => {
      console.error(err);
      show404();
    });
}

document.getElementById("closeViewer").onclick = ()=>{
  window.top.location.href = "https://google.com/";
};
