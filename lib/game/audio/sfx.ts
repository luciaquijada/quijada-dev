// SFX sintetizados con Web Audio (sin archivos de audio). El AudioContext se crea
// de forma perezosa en el primer gesto del jugador (el primer Pulso), como exigen
// las políticas de autoplay del navegador. Disparados desde el frame loop por diff
// de estado, no desde la simulación (que se mantiene pura).
let ctx: AudioContext | null = null;
let muted = false;

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
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(freq: number, dur: number, type: OscillatorType, gain: number) {
  if (muted) return;
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export function playPulse() {
  blip(420, 0.08, "triangle", 0.04);
}

// El tono sube con el multiplicador de combo (dopamina de racha).
export function playCollect(mult: number) {
  blip(640 + Math.min(mult, 8) * 70, 0.09, "sine", 0.05);
}

export function playHit() {
  blip(150, 0.16, "sawtooth", 0.06);
}

export function playDead() {
  if (muted) return;
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(300, t);
  osc.frequency.exponentialRampToValueAtTime(70, t + 0.4);
  g.gain.setValueAtTime(0.07, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.5);
}
