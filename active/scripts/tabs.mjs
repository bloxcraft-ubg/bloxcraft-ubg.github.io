import { getFavicon, rAlert } from "./utils.mjs";
import { getUV, search } from "./prxy.mjs";

const { span, iframe, button, img } = van.tags;
const {
  tags: { "ion-icon": ionIcon },
} = van;

var tabs = [];
var selectedTab = null;

const pageBack = document.getElementById("page-back");
const pageForward = document.getElementById("page-forward");
const pageRefresh = document.getElementById("page-refresh");
const urlForm = document.getElementById("url-form");
const urlInput = document.getElementById("url-input");
const newTabButton = document.getElementById("new-tab");
const tabList = document.getElementById("tab-list");
const tabView = document.getElementById("tab-view");

pageBack.onclick = () => {
  if (selectedTab && selectedTab.view.contentWindow) {
    selectedTab.view.contentWindow.history.back();
  }
};

pageForward.onclick = () => {
  if (selectedTab && selectedTab.view.contentWindow) {
    selectedTab.view.contentWindow.history.forward();
  }
};

pageRefresh.onclick = () => {
  if (selectedTab && selectedTab.view.contentWindow) {
    selectedTab.view.contentWindow.location.reload();
  }
};

newTabButton.onclick = () => {
  addTab("math-hub.pages.dev/newtab");
};

const devtoolsOption = document.getElementById("devtools-option");
const abcOption = document.getElementById("abc-option");
const gitOption = document.getElementById("git-option");

devtoolsOption.onclick = () => {
  try {
    selectedTab.view.contentWindow.eval(eruda);
    rAlert("Injected successfully.<br>Click the icon on the bottom right.");
  } catch (error) {
    rAlert("Failed to inject.");
  }
};

abcOption.onclick = () => {
  abCloak(selectedTab.view.src);
  rAlert("Opened in about:blank");
};

gitOption.onclick = () => {
  window.open("https://github.com/tharun9772/bloxproxy", "_blank");
};

urlForm.onsubmit = async (e) => {
  e.preventDefault();
  if (selectedTab) {
    selectedTab.view.src = await getUV(urlInput.value);
  }
};

let eruda = `fetch("https://cdn.jsdelivr.net/npm/eruda")
.then((res) => res.text())
.then((data) => {
  eval(data);
  if (!window.erudaLoaded) {
    eruda.init({ defaults: { displaySize: 45, theme: "AMOLED" } });
    window.erudaLoaded = true;
  }
});`;

function abCloak(cloakUrl) {
  var win = window.open();
  var iframe = win.document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.top = "0px";
  iframe.style.left = "0px";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.src = cloakUrl;
  win.document.body.appendChild(iframe);
}

const tabItem = (tab) => {
  return button(
    {
      onclick: (e) => {
        if (
          !e.target.classList.contains("close") &&
          !e.target.classList.contains("close-icon")
        ) {
          focusTab(tab);
        }
      },
      class: "tab-item hover-focus1",
    },
    img({ src: getFavicon(tab.url) }),
    span(tab.title),

    button(
      {
        onclick: () => {
          tabs.splice(tabs.indexOf(tab), 1);

          if (tab == selectedTab) {
            selectedTab = null;
            if (tabs.length) focusTab(tabs[tabs.length - 1]);
            else
              setTimeout(() => {
                addTab("math-hub.pages.dev/newtab");
              }, 100);
          }

          tabView.removeChild(tab.view);
          tab.view.remove();

          localStorage.setItem(
            "tabs",
            JSON.stringify(
              tabs.map((tab) => {
                return tab.url;
              })
            )
          );

          tab.item.style.animation = "slide-out-from-bottom 0.1s ease";
          setTimeout(() => {
            tabList.removeChild(tab.item);
            tab.item.remove();
          }, 75);
        },
        class: "close",
      },
      ionIcon({ name: "close", class: "close-icon" })
    )
  );
};

const tabFrame = (tab) => {
  return iframe({
    class: "tab-frame",
    src: tab.proxiedUrl,
    sandbox: "allow-scripts allow-forms allow-same-origin",
    onload: (e) => {
      let parts = e.target.contentWindow.location.pathname.slice(1).split("/");
      let targetUrl = decodeURIComponent(
        __uv$config.decodeUrl(parts[parts.length - 1])
      );

      tab.title = tab.view.contentWindow.document.title;
      console.log(tab.title);
      tab.url = targetUrl;
      tabList.children[tabs.indexOf(tab)].children[1].textContent = tab.title;
      tabList.children[tabs.indexOf(tab)].children[0].src =
        getFavicon(targetUrl);

      if (tab == selectedTab) {
        urlInput.value = targetUrl;
      }

      localStorage.setItem(
        "tabs",
        JSON.stringify(
          tabs.map((tab) => {
            return tab.url;
          })
        )
      );
    },
  });
};

function focusTab(tab) {
  if (!tab) return;
  if (selectedTab) {
    selectedTab.view.style.display = "none";
    tabList.children[tabs.indexOf(selectedTab)].classList.remove("selectedTab");
  }
  selectedTab = tab;
  tab.view.style.display = "block";

  urlInput.value = tab.url;

  tabList.children[tabs.indexOf(tab)].classList.add("selectedTab");
}

async function addTab(link) {
  let url;

  url = await getUV(link);

  let tab = {};

  tab.title = decodeURIComponent(
    __uv$config.decodeUrl(url.substring(url.lastIndexOf("/") + 1))
  ).replace(/^https?:\/\//, "");
  tab.url = search(link);
  tab.proxiedUrl = url;
  tab.icon = null;
  tab.view = tabFrame(tab);
  tab.item = tabItem(tab);

  tab.view.addEventListener("load", () => {
    let links = tab.view.contentWindow.document.querySelectorAll("a");
    links.forEach((element) => {
      element.addEventListener("click", (event) => {
        let isTargetTop = event.target.target === "_top";
        if (isTargetTop) {
          event.preventDefault();
          addTab(event.target.href);
        }
      });
    });
  });

  tabs.push(tab);

  tabList.appendChild(tab.item);

  tabView.appendChild(tab.view);
  focusTab(tab);
}

addTab("math-hub.pages.dev/newtab");

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("inject")) {
  const injection = urlParams.get("inject");

  setTimeout(() => {
    addTab(injection);
  }, 100);
}
