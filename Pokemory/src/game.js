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
