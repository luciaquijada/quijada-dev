"use client";

import { m } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const ACCENT = "#facc15";
const STAR_DURATION = 15; // = GAME.starDuration
const STAR_WARN = 3; // = GAME.starWarn

// HUD mínimo durante el juego: puntuación (centro-arriba), multiplicador de
// combo (solo cuando es >1) y pips de vida (solo cuando hay más de una).
export default function Hud({
  score,
  mult,
  lives,
  stage,
  star,
}: {
  score: number;
  mult: number;
  lives: number;
  stage: number;
  star: number;
}) {
  const { t } = useLanguage();
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
          <m.div
            key={mult}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 text-sm font-bold tracking-widest"
            style={{ color: ACCENT }}
          >
            ×{mult}
          </m.div>
        )}
      </div>

      {/* Barra de superestrella: tiempo de invencibilidad restante */}
      {star > 0 && (
        <div
          role="status"
          aria-label={`${t("game.star")} ${Math.ceil(star)} s`}
          className={`pointer-events-none absolute left-1/2 top-[5.25rem] flex -translate-x-1/2 items-center gap-2 ${
            star < STAR_WARN ? "animate-pulse" : ""
          }`}
        >
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" aria-hidden="true" />
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-stone-900/10 dark:bg-white/10">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, (star / STAR_DURATION) * 100)}%`,
                background: "linear-gradient(90deg,#f43f5e,#facc15,#22c55e,#38bdf8,#a855f7)",
              }}
            />
          </div>
        </div>
      )}

      {/* Aviso de nivel: aparece un instante al cambiar de fondo. El centrado va en el
          contenedor (no en el elemento animado): framer-motion escribe `transform` y
          pisaría un -translate-x-1/2, desplazando el aviso hacia la derecha. */}
      {stage > 0 && (
        <div className="pointer-events-none absolute inset-x-0 top-32 flex justify-center">
          <m.div
            key={stage}
            role="status"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, 0], scale: [0.9, 1, 1, 1] }}
            transition={{ duration: 2, times: [0, 0.12, 0.75, 1], ease: "easeOut" }}
            className="rounded-full border border-yellow-400/70 bg-yellow-400/15 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-stone-900 dark:text-stone-100 sm:px-6 sm:text-base"
          >
            {t("game.level")} {stage + 1}
          </m.div>
        </div>
      )}

      {lives > 0 && (
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
