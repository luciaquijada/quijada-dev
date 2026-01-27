"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  const next = language === "es" ? "en" : "es";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={toggleLanguage}
      className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
      aria-label={language === "es" ? "Cambiar idioma a inglés" : "Change language to Spanish"}
      title={language === "es" ? "Idioma: Español" : "Language: English"}
      type="button"
    >
      <span className="text-xs font-semibold tracking-widest">{next.toUpperCase()}</span>
    </motion.button>
  );
}

