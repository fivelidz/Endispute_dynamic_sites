"use client";

import { useTime, useTransform, useReducedMotion, motion } from "motion/react";

/**
 * AmbientOrbs — fixed background with 3 drifting gradient orbs.
 * Each orb follows a slow sine/cosine path via useTime + useTransform.
 * Respects reduced motion (static positions).
 */
export default function AmbientOrbs() {
  const reduced = useReducedMotion();
  const time = useTime();

  // Orb 1 — azure, drifts slowly horizontally + vertically (sine paths)
  const x1 = useTransform(time, (t) => Math.sin(t / 9000) * 80);
  const y1 = useTransform(time, (t) => Math.cos(t / 11000) * 60);

  // Orb 2 — copper, opposite phase
  const x2 = useTransform(time, (t) => Math.cos(t / 13000) * 100);
  const y2 = useTransform(time, (t) => Math.sin(t / 10000) * 70);

  // Orb 3 — slate, slowest
  const x3 = useTransform(time, (t) => Math.sin(t / 15000) * 90);
  const y3 = useTransform(time, (t) => Math.cos(t / 14000) * 50);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-[#eef1f4]" />

      {/* Orb 1 — azure */}
      <motion.div
        style={reduced ? undefined : { x: x1, y: y1 }}
        className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full blur-3xl"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(37,99,171,0.28)_0%,rgba(37,99,171,0)_70%)]" />
      </motion.div>

      {/* Orb 2 — copper */}
      <motion.div
        style={reduced ? undefined : { x: x2, y: y2 }}
        className="absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full blur-3xl"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(184,117,69,0.22)_0%,rgba(184,117,69,0)_70%)]" />
      </motion.div>

      {/* Orb 3 — slate */}
      <motion.div
        style={reduced ? undefined : { x: x3, y: y3 }}
        className="absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full blur-3xl"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(28,37,48,0.14)_0%,rgba(28,37,48,0)_70%)]" />
      </motion.div>

      {/* subtle top light flood */}
      <div className="absolute inset-x-0 top-0 h-96 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_100%)]" />
    </div>
  );
}
