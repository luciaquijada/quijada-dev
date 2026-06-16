// Estado de la simulación y su paso de integración. Todo vive en objetos planos
// (mutados in-place por stepWorld) para no re-renderizar React por frame.
import { GAME } from "@/lib/game/config";

export type TrailPoint = { x: number; y: number; life: number };

export type Spark = {
  x: number;
  y: number;
  vy: number;
  flash: number; // 0..GAME.pulseFlash, se consume tras un Pulso (squash/glow)
};

export type BgDot = { x: number; y: number; r: number; speed: number; alpha: number };

export type World = {
  width: number;
  height: number;
  spark: Spark;
  trail: TrailPoint[];
  trailTimer: number;
  bg: BgDot[];
  scrollSpeed: number;
  elapsed: number;
  reducedMotion: boolean;
};

// PRNG determinista (LCG) — campo de fondo reproducible sin Math.random.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function makeBg(width: number, height: number, reducedMotion: boolean): BgDot[] {
  const rng = makeRng(0x9e3779b1);
  const layers = reducedMotion
    ? [{ speed: 0.25, r: 1.5, alpha: 0.1, count: 18 }]
    : [
        { speed: 0.25, r: 1.5, alpha: 0.1, count: 26 },
        { speed: 0.5, r: 2.2, alpha: 0.14, count: 18 },
        { speed: 0.85, r: 3, alpha: 0.18, count: 12 },
      ];
  const dots: BgDot[] = [];
  for (const l of layers) {
    for (let i = 0; i < l.count; i++) {
      dots.push({ x: rng() * width, y: rng() * height, r: l.r, speed: l.speed, alpha: l.alpha });
    }
  }
  return dots;
}

export function createWorld(width: number, height: number, reducedMotion: boolean): World {
  return {
    width,
    height,
    spark: { x: width * GAME.sparkXRatio, y: height * 0.4, vy: 0, flash: 0 },
    trail: [],
    trailTimer: 0,
    bg: makeBg(width, height, reducedMotion),
    scrollSpeed: GAME.scrollBase,
    elapsed: 0,
    reducedMotion,
  };
}

export function resizeWorld(w: World, width: number, height: number) {
  w.width = width;
  w.height = height;
  w.spark.x = width * GAME.sparkXRatio;
  w.spark.y = Math.min(w.spark.y, height - GAME.sparkRadius);
  w.bg = makeBg(width, height, w.reducedMotion);
}

// El único input del juego: fija la velocidad vertical hacia arriba y dispara el flash.
export function pulse(w: World) {
  w.spark.vy = GAME.pulseVy;
  w.spark.flash = GAME.pulseFlash;
}

export function stepWorld(w: World, dtMs: number) {
  const dt = dtMs / 1000;
  const s = w.spark;
  const r = GAME.sparkRadius;

  // Física de la Chispa (gravedad + clamp)
  s.vy = Math.max(-GAME.vyClamp, Math.min(GAME.vyClamp, s.vy + GAME.gravity * dt));
  s.y += s.vy * dt;
  if (s.flash > 0) s.flash = Math.max(0, s.flash - dt);

  // Suelo / techo: clamp suave (sin fail state en el prototipo)
  if (s.y < r) {
    s.y = r;
    if (s.vy < 0) s.vy = 0;
  }
  if (s.y > w.height - r) {
    s.y = w.height - r;
    if (s.vy > 0) s.vy = 0;
  }

  // Velocidad de scroll (rampa suave con tope)
  w.elapsed += dt;
  w.scrollSpeed = Math.min(GAME.scrollMax, GAME.scrollBase + w.elapsed * GAME.scrollRamp);

  // Estela: nace en la Chispa y deriva a la izquierda con el mundo (wake)
  w.trailTimer += dt;
  if (w.trailTimer >= GAME.trailInterval) {
    w.trailTimer = 0;
    w.trail.push({ x: s.x, y: s.y, life: 1 });
    if (w.trail.length > GAME.trailMax) w.trail.shift();
  }
  for (const p of w.trail) {
    p.x -= w.scrollSpeed * dt;
    p.life -= dt / GAME.trailLife;
  }
  while (w.trail.length && w.trail[0].life <= 0) w.trail.shift();

  // Campo de fondo (parallax): deriva y wrap por la derecha
  for (const d of w.bg) {
    d.x -= w.scrollSpeed * d.speed * dt;
    if (d.x < -4) {
      d.x += w.width + 8;
      d.y = (d.y + 137.5) % w.height;
    }
  }
}
