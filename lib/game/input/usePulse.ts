import { useEffect, useRef } from "react";

// Un único input -> el Pulso. pointerdown cubre ratón, táctil y lápiz;
// keydown cubre Espacio / ArrowUp. Se ignoran los clics sobre UI marcada
// con [data-no-pulse] (p.ej. el botón de salir), para no disparar un Pulso.
export function usePulse(onPulse: () => void, enabled = true) {
  const cb = useRef(onPulse);
  cb.current = onPulse;

  useEffect(() => {
    if (!enabled) return;

    const onPointer = (e: PointerEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest("[data-no-pulse]")) return;
      cb.current();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        cb.current();
      }
    };

    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);
}
