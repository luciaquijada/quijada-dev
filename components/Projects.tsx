"use client";

import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const projects = [
  {
    id: "still",
    url: "https://www.stillspace.es/",
    tags: ["React", "TypeScript", "Supabase", "PWA"],
    icon: {
      light: "/assets/still-icon-light.png",
      dark: "/assets/still-icon-dark.png",
    },
  },
] as const;

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="bg-white px-4 py-12 dark:bg-black sm:px-6 sm:py-20 md:py-24 lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-12 md:mb-16"
        >
          <h2
            id="projects-heading"
            tabIndex={-1}
            className="mb-1.5 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("projects.title")}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 sm:max-w-2xl sm:text-lg">
            <span className="sm:hidden">{t("projects.subtitle.mobile")}</span>
            <span className="hidden sm:inline">{t("projects.subtitle.desktop")}</span>
          </p>
        </m.div>

        <div className="grid gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <m.article
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
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/0 opacity-0 transition-opacity duration-300 group-hover:from-yellow-400/[0.05] group-hover:via-transparent group-hover:to-transparent group-hover:opacity-100 group-focus-within:from-yellow-400/[0.05] group-focus-within:opacity-100"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-1 origin-bottom scale-y-0 rounded-r-full bg-yellow-400 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-within:scale-y-100"
              />

              <div className="relative flex flex-col gap-4 sm:gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                      <img
                        src={project.icon.light}
                        alt=""
                        width={48}
                        height={48}
                        decoding="async"
                        loading="lazy"
                        className="h-full w-full object-cover dark:hidden"
                      />
                      <img
                        src={project.icon.dark}
                        alt=""
                        width={48}
                        height={48}
                        decoding="async"
                        loading="lazy"
                        className="hidden h-full w-full object-cover dark:block"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900 transition-colors duration-300 group-hover:text-stone-950 dark:text-stone-100 dark:group-hover:text-white sm:text-2xl">
                        {t(`projects.${project.id}.name`)}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400 sm:text-sm">
                        {t(`projects.${project.id}.category`)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-stone-300 px-4 py-2 text-xs font-medium text-stone-800 transition-all duration-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white group-hover:border-stone-900 group-hover:bg-stone-900 group-hover:text-white dark:border-stone-600 dark:text-stone-200 dark:hover:border-stone-100 dark:hover:bg-stone-100 dark:hover:text-stone-900 dark:group-hover:border-stone-100 dark:group-hover:bg-stone-100 dark:group-hover:text-stone-900 sm:gap-2 sm:px-4 sm:text-sm"
                    aria-label={`${t(`projects.${project.id}.visit`)}: ${t(`projects.${project.id}.name`)} (${t("a11y.newWindow")})`}
                  >
                    {t(`projects.${project.id}.visit`)}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" aria-hidden="true" />
                  </a>
                </div>

                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base">
                  <span className="sm:hidden">
                    {t(`projects.${project.id}.description.mobile`)}
                  </span>
                  <span className="hidden sm:inline">
                    {t(`projects.${project.id}.description.desktop`)}
                  </span>
                </p>

                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 sm:text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
