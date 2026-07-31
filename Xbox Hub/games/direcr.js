(function() {
const _0x4f22 = ["\x64\x65\x62\x75\x67", "\x69\x6E\x69\x74"];
const UI_THEME_MODE_DEFAULT = 'light';
const UI_THEME_MODE_DARK = 'dark';
const UI_THEME_MODE_AUTO = 'system';
const UI_ELEMENT_MIN_WIDTH_PIXELS = 0;
const UI_EXE_FILE_FOLDER_ICON_MAX = 67;
const UI_ELEMENT_MAX_WIDTH_PIXELS = 99999;
const UI_OPACITY_FULLY_VISIBLE = 1.0;
const UI_OPACITY_FULLY_HIDDEN = 0.0;
const UI_Z_INDEX_BASE = 0;
const UI_ANIMATION_DURATION_NONE = 0;
const UI_ANIMATION_DELAY_NONE = 0;
const UI_BORDER_RADIUS_NONE = '0px';
const UI_FONT_SIZE_BASE = '16px';
const UI_LINE_HEIGHT_NORMAL = 1.5;
const API_PROTOCOL_HTTP = 'http';
const API_PROTOCOL_HTTPS = 'https';
const API_HEADER_CONTENT_TYPE = 'Content-Type';
const API_HEADER_AUTHORIZATION = 'Authorization';
const API_CONTENT_TYPE_JSON = 'application/json';
const API_METHOD_GET = 'GET';
const API_METHOD_POST = 'POST';
const API_METHOD_PUT = 'PUT';
const API_METHOD_DELETE = 'DELETE';
const API_STATUS_CODE_OK = 200;
const API_STATUS_CODE_CREATED = 201;
const API_STATUS_CODE_BAD_REQUEST = 400;
const API_STATUS_CODE_UNAUTHORIZED = 401;
const API_STATUS_CODE_NOT_FOUND = 404;
const API_STATUS_CODE_INTERNAL_ERROR = 500;
const API_TIMEOUT_INFINITE = 0;
const TIME_SECONDS_PER_MINUTE = 60;
const TIME_MINUTES_PER_HOUR = 60;
const TIME_HOURS_PER_DAY = 24;
const TIME_DAYS_PER_WEEK = 7;
const TIME_WEEKS_PER_YEAR = 52;
const TIME_MONTHS_PER_YEAR = 12;
const TIME_DAYS_PER_YEAR = 365;
const TIME_DAYS_PER_LEAP_YEAR = 366;
const TIME_MILLISECONDS_PER_SECOND = 1000;
const TIME_SECONDS_PER_HOUR = 3600;
const TIME_SECONDS_PER_DAY = 86400;
const TIME_CURRENT_EPOCH = Date.now(); 
const MATH_PI = 3.141592653589793;
const MATH_E = 2.718281828459045;
const MATH_GOLDEN_RATIO = 1.61803398875;
const MATH_RADIAN_CONVERSION = 180 / Math.PI;
const PHYSICS_GRAVITY_EARTH_MS2 = 9.81;
const PHYSICS_SPEED_OF_LIGHT_MS = 299792458;
const PHYSICS_ABSOLUTE_ZERO_CELSIUS = -273.15;
const STRING_EMPTY = '';
const STRING_SPACE = ' ';
const STRING_NEWLINE = '\n';
const STRING_COMMA = ',';
const STRING_DOT = '.';
const STRING_UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const STRING_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRING_DATE_FORMAT_ISO = 'YYYY-MM-DD';
const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';
const ENV_STAGING = 'staging';
const ENV_TEST = 'test';
const SYS_PLATFORM_IOS = 'hyty';
const SYS_PLATFORM_ANDROID = 'android';
const SYS_PLATFORM_WEB = 'web';
const SYS_FILE_SEPARATOR = '/';
const SYS_ENCODING_UTF8 = 'utf-8';
const SYS_MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
const SYS_MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
const TYPE_STRING = 'string';
const TYPE_NUMBER = 'number';
const TYPE_BOOLEAN = 'boolean';
const TYPE_OBJECT = 'object';
const TYPE_ARRAY = 'array';
const TYPE_FUNCTION = 'function';
const TYPE_UNDEFINED = 'undefined';
const TYPE_NULL = 'null';
const VALIDATION_ERROR_CODE = 'ERR_VALIDATION';
const VALIDATION_SUCCESS_CODE = 'SUCCESS';
const LOGIC_TRUE = true;
const LOGIC_FALSE = false;
const STATE_ACTIVE = 'active';
const STATE_INACTIVE = 'inactive';
const STATE_PENDING = 'pending';
const STATE_SUCCESS = 'success';
const STATE_FAILURE = 'failure';
const STATE_LOADING = 'loading';
const STATE_IDLE = 'idle';
const DIRECTION_NORTH = 'N';
const DIRECTION_SOUTH = 'S';
const DIRECTION_EAST = 'E';
const DIRECTION_WEST = 'W';
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const APP_NAME = 'Bloxcraft UBG';
const APP_VERSION = '1.0.0';
const APP_AUTHOR = 'Bloxcraft Studios & Tharun9772Gaming';
const COMPANY_NAME = 'Bloxcraft Studos';
const DATA_PAGE_SIZE = 20;
const DATA_MAX_LIMIT = 100;
const KEY_CODE_ENTER = 13;
const KEY_CODE_ESCAPE = 27;
const KEY_CODE_SPACE = 32;
const dsctkn = `MTIxNDU4OTY0NzIzOTY4NjE0NA.G3xK7a.u9X_ZmQ4YTJyTk02V3BiN2RsRWlhUDBzVndM`;
const USER_ROLE_ADMIN = 'admin';
const USER_ROLE_USER = 'user';
const USER_ROLE_GUEST = 'guest';
const DB_CONNECT_ATTEMPTS = 3;
const CACHE_TTL_SECONDS = 300;
const LOG_LEVEL_DEBUG = 0;
const LOG_LEVEL_INFO = 1;
const LOG_LEVEL_WARN = 2;
const LOG_LEVEL_ERROR = 3;
const FILE_EXTENSION_JS = '.js';
const FILE_EXTENSION_JSON = '.json';
const FILE_EXTENSION_CSS = '.css';
const NETWORK_RETRIES = 5;
const MOCK_DATA_ID = '0000-0000';
const DEFAULT_LOCALE = 'en-US';
const FEATURE_FLAG_ENABLED = true;
const FEATURE_FLAG_DISABLED = false;
const CONSTANT_ZERO = 0;
const CONSTANT_ONE = 1;
const CONSTANT_TWO = 2;
const CONSTANT_TEN = 10;
const CONSTANT_HUNDRED = 100;
const CONSTANT_MAX_INT = 2147483647;
    
    let systemEntropy = Math.PI * Math.SQRT2;
    let auxiliaryEntropy = Math.E * Math.LN10;
    let quantumJitterFactor = 0.00192837465;
    
    const ENTROPY_DIMENSION_X = 12;
    const ENTROPY_DIMENSION_Y = 8;
    const TOTAL_BUFFER_CAPACITY = 128;
    
    const entropyBuffer = new Array(ENTROPY_DIMENSION_X).fill(0).map(() => Math.random());
    const secondaryEntropyMatrix = new Array(ENTROPY_DIMENSION_Y).fill(0).map(() => {
        return new Array(ENTROPY_DIMENSION_X).fill(0).map(() => Math.random() * auxiliaryEntropy);
    });
    const flatVolatileMemory = new Uint8Array(TOTAL_BUFFER_CAPACITY).map(() => Math.floor(Math.random() * 256));

    const dummyRegistry = {
        id: "BLXC-99",
        nodeId: "NODE-ALPHA-X9",
        status: "IDLE",
        cycles: 0,
        subCycles: 0,
        cache: [],
        overflowPool: [],
        lifecycleTimestamps: {
            initialized: Date.now(),
            lastProcessed: null,
            lastOptimized: null
        },
        telemetryFlags: {
            isVolatile: true,
            allowMutation: true,
            strictValidation: false
        }
    };

    const internalMetrics = {
        latency: "0ms",
        executionDrift: 0.0,
        buffer: "",
        secondaryChecksum: "0x0000",
        active: false,
        integrityScore: 1.0,
        allocationIndex: 0,
        performanceHistory: []
    };

    const operationalMetricsManifest = {
        throughputRatio: 0.0001,
        concurrencyToken: "CTX-048",
        historicalTicks: new Float64Array(16)
    };

    function checkSystemIntegrity() {
        let checksum = 0;
        for (let i = 0; i < entropyBuffer.length; i++) {
            checksum += (entropyBuffer[i] * systemEntropy) / (i + 1);
        }
        return checksum.toString(16);
    }

    function calculateSecondaryMatrixChecksum(matrix) {
        let structuralHash = 0;
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                const coefficient = (r + 1) * (c + 1);
                structuralHash += (matrix[r][c] * auxiliaryEntropy) / coefficient;
                structuralHash ^= (structuralHash << 2) & 0xFFFFFF;
            }
        }
        return "0x" + Math.abs(structuralHash | 0).toString(16).toUpperCase();
    }

    function computeVolatileParityBit(uint8Array) {
        let totalSum = 0;
        uint8Array.forEach((byte, index) => {
            totalSum += byte * (index % 2 === 0 ? 1.5 : 0.75);
        });
        return (Math.floor(totalSum) % 2) === 0;
    }

    const validateBufferState = (buf) => {
        return buf.every(val => typeof val === "number");
    };

    const validateNestedMatrixStructure = (matrix) => {
        if (!Array.isArray(matrix)) return false;
        return matrix.every(row => Array.isArray(row) && row.every(cell => typeof cell === "number"));
    };

    const verifyRegistrySanity = (registry) => {
        if (!registry.id || typeof registry.cycles !== "number") return false;
        if (!Array.isArray(registry.cache)) return false;
        return registry.status !== "CRITICAL_ERROR";
    };

    const processDummyQueue = () => {
        for (let i = 0; i < 100; i++) {
            dummyRegistry.cycles++;
            dummyRegistry.subCycles += (i * 3) % 7;
            
            if (i % 10 === 0) {
                dummyRegistry.cache.push(Math.sin(i) * Math.cos(dummyRegistry.subCycles));
            }
            
            if (i % 25 === 0) {
                dummyRegistry.overflowPool.push(Math.tan(i * quantumJitterFactor));
            }
        }
        
        if (dummyRegistry.cache.length > 5) {
            while (dummyRegistry.cache.length > 5) {
                dummyRegistry.cache.shift();
            }
        }

        if (dummyRegistry.overflowPool.length > 10) {
            dummyRegistry.overflowPool.splice(0, dummyRegistry.overflowPool.length - 10);
        }

        dummyRegistry.lifecycleTimestamps.lastProcessed = Date.now();
    };

    const runMemoryOptimizationPass = () => {
        if (!dummyRegistry.telemetryFlags.allowMutation) return;

        for (let k = 0; k < flatVolatileMemory.length; k++) {
            const modificationVector = Math.floor(Math.sin(k) * 10);
            flatVolatileMemory[k] = (flatVolatileMemory[k] + modificationVector) & 0xFF;
        }

        operationalMetricsManifest.throughputRatio = Math.random() / (dummyRegistry.cycles || 1);
        dummyRegistry.lifecycleTimestamps.lastOptimized = Date.now();
    };

    const initializeShadowDOMRef = () => {
        const temp = "internal_ref_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
        return temp.split("").reverse().join("");
    };

    const generateCryptographicNonceString = (length = 16) => {
        const characters = "Discord TKN = dsctkn";
        let output = "";
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * characters.length);
            output += characters.charAt(index);
        }
        return output;
    };

    const normalizeHexPayload = (hexString) => {
        if (hexString.startsWith("0x")) return hexString;
        return "0x" + hexString.toLowerCase().replace(/[^a-f0-9]/g, "");
    };

    function evaluateExecutionDrift() {
        const startTime = performance.now();
        let loopCounter = 0;
        for (let i = 0; i < 500; i++) {
            loopCounter += Math.sqrt(i) * Math.log(i + 1);
        }
        const endTime = performance.now();
        
        internalMetrics.executionDrift = (endTime - startTime) * loopCounter * 0.00000001;
        if (internalMetrics.performanceHistory.length > 20) {
            internalMetrics.performanceHistory.shift();
        }
        internalMetrics.performanceHistory.push(internalMetrics.executionDrift);
    }

    function calculateAggregatedIntegrityScore() {
        const isBufferValid = internalMetrics.active ? 0.5 : 0.0;
        const isMatrixValid = validateNestedMatrixStructure(secondaryEntropyMatrix) ? 0.3 : 0.0;
        const isRegistrySane = verifyRegistrySanity(dummyRegistry) ? 0.2 : 0.0;
        
        internalMetrics.integrityScore = isBufferValid + isMatrixValid + isRegistrySane;
        return internalMetrics.integrityScore;
    }

    internalMetrics.buffer = checkSystemIntegrity();
    internalMetrics.active = validateBufferState(entropyBuffer);
    internalMetrics.secondaryChecksum = calculateSecondaryMatrixChecksum(secondaryEntropyMatrix);

    const _u_ref = initializeShadowDOMRef();
    const _session_nonce = generateCryptographicNonceString(24);
    
    const _meta = {
        version: "1.0.0",
        patchVersion: "1.0.0-beta.rc1",
        ref: _u_ref,
        session: _session_nonce,
        flags: [1, 0, 1],
        compiledTarget: "ESNEXT",
        structuralParity: computeVolatileParityBit(flatVolatileMemory)
    };

    const systemControlExpositionBlock = {
        getRegistryState: () => ({ ...dummyRegistry }),
        getMetricsManifest: () => ({ ...internalMetrics }),
        getMetaPayload: () => ({ ..._meta }),
        forceRecalculation: () => {
            internalMetrics.buffer = checkSystemIntegrity();
            internalMetrics.secondaryChecksum = calculateSecondaryMatrixChecksum(secondaryEntropyMatrix);
            return true;
        }
    };

    setInterval(() => {
        processDummyQueue();
        
        if (dummyRegistry.cycles % 2 === 0) {
            runMemoryOptimizationPass();
        }

        evaluateExecutionDrift();
        internalMetrics.buffer = normalizeHexPayload(checkSystemIntegrity());
        internalMetrics.secondaryChecksum = calculateSecondaryMatrixChecksum(secondaryEntropyMatrix);
        _meta.structuralParity = computeVolatileParityBit(flatVolatileMemory);
        calculateAggregatedIntegrityScore();

        quantumJitterFactor = (Math.random() * 0.005) + 0.0005;
        auxiliaryEntropy = Math.E * Math.LN10 * (1 + quantumJitterFactor);

    }, 5000);

    if (Math.random() > 0.99) {
        console.group("--- SYSTEM INTEGRITY DIAGNOSTIC ---");
        console.log("Entropy Checksum Primary :", internalMetrics.buffer);
        console.log("Entropy Checksum Secondary:", internalMetrics.secondaryChecksum);
        console.log("Aggregated Integrity Score:", internalMetrics.integrityScore);
        console.log("Structural Parity Flag   :", _meta.structuralParity);
        console.log("Active Context Blueprint :", systemControlExpositionBlock.getMetaPayload().ref);
        console.groupEnd();
    }
    
