// Glows pre-renderizados. Sustituyen a ctx.shadowBlur, que es muy caro por frame:
// aquí se rasteriza una vez y luego es un simple drawImage.
const cache = new Map<string, HTMLCanvasElement>();

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function glowSprite(color: string, radius: number): HTMLCanvasElement {
  const key = `${color}:${radius}`;
  let c = cache.get(key);
  if (c) return c;
  const size = radius * 4; // 2× para pantallas retina
  c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  if (g) {
    const [r, gr, b] = hexToRgb(color);
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${r},${gr},${b},0.6)`);
    grad.addColorStop(0.4, `rgba(${r},${gr},${b},0.22)`);
    grad.addColorStop(1, `rgba(${r},${gr},${b},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  cache.set(key, c);
  return c;
}

// Arcoíris cuantizado (12 tonos) para la superestrella: pocos colores -> pocos sprites en caché.
export const STAR_COLORS: string[] = Array.from({ length: 12 }, (_, i) => {
  const h = i / 12;
  const l = 0.55;
  const a = Math.min(l, 1 - l); // saturación 1
  const ch = (n: number) => {
    const k = (n + h * 12) % 12;
    const v = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * v).toString(16).padStart(2, "0");
  };
  return `#${ch(0)}${ch(8)}${ch(4)}`;
});

export function drawGlow(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  x: number,
  y: number,
  radius: number,
) {
  ctx.drawImage(sprite, x - radius, y - radius, radius * 2, radius * 2);
}
