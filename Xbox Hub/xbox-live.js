        let currentIndex = 0;
        let lastInputTime = 0;
        const inputCooldown = 200;

        function updateFocus(newIndex) {
            const elements = window.focusableElements;
            
            if (elements[currentIndex]) {
                elements[currentIndex].classList.remove('focused');
            }
            
            currentIndex = newIndex;
            if (elements[currentIndex]) {
                const el = elements[currentIndex];
                el.classList.add('focused');
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        function executeFocusedItem() {
            const elements = window.focusableElements;
            if (!elements || elements.length === 0) return;
            
            const el = elements[currentIndex];
            if (el) {
                el.click();
            }
        }

        document.addEventListener('click', function(e) {
            const card = e.target.closest('[data-url]');
            if (card && card.dataset.url) {
                window.location.href = card.dataset.url;
            }
        });

        function getGridColumns() {
            const grid = document.getElementById('games-grid');
            if (!grid) return 4;
            const gridComputed = window.getComputedStyle(grid);
            const cols = gridComputed.gridTemplateColumns.split(' ').length;
            return cols > 0 ? cols : 1;
        }

        function gameLoop(timestamp) {
            const gamepads = navigator.getGamepads();
            const gp = gamepads[0];
            const elements = window.focusableElements;

            if (gp && timestamp - lastInputTime > inputCooldown) {
                let inputRegistered = false;
                const columns = getGridColumns();
                let nextIndex = currentIndex;

                const upPressed = gp.buttons[12]?.pressed || gp.axes[1] < -0.5;
                const downPressed = gp.buttons[13]?.pressed || gp.axes[1] > 0.5;
                const leftPressed = gp.buttons[14]?.pressed || gp.axes[0] < -0.5;
                const rightPressed = gp.buttons[15]?.pressed || gp.axes[0] > 0.5;

                if (rightPressed) {
                    nextIndex = Math.min(currentIndex + 1, elements.length - 1);
                    inputRegistered = true;
                } else if (leftPressed) {
                    nextIndex = Math.max(currentIndex - 1, 0);
                    inputRegistered = true;
                } else if (downPressed) {
                    if (currentIndex === 0) {
                        nextIndex = 1;
                    } else {
                        nextIndex = Math.min(currentIndex + columns, elements.length - 1);
                    }
                    inputRegistered = true;
                } else if (upPressed) {
                    if (currentIndex > 0 && currentIndex <= columns) {
                        nextIndex = 0;
                    } else if (currentIndex > columns) {
                        nextIndex = currentIndex - columns;
                    }
                    inputRegistered = true;
                }

                if (inputRegistered && nextIndex !== currentIndex) {
                    updateFocus(nextIndex);
                    lastInputTime = timestamp;
                }

                if (gp.buttons[0]?.pressed) {
                    executeFocusedItem();
                    lastInputTime = timestamp;
                }

                if (gp.buttons[1]?.pressed) {
                    lastInputTime = timestamp;
                }
            }
            requestAnimationFrame(gameLoop);
        }

        window.loadGames();
        
        if (window.focusableElements.length > 0) {
            updateFocus(0);
        }

        window.addEventListener("gamepadconnected", (e) => {
            requestAnimationFrame(gameLoop);
        });

        window.addEventListener('keydown', (e) => {
            const elements = window.focusableElements;
            const columns = getGridColumns();
            let nextIndex = currentIndex;
            
            if (e.key === 'ArrowRight') nextIndex = Math.min(currentIndex + 1, elements.length - 1);
            if (e.key === 'ArrowLeft') nextIndex = Math.max(currentIndex - 1, 0);
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                nextIndex = currentIndex === 0 ? 1 : Math.min(currentIndex + columns, elements.length - 1);
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentIndex > 0 && currentIndex <= columns) nextIndex = 0;
                else if (currentIndex > columns) nextIndex = currentIndex - columns;
            }
            if (e.key === 'Enter') executeFocusedItem();

            if (nextIndex !== currentIndex) updateFocus(nextIndex);
        });
