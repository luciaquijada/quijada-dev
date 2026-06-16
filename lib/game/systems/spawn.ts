// Generación procedural de fotones y vacíos. Los vacíos son shards sueltos que
// nunca cubren todo el alto -> el hueco siempre es franqueable por diseño.
import { GAME } from "@/lib/game/config";
import type { World } from "@/lib/game/types";

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function updateSpawn(w: World) {
  // Fotones: pequeñas tandas en un punto vertical seguro
  if (w.elapsed >= w.nextPhotonAt) {
    const count = 1 + Math.floor(Math.random() * 3);
    const baseY = rand(GAME.safePad, w.height - GAME.safePad);
    for (let k = 0; k < count; k++) {
      const y = Math.max(
        GAME.safePad,
        Math.min(w.height - GAME.safePad, baseY + (Math.random() * 18 - 9)),
      );
      w.photons.push({ x: w.width + GAME.spawnMargin + k * 22, y });
    }
    w.nextPhotonAt = w.elapsed + rand(GAME.photonGapMin, GAME.photonGapMax);
  }

  // Vacíos: shards individuales con gap decreciente (dificultad por tiempo)
  if (w.elapsed >= GAME.firstVoidDelay && w.elapsed >= w.nextVoidAt) {
    const h = rand(GAME.voidMinH, w.height * GAME.voidMaxHRatio);
    const y = rand(GAME.safePad, w.height - GAME.safePad - h);
    w.voids.push({ x: w.width + GAME.spawnMargin, y, w: GAME.voidW, h, flash: 0, grazed: false });
    const gap = Math.max(GAME.voidGapMin, GAME.voidGapStart - w.elapsed * GAME.voidGapRamp);
    w.nextVoidAt = w.elapsed + gap;
  }
}
