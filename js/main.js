

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

      for (const game of games) {
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
            const rating = await updateCardRating(game.title);
            const meta = card.querySelector('.game-meta');
            meta.innerHTML = `
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${rating}
              </span>
            `;

        }
      }
    
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

async function setupAutoLinks() {
  try {
    // 1. Fetch the games.json file
    const response = await fetch('/js/games.json');
    
    // Check if the file exists
    if (!response.ok) {
      throw new Error("Could not find games.json file");
    }

    const gamesData = await response.json();

    // 2. Select all <strong> tags inside the #similar container
    const strongElements = document.querySelectorAll('#similar strong');

    strongElements.forEach(element => {
      const elementText = element.textContent.trim();

      // 3. Match text against JSON data
      gamesData.forEach(game => {
        if (elementText.replace(":", "") === game.title) {
          // Wrap the text in a link if it doesn't have one
          if (!element.querySelector('a')) {
            element.innerHTML = `<a href="${game.link}" class="auto-link">${elementText}</a>`;
          }
        }
      });
    });

  } catch (error) {
    console.error("Error loading games.json:", error);
  }
}

// Run the script when the page is ready
window.addEventListener('DOMContentLoaded', setupAutoLinks);


async function updateCardRating(titleSlug) {
  const slug = titleSlug.replace(".", "-").replace(" ", "-").toLowerCase();
  try {
    const snapshot = await db.ref('votes/' + slug).once('value');
    const data = snapshot.val() || { likes: 0, dislikes: 0 };
    const totalVotes = data.likes + data.dislikes;
    let rating = 0;
    if (totalVotes > 0) rating = (data.likes / totalVotes) * 10;
    return rating.toFixed(1);
  } catch (e) {
    console.log("Firebase error:", e);
    return 0;
  }
}


<div class="vote-buttons">

   
  </div>
function createVoteButtons(){
  const card = document.createElement('div');
   card.className = 'vote-buttons';
   card.innerHTML = `
         <button id="like-btn">
            <svg class="like-icon" stroke="currentColor" fill="none" stroke-width="20" viewBox="0 0 512 512" height="26" width="26" xmlns="http://www.w3.org/2000/svg">
              <path d="M198 448h172c15.7 0 28.6-9.6 34.2-23.4l57.1-135.4c1.7-4.4 2.6-9 2.6-14v-38.6c0-21.1-17-44.6-37.8-44.6H306.9l18-81.5.6-6c0-7.9-3.2-15.1-8.3-20.3L297 64 171 191.3c-6.8 6.9-11 16.5-11 27.1v192c0 21.1 17.2 37.6 38 37.6zM48 224h64v224H48z"></path>
            </svg>
            <span id="like-count">0</span>
          </button>
      
          <button id="dislike-btn">
            <svg class="dislike-icon" stroke="currentColor" fill="none" stroke-width="20" viewBox="0 0 512 512" height="26" width="26" xmlns="http://www.w3.org/2000/svg">
              <path d="M314 64H142c-15.7 0-28.6 9.6-34.2 23.4L50.6 222.8c-1.7 4.4-2.6 9-2.6 14v38.6c0 21.1 17 44.6 37.8 44.6h119.3l-18 81.5-.6 6c0 7.9 3.2 15.1 8.3 20.3l20 20.1L341 320.7c6.8-6.9 11-16.5 11-27.1v-192c0-21.1-17.2-37.6-38-37.6zM400 64h64v224h-64z"></path>
            </svg>
            <span id="dislike-count">0</span>
          </button>
                     <button id="fullScreen" onclick="toggleFullScreen()">
        <svg stroke="currentColor" fill="currentColor" stroke-width="25" viewBox="0 0 1000 1000" height="18" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M685.904 383.184l275.264-273.572-.896 155.072c-.289 12.928 9.967 24.176 22.912 23.888l16.416-.016c12.944-.304 23.648-8 23.92-20.928l.672-231.008c0-.223-.88-.399-.88-.623l1.264-11.712c.128-6.496-1.391-12.288-5.584-16.431-4.143-4.176-9.951-6.72-16.4-6.544l-11.696.272c-.223 0-.399.08-.64.113L760.77.687c-12.928.288-23.632 10.976-23.92 23.92l-.032 16.417c1.967 15.248 13.952 24.16 26.88 23.872l151.248.4L640.657 337.92c-12.496 12.496-12.496 32.752 0 45.264 12.496 12.48 32.752 12.48 45.247 0zM339.088 640.812L63.825 913.532l.88-154.224c.304-12.944-9.969-24.192-22.897-23.904l-17.423.032c-12.96.32-23.649 8-23.921 20.944l-.672 231.008c0 .224.88.367.88.623l-1.264 11.68c-.144 6.496 1.376 12.32 5.584 16.433 4.128 4.192 9.952 6.72 16.384 6.56l11.712-.288c.223 0 .383-.096.64-.096l230.495 1.008c12.928-.32 23.617-11.009 23.92-23.936l.032-16.432c-1.967-15.216-13.952-24.16-26.88-23.872l-151.247-.4L384.32 686.076c12.496-12.497 12.496-32.752 0-45.248s-32.737-12.512-45.233-.016zm685.122 346.56l-.672-231.01c-.288-12.944-10.992-20.624-23.92-20.944l-16.416-.032c-12.944-.289-23.184 10.975-22.912 23.903l.896 155.072-275.28-273.552c-12.496-12.496-32.752-12.496-45.248 0s-12.496 32.752 0 45.248L914.93 958.649l-151.232.4c-12.928-.288-24.912 8.657-26.88 23.872l.032 16.432c.304 12.944 11.008 23.633 23.92 23.936l229.504-1.007c.24 0 .416.095.64.095l11.696.288c6.448.16 12.272-2.368 16.4-6.56 4.193-4.128 5.696-9.936 5.584-16.432l-1.263-11.68c0-.255.88-.399.88-.622zM110.049 65.321l151.264-.397c12.928.288 24.912-8.64 26.88-23.873l-.032-16.431C287.84 11.677 277.15.972 264.24.7l-230.512.992c-.256-.032-.416-.112-.64-.112l-11.712-.273C14.945 1.132 9.105 3.676 4.992 7.851.784 11.995-.735 17.787-.592 24.283L.672 35.995c0 .223-.88.384-.88.624l.672 231.008c.288 12.928 10.977 20.624 23.921 20.928l17.424.015c12.928.288 23.183-10.96 22.895-23.888l-.88-154.224 275.264 272.72c12.48 12.497 32.753 12.497 45.25 0s12.496-32.768 0-45.264z"></path></svg>
      
        </button>

  `
}