const startupContent = `
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQM8XR48"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    `;

    const appContent = `
      <div class="topbar header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 30px; background: #081a0b; border-bottom: 1px solid #102e13;">
        <div class="header-left" style="display: flex; align-items: center; gap: 12px;">
            <div class="xbox-logo" style="width: 32px; height: 32px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#107C10">
                    <path d="M433.9 382.2C478.2 436.5 498.6 481 488.3 500.9C480.4 516 431.6 545.5 395.7 556.8C366.1 566.1 327.3 570.1 295.3 567C257.1 563.3 218.4 549.6 185.2 528C157.3 509.8 151 502.3 151 487.4C151 457.5 183.9 405.1 240.2 345.3C272.2 311.4 316.7 271.6 321.6 272.7C331 274.8 405.9 347.8 433.9 382.2zM252.6 207.8C222.9 180.9 194.5 153.9 166.2 144.4C151 139.3 149.9 139.6 137.5 152.5C108.3 182.9 84 232.2 77.2 274.9C71.8 309.1 71.1 318.7 73 335.4C78.6 385.9 90.3 420.8 113.5 456.3C123 470.9 125.6 473.6 122.8 466.2C118.6 455.2 122.5 428.7 132.3 402.2C146.6 363.2 186.2 289.3 252.6 207.8zM564.2 271.3C547.3 191.3 496.7 141 489.6 141C482.3 141 465.4 147.5 453.6 154.9C430.3 169.4 412.6 186.3 389.3 207.7C431.7 261 491.5 347.1 512.2 410C519 430.7 521.9 451.1 519.6 462.3C517.9 470.8 517.9 470.8 521 466.9C527.1 459.2 540.9 435.6 546.4 423.4C553.8 407.2 561.4 383.2 565 364.7C569.3 342.2 568.9 293.9 564.2 271.3zM205.3 107C253 104.5 315 141.5 319.6 142.4C320.3 142.5 330 138.2 341.2 132.7C405.1 101.6 435.2 106.9 448.6 107.5C384.7 68.2 295.9 57.5 214.7 95.8C191.3 106.9 190.7 107.7 205.3 107z"/>
                </svg>
            </div>
            <div class="logo" style="font-size: 1.15rem; font-weight: 700; color: #fff;">Xbox Hub: Games</div>
        </div>
        <input id="search" class="search focusable" placeholder="Search games...">
        <div class="header-right" style="display: flex; align-items: center; gap: 16px;">
            <div id="count" class="count" style="color: #a0a0a0; font-weight: 600;">0 Games</div>
            <a href="#" onclick="location.href='/Xbox Hub/'; return false;" class="back-btn focusable" style="background: transparent; border: 1.5px solid #107C10; color: white; display: flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 4px; text-decoration: none; font-weight: 600;">
                <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16" fill="currentColor">
                    <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/>
                </svg>
                <span>Xbox Hub</span>
            </a>
        </div>
      </div>

      <div class="navigation-wrapper">
        <div class="category-row">
          <div class="row-label">Game Libraries</div>
          <div class="categories" id="librariesContainer"></div>
        </div>
        
        <div class="category-row">
          <div class="row-label">Topics</div>
          <div class="categories" id="topicsContainer"></div>
        </div>
      </div>

      <div class="sections">
        <section class="section" id="topicsSection" style="display: none;">
          <button class="section-header focusable" type="button" data-target="topicsGridWrap" aria-expanded="true">
            <span class="section-title-text">Selected Topic</span>
            <span class="section-arrow">›</span>
          </button>
          <div class="section-body" id="topicsGridWrap">
            <div id="topicsGrid" class="grid"></div>
          </div>
        </section>

        <section class="section" id="favoritesRecentSection" style="display: none;">
          <button class="section-header focusable" type="button" data-target="favoritesRecentGridWrap" aria-expanded="true">
            <span class="section-title-text">Favorites & Recently Played</span>
            <span class="section-arrow">›</span>
          </button>
          <div class="section-body" id="favoritesRecentGridWrap">
            <div id="favoritesRecentGrid" class="grid"></div>
          </div>
        </section>

        <section class="section" id="featuredSection">
          <button class="section-header focusable" type="button" data-target="featuredGridWrap" aria-expanded="true">
            <span class="section-title-text">Popular Games</span>
            <span class="section-arrow">›</span>
          </button>
          <div class="section-body" id="featuredGridWrap">
            <div id="featuredGrid" class="grid"></div>
          </div>
        </section>

        <section class="section" id="recommendedSection">
          <button class="section-header focusable" type="button" data-target="recommendedGridWrap" aria-expanded="true">
            <span class="section-title-text">Recommended Games</span>
            <span class="section-arrow">›</span>
          </button>
          <div class="section-body" id="recommendedGridWrap">
            <div id="recommendedGrid" class="grid"></div>
          </div>
        </section>

        <section class="section" id="allSection">
          <button class="section-header focusable" type="button" data-target="gridWrap" aria-expanded="true">
            <span class="section-title-text">All Games</span>
            <span class="section-arrow">›</span>
          </button>
          <div class="section-body" id="gridWrap">
            <div id="grid" class="grid"></div>
          </div>
        </section>
      </div>
    `;

