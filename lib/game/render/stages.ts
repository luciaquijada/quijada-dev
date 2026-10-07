// Niveles visuales del Arena: cada uno cambia el color de fondo y su animación.
// Hay una variante clara y otra oscura por nivel (siguen al tema del portfolio).
// Los objetos son estáticos: leer la paleta por frame no asigna memoria.
import type { BgAnim, Palette } from "@/lib/game/types";

const ACCENT = "#facc15";

type Variant = Omit<Palette, "accent" | "anim">;
type Stage = { anim: BgAnim; light: Palette; dark: Palette };

function stage(anim: BgAnim, light: Variant, dark: Variant): Stage {
  return {
    anim,
    light: { ...light, accent: ACCENT, anim },
    dark: { ...dark, accent: ACCENT, anim },
  };
}

const STAGES: Stage[] = [
  // 1 · Puntos (el fondo original)
  stage(
    "dots",
    { bg: "#fafaf9", dot: "#78716c", tint: "#78716c", danger: "#1c1917", dangerEdge: "#1c1917" },
    { bg: "#000000", dot: "#a8a29e", tint: "#a8a29e", danger: "#141414", dangerEdge: "#57534e" },
  ),
  // 2 · Índigo — estelas de velocidad
  stage(
    "streaks",
    { bg: "#eef2ff", dot: "#6366f1", tint: "#6366f1", danger: "#1e1b4b", dangerEdge: "#312e81" },
    { bg: "#0a0928", dot: "#818cf8", tint: "#818cf8", danger: "#14123f", dangerEdge: "#6366f1" },
  ),
  // 3 · Ámbar — brasas que suben
  stage(
    "embers",
    { bg: "#fff1e6", dot: "#f97316", tint: "#f97316", danger: "#431407", dangerEdge: "#7c2d12" },
    { bg: "#1a0903", dot: "#fb923c", tint: "#fb923c", danger: "#2c0f05", dangerEdge: "#ea580c" },
  ),
  // 4 · Esmeralda — rejilla en movimiento
  stage(
    "grid",
    { bg: "#e8faf1", dot: "#10b981", tint: "#10b981", danger: "#022c22", dangerEdge: "#064e3b" },
    { bg: "#02120c", dot: "#34d399", tint: "#34d399", danger: "#04251b", dangerEdge: "#10b981" },
  ),
  // 5 · Magenta — olas
  stage(
    "waves",
    { bg: "#fdf0ff", dot: "#d946ef", tint: "#d946ef", danger: "#3b0764", dangerEdge: "#581c87" },
    { bg: "#13041a", dot: "#e879f9", tint: "#e879f9", danger: "#250a33", dangerEdge: "#c026d3" },
  ),
];

export function getPalette(stageIndex: number, dark: boolean): Palette {
  const s = STAGES[stageIndex % STAGES.length];
  return dark ? s.dark : s.light;
}
