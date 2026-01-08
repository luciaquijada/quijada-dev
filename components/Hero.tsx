"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const roles = ["Fullstack Developer", "Web & Mobile Apps", "Game Developer"];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-4 pt-20 sm:px-6 sm:pt-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2 text-base text-stone-500 dark:text-stone-400 sm:mb-4 sm:text-lg md:text-xl"
        >
          Hi, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:mb-6 sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Lucía Quijada
        </motion.h1>

        {/* Roles - Simplificado en móvil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-sm text-stone-500 dark:text-stone-400 sm:mb-8 sm:text-lg md:text-xl"
        >
          {/* Versión móvil: lista vertical compacta */}
          <div className="flex flex-col gap-1 sm:hidden">
            <span>Fullstack Developer</span>
            <span className="text-stone-400 dark:text-stone-500">Web & Mobile • Games</span>
          </div>
          {/* Versión desktop: horizontal con separadores */}
          <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            {roles.map((role, index) => (
              <span key={role} className="flex items-center gap-3">
                <span>{role}</span>
                {index < roles.length - 1 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Description - Sintetizado en móvil */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-sm leading-relaxed text-stone-500 dark:text-stone-400 sm:text-lg md:text-xl"
        >
          <span className="sm:hidden">
            2+ years building digital solutions focused on efficiency and great user experience.
          </span>
          <span className="hidden sm:inline">
            Specialized in building websites and mobile applications. I have 2 years of
            experience designing, developing, and optimizing digital solutions focused on efficiency, scalability, and
            user experience. I'm passionate about programming and problem-solving, and I aim to contribute to a
            high-performance team, driving innovative and impactful technology projects.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex gap-3 sm:mt-10 sm:gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 sm:px-8 sm:py-4 sm:text-base"
          >
            Projects
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition-all hover:border-stone-400 hover:shadow-lg hover:shadow-stone-900/5 dark:border-stone-800 dark:bg-black dark:text-stone-100 dark:hover:border-stone-700 sm:px-8 sm:py-4 sm:text-base"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-500">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 text-stone-400 dark:text-stone-500" />
        </motion.div>
      </motion.div>

      {/* Background Gradient - Reducido en móvil */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-stone-100 to-stone-200/50 blur-3xl dark:from-stone-900 dark:to-stone-900/50 sm:h-[500px] sm:w-[500px]" />
        <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-gradient-to-tr from-stone-200/30 to-transparent blur-3xl dark:from-stone-900/30 sm:h-[400px] sm:w-[400px]" />
      </div>
    </section>
  );
}
