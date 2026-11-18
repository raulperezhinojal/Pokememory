const FIREBASE_URL =
  'https://pokememory-raul-default-rtdb.europe-west1.firebasedatabase.app';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export async function saveScore(userId, time, pairs) {
  const score = {
    userId,
    time,
    pairs,
    date: new Date().toISOString(),
  };

  try {
    const response = await fetch(`${FIREBASE_URL}/scores.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(score),
    });
    const data = await response.json();
    return data.name; // Retorna ID para el highlight
  } catch (error) {
    console.error('Error guardando score:', error);
  }
}

export async function loadRanking(highlightScoreId = null) {
  const rankingContainer = document.getElementById('ranking');
  if (!rankingContainer) return;

  // 1. RENDER INICIAL: PINTAMOS LA TABLA YA (Estado Cargando)
  // Esto asegura que el usuario (y el test) siempre vean la tabla.
  rankingContainer.innerHTML = `
      <h3>Ranking Top 10</h3>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Usuario</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" style="text-align:center; color: #666;">Cargando...</td>
          </tr>
        </tbody>
      </table>
    `;

  try {
    const scoresRes = await fetch(`${FIREBASE_URL}/scores.json`);
    const scoresData = (await scoresRes.json()) || {};

    const usersRes = await fetch(`${FIREBASE_URL}/users.json`);
    const usersData = (await usersRes.json()) || {};

    const ranking = Object.entries(scoresData).map(([key, value]) => {
      const userObj = usersData[value.userId];
      return {
        id: key,
        username: userObj ? userObj.username : 'Anónimo',
        email: userObj ? userObj.email : '',
        time: value.time,
      };
    });

    ranking.sort((a, b) => a.time - b.time);
    const top10 = ranking.slice(0, 10);

    // 2. PREPARAMOS EL HTML DE LOS DATOS
    // Volvemos a pintar la estructura de la tabla para rellenarla
    let html = `
      <h3>Ranking Top 10</h3>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Usuario</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
    `;

    if (top10.length === 0) {
      // Estado: Tabla vacía
      html += `
        <tr>
          <td colspan="3" style="text-align:center; color: #666;">
            No hay puntuaciones aún
          </td>
        </tr>
      `;
    } else {
      // Estado: Con datos
      top10.forEach((item, index) => {
        const isHighlight = highlightScoreId && item.id === highlightScoreId;
        const rowClass = isHighlight ? 'highlight' : '';

        html += `
          <tr class="${rowClass}">
            <td>${index + 1}</td>
            <td>
               <strong>${item.username}</strong><br>
               <span style="font-size:0.8em; color:#666">${item.email}</span>
            </td>
            <td>${formatTime(item.time)}</td>
          </tr>
        `;
      });
    }

    html += '</tbody></table>';
    rankingContainer.innerHTML = html;
  } catch (error) {
    console.error('Error ranking:', error);
    // 3. ESTADO ERROR: Mantenemos la tabla visible
    rankingContainer.innerHTML = `
        <h3>Ranking Top 10</h3>
        <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Usuario</th>
                <th>Tiempo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="3" style="text-align:center; color: red;">
                  Error de conexión
                </td>
              </tr>
            </tbody>
        </table>`;
  }
}
