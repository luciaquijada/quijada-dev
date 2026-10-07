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
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedQuery = window.matchMedia("(forced-colors: active)");

    const syncEnabled = () => {
      setEnabled(
        pointerQuery.matches && !motionQuery.matches && !forcedQuery.matches
      );
    };

    syncEnabled();
    pointerQuery.addEventListener("change", syncEnabled);
    motionQuery.addEventListener("change", syncEnabled);
    forcedQuery.addEventListener("change", syncEnabled);

    return () => {
      pointerQuery.removeEventListener("change", syncEnabled);
      motionQuery.removeEventListener("change", syncEnabled);
      forcedQuery.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    if (!dot) {
      return () => {
        document.documentElement.classList.remove("has-custom-cursor");
      };
    }

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
      rafId = 0;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      if (!visible) {
        visible = true;
        applyVisibility();
      }

      if (!rafId) {
        rafId = requestAnimationFrame(render);
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

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
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
