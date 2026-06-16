// Persistencia local de la mejor puntuación (sin backend).
const BEST_KEY = "quijada.game.best";

export function loadBest(): number {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

export function saveBest(value: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(Math.floor(value)));
  } catch {
    // almacenamiento no disponible (modo privado, etc.): se ignora
  }
}
