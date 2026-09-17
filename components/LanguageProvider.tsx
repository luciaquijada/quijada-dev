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
  "nav.ariaLabel": "Principal",
  "nav.menuOpen": "Abrir menú",
  "nav.menuClose": "Cerrar menú",
  "nav.menuLabel": "Menú de navegación",
  "theme.switch": "Modo oscuro",
  "a11y.skip": "Saltar al contenido principal",
  "a11y.link": "Accesibilidad",
  "a11y.newWindow": "se abre en una pestaña nueva",
  "a11y.docTitle": "Declaración de accesibilidad | Lucía Quijada",
  "a11y.back": "Volver al inicio",
  "a11y.title": "Declaración de accesibilidad",
  "a11y.intro":
    "Lucía Quijada se compromete a que este portafolio sea accesible para el mayor número de personas posible, incluidas las que usan teclado, lectores de pantalla, ampliación de texto o modos de alto contraste.",
  "a11y.conformanceTitle": "Conformidad WCAG 2.1 AA",
  "a11y.conformanceBody":
    "Este sitio aspira a cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA. La última revisión de accesibilidad se realizó el 17 de septiembre de 2026.",
  "a11y.measuresTitle": "Medidas adoptadas",
  "a11y.measure.semantic":
    "Estructura semántica con landmarks (cabecera, navegación, contenido principal y pie), encabezados jerárquicos y listas.",
  "a11y.measure.skip": "Enlace para saltar al contenido principal y orden de foco coherente.",
  "a11y.measure.keyboard": "Toda la funcionalidad está disponible con teclado y el foco es visible.",
  "a11y.measure.menu":
    "El menú móvil se comporta como un diálogo: Escape lo cierra, el foco queda atrapado entre la barra y el menú, y se restaura al botón.",
  "a11y.measure.contrast":
    "Contraste de texto de al menos 4,5:1 y de componentes de interfaz de al menos 3:1.",
  "a11y.measure.lang":
    "Idioma de la página indicado en el atributo lang y actualizado al cambiar entre español e inglés.",
  "a11y.measure.motion":
    "Las animaciones respetan prefers-reduced-motion y el cursor personalizado se desactiva en ese caso, en punteros táctiles y en modo de contraste forzado.",
  "a11y.measure.external": "Los enlaces externos indican que se abren en una pestaña nueva.",
  "a11y.limitationsTitle": "Limitaciones conocidas",
  "a11y.limitationsIntro": "Pueden persistir las siguientes limitaciones:",
  "a11y.limitation.thirdParty":
    "Los sitios de terceros enlazados (por ejemplo Still, LinkedIn o GitHub) tienen su propia accesibilidad, fuera del control de este portafolio.",
  "a11y.limitation.cursor":
    "El cursor personalizado es un refuerzo visual opcional para punteros precisos; el cursor nativo permanece disponible cuando el movimiento reducido, el contraste forzado o un puntero grueso están activos.",
  "a11y.compatTitle": "Compatibilidad",
  "a11y.compatBody":
    "El sitio está pensado para la última versión estable de Chrome, Firefox, Safari y Edge, junto con VoiceOver, NVDA o JAWS. Si encuentras un obstáculo en otro entorno, avísame.",
  "a11y.contactTitle": "Contacto sobre accesibilidad",
  "a11y.contactBody":
    "Si detectas una barrera, un error o necesitas el contenido en otro formato, escríbeme. Responderé lo antes posible.",
  "a11y.contactCta": "Enviar un correo sobre accesibilidad",
  "a11y.reviewTitle": "Fecha de revisión",
  "a11y.reviewBody":
    "Esta declaración se revisó el 17 de septiembre de 2026 y se actualizará cuando cambie el contenido o se identifiquen nuevas incidencias.",

  // Hero
  "hero.greeting": "Hola, soy",
  "hero.roles.fullstack": "Desarrolladora Frontend",
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
  "about.timelineTitle": "Experiencia",

  // Timeline items
  "timeline.frontend.title": "Desarrolladora Frontend",
  "timeline.frontend.company": "Bisite Research Group",
  "timeline.frontend.period": "2024 - Actualidad",
  "timeline.frontend.description":
    "Desarrollo de interfaces web dinámicas, responsive y optimizadas con Vue.js, TypeScript y Bootstrap. Integración de APIs y aprendizaje continuo en IA y dataspaces.",
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
  "projects.still.name": "Still",
  "projects.still.category": "Productividad personal",
  "projects.still.description.mobile":
    "App web que unifica tareas, ideas, objetivos, hábitos, notas, estudio y finanzas en un solo espacio.",
  "projects.still.description.desktop":
    "Aplicación web de organización personal que reúne en un solo lugar tareas, proyectos, ideas, objetivos, hábitos, notas, calendario, estudio y finanzas. Incluye inbox para captura rápida, vistas de «Tu día» y objetivos que conectan tareas, proyectos y hábitos. Desarrollada como PWA bilingüe (ES/EN).",
  "projects.still.visit": "Ver proyecto",

  // Footer
  "footer.title.line1": "¿Tienes un proyecto",
  "footer.title.line2": "en mente?",
  "footer.subtitle":
    "Siempre estoy abierta a nuevas oportunidades y colaboraciones interesantes. Escríbeme sin problema.",
  "footer.cta": "Hablemos",
  "footer.rights": "Todos los derechos reservados.",
  "footer.location": "Extremadura, España",
} as const;

