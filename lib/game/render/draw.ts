// Render del Arena en canvas 2D. Función pura sobre el estado: no muta el World.
// Coordenadas en px lógicos (el contexto ya viene escalado por devicePixelRatio).
import { GAME } from "@/lib/game/config";
import type { World } from "@/lib/game/engine/world";

export type Palette = {
  bg: string; // fondo del tema (#fafaf9 / #000000)
  accent: string; // amarillo de marca (#facc15) — Chispa + estela
  dot: string; // color base del campo de fondo
};

export function renderWorld(ctx: CanvasRenderingContext2D, w: World, p: Palette) {
  ctx.clearRect(0, 0, w.width, w.height);
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, w.width, w.height);

  // Fondo parallax
  ctx.fillStyle = p.dot;
  for (const d of w.bg) {
    ctx.globalAlpha = d.alpha;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Estela (wake amarillo que se desvanece)
  ctx.fillStyle = p.accent;
  for (const t of w.trail) {
    const life = t.life < 0 ? 0 : t.life;
    const rad = GAME.sparkRadius * 0.85 * life;
    if (rad <= 0.2) continue;
    ctx.globalAlpha = life * 0.5;
    ctx.beginPath();
    ctx.arc(t.x, t.y, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Chispa con glow + squash/stretch en el Pulso
  const s = w.spark;
  const fn = GAME.pulseFlash > 0 ? s.flash / GAME.pulseFlash : 0; // 0..1
  const sx = 1 - 0.22 * fn;
  const sy = 1 + 0.32 * fn;
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.scale(sx, sy);
  ctx.shadowColor = p.accent;
  ctx.shadowBlur = 16 + 12 * fn;
  ctx.fillStyle = p.accent;
  ctx.beginPath();
  ctx.arc(0, 0, GAME.sparkRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
