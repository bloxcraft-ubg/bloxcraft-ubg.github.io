(() => {
    const status = document.getElementById("wispsttc");

// Do NOT Change Wisp Servers
    
    const primaryServers = [
        "wss://pgis-wisp.onrender.com/",
        "wss://pgis-wisp-2.onrender.com/",
        "wss://pgis-wisp-3.onrender.com/",
        "wss://pgis-wisp-4.onrender.com/",
        "wss://wisp.mercurywork.shop/",
        "wss://bare-server.fly.dev/wisp/",
        "wss://homework--spmspy0800.replit.app/wisp/",
        "wss://onyxv1.ai.studio/wisp/",
        "wss://reverse.myapl.org/wisp/",
        "wss://inkmath.adijaya.id/wisp/"
    ];

    const fallbackServer = "wss://wisp.classroom.lat/";

    function getByodServer() {
        try {
            const href = window.top.location.href;
            const urlObj = new URL(href);
            return `${urlObj.protocol === 'http:' ? 'ws://' : 'wss://'}${urlObj.host}/wisp`;
        } catch {
            return null;
        }
    }

    function setCookie(name, value, days) {
        const expires = new Date(
            Date.now() + days * 86400000
        ).toUTCString();
        document.cookie =
            `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }

    function getCookie(name) {
        const match = document.cookie.match(
            new RegExp("(^|; )" + name + "=([^;]*)")
        );
        return match
            ? decodeURIComponent(match[2])
            : null;
    }

    function updateSuccess(server, isByod = false) {
        status.style.color = "#28a745";
        if (isByod) {
            status.innerHTML = `BYOD Link Detected, Wisp Server Is <b>${server}</b> And Will 99.999% Work!`;
        } else {
            status.innerHTML = `Current Wisp Server: <b>${server}</b>`;
        }
    }

    function updateFailure() {
        status.style.color = "#dc3545";
        status.textContent = "No Wisp servers are currently available.";
    }

    function testServer(url) {
        return new Promise(resolve => {
            let finished = false;
            let ws;
            const start = performance.now();

            try {
                ws = new WebSocket(url);
            } catch {
                resolve(null);
                return;
            }

            const timeout = setTimeout(() => {
                finish(false);
            }, 2500);

            function finish(success) {
                if (finished)
                    return;
                finished = true;
                clearTimeout(timeout);

                try {
                    ws.close();
                } catch {}

                if (success) {
                    resolve({
                        url: url,
                        latency: Math.round(performance.now() - start)
                    });
                } else {
                    resolve(null);
                }
            }

            ws.onopen = () => finish(true);
            ws.onerror = () => finish(false);
            ws.onclose = () => {};
        });
    }

    async function findServer() {
        const byodUrl = getByodServer();
        if (byodUrl) {
            const byodResult = await testServer(byodUrl);
            if (byodResult) {
                localStorage.setItem("proxy-ws", byodResult.url);
                setCookie("proxy-ws-monthly-check", "1", 30);
                updateSuccess(byodResult.url, true);
                return;
            }
        }

        const cached = localStorage.getItem("proxy-ws");
        const servers = [
            ...primaryServers,
            ...(cached ? [cached] : [])
        ];

        const checks = servers.map(server =>
            testServer(server).then(result => {
                if (!result)
                    throw new Error();
                return result;
            })
        );

        let winner = null;
        try {
            winner = await Promise.any(checks);
        } catch {
            winner = null;
        }

        if (winner) {
            localStorage.setItem("proxy-ws", winner.url);
            setCookie("proxy-ws-monthly-check", "1", 30);
            updateSuccess(winner.url, false);
            return;
        }

        const fallback = await testServer(fallbackServer);
        if (fallback) {
            localStorage.setItem("proxy-ws", fallback.url);
            updateSuccess(fallback.url, false);
            return;
        }

        localStorage.removeItem("proxy-ws");
        updateFailure();
    }

    const cached = localStorage.getItem("proxy-ws");

    if (
        cached &&
        getCookie("proxy-ws-monthly-check")
    ) {
        updateSuccess(cached, false);
        testServer(cached)
        .then(result => {
            if (!result)
                findServer();
        });
    } else {
        findServer();
    }
})();
