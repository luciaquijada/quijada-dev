"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "es" | "en";

const es = {
  // Navbar
  "nav.home": "Inicio",
  "nav.about": "Sobre mí",
  "nav.projects": "Proyectos",
  "nav.contact": "Contacto",
  "nav.cta": "Hablemos",

  // Hero
  "hero.greeting": "Hola, soy",
  "hero.roles.fullstack": "Desarrolladora Fullstack",
  "hero.roles.webMobile": "Apps Web y Móvil",
  "hero.roles.game": "Desarrolladora de Juegos",
  "hero.roles.mobileSecondary": "Web y móvil • Juegos",
  "hero.description.mobile": "Más de 2 años creando soluciones digitales centradas en la eficiencia y una gran experiencia de usuario.",
  "hero.description.desktop":
    "Especializada en crear sitios web y aplicaciones móviles. Tengo 2 años de experiencia diseñando, desarrollando y optimizando soluciones digitales enfocadas en eficiencia, escalabilidad y experiencia de usuario. Me apasiona programar y resolver problemas, y busco aportar a un equipo de alto rendimiento, impulsando proyectos tecnológicos innovadores y con impacto.",
  "hero.cta.projects": "Proyectos",
  "hero.cta.contact": "Contacto",
  "hero.scroll": "Scroll",

  // About
  "about.title": "Sobre mí",
  "about.p1":
    "Hola, soy Lucía Quijada, desarrolladora frontend y de aplicaciones web/móviles. Actualmente aplico mi visión en Bisite Research Group, explorando cómo la tecnología puede mejorar la forma en que aprendemos y nos comunicamos. Siempre me ha fascinado cómo una sola línea de código puede cambiar por completo la interacción, transformando ideas en experiencias que funcionan bien y se ven aún mejor.",
  "about.p2":
    "Lo que define mi perfil es la mezcla de habilidades técnicas y humanidades: mientras desarrollo, también estudio Psicología. Busco un equilibrio entre mi lado organizado —estructurar trabajo y lógica— y el lado creativo que necesita espacio para la improvisación visual. Estoy convencida de que entender a las personas es tan importante como entender un buen sistema.",
  "about.p3":
    "Soy naturalmente curiosa y me apasiona combinar creatividad y tecnología para construir productos con sentido que conecten de verdad con las personas.",
  "about.technologies": "Tecnologías",
  "about.timelineTitle": "Experiencia y formación",

  // Timeline items
  "timeline.frontend.title": "Desarrolladora Frontend",
  "timeline.frontend.company": "Bisite Research Group",
  "timeline.frontend.period": "2024 - Actualidad",
  "timeline.frontend.description":
    "Desarrollo de interfaces web dinámicas, responsive y optimizadas con Vue.js, TypeScript y Bootstrap. Integración de APIs y aprendizaje continuo en IA y dataspaces.",
  "timeline.psychology.title": "Grado en Psicología",
  "timeline.psychology.company": "Universidad de La Rioja",
  "timeline.psychology.period": "2025 - Actualidad",
  "timeline.psychology.description": "Estudios centrados en comprender el comportamiento humano.",
  "timeline.junior.title": "Desarrolladora Web Junior",
  "timeline.junior.company": "FGUSAL",
  "timeline.junior.period": "2023 - 2023",
  "timeline.junior.description":
    "Desarrollo y optimización del diseño de páginas web. Implementación de soluciones con Laravel y Bootstrap, garantizando escalabilidad y consistencia visual.",

  // Projects
  "projects.title": "Proyectos",
  "projects.subtitle.mobile": "Mi trabajo reciente.",
  "projects.subtitle.desktop":
    "Una selección de mi trabajo más reciente. Cada proyecto es una oportunidad para explorar nuevas tecnologías y resolver problemas de forma creativa.",
  "projects.inBuild.title": "En construcción",
  "projects.inBuild.subtitle.mobile": "Próximamente",
  "projects.inBuild.subtitle.desktop": "Estoy trabajando en proyectos muy interesantes. ¡Vuelve pronto!",
  "projects.inBuild.badge": "En progreso",

  // Footer
  "footer.title.line1": "¿Tienes un proyecto",
  "footer.title.line2": "en mente?",
  "footer.subtitle":
    "Siempre estoy abierta a nuevas oportunidades y colaboraciones interesantes. Escríbeme sin problema.",
  "footer.cta": "Hablemos",
  "footer.rights": "Todos los derechos reservados.",
  "footer.location": "Salamanca, España",
} as const;

