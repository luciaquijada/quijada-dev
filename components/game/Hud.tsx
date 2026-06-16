"use client";

import { motion } from "framer-motion";

const ACCENT = "#facc15";

// HUD mínimo durante el juego: puntuación (centro-arriba), multiplicador de
// combo (solo cuando es >1) y pips de vida (solo cuando hay más de una).
export default function Hud({
  score,
  mult,
  lives,
}: {
  score: number;
  mult: number;
  lives: number;
}) {
  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-center">
        <div
          className="font-black leading-none tabular-nums text-stone-900 dark:text-stone-100"
          style={{ fontSize: 44 }}
        >
          {score}
        </div>
        {mult > 1 && (
          <motion.div
            key={mult}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 text-sm font-bold tracking-widest"
            style={{ color: ACCENT }}
          >
            ×{mult}
          </motion.div>
        )}
      </div>

      {lives > 1 && (
        <div className="pointer-events-none absolute left-4 top-6 flex gap-1.5">
          {Array.from({ length: lives }).map((_, i) => (
            <span
              key={i}
              className="block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          ))}
        </div>
      )}
    </>
  );
}
