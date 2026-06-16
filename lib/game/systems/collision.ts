// Colisiones de la Chispa contra fotones (recogida) y vacíos (daño + roce).
import { GAME } from "@/lib/game/config";
import type { World, Photon } from "@/lib/game/types";

export function resolveCollisions(w: World) {
  const s = w.spark;
  const r = GAME.sparkRadius;

  // Fotones: círculo-círculo con margen de gracia
  if (w.photons.length) {
    const reach = r + GAME.photonRadius + GAME.photonGrace;
    const reach2 = reach * reach;
    const kept: Photon[] = [];
    for (const p of w.photons) {
      const dx = s.x - p.x;
      const dy = s.y - p.y;
      if (dx * dx + dy * dy <= reach2) {
        w.combo += 1;
        const mult = 1 + Math.floor(w.combo / GAME.comboStep);
        w.score += GAME.photonBase * mult;
        w.pops.push({ x: p.x, y: p.y, life: 1 });
      } else {
        kept.push(p);
      }
    }
    w.photons = kept;
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
        hit = true;
      } else if (d2 > dr2 && d2 <= outer2 && !v.grazed) {
        v.grazed = true;
        v.flash = 1;
        w.nearMiss = true;
      }
    }
  }
}
