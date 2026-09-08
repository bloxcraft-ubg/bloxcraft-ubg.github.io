(function injectAdsSystem() {
  const adsKey = localStorage.getItem('bloxcraftstudiosadskey');
  if (adsKey === 'false' || adsKey === false) return;

  const style = document.createElement('style');
  style.textContent = `
    .home {
      position: relative;
    }
    .side-ad-banner {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 160px;
      height: 600px;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .side-ad-banner a {
      display: block;
      width: 100%;
      height: 100%;
    }
    .side-ad-banner img {
      width: 160px;
      height: 600px;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }
    .side-ad-left {
      left: 20px;
    }
    .side-ad-right {
      right: 20px;
    }
    @media (max-width: 1200px) {
      .side-ad-banner {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  function createAdBanner(id, positionClass, linkUrl, imgUrl, relAttr) {
    const adContainer = document.createElement('div');
    adContainer.className = `side-ad-banner ${positionClass}`;
    adContainer.id = id;

    const link = document.createElement('a');
    link.href = linkUrl;
    link.target = '_blank';
    link.rel = relAttr;

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Ad';

    link.appendChild(img);
    adContainer.appendChild(link);
    return adContainer;
  }

  function initAds() {
    const homeContainer = document.getElementById('home');
    if (!homeContainer) return;

    document.querySelectorAll('.side-ad-banner').forEach(el => el.remove());

    const leftAd = createAdBanner(
      'side-ad-left',
      'side-ad-left',
      'https://beta.publishers.adsterra.com/referral/C9UemEpKss',
      'https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/adsettera_ads_a_banner.gif',
      'noopener nofollow'
    );

    const rightAd = createAdBanner(
      'side-ad-right',
      'side-ad-right',
      'https://ads.bloxcraft.win',
      'https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/universal_bloxcraft_a_banner.png',
      'noopener'
    );

    homeContainer.appendChild(leftAd);
    homeContainer.appendChild(rightAd);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();
