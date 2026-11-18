const FIREBASE_URL="https://pokememory-raul-default-rtdb.europe-west1.firebasedatabase.app";

export async function handleUserLogin(username, email) {
  try {
    // 1. consultar si el existe existe (GET)
    // Buscamos usuarios ordenados por email igaul al introducido
    const response = await fetch(`${FIREBASE_URL}/users.json?orderBy="email"&equalTo="${email}"`);
      const data = await response.json();

      let userId;
