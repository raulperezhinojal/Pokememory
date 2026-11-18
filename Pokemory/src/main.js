import { handleUserLogin} from './user.js';

// ELEMENTOS DEL DOM

const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game');
const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');

// Funcion para cambiar de vista (registro -> juego)
function showGame() {
