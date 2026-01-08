"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "E-commerce platform with shopping cart, payment gateway, and admin panel. Modern design and optimized user experience.",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    link: "#",
    github: "#",
    year: "2024",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description:
      "Interactive dashboard for real-time data visualization. Dynamic charts, advanced filters, and report exporting.",
    tags: ["React", "D3.js", "Tailwind", "Node.js"],
    link: "#",
    github: "#",
    year: "2024",
  },
  {
    id: 3,
    title: "Social App UI",
    description:
      "Complete interface redesign for a social application. Focus on accessibility, smooth animations, and performance optimization.",
    tags: ["React Native", "Reanimated", "Firebase"],
    link: "#",
    github: "#",
    year: "2023",
  },
  {
    id: 4,
    title: "Portfolio Template",
    description:
      "Minimalist and customizable portfolio template. Smooth animations, responsive design, and easy configuration.",
    tags: ["Next.js", "Framer Motion", "MDX"],
    link: "#",
    github: "#",
    year: "2023",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-white px-6 py-24 dark:bg-black md:py-32">
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
            Projects
          </h2>
          <p className="max-w-2xl text-lg text-stone-500 dark:text-stone-400">
            A selection of my most recent work. Each project is an opportunity
            to explore new technologies and solve problems creatively.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 p-6 transition-all hover:border-stone-300 hover:bg-stone-100/50 dark:border-stone-800 dark:bg-stone-950 dark:hover:border-stone-700 dark:hover:bg-stone-900 sm:p-8 md:p-10"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Year */}
                  <span className="inline-block text-sm font-medium text-stone-400 dark:text-stone-500">
                    {project.year}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl md:text-4xl">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-xl text-base text-stone-500 dark:text-stone-400 sm:text-lg">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-stone-600 ring-1 ring-stone-200 dark:bg-black dark:text-stone-400 dark:ring-stone-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                  <a
                    href={project.link}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-white transition-all hover:scale-105 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
                    aria-label={`View project ${project.title}`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <a
                    href={project.github}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-600 transition-all hover:border-stone-400 hover:text-stone-900 dark:border-stone-800 dark:bg-black dark:text-stone-400 dark:hover:border-stone-700 dark:hover:text-stone-100"
                    aria-label={`View code of ${project.title}`}
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-stone-100/0 via-stone-100/0 to-stone-200/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-black/0 dark:via-black/0 dark:to-stone-900/50" />
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition-all hover:border-stone-400 hover:shadow-lg hover:shadow-stone-900/5 dark:border-stone-800 dark:bg-black dark:text-stone-100 dark:hover:border-stone-700"
          >
            View all projects
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
