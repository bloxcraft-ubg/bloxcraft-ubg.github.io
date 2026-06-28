const params = new URLSearchParams(window.location.search);
const view = params.get("view");

const JSON_URL = "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/libraries/youtube/gms.json";

const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const openNewTab = document.getElementById("openNewTab");

function show404(){
  viewerFrame.srcdoc = "<h1 style='color:white;background:black;height:100vh;display:flex;align-items:center;justify-content:center;margin:0;font-family:sans-serif;'>404 - Game Not Found</h1>";
}

if (!view) {
  show404();
} else {
  const targetName = decodeURIComponent(view);

  fetch(JSON_URL)
    .then(r => r.json())
    .then(data => {
      const game = data.find(g => g.name === targetName);
      if (!game || !game.url) throw new Error("Game entry missing");

      const fullUrl = game.url;
      viewerTitle.textContent = game.name;

      fetch(fullUrl)
        .then(r => r.text())
        .then(html => {
          viewerFrame.srcdoc = html;
        });

      openNewTab.onclick = async () => {
        try {
          const html = await fetch(fullUrl).then(r => r.text());
          const tab = window.open("about:blank");
          if (tab) {
            tab.document.write(html);
            tab.document.close();
          }
        } catch (e) {
          console.error("Popup blocker or link generation failure encountered:", e);
        }
      };

    })
    .catch(err => {
      console.error(err);
      show404();
    });
}

document.getElementById("closeViewer").onclick = () => {
  window.top.location.href = "/";
};
