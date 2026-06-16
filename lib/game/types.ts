// Tipos compartidos del juego. Viven aparte para que engine/systems/render
// puedan referenciarlos sin ciclos de import.
export type Status = "intro" | "playing" | "dead";

export type TrailPoint = { x: number; y: number; life: number };
export type Spark = { x: number; y: number; vy: number; flash: number };
export type BgDot = { x: number; y: number; r: number; speed: number; alpha: number };
export type Photon = { x: number; y: number };
export type VoidShard = { x: number; y: number; w: number; h: number };
export type Pop = { x: number; y: number; life: number };

export type World = {
  width: number;
  height: number;
  status: Status;
  spark: Spark;
  trail: TrailPoint[];
  trailTimer: number;
  bg: BgDot[];
  photons: Photon[];
  voids: VoidShard[];
  pops: Pop[];
  scrollSpeed: number;
  elapsed: number;
  score: number;
  combo: number; // racha de fotones consecutivos (resetea al golpe)
  lives: number;
  invuln: number; // s de invulnerabilidad tras un golpe
  shake: number; // px de screen shake actual
  freeze: number; // s de freeze-frame restante
  deadFor: number; // s desde la muerte (puerta para reiniciar)
  nextPhotonAt: number; // umbral de elapsed para la próxima tanda de fotones
  nextVoidAt: number; // umbral de elapsed para el próximo vacío
  reducedMotion: boolean;
  assist: boolean; // Modo Asistencia activo
};

export type Palette = {
  bg: string;
  accent: string; // amarillo de marca (#facc15)
  dot: string; // campo de fondo
  danger: string; // relleno del vacío
  dangerEdge: string; // borde del vacío (lo hace legible sobre negro)
};
