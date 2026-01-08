"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

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

        {/* In Build State */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-20 dark:border-stone-700 dark:bg-stone-950"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-800">
            <Hammer className="h-8 w-8 text-stone-500 dark:text-stone-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-stone-900 dark:text-stone-100">
            In Build
          </h3>
          <p className="max-w-md text-center text-stone-500 dark:text-stone-400">
            I'm currently working on some exciting projects. Check back soon!
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Coming soon
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
