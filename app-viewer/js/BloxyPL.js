document.addEventListener("DOMContentLoaded", () => {
  const viewerFrame = document.getElementById("viewerFrame");
  const viewerTitle = document.getElementById("viewerTitle");
  const closeViewer = document.getElementById("closeViewer");
  const openNewTab = document.getElementById("openNewTab");

  const hash = window.location.hash || "";
  let gameType = "html";
  if (hash.startsWith("#emu")) {
    gameType = "emu";
  } else if (hash.startsWith("#swf")) {
    gameType = "swf";
  } else if (hash.startsWith("#html")) {
    gameType = "html";
  }

  const queryString = hash.includes("?") ? hash.substring(hash.indexOf("?")) : window.location.search;
  const params = new URLSearchParams(queryString);
  const gameName = params.get("name") || params.get("view");

  let processedHtml = "";

  if (gameName) {
    const encodedName = encodeURIComponent(gameName);
    if (viewerTitle) viewerTitle.textContent = gameName;

    (async () => {
      try {
        if (gameType === "swf") {
          processedHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/flash-em.css">
    <title>${gameName}</title>
</head>
<body>
    <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
    <div id="container">
        <div id="subContainer">
            <div id="gameContainer"></div>
            <div id="fullScreenBar">
                <h3 id="gameFName">${gameName}</h3>
                <div id="fullscreen"><img src="https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/flash-em.svg"></div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/flash-em.js" data-swf-file-src="https://raw.githack.com/bloxys-playables/ruffle-files/main/${encodedName}.swf" data-fname="Bloxcraft UBG | Ruffle Player">
    </script>
</body>
</html>`;

          if (viewerFrame) {
            viewerFrame.removeAttribute("sandbox");
            viewerFrame.srcdoc = processedHtml;
          }

        } else {
          let baseUrl = "";
          if (gameType === "emu") {
            baseUrl = "https://cdn.jsdelivr.net/gh/bloxys-playables/emulator-files@main/";
          } else {
            baseUrl = "https://cdn.jsdelivr.net/gh/bloxys-playables/html-files@main/";
          }

          const apiUrl = `${baseUrl}${encodedName}.html`;

          const r = await fetch(apiUrl);
          if (!r.ok) throw new Error(`HTTP ${r.status} - Failed to load ${apiUrl}`);

          const htmlText = await r.text();
          processedHtml = htmlText;

          if (viewerFrame) {
            viewerFrame.sandbox = "allow-scripts allow-forms allow-popups allow-pointer-lock allow-same-origin";
            viewerFrame.srcdoc = processedHtml;
          }
        }
      } catch (e) {
        console.error("Viewer error:", e);
        if (viewerTitle) viewerTitle.textContent = "Error loading game";
      }
    })();

    if (viewerFrame) {
      viewerFrame.addEventListener("load", () => {
        try {
          const iframeDoc = viewerFrame.contentDocument || viewerFrame.contentWindow.document;
          const iframeTitle = iframeDoc.querySelector("title")?.innerText;
          if (iframeTitle && gameType !== "swf") {
            viewerTitle.textContent = iframeTitle;
          }
        } catch (e) {}
      });
    }

    if (openNewTab) {
      openNewTab.addEventListener("click", (e) => {
        e.preventDefault();
        if (processedHtml) {
          const blob = new Blob([processedHtml], { type: "text/html" });
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, "_blank");
        }
      });
    }
  } else {
    if (viewerTitle) viewerTitle.textContent = "No game specified";
  }

  if (closeViewer) {
    closeViewer.addEventListener("click", () => {
      window.top.location.href = "https://google.com/";
    });
  }
});
