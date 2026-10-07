"use client";

import { useEffect, useState } from "react";
import Hud from "@/components/game/Hud";

export type HudData = { score: number; mult: number; lives: number; stage: number; star: number };

// Aísla el HUD (que se refresca ~11 Hz) del resto de GameMode: así los ajustes,
// el hint y el resultado no se vuelven a pintar con cada cambio de puntuación.
export default function HudHost({
  initial,
  register,
}: {
  initial: HudData;
  register: (set: (d: HudData) => void) => void;
}) {
  // Copia: GameMode muta `initial` en sitio; si compartiéramos la referencia, el estado
  // ya "tendría" los valores nuevos y React no se re-renderizaría.
  const [d, setD] = useState<HudData>(() => ({ ...initial }));

  useEffect(() => {
    register((n) =>
      setD((prev) =>
        prev.score === n.score &&
        prev.mult === n.mult &&
        prev.lives === n.lives &&
        prev.stage === n.stage &&
        prev.star === n.star
          ? prev
          : n,
      ),
    );
    return () => register(() => {});
  }, [register]);

  return <Hud score={d.score} mult={d.mult} lives={d.lives} stage={d.stage} star={d.star} />;
}
