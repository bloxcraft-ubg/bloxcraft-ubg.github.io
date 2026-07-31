        function toggleIframeFullscreen() {
            const iframe = document.getElementById('app-iframe');
            if (!document.fullscreenElement) {
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

function getRequestedUrl() {
    const rawSearch = window.location.search;
    if (!rawSearch) return null;

    const eqIndex = rawSearch.indexOf('=');
    let targetUrl = '';

    if (eqIndex !== -1) {
        targetUrl = rawSearch.substring(eqIndex + 1);
    } else {
        targetUrl = rawSearch.substring(1);
    }

    targetUrl = decodeURIComponent(targetUrl).trim();

    if (/^(\.|\/|[a-zA-Z0-9_\-\/\?=\&])+$/.test(targetUrl)) {
        return targetUrl;
    }

    return null;
}

        function monitorIframeTitle() {
            const iframe = document.getElementById('app-iframe');
            const titleElement = document.getElementById('viewerTitle');

            const titleCheckInterval = setInterval(() => {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    
                    const innerViewerTitle = iframeDoc.getElementById('viewerTitle');
                    let fetchedTitle = "";

                    if (innerViewerTitle && innerViewerTitle.innerText.trim()) {
                        fetchedTitle = innerViewerTitle.innerText.trim();
                    } else if (iframeDoc.title && iframeDoc.title.trim()) {
                        fetchedTitle = iframeDoc.title.trim();
                    }

                    if (fetchedTitle && fetchedTitle !== "Opening..." && fetchedTitle !== "Loading...") {
                        titleElement.innerText = fetchedTitle;
                        document.title = fetchedTitle + " | Xbox Hub";
                        clearInterval(titleCheckInterval);
                    }
                } catch (e) {
                    const targetUrl = getRequestedUrl();
                    if (targetUrl && (titleElement.innerText === "Opening..." || titleElement.innerText === "Loading...")) {
                        const cleanTitle = targetUrl.replace(/[\.\/]/g, ' ').trim();
                        if (cleanTitle) {
                            const formattedTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
                            titleElement.innerText = formattedTitle;
                            document.title = formattedTitle + " | Xbox Hub";
                        }
                    }
                    clearInterval(titleCheckInterval);
                }
            }, 300);
        }

        window.addEventListener('DOMContentLoaded', () => {
            const iframe = document.getElementById('app-iframe');
            const targetUrl = getRequestedUrl();

            if (targetUrl) {
                iframe.src = targetUrl;
                iframe.addEventListener('load', monitorIframeTitle);
            } else {
                document.getElementById('viewerTitle').innerText = "Bloxcraft UBG: Xbox Hub";
            }
        });
