"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
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
      type: "education",
      title: t("timeline.psychology.title"),
      company: t("timeline.psychology.company"),
      period: t("timeline.psychology.period"),
      description: t("timeline.psychology.description"),
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
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm dark:border-stone-800 dark:bg-black dark:text-stone-300"
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
                  className="group relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:border-stone-300 hover:shadow-md dark:border-stone-800 dark:bg-black dark:hover:border-stone-700"
                >
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-900 group-hover:text-white dark:bg-stone-900 dark:text-stone-400 dark:group-hover:bg-stone-100 dark:group-hover:text-stone-900">
                      {item.type === "work" ? (
                        <Briefcase className="h-5 w-5" />
                      ) : (
                        <GraduationCap className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-stone-400 dark:text-stone-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.period}
                    </div>
                  </div>

                  <h4 className="mb-1 text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {item.title}
                  </h4>
                  <p className="mb-2 text-sm font-medium text-stone-500 dark:text-stone-400">
                    {item.company}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
