"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, MapPin, Github, Linkedin } from "lucide-react";

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/luciaquijada/", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/luciaquijada", icon: Github },
  { name: "Email", href: "mailto:lquijadagordo17@gmail.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl md:text-6xl lg:text-7xl">
            ¿Tienes un proyecto
            <br />
            en mente?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-stone-500 dark:text-stone-400">
            Siempre estoy abierta a nuevas oportunidades y colaboraciones
            interesantes. No dudes en contactarme.
          </p>
          <motion.a
            href="mailto:hola@ejemplo.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-lg font-medium text-white transition-all hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-900/20 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Hablemos
            <ArrowUpRight className="h-5 w-5" />
          </motion.a>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-between gap-8 border-t border-stone-200 pt-12 dark:border-stone-800 md:flex-row"
        >
          {/* Left */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              © 2026 Lucía Quijada. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-1 text-sm text-stone-400 dark:text-stone-500">
              <MapPin className="h-3.5 w-3.5" />
              Salamanca, España
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-all hover:border-stone-300 hover:text-stone-900 dark:border-stone-800 dark:bg-black dark:text-stone-400 dark:hover:border-stone-700 dark:hover:text-stone-100"
                aria-label={link.name}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
