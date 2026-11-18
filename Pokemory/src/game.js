let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;
let timerInterval;
let startTime;

const board = document.getElementById('game-board');
const timer = document.getElementById('timer');
const playButton = document.getElementById('play-btn');
const gameForm = document.getElementById('game-form');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.getElementById('close-modal');

export function initGame() {
  closeModal.addEventListener('click', () => {
    modal.close();
  });

  gameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const numberOfCards = Number(
      document.getElementById('cards-number').value
    );

    if (
      !Number.isInteger(numberOfCards) ||
      numberOfCards <= 0 ||
      numberOfCards % 2 !== 0
    ) {
      showError('El número de cartas debe ser entero, positivo y par.');
      return;
    }

    startGame(numberOfCards);
  });
}

async function startGame(numberOfCards) {
  clearInterval(timerInterval);

  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  totalPairs = numberOfCards / 2;

  board.innerHTML = '';
  playButton.textContent = 'Volver a jugar';

  try {
    const pokemons = await getRandomPokemons(totalPairs);
    createBoard(pokemons);
    startTimer();
  } catch (error) {
    console.error(error);
    showError('No se han podido cargar los Pokémon.');
  }
}

async function getRandomPokemons(numberOfPokemons) {
  const ids = new Set();

  while (ids.size < numberOfPokemons) {
    const randomId = Math.floor(Math.random() * 150) + 1;
    ids.add(randomId);
  }

  const requests = [...ids].map((id) =>
