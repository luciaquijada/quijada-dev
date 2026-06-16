"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const skills = [
  "HTML",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "Astro",
  "React",
  "Notion",
  "CSS",
  "Git",
  "JavaScript",
  "Unity",
];

export default function About() {
  const { t } = useLanguage();

  const timeline = [
    {
      type: "work",
      title: t("timeline.frontend.title"),
      company: t("timeline.frontend.company"),
      period: t("timeline.frontend.period"),
      description: t("timeline.frontend.description"),
    },
    {
      type: "work",
      title: t("timeline.junior.title"),
      company: t("timeline.junior.company"),
      period: t("timeline.junior.period"),
      description: t("timeline.junior.description"),
    },
  ] as const;

  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl md:text-6xl">
            {t("about.title")}
          </h2>
          <div className="h-1 w-16 rounded-full bg-stone-900 dark:bg-stone-100" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              {t("about.p1")}
            </p>
            <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              {t("about.p2")}
            </p>
            <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              {t("about.p3")}
            </p>

            {/* Skills */}
            <div className="pt-4">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                {t("about.technologies")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="hover-badge cursor-default rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm dark:border-stone-800 dark:bg-black dark:text-stone-300 dark:hover:bg-stone-900"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              {t("about.timelineTitle")}
            </h3>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="hover-card group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-black"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/0 opacity-0 transition-opacity duration-300 group-hover:from-yellow-400/[0.04] group-hover:via-transparent group-hover:to-transparent group-hover:opacity-100"
                  />
                  <div
                    aria-hidden
                    className="absolute bottom-0 left-0 top-0 w-1 origin-bottom scale-y-0 rounded-r-full bg-yellow-400 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />

                  <div className="relative mb-2 flex items-center justify-between gap-4">
                    <h4 className="text-lg font-semibold text-stone-900 transition-colors duration-300 group-hover:text-stone-950 dark:text-stone-100">
                      {item.title}
                    </h4>
                    <p className="shrink-0 text-sm text-stone-400 transition-colors duration-300 group-hover:text-stone-500 dark:text-stone-500 dark:group-hover:text-stone-400">
                      {item.period}
                    </p>
                  </div>
                  <p className="relative mb-2 text-sm font-medium text-stone-500 dark:text-stone-400">
                    {item.company}
                  </p>
                  <p className="relative text-sm text-stone-500 transition-colors duration-300 group-hover:text-stone-600 dark:text-stone-400 dark:group-hover:text-stone-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
