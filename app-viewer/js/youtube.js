const params = new URLSearchParams(window.location.search);
const view = params.get("view");

const JSON_URL = "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/libraries/youtube/gms.json";

const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const openNewTab = document.getElementById("openNewTab");

// Prepared values that we can write into a new tab. We attach the click handler early so
// the user's click is always treated as a direct gesture by the browser.
let preparedSrcdoc = null;
let preparedUrl = null;

function show404() {
  viewerFrame.src = "about:blank";
  viewerFrame.srcdoc = "<h1 style='color:white;background:black;height:100vh;display:flex;align-items:center;justify-content:center;margin:0;font-family:sans-serif;'>404 - Game Not Found</h1>";
  preparedSrcdoc = viewerFrame.srcdoc;
  preparedUrl = null;
}

function buildSrcdoc(url, html) {
  try {
    const parsed = new URL(url);
    const base = parsed.origin + parsed.pathname.replace(/[^/]*$/, "");
    return `<base href="${base}">${html}`;
  } catch (err) {
    return html;
  }
}

function loadIntoViewer(url) {
  return fetch(url, { credentials: "omit" })
    .then(r => {
      if (!r.ok) throw new Error("Failed to fetch page: " + r.status);
      return r.text();
    })
    .then(html => {
      const srcdoc = buildSrcdoc(url, html);

      // Always load into about:blank via srcdoc so we control the content.
      viewerFrame.src = "about:blank";
      viewerFrame.srcdoc = srcdoc;

      // Save prepared content for opening in a new tab later
      preparedSrcdoc = srcdoc;
      preparedUrl = url;

      return srcdoc;
    });
}

// Attach the new-tab handler immediately so clicks are always a user gesture.
openNewTab.onclick = () => {
  // Prefer preparedSrcdoc if available (we can write into about:blank)
  const toWrite = preparedSrcdoc || viewerFrame.srcdoc || null;
  const urlFallback = preparedUrl || (typeof currentFullUrl !== 'undefined' ? currentFullUrl : null);

  if (toWrite) {
    // Open about:blank without noopener so we can write into it.
    const popup = window.open("about:blank", "_blank");
    if (!popup) {
      // Popup blocked: open the real URL as a fallback (with noopener)
      if (urlFallback) window.open(urlFallback, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      popup.document.open();
      popup.document.write(toWrite);
      popup.document.close();
    } catch (err) {
      // Writing failed for some reason; fall back to opening the URL
      if (urlFallback) window.open(urlFallback, "_blank", "noopener,noreferrer");
    }

    return;
  }

  // No prepared content — open the real URL if we have one
  if (urlFallback) {
    window.open(urlFallback, "_blank", "noopener,noreferrer");
  } else {
    console.warn("Open in new tab: content not ready");
  }
};

let currentFullUrl = null;

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
      currentFullUrl = fullUrl;
      viewerTitle.textContent = game.name;

      // Try to fetch the remote HTML and inject it; on failure fall back to iframe src
      loadIntoViewer(fullUrl)
        .catch(err => {
          console.error('Could not load remote HTML (falling back to iframe src):', err);

          // If we can't fetch the HTML (CORS/network), fall back to setting iframe src.
          viewerFrame.srcdoc = ""; // clear any srcdoc
          viewerFrame.src = fullUrl;

          // preparedSrcdoc remains null; preparedUrl lets us open the real URL
          preparedSrcdoc = null;
          preparedUrl = fullUrl;
        });
    })
    .catch(err => {
      console.error(err);
      show404();
    });
}

// Close button
const closeBtn = document.getElementById("closeViewer");
if (closeBtn) closeBtn.onclick = () => { window.top.location.href = "/"; };
