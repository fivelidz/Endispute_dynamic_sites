"use client";

/**
 * SpectrumMatrix — a proper, content-rich reinterpretation of Endispute's
 * "range of processes" diagram. Three modes (Facilitative → Advisory →
 * Determinative) form a continuum; each row shows its defining
 * CHARACTERISTICS and the example PROCESSES that live within it, with a
 * vertical spectrum rail running down the side. Palette-driven so each site
 * tints it to match. Rows reveal on scroll (reduced-motion safe).
 */
import { useEffect, useRef } from "react";
import { processSpectrum } from "@/lib/content";

type Theme = {
  ink: string;        // headings
  body: string;       // characteristic/example text
  muted: string;      // labels
  line: string;       // hairlines
  rail: string;       // the spectrum rail/arrow
  accentChar: string; // characteristics accent (mode marker)
  accentProc: string; // example-processes accent
  panel: string;      // row panel background
};

export default function SpectrumMatrix({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-row]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      rows.forEach((r) => r.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.25 }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const T = theme;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <style>{`
        .smx-row{ opacity:0; transform:translateY(18px); transition:opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .smx-row.in{ opacity:1; transform:none; }
        .smx-row[data-i="1"]{ transition-delay:.12s } .smx-row[data-i="2"]{ transition-delay:.24s }
        .smx-grid{ display:grid; grid-template-columns: 1fr; gap:0; }
        @media(min-width:760px){ .smx-grid{ grid-template-columns: 12.5rem 1fr 1fr; } }
        .smx-chip{ display:inline-block; }
      `}</style>

      {/* header rail label */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted }}>
          The range of processes
        </span>
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted, display: "flex", gap: "1.25rem" }}>
          <span style={{ color: T.accentChar }}>● characteristics</span>
          <span style={{ color: T.accentProc }}>● example processes</span>
        </span>
      </div>

      {/* the matrix with a continuum rail on the left */}
      <div style={{ position: "relative", borderTop: `1px solid ${T.line}` }}>
        {/* vertical spectrum rail */}
        <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${T.rail}, ${T.rail})`, opacity: 0.5 }} />

        {processSpectrum.map((m, i) => (
          <div
            key={m.mode}
            data-row
            data-i={i}
            className="smx-row"
            style={{ borderBottom: `1px solid ${T.line}`, padding: "1.6rem 0 1.6rem 1.5rem", position: "relative" }}
          >
            {/* rail node */}
            <span aria-hidden="true" style={{ position: "absolute", left: -5, top: "1.9rem", width: 12, height: 12, borderRadius: "50%", background: T.rail, boxShadow: `0 0 0 4px ${T.panel}` }} />
            <div className="smx-grid">
              {/* mode label */}
              <div style={{ paddingRight: "1rem", marginBottom: "0.6rem" }}>
                <h4 style={{ fontFamily: "var(--font-display, sans-serif)", fontWeight: 400, fontSize: "1.5rem", color: T.ink, lineHeight: 1.05 }}>
                  {m.mode}
                </h4>
                <p style={{ fontSize: "0.82rem", color: T.muted, marginTop: "0.45rem", lineHeight: 1.5, maxWidth: "22ch" }}>{m.blurb}</p>
              </div>

              {/* characteristics */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.45rem", paddingRight: "1.25rem" }}>
                {m.characteristics.map((c) => (
                  <li key={c} style={{ display: "flex", gap: "0.55rem", fontSize: "0.92rem", color: T.body, lineHeight: 1.45 }}>
                    <span aria-hidden="true" style={{ color: T.accentChar, flex: "none", marginTop: "0.05rem" }}>—</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              {/* example processes */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "0.5rem", alignContent: "flex-start" }}>
                {m.examples.map((p) => (
                  <li
                    key={p}
                    className="smx-chip"
                    style={{
                      fontSize: "0.8rem", color: T.body, lineHeight: 1.2,
                      border: `1px solid ${T.line}`, borderLeft: `2px solid ${T.accentProc}`,
                      borderRadius: 4, padding: "0.3rem 0.65rem", background: T.panel,
                    }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
