"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

// El juego solo se carga en cliente y solo cuando se activa el modo:
// coste cero en la carga normal del portfolio.
const GameMode = dynamic(() => import("@/components/game/GameMode"), { ssr: false });

type GameContextValue = {
  active: boolean;
  enter: () => void;
  exit: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);

  const enter = useCallback(() => {
    const run = () => setActive(true);
    // Reutiliza el efecto View Transitions del toggle de tema para el "easter egg".
    if (typeof document !== "undefined" && document.startViewTransition) {
      document.startViewTransition(run);
    } else {
      run();
    }
  }, []);

  // En la salida dejamos que AnimatePresence anime el fundido (no usamos View
  // Transitions aquí para no solapar dos animaciones sobre el mismo unmount).
  const exit = useCallback(() => setActive(false), []);

  return (
    <GameContext.Provider value={{ active, enter, exit }}>
      {children}
      <AnimatePresence>{active && <GameMode onExit={exit} />}</AnimatePresence>
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
