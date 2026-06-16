// Estado de la simulación y su paso de integración. Todo vive en objetos planos
// (mutados in-place por stepWorld) para no re-renderizar React por frame.
import { GAME } from "@/lib/game/config";
import type { BgDot, World } from "@/lib/game/types";
import { updateSpawn } from "@/lib/game/systems/spawn";
import { resolveCollisions } from "@/lib/game/systems/collision";

// PRNG determinista (LCG) — campo de fondo reproducible.
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

// Multiplicador de combo actual (×1, ×2, ×3… cada GAME.comboStep fotones).
export function comboMult(w: World): number {
  return 1 + Math.floor(w.combo / GAME.comboStep);
}

export function createWorld(width: number, height: number, reducedMotion: boolean): World {
  return {
    width,
    height,
    status: "intro",
    spark: { x: width * GAME.sparkXRatio, y: height * 0.42, vy: 0, flash: 0 },
    trail: [],
    trailTimer: 0,
    bg: makeBg(width, height, reducedMotion),
    photons: [],
    voids: [],
    pops: [],
    scrollSpeed: GAME.scrollBase,
    elapsed: 0,
    score: 0,
    combo: 0,
    lives: GAME.lives,
    invuln: 0,
    shake: 0,
    freeze: 0,
    deadFor: 0,
    nextPhotonAt: 0.6,
    nextVoidAt: GAME.firstVoidDelay,
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

// El único input: arranca la partida desde 'intro', fija la velocidad hacia
// arriba y dispara el flash de squash/glow.
export function pulse(w: World) {
  if (w.status === "intro") w.status = "playing";
  w.spark.vy = GAME.pulseVy;
  w.spark.flash = GAME.pulseFlash;
}

export function stepWorld(w: World, dtMs: number) {
  const dt = dtMs / 1000;

  // Decaimientos cosméticos (siempre, también en intro/dead)
  if (w.shake > 0) w.shake = Math.max(0, w.shake - dt * GAME.shakeDecayRate);
  if (w.freeze > 0) w.freeze = Math.max(0, w.freeze - dt);
  if (w.pops.length) {
    for (const p of w.pops) p.life -= dt / GAME.popLife;
    if (w.pops[0] && w.pops[0].life <= 0) w.pops = w.pops.filter((p) => p.life > 0);
  }

  // Fuera de juego: solo deriva lenta del fondo (intro/dead)
  if (w.status !== "playing") {
    if (w.status === "dead") w.deadFor += dt;
    const drift = w.scrollSpeed * GAME.introScrollFactor;
    for (const d of w.bg) {
      d.x -= drift * dt;
      if (d.x < -4) d.x += w.width + 8;
    }
    return;
  }

  // Freeze-frame de impacto: congela el gameplay un instante
  if (w.freeze > 0) return;

  const s = w.spark;
  const r = GAME.sparkRadius;

  // Física de la Chispa
  s.vy = Math.max(-GAME.vyClamp, Math.min(GAME.vyClamp, s.vy + GAME.gravity * dt));
  s.y += s.vy * dt;
  if (s.flash > 0) s.flash = Math.max(0, s.flash - dt);
  if (s.y < r) {
    s.y = r;
    if (s.vy < 0) s.vy = 0;
  }
  if (s.y > w.height - r) {
    s.y = w.height - r;
    if (s.vy > 0) s.vy = 0;
  }

  // Progreso / dificultad
  w.elapsed += dt;
  w.scrollSpeed = Math.min(GAME.scrollMax, GAME.scrollBase + w.elapsed * GAME.scrollRamp);
  if (w.invuln > 0) w.invuln = Math.max(0, w.invuln - dt);

  // Estela (wake que deriva a la izquierda con el mundo)
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

  // Fondo parallax
  for (const d of w.bg) {
    d.x -= w.scrollSpeed * d.speed * dt;
    if (d.x < -4) {
      d.x += w.width + 8;
      d.y = (d.y + 137.5) % w.height;
    }
  }

  // Entidades: spawn, desplazamiento y despawn
  updateSpawn(w);
  const shift = w.scrollSpeed * dt;
  if (w.photons.length) {
    for (const p of w.photons) p.x -= shift;
    if (w.photons[0] && w.photons[0].x < -12) w.photons = w.photons.filter((p) => p.x > -12);
  }
  if (w.voids.length) {
    for (const v of w.voids) v.x -= shift;
    if (w.voids[0] && w.voids[0].x + w.voids[0].w < -12) {
      w.voids = w.voids.filter((v) => v.x + v.w > -12);
    }
  }

  resolveCollisions(w);
}
