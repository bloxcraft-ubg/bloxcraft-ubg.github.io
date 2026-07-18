(function() {
    var adsKey = localStorage.getItem("bloxcraftstudiosadskey");
    if (adsKey === "false") {
        var targetScript = document.querySelector('script[src="https://pl30426901.effectivecpmnetwork.com/c7/09/bd/c709bd80ae0a08ba1e460d88205ea50a.js"]');
        if (targetScript) {
            targetScript.remove();
        }
    }
})();
