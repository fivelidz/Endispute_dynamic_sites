"use client";
import { useEffect, useRef } from "react";

/*
  FORCE LATTICE — the centerpiece.

  Two sets of nodes originate from opposite sides of the viewport:
    side 0 (left)  = the teal party
    side 1 (right) = the amber party
  They drift with a smooth flow-field (layered sines = cheap curl noise).

  Lines connect nearby nodes within a distance cutoff. Same-side links take
  that side's hue; BRIDGING links (teal node <-> amber node) take indigo —
  the agreement forming. Line opacity falls off with distance and brightens
  near the cursor (moving the mouse literally "weaves" the network).

  SCROLL drives a single progress value p in [0,1]:
    p = 0  -> CHAOS / SEPARATION: clouds pushed apart, agitated, few bridges.
    p = 1  -> EQUILIBRIUM:        clouds interleave into one balanced woven
             lattice, calmer motion, many bridging lines (longer cutoff +
             nodes attracted toward a shared central column / each other).

  rAF only. No per-frame React setState. Passive pointer listeners.
  Cursor force disabled on touch (pointer:coarse).
  prefers-reduced-motion -> render one settled calm lattice, no loop.

  Node cap ~150 (line drawing is O(n^2)-ish; spatial distance cutoff applied).
*/

type Node = {
  side: 0 | 1; // 0 = teal/left, 1 = amber/right
  x: number; y: number;
  hx: number; hy: number;   // "home" anchor (its side's territory)
  vx: number; vy: number;
  r: number;                // glow radius
  ph: number;               // phase offset for drift
};

const TEAL = { r: 0x4f, g: 0xd1, b: 0xc5 };
const AMBER = { r: 0xf5, g: 0xa5, b: 0x24 };
const INDIGO = { r: 0x6e, g: 0x70, b: 0xf5 };

export default function ForceLattice() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = ref.current;
    if (!canvasEl) return;
    const ctx2d = canvasEl.getContext("2d");
    if (!ctx2d) return;
    // TS strict null gotcha: re-bind after the null guards so nested
    // closures (frame/resize) see definitely-non-null values.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = window.innerWidth < 768 ? 90 : 150; // per perf cap
    const nodes: Node[] = [];

    function makeNodes() {
      nodes.length = 0;
      for (let i = 0; i < N; i++) {
        const side: 0 | 1 = i % 2 === 0 ? 0 : 1;
        // home anchors live in each side's territory band
        const bandX = side === 0
          ? W * (0.06 + Math.random() * 0.34)
          : W * (0.60 + Math.random() * 0.34);
        const hy = H * (0.08 + Math.random() * 0.84);
        nodes.push({
          side,
          x: bandX, y: hy,
          hx: bandX, hy,
          vx: 0, vy: 0,
          r: 1.4 + Math.random() * 2.2,
          ph: Math.random() * Math.PI * 2,
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
      makeNodes();
    }

    // scroll -> resolution progress 0..1
    let prog = 0;
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      prog = Math.min(1, Math.max(0, p));
    }

    // cursor
    let mx = -9999, my = -9999, hasCursor = false;
    function onMove(e: PointerEvent) { mx = e.clientX; my = e.clientY; hasCursor = true; }
    function onLeave() { mx = -9999; my = -9999; hasCursor = false; }

    // smootherstep
    const ss = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

    let raf = 0;
    let t = 0;

    function step(animate: boolean) {
      const e = ss(prog);

      for (let i = 0; i < N; i++) {
        const n = nodes[i];

        // SEPARATION vs EQUILIBRIUM target:
        // at p=0 the home anchor is pushed toward its own edge (clouds apart);
        // at p=1 anchors migrate toward the shared central column and interleave.
        const center = W * 0.5;
        const sep = n.side === 0 ? -1 : 1;
        // separated home: pushed outward; resolved home: pulled to interleaved column
        const sepX = n.hx + sep * W * 0.10 * (1 - e);
        const weaveCol = center + sep * W * 0.16 * (1 - e * 0.55)
          + Math.sin(n.hy * 0.012 + n.ph) * W * 0.05;
        const targetX = sepX + (weaveCol - sepX) * e;
        const targetY = n.hy + (animate ? Math.sin(t * 0.5 + n.ph) * (8 + 26 * (1 - e)) : 0);

        // flow-field drift: agitated when chaotic, calm at equilibrium
        const agi = 0.6 + 1.8 * (1 - e); // agitation factor
        const fx = animate
          ? Math.cos(n.y * 0.006 + t * 0.4 + n.ph) * agi
          : 0;
        const fy = animate
          ? Math.sin(n.x * 0.006 + t * 0.35 + n.ph * 1.3) * agi
          : 0;

        // spring toward target
        const k = reduce ? 1 : 0.045;
        n.vx += (targetX - n.x) * k + fx * 0.06;
        n.vy += (targetY - n.y) * k + fy * 0.06;

        // cursor force — attraction that weaves; brighter handled in draw
        if (animate && hasCursor && !isTouch && !reduce) {
          const dx = mx - n.x, dy = my - n.y;
          const d2 = dx * dx + dy * dy;
          const R = 190 * 190;
          if (d2 < R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d2 / R);
            // gentle pull toward cursor; very close -> soft repel to avoid clumping
            const dir = d < 40 ? -1 : 1;
            n.vx += (dx / d) * f * dir * 1.6;
            n.vy += (dy / d) * f * dir * 1.6;
          }
        }

        n.vx *= 0.84; n.vy *= 0.84;
        n.x += n.vx; n.y += n.vy;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const e = ss(prog);

      // connection cutoff grows as we resolve (more bridges weave together)
      const cut = (W < 768 ? 120 : 150) + 70 * e;
      const cut2 = cut * cut;
      const curR = 200 * 200;

      // ---- lines first (under nodes) ----
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > cut2) continue;
          const d = Math.sqrt(d2);
          const bridge = a.side !== b.side;

          // bridging links are scarce when chaotic, plentiful at equilibrium
          let base = (1 - d / cut);
          if (bridge) base *= 0.25 + 0.95 * e;
          else base *= 0.55;

          // cursor proximity brightens nearby lines (the "weaving")
          if (hasCursor && !isTouch) {
            const mxn = (a.x + b.x) * 0.5 - mx;
            const myn = (a.y + b.y) * 0.5 - my;
            const md2 = mxn * mxn + myn * myn;
            if (md2 < curR) base += (1 - md2 / curR) * 0.6;
          }

          let alpha = base * 0.5;
          if (alpha <= 0.01) continue;
          if (alpha > 0.85) alpha = 0.85;

          let col;
          if (bridge) col = INDIGO;
          else col = a.side === 0 ? TEAL : AMBER;
          ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ---- nodes with subtle glow ----
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        const col = n.side === 0 ? TEAL : AMBER;
        // glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0, `rgba(${col.r},${col.g},${col.b},0.5)`);
        g.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fill();
        // core
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},0.95)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame() {
      t += 0.016;
      step(true);
      draw();
      raf = requestAnimationFrame(frame);
    }

    resize();
    onScroll();

    if (reduce) {
      // settle to the equilibrium lattice for a calm static image
      prog = 1;
      for (let i = 0; i < 220; i++) step(false);
      draw();
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