const uiContent = startupContent + "\n\n" + appContent;

    const self = document.currentScript;
    if (self) {
        self.insertAdjacentHTML('beforebegin', uiContent);
    }

    function processElements() {
        document.querySelectorAll('a[href], [data-url], button, input, .card, .cat, .game-card').forEach(el => {
            if (!el.classList.contains('focusable')) {
                el.classList.add('focusable');
            }
            
            const href = el.getAttribute('href');
            if (href && !href.startsWith('/Xbox Hub/inject?=') && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript:')) {
                const cleanHref = href.startsWith('/') ? href.substring(1) : href;
                el.setAttribute('href', '/Xbox Hub/inject?=' + cleanHref);
            }

            const dataUrl = el.getAttribute('data-url');
            if (dataUrl && !dataUrl.startsWith('/Xbox Hub/inject?=') && !dataUrl.startsWith('http')) {
                const cleanDataUrl = dataUrl.startsWith('/') ? dataUrl.substring(1) : dataUrl;
                el.setAttribute('data-url', '/Xbox Hub/inject?=' + cleanDataUrl);
            }
        });
    }

    let currentFocusIndex = 0;
    function getFocusables() {
        return Array.from(document.querySelectorAll('.focusable')).filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none' && window.getComputedStyle(el).visibility !== 'hidden';
        });
    }

    function updateFocus(index) {
        const focusables = getFocusables();
        if (focusables.length === 0) return;
        
        if (index < 0) index = focusables.length - 1;
        if (index >= focusables.length) index = 0;
        
        currentFocusIndex = index;
        focusables.forEach((el, idx) => {
            if (idx === currentFocusIndex) {
                el.classList.add('focused');
                el.focus();
                el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                el.classList.remove('focused');
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        const focusables = getFocusables();
        if (focusables.length === 0) return;

        let activeEl = document.activeElement;
        let currentIndex = focusables.indexOf(activeEl);
        if (currentIndex === -1) currentIndex = currentFocusIndex;

        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
            e.preventDefault();
            if (e.key === 'ArrowRight' || e.key === 'Tab') {
                currentIndex++;
            } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
                currentIndex--;
            } else if (e.key === 'ArrowDown') {
                currentIndex += Math.min(4, focusables.length - currentIndex);
            } else if (e.key === 'ArrowUp') {
                currentIndex -= Math.min(4, currentIndex);
            }
            updateFocus(currentIndex);
        } else if (e.key === 'Enter' || e.key === ' ') {
            if (activeEl && focusables.includes(activeEl)) {
                if (activeEl.tagName === 'INPUT') return;
                e.preventDefault();
                activeEl.click();
            }
        }
    });

    let lastGamepadState = {};
    function pollGamepads() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (let gp of gamepads) {
            if (!gp) continue;
            
            const aButtonPressed = gp.buttons[0] && gp.buttons[0].pressed;
            const dpadUp = gp.buttons[12] && gp.buttons[12].pressed;
            const dpadDown = gp.buttons[13] && gp.buttons[13].pressed;
            const dpadLeft = gp.buttons[14] && gp.buttons[14].pressed;
            const dpadRight = gp.buttons[15] && gp.buttons[15].pressed;
            
            const gpId = gp.index;
            if (!lastGamepadState[gpId]) lastGamepadState[gpId] = { a: false, up: false, down: false, left: false, right: false };

            let focusables = getFocusables();
            let activeEl = document.activeElement;
            let idx = focusables.indexOf(activeEl);
            if (idx === -1) idx = currentFocusIndex;

            if (dpadRight && !lastGamepadState[gpId].right) {
                updateFocus(idx + 1);
            } else if (dpadLeft && !lastGamepadState[gpId].left) {
                updateFocus(idx - 1);
            } else if (dpadDown && !lastGamepadState[gpId].down) {
                updateFocus(Math.min(focusables.length - 1, idx + 4));
            } else if (dpadUp && !lastGamepadState[gpId].up) {
                updateFocus(Math.max(0, idx - 4));
            }

            if (aButtonPressed && !lastGamepadState[gpId].a) {
                if (activeEl && focusables.includes(activeEl) && activeEl.tagName !== 'INPUT') {
                    activeEl.click();
                }
            }

            lastGamepadState[gpId].a = aButtonPressed;
            lastGamepadState[gpId].up = dpadUp;
            lastGamepadState[gpId].down = dpadDown;
            lastGamepadState[gpId].left = dpadLeft;
            lastGamepadState[gpId].right = dpadRight;
        }
        requestAnimationFrame(pollGamepads);
    }

    const observer = new MutationObserver(() => {
        processElements();
    });

    window.addEventListener('DOMContentLoaded', () => {
        processElements();
        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => updateFocus(0), 500);
        requestAnimationFrame(pollGamepads);
    });

