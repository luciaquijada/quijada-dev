"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const roles = ["Frontend Developer", "UI/UX Enthusiast", "Creative Coder"];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pt-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-lg text-stone-500 dark:text-stone-400 md:text-xl"
        >
          Hola, soy
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Lucía Quijada
        </motion.h1>

        {/* Roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-wrap items-center gap-2 text-lg text-stone-500 dark:text-stone-400 sm:gap-3 sm:text-xl md:text-2xl"
        >
          {roles.map((role, index) => (
            <span key={role} className="flex items-center gap-2 sm:gap-3">
              <span>{role}</span>
              {index < roles.length - 1 && (
                <span className="h-1.5 w-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-lg leading-relaxed text-stone-500 dark:text-stone-400 md:text-xl"
        >
          Creo experiencias digitales que combinan diseño minimalista con
          funcionalidad impecable. Especializada en React, Next.js y todo lo que
          hace que la web sea hermosa.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 sm:px-8 sm:py-4 sm:text-base"
          >
            Ver proyectos
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition-all hover:border-stone-400 hover:shadow-lg hover:shadow-stone-900/5 dark:border-stone-800 dark:bg-black dark:text-stone-100 dark:hover:border-stone-700 sm:px-8 sm:py-4 sm:text-base"
          >
            Contactar
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
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

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-stone-100 to-stone-200/50 blur-3xl dark:from-stone-900 dark:to-stone-900/50" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-stone-200/30 to-transparent blur-3xl dark:from-stone-900/30" />
      </div>
    </section>
  );
}
