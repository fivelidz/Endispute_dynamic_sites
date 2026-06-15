"use client";

/**
 * Constellation — the centerpiece CSS/canvas art.
 *
 * Thousands of tiny line-drawn shapes live on a black void. As the visitor
 * scrolls, the whole cloud MORPHS through a dispute-resolution narrative:
 *
 *   0  CHAOS      — scattered conflict, particles drift in disorder
 *   1  SCALES     — they assemble into the scales of justice (balance)
 *   2  HANDSHAKE  — two interlocking arcs meeting (agreement)
 *   3  RESOLUTION — a single calm, closed ring (the dispute, ended)
 *
 * Particles ease toward their per-form targets, twinkle, drift, and gently
 * repel from the cursor. Pure rAF; no per-frame React state. Honors
 * prefers-reduced-motion (renders a single settled form, no animation) and
 * disables cursor interaction on touch.
 */

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };

const PALETTE = ["#ffffff", "#ffffff", "#8052ff", "#a487ff", "#ffb829", "#15846e"];

// ---- shape generators (return normalized points in a 0..1 box) ----------

function sampleScales(n: number): Pt[] {
  // Scales of justice: central pillar, top beam, two hanging pans.
  const pts: Pt[] = [];
  const cx = 0.5;
  for (let i = 0; i < n; i++) {
    const r = Math.random();
    if (r < 0.16) {
      // vertical pillar
      pts.push({ x: cx + (Math.random() - 0.5) * 0.012, y: 0.22 + Math.random() * 0.5 });
    } else if (r < 0.22) {
      // base
      const t = Math.random();
      pts.push({ x: cx + (t - 0.5) * 0.22, y: 0.74 + Math.random() * 0.02 });
    } else if (r < 0.4) {
      // top beam
      const t = Math.random();
      pts.push({ x: 0.24 + t * 0.52, y: 0.22 + (Math.random() - 0.5) * 0.012 });
    } else if (r < 0.46) {
      // pivot / fulcrum
      const a = Math.random() * Math.PI * 2;
      const rr = Math.random() * 0.018;
      pts.push({ x: cx + Math.cos(a) * rr, y: 0.2 + Math.sin(a) * rr });
    } else {
      // two pans (semicircular bowls) + their chains
      const left = r < 0.73;
      const px = left ? 0.27 : 0.73;
      if (Math.random() < 0.25) {
        // chain from beam to pan
        pts.push({ x: px + (Math.random() - 0.5) * 0.02, y: 0.22 + Math.random() * 0.18 });
      } else {
        const a = Math.PI + Math.random() * Math.PI; // lower half-circle
        const rr = 0.085 * Math.sqrt(Math.random());
        pts.push({ x: px + Math.cos(a) * rr, y: 0.42 + Math.sin(a) * -rr * 0.55 + 0.0 });
      }
    }
  }
  return pts;
}

function sampleHandshake(n: number): Pt[] {
  // Two interlocking arcs reaching toward a meeting point in the center.
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const left = i % 2 === 0;
    const t = Math.random();
    // an arc sweeping from a corner toward center
    const base = left
      ? { sx: 0.12, sy: 0.78, ex: 0.5, ey: 0.46 }
      : { sx: 0.88, sy: 0.78, ex: 0.5, ey: 0.46 };
    // quadratic-ish bow
    const bow = left ? -0.16 : 0.16;
    const x = base.sx + (base.ex - base.sx) * t + Math.sin(t * Math.PI) * bow;
    const y = base.sy + (base.ey - base.sy) * t - Math.sin(t * Math.PI) * 0.12;
    const jitter = (1 - Math.abs(t - 0.5) * 1.4) * 0.05; // thicker near the clasp
    pts.push({
      x: x + (Math.random() - 0.5) * (0.018 + jitter),
      y: y + (Math.random() - 0.5) * (0.018 + jitter),
    });
  }
  return pts;
}

function sampleRing(n: number): Pt[] {
  // A single calm closed ring — resolution.
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.05;
    const rr = 0.3 + (Math.random() - 0.5) * 0.02;
    pts.push({ x: 0.5 + Math.cos(a) * rr * 0.62, y: 0.46 + Math.sin(a) * rr });
  }
  return pts;
}

function sampleChaos(n: number): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    pts.push({ x: Math.random(), y: Math.random() });
  }
  return pts;
}

