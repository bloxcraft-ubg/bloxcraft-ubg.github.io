(function () {
  'use strict';

  const style = document.createElement('style');
  style.id = 'xbox-navigation-styles';
  style.textContent = `
    #xbox-hand-cursor {
      position: fixed !important;
      width: 22px !important;
      height: 22px !important;
      pointer-events: none !important;
      z-index: 2147483647 !important;
      transform: translate(0, 0);
      transition: transform 0.05s ease, filter 0.15s ease, opacity 0.2s ease !important;
      top: 50%;
      left: 50%;
      display: block !important;
      opacity: 0;
    }

    #xbox-hand-cursor.visible {
      opacity: 1 !important;
    }

    .hand-default {
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><g fill="white" stroke="black" stroke-width="40" stroke-linejoin="round"><path d="M173.3 66.5C181.4 62.4 191.2 63.3 198.4 68.8L518.4 308.7C526.7 314.9 530 325.7 526.8 335.5C523.6 345.3 514.4 351.9 504 351.9L351.7 351.9L440.6 529.6C448.5 545.4 442.1 564.6 426.3 572.5C410.5 580.4 391.3 574 383.4 558.2L294.5 380.5L203.2 502.3C197 510.6 186.2 513.9 176.4 510.7C166.6 507.5 160 498.3 160 488L160 88C160 78.9 165.1 70.6 173.3 66.5z"/></g></svg>') no-repeat center/contain !important;
      transform: scale(0.9) translate(-1px, 1px) !important;
    }

    .hand-click {
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><g fill="white" stroke="black" stroke-width="40" stroke-linejoin="round"><path d="M173.3 66.5C181.4 62.4 191.2 63.3 198.4 68.8L518.4 308.7C526.7 314.9 530 325.7 526.8 335.5C523.6 345.3 514.4 351.9 504 351.9L351.7 351.9L440.6 529.6C448.5 545.4 442.1 564.6 426.3 572.5C410.5 580.4 391.3 574 383.4 558.2L294.5 380.5L203.2 502.3C197 510.6 186.2 513.9 176.4 510.7C166.6 507.5 160 498.3 160 488L160 88C160 78.9 165.1 70.6 173.3 66.5z"/></g></svg>') no-repeat center/contain !important;
      transform: scale(0.9) translate(-1px, 1px) !important;
      filter: drop-shadow(0px 0px 10px rgba(168, 85, 247, 0.8)) !important;
    }

    .hand-text {
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://w3.org" viewBox="0 0 24 24"><path d="M8 4h8M12 4v16M8 20h8" fill="none" stroke="black" stroke-width="1.4" stroke-linecap="square"/><path d="M8 4h8M12 4v16M8 20h8" fill="none" stroke="white" stroke-width="1.3" stroke-linecap="square"/></svg>') no-repeat center/contain !important;
      width: 18px !important;
      height: 22px !important;
      filter: drop-shadow(0px 2px 6px rgba(0,0,0,0.9)) !important;
    }

   #xbox-toast {
      position: fixed !important;
      top: -100px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background: rgba(9, 8, 14, 0.95) !important;
      backdrop-filter: blur(12px) !important;
      color: #ffffff !important;
      padding: 12px 22px !important;
      border-radius: 12px !important;
      border: 1px solid rgba(168, 85, 247, 0.35) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(168, 85, 247, 0.25) !important;
      z-index: 2147483644 !important;
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif !important;
      font-size: 13.5px !important;
      font-weight: 600 !important;
      transition: top 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
      pointer-events: none !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      letter-spacing: 0.3px !important;
    }
    #xbox-toast.show {
      top: 24px !important;
    }
    #xbox-toast span.btn-badge {
      background: linear-gradient(135deg, #a855f7, #7e22ce) !important;
      color: #ffffff !important;
      padding: 3px 8px !important;
      border-radius: 6px !important;
      font-size: 11px !important;
      font-weight: 800 !important;
      box-shadow: 0 0 8px rgba(168, 85, 247, 0.4) !important;
    }

    .xbox-modal-base {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) scale(0.92) !important;
      width: 370px !important;
      background: rgba(11, 9, 18, 0.96) !important;
      backdrop-filter: blur(16px) !important;
      border: 1px solid rgba(168, 85, 247, 0.3) !important;
      border-radius: 16px !important;
      padding: 22px !important;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(168, 85, 247, 0.2) !important;
      z-index: 2147483644 !important;
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif !important;
      color: #f3f4f6 !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .xbox-modal-base.open {
      opacity: 1 !important;
      pointer-events: auto !important;
      transform: translate(-50%, -50%) scale(1) !important;
    }
    .xbox-modal-header {
      font-size: 16px !important;
      font-weight: 700 !important;
      color: #c084fc !important;
      margin-bottom: 16px !important;
      text-align: center !important;
      text-transform: uppercase !important;
      letter-spacing: 1.5px !important;
      border-bottom: 1px solid rgba(168, 85, 247, 0.15) !important;
      padding-bottom: 10px !important;
    }
    .xbox-control-row {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      margin-bottom: 10px !important;
      font-size: 13px !important;
      color: #d1d5db !important;
    }
    .xbox-key-tag {
      background: #171226 !important;
      border: 1px solid rgba(168, 85, 247, 0.35) !important;
      color: #c084fc !important;
      padding: 3px 9px !important;
      border-radius: 6px !important;
      font-weight: 700 !important;
      font-size: 11px !important;
      box-shadow: inset 0 0 6px rgba(168, 85, 247, 0.1) !important;
    }

    .dpad-settings-desc {
      text-align: center !important;
      font-size: 12px !important;
      color: #9ca3af !important;
      margin-bottom: 16px !important;
      line-height: 1.4 !important;
    }
    .dpad-option-btn {
      display: block !important;
      width: 100% !important;
      background: #171226 !important;
      border: 1px solid rgba(168, 85, 247, 0.3) !important;
      color: #f3f4f6 !important;
      padding: 12px !important;
      margin-bottom: 10px !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      text-align: center !important;
    }
    .dpad-option-btn:hover, .dpad-option-btn.active, .dpad-option-btn.xbox-hover {
      background: linear-gradient(135deg, #a855f7, #6b21a8) !important;
      box-shadow: 0 0 15px rgba(168, 85, 247, 0.4) !important;
      border-color: #e9d5ff !important;
    }

    #xbox-gboard {
      position: fixed !important;
      bottom: -350px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: 500px !important;
      background: rgba(11, 9, 18, 0.96) !important;
      backdrop-filter: blur(16px) !important;
      border-radius: 16px 16px 0 0 !important;
      border: 1px solid rgba(168, 85, 247, 0.3) !important;
      border-bottom: none !important;
      padding: 16px !important;
      box-shadow: 0 -15px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(168, 85, 247, 0.15) !important;
      z-index: 2147483643 !important;
      transition: bottom 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif !important;
      user-select: none !important;
    }

    #xbox-gboard.open {
      bottom: 0px !important;
    }

    .gboard-row {
      display: flex !important;
      justify-content: center !important;
      gap: 6px !important;
      margin-bottom: 6px !important;
    }

    .gboard-key {
      flex: 1 !important;
      height: 42px !important;
      background: #171226 !important;
      color: #f3f4f6 !important;
      border-radius: 8px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 13.5px !important;
      font-weight: 600 !important;
      border: 1px solid rgba(255, 255, 255, 0.06) !important;
      transition: all 0.12s ease !important;
    }

    .gboard-key.wide { flex: 1.5 !important; background: #221a38 !important; }
    .gboard-key.space { flex: 4 !important; }
    .gboard-key.active, .gboard-key.xbox-hover {
      background: linear-gradient(135deg, #a855f7, #6b21a8) !important;
      color: #ffffff !important;
      box-shadow: 0 0 18px rgba(168, 85, 247, 0.7) !important;
      transform: scale(1.05) !important;
      border: 1px solid #e9d5ff !important;
    }
  `;

  let cursor, keyboardContainer, toastEl, controlsModal, dpadModal;
  let hasShownInitialConnection = false;
  let controlsOpen = false;
  let dpadModalOpen = false;
  let kbdOpen = false;
  let isCursorVisible = false;
  let lastActiveInput = null;
  
  let toastTimeout = null;
  
  let dpadMode = localStorage.getItem('xbox_dpad_mode');
  let bBtnHeld = false;
  let bBtnHoldStart = 0;
  let activeDpadKeys = {};

  document.addEventListener('focusin', (e) => {
    const el = e.target;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) {
      lastActiveInput = el;
    }
  }, true);

  function closeMenus() {
    let closedAny = false;
    if (controlsOpen) {
      controlsOpen = false;
      if (controlsModal) controlsModal.classList.remove('open');
      closedAny = true;
    }
    if (dpadModalOpen) {
      dpadModalOpen = false;
      if (dpadModal) dpadModal.classList.remove('open');
      closedAny = true;
    }
    if (kbdOpen) {
      kbdOpen = false;
      if (keyboardContainer) keyboardContainer.classList.remove('open');
      closedAny = true;
    }
    return closedAny;
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeMenus();
    }
  });

  function captureScreenshot() {
    const downloadImage = (canvas) => {
      const a = document.createElement('a');
      a.download = `screenshot-${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };

    if (window.html2canvas) {
      window.html2canvas(document.body).then(downloadImage);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.onload = () => {
        if (window.html2canvas) {
          window.html2canvas(document.body).then(downloadImage);
        }
      };
      document.head.appendChild(script);
    }
  }

  function showToast(message, duration = 5000) {
    if (!toastEl) return;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastEl.innerHTML = message;
    toastEl.classList.add('show');
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  function saveDpadMode(mode) {
    dpadMode = mode;
    localStorage.setItem('xbox_dpad_mode', mode);
    
    if (dpadModal) {
      dpadModal.querySelectorAll('.dpad-option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });
    }

    closeMenus();
    showToast('D-Pad settings saved successfully!', 3000);
  }

  function initUI() {
    if (document.getElementById('xbox-hand-cursor')) return;

    (document.head || document.documentElement).appendChild(style);

    cursor = document.createElement('div');
    cursor.id = 'xbox-hand-cursor';
    cursor.className = 'hand-default';

    keyboardContainer = document.createElement('div');
    keyboardContainer.id = 'xbox-gboard';
    keyboardContainer.addEventListener('mousedown', (e) => e.preventDefault());
    keyboardContainer.addEventListener('touchstart', (e) => e.preventDefault());

    toastEl = document.createElement('div');
    toastEl.id = 'xbox-toast';

    controlsModal = document.createElement('div');
    controlsModal.id = 'xbox-controls-modal';
    controlsModal.className = 'xbox-modal-base';
    controlsModal.innerHTML = `
      <div class="xbox-modal-header">Controller Controls</div>
      <div class="xbox-control-row"><span>Move Cursor</span> <span class="xbox-key-tag">Joysticks</span></div>
      <div class="xbox-control-row"><span>Snap to Nearest Target</span> <span class="xbox-key-tag">A Button</span></div>
      <div class="xbox-control-row"><span>Click / Select</span> <span class="xbox-key-tag">RT</span></div>
      <div class="xbox-control-row"><span>Right Click</span> <span class="xbox-key-tag">LT</span></div>
      <div class="xbox-control-row"><span>Scroll Page</span> <span class="xbox-key-tag">LB / RB</span></div>
      <div class="xbox-control-row"><span>Open Keyboard</span> <span class="xbox-key-tag">Y Button</span></div>
      <div class="xbox-control-row"><span>Navigate Keyboard (Keyboard)</span> <span class="xbox-key-tag">D-PAD</span></div>
      <div class="xbox-control-row"><span>Type Key (Keyboard)</span> <span class="xbox-key-tag">A Button</span></div>
      <div class="xbox-control-row"><span>Toggle Fullscreen</span> <span class="xbox-key-tag">X Button</span></div>
      <div class="xbox-control-row"><span>Take Screenshot</span> <span class="xbox-key-tag">View Button</span></div>
      <div class="xbox-control-row"><span>Close Menus / ESC</span> <span class="xbox-key-tag">Menu Button</span></div>
      <div class="xbox-control-row"><span>Toggle Controls Menu</span> <span class="xbox-key-tag">B Button</span></div>
      <div class="xbox-control-row"><span>WASD/Arrow Keys (If Enabled)</span> <span class="xbox-key-tag">D-PAD</span></div>
      <div class="xbox-control-row"><span>Escape/Close Menu</span> <span class="xbox-key-tag">Menu Button</span></div>
      <div class="xbox-control-row"><span>Screenshot</span> <span class="xbox-key-tag">View button</span></div>
      <div class="xbox-control-row"><span>Scrool Faster/Slower</span> <span class="xbox-key-tag">Joystick Buttons</span></div>
      <div class="xbox-control-row"><span>Show Xbox Curser</span> <span class="xbox-key-tag">Share Button</span></div>
    `;

    dpadModal = document.createElement('div');
    dpadModal.id = 'xbox-dpad-modal';
    dpadModal.className = 'xbox-modal-base';
    dpadModal.innerHTML = `
      <div class="xbox-modal-header">D-Pad Configuration</div>
      <div class="dpad-settings-desc">What should the D-Pad control while navigating pages?<br/>(Does not affect keyboard menu)</div>
      <button class="dpad-option-btn ${dpadMode === 'wasd' ? 'active' : ''}" data-mode="wasd">1. W A S D</button>
      <button class="dpad-option-btn ${dpadMode === 'arrows' ? 'active' : ''}" data-mode="arrows">2. Arrow Keys</button>
      <button class="dpad-option-btn ${dpadMode === 'none' ? 'active' : ''}" data-mode="none">3. None</button>
    `;

    const dpadButtons = dpadModal.querySelectorAll('.dpad-option-btn');
    dpadButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        saveDpadMode(btn.dataset.mode);
      });
    });

const targetBody = document.body || document.documentElement;
    targetBody.appendChild(keyboardContainer);
    targetBody.appendChild(toastEl);
    targetBody.appendChild(controlsModal);
    targetBody.appendChild(dpadModal);
    targetBody.appendChild(cursor); 

    window.addEventListener('mousemove', () => {
      if (isCursorVisible && cursor) {
        isCursorVisible = false;
        cursor.classList.remove('visible');
      }
    });

    renderKeyboard();
    setupIframeObserver(document);
  }

  const layoutAlpha = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['Shift','z','x','c','v','b','n','m','⌫'],
    ['123', ',', 'Space', '.', '↵']
  ];

  const layoutNum = [
    ['1','2','3','4','5','6','7','8','9','0'],
    ['@','#','$','%','&','-','+','(',')'],
    ['Shift','*','"','\'',':',';','!','?','⌫'],
    ['ABC', ',', 'Space', '.', '↵']
  ];

  let kbdRow = 0;
  let kbdCol = 0;
  let isShift = false;
  let isNumbers = false;

  function renderKeyboard() {
    if (!keyboardContainer) return;
    keyboardContainer.innerHTML = '';
    const activeLayout = isNumbers ? layoutNum : layoutAlpha;

    activeLayout.forEach((row, rIdx) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'gboard-row';
      row.forEach((key, cIdx) => {
        const keyEl = document.createElement('div');
        let displayKey = key;
        if (isShift && key.length === 1) displayKey = key.toUpperCase();

        keyEl.className = 'gboard-key';
        if (['Shift', '⌫', '↵', '123', 'ABC'].includes(key)) keyEl.classList.add('wide');
        if (key === 'Space') keyEl.classList.add('space');
        if (rIdx === kbdRow && cIdx === kbdCol) keyEl.classList.add('active');

       keyEl.textContent = displayKey;

        keyEl.addEventListener('click', () => {
          if (key === 'Shift') {
            isShift = !isShift;
          } else if (key === '123') {
            isNumbers = true;
            kbdRow = 0; kbdCol = 0;
          } else if (key === 'ABC') {
            isNumbers = false;
            kbdRow = 0; kbdCol = 0;
          } else {
            let char = key;
            if (isShift && char.length === 1) char = char.toUpperCase();
            broadcast('TYPE', { key: char });
          }
          renderKeyboard();
        });

        rowEl.appendChild(keyEl);
      });
      keyboardContainer.appendChild(rowEl);
    });
  }

  function simulateFastClick(target, x, y, button = 0) {
    if (!target) return;

    const clickable = target.closest('a, button, [onclick], input, textarea, select, [role="button"]') || target;
    const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y, button: button, buttons: button === 0 ? 1 : 2 };

    if (button === 0) {
      clickable.dispatchEvent(new MouseEvent('mousedown', opts));
      clickable.dispatchEvent(new MouseEvent('mouseup', opts));
      clickable.dispatchEvent(new MouseEvent('click', opts));
      if (typeof clickable.focus === 'function') clickable.focus();
    } else if (button === 2) {
      clickable.dispatchEvent(new MouseEvent('mousedown', opts));
      clickable.dispatchEvent(new MouseEvent('mouseup', opts));
      clickable.dispatchEvent(new MouseEvent('contextmenu', opts));
    }
  }

  function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else if (valueSetter) {
      valueSetter.call(element, value);
    } else {
      element.value = value;
    }
  }

  function handleTypeAction(targetDoc, key) {
    let active = targetDoc.activeElement;

    if (!active || (active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA' && !active.isContentEditable)) {
      if (lastActiveInput && targetDoc.contains(lastActiveInput)) {
        active = lastActiveInput;
        active.focus();
      } else {
        active = targetDoc.querySelector('input:focus, textarea:focus, [contenteditable]:focus');
      }
    }

    if (!active) return;

    if (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') {
      const start = active.selectionStart ?? active.value.length;
      const end = active.selectionEnd ?? active.value.length;
      let val = active.value;

      if (key === '⌫') {
        if (start === end && start > 0) {
          val = val.slice(0, start - 1) + val.slice(end);
          setNativeValue(active, val);
          active.setSelectionRange(start - 1, start - 1);
        } else if (start !== end) {
          val = val.slice(0, start) + val.slice(end);
          setNativeValue(active, val);
          active.setSelectionRange(start, start);
        }
      } else if (key === 'Space') {
        val = val.slice(0, start) + ' ' + val.slice(end);
        setNativeValue(active, val);
        active.setSelectionRange(start + 1, start + 1);
      } else if (key === '↵') {
        active.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, code: 'Enter', bubbles: true }));
        active.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', keyCode: 13, code: 'Enter', bubbles: true }));
        active.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13, code: 'Enter', bubbles: true }));
      } else if (key.length === 1) {
        val = val.slice(0, start) + key + val.slice(end);
        setNativeValue(active, val);
        active.setSelectionRange(start + 1, start + 1);
      }

      active.dispatchEvent(new Event('input', { bubbles: true }));
      active.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (active.isContentEditable) {
      active.focus();
      if (key === '⌫') {
        targetDoc.execCommand('delete', false, null);
      } else if (key === 'Space') {
        targetDoc.execCommand('insertText', false, ' ');
      } else if (key === '↵') {
        targetDoc.execCommand('insertParagraph', false, null);
      } else if (key.length === 1) {
        targetDoc.execCommand('insertText', false, key);
      }
    }
  }

  const iframeReceiverScript = `
    (function receiverInit() {
      let cachedFrameRect = null;
      let localLastActive = null;

      document.addEventListener('focusin', (e) => {
        const el = e.target;
        if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) {
          localLastActive = el;
        }
      }, true);

      function updateRect() {
        if (window.frameElement) {
          cachedFrameRect = window.frameElement.getBoundingClientRect();
        }
      }

      function simulateFastClick(target, x, y, button = 0) {
        if (!target) return;
        const clickable = target.closest('a, button, [onclick], input, textarea, select, [role="button"]') || target;
        const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y, button: button, buttons: button === 0 ? 1 : 2 };

        if (button === 0) {
          clickable.dispatchEvent(new MouseEvent('mousedown', opts));
          clickable.dispatchEvent(new MouseEvent('mouseup', opts));
          clickable.dispatchEvent(new MouseEvent('click', opts));
          if (typeof clickable.focus === 'function') clickable.focus();
        } else if (button === 2) {
          clickable.dispatchEvent(new MouseEvent('mousedown', opts));
          clickable.dispatchEvent(new MouseEvent('mouseup', opts));
          clickable.dispatchEvent(new MouseEvent('contextmenu', opts));
        }
      }

      function setNativeValue(element, value) {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

        if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
          prototypeValueSetter.call(element, value);
        } else if (valueSetter) {
          valueSetter.call(element, value);
        } else {
          element.value = value;
        }
      }

      function handleTypeAction(targetDoc, key) {
        let active = targetDoc.activeElement;
        if (!active || (active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA' && !active.isContentEditable)) {
          if (localLastActive && targetDoc.contains(localLastActive)) {
            active = localLastActive;
            active.focus();
          } else {
            active = targetDoc.querySelector('input:focus, textarea:focus, [contenteditable]:focus');
          }
        }

        if (!active) return;

        if (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') {
          const start = active.selectionStart ?? active.value.length;
          const end = active.selectionEnd ?? active.value.length;
          let val = active.value;

          if (key === '⌫') {
            if (start === end && start > 0) {
              val = val.slice(0, start - 1) + val.slice(end);
              setNativeValue(active, val);
              active.setSelectionRange(start - 1, start - 1);
            } else if (start !== end) {
              val = val.slice(0, start) + val.slice(end);
              setNativeValue(active, val);
              active.setSelectionRange(start, start);
            }
          } else if (key === 'Space') {
            val = val.slice(0, start) + ' ' + val.slice(end);
            setNativeValue(active, val);
            active.setSelectionRange(start + 1, start + 1);
          } else if (key === '↵') {
            active.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, code: 'Enter', bubbles: true }));
            active.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', keyCode: 13, code: 'Enter', bubbles: true }));
            active.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13, code: 'Enter', bubbles: true }));
          } else if (key.length === 1) {
            val = val.slice(0, start) + key + val.slice(end);
            setNativeValue(active, val);
            active.setSelectionRange(start + 1, start + 1);
          }

          active.dispatchEvent(new Event('input', { bubbles: true }));
          active.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (active.isContentEditable) {
          active.focus();
          if (key === '⌫') {
            targetDoc.execCommand('delete', false, null);
          } else if (key === 'Space') {
            targetDoc.execCommand('insertText', false, ' ');
          } else if (key === '↵') {
            targetDoc.execCommand('insertParagraph', false, null);
          } else if (key.length === 1) {
            targetDoc.execCommand('insertText', false, key);
          }
        }
      }

      function setupRecursiveFrames(doc) {
        if (!doc) return;
        doc.querySelectorAll('iframe').forEach(iframe => {
          iframe.addEventListener('load', () => inject(iframe));
          inject(iframe);
        });

        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node && node.tagName === 'IFRAME') {
                node.addEventListener('load', () => inject(node));
                inject(node);
              }
            });
          });
        });

        const target = doc.body || doc.documentElement;
        if (target) observer.observe(target, { childList: true, subtree: true });
      }

      function inject(iframe) {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (doc && !doc.querySelector('#xbox-iframe-receiver')) {
            const script = doc.createElement('script');
            script.id = 'xbox-iframe-receiver';
            script.textContent = '(' + receiverInit.toString() + ')();';
            (doc.head || doc.body || doc.documentElement).appendChild(script);
          }
        } catch (e) {}
      }

      window.addEventListener('message', (event) => {
        const data = event.data;
        if (!data || data.type !== 'XBOX_ACTION') return;

        if (data.action === 'LEFT_CLICK' || data.action === 'RIGHT_CLICK') {
          if (!cachedFrameRect || data.forceRectUpdate) updateRect();
          
          const rect = cachedFrameRect || { left: 0, top: 0 };
          const localX = data.x - rect.left;
          const localY = data.y - rect.top;

          if (localX >= 0 && localY >= 0 && localX <= window.innerWidth && localY <= window.innerHeight) {
            const el = document.elementFromPoint(localX, localY) || document.activeElement;
            if (el && el.tagName !== 'IFRAME') {
              simulateFastClick(el, localX, localY, data.action === 'LEFT_CLICK' ? 0 : 2);
            }
          }
        } else if (data.action === 'SCROLL') {
          window.scrollBy({ top: data.amount, behavior: 'auto' });
        } else if (data.action === 'TYPE') {
          handleTypeAction(document, data.key);
        } else if (data.action === 'ESC') {
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }));
        } else if (data.action === 'KEY_EVENT') {
          const evType = data.state === 'down' ? 'keydown' : 'keyup';
          document.dispatchEvent(new KeyboardEvent(evType, { key: data.key, code: data.code, bubbles: true }));
        }

        const frames = document.querySelectorAll('iframe');
        frames.forEach(frame => {
          try { frame.contentWindow?.postMessage(data, '*'); } catch (e) {}
        });
      });

      setupRecursiveFrames(document);
    })();
  `;

  function injectReceiver(iframe) {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc && !doc.querySelector('#xbox-iframe-receiver')) {
        const script = doc.createElement('script');
        script.id = 'xbox-iframe-receiver';
        script.textContent = iframeReceiverScript;
        (doc.head || doc.body || doc.documentElement).appendChild(script);
        setupIframeObserver(doc);
      }
    } catch (err) {}
  }

  function setupIframeObserver(doc) {
    if (!doc) return;
    doc.querySelectorAll('iframe').forEach(iframe => {
      iframe.addEventListener('load', () => injectReceiver(iframe));
      injectReceiver(iframe);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node && node.tagName === 'IFRAME') {
            node.addEventListener('load', () => injectReceiver(node));
            injectReceiver(node);
          }
        });
      });
    });

    const target = doc.body || doc.documentElement;
    if (target) observer.observe(target, { childList: true, subtree: true });
  }

  let posX = window.innerWidth / 2;
  let posY = window.innerHeight / 2;
  const cursorSpeed = 8;
  const buttonStates = {};

  let clickTimer = null;
  const clickSpeedMs = 10;

  function snapToNearestObject() {
    const selector = 'a, button, input, textarea, select, [role="button"], [tabindex], [onclick], img, div[onclick]';
    const elements = Array.from(document.querySelectorAll(selector));
    
    const currentElem = document.elementFromPoint(posX, posY);

    let nearest = null;
    let minDistance = Infinity;

    elements.forEach(el => {
      if (currentElem && (el === currentElem || currentElem.contains(el) || el.contains(currentElem))) return;
      
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      if (rect.bottom < 0 || rect.right < 0 || rect.top > window.innerHeight || rect.left > window.innerWidth) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(centerX - posX, centerY - posY);

      if (dist < minDistance) {
        minDistance = dist;
        nearest = { x: centerX, y: centerY };
      }
    });

    if (nearest) {
      posX = Math.max(0, Math.min(window.innerWidth, nearest.x));
      posY = Math.max(0, Math.min(window.innerHeight, nearest.y));

      if (cursor) {
        cursor.style.left = posX + 'px';
        cursor.style.top = posY + 'px';
      }
      if (!isCursorVisible && cursor) {
        isCursorVisible = true;
        cursor.classList.add('visible');
      }
    }
  }

  function getActiveGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < gamepads.length; i++) {
      if (gamepads[i] && gamepads[i].connected) return gamepads[i];
    }
    return null;
  }

  function isPressed(btnIndex, gp) {
    return gp && gp.buttons[btnIndex] && gp.buttons[btnIndex].pressed;
  }

  function justPressed(key, pressed) {
    if (pressed && !buttonStates[key]) {
      buttonStates[key] = true;
      return true;
    } else if (!pressed) {
      buttonStates[key] = false;
    }
    return false;
  }

  function broadcast(action, payload = {}) {
    const msg = { type: 'XBOX_ACTION', action, x: posX, y: posY, ...payload };
    window.postMessage(msg, '*');

    const allFrames = document.querySelectorAll('iframe');
    allFrames.forEach(frame => {
      try { 
        if (action === 'TYPE' && frame.contentWindow) {
          frame.contentWindow.focus();
        }
        frame.contentWindow?.postMessage(msg, '*'); 
      } catch (e) {}
    });

    if (action === 'LEFT_CLICK' || action === 'RIGHT_CLICK') {
      let target = document.elementFromPoint(posX, posY);
      if (target && target.tagName !== 'IFRAME') {
        simulateFastClick(target, posX, posY, action === 'LEFT_CLICK' ? 0 : 2);
      }
    } else if (action === 'TYPE') {
      handleTypeAction(document, payload.key);
    } else if (action === 'KEY_EVENT') {
      const evType = payload.state === 'down' ? 'keydown' : 'keyup';
      document.dispatchEvent(new KeyboardEvent(evType, { key: payload.key, code: payload.code, bubbles: true }));
    }
  }

  function updateCursorState() {
    if (!cursor) return;
    let el = document.elementFromPoint(posX, posY);

    document.querySelectorAll('.xbox-hover').forEach(node => node.classList.remove('xbox-hover'));

    if (el && el.tagName === 'IFRAME') {
      try {
        const rect = el.getBoundingClientRect();
        const innerDoc = el.contentDocument || el.contentWindow.document;
        el = innerDoc.elementFromPoint(posX - rect.left, posY - rect.top) || el;
      } catch (e) {}
    }

    if (!el) return;

 const dpadBtn = el.closest('.dpad-option-btn');
    if (dpadBtn) {
      dpadBtn.classList.add('xbox-hover');
    }

    const kbdKey = el.closest('.gboard-key');
    if (kbdKey) {
      kbdKey.classList.add('xbox-hover');
    }

    const isTextElement = el.tagName === 'INPUT' ||
                          el.tagName === 'TEXTAREA' ||
                          el.isContentEditable ||
                          window.getComputedStyle(el).cursor === 'text';

    if (buttonStates['btn_7'] || buttonStates['btn_0']) {
      cursor.className = 'hand-click' + (isCursorVisible ? ' visible' : '');
    } else if (isTextElement) {
      cursor.className = 'hand-text' + (isCursorVisible ? ' visible' : '');
    } else {
      cursor.className = 'hand-default' + (isCursorVisible ? ' visible' : '');
    }
  }

  function handleDpadKeyboard(gp) {
    const up = isPressed(12, gp);
    const down = isPressed(13, gp);
    const left = isPressed(14, gp);
    const right = isPressed(15, gp);
    const currentLayout = isNumbers ? layoutNum : layoutAlpha;

    if (justPressed('d_up', up)) { kbdRow = Math.max(0, kbdRow - 1); kbdCol = Math.min(kbdCol, currentLayout[kbdRow].length - 1); }
    if (justPressed('d_down', down)) { kbdRow = Math.min(currentLayout.length - 1, kbdRow + 1); kbdCol = Math.min(kbdCol, currentLayout[kbdRow].length - 1); }
    if (justPressed('d_left', left)) { kbdCol = Math.max(0, kbdCol - 1); }
    if (justPressed('d_right', right)) { kbdCol = Math.min(currentLayout[kbdRow].length - 1, kbdCol + 1); }

    if (up || down || left || right) renderKeyboard();

    let isHoveringKey = document.elementFromPoint(posX, posY)?.closest('.gboard-key');

    if (!isHoveringKey && justPressed('k_select', isPressed(0, gp) || isPressed(7, gp))) {
      let char = currentLayout[kbdRow][kbdCol];
      if (char === 'Shift') {
        isShift = !isShift;
      } else if (char === '123') {
        isNumbers = true;
        kbdRow = 0; kbdCol = 0;
      } else if (char === 'ABC') {
        isNumbers = false;
        kbdRow = 0; kbdCol = 0;
      } else {
        if (isShift && char.length === 1) char = char.toUpperCase();
        broadcast('TYPE', { key: char });
      }
      renderKeyboard();
    }
  }

  function checkDpadKeyGameplay(btnKey, isPressedNow, keyName, keyCodeName) {
    if (isPressedNow && !activeDpadKeys[btnKey]) {
      activeDpadKeys[btnKey] = true;
      broadcast('KEY_EVENT', { key: keyName, code: keyCodeName, state: 'down' });
    } else if (!isPressedNow && activeDpadKeys[btnKey]) {
      activeDpadKeys[btnKey] = false;
      broadcast('KEY_EVENT', { key: keyName, code: keyCodeName, state: 'up' });
    }
  }

  function handleDpadGameplay(gp) {
    if (!dpadMode || dpadMode === 'none') return;
    
    const up = isPressed(12, gp);
    const down = isPressed(13, gp);
    const left = isPressed(14, gp);
    const right = isPressed(15, gp);

    const map = dpadMode === 'wasd' 
      ? { up: ['w', 'KeyW'], down: ['s', 'KeyS'], left: ['a', 'KeyA'], right: ['d', 'KeyD'] }
      : { up: ['ArrowUp', 'ArrowUp'], down: ['ArrowDown', 'ArrowDown'], left: ['ArrowLeft', 'ArrowLeft'], right: ['ArrowRight', 'ArrowRight'] };

    checkDpadKeyGameplay('d_up_game', up, map.up[0], map.up[1]);
    checkDpadKeyGameplay('d_down_game', down, map.down[0], map.down[1]);
    checkDpadKeyGameplay('d_left_game', left, map.left[0], map.left[1]);
    checkDpadKeyGameplay('d_right_game', right, map.right[0], map.right[1]);
  }

  function handleInitialConnection() {
    if (hasShownInitialConnection) return;
    hasShownInitialConnection = true;
    
    if (!dpadMode) {
      dpadModalOpen = true;
      if (dpadModal) dpadModal.classList.add('open');
      showToast(`🎮 Controller Connected! Please configure your D-Pad. Press <span class="btn-badge">B</span> to see controls`);
    } else {
      showToast(`🎮 Controller Connected! Press <span class="btn-badge">B</span> to see controls`);
    }
  }

  function gamepadLoop() {
    const gp = getActiveGamepad();

    if (gp) {
      handleInitialConnection();

      const lx = gp.axes[0] || 0;
      const ly = gp.axes[1] || 0;
      const rx = gp.axes[2] || gp.axes[3] || 0;
      const ry = gp.axes[3] || gp.axes[4] || 0;

      const moveX = Math.abs(rx) > 0.15 ? rx : (Math.abs(lx) > 0.15 ? lx : 0);
      const moveY = Math.abs(ry) > 0.15 ? ry : (Math.abs(ly) > 0.15 ? ly : 0);

      if (moveX !== 0 || moveY !== 0) {
        if (!isCursorVisible && cursor) {
          isCursorVisible = true;
          cursor.classList.add('visible');
        }
        posX += moveX * cursorSpeed;
        posY += moveY * cursorSpeed;

        posX = Math.max(0, Math.min(window.innerWidth, posX));
        posY = Math.max(0, Math.min(window.innerHeight, posY));

        if (cursor) {
          cursor.style.left = posX + 'px';
          cursor.style.top = posY + 'px';
        }
      }

      updateCursorState();

      if (isPressed(1, gp)) {
        if (!bBtnHeld) {
          bBtnHeld = true;
          bBtnHoldStart = performance.now();
          showToast(`Hold <span class="btn-badge">B</span> for 2 seconds to go to D-Pad Settings`, 2000);
        } else if (performance.now() - bBtnHoldStart >= 2000) {
          if (!dpadModalOpen) {
            closeMenus();
            dpadModalOpen = true;
            if (dpadModal) dpadModal.classList.add('open');
            showToast('D-Pad Configuration Opened', 3000);
            bBtnHoldStart = performance.now(); 
          }
        }
      } else {
        if (bBtnHeld) {
          if (performance.now() - bBtnHoldStart < 2000 && !dpadModalOpen) {
            closeMenus();
            controlsOpen = true;
            if (controlsModal) controlsModal.classList.add('open');
          }
          bBtnHeld = false;
        }
      }

      if (justPressed('btn_3', isPressed(3, gp))) {
        kbdOpen = !kbdOpen;
        if (keyboardContainer) keyboardContainer.classList.toggle('open', kbdOpen);
        if (kbdOpen) { controlsOpen = false; dpadModalOpen = false; } 
        if (controlsModal) controlsModal.classList.remove('open');
        if (dpadModal) dpadModal.classList.remove('open');
      }

      if (justPressed('btn_9', isPressed(9, gp))) {
        const closed = closeMenus();
        if (!closed) {
          broadcast('ESC');
        }
      }

if (kbdOpen) {
        handleDpadKeyboard(gp);

        if (justPressed('k_cursor_click', isPressed(0, gp) || isPressed(7, gp))) {
          let currentTarget = document.elementFromPoint(posX, posY);
          if (currentTarget && currentTarget.closest('.gboard-key')) {
            simulateFastClick(currentTarget.closest('.gboard-key'), posX, posY, 0);
          }
        }
      } else {
        if (!dpadModalOpen) {
          handleDpadGameplay(gp);
        }

        if (justPressed('btn_0', isPressed(0, gp))) {
          let currentTarget = document.elementFromPoint(posX, posY);
          if (currentTarget && currentTarget.closest('.dpad-option-btn')) {
            simulateFastClick(currentTarget.closest('.dpad-option-btn'), posX, posY, 0);
          } else {
            snapToNearestObject();
          }
        }

        if (isPressed(7, gp)) {
          if (!clickTimer) {
            broadcast('LEFT_CLICK', { forceRectUpdate: true });
            clickTimer = setInterval(() => { broadcast('LEFT_CLICK'); }, clickSpeedMs);
          }
        } else {
          if (clickTimer) { clearInterval(clickTimer); clickTimer = null; }
        }

        if (justPressed('btn_6', isPressed(6, gp))) broadcast('RIGHT_CLICK');

        const scrollAmount = isPressed(10, gp) ? 250 : isPressed(11, gp) ? 40 : 110;

        if (isPressed(4, gp)) broadcast('SCROLL', { amount: -scrollAmount });
        if (isPressed(5, gp)) broadcast('SCROLL', { amount: scrollAmount });

        if (justPressed('btn_2', isPressed(2, gp))) {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }

        if (justPressed('btn_8', isPressed(8, gp))) captureScreenshot();

        if (justPressed('btn_xbox', isPressed(16, gp))) {
          window.top.location.href = '/Xbox Hub/';
        }

          if (justPressed('btn_share', isPressed(17, gp))) {
          isCursorVisible = !isCursorVisible;
          if (cursor) cursor.classList.toggle('visible', isCursorVisible);
        }
      }
    }

    requestAnimationFrame(gamepadLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUI);
  } else {
    initUI();
  }

  requestAnimationFrame(gamepadLoop);
})();
