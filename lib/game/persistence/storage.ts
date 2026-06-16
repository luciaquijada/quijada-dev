// Persistencia local (sin backend): mejor puntuación + ajustes del jugador.
const BEST_KEY = "quijada.game.best";
const SETTINGS_KEY = "quijada.game.settings";

export type Settings = { assist: boolean; muted: boolean };
const DEFAULT_SETTINGS: Settings = { assist: false, muted: false };

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

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<Settings> & { v?: number };
    return { assist: !!parsed.assist, muted: !!parsed.muted };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ v: 1, ...s }));
  } catch {
    // se ignora
  }
}
