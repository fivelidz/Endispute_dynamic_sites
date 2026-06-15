"use client";

/**
 * QuillTrail — a cursor-reactive ink flourish.
 *
 * A small dot of "ink" trails the cursor with eased lag, leaving a fading
 * tail of oxblood ink behind it — like the nib of a quill skating across the
 * page. Pure rAF + canvas; NO per-frame React state. Disabled on touch and
 * when prefers-reduced-motion is set (the document is shown fully written and
 * signed instead). The canvas ctx is null-checked before every use.
 */

import { useEffect, useRef } from "react";

type P = { x: number; y: number; life: number };

export default function QuillTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || touch) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: w / 2, y: h / 2 };
    const nib = { x: w / 2, y: h / 2 };
    let active = false;
    const trail: P[] = [];

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      active = true;
    };
    const onLeave = () => { active = false; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    let raf = 0;
    const tick = () => {
      // ease the nib toward the cursor
      nib.x += (target.x - nib.x) * 0.18;
      nib.y += (target.y - nib.y) * 0.18;

      if (active) {
        trail.push({ x: nib.x, y: nib.y, life: 1 });
        if (trail.length > 26) trail.shift();
      }

      ctx.clearRect(0, 0, w, h);

      // ink ribbon
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const t = i / trail.length;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(138, 43, 31, ${0.32 * t})`;
        ctx.lineWidth = 0.6 + t * 2.4;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      // fade the tail
      for (let i = 0; i < trail.length; i++) {
        trail[i].life *= 0.96;
        if (trail[i].life < 0.05 && i === 0) trail.shift();
      }

      // the nib / ink dot
      if (active) {
        ctx.beginPath();
        ctx.arc(nib.x, nib.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(138, 43, 31, 0.55)";
        ctx.fill();
        // faint gold guide ring
        ctx.beginPath();
        ctx.arc(nib.x, nib.y, 11, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(185, 149, 74, 0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fx-quill" aria-hidden="true" />;
}