type TranslationKey = keyof typeof es;

const en: Record<TranslationKey, string> = {
  // Navbar
  "nav.home": "Home",
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.contact": "Contact",
  "nav.cta": "Let's talk",

  // Hero
  "hero.greeting": "Hi, I'm",
  "hero.roles.fullstack": "Fullstack Developer",
  "hero.roles.webMobile": "Web & Mobile Apps",
  "hero.roles.game": "Game Developer",
  "hero.roles.mobileSecondary": "Web & Mobile • Games",
  "hero.description.mobile": "2+ years building digital solutions focused on efficiency and great user experience.",
  "hero.description.desktop":
    "Specialized in building websites and mobile applications. I have 2 years of experience designing, developing, and optimizing digital solutions focused on efficiency, scalability, and user experience. I'm passionate about programming and problem-solving, and I aim to contribute to a high-performance team, driving innovative and impactful technology projects.",
  "hero.cta.projects": "Projects",
  "hero.cta.contact": "Contact",
  "hero.scroll": "Scroll",

  // About
  "about.title": "About me",
  "about.p1":
    "Hi, I'm Lucía Quijada, a frontend and web/mobile application developer. I currently apply my vision at the Bisite Research Group, exploring how technology can improve the way we learn and communicate. I've always been fascinated by how a single line of code can completely change the user interaction, transforming ideas into experiences that work well and look even better.",
  "about.p2":
    "What defines my profile is the blend of technical skills and the humanities: while developing, I'm also studying Psychology. I strive for a balance between the organized side of me—structuring work and logic—and the creative side that needs space for visual improvisation. I'm convinced that understanding people is just as important as understanding a good system.",
  "about.p3":
    "I'm naturally curious and passionate about combining creativity and technology to build meaningful products that truly connect with people.",
  "about.technologies": "Technologies",
  "about.timelineTitle": "Experience & Education",

  // Timeline items
  "timeline.frontend.title": "Frontend Developer",
  "timeline.frontend.company": "Bisite Research Group",
  "timeline.frontend.period": "2024 - Present",
  "timeline.frontend.description":
    "Development of dynamic, responsive, and optimized web interfaces with Vue.js, TypeScript, and Bootstrap. API integration and continuous learning in AI and dataspaces.",
  "timeline.psychology.title": "Psychology Degree",
  "timeline.psychology.company": "University of La Rioja",
  "timeline.psychology.period": "2025 - Present",
  "timeline.psychology.description": "Studies focused on understanding human behavior.",
  "timeline.junior.title": "Junior Web Developer",
  "timeline.junior.company": "FGUSAL",
  "timeline.junior.period": "2023 - 2023",
  "timeline.junior.description":
    "Development and optimization of web page design. Implementation of solutions with Laravel and Bootstrap, ensuring scalability and visual consistency.",

  // Projects
  "projects.title": "Projects",
  "projects.subtitle.mobile": "My recent work.",
  "projects.subtitle.desktop":
    "A selection of my most recent work. Each project is an opportunity to explore new technologies and solve problems creatively.",
  "projects.inBuild.title": "In Build",
  "projects.inBuild.subtitle.mobile": "Coming soon",
  "projects.inBuild.subtitle.desktop": "I'm currently working on some exciting projects. Check back soon!",
  "projects.inBuild.badge": "Work in progress",

  // Footer
  "footer.title.line1": "Have a project",
  "footer.title.line2": "in mind?",
  "footer.subtitle": "I'm always open to new opportunities and interesting collaborations. Feel free to reach out.",
  "footer.cta": "Let's talk",
  "footer.rights": "All rights reserved.",
  "footer.location": "Salamanca, Spain",
};

const translations = { es, en } as const;

type LanguageContextValue = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") setLanguage(stored);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === "es" ? "en" : "es")),
      t: (key) => translations[language][key],
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

