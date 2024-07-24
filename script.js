const entrada = document.getElementById('entrada');
const enviar = document.getElementById('enviar');
const salida = document.getElementById('salida');

let jugador = {
  x: 40,
  vidas: 3
};

let alienigenas = [];
let nivel = 1;

function iniciarJuego() {
  for (let i = 0; i < 5; i++) {
    alienigenas.push({ x: i * 10, y: 0 });
  }
  dibujarPantalla();
}

function procesarEntrada() {
  const comando = entrada.value.trim().toLowerCase();
  entrada.value = "";
  if (comando === "izquierda") {
    jugador.x -= 10;
  } else if (comando === "derecha") {
    jugador.x += 10;
  } else if (comando === "disparar") {
    for (let i = 0; i < alienigenas.length; i++) {
      if (alienigenas[i].x === jugador.x) {
        alienigenas.splice(i, 1);
        break;
      }
    }
  }
  actualizarAlienigenas();
  dibujarPantalla();
}

function actualizarAlienigenas() {
  for (let i = 0; i < alienigenas.length; i++) {
    alienigenas[i].y += 1;
    if (alienigenas[i].y > 40) {
      jugador.vidas -= 1;
      alienigenas.splice(i, 1);
    }
  }
  if (alienigenas.length === 0) {
    nivel += 1;
    for (let i = 0; i < 5; i++) {
      alienigenas.push({ x: i * 10, y: 0 });
    }
  }
  if (jugador.vidas === 0) {
    salida.textContent = "Game Over! Has perdido todas tus vidas.";
  }
}

function dibujarPantalla() {
  let pantalla = "";
  for (let i = 0; i < 40; i++) {
    pantalla += "-";
  }
  pantalla += "\n";
  for (let i = 0; i < 40; i++) {
    pantalla += " ";
  }
  pantalla += "\n";
  for (let i = 0; i < alienigenas.length; i++) {
    pantalla += `Alienígena en (${alienigenas[i].x}, ${alienigenas[i].y})\n`;
  }
  pantalla += `Tu posición: (${jugador.x}, 0)\n`;
  pantalla += `Vidas: ${jugador.vidas}\n`;
  pantalla += `Nivel: ${nivel}\n`;
  salida.textContent = pantalla;
}

iniciarJuego();
enviar.addEventListener("click", procesarEntrada);