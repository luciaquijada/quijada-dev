// Colisiones de la Chispa contra fotones (recogida) y vacíos (daño).
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

  // Vacíos: círculo-rectángulo (punto más cercano). Ignora si hay invulnerabilidad.
  if (w.invuln <= 0) {
    for (const v of w.voids) {
      const cx = Math.max(v.x, Math.min(s.x, v.x + v.w));
      const cy = Math.max(v.y, Math.min(s.y, v.y + v.h));
      const dx = s.x - cx;
      const dy = s.y - cy;
      if (dx * dx + dy * dy <= r * r) {
        w.lives -= 1;
        w.combo = 0;
        w.invuln = GAME.invuln;
        w.shake = GAME.hitShake;
        if (w.lives <= 0) {
          w.status = "dead";
          w.freeze = GAME.deathFreeze;
          w.shake = GAME.deathShake;
          w.deadFor = 0;
        }
        break;
      }
    }
  }
}
