// Tipos compartidos del juego. Viven aparte para que engine/systems/render
// puedan referenciarlos sin ciclos de import.
export type Status = "intro" | "playing" | "dead";

export type TrailPoint = { x: number; y: number; life: number };
export type Spark = { x: number; y: number; vy: number; flash: number };
export type BgDot = { x: number; y: number; r: number; speed: number; alpha: number };
export type Photon = { x: number; y: number };
// shard: hexágono estático · drifter: cápsula que oscila en vertical · gate: puerta de dos piezas con hueco
export type VoidKind = "shard" | "drifter" | "gate";
export type VoidShard = {
  kind: VoidKind;
  x: number;
  y: number;
  w: number;
  h: number;
  flash: number;
  grazed: boolean;
  // Solo drifter: y = baseY + sin(elapsed * freq + phase) * amp
  baseY: number;
  amp: number;
  freq: number;
  phase: number;
};
export type Star = { x: number; y: number };
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
  stars: Star[]; // superestrellas recogibles
  star: number; // s restantes de invencibilidad (0 = sin efecto)
  nextStarAt: number; // umbral de elapsed para la próxima superestrella
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
  starPicked: boolean; // señales para el SFX (las consume el frame loop)
  smashed: boolean;
  nearMiss: boolean; // señal de roce (la consume el frame loop para el SFX)
  bgTime: number; // s acumulados para animar el fondo (también en intro/dead)
  scrollX: number; // px de scroll acumulado (fondos con desplazamiento)
  stage: number; // nivel actual (sube al alcanzar ciertas puntuaciones)
  prevStage: number; // nivel anterior (para la transición de color)
  stageT: number; // 0..1 progreso de la transición entre niveles (1 = completada)
};

export type BgAnim = "dots" | "streaks" | "embers" | "grid" | "waves";

export type Palette = {
  bg: string;
  accent: string; // amarillo de marca (#facc15)
  dot: string; // campo de fondo
  tint: string; // color de las animaciones de fondo y de los bordes especiales
  danger: string; // relleno del vacío
  dangerEdge: string; // borde del vacío (lo hace legible sobre negro)
  anim: BgAnim; // animación de fondo del nivel
};
