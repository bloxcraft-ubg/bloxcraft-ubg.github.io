    (function() {
        const style = document.createElement('style');
        style.innerHTML = `
            .xbox-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(8px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.25s ease;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #ffffff;
            }

            .xbox-modal-overlay.active {
                opacity: 1;
                pointer-events: auto;
            }

            .xbox-modal-card {
                background: #181818;
                border: 2px solid #107C10;
                border-radius: 12px;
                width: 90%;
                max-width: 520px;
                padding: 30px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 15px rgba(16, 124, 16, 0.3);
                transform: scale(0.95);
                transition: transform 0.25s ease;
            }

            .xbox-modal-overlay.active .xbox-modal-card {
                transform: scale(1);
            }

            .xbox-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #333;
                padding-bottom: 15px;
                margin-bottom: 20px;
            }

            .xbox-modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
                color: #107C10;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .xbox-close-btn {
                background: #2a2a2a;
                border: 1px solid #444;
                color: #fff;
                padding: 6px 14px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: background 0.2s;
            }

            .xbox-close-btn:hover {
                background: #107C10;
                border-color: #107C10;
            }

            .controls-section {
                margin-bottom: 25px;
            }

            .controls-section h3 {
                font-size: 1.1rem;
                color: #ccc;
                margin-bottom: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-left: 3px solid #107C10;
                padding-left: 8px;
            }

            .controls-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                background: #222;
                padding: 12px 16px;
                border-radius: 8px;
            }

            .control-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 4px 0;
                font-size: 0.95rem;
            }

            .key-badge {
                background: #333;
                border: 1px solid #555;
                color: #fff;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);

        const modal = document.createElement('div');
        modal.className = 'xbox-modal-overlay';
        modal.id = 'xbox-controls-modal';
        modal.innerHTML = `
            <div class="xbox-modal-card">
                <div class="xbox-modal-header">
                    <h2>Xbox Controller Guide</h2>
                    <button class="xbox-close-btn" id="xbox-modal-close-btn">Close</button>
                </div>

                <div class="controls-section">
                    <h3>Xbox Hub, Games</h3>
                    <div class="controls-grid">
                        <div class="control-row"><span>Navigate:</span> <span class="key-badge">Left Stick / D-Pad</span></div>
                        <div class="control-row"><span>Select:</span> <span class="key-badge">A Button</span></div>
                        <div class="control-row"><span>Close Menu:</span> <span class="key-badge">B Button</span></div>
                    </div>
                </div>
                
                                <div class="controls-section">
                    <h3>Other Webpages</h3>
                    <div class="controls-grid">
                        <div class="control-row"><span>Move Cursor</span> <span class="key-badge">Joysticks</span></div>
                        <div class="control-row"><span>Snap to Nearest Target</span> <span class="key-badge">A Button</span></div>
                        <div class="control-row"><span>Click / Select</span> <span class="key-badge">RT</span></div>
                        <div class="control-row"><span>Right Click</span> <span class="key-badge">LT</span></div>
                        <div class="control-row"><span>Scroll Page</span> <span class="key-badge">LB / RB</span></div>
                        <div class="control-row"><span>Scroll Faster/Slower</span> <span class="key-badge">Joystick Buttons</span></div>
                        <div class="control-row"><span>Show Xbox Cursor</span> <span class="key-badge">Share Button</span></div>
                        <div class="control-row"><span>Open Keyboard</span> <span class="key-badge">Y Button</span></div>
                        <div class="control-row"><span>Navigate Keyboard</span> <span class="key-badge">D-PAD</span></div>
                        <div class="control-row"><span>Type Key</span> <span class="key-badge">A Button</span></div>
                        <div class="control-row"><span>Toggle Fullscreen</span> <span class="key-badge">X Button</span></div>
                        <div class="control-row"><span>Take Screenshot</span> <span class="key-badge">View Button</span></div>
                        <div class="control-row"><span>Close Menus / ESC</span> <span class="key-badge">Menu Button</span></div>
                        <div class="control-row"><span>Toggle Controls Menu</span> <span class="key-badge">B Button</span></div>
                        <div class="control-row"><span>WASD / Arrow Keys (If Enabled)</span> <span class="key-badge">D-PAD</span></div>
                    </div>
                </div>
                
            </div>
        `;
        document.body.appendChild(modal);

        function openControlsMenu() {
            modal.classList.add('active');
        }

        function closeControlsMenu() {
            modal.classList.remove('active');
        }

        document.addEventListener('click', function(e) {
            if (e.target.closest('#xbox-controls-menu-da')) {
                e.preventDefault();
                openControlsMenu();
            }
        });

        document.getElementById('xbox-modal-close-btn').addEventListener('click', closeControlsMenu);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeControlsMenu();
        });

        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeControlsMenu();
            }
        });

        function modalGamepadLoop() {
            const gamepads = navigator.getGamepads();
            const gp = gamepads[0];
            if (gp && modal.classList.contains('active')) {
                if (gp.buttons[1]?.pressed) {
                    closeControlsMenu();
                }
            }
            requestAnimationFrame(modalGamepadLoop);
        }
        requestAnimationFrame(modalGamepadLoop);

    })();
