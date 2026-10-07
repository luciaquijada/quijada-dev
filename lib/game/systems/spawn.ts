// Generación procedural de fotones y vacíos. Los obstáculos nunca cubren todo el
// alto salvo las puertas, que siempre dejan un hueco franqueable por diseño.
// Los tipos avanzados se desbloquean con el nivel (ver GAME.stageScores).
import { GAME } from "@/lib/game/config";
import type { VoidKind, VoidShard, World } from "@/lib/game/types";

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makeVoid(kind: VoidKind, x: number, y: number, w: number, h: number): VoidShard {
  return { kind, x, y, w, h, flash: 0, grazed: false, baseY: y, amp: 0, freq: 0, phase: 0 };
}

function pickKind(stage: number): VoidKind {
  const r = Math.random();
  if (stage <= 0) return "shard";
  if (stage === 1) return r < 0.6 ? "shard" : "drifter";
  return r < 0.4 ? "shard" : r < 0.7 ? "drifter" : "gate";
}

function spawnShard(w: World, x: number) {
  const h = rand(GAME.voidMinH, w.height * GAME.voidMaxHRatio);
  const y = rand(GAME.safePad, w.height - GAME.safePad - h);
  w.voids.push(makeVoid("shard", x, y, GAME.voidW, h));
}

// Cápsula que sube y baja. Devuelve false si la pantalla es demasiado baja.
function spawnDrifter(w: World, x: number): boolean {
  const h = rand(GAME.voidMinH, w.height * 0.2);
  const range = w.height - 2 * GAME.safePad - h;
  const amp = Math.min(rand(GAME.drifterMinAmp, GAME.drifterMaxAmp), range / 2 - 1);
  if (amp < 12) return false;
  const baseY = rand(GAME.safePad + amp, w.height - GAME.safePad - h - amp);
  const v = makeVoid("drifter", x, baseY, GAME.voidW, h);
  v.amp = amp;
  v.freq = rand(GAME.drifterMinFreq, GAME.drifterMaxFreq);
  v.phase = rand(0, Math.PI * 2);
  w.voids.push(v);
  return true;
}

// Puerta: pared superior + inferior con un hueco que se estrecha con el tiempo.
function spawnGate(w: World, x: number): boolean {
  const gap = Math.min(
    Math.max(GAME.gateGapMin, GAME.gateGapStart - w.elapsed * GAME.gateGapRamp),
    w.height * 0.5,
  );
  const margin = GAME.safePad + 30;
  const maxTop = w.height - margin - gap;
  if (maxTop <= margin) return false;
  const gapTop = rand(margin, maxTop);
  const gapBottom = gapTop + gap;
  const overhang = 24; // las piezas sobresalen fuera de pantalla: no hay rendija por los bordes
  w.voids.push(makeVoid("gate", x, -overhang, GAME.gateW, gapTop + overhang));
  w.voids.push(makeVoid("gate", x, gapBottom, GAME.gateW, w.height - gapBottom + overhang));
  // Premio por cruzar el hueco
  w.photons.push({ x: x + GAME.gateW / 2, y: gapTop + gap / 2 });
  return true;
}

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

  // Superestrella: rara, nunca mientras hay una activa
  if (w.elapsed >= w.nextStarAt) {
    if (w.star <= 0 && w.stars.length === 0) {
      w.stars.push({
        x: w.width + GAME.spawnMargin,
        y: rand(GAME.safePad + 20, w.height - GAME.safePad - 20),
      });
    }
    w.nextStarAt = w.elapsed + rand(GAME.starGapMin, GAME.starGapMax);
  }

  // Vacíos: gap decreciente (dificultad por tiempo); el tipo depende del nivel
  if (w.elapsed >= GAME.firstVoidDelay && w.elapsed >= w.nextVoidAt) {
    const x = w.width + GAME.spawnMargin;
    const kind = pickKind(w.stage);
    let ok = false;
    if (kind === "drifter") ok = spawnDrifter(w, x);
    else if (kind === "gate") ok = spawnGate(w, x);
    if (!ok) spawnShard(w, x);

    const gap = Math.max(GAME.voidGapMin, GAME.voidGapStart - w.elapsed * GAME.voidGapRamp);
    w.nextVoidAt = w.elapsed + (kind === "gate" && ok ? gap * GAME.gateSpacing : gap);
  }
}
