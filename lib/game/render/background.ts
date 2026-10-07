// Animaciones de fondo por nivel. Todas reutilizan el campo de puntos del mundo
// (w.bg) o el tiempo acumulado, y agrupan el trazado en un solo path por capa.
import type { Palette, World } from "@/lib/game/types";

const TAU = Math.PI * 2;

export function drawBackground(ctx: CanvasRenderingContext2D, w: World, p: Palette) {
  const { width: W, height: H } = w;

  switch (p.anim) {
    case "dots": {
      ctx.fillStyle = p.dot;
      for (const d of w.bg) {
        ctx.globalAlpha = d.alpha;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, TAU);
        ctx.fill();
      }
      break;
    }

    case "streaks": {
      // Estelas horizontales: más largas cuanto más rápido va el scroll
      ctx.strokeStyle = p.tint;
      ctx.lineCap = "round";
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      for (const d of w.bg) {
        const len = 8 + w.scrollSpeed * d.speed * 0.09;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + len, d.y);
      }
      ctx.stroke();
      break;
    }

    case "embers": {
      // Brasas que suben con un leve balanceo
      ctx.fillStyle = p.tint;
      for (const d of w.bg) {
        const rise = w.bgTime * d.speed * 70;
        const y = (((d.y - rise) % H) + H) % H;
        const x = d.x + Math.sin(w.bgTime * 1.4 + d.y) * 7;
        ctx.globalAlpha = Math.min(0.7, d.alpha * 3.2);
        ctx.beginPath();
        ctx.arc(x, y, d.r * 1.15, 0, TAU);
        ctx.fill();
      }
      break;
    }

    case "grid": {
      // Rejilla que se desplaza y "respira"
      const cell = 64;
      const off = (w.scrollX * 0.5) % cell;
      ctx.strokeStyle = p.tint;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.1 + 0.05 * Math.sin(w.bgTime * 2);
      ctx.beginPath();
      for (let x = -off; x < W; x += cell) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = 0; y < H; y += cell) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();
      ctx.fillStyle = p.tint;
      ctx.globalAlpha = 0.35;
      for (const d of w.bg) {
        if (d.r < 3) continue;
        ctx.fillRect(d.x, d.y, 2, 2);
      }
      break;
    }

    case "waves": {
      // Tres ondas senoidales con paralaje
      ctx.strokeStyle = p.tint;
      ctx.lineWidth = 2;
      for (let k = 0; k < 3; k++) {
        const baseY = H * (0.3 + 0.2 * k);
        const amp = 22 + 9 * k;
        const freq = 0.009 * (1 + k * 0.3);
        const shift = w.scrollX * (0.3 + 0.2 * k);
        const speed = w.bgTime * (0.6 + 0.3 * k);
        ctx.globalAlpha = 0.22 - k * 0.04;
        ctx.beginPath();
        for (let x = 0; x <= W + 12; x += 12) {
          const y = baseY + Math.sin((x + shift) * freq + speed) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      break;
    }
  }
  ctx.globalAlpha = 1;
}
