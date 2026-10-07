// Render del Arena en canvas 2D. Función pura sobre el estado: no muta el World.
// Coordenadas en px lógicos (el contexto ya viene escalado por devicePixelRatio).
import { GAME } from "@/lib/game/config";
import type { Palette, VoidShard, World } from "@/lib/game/types";
import { drawBackground } from "@/lib/game/render/background";
import { STAR_COLORS, drawGlow, glowSprite } from "@/lib/game/render/sprites";
import { getPalette } from "@/lib/game/render/stages";

const TAU = Math.PI * 2;
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

function hexPath(ctx: CanvasRenderingContext2D, v: VoidShard) {
  const { x, y, h, w } = v;
  // Hexágono vertical: forma angular que contrasta con los círculos (premio).
  ctx.beginPath();
  ctx.moveTo(x, y + h * 0.22);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h * 0.22);
  ctx.lineTo(x + w, y + h * 0.78);
  ctx.lineTo(x + w / 2, y + h);
  ctx.lineTo(x, y + h * 0.78);
  ctx.closePath();
}

function capsulePath(ctx: CanvasRenderingContext2D, v: VoidShard) {
  const { x, y, w, h } = v;
  const r = w / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 0);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + r, y + h - r, r, 0, Math.PI);
  ctx.closePath();
}

