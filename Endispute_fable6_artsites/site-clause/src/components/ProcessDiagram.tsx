"use client";

import { useEffect, useRef } from "react";
import { conflictResolutionCategories } from "@/lib/content";

/**
 * ProcessDiagram — an engraved, manuscript-style figure illustrating
 * Endispute's dispute-resolution spectrum:
 *
 *   Facilitative  →  Advisory  →  Determinative
 *
 * Built as ink line-art on parchment: a long ruled baseline (the "spectrum
 * rule"), three nodes drawn as quill-circle / seal marks, an arc sweeping
 * across to show the rising involvement of the third party, serif labels and
 * a single rationed oxblood accent. Lines self-draw on scroll via
 * stroke-dashoffset; prefers-reduced-motion shows the finished figure.
 *
 * Content (category type + description) comes from content.ts — the single
 * source of truth — so the figure can never drift from the copy.
 */
export default function ProcessDiagram() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("pd-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("pd-in");
            io.unobserve(el);
          }
        }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // three evenly spaced nodes along the spectrum baseline
  const cats: ReadonlyArray<{ type: string; description: string }> =
    conflictResolutionCategories;
  const n = cats.length;
  const W = 1000;
  const baselineY = 250;
  const margin = 150;
  const span = W - margin * 2;
  const xs = cats.map((_, i) =>
    n <= 1 ? W / 2 : margin + (span * i) / (n - 1)
  );

  // a single sweeping arc rising left→right to suggest increasing third-party
  // involvement (facilitate → advise → determine)
  const arcStart = { x: margin, y: baselineY - 12 };
  const arcEnd = { x: W - margin, y: baselineY - 150 };
  const arcPath = `M ${arcStart.x} ${arcStart.y} C ${margin + span * 0.42} ${
    baselineY - 30
  }, ${margin + span * 0.6} ${baselineY - 150}, ${arcEnd.x} ${arcEnd.y}`;

  return (
    <svg
      ref={ref}
      className="process-diagram"
      viewBox={`0 0 ${W} 470`}
      role="img"
      aria-label="Endispute dispute-resolution spectrum: Facilitative to Advisory to Determinative, illustrating the third party's increasing role."
      preserveAspectRatio="xMidYMid meet"
    >
      {/* faint engraver's frame */}
      <rect
        className="pd-frame"
        x="14"
        y="14"
        width={W - 28}
        height={470 - 28}
        rx="3"
        fill="none"
      />

      {/* heading flourish at top */}
      <text className="pd-title" x={W / 2} y="62" textAnchor="middle">
        The spectrum of third-party involvement
      </text>
      <line className="pd-rule pd-rule-short" x1={W / 2 - 90} y1="80" x2={W / 2 + 90} y2="80" />

      {/* the long spectrum baseline (the "rule") with an arrowhead */}
      <line
        className="pd-rule pd-rule-main"
        x1={margin - 20}
        y1={baselineY}
        x2={W - margin + 20}
        y2={baselineY}
      />
      <path
        className="pd-arrow"
        d={`M ${W - margin + 8} ${baselineY - 7} L ${W - margin + 26} ${baselineY} L ${
          W - margin + 8
        } ${baselineY + 7}`}
        fill="none"
      />

      {/* the rising arc of involvement */}
      <path className="pd-arc" d={arcPath} fill="none" />

      {/* end labels for the arc meaning */}
      <text className="pd-axis" x={margin - 22} y={baselineY + 86} textAnchor="start">
        assist the process
      </text>
      <text className="pd-axis" x={W - margin + 22} y={baselineY - 168} textAnchor="end">
        decide the outcome
      </text>

      {/* nodes + labels */}
      {cats.map((c, i) => {
        const x = xs[i];
        const isAdvisory = i === 1;
        // alternate label placement: outer ones below, centre above the arc
        const labelAbove = isAdvisory;
        const labelY = labelAbove ? baselineY - 196 : baselineY + 58;
        const descY = labelAbove ? baselineY - 168 : baselineY + 86;
        return (
          <g key={c.type} className="pd-node" style={{ ["--pd-i" as string]: i }}>
            {/* tick from baseline */}
            <line
              className="pd-tick"
              x1={x}
              y1={baselineY}
              x2={x}
              y2={labelAbove ? baselineY - 150 : baselineY + 26}
            />
            {/* the seal/quill node */}
            <circle className="pd-dot-outer" cx={x} cy={baselineY} r="17" fill="none" />
            <circle className="pd-dot-inner" cx={x} cy={baselineY} r="6" />
            {/* roman numeral inside-ish */}
            <text className="pd-num" x={x} y={baselineY - 30} textAnchor="middle">
              {["I", "II", "III"][i] ?? String(i + 1)}
            </text>

            {/* category name */}
            <text
              className="pd-label"
              x={x}
              y={labelY}
              textAnchor="middle"
            >
              {c.type}
            </text>
            {/* a short, wrapped gloss of the description */}
            <GlossText
              text={shortGloss(c.description)}
              x={x}
              y={descY}
              up={labelAbove}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* keep the first descriptive sentence, trimmed, for the figure caption gloss */
function shortGloss(desc: string): string {
  const firstSentence = desc.split(".")[0] ?? desc;
  return firstSentence.replace(/\s+/g, " ").trim();
}

/* tiny manual SVG word-wrapper so descriptions read like an engraved caption */
function GlossText({
  text,
  x,
  y,
  up,
}: {
  text: string;
  x: number;
  y: number;
  up: boolean;
}) {
  const maxChars = 30;
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  const clipped = lines.slice(0, 3);
  const lh = 17;
  // when placed above the arc, stack lines upward
  const start = up ? y - (clipped.length - 1) * lh : y;
  return (
    <>
      {clipped.map((ln, idx) => (
        <text
          key={idx}
          className="pd-desc"
          x={x}
          y={start + idx * lh}
          textAnchor="middle"
        >
          {ln}
        </text>
      ))}
    </>
  );
}
