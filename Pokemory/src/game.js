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
