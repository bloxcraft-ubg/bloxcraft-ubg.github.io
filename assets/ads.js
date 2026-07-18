(function() { 
    var adsKey = localStorage.getItem("bloxcraftstudiosadskey"); 
    if (adsKey === "false") { 
        return; 
    } 
    var newScript = document.createElement('script'); 
    newScript.src = 'https://pl30426901.effectivecpmnetwork.com/c7/09/bd/c709bd80ae0a08ba1e460d88205ea50a.js'; 

    var targetScript = document.querySelector('script[src="/assets/ads.js"]'); 

    if (targetScript && targetScript.parentNode) { 
        targetScript.parentNode.insertBefore(newScript, targetScript.nextSibling); 
    } else { 
        document.body.appendChild(newScript); 
    }
})();
