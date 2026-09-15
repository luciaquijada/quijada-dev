"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  '[role="link"]',
  "label[for]",
  "summary",
  ".hover-card",
  ".hover-badge",
].join(",");

const TEXT_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [contenteditable=""]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const syncEnabled = () => setEnabled(pointerQuery.matches);
    syncEnabled();
    pointerQuery.addEventListener("change", syncEnabled);

    return () => pointerQuery.removeEventListener("change", syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    if (!dot) return;

    const mouse = { x: 0, y: 0 };
    let visible = false;
    let hovering = false;
    let overText = false;
    let pressed = false;
    let rafId = 0;

    const applyVisibility = () => {
      const show = visible && !overText;
      dot.style.opacity = show ? "1" : "0";
    };

    const applyStateClasses = () => {
      const isHovering = hovering && !overText;
      const isPressed = pressed && !overText;
      dot.classList.toggle("is-hovering", isHovering);
      dot.classList.toggle("is-pressed", isPressed);
    };

    const render = () => {
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      if (!visible) {
        visible = true;
        applyVisibility();
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      overText = Boolean(target.closest(TEXT_SELECTOR));
      hovering = !overText && Boolean(target.closest(INTERACTIVE_SELECTOR));
      applyVisibility();
      applyStateClasses();
    };

    const handleMouseDown = () => {
      pressed = true;
      applyStateClasses();
    };

    const handleMouseUp = () => {
      pressed = false;
      applyStateClasses();
    };

    const handleMouseEnter = () => {
      visible = true;
      applyVisibility();
    };

    const handleMouseLeave = () => {
      visible = false;
      hovering = false;
      pressed = false;
      applyVisibility();
      applyStateClasses();
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
