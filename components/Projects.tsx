"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section 
      id="projects" 
      className="bg-white px-4 py-12 dark:bg-black sm:px-6 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-12 md:mb-16"
        >
          <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
            {t("projects.title")}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 sm:max-w-2xl sm:text-lg">
            <span className="sm:hidden">{t("projects.subtitle.mobile")}</span>
            <span className="hidden sm:inline">
              {t("projects.subtitle.desktop")}
            </span>
          </p>
        </motion.div>

        {/* In Build State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50/50 px-4 py-8 dark:border-stone-800 dark:bg-stone-900/50 sm:rounded-3xl sm:px-6 sm:py-16 md:py-20"
        >
          <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 sm:mb-6 sm:h-16 sm:w-16">
            <Hammer className="h-5 w-5 text-stone-400 dark:text-stone-500 sm:h-8 sm:w-8" />
          </div>
          <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 sm:mb-2 sm:text-xl sm:font-semibold">
            {t("projects.inBuild.title")}
          </h3>
          <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500 sm:mt-0 sm:max-w-md sm:text-center sm:text-base">
            <span className="sm:hidden">{t("projects.inBuild.subtitle.mobile")}</span>
            <span className="hidden sm:inline">
              {t("projects.inBuild.subtitle.desktop")}
            </span>
          </p>
          <div className="mt-3 flex items-center gap-1.5 sm:mt-6 sm:gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500 sm:h-2 sm:w-2" />
            <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 sm:text-sm">
              {t("projects.inBuild.badge")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
