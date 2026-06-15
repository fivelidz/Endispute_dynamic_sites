"use client";
import { useEffect, useRef } from "react";

/*
  SCALES OF JUSTICE — one coherent, connected brass balance.

  Deliberately restrained engraved line-art: post, base plinth, fulcrum,
  a single beam, two chains per side, two pans. No radiating guide-lines,
  no busy decoration — just the essential, elegant balance.

  GEOMETRY (single 0..600 viewBox, all parts share it):
  - Vertical post rises from a base plinth to the pivot at (PIVOT_X, PIVOT_Y).
  - A single horizontal BEAM is one <g id="beam"> rotated about the pivot, so
    it is physically attached to the post at its centre — it can never detach.
  - Each PAN is a child <g> living INSIDE #beam at local (±ARM, 0); it
    counter-rotates by -beamAngle so the chains + dish hang vertically.
    Because the pans are children of the rotating beam, they ALWAYS stay
    welded to the beam ends.

  MOTION (one rAF loop, no per-frame React setState):
  - A slow, low-amplitude, heavily-damped tilt. Cursor nudges it gently;
    a small conflict tilt at the top of the page settles toward perfect
    level as you scroll (resolution into balance). Everything is subtle.

  ACCESSIBILITY:
  - Cursor tilt disabled on coarse pointers (touch).
  - prefers-reduced-motion → static, level, balanced scale; loop never starts.
*/

const PIVOT_X = 300;
const PIVOT_Y = 190;
const ARM = 158; // half-beam length (beam end relative to pivot, local coords)

