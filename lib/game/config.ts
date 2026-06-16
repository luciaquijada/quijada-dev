// Parámetros base del juego. Casi todo el "feel" se afina desde aquí (días 1-4).
// Unidades: px y px/s (la simulación trabaja en segundos; ver engine/clock.ts).
export const GAME = {
  // Movimiento de la Chispa
  gravity: 2200, // px/s²
  pulseVy: -620, // px/s — velocidad vertical FIJADA en cada Pulso
  vyClamp: 900, // px/s — límite de velocidad vertical
  sparkXRatio: 0.28, // posición horizontal fija (0..1 del ancho)
  sparkRadius: 7, // px

  // Scroll del Arena
  scrollBase: 240, // px/s inicial
  scrollRamp: 1.6, // px/s por segundo (≈ +8 px/s cada 5 s)
  scrollMax: 520, // px/s tope
  introScrollFactor: 0.4, // deriva lenta del fondo antes del primer Pulso

  // Estela
  trailInterval: 0.012, // s entre puntos
  trailLife: 0.28, // s de vida
  trailMax: 48,
  pulseFlash: 0.14, // s de squash/glow tras un Pulso

  // Fotones (coleccionables)
  photonRadius: 5,
  photonGrace: 3, // px extra de hitbox (recogida generosa)
  photonBase: 10, // puntos base por fotón (× multiplicador de combo)
  photonGapMin: 0.45, // s entre tandas
  photonGapMax: 0.85,

  // Vacíos (obstáculos)
  voidW: 22, // ancho del shard
  voidMinH: 36,
  voidMaxHRatio: 0.26, // alto máx como fracción del viewport (nunca tapa todo)
  firstVoidDelay: 6, // s sin vacíos al empezar (onboarding)
  voidGapStart: 2.2, // s entre vacíos al inicio
  voidGapMin: 1.0, // tope inferior
  voidGapRamp: 0.02, // reducción de gap por segundo (dificultad)

  // Spawn
  spawnMargin: 40, // px fuera del borde derecho
  safePad: 56, // px de margen vertical seguro

  // Vidas / combo / juice
  lives: 1, // vidas por defecto
  assistLives: 3, // Modo Asistencia: más vidas
  assistScrollFactor: 0.78, // Modo Asistencia: scroll más lento
  assistDangerScale: 0.7, // Modo Asistencia: hitbox de peligro más perdonadora
  borderBounce: 360, // px/s — rebote al sobrevivir a un golpe contra techo/suelo
  comboStep: 5, // fotones para subir un nivel de multiplicador
  invuln: 0.8, // s de invulnerabilidad tras golpe
  hitShake: 6, // px
  deathShake: 7, // px
  deathFreeze: 0.08, // s freeze-frame de impacto
  shakeDecayRate: 30, // px/s de decaimiento del shake
  popLife: 0.13, // s de vida del pop de recogida
  popMaxRadius: 22, // px del anillo de pop
  comboDilationScale: 0.4, // velocidad mínima en el hito de combo (time-dilation)
  comboDilationHold: 0.12, // s a velocidad mínima
  comboDilationEase: 0.22, // s de vuelta a 1×
  nearMissBand: 16, // px más allá de la hitbox que cuentan como "roce"
  nearMissFlashLife: 0.18, // s de destello del borde del vacío al rozarlo
  restartGrace: 0.5, // s tras morir antes de aceptar reinicio
} as const;
