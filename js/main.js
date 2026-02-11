
// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBRNoFOHQ2bC6XTliivWfpGMBDfKnR9sko",
//   authDomain: "general-games-2775e.firebaseapp.com",
//   databaseURL: "https://general-games-2775e-default-rtdb.firebaseio.com",
//   projectId: "general-games-2775e",
//   storageBucket: "general-games-2775e.firebasestorage.app",
//   messagingSenderId: "750591153144",
//   appId: "1:750591153144:web:12c8207bc0aa08c2b43c0d",
//   measurementId: "G-5HM7TYMGD9"
// };

// firebase.initializeApp(firebaseConfig);
// const db = firebase.database();

// function updateCardRating(titleSlug, likes, dislikes) {
//   const totalVotes = likes + dislikes;
//   let rating = 0;
//   if (totalVotes > 0) rating = (likes / totalVotes) * 10;
//   rating = rating.toFixed(1);

//   // select the correct game-card based on data-title (slug)
//   const card = document.querySelector(`.game-card[data-title="${titleSlug"]`);
//   if (!card) return;

//   const meta = card.querySelector('.game-meta');
//   if (!meta) return;

//   // update the inner HTML of .game-meta
//   meta.innerHTML = `
//     <span>
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2">
//         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//       </svg>
//       ${rating}
//     </span>
//   `;
// }


document.addEventListener("DOMContentLoaded", () => {

  // 1. Fetch games JSON w create cards
  const loadGames = async () => {
    const url = window.location.href;
    try {
      const res = await fetch('/js/games.json');
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

        if (!url.includes(link) || ( game.title == "MineFun.io" && url != link )){

        card.innerHTML = `
          <div class="game-thumb" style="background: ${game.gradient || 'gray'};">
            <img src="${game.thumbnail}" alt="${game.title}">
        </div>
        <div class="game-info">
            <h3>${game.title}</h3>
            <div class="game-meta">
          
          </div>
          </div>
        `;
        grid.appendChild(card);
        }

       
      });
      //  if (window.editCardRating){
      //     window.editCardRating();
      //   }
// function editCardRating() {
//  console.log("kkkkkk",allCards)
// // Listen to real-time Firebase votes
// const allCards = document.querySelectorAll('.game-card');
  

// allCards.forEach(card => {

//   const titleSlug = card.dataset.title;
//   const slug = card.dataset.title.replace(".", "-").replace(" ", "-").toLowerCase();

//   db.ref('votes/' + slug).on('value', snapshot => {
//     const data = snapshot.val() || { likes: 0, dislikes: 0 };
//     updateCardRating(titleSlug, data.likes, data.dislikes);
//   });
// });

// };
//         editCardRating();
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

  function addFavIconToPages(){
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = '/images/minefuniogame-logo.png';
  link.type = 'image/png';

  // Append it to the head
  document.head.appendChild(link);

  }
addFavIconToPages()

function addAhrefsScript() {
  const script = document.createElement('script');
  script.src = "https://analytics.ahrefs.com/analytics.js";
  script.async = true;
  script.setAttribute("data-key", "gL4UsWMum3rQnngrtTGomQ"); // 🔴 حط key ديالك هنا

  document.head.appendChild(script);
  console.log("Ahrefs Analytics loaded ✅");
};
addAhrefsScript()

  function addAnalyticsScript() {
  const script = document.createElement('script');
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-GS1CEPEN9N";
    
  document.head.appendChild(script);
  console.log("Analytics added");
      window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GS1CEPEN9N');
};
addAnalyticsScript()
  


function toggleFullScreen() {
  var iframe = document.getElementById("iframe");

  // Check if any element is currently in fullscreen mode
  if (!document.fullscreenElement) {
    // If not, request fullscreen for the iframe
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
      iframe.msRequestFullscreen();
    }
  } else {
    // If an element is already in fullscreen, exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}
