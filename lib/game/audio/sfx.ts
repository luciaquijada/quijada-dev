// SFX sintetizados con Web Audio (sin archivos de audio). El AudioContext se crea
// de forma perezosa en el primer gesto del jugador (el primer Pulso), como exigen
// las políticas de autoplay del navegador. Disparados desde el frame loop por diff
// de estado, no desde la simulación (que se mantiene pura).
//
// Todo pasa por una cadena master (ganancia + compresor) para que varios sonidos
// simultáneos no saturen/distorsionen, y cada sonido tiene un intervalo mínimo
// para que una ráfaga de eventos no apile decenas de osciladores.
let ctx: AudioContext | null = null;
let master: AudioNode | null = null;
let muted = false;
const lastPlayed: Record<string, number> = {};

export function setMuted(value: boolean) {
  muted = value;
}

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    const gain = ctx.createGain();
    gain.gain.value = 0.8;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 6;
    gain.connect(comp).connect(ctx.destination);
    master = gain;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// Libera el audio al salir del Modo Juego: el portfolio normal no debe tener un
// AudioContext activo. Se reanuda solo al volver a sonar algo.
export function suspend() {
  if (ctx && ctx.state === "running") void ctx.suspend();
}

// true si este sonido puede sonar ahora (respeta su intervalo mínimo)
function ready(key: string, minGapMs: number): boolean {
  const now = performance.now();
  if (now - (lastPlayed[key] ?? -Infinity) < minGapMs) return false;
  lastPlayed[key] = now;
  return true;
}

function tone(
  c: AudioContext,
  start: number,
  freq: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  endFreq?: number,
) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, start + dur);
  // Ataque corto sin salto brusco (evita el "clic") y release exponencial
  g.gain.setValueAtTime(0.0001, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(master ?? c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

function play(key: string, minGapMs: number, fn: (c: AudioContext, t: number) => void) {
  if (muted || !ready(key, minGapMs)) return;
  const c = ac();
  if (!c) return;
  fn(c, c.currentTime);
}

export function playPulse() {
  play("pulse", 45, (c, t) => tone(c, t, 420, 0.08, "triangle", 0.04));
}

// El tono sube con el multiplicador de combo (dopamina de racha).
export function playCollect(mult: number) {
  play("collect", 40, (c, t) => tone(c, t, 640 + Math.min(mult, 8) * 70, 0.09, "sine", 0.05));
}

export function playHit() {
  play("hit", 120, (c, t) => tone(c, t, 150, 0.16, "sawtooth", 0.06));
}

export function playDead() {
  play("dead", 300, (c, t) => tone(c, t, 300, 0.45, "sawtooth", 0.07, 70));
}

// Roce (near-miss): barrido corto descendente, distinto del Pulso.
export function playWhoosh() {
  play("whoosh", 120, (c, t) => tone(c, t, 600, 0.11, "sine", 0.03, 200));
}

// Hito de combo / nivel (×2, ×3…): arpegio corto ascendente.
export function playMilestone() {
  play("milestone", 200, (c, t) => {
    tone(c, t, 880, 0.12, "sine", 0.045);
    tone(c, t + 0.07, 1175, 0.12, "sine", 0.045);
  });
}

// Superestrella: arpegio ascendente brillante.
export function playStar() {
  play("star", 400, (c, t) => {
    [523, 659, 784, 1047, 1319].forEach((f, i) => tone(c, t + i * 0.055, f, 0.1, "square", 0.03));
  });
}

// Vacío roto con la estrella: chasquido corto y grave.
export function playSmash() {
  play("smash", 70, (c, t) => tone(c, t, 260, 0.09, "square", 0.04));
}
