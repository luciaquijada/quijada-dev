"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

// Pantalla de resultado tras morir. pointer-events-none a propósito: el tap que
// reinicia debe atravesarla y llegar a usePulse (el botón de salir queda encima).
export default function ResultScreen({ score, best }: { score: number; best: number }) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-stone-50/40 backdrop-blur-[2px] dark:bg-black/40"
    >
      <motion.div
        initial={{ scale: 0.9, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <div
          className="font-black leading-none tabular-nums text-stone-900 dark:text-stone-100"
          style={{ fontSize: 72 }}
        >
          {score}
        </div>
        <div className="mt-2 text-sm font-medium tracking-widest text-stone-500 dark:text-stone-400">
          {t("game.best")}: {best}
        </div>
        <div className="mt-8 text-base font-medium text-stone-600 dark:text-stone-300">
          {t("game.retry")}
        </div>
      </motion.div>
    </motion.div>
  );
}