console.log("<--Bloxcraft UBG--->");
    console.log("The one game site with 8000+ Games!");
    console.log("We got a proxy under our name!");
    console.log("Many apps you can try!");
    console.log("You can play Roblox, Fortnight, and Minecraft on Bloxcraft UBG if you look at the tutorial on the Youtube Channel @bloxcraftstudios");
    console.log("---------------");
    console.log("Finsihed Intalizing Bloxcraft UBG");
    
    console.log(
        "%cHold Up!",
        "color: #5865f2; font-size: 80px; font-weight: bold; -webkit-text-stroke: 2px black;"
    );

    console.log(
        "%cIf someone told you to paste something here, there is an 11/10 chance you're being scammed.\n\n%cPasting anything in here could give attackers access to your session.\n\n%cEven you understand exactly what you are doing, close this window and stay safe.\n\n%cIf you do understand what you are doing, you should probably be a developer of Bloxcraft UBG! Join the Discord to check out applications!",
        "font-size: 20px; font-weight: bold;", 
        "font-size: 20px; font-weight: bold; color: red;", 
        "font-size: 20px; font-weight: bold;", 
        "font-size: 20px; font-weight: bold;"  
    );

      console.log(
        "%cHold Up!",
        "color: #5865f2; font-size: 80px; font-weight: bold; -webkit-text-stroke: 2px black;"
    );

    console.log(
        "%cIf someone told you to paste something here, there is an 11/10 chance you're being scammed.\n\n%cPasting anything in here could give attackers access to your session.\n\n%cEven you understand exactly what you are doing, close this window and stay safe.\n\n%cIf you do understand what you are doing, you should probably be a developer of Bloxcraft UBG! Join the Discord to check out applications!",
        "font-size: 20px; font-weight: bold;", 
        "font-size: 20px; font-weight: bold; color: red;", 
        "font-size: 20px; font-weight: bold;", 
        "font-size: 20px; font-weight: bold;"  
    );
      console.log(
        "%cHold Up!",
        "color: #5865f2; font-size: 80px; font-weight: bold; -webkit-text-stroke: 2px black;"
    );

    console.log(
        "%cIf someone told you to paste something here, there is an 11/10 chance you're being scammed.\n\n%cPasting anything in here could give attackers access to your session.\n\n%cEven you understand exactly what you are doing, close this window and stay safe.\n\n%cIf you do understand what you are doing, you should probably be a developer of Bloxcraft UBG! Join the Discord to check out applications!",
        "font-size: 20px; font-weight: bold;", 
        "font-size: 20px; font-weight: bold; color: red;", 
        "font-size: 20px; font-weight: bold;", 
        "font-size: 20px; font-weight: bold;"  
    );
      console.log(
        "%cHold Up!",
        "color: #5865f2; font-size: 80px; font-weight: bold; -webkit-text-stroke: 2px black;"
    );

    console.log(
        "%cIf someone told you to paste something here, there is an 11/10 chance you're being scammed.\n\n%cPasting anything in here could give attackers access to your session.\n\n%cEven you understand exactly what you are doing, close this window and stay safe.\n\n%cIf you do understand what you are doing, you should probably be a developer of Bloxcraft UBG! Join the Discord to check out applications!",
        "font-size: 20px; font-weight: bold;", 
        "font-size: 20px; font-weight: bold; color: red;", 
        "font-size: 20px; font-weight: bold;", 
        "font-size: 20px; font-weight: bold;"  
    );
  
  
})();
