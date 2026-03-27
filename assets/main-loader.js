const hintEl = document.getElementById("hint");
const loader = document.getElementById("loader");
const main = document.getElementById("main");

setTimeout(() => {
  if (typeof pickNoRepeat === "function") {
    hintEl.textContent = pickNoRepeat();
  } else {
    hintEl.textContent = "Welcome to Bloxcraft UBG, the unblocked game site with 1000+ games and has a proxy!";
  }
}, 50);

setTimeout(() => {
  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
    main.style.opacity = "1";
  }, 5000);

}, 5000);
