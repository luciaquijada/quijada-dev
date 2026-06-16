"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import Hud from "@/components/game/Hud";
import ResultScreen from "@/components/game/ResultScreen";
import { makeClock } from "@/lib/game/engine/clock";
import { comboMult, createWorld, pulse, resizeWorld, stepWorld } from "@/lib/game/engine/world";
import { renderWorld } from "@/lib/game/render/draw";
import { usePulse } from "@/lib/game/input/usePulse";
import { loadBest, saveBest } from "@/lib/game/persistence/storage";
import { GAME } from "@/lib/game/config";
import type { Palette, Status, World } from "@/lib/game/types";

const ACCENT = "#facc15";

// Paleta derivada del tema activo (claro/oscuro) — se lee por frame para que
// cambiar de tema durante el juego se refleje al instante.
function palette(): Palette {
  const dark = document.documentElement.classList.contains("dark");
  return dark
    ? { bg: "#000000", accent: ACCENT, dot: "#a8a29e", danger: "#141414", dangerEdge: "#57534e" }
    : { bg: "#fafaf9", accent: ACCENT, dot: "#78716c", danger: "#1c1917", dangerEdge: "#1c1917" };
}

type HudState = { score: number; mult: number; lives: number; status: Status };

export default function GameMode({ onExit }: { onExit: () => void }) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const worldRef = useRef<World | null>(null);
  const reducedRef = useRef(false);
  const [hud, setHud] = useState<HudState>({ score: 0, mult: 1, lives: GAME.lives, status: "intro" });
  const [best, setBest] = useState(0);

  const restart = useCallback(() => {
    const next = createWorld(window.innerWidth, window.innerHeight, reducedRef.current);
    worldRef.current = next;
    pulse(next); // arranca jugando con el mismo tap que reinicia
  }, []);

  const doPulse = useCallback(() => {
    const w = worldRef.current;
    if (!w) return;
    if (w.status === "dead") {
      if (w.deadFor >= GAME.restartGrace) restart();
      return;
    }
    pulse(w);
  }, [restart]);

  usePulse(doPulse);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;

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

    const startBest = loadBest();
    let bestVal = startBest;
    setBest(startBest);

    // Oculta el cursor personalizado y bloquea el scroll mientras se juega.
    document.documentElement.classList.add("game-active");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const clock = makeClock((dt) => {
      if (worldRef.current) stepWorld(worldRef.current, dt);
    });

    let prevStatus: Status = "intro";
    let lastSync = 0;
    let raf = 0;

    const frame = (now: number) => {
      const w = worldRef.current;
      if (w) {
        clock(now);
        renderWorld(ctx, w, palette());

        // Al morir: persiste el mejor (una sola vez por muerte)
        if (w.status === "dead" && prevStatus !== "dead") {
          const candidate = Math.floor(w.score);
          if (candidate > bestVal) {
            bestVal = candidate;
            saveBest(candidate);
            setBest(candidate);
          }
        }
        prevStatus = w.status;

        // Sincroniza el HUD a ~11 Hz (no React por frame)
        if (now - lastSync > 90) {
          lastSync = now;
          const score = Math.floor(w.score);
          const mult = comboMult(w);
          setHud((prev) =>
            prev.score === score && prev.mult === mult && prev.lives === w.lives && prev.status === w.status
              ? prev
              : { score, mult, lives: w.lives, status: w.status },
          );
        }
      }
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
      className="fixed inset-0 z-[9998] touch-none select-none"
      role="application"
      aria-label="Modo Juego"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />

      {/* HUD durante el juego */}
      {hud.status === "playing" && <Hud score={hud.score} mult={hud.mult} lives={hud.lives} />}

      {/* Hint de onboarding (show-don't-tell): solo antes del primer Pulso */}
      {hud.status === "intro" && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-lg font-medium tracking-wide text-stone-500 dark:text-stone-400"
        >
          {t("game.hint")}
        </motion.p>
      )}

      {/* Pantalla de resultado */}
      {hud.status === "dead" && <ResultScreen score={hud.score} best={best} />}

      {/* Salir del modo en 1 gesto (Esc o este botón) */}
      <button
        data-no-pulse
        onClick={onExit}
        aria-label={t("game.toggle.exit")}
        type="button"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/5 text-stone-600 transition-colors hover:bg-stone-900/10 hover:text-stone-900 dark:bg-white/5 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-stone-100"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}
