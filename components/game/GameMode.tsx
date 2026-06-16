"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { makeClock } from "@/lib/game/engine/clock";
import {
  createWorld,
  resizeWorld,
  stepWorld,
  pulse,
  type World,
} from "@/lib/game/engine/world";
import { renderWorld, type Palette } from "@/lib/game/render/draw";
import { usePulse } from "@/lib/game/input/usePulse";

const ACCENT = "#facc15";

// Paleta derivada del tema activo (claro/oscuro) — se lee por frame para que
// cambiar de tema durante el juego se refleje al instante.
function palette(): Palette {
  const dark = document.documentElement.classList.contains("dark");
  return dark
    ? { bg: "#000000", accent: ACCENT, dot: "#a8a29e" }
    : { bg: "#fafaf9", accent: ACCENT, dot: "#78716c" };
}

export default function GameMode({ onExit }: { onExit: () => void }) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const worldRef = useRef<World | null>(null);
  const [hasPulsed, setHasPulsed] = useState(false);

  const doPulse = useCallback(() => {
    if (worldRef.current) {
      pulse(worldRef.current);
      setHasPulsed(true);
    }
  }, []);

  usePulse(doPulse);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (worldRef.current) resizeWorld(worldRef.current, w, h);
    };

    worldRef.current = createWorld(window.innerWidth, window.innerHeight, reduced);
    setSize();

    // Oculta el cursor personalizado y bloquea el scroll mientras se juega.
    document.documentElement.classList.add("game-active");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const clock = makeClock((dt) => {
      if (worldRef.current) stepWorld(worldRef.current, dt);
    });

    let raf = 0;
    const frame = (now: number) => {
      clock(now);
      if (worldRef.current) renderWorld(ctx, worldRef.current, palette());
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => setSize();
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") onExit();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("game-active");
      document.body.style.overflow = prevOverflow;
      worldRef.current = null;
    };
  }, [onExit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9998] select-none"
      role="application"
      aria-label="Modo Juego"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />

      {/* Hint de onboarding (show-don't-tell): desaparece al primer Pulso */}
      {!hasPulsed && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-lg font-medium tracking-wide text-stone-500 dark:text-stone-400"
        >
          {t("game.hint")}
        </motion.p>
      )}

      {/* Salir del modo en 1 gesto (Esc o este botón) */}
      <button
        data-no-pulse
        onClick={onExit}
        aria-label={t("game.toggle.exit")}
        type="button"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/5 text-stone-600 transition-colors hover:bg-stone-900/10 hover:text-stone-900 dark:bg-white/5 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-stone-100"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}
