"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

const HASH_TO_HEADING: Record<string, string> = {
  top: "hero-heading",
  about: "about-heading",
  projects: "projects-heading",
  contact: "contact-heading",
};

function headingIdFromHref(href: string) {
  const hash = href.split("#")[1] ?? "";
  return HASH_TO_HEADING[hash] ?? null;
}

function focusHeading(id: string | null) {
  if (!id) return;
  document.getElementById(id)?.focus({ preventScroll: true });
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);
  const pendingFocusIdRef = useRef<string | null>(null);

  const navItems = [
    { name: t("nav.home"), href: "/#top" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.projects"), href: "/#projects" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  const closeMenuToHeading = (href: string) => {
    restoreFocusRef.current = false;
    pendingFocusIdRef.current = headingIdFromHref(href);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      focusHeading(HASH_TO_HEADING[hash] ?? null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener("change", closeOnDesktop);
    return () => mq.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const getFocusable = () => {
      const header = menuButtonRef.current?.closest("header");
      const inHeader = Array.from(
        header?.querySelectorAll<HTMLElement>("a[href], button") ?? []
      ).filter((el) => el.getClientRects().length > 0);
      const inMenu = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []
      );
      const seen = new Set<HTMLElement>();
      return [...inHeader, ...inMenu].filter((el) => {
        if (seen.has(el)) return false;
        seen.add(el);
        return true;
      });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocusRef.current = true;
        pendingFocusIdRef.current = null;
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    const skip = document.querySelector<HTMLElement>(".skip-link");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    skip?.setAttribute("inert", "");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    const firstLink = menuRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      skip?.removeAttribute("inert");

      const pendingId = pendingFocusIdRef.current;
      pendingFocusIdRef.current = null;

      if (pendingId) {
        requestAnimationFrame(() => focusHeading(pendingId));
      } else if (restoreFocusRef.current) {
        menuButtonRef.current?.focus();
      }
      restoreFocusRef.current = true;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-6"
      >
        <nav
          aria-label={t("nav.ariaLabel")}
          className={`flex items-center gap-1 rounded-full border px-2 py-2 transition-all duration-500 ${
            isScrolled
              ? "border-stone-200 bg-white/80 shadow-lg shadow-stone-900/5 backdrop-blur-md dark:border-stone-800 dark:bg-black/80 dark:shadow-black/20"
              : "border-stone-200/50 bg-white/50 backdrop-blur-sm dark:border-stone-800/50 dark:bg-black/50"
          }`}
        >
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => (
              <m.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href={item.href}
                  className="relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
                >
                  {item.name}
                </a>
              </m.li>
            ))}
          </ul>

          <ThemeToggle />
          <LanguageToggle />

          <m.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            href="/#contact"
            className="hidden min-h-11 items-center whitespace-nowrap rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 md:inline-flex"
          >
            {t("nav.cta")}
          </m.a>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100 md:hidden"
            aria-label={isMobileMenuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </nav>
      </m.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-label={t("nav.menuLabel")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-stone-50/95 backdrop-blur-sm dark:bg-black/95 md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              <ul className="flex flex-col items-center gap-8">
                {navItems.map((item, index) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => closeMenuToHeading(item.href)}
                      className="inline-flex min-h-11 items-center text-2xl font-medium text-stone-900 transition-colors hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300"
                    >
                      {item.name}
                    </a>
                  </m.li>
                ))}
              </ul>
              <m.a
                href="/#contact"
                onClick={() => closeMenuToHeading("/#contact")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="mt-4 inline-flex min-h-11 items-center rounded-full bg-stone-900 px-8 py-3 text-lg font-medium text-white transition-all hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                {t("nav.cta")}
              </m.a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
