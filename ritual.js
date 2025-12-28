const v1 = document.getElementById('v1');
const v2 = document.getElementById('v2');
const v3 = document.getElementById('v3');
const confirmField = document.getElementById('confirmation-field');
const skipField = document.getElementById('skip-field');

/* VIDEOS */
v1.src = 'primervideo.mp4';
v2.src = 'CasaVelórieEntrada.mp4';
v3.src = 'parte3.mp4';

/* PREPARACIÓN */
setTimeout(() => {
  document.body.classList.add('pre-collapse');
}, 1600);

/* INTERACCIÓN INICIAL (De V1 a V2) */
confirmField.addEventListener('click', () => {
  // 1. ELIMINAR POSIBILIDAD DE REINICIO
  // Al poner display 'none', el div desaparece físicamente. No más clics al medio.
  confirmField.style.display = 'none'; 

  // 2. APLICAR EFECTO DE COLAPSO (Blur empieza aquí)
  document.body.classList.add('collapse');

  // 3. REPRODUCIR VIDEO 2
  v2.currentTime = 0;
  v2.play();

  v1.style.opacity = 0;
  v2.style.opacity = 1;

  // 4. ACTIVAR LÓGICA SKIP
  activarSkip();
});

/* LÓGICA SKIP (Solo 2 segundos) */
function activarSkip() {
  skipField.classList.add('visible');

  // Acción si clickea SKIP
  skipField.onclick = () => {
    irAEscena3();
  };

  // Temporizador de muerte del botón (2s)
  setTimeout(() => {
    skipField.classList.remove('visible');
    skipField.onclick = null; // Quitar evento
    skipField.style.pointerEvents = 'none';
  }, 2000);
}

/* IR A ESCENA 3 */
function irAEscena3() {
  // Limpieza preventiva
  skipField.classList.remove('visible');
  skipField.style.pointerEvents = 'none';

  // Cambio de Video
  v3.currentTime = 0;
  v3.play();

  v2.style.opacity = 0;
  v3.style.opacity = 1;

  // Detener V2 poco después
  setTimeout(() => v2.pause(), 500);

  // --- CONTROL DEL BLUR EN V3 ---
  // Estamos en estado 'collapse' (con blur).
  // Esperamos 1000ms (1 segundo) y quitamos el blur.
  setTimeout(() => {
    document.body.classList.remove('collapse');
    document.body.classList.remove('pre-collapse');
  }, 1000);
}

/* CONTINUIDAD AUTOMÁTICA (Si nadie toca Skip) */
v2.addEventListener('ended', () => {
  // Solo ejecutar si v3 no ha empezado
  if (v3.paused) {
    irAEscena3();
  }
});