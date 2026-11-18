const FIREBASE_URL="https://pokememory-raul-default-rtdb.europe-west1.firebasedatabase.app";

export async function handleUserLogin(username, email) {
  try {
    const response = await fetch(`${FIREBASE_URL}/users.json`);
    if (!response.ok) throw new Error(`Firebase users: ${response.status}`);
    const data = (await response.json()) || {};
    const found = Object.entries(data).find(([, value]) => value.email === email);
    let userId = found?.[0];

    if (userId) {
      const updateResponse = await fetch(`${FIREBASE_URL}/users/${userId}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (!updateResponse.ok) throw new Error(`Firebase update: ${updateResponse.status}`);
    } else {
      const createResponse = await fetch(`${FIREBASE_URL}/users.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });
      if (!createResponse.ok) throw new Error(`Firebase create: ${createResponse.status}`);
      userId = (await createResponse.json()).name;
    }

      // 4. Guradar en session Storage
      sessionStorage.setItem("user", userId);

      //Devolver true para indicar exito
      return true;
  } catch (error) {
    console.error("Error en login:", error);
    alert("Hubo un error conectando con la base de datos.");
    return false;
  }
}
