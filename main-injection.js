(function() {
    'use strict';

    const originalTitle = document.title;
    const originalFavicon = document.querySelector("link[rel*='icon']")?.href || "/favicon.ico";

    const awayTitle = "Home";
    const awayFavicon = "https://cdn.jsdelivr.net/gh/tharun9772/Bloxcraft-UBG@main/Google_Classroom_Logo.svg.png"; 

    document.addEventListener("visibilitychange", () => {
        let icon = document.querySelector("link[rel*='icon']");
        if (!icon) {
            icon = document.createElement('link');
            icon.rel = 'shortcut icon';
            document.head.appendChild(icon);
        }
        if (document.hidden) {
            document.title = awayTitle;
            icon.setAttribute("href", awayFavicon);
        } else {
            document.title = originalTitle;
            icon.setAttribute("href", originalFavicon);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) {
            e.preventDefault();
            try { window.top.location.href = "https://www.google.com"; } catch (err) { window.location.href = "https://www.google.com"; }
        }
    });

    setInterval(() => {
        if (window.self === window.top) {
            const threshold = 160;
            if ((window.outerWidth - window.innerWidth > threshold) || (window.outerHeight - window.innerHeight > threshold)) {
                window.location.href = "https://www.google.com";
            }
        }
        const start = performance.now();
        debugger;
        if (performance.now() - start > 100) {
            try { window.top.location.href = "https://www.google.com"; } catch (err) { window.location.href = "https://www.google.com"; }
        }
    }, 500);

    const menu = document.createElement('div');
    menu.id = 'custom-macro-menu';
    
    const style = document.createElement('style');
    style.innerHTML = `
        #custom-macro-menu {
            position: absolute;
            background: #18181b;
            border: 1px solid #27272a;
            border-radius: 8px;
            padding: 6px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 13px;
            font-weight: 500;
            color: #e4e4e7;
            z-index: 99999999;
            display: none;
            min-width: 190px;
            user-select: none;
        }
        .macro-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 6px;
            transition: background 0.15s ease, color 0.15s ease;
        }
        .macro-item:hover {
            background: #27272a;
            color: #ffffff;
        }
        .macro-item svg {
            width: 16px;
            height: 16px;
            margin-left: 12px;
            flex-shrink: 0;
            fill: currentColor;
        }
    `;
    document.head.appendChild(style);

    const externalIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
    const discordIcon = `<svg viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53a105.73,105.73,0,0,0,32,16.15,77.7,77.7,0,0,0,6.73-11A68.6,68.6,0,0,1,29.4,77.34c1-.71,2-1.46,3-2.23a74.12,74.12,0,0,0,62.43,0c1,.77,2,1.52,3,2.23a68.6,68.6,0,0,1-10.28,5.32,77,77,0,0,0,6.73,11,105.73,105.73,0,0,0,32-16.15C129.56,48.12,123.51,25.32,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/></svg>`;

    menu.innerHTML = `
        <div class="macro-item" id="opt-iframe">
            <span>Open about:blank</span>
            ${externalIcon}
        </div>
        <div class="macro-item" id="opt-discord">
            <span>Discord</span>
            ${discordIcon}
        </div>
    `;
    document.body.appendChild(menu);

    window.addEventListener('contextmenu', (e) => {
        if (e.shiftKey) return;
        e.preventDefault();
        e.stopPropagation();
        
        menu.style.left = `${e.pageX}px`;
        menu.style.top = `${e.pageY}px`;
        menu.style.display = 'block';
    });

    window.addEventListener('click', () => {
        menu.style.display = 'none';
    });

    document.getElementById('opt-iframe').addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = 'none';

        const currentUrl = window.location.href;
        const newTab = window.open('about:blank', '_blank');
        
        if (newTab) {
            newTab.document.body.style.margin = '0';
            newTab.document.body.style.height = '100vh';
            newTab.document.body.style.overflow = 'hidden';

            const iframe = newTab.document.createElement('iframe');
            iframe.src = currentUrl;
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.margin = '0';
            iframe.style.padding = '0';

            newTab.document.body.appendChild(iframe);
        }
    });

    document.getElementById('opt-discord').addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = 'none';
        window.open('https://discord.gg/sqPFYEsz8F', '_blank');
    });

})();
