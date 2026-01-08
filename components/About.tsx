"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const timeline = [
  {
    type: "work",
    title: "Frontend Developer",
    company: "Tech Company",
    period: "2023 - Presente",
    description: "Desarrollo de aplicaciones web con React y Next.js.",
  },
  {
    type: "education",
    title: "Grado en Ingeniería Informática",
    company: "Universidad Complutense",
    period: "2019 - 2023",
    description: "Especialización en desarrollo de software.",
  },
  {
    type: "work",
    title: "Junior Developer",
    company: "Startup",
    period: "2022 - 2023",
    description: "Desarrollo frontend y colaboración en proyectos ágiles.",
  },
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Git",
  "Figma",
];

export default function About() {
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
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
            Sobre mí
          </h2>
          <div className="h-1 w-16 rounded-full bg-stone-900" />
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
            <p className="text-lg leading-relaxed text-stone-600">
              Soy una desarrolladora frontend con pasión por crear interfaces
              elegantes y experiencias de usuario excepcionales. Me especializo
              en transformar diseños complejos en código limpio y eficiente.
            </p>
            <p className="text-lg leading-relaxed text-stone-600">
              Creo firmemente en el poder del diseño minimalista y la atención
              al detalle. Cada proyecto es una oportunidad para crear algo que
              no solo funcione perfectamente, sino que también sea un placer
              usar.
            </p>
            <p className="text-lg leading-relaxed text-stone-600">
              Cuando no estoy codificando, me encontrarás explorando nuevas
              tecnologías, contribuyendo a proyectos open source o disfrutando
              de un buen café mientras leo sobre diseño y tendencias web.
            </p>

            {/* Skills */}
            <div className="pt-4">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-400">
                Tecnologías
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
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm"
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
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-stone-400">
              Experiencia & Educación
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
                  className="group relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:border-stone-300 hover:shadow-md"
                >
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-900 group-hover:text-white">
                      {item.type === "work" ? (
                        <Briefcase className="h-5 w-5" />
                      ) : (
                        <GraduationCap className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-stone-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.period}
                    </div>
                  </div>

                  <h4 className="mb-1 text-lg font-semibold text-stone-900">
                    {item.title}
                  </h4>
                  <p className="mb-2 text-sm font-medium text-stone-500">
                    {item.company}
                  </p>
                  <p className="text-sm text-stone-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
