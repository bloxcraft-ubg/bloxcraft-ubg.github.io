        window.focusableElements = [];

        window.loadGames = function() {
            const grid = document.getElementById('games-grid');
            const errorMsg = document.getElementById('error-msg');
            
            try {
                const lsData = localStorage.getItem('ubg_favorites');
                if (lsData) {
                    const parsedGames = JSON.parse(lsData);
                    const xboxGames = localStorage.getItem('ubg_favorites');

                    if (xboxGames.length === 0) {
                        errorMsg.innerText = "No Favourite Games Found";
                    } else {
                        xboxGames.forEach(game => {
                            const card = document.createElement('div');
                            card.className = 'card focusable';
                            card.dataset.url = game.url;
                            
                            card.innerHTML = `
                                <img src="${game.img}" alt="${game.name}" onerror="this.src='https://via.placeholder.com/150/2a2a2a/FFFFFF?text=Image+Missing'">
                                <div class="card-title">${game.name}</div>
                            `;
                            grid.appendChild(card);
                        });
                    }
                } else {
                    errorMsg.innerText = "No Favourite Games Found";
                }
            } catch (error) {
                console.error("Failed to load:", error);
                errorMsg.innerText = "No Favourite Games Found";
            }

            window.focusableElements = Array.from(document.querySelectorAll('.focusable'));
        };
