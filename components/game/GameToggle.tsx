"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useGame } from "@/components/game/GameProvider";

export default function GameToggle() {
  const { t } = useLanguage();
  const { enter } = useGame();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={enter}
      className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
      aria-label={t("game.toggle.enter")}
      title={t("game.toggle.enter")}
      type="button"
    >
      <Gamepad2 className="h-5 w-5" />
    </motion.button>
  );
}
