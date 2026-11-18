# PokeMemory

Práctica de JavaScript vanilla basada en un juego de memoria con Pokémon. La aplicación permite registrar jugadores, jugar partidas con cartas aleatorias, guardar los resultados en Firebase y consultar el ranking.

## Funcionalidades

### Registro

- Formulario con `username` y `email`.
- Consulta de usuarios en Firebase Realtime Database mediante `fetch`.
- Si el email ya existe, se actualiza el nombre de usuario.
- Si no existe, se crea un nuevo usuario.
- El identificador del usuario se guarda en `sessionStorage` con la clave `user`.

### Juego

- Selección de un número par y positivo de cartas.
- Cartas generadas a partir de Pokémon aleatorios de PokeAPI.
- Las imágenes se muestran mediante `background-image`.
- Cada carta tiene un atributo `data-id`.
- Las cartas descubiertas reciben la clase `flipped`.
- Las parejas correctas reciben la clase `matched`.
- Temporizador con formato `0m 0s`.
- Posibilidad de reiniciar la partida.

### Ranking

- Guarda cada partida completada en Firebase.
- Muestra usuario, email, tiempo y número de cartas.
- Ordena las partidas por número de cartas y tiempo.
- Resalta la partida recién guardada con la clase `highlight`.

### Logout

- El botón `logout-btn` elimina `sessionStorage.user`.
- La página se recarga y vuelve a mostrar el formulario de registro.

## Tecnologías

- HTML5
- CSS3
- JavaScript ES Modules
- Vite
- Firebase Realtime Database mediante REST API
- PokeAPI
- Cypress
- ESLint

## Instalación

Requisitos:

- Node.js
- pnpm

Instala las dependencias:

```bash
pnpm install
```

Si el lockfile necesita actualizarse:

```bash
pnpm install --no-frozen-lockfile
```

## Scripts disponibles

Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

Crear la versión de producción:

```bash
pnpm build
```

Comprobar el código con ESLint:

```bash
pnpm lint
```

Ejecutar los tests E2E de Cypress:

```bash
pnpm test:e2e
```

Abrir Cypress en modo visual:

```bash
pnpm test:e2e:open
```

Si Cypress indica que falta su ejecutable local, instalarlo con:

```bash
pnpm exec cypress install
pnpm exec cypress verify
```

## Estructura principal

```text
src/
├── main.js       # Inicialización, cambio de vistas y logout
├── user.js       # Registro y gestión de usuarios en Firebase
├── game.js       # Lógica de la partida y temporizador
├── ranking.js    # Guardado y renderizado del ranking
└── style.css     # Estilos de la aplicación

public/assets/
└── card-back.png # Reverso de las cartas

cypress/e2e/
├── 1-register.cy.js
├── 2-logout.cy.js
├── 3-gameForm.cy.js
└── 4-gamePlay.cy.js
```

## Firebase

La aplicación utiliza Firebase Realtime Database a través de su API REST. Los datos se almacenan en las colecciones:

- `users`: usuarios registrados.
- `scores`: partidas finalizadas.

La URL de Firebase se encuentra en `src/user.js` y `src/ranking.js`.

## GitHub Actions

El workflow `.github/workflows/test.yml` ejecuta automáticamente:

1. Instalación de dependencias.
2. ESLint.
3. Build de producción.
4. Tests E2E de Cypress.

## Licencia

Proyecto académico realizado para la práctica de JavaScript en entorno cliente.
