"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Accessibility, Volume2, VolumeX, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import HudHost, { type HudData } from "@/components/game/HudHost";
import ResultScreen from "@/components/game/ResultScreen";
import { makeClock } from "@/lib/game/engine/clock";
import { comboMult, createWorld, pulse, resizeWorld, stepWorld } from "@/lib/game/engine/world";
import { renderWorld } from "@/lib/game/render/draw";
import { usePulse } from "@/lib/game/input/usePulse";
import { loadBest, loadSettings, saveBest, saveSettings } from "@/lib/game/persistence/storage";
import * as sfx from "@/lib/game/audio/sfx";
import { GAME } from "@/lib/game/config";
import type { Status, World } from "@/lib/game/types";


export default function GameMode({ onExit }: { onExit: () => void }) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const worldRef = useRef<World | null>(null);
  const reducedRef = useRef(false);
  const assistRef = useRef(false);
  const mutedRef = useRef(false);
  // Solo cambia en transiciones (intro → playing → dead). El HUD con la puntuación
  // vive en HudHost y se actualiza por su cuenta, sin re-renderizar todo GameMode.
  const [status, setStatus] = useState<Status>("intro");
  const [finalScore, setFinalScore] = useState(0);
  const hudSetRef = useRef<(d: HudData) => void>(() => {});
  const hudLatest = useRef<HudData>({ score: 0, mult: 1, lives: GAME.lives, stage: 0, star: 0 });
  const registerHud = useCallback((fn: (d: HudData) => void) => {
    hudSetRef.current = fn;
  }, []);
  const [best, setBest] = useState(0);
  const [settings, setSettings] = useState({ assist: false, muted: false });

  const restart = useCallback(() => {
    const next = createWorld(window.innerWidth, window.innerHeight, reducedRef.current, assistRef.current);
    worldRef.current = next;
    // El HUD se vuelve a montar con estos valores: sin esto arrancaba la nueva partida
    // mostrando los de la anterior (0 vidas, puntuación vieja) hasta la siguiente sincronización.
    Object.assign(hudLatest.current, { score: 0, mult: 1, lives: next.lives, stage: 0, star: 0 });
    pulse(next); // arranca jugando con el mismo tap que reinicia
  }, []);

  const doPulse = useCallback(() => {
    const w = worldRef.current;
    if (!w) return;
    if (w.status === "dead") {
      if (w.deadFor >= GAME.restartGrace) {
        restart();
        sfx.playPulse();
      }
      return;
    }
    pulse(w);
    sfx.playPulse();
  }, [restart]);

  usePulse(doPulse);

  // El cursor solo se oculta mientras se vuela; en intro/resultado vuelve a verse
  // para poder apuntar a los chips y a la X.
  useEffect(() => {
    const el = document.documentElement;
    if (status === "playing") el.classList.add("game-playing");
    else el.classList.remove("game-playing");
    return () => el.classList.remove("game-playing");
  }, [status]);

  const toggleAssist = useCallback(() => {
    const next = !assistRef.current;
    assistRef.current = next;
    const s = { assist: next, muted: mutedRef.current };
    setSettings(s);
    saveSettings(s);
    // No estamos jugando (chips solo en intro/dead): recrear el mundo lo aplica ya.
    worldRef.current = createWorld(window.innerWidth, window.innerHeight, reducedRef.current, next);
  }, []);

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    const s = { assist: assistRef.current, muted: next };
    setSettings(s);
    saveSettings(s);
    sfx.setMuted(next);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;

    const loaded = loadSettings();
    assistRef.current = loaded.assist;
    mutedRef.current = loaded.muted;
    setSettings(loaded);
    sfx.setMuted(loaded.muted);

    // Resolución dinámica: si el frame time se mantiene alto (GPU/pantalla 4K justa),
    // el canvas baja su resolución interna (hasta 55 %) y vuelve a subir si hay margen.
    let resScale = 1;
    let frameEma = 1 / 60;
    let lastResChange = 0;
    let lastDownAt = 0;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * resScale;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (worldRef.current) resizeWorld(worldRef.current, w, h);
    };

    worldRef.current = createWorld(window.innerWidth, window.innerHeight, reduced, loaded.assist);
    setSize();

    let bestVal = loadBest();
    setBest(bestVal);

    // Marca el modo activo y bloquea el scroll de la página de detrás (html + body)
    // para que no se puedan tocar/desplazar los bordes superior ni inferior.
    document.documentElement.classList.add("game-active");
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const clock = makeClock((dt) => {
      if (worldRef.current) stepWorld(worldRef.current, dt);
    });

    const root = document.documentElement;
    const dilTotal = GAME.comboDilationHold + GAME.comboDilationEase;
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    let prevStatus: Status = "intro";
    let prevMult = 1;
    let prevLives = worldRef.current.lives;
    let prevStage = 0;
    let lastSync = 0;
    let lastNow = 0;
    let dilation = 0; // s restantes del envelope de time-dilation
    let raf = 0;

    const frame = (now: number) => {
      const w = worldRef.current;
      if (w) {
        const realDt = lastNow ? Math.min((now - lastNow) / 1000, 0.25) : 0;
        lastNow = now;

        if (realDt > 0 && realDt < 0.1) {
          frameEma += (realDt - frameEma) * 0.08;
          if (now - lastResChange > 2000) {
            if (frameEma > 0.021 && resScale > 0.55) {
              resScale = Math.max(0.55, resScale - 0.15);
              lastResChange = lastDownAt = now;
              setSize();
            } else if (frameEma < 0.0125 && resScale < 1 && now - lastDownAt > 10000) {
              resScale = Math.min(1, resScale + 0.15);
              lastResChange = now;
              setSize();
            }
          }
        }

        // Time-dilation en hitos de combo (desactivada con reduced-motion)
        if (dilation > 0) dilation = Math.max(0, dilation - realDt);
        let scale = 1;
        if (!reducedRef.current && dilation > 0) {
          const into = dilTotal - dilation;
          scale =
            into < GAME.comboDilationHold
              ? GAME.comboDilationScale
              : GAME.comboDilationScale +
                (1 - GAME.comboDilationScale) *
                  easeOut(Math.min(1, (into - GAME.comboDilationHold) / GAME.comboDilationEase));
        }
        clock(now, scale);
        renderWorld(ctx, w, root.classList.contains("dark"));

        // Audio + feel por diff de estado (cada frame). Reset de trackers en reinicio.
        const sc = Math.floor(w.score);
        const mult = comboMult(w);
        if (mult < prevMult) prevMult = mult;
        if (w.lives > prevLives) prevLives = w.lives;

        // La recogida suena solo por fotones: los vacíos rotos (que también suman
        // puntos) tienen su propio sonido y no deben apilar otro "collect".
        if (w.photonCollected) {
          sfx.playCollect(mult);
          w.photonCollected = false;
        }
        if (w.status === "playing" && mult > prevMult) {
          dilation = dilTotal;
          sfx.playMilestone();
        }
        if (w.stage !== prevStage) {
          if (w.stage > prevStage && w.status === "playing") sfx.playMilestone();
          prevStage = w.stage;
        }
        if (w.starPicked) {
          sfx.playStar();
          w.starPicked = false;
        }
        if (w.smashed) {
          sfx.playSmash();
          w.smashed = false;
        }
        if (w.nearMiss) {
          sfx.playWhoosh();
          w.nearMiss = false;
        }
        if (w.lives < prevLives && w.status !== "dead") sfx.playHit();
        if (w.status === "dead" && prevStatus !== "dead") {
          sfx.playDead();
          if (sc > bestVal) {
            bestVal = sc;
            saveBest(sc);
            setBest(sc);
          }
        }
        if (w.status !== prevStatus) {
          if (w.status === "dead") setFinalScore(sc);
          setStatus(w.status);
          lastSync = 0; // refresca el HUD en este mismo frame, sin esperar a los 90 ms
        }
        prevMult = mult;
        prevLives = w.lives;
        prevStatus = w.status;

        // Sincroniza el HUD a ~11 Hz (no React por frame)
        if (now - lastSync > 90) {
          lastSync = now;
          const d = hudLatest.current;
          d.score = sc;
          d.mult = mult;
          d.lives = w.lives;
          d.stage = w.stage;
          d.star = Math.ceil(w.star * 10) / 10;
          hudSetRef.current({ ...d });
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
      sfx.suspend();
      document.documentElement.classList.remove("game-active");
      document.documentElement.classList.remove("game-playing");
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      worldRef.current = null;
    };
  }, [onExit]);

  const showChips = status === "intro" || status === "dead";

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
      {status === "playing" && <HudHost initial={hudLatest.current} register={registerHud} />}

      {/* Hint de onboarding (show-don't-tell): solo antes del primer Pulso */}
      {status === "intro" && (
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
      {status === "dead" && <ResultScreen score={finalScore} best={best} />}

      {/* Ajustes (asistencia + sonido): solo en intro/resultado, no durante el juego */}
      {showChips && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          <Chip active={settings.assist} onClick={toggleAssist} label={t("game.assist")}>
            <Accessibility className="h-4 w-4" />
          </Chip>
          <Chip active={!settings.muted} onClick={toggleMute} label={t("game.sound")}>
            {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Chip>
        </div>
      )}

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

function Chip({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      data-no-pulse
      onClick={onClick}
      type="button"
      aria-pressed={active}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
        active
          ? "border-yellow-400 text-stone-900 dark:text-stone-100"
          : "border-stone-300 text-stone-500 hover:text-stone-800 dark:border-stone-700 dark:text-stone-400 dark:hover:text-stone-100"
      }`}
      style={active ? { boxShadow: "0 0 0 1px rgba(250,204,21,0.4)" } : undefined}
    >
      {children}
      {label}
    </button>
  );
}
