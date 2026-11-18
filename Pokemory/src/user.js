const FIREBASE_URL="https://pokememory-raul-default-rtdb.europe-west1.firebasedatabase.app";

export async function handleUserLogin(username, email) {
  try {
    // 1. consultar si el existe existe (GET)
    // Buscamos usuarios ordenados por email igaul al introducido
    const response = await fetch(`${FIREBASE_URL}/users.json?orderBy="email"&equalTo="${email}"`);
      const data = await response.json();

      let userId;

      // Si data no es null y tiene claves, el usuario existe
      if (data && Object.keys(data).length > 0) {
        //Obtenemos el id del primer resultado (aunque deberia ser unico)
        userId = Object.keys(data)[0];

        // 2. Actualizar el username si existe
        await fetch(`${FIREBASE_URL}/users/${userId}.json`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({ username : username }),
        });
      } else {
        // No existe: Creamos nuevo
      const createResponse = await fetch(`${FIREBASE_URL}/users.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });
        const createData = await createResponse.json();
        userId = createData.name; // Firebase devuelve el id en la propiedad "name"
      }

      // 4. Guradar en session Storage