export default function Constellation() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = ref.current;
    if (!canvasEl) return;
    const ctx2d = canvasEl.getContext("2d");
    if (!ctx2d) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = window.innerWidth < 768 ? 1100 : 2200;

    // per-form normalized targets
    const forms = [sampleChaos(N), sampleScales(N), sampleHandshake(N), sampleRing(N)];

    type P = {
      x: number; y: number;          // current px
      vx: number; vy: number;
      size: number; rot: number; spin: number;
      color: string; phase: number; shape: number;
      z: number;                     // depth 0(far)..1(near) for a 3D feel
    };
    const ps: P[] = [];

    function box() {
      // square art box centered in viewport
      const s = Math.min(W, H) * 0.92;
      return { ox: (W - s) / 2, oy: (H - s) / 2, s };
    }

    function init() {
      const { ox, oy, s } = box();
      ps.length = 0;
      for (let i = 0; i < N; i++) {
        const f = forms[0][i];
        const z = Math.random();
        ps.push({
          x: ox + f.x * s,
          y: oy + f.y * s,
          vx: 0, vy: 0,
          size: 1.4 + z * 4.2, // nearer particles are bigger
          rot: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
          color: PALETTE[(Math.random() * PALETTE.length) | 0],
          phase: Math.random() * Math.PI * 2,
          shape: (Math.random() * 3) | 0,
          z,
        });
      }
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    }

    // scroll → morph progress across the four forms
    let scrollProg = 0; // 0..3
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      scrollProg = Math.min(0.999, Math.max(0, p)) * (forms.length - 1);
    }

    // cursor
    let mx = -9999, my = -9999;
    function onMove(e: PointerEvent) { mx = e.clientX; my = e.clientY; }
    function onLeave() { mx = -9999; my = -9999; }

    function drawShape(p: P, tw: number) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      const s = p.size;
      // depth: nearer (high z) = thicker stroke + a soft glow core (3D feel)
      ctx.lineWidth = 0.6 + p.z * 1.4;
      ctx.beginPath();
      if (p.shape === 0) {
        // triangle (the dominant motif)
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.87, s * 0.5);
        ctx.lineTo(-s * 0.87, s * 0.5);
        ctx.closePath();
      } else if (p.shape === 1) {
        // diamond
        ctx.moveTo(0, -s); ctx.lineTo(s, 0); ctx.lineTo(0, s); ctx.lineTo(-s, 0); ctx.closePath();
      } else {
        // small circle
        ctx.arc(0, 0, s * 0.8, 0, Math.PI * 2);
      }
      // glow for the nearer particles gives volume
      if (!reduce && p.z > 0.55) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = (p.z - 0.55) * 18;
      }
      ctx.stroke();
      // faint filled core on the nearest particles → reads as lit/3D
      if (p.z > 0.78) {
        ctx.globalAlpha = tw * (p.z - 0.78) * 2.2;
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.restore();
    }

    let raf = 0;
    let t = 0;
    function frame() {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      const { ox, oy, s } = box();
      const lo = Math.floor(scrollProg);
      const hi = Math.min(forms.length - 1, lo + 1);
      const mix = scrollProg - lo;
      // smootherstep
      const e = mix * mix * mix * (mix * (mix * 6 - 15) + 10);

      for (let i = 0; i < N; i++) {
        const p = ps[i];
        const a = forms[lo][i], b = forms[hi][i];
        const tx = ox + (a.x + (b.x - a.x) * e) * s;
        const ty = oy + (a.y + (b.y - a.y) * e) * s;

        // gentle organic drift around the target — nearer particles drift
        // more (depth parallax) which reads as 3D volume
        const amp = 2 + p.z * 6;
        const driftX = Math.sin(t * 0.6 + p.phase) * amp;
        const driftY = Math.cos(t * 0.5 + p.phase * 1.3) * amp;

        // spring toward target
        const k = reduce ? 1 : 0.06;
        p.vx += (tx + driftX - p.x) * k;
        p.vy += (ty + driftY - p.y) * k;

        // cursor repulsion
        if (!isTouch && !reduce) {
          const dx = p.x - mx, dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            const f = (16000 - d2) / 16000;
            const d = Math.sqrt(d2) || 1;
            p.vx += (dx / d) * f * 2.4;
            p.vy += (dy / d) * f * 2.4;
          }
        }

        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
        if (!reduce) p.rot += p.spin;

        // twinkle: opacity oscillates; nearer particles read brighter
        const tw = (0.35 + 0.4 * p.z) * (0.6 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.4 + p.phase)));
        ctx.globalAlpha = reduce ? (0.5 + 0.4 * p.z) : tw;
        ctx.strokeStyle = p.color;
        drawShape(p, tw);
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (reduce) return; // single settled frame
      raf = requestAnimationFrame(frame);
    }

    resize();
    onScroll();
    if (reduce) {
      // settle to the resolution form for a calm static image
      scrollProg = forms.length - 1;
      for (let i = 0; i < 30; i++) frame();
      frame();
    } else {
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="fx-canvas" aria-hidden="true" />;
}
