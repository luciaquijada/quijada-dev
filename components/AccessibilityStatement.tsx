"use client";

import { useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage, type TranslationKey } from "@/components/LanguageProvider";

const MEASURE_KEYS = [
  "a11y.measure.semantic",
  "a11y.measure.skip",
  "a11y.measure.keyboard",
  "a11y.measure.menu",
  "a11y.measure.contrast",
  "a11y.measure.lang",
  "a11y.measure.motion",
  "a11y.measure.external",
] as const satisfies readonly TranslationKey[];

const LIMITATION_KEYS = [
  "a11y.limitation.thirdParty",
  "a11y.limitation.cursor",
] as const satisfies readonly TranslationKey[];

export default function AccessibilityStatement() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("a11y.docTitle");
  }, [t]);

  return (
    <div className="min-h-screen px-6 pb-24 pt-8">
      <header className="mx-auto mb-12 flex max-w-3xl items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm font-medium text-stone-800 underline decoration-stone-400 underline-offset-4 hover:text-stone-950 hover:decoration-stone-800 dark:text-stone-200 dark:decoration-stone-500 dark:hover:text-white"
        >
          {t("a11y.back")}
        </Link>
        <div className="flex items-center">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl">
          {t("a11y.title")}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-stone-700 dark:text-stone-300">
          {t("a11y.intro")}
        </p>

        <section className="mb-10" aria-labelledby="conformance-heading">
          <h2 id="conformance-heading" className="mb-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">
            {t("a11y.conformanceTitle")}
          </h2>
          <p className="leading-relaxed text-stone-700 dark:text-stone-300">{t("a11y.conformanceBody")}</p>
        </section>

        <section className="mb-10" aria-labelledby="measures-heading">
          <h2 id="measures-heading" className="mb-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">
            {t("a11y.measuresTitle")}
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-stone-700 dark:text-stone-300">
            {MEASURE_KEYS.map((key) => (
              <li key={key} className="leading-relaxed">
                {t(key)}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="limitations-heading">
          <h2 id="limitations-heading" className="mb-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">
            {t("a11y.limitationsTitle")}
          </h2>
          <p className="mb-3 leading-relaxed text-stone-700 dark:text-stone-300">{t("a11y.limitationsIntro")}</p>
          <ul className="list-disc space-y-2 pl-5 text-stone-700 dark:text-stone-300">
            {LIMITATION_KEYS.map((key) => (
              <li key={key} className="leading-relaxed">
                {t(key)}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="compat-heading">
          <h2 id="compat-heading" className="mb-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">
            {t("a11y.compatTitle")}
          </h2>
          <p className="leading-relaxed text-stone-700 dark:text-stone-300">{t("a11y.compatBody")}</p>
        </section>

        <section className="mb-10" aria-labelledby="a11y-contact-heading">
          <h2 id="a11y-contact-heading" className="mb-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">
            {t("a11y.contactTitle")}
          </h2>
          <p className="mb-4 leading-relaxed text-stone-700 dark:text-stone-300">{t("a11y.contactBody")}</p>
          <a
            href="mailto:lquijadagordo17@gmail.com?subject=Accesibilidad%20/%20Accessibility"
            className="inline-flex min-h-11 items-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            {t("a11y.contactCta")}
          </a>
        </section>

        <section aria-labelledby="review-heading">
          <h2 id="review-heading" className="mb-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">
            {t("a11y.reviewTitle")}
          </h2>
          <p className="leading-relaxed text-stone-700 dark:text-stone-300">{t("a11y.reviewBody")}</p>
        </section>
      </main>
    </div>
  );
}