function starPath(ctx: CanvasRenderingContext2D, x: number, y: number, outer: number, rot: number) {
  const inner = outer * 0.45;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? outer : inner;
    const a = rot + (i * Math.PI) / 5 - Math.PI / 2;
    const px = x + Math.cos(a) * rad;
    const py = y + Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function drawVoid(ctx: CanvasRenderingContext2D, v: VoidShard, p: Palette, time: number) {
  if (v.kind === "drifter") {
    // Raíl tenue que anticipa el recorrido de la cápsula
    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = p.tint;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(v.x + v.w / 2, v.baseY - v.amp);
    ctx.lineTo(v.x + v.w / 2, v.baseY + v.h + v.amp);
    ctx.stroke();
    ctx.globalAlpha = 1;
    capsulePath(ctx, v);
  } else {
    hexPath(ctx, v);
  }

  ctx.fillStyle = p.danger;
  ctx.fill();
  ctx.lineWidth = v.kind === "shard" ? 1.5 : 2;
  // Las variantes avanzadas llevan el borde del color del nivel (se leen como "especiales")
  ctx.strokeStyle = v.kind === "shard" ? p.dangerEdge : p.tint;
  ctx.stroke();

  // Núcleo pulsante en las cápsulas
  if (v.kind === "drifter") {
    ctx.globalAlpha = 0.55 + 0.35 * Math.sin(time * 6 + v.phase);
    ctx.fillStyle = p.tint;
    ctx.beginPath();
    ctx.arc(v.x + v.w / 2, v.y + v.h / 2, 3, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Destello de roce (near-miss): borde amarillo que se desvanece
  if (v.flash > 0) {
    ctx.globalAlpha = Math.min(1, v.flash);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = p.accent;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

export function renderWorld(ctx: CanvasRenderingContext2D, w: World, dark: boolean) {
  const p = getPalette(w.stage, dark);
  const s = w.spark;

  // Fondo a pantalla completa SIN shake (cubre los bordes del desplazamiento).
  // Al cambiar de nivel, el nuevo color/animación se expande en círculo desde la Chispa.
  if (w.stageT < 1) {
    const prev = getPalette(w.prevStage, dark);
    ctx.fillStyle = prev.bg;
    ctx.fillRect(0, 0, w.width, w.height);
    drawBackground(ctx, w, prev);

    const radius = easeOut(w.stageT) * Math.hypot(w.width, w.height);
    ctx.save();
    ctx.beginPath();
    ctx.arc(s.x, s.y, radius, 0, TAU);
    ctx.clip();
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, w.width, w.height);
    drawBackground(ctx, w, p);
    ctx.restore();

    ctx.globalAlpha = (1 - w.stageT) * 0.8;
    ctx.strokeStyle = p.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(s.x, s.y, radius, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, w.width, w.height);
    drawBackground(ctx, w, p);
  }

  // Screen shake: desplaza toda la escena
  let ox = 0;
  let oy = 0;
  if (w.shake > 0.05) {
    ox = (Math.random() * 2 - 1) * w.shake;
    oy = (Math.random() * 2 - 1) * w.shake;
  }
  ctx.save();
  ctx.translate(ox, oy);

  // Vacíos
  for (const v of w.voids) drawVoid(ctx, v, p, w.bgTime);

  // Superestrellas recogibles: giran, laten y cambian de color
  if (w.stars.length) {
    const color = STAR_COLORS[Math.floor(w.bgTime * 8) % 12];
    const glow = glowSprite(color, 22);
    const pulse = 1 + 0.12 * Math.sin(w.bgTime * 8);
    for (const st of w.stars) {
      drawGlow(ctx, glow, st.x, st.y, 24 * pulse);
      starPath(ctx, st.x, st.y, GAME.starRadius * pulse, w.reducedMotion ? 0 : w.bgTime * 2.4);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = p.danger;
      ctx.stroke();
    }
  }

  // Estela (wake amarillo que se desvanece; arcoíris con la superestrella)
  const starOn = w.star > 0;
  const hueShift = starOn && !w.reducedMotion ? Math.floor(w.bgTime * 18) : 0;
  ctx.fillStyle = p.accent;
  for (let i = 0; i < w.trail.length; i++) {
    const t = w.trail[i];
    const life = t.life < 0 ? 0 : t.life;
    const rad = GAME.sparkRadius * 0.85 * life;
    if (rad <= 0.2) continue;
    if (starOn) ctx.fillStyle = STAR_COLORS[(i + hueShift) % 12];
    ctx.globalAlpha = life * (starOn ? 0.8 : 0.5);
    ctx.beginPath();
    ctx.arc(t.x, t.y, rad, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Fotones (glow pre-renderizado, sin shadowBlur)
  if (w.photons.length) {
    const glow = glowSprite(p.accent, 12);
    ctx.fillStyle = p.accent;
    for (const ph of w.photons) {
      drawGlow(ctx, glow, ph.x, ph.y, 12);
      ctx.beginPath();
      ctx.arc(ph.x, ph.y, GAME.photonRadius, 0, TAU);
      ctx.fill();
    }
  }

  // Pops de recogida (anillos que se expanden y desvanecen)
  if (w.pops.length) {
    ctx.strokeStyle = p.accent;
    ctx.lineWidth = 2;
    for (const pop of w.pops) {
      const k = 1 - Math.max(0, pop.life); // 0 -> 1
      const rad = GAME.photonRadius + (GAME.popMaxRadius - GAME.photonRadius) * k;
      ctx.globalAlpha = Math.max(0, pop.life);
      ctx.beginPath();
      ctx.arc(pop.x, pop.y, rad, 0, TAU);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Chispa con glow + squash/stretch en el Pulso (parpadeo si es invulnerable)
  const fn = GAME.pulseFlash > 0 ? s.flash / GAME.pulseFlash : 0; // 0..1
  ctx.save();
  ctx.globalAlpha = w.invuln > 0 ? 0.45 : 1;
  // En los últimos segundos de la estrella el efecto parpadea (aviso de fin)
  const warn = starOn && w.star < GAME.starWarn && Math.floor(w.bgTime * 10) % 2 === 0;
  const sparkColor = starOn && !warn ? STAR_COLORS[hueShift % 12] : p.accent;
  const glowR = (starOn ? 38 : 22) + 12 * fn;
  drawGlow(ctx, glowSprite(sparkColor, 22), s.x, s.y, glowR);
  ctx.translate(s.x, s.y);
  ctx.scale(1 - 0.22 * fn, 1 + 0.32 * fn);
  ctx.fillStyle = sparkColor;
  ctx.beginPath();
  ctx.arc(0, 0, starOn ? GAME.sparkRadius * 1.25 : GAME.sparkRadius, 0, TAU);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}
