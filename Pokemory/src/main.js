import { handleUserLogin } from './user.js';
import { initGame } from './game.js';
import { loadRanking } from './ranking.js';

// ELEMENTOS DEL DOM

const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game');
const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');

// Funcion para cambiar de vista (registro -> juego)
function showGame() {
  loginContainer.style.display = 'none';
  gameContainer.style.display = 'block';
  // Aqui iniciaremos la logica del juego
  console.log('Juego iniciado para usuario:', sessionStorage.getItem('user'));

  //INICIAR LOGICA DEL JUEGO
  initGame();
  loadRanking();
}

// 1. Comprobar si ya estamos logueados al cargar la página
if (sessionStorage.getItem('user')) {
  showGame();
}

// 2. Manejar el envio del formulario
userForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // ecita que se recargue la pagina

  const username = usernameInput.value;
  const email = emailInput.value;

  // Llamamos a la funcion de firebase
  const succes = await handleUserLogin(username, email);

  if (succes) {
    showGame();
  }
});

// LOGICA DE LOGOUT
document.getElementById('logout-btn')?.addEventListener('click', () => {
  sessionStorage.removeItem('user'); // Borrar el ID de usuario
  window.location.reload(); // Recargar la página (mostrará el login de nuevo)
});
