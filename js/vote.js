
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRNoFOHQ2bC6XTliivWfpGMBDfKnR9sko",
  authDomain: "general-games-2775e.firebaseapp.com",
  databaseURL: "https://general-games-2775e-default-rtdb.firebaseio.com",
  projectId: "general-games-2775e",
  storageBucket: "general-games-2775e.firebasestorage.app",
  messagingSenderId: "750591153144",
  appId: "1:750591153144:web:12c8207bc0aa08c2b43c0d",
  measurementId: "G-5HM7TYMGD9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Elements
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const likeCount = document.getElementById('like-count');
const dislikeCount = document.getElementById('dislike-count');
const ratingValue = document.getElementById('rating-value');
const ratingFill = document.getElementById('rating-fill');

const slug = document.querySelector('.game-container').dataset.slug;

let userVotes = JSON.parse(localStorage.getItem('userVotes')) || {};
let voteQueue = null;

// Update icon fill based on visitor vote
function updateIconFill(){
  const userVote = userVotes[slug]; 
  const likeIcon = document.querySelector('.like-icon');
  const dislikeIcon = document.querySelector('.dislike-icon');

  likeIcon.style.backgroundColor = '';
  dislikeIcon.style.backgroundColor = '';

  if(userVote === 'likes'){
    likeIcon.setAttribute('fill','currentColor');  
    dislikeIcon.setAttribute('fill','none');   


  } else if(userVote === 'dislikes'){
    dislikeIcon.setAttribute('fill','currentColor');
    likeIcon.setAttribute('fill','none');

  } else {
    likeIcon.setAttribute('fill','none');
    dislikeIcon.setAttribute('fill','none');
  }
}

// ⭐ Rating الحساب
function updateRating(likes, dislikes){
  const totalVotes = likes + dislikes;
  let rating = 0;

  if(totalVotes > 0){
    rating = (likes / totalVotes) * 10;
  }

  rating = rating.toFixed(1);

  ratingValue.textContent = rating;
  ratingFill.style.width = (rating * 10) + '%';

  // color change based on rating
  if(rating < 4){
    ratingFill.style.background = '#ff6b6b';
  } else if(rating < 7){
    ratingFill.style.background = '#f7b731';
  } else {
    ratingFill.style.background = '#26de81';
  }
  if (rating != 0) {
      // Get all elements with the class 'your-class-name'
const elements = document.querySelectorAll('.rating-box');

// Iterate over the elements and set the display property
elements.forEach(el => {
  el.style.display = 'inline';
});

  }
}

// Listen to global votes in real-time
db.ref('votes/' + slug).on('value', snapshot => {
  const data = snapshot.val() || { likes: 0, dislikes: 0 };

  likeCount.textContent = data.likes;
  dislikeCount.textContent = data.dislikes;

  updateIconFill();
  updateRating(data.likes, data.dislikes);
});

// Push vote to Firebase
function pushVote(type){
  const oldVote = userVotes[slug];

  db.ref('votes/' + slug).transaction(current => {
    if(!current) current = { likes: 0, dislikes: 0 };

    if(oldVote){
      current[oldVote] = Math.max((current[oldVote] || 1) - 1, 0);
    }

    current[type] = (current[type] || 0) + 1;
    return current;

  }, (error, committed) => {
    if(committed){
      userVotes[slug] = type;
      localStorage.setItem('userVotes', JSON.stringify(userVotes));
      voteQueue = null;
      updateIconFill();
    } else if(error){
      console.error(error);
    }
  });
}

// Handle clicks with debounce
function handleVote(type){
  if(voteQueue === type) return;
  voteQueue = type;

  setTimeout(() => {
    if(voteQueue) pushVote(voteQueue);
  }, 300);
}

likeBtn.onclick = () => handleVote('likes');
dislikeBtn.onclick = () => handleVote('dislikes');

// Update rating for a specific game card
function updateCardRating(slug, likes, dislikes) {
  const totalVotes = likes + dislikes;
  let rating = 0;
  if (totalVotes > 0) rating = (likes / totalVotes) * 10;
  rating = rating.toFixed(1);

  // select the correct game-card based on data-title (slug)
  const card = document.querySelector(`.game-card[data-title="${slug.replace(".", "-").replace(" ", "-").toLowerCase()}"]`);
  if (!card) return;

  const meta = card.querySelector('.game-meta');
  if (!meta) return;

  // update the inner HTML of .game-meta
  meta.innerHTML = `
    <span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      ${rating}
    </span>
  `;
}
console.log("jjjjjjj",233)
// Listen to real-time Firebase votes
const allCards = document.querySelectorAll('.game-card');
allCards.forEach(card => {
  const slug = card.dataset.title;
console.log("jjjjjjj",slug)
  db.ref('votes/' + slug).on('value', snapshot => {
    const data = snapshot.val() || { likes: 0, dislikes: 0 };
    updateCardRating(slug, data.likes, data.dislikes);
  });
});

