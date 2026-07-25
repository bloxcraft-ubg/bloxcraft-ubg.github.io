(() => {

    const status = document.getElementById("wispsttc");


    const primaryServers = [
        "wss://pgis-wisp.onrender.com/",
        "wss://pgis-wisp-2.onrender.com/",
        "wss://pgis-wisp-3.onrender.com/",
        "wss://pgis-wisp-4.onrender.com/",
        "wss://wisp.mercurywork.shop/",
        "wss://bare-server.fly.dev/wisp/",
        "wss://homework--spmspy0800.replit.app/wisp/"
    ];


    const fallbackServer = "wss://wisp.classroom.lat/";


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



    function updateSuccess(server) {

        status.style.color = "#28a745";

        status.innerHTML =
            `Current Wisp Server: <b>${server}</b>`;

    }



    function updateFailure() {

        status.style.color = "#dc3545";

        status.textContent =
            "No Wisp servers are currently available.";

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

                        latency:
                            Math.round(
                                performance.now() - start
                            )

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


        const cached =
            localStorage.getItem("proxy-ws");

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

            winner =
                await Promise.any(checks);

        } catch {

            winner = null;

        }




        if (winner) {


            localStorage.setItem(
                "proxy-ws",
                winner.url
            );


            setCookie(
                "proxy-ws-monthly-check",
                "1",
                30
            );


            updateSuccess(
                winner.url
            );


            return;

        }


        const fallback =
            await testServer(
                fallbackServer
            );


        if (fallback) {


            localStorage.setItem(
                "proxy-ws",
                fallback.url
            );


            updateSuccess(
                fallback.url
            );


            return;

        }



        localStorage.removeItem(
            "proxy-ws"
        );


        updateFailure();

    }




    const cached =
        localStorage.getItem("proxy-ws");



    if (
        cached &&
        getCookie("proxy-ws-monthly-check")
    ) {


        updateSuccess(cached);

        testServer(cached)
        .then(result => {

            if (!result)
                findServer();

        });



    } else {


        findServer();


    }


})();
