const board = document.getElementById('bingo-board');
const phrases = [
  "Glowsticks", "Dust storm", "Mystical stranger", "Neon art", "Spoken word",
  "Fire dancer", "Cosmic vibes", "DIY costume", "Silent disco", "Solar panel",
  "Campfire story", "Lost sandal", "Dream journal", "Handmade gift", "Desert mirage",
  "Group hug", "Random act of kindness", "Sticker swap", "Bike parade", "Sunset howl",
  "Water refill", "Shade tent", "Face paint", "Festival flag", "Bingo!"
];

function renderBoard(state = null) {
  board.innerHTML = '';
  phrases.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'square';
    div.textContent = text;
    if (state && state[i]?.marked) div.classList.add('marked');
    div.addEventListener('click', () => {
      div.classList.toggle('marked');
      saveState();
    });
    board.appendChild(div);
  });
}

function saveState() {
  const state = Array.from(document.querySelectorAll('.square')).map(sq => ({
    text: sq.textContent,
    marked: sq.classList.contains('marked')
  }));
  localStorage.setItem('bingoState', JSON.stringify(state));
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem('bingoState'));
  renderBoard(saved);
}

window.addEventListener('load', loadState);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}