import type { Metadata } from "next";
import AccessibilityStatement from "@/components/AccessibilityStatement";

export const metadata: Metadata = {
  title: "Declaración de accesibilidad | Accessibility statement | Lucía Quijada",
  description:
    "Compromiso de accesibilidad WCAG 2.1 nivel AA del portafolio de Lucía Quijada, limitaciones conocidas y contacto. Accessibility statement: WCAG 2.1 AA conformance, known limitations, and contact.",
};

export default function AccessibilityStatementPage() {
  return <AccessibilityStatement />;
}