export type TranslationKey = keyof typeof es;

const en: Record<TranslationKey, string> = {
  // Navbar
  "nav.home": "Home",
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.contact": "Contact",
  "nav.cta": "Let's talk",
  "nav.ariaLabel": "Main",
  "nav.menuOpen": "Open menu",
  "nav.menuClose": "Close menu",
  "nav.menuLabel": "Navigation menu",
  "theme.switch": "Dark mode",
  "a11y.skip": "Skip to main content",
  "a11y.link": "Accessibility",
  "a11y.newWindow": "opens in a new tab",
  "a11y.docTitle": "Accessibility statement | Lucía Quijada",
  "a11y.back": "Back to home",
  "a11y.title": "Accessibility statement",
  "a11y.intro":
    "Lucía Quijada is committed to making this portfolio usable by as many people as possible, including people who use a keyboard, a screen reader, text zoom, or high-contrast modes.",
  "a11y.conformanceTitle": "WCAG 2.1 AA conformance",
  "a11y.conformanceBody":
    "This site is designed to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. The latest accessibility review was completed on 17 September 2026.",
  "a11y.measuresTitle": "Accessibility measures",
  "a11y.measure.semantic":
    "Semantic structure with landmarks (banner, navigation, main, contentinfo), heading hierarchy, and lists.",
  "a11y.measure.skip": "A skip link to the main content and a logical focus order.",
  "a11y.measure.keyboard": "All functionality is available from the keyboard, with a visible focus indicator.",
  "a11y.measure.menu":
    "The mobile menu behaves as a dialog: Escape closes it, focus is trapped between the bar and the menu, and focus returns to the toggle.",
  "a11y.measure.contrast":
    "Text contrast of at least 4.5:1 and user-interface contrast of at least 3:1.",
  "a11y.measure.lang":
    "The page language is set on the lang attribute and updates when switching between Spanish and English.",
  "a11y.measure.motion":
    "Animations respect prefers-reduced-motion. The custom cursor is disabled in that case, on touch pointers, and in forced-colors mode.",
  "a11y.measure.external": "External links announce that they open in a new tab.",
  "a11y.limitationsTitle": "Known limitations",
  "a11y.limitationsIntro": "The following limitations may remain:",
  "a11y.limitation.thirdParty":
    "Third-party sites linked from this portfolio (such as Still, LinkedIn, or GitHub) have their own accessibility, which is outside this site’s control.",
  "a11y.limitation.cursor":
    "The custom cursor is an optional visual enhancement for fine pointers. The native cursor remains available when reduced motion, forced colors, or a coarse pointer is active.",
  "a11y.compatTitle": "Compatibility",
  "a11y.compatBody":
    "The site is intended to work with the latest stable versions of Chrome, Firefox, Safari, and Edge, together with VoiceOver, NVDA, or JAWS. If you hit a barrier in another environment, please let me know.",
  "a11y.contactTitle": "Accessibility contact",
  "a11y.contactBody":
    "If you find a barrier, a bug, or need the content in another format, email me. I will reply as soon as I can.",
  "a11y.contactCta": "Email about accessibility",
  "a11y.reviewTitle": "Review date",
  "a11y.reviewBody":
    "This statement was reviewed on 17 September 2026 and will be updated when the content changes or new issues are identified.",

  // Hero
  "hero.greeting": "Hi, I'm",
  "hero.roles.fullstack": "Frontend Developer",
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
  "about.timelineTitle": "Experience",

  // Timeline items
  "timeline.frontend.title": "Frontend Developer",
  "timeline.frontend.company": "Bisite Research Group",
  "timeline.frontend.period": "2024 - Present",
  "timeline.frontend.description":
    "Development of dynamic, responsive, and optimized web interfaces with Vue.js, TypeScript, and Bootstrap. API integration and continuous learning in AI and dataspaces.",
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
  "projects.still.name": "Still",
  "projects.still.category": "Personal productivity",
  "projects.still.description.mobile":
    "A web app that unifies tasks, ideas, goals, habits, notes, study, and finances in one place.",
  "projects.still.description.desktop":
    "A personal organization web app that brings together tasks, projects, ideas, goals, habits, notes, calendar, study, and finances in one place. Features a quick-capture inbox, “Your Day” views, and goals that connect tasks, projects, and habits. Built as a bilingual (ES/EN) PWA.",
  "projects.still.visit": "View project",

  // Footer
  "footer.title.line1": "Have a project",
  "footer.title.line2": "in mind?",
  "footer.subtitle": "I'm always open to new opportunities and interesting collaborations. Feel free to reach out.",
  "footer.cta": "Let's talk",
  "footer.rights": "All rights reserved.",
  "footer.location": "Extremadura, Spain",
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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") setLanguage(stored);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language;
  }, [hydrated, language]);

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

