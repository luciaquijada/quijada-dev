// Colisiones de la Chispa contra fotones (recogida) y vacíos (daño + roce).
import { GAME } from "@/lib/game/config";
import type { World } from "@/lib/game/types";

// Aplica un golpe (vacío o borde): resta vida, rompe combo, activa invulnerabilidad
// y shake; si se queda sin vidas, dispara muerte + freeze-frame.
// Nivel que corresponde a una puntuación (los umbrales se repiten pasado el último).
export function stageForScore(score: number): number {
  const t = GAME.stageScores;
  const last = t.length - 1;
  if (score >= t[last]) return last + Math.floor((score - t[last]) / GAME.stageRepeat);
  let i = 0;
  while (i < last && score >= t[i + 1]) i++;
  return i;
}

function syncStage(w: World) {
  const next = stageForScore(w.score);
  if (next === w.stage) return;
  w.prevStage = w.stage;
  w.stage = next;
  w.stageT = w.reducedMotion ? 1 : 0;
}

export function applyHit(w: World) {
  w.lives -= 1;
  w.combo = 0;
  w.invuln = GAME.invuln;
  w.shake = w.reducedMotion ? 0 : GAME.hitShake;
  if (w.lives <= 0) {
    w.status = "dead";
    w.freeze = GAME.deathFreeze;
    w.shake = w.reducedMotion ? 0 : GAME.deathShake;
    w.deadFor = 0;
  }
}

export function resolveCollisions(w: World) {
  const s = w.spark;
  const r = GAME.sparkRadius;

  // Fotones: círculo-círculo con margen de gracia
  if (w.photons.length) {
    const reach = r + GAME.photonRadius + GAME.photonGrace;
    const reach2 = reach * reach;
    const list = w.photons;
    let kept = 0;
    for (const p of list) {
      const dx = s.x - p.x;
      const dy = s.y - p.y;
      if (dx * dx + dy * dy <= reach2) {
        w.combo += 1;
        const mult = 1 + Math.floor(w.combo / GAME.comboStep);
        w.score += GAME.photonBase * mult;
        w.pops.push({ x: p.x, y: p.y, life: 1 });
      } else {
        list[kept++] = p;
      }
    }
    if (kept !== list.length) {
      list.length = kept;
      syncStage(w);
    }
  }

  // Superestrellas: recogerla activa la invencibilidad (recoger otra reinicia el tiempo)
  if (w.stars.length) {
    const reach = r + GAME.starRadius;
    const reach2 = reach * reach;
    let kept = 0;
    for (const st of w.stars) {
      const dx = s.x - st.x;
      const dy = s.y - st.y;
      if (dx * dx + dy * dy <= reach2) {
        w.star = GAME.starDuration;
        w.invuln = 0;
        w.pops.push({ x: st.x, y: st.y, life: 1 });
        w.starPicked = true;
      } else {
        w.stars[kept++] = st;
      }
    }
    w.stars.length = kept;
  }

  // Con la estrella activa los vacíos se rompen al tocarlos (puntos, sin daño)
  if (w.star > 0) {
    let kept = 0;
    for (const v of w.voids) {
      const cx = Math.max(v.x, Math.min(s.x, v.x + v.w));
      const cy = Math.max(v.y, Math.min(s.y, v.y + v.h));
      const dx = s.x - cx;
      const dy = s.y - cy;
      if (dx * dx + dy * dy <= r * r) {
        w.score += GAME.starSmashPoints * (1 + Math.floor(w.combo / GAME.comboStep));
        w.pops.push({ x: Math.max(v.x, Math.min(s.x, v.x + v.w)), y: cy, life: 1 });
        w.shake = w.reducedMotion ? 0 : GAME.hitShake * 0.5;
        w.smashed = true;
      } else {
        w.voids[kept++] = v;
      }
    }
    if (kept !== w.voids.length) {
      w.voids.length = kept;
      syncStage(w);
    }
    return;
  }

  // Vacíos: en una pasada distinguimos golpe (dentro de la hitbox) de roce
  // (en la banda exterior). El Modo Asistencia encoge la hitbox de peligro;
  // reduced-motion anula el shake.
  if (w.invuln <= 0) {
    const dr = r * (w.assist ? GAME.assistDangerScale : 1);
    const dr2 = dr * dr;
    const outer = dr + GAME.nearMissBand;
    const outer2 = outer * outer;
    let hit = false;
    for (const v of w.voids) {
      const cx = Math.max(v.x, Math.min(s.x, v.x + v.w));
      const cy = Math.max(v.y, Math.min(s.y, v.y + v.h));
      const dx = s.x - cx;
      const dy = s.y - cy;
      const d2 = dx * dx + dy * dy;
      if (!hit && d2 <= dr2) {
        applyHit(w);
        hit = true;
      } else if (d2 > dr2 && d2 <= outer2 && !v.grazed) {
        v.grazed = true;
        v.flash = 1;
        w.nearMiss = true;
      }
    }
  }
}
