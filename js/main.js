


document.addEventListener("DOMContentLoaded", () => {

  // 1. Fetch games JSON w create cards
  const loadGames = async () => {
    try {
      const res = await fetch('games.json');
      if (!res.ok) throw new Error("Cannot fetch games.json");
      const games = await res.json();

      const grid = document.getElementById('gamesGrid');
      grid.innerHTML = '';

      games.forEach(game => {
        const rating = game.rating ?? 0;
        const players = game.players ?? 0;
        const link = game.link || "#";

        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.title = game.title.toLowerCase(); // for search
        card.onclick = () => window.location.href = link;

        card.innerHTML = `
          <div class="game-thumb" style="background: ${game.gradient || 'gray'};">
            <img src="${game.thumbnail}" alt="${game.title}">
          </div>
          <div class="game-info">
            <h3>${game.title}</h3>
           
          </div>
        `;
        grid.appendChild(card);
      });

      // 2. Search function (after cards loaded)
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("keyup", () => {
        const value = searchInput.value.toLowerCase();
        document.querySelectorAll(".game-card").forEach(card => {
          card.style.display = card.dataset.title.includes(value) ? "block" : "none";
        });
      });

    } catch (err) {
      console.error(err);
    }
  };

  loadGames(); // call async function

});
