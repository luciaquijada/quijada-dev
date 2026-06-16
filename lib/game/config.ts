// Parámetros base del "feel" de la Chispa. Afínalos en playtest (días 1-2).
// Unidades: px y px/s (la simulación trabaja en segundos; ver engine/clock.ts).
export const GAME = {
  gravity: 2200, // px/s² — gravedad constante que tira de la Chispa
  pulseVy: -620, // px/s — velocidad vertical FIJADA en cada Pulso (no acumulativa)
  vyClamp: 900, // px/s — límite de velocidad vertical (evita caídas/subidas locas)
  scrollBase: 240, // px/s — velocidad de scroll inicial del Arena
  scrollRamp: 1.6, // px/s por segundo (≈ +8 px/s cada 5 s)
  scrollMax: 520, // px/s — tope de velocidad
  sparkXRatio: 0.28, // posición horizontal fija de la Chispa (0..1 del ancho)
  sparkRadius: 7, // px — radio del núcleo de la Chispa
  trailInterval: 0.012, // s entre puntos de estela
  trailLife: 0.28, // s de vida de cada punto de estela
  trailMax: 48, // tope de puntos de estela en memoria
  pulseFlash: 0.14, // s de squash/glow tras un Pulso
} as const;
