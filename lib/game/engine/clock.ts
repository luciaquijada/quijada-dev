// Reloj con timestep FIJO + acumulador: la simulación avanza a 120 Hz
// independientemente del framerate de render (decoupling sim/render).
// Es la base de un feel determinista — clave para que el Pulso se sienta igual
// a 60 o a 144 fps. NO usamos useState aquí: esto corre dentro del rAF.
const STEP_MS = 1000 / 120;
const MAX_FRAME_MS = 250; // clamp anti "spiral of death" al volver de pestaña/tab inactiva

export function makeClock(step: (dtMs: number) => void) {
  let acc = 0;
  let prev = 0;
  return function tick(now: number) {
    if (prev === 0) prev = now;
    acc += Math.min(now - prev, MAX_FRAME_MS);
    prev = now;
    while (acc >= STEP_MS) {
      step(STEP_MS);
      acc -= STEP_MS;
    }
  };
}
