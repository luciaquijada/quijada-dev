"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const projects = [
  {
    id: "still",
    url: "https://www.stillspace.es/",
    tags: ["React", "TypeScript", "Supabase", "PWA"],
    icon: {
      light: "/assets/favicon.png",
      dark: "/assets/favicon-nav.png",
    },
  },
] as const;

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
            <span className="hidden sm:inline">{t("projects.subtitle.desktop")}</span>
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hover-card group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-black sm:rounded-3xl sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/0 opacity-0 transition-opacity duration-300 group-hover:from-yellow-400/[0.05] group-hover:via-transparent group-hover:to-transparent group-hover:opacity-100"
              />
              <div
                aria-hidden
                className="absolute bottom-0 left-0 top-0 w-1 origin-bottom scale-y-0 rounded-r-full bg-yellow-400 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              />

              <div className="relative flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                      <img
                        src={project.icon.light}
                        alt={t(`projects.${project.id}.name`)}
                        className="h-full w-full object-cover dark:hidden"
                      />
                      <img
                        src={project.icon.dark}
                        alt={t(`projects.${project.id}.name`)}
                        className="hidden h-full w-full object-cover dark:block"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900 transition-colors duration-300 group-hover:text-stone-950 dark:text-stone-100 sm:text-2xl">
                        {t(`projects.${project.id}.name`)}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-stone-400 transition-colors duration-300 group-hover:text-yellow-600 dark:text-stone-500 dark:group-hover:text-yellow-400 sm:text-sm">
                        {t(`projects.${project.id}.category`)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white group-hover:border-stone-900 group-hover:bg-stone-900 group-hover:text-white dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-100 dark:hover:bg-stone-100 dark:hover:text-stone-900 dark:group-hover:border-stone-100 dark:group-hover:bg-stone-100 dark:group-hover:text-stone-900 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {t(`projects.${project.id}.visit`)}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
                  </a>
                </div>

                <p className="text-sm leading-relaxed text-stone-500 transition-colors duration-300 group-hover:text-stone-600 dark:text-stone-400 dark:group-hover:text-stone-300 sm:text-base">
                  <span className="sm:hidden">
                    {t(`projects.${project.id}.description.mobile`)}
                  </span>
                  <span className="hidden sm:inline">
                    {t(`projects.${project.id}.description.desktop`)}
                  </span>
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600 transition-all duration-300 group-hover:border-stone-300 group-hover:bg-white dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:group-hover:border-stone-700 dark:group-hover:bg-stone-800 sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