export default function Scales() {
  const rootRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = rootRef.current;
    if (!svg) return;
    const svgEl: SVGSVGElement = svg;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const beam = svgEl.querySelector<SVGGElement>("#beam");
    const panL = svgEl.querySelector<SVGGElement>("#panGroupL");
    const panR = svgEl.querySelector<SVGGElement>("#panGroupR");
    const fulcrumGlow = svgEl.querySelector<SVGCircleElement>("#fulcrumGlow");
    if (!beam || !panL || !panR || !fulcrumGlow) return;
    const beamEl: SVGGElement = beam;
    const panLEl: SVGGElement = panL;
    const panREl: SVGGElement = panR;
    const glowEl: SVGCircleElement = fulcrumGlow;

    // pans are children of the beam, at local (±ARM, 0); counter-rotate to hang
    const setPans = (beamAngle: number) => {
      panLEl.setAttribute("transform", `translate(${-ARM} 0) rotate(${(-beamAngle).toFixed(3)})`);
      panREl.setAttribute("transform", `translate(${ARM} 0) rotate(${(-beamAngle).toFixed(3)})`);
    };

    if (reduceMotion) {
      beamEl.setAttribute("transform", `rotate(0 ${PIVOT_X} ${PIVOT_Y})`);
      setPans(0);
      glowEl.setAttribute("opacity", "0.5");
      return;
    }

    let mouseTarget = 0; // -1..1
    let scroll = 0; // 0..1
    let angle = 0;
    let vel = 0;
    let t0 = performance.now();
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (coarse) return;
      mouseTarget = (e.clientX / window.innerWidth) * 2 - 1;
    };
    const onLeave = () => {
      mouseTarget = 0;
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scroll = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
    };
    onScroll();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      const t = now / 1000;

      // gentle conflict tilt at the top, resolving to level as you scroll
      const conflict = (1 - scroll) * 3.2;
      // cursor nudge — small
      const cursorTarget = mouseTarget * 2.4;
      const target = -conflict + cursorTarget;

      // slow, heavily-damped spring → smooth settle, no jitter or overshoot
      const stiffness = 14;
      const damping = 7;
      const accel = (target - angle) * stiffness - vel * damping;
      vel += accel * dt;
      angle += vel * dt;

      // a barely-there breathing sway so it feels alive, not mechanical
      const sway = Math.sin(t * 0.5) * 0.35 * (0.3 + 0.7 * (1 - scroll));
      const beamAngle = angle + sway;
      beamEl.setAttribute("transform", `rotate(${beamAngle.toFixed(3)} ${PIVOT_X} ${PIVOT_Y})`);
      setPans(beamAngle);

      // calm fulcrum glow that strengthens as the scale resolves to balance
      const pulse = 0.5 + 0.12 * Math.sin(t * 1.1);
      const resolved = 0.55 + 0.45 * scroll;
      glowEl.setAttribute("opacity", (pulse * resolved).toFixed(3));

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // a single pan assembly, drawn at local origin (0,0) = its beam-end anchor.
  // two clean chains converge from the anchor down to the dish.
  const Pan = ({ id, dx }: { id: string; dx: number }) => (
    <g
      id={id}
      transform={`translate(${dx} 0)`}
      stroke="url(#brassGrad)"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* hanger ring at the beam end */}
      <circle cx="0" cy="0" r="3.5" strokeWidth="1.5" />
      {/* two chains down to the dish rim */}
      <path d="M0 3 L-40 96" strokeWidth="1.3" />
      <path d="M0 3 L40 96" strokeWidth="1.3" />
      {/* shallow dish */}
      <path d="M-48 96 Q0 124 48 96" strokeWidth="2.2" />
      <path d="M-48 96 L48 96" strokeWidth="1" opacity="0.5" />
    </g>
  );

  return (
    <div className="scales-stage" aria-hidden="true">
      <svg
        ref={rootRef}
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="brassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e0c585" />
            <stop offset="0.5" stopColor="#c9a24b" />
            <stop offset="1" stopColor="#8a6d2c" />
          </linearGradient>
          <radialGradient id="gemGrad" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor="#fff4d6" />
            <stop offset="0.45" stopColor="#e0c585" />
            <stop offset="1" stopColor="#c9a24b" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* base plinth + central post (static, connects scale to ground) */}
        <g stroke="url(#brassGrad)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M236 492 L364 492" strokeWidth="3" />
          <path d="M256 492 C256 476 344 476 344 492" strokeWidth="1.3" opacity="0.6" />
          {/* post rises to the pivot */}
          <path d={`M300 492 L300 ${PIVOT_Y}`} strokeWidth="3" />
          {/* finial above pivot */}
          <path d={`M300 ${PIVOT_Y} L300 ${PIVOT_Y - 30}`} strokeWidth="1.8" />
          <circle cx="300" cy={PIVOT_Y - 34} r="4.5" strokeWidth="1.5" />
        </g>

        {/* fulcrum glow gem (animated) sits exactly on the pivot */}
        <circle id="fulcrumGlow" cx={PIVOT_X} cy={PIVOT_Y} r="15" fill="url(#gemGrad)" filter="url(#soft)" opacity="0.5" />

        {/* BEAM — one group rotated about the pivot; pans are its CHILDREN */}
        <g id="beam">
          {/* the beam bar, centred on the pivot, attached to the post */}
          <line
            x1={PIVOT_X - ARM}
            y1={PIVOT_Y}
            x2={PIVOT_X + ARM}
            y2={PIVOT_Y}
            stroke="url(#brassGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* beam-end caps */}
          <circle cx={PIVOT_X - ARM} cy={PIVOT_Y} r="3.5" fill="none" stroke="url(#brassGrad)" strokeWidth="1.5" />
          <circle cx={PIVOT_X + ARM} cy={PIVOT_Y} r="3.5" fill="none" stroke="url(#brassGrad)" strokeWidth="1.5" />

          {/* pans positioned at the beam ends, in the beam's local frame */}
          <g transform={`translate(${PIVOT_X} ${PIVOT_Y})`}>
            <Pan id="panGroupL" dx={-ARM} />
            <Pan id="panGroupR" dx={ARM} />
          </g>
        </g>

        {/* pivot collar over the gem so the beam reads as pinned to the post */}
        <circle cx={PIVOT_X} cy={PIVOT_Y} r="6.5" fill="#0a0a0a" stroke="url(#brassGrad)" strokeWidth="2" />
        <circle cx={PIVOT_X} cy={PIVOT_Y} r="2.5" fill="#e0c585" />
      </svg>
    </div>
  );
}
