"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  const next = language === "es" ? "en" : "es";

  return (
    <button
      onClick={toggleLanguage}
      className="flex h-11 w-11 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100"
      aria-label={
        language === "es"
          ? "Cambiar idioma a inglés (EN)"
          : "Change language to Spanish (ES)"
      }
      title={language === "es" ? "Idioma: Español" : "Language: English"}
      type="button"
    >
      <span lang={next} className="text-xs font-semibold tracking-widest">
        {next.toUpperCase()}
      </span>
    </button>
  );
}
