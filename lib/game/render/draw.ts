// Render del Arena en canvas 2D. Función pura sobre el estado: no muta el World.
// Coordenadas en px lógicos (el contexto ya viene escalado por devicePixelRatio).
import { GAME } from "@/lib/game/config";
import type { Palette, VoidShard, World } from "@/lib/game/types";

function drawShard(ctx: CanvasRenderingContext2D, v: VoidShard, p: Palette) {
  const { x, y, h } = v;
  const w = v.w;
  // Hexágono vertical: forma angular que contrasta con los círculos (premio).
  ctx.beginPath();
  ctx.moveTo(x, y + h * 0.22);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h * 0.22);
  ctx.lineTo(x + w, y + h * 0.78);
  ctx.lineTo(x + w / 2, y + h);
  ctx.lineTo(x, y + h * 0.78);
  ctx.closePath();
  ctx.fillStyle = p.danger;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = p.dangerEdge;
  ctx.stroke();
  // Destello de roce (near-miss): borde amarillo que se desvanece
  if (v.flash > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, v.flash);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = p.accent;
    ctx.stroke();
    ctx.restore();
  }
}

export function renderWorld(ctx: CanvasRenderingContext2D, w: World, p: Palette) {
  // Fondo a pantalla completa SIN shake (cubre los bordes del desplazamiento)
  ctx.clearRect(0, 0, w.width, w.height);
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, w.width, w.height);

  // Screen shake: desplaza toda la escena
  let ox = 0;
  let oy = 0;
  if (w.shake > 0.05) {
    ox = (Math.random() * 2 - 1) * w.shake;
    oy = (Math.random() * 2 - 1) * w.shake;
  }
  ctx.save();
  ctx.translate(ox, oy);

  // Campo de fondo parallax
  ctx.fillStyle = p.dot;
  for (const d of w.bg) {
    ctx.globalAlpha = d.alpha;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Vacíos
  for (const v of w.voids) drawShard(ctx, v, p);

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

  // Fotones (con leve glow)
  ctx.fillStyle = p.accent;
  ctx.shadowColor = p.accent;
  ctx.shadowBlur = 6;
  for (const ph of w.photons) {
    ctx.beginPath();
    ctx.arc(ph.x, ph.y, GAME.photonRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  // Pops de recogida (anillos que se expanden y desvanecen)
  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 2;
  for (const pop of w.pops) {
    const k = 1 - Math.max(0, pop.life); // 0 -> 1
    const rad = GAME.photonRadius + (GAME.popMaxRadius - GAME.photonRadius) * k;
    ctx.globalAlpha = Math.max(0, pop.life);
    ctx.beginPath();
    ctx.arc(pop.x, pop.y, rad, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Chispa con glow + squash/stretch en el Pulso (parpadeo si es invulnerable)
  const s = w.spark;
  const fn = GAME.pulseFlash > 0 ? s.flash / GAME.pulseFlash : 0; // 0..1
  const sx = 1 - 0.22 * fn;
  const sy = 1 + 0.32 * fn;
  ctx.save();
  ctx.globalAlpha = w.invuln > 0 ? 0.45 : 1;
  ctx.translate(s.x, s.y);
  ctx.scale(sx, sy);
  ctx.shadowColor = p.accent;
  ctx.shadowBlur = 16 + 12 * fn;
  ctx.fillStyle = p.accent;
  ctx.beginPath();
  ctx.arc(0, 0, GAME.sparkRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}
