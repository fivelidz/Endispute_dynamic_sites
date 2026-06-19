"use client";

/**
 * SpectrumMatrix — a structured, responsive reinterpretation of Endispute's
 * "range of processes" diagram (previously a flat PNG). Three modes
 * (Facilitative → Advisory → Determinative) form a continuum; each row shows
 * its defining CHARACTERISTICS and the example PROCESSES that live within it,
 * with a vertical spectrum rail running down the side.
 *
 * Themed for the Courtroom site: dark panels, gold rail/characteristics accent,
 * cream ink. Rows reveal on scroll via Motion (reduced-motion safe).
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { processSpectrum } from "@/lib/content";

// Courtroom palette
const INK = "#f4eedf";
const BODY = "#c8bfa8";
const MUTED = "#9c937e";
const LINE = "#2e2e2e";
const GOLD = "#d4a14a"; // characteristics accent + rail
const PROC = "#c98a3a"; // example-processes accent (slightly deeper gold)
const PANEL = "#0a0a0a"; // node halo background

export default function SpectrumMatrix() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="relative">
      {/* header rail label */}
      <div className="flex items-baseline justify-between mb-4 gap-4 flex-wrap">
        <span
          className="text-[10px] font-mono uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: MUTED }}
        >
          The range of processes
        </span>
        <span
          className="text-[10px] font-mono uppercase tracking-[0.16em] flex gap-5"
          style={{ fontFamily: "var(--font-mono)", color: MUTED }}
        >
          <span style={{ color: GOLD }}>● characteristics</span>
          <span style={{ color: PROC }}>● example processes</span>
        </span>
      </div>

      {/* the matrix with a continuum rail on the left */}
      <div className="relative" style={{ borderTop: `1px solid ${LINE}` }}>
        {/* vertical spectrum rail */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-px sm:w-0.5"
          style={{ background: GOLD, opacity: 0.45 }}
        />

        {processSpectrum.map((m, i) => (
          <motion.div
            key={m.mode}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
            style={{ borderBottom: `1px solid ${LINE}`, padding: "1.6rem 0 1.6rem 1.5rem" }}
          >
            {/* rail node */}
            <span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                left: -5,
                top: "1.9rem",
                width: 11,
                height: 11,
                background: GOLD,
                boxShadow: `0 0 0 4px ${PANEL}`,
              }}
            />

            <div className="smx-grid">
              {/* mode label */}
              <div className="pr-4 mb-3 md:mb-0">
                <h4
                  className="text-2xl font-light leading-tight"
                  style={{ fontFamily: "var(--font-display)", color: INK }}
                >
                  {m.mode}
                </h4>
                <p
                  className="text-[0.82rem] mt-2 leading-relaxed"
                  style={{ color: MUTED, maxWidth: "24ch" }}
                >
                  {m.blurb}
                </p>
              </div>

              {/* characteristics */}
              <ul className="list-none m-0 p-0 flex flex-col gap-2 pr-0 md:pr-5">
                {m.characteristics.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2.5 text-[0.92rem] leading-snug"
                    style={{ color: BODY }}
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-0.5 font-mono"
                      style={{ color: GOLD, fontFamily: "var(--font-mono)" }}
                    >
                      —
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              {/* example processes */}
              <ul className="list-none m-0 p-0 flex flex-wrap gap-2 content-start mt-4 md:mt-0">
                {m.examples.map((p) => (
                  <li
                    key={p}
                    className="text-[0.8rem] leading-tight"
                    style={{
                      color: BODY,
                      border: `1px solid ${LINE}`,
                      borderLeft: `2px solid ${PROC}`,
                      borderRadius: 4,
                      padding: "0.3rem 0.65rem",
                      background: "rgba(10,10,10,0.6)",
                    }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* responsive grid: stacked on mobile, 3-col on >= md */}
      <style jsx>{`
        .smx-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 768px) {
          .smx-grid {
            grid-template-columns: 13rem 1fr 1fr;
            gap: 0 1.5rem;
            align-items: start;
          }
        }
      `}</style>
    </div>
  );
}
