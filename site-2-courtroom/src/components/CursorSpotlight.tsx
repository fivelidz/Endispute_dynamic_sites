"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const posRef = useRef({ x: -500, y: -500 });
  const rafRef = useRef<number | null>(null);
  const isTouchDevice = useRef(false);

  const updateSpotlight = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${posRef.current.x}px ${posRef.current.y}px, rgba(212, 161, 74, 0.07) 0%, rgba(212, 161, 74, 0.02) 40%, transparent 70%)`;
    }
    rafRef.current = null;
  }, []);

  useEffect(() => {
    // Detect touch on first touch event
    const onTouch = () => {
      isTouchDevice.current = true;
    };
    window.addEventListener("touchstart", onTouch, { once: true });

    if (reducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      if (isTouchDevice.current) return;
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateSpotlight);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, updateSpotlight]);

  if (reducedMotion) return null;

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-none"
      style={{
        background:
          "radial-gradient(600px circle at -500px -500px, rgba(212, 161, 74, 0.07) 0%, transparent 70%)",
      }}
    />
  );
}
