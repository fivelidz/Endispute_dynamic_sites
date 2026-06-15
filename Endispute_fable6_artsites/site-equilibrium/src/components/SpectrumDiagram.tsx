"use client";

/**
 * SpectrumDiagram — a clean, themed SVG of Endispute's resolution spectrum:
 * Facilitative → Advisory → Determinative, drawn as a gradient spine with three
 * labelled nodes. Replaces the off-theme bitmap diagram. Palette-driven so each
 * site can tint it to match. The line draws in on scroll (reduced-motion safe).
 */
import { useEffect, useRef } from "react";
import { conflictResolutionCategories as cats } from "@/lib/content";

export default function SpectrumDiagram({
  ink = "#ffffff",
  muted = "#9a9a9a",
  c1 = "#8052ff",
  c2 = "#ffb829",
  c3 = "#15846e",
  surface = "transparent",
}: {
  ink?: string;
  muted?: string;
  c1?: string;
  c2?: string;
  c3?: string;
  surface?: string;
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = el.querySelectorAll<SVGPathElement | SVGLineElement>("[data-draw]");
    if (reduce || !("IntersectionObserver" in window)) {
      paths.forEach((p) => p.classList.add("drawn"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { paths.forEach((p) => p.classList.add("drawn")); io.disconnect(); } }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cols = [c1, c2, c3];
  const xs = [120, 400, 680];

  return (
    <svg
      ref={ref}
      viewBox="0 0 800 420"
      role="img"
      aria-label="Endispute resolution spectrum: Facilitative, Advisory, Determinative"
      style={{ width: "100%", height: "auto", background: surface, borderRadius: 16 }}
    >
      <style>{`
        [data-draw]{ stroke-dasharray: 1; stroke-dashoffset: 1; }
        .spec-line{ stroke-dasharray: 600; stroke-dashoffset: 600; transition: stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1); }
        .spec-line.drawn{ stroke-dashoffset: 0; }
        .spec-node{ opacity: 0; transform: scale(.6); transform-origin: center; transition: opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1); }
        .spec-node.drawn{ opacity: 1; transform: scale(1); }
      `}</style>

      <defs>
        <linearGradient id="specgrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c1} />
          <stop offset="50%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
      </defs>

      {/* eyebrow */}
      <text x="120" y="60" fill={muted} fontSize="15" letterSpacing="3" fontFamily="var(--font-body, sans-serif)">
        THE FULL SPECTRUM
      </text>

      {/* the spine */}
      <line x1="120" y1="150" x2="680" y2="150" stroke="url(#specgrad)" strokeWidth="2" className="spec-line" data-draw />
      {/* arrowhead */}
      <path d="M680 150 l-12 -6 v12 z" fill={c3} className="spec-node" data-draw style={{ transitionDelay: "1.2s" }} />

      {/* three nodes */}
      {cats.map((cat, i) => (
        <g key={cat.type} className="spec-node" data-draw style={{ transitionDelay: `${0.3 + i * 0.25}s` }}>
          <circle cx={xs[i]} cy={150} r="9" fill={cols[i]} />
          <circle cx={xs[i]} cy={150} r="16" fill="none" stroke={cols[i]} strokeOpacity="0.4" strokeWidth="1" />
          <text x={xs[i]} y={120} fill={ink} fontSize="22" textAnchor="middle" fontFamily="var(--font-display, sans-serif)" fontWeight="400">
            {cat.type}
          </text>
          <text x={xs[i]} y={150 + 44} textAnchor="middle" fill={muted} fontSize="12.5" fontFamily="var(--font-body, sans-serif)">
            {cat.type === "Facilitative" ? "assist the process" : cat.type === "Advisory" ? "advise on outcomes" : "decide the matter"}
          </text>
        </g>
      ))}

      {/* gloss line */}
      <text x="400" y="330" textAnchor="middle" fill={muted} fontSize="13.5" fontFamily="var(--font-body, sans-serif)">
        Each matter is matched to the process that resolves it with the least cost to the relationship.
      </text>
    </svg>
  );
}
