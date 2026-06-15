"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Wrapper adding a mouse-following radial gold glow over its children panel.
 * Disabled when reduced motion. Throttled. Glow div is pointer-events-none.
 */
export default function MouseGlow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const lastMove = useRef(0);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const background = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(212,168,67,0.10), transparent 70%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const now = performance.now();
    if (now - lastMove.current < 16) return;
    lastMove.current = now;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  function handleLeave() {
    mx.set(-200);
    my.set(-200);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("relative", className)}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{ background }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
