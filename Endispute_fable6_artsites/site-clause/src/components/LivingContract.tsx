"use client";

/**
 * LivingContract — the centerpiece art.
 *
 * A warm parchment "document" that writes, signs and resolves itself:
 *   • Clause-by-clause reveal — legal-style clauses fade/slide in line by line
 *     (Endispute copy adapted into WHEREAS / IT IS RESOLVED clause form).
 *   • A self-drawing SIGNATURE — an animated stroke-dashoffset handwritten
 *     path that draws itself, and re-draws on hover/click of the signature line.
 *   • A WAX SEAL that presses in (scale + fade) when the sheet enters view.
 *   • Gentle page-lift parallax on scroll (small, grounded).
 *
 * Honors prefers-reduced-motion (CSS shows it fully written & signed, static)
 * and uses no per-frame setState — parallax is rAF + transform only.
 */

import { useEffect, useRef, useState } from "react";

const CLAUSES = [
  {
    no: "RECITAL",
    text:
      "WHEREAS the parties seek to resolve a complex commercial dispute out of court, in confidence, and with their relationship intact —",
    drop: true,
  },
  {
    no: "ART. I",
    text:
      "Endispute is a leading provider of dispute resolution, dispute advisory and dispute management services in respect of complex disputes.",
  },
  {
    no: "ART. II",
    text:
      "The processes are tailored to the needs of industry, commercial corporations and all who do business with them — within Australia and internationally.",
  },
  {
    no: "ART. III",
    text:
      "IT IS RESOLVED THAT a professional approach be adopted, and that a highly regarded Panel and effective process be employed to finalise the matter.",
  },
];

export default function LivingContract() {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [sigKey, setSigKey] = useState(0); // re-mount the signature to replay the draw

  // gentle page-lift parallax — rAF + transform, no setState
  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let ticking = false;
    const apply = () => {
      const y = window.scrollY;
      const lift = Math.max(-14, Math.min(0, -y * 0.018));
      el.style.transform = `translateY(${lift}px)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(apply);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={sheetRef}
      className="sheet ruled rise w-full p-8 md:p-12 will-change-transform"
      style={{ transition: "transform .2s linear, opacity .9s cubic-bezier(.22,1,.36,1)" }}
    >
      {/* document head */}
      <div className="flex items-center justify-between border-b border-[var(--color-rule)] pb-5">
        <span className="label">Deed of Resolution</span>
        <span className="label">In Confidence</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="display text-[1.7rem] md:text-[2rem]" style={{ fontWeight: 400 }}>
          Endispute
        </span>
        <span className="label text-[0.56rem]">No. 001 · Folio I</span>
      </div>

      {/* clauses type in, line by line */}
      <div className="mt-7 space-y-6">
        {CLAUSES.map((c, i) => (
          <div key={c.no} className="clause-line flex gap-5" data-l={i}>
            <span className="clause-no shrink-0 pt-[0.35rem] text-[0.66rem] w-[3.6rem]">
              {c.no}
            </span>
            <p
              className={`text-[1.08rem] md:text-[1.18rem] leading-[1.62] text-[var(--color-ink-soft)] ${
                c.drop ? "dropcap" : ""
              }`}
            >
              {c.text}
            </p>
          </div>
        ))}
      </div>

      <div className="hair-gold mt-8" />

      {/* execution block: signature + wax seal */}
      <div className="mt-7 flex items-end justify-between gap-6 flex-wrap">
        <button
          type="button"
          className="sig-wrap group text-left bg-transparent border-0 cursor-pointer p-0"
          onClick={() => setSigKey((k) => k + 1)}
          aria-label="Replay the signature"
        >
          <svg
            key={sigKey}
            viewBox="0 0 260 90"
            className="block w-[230px] md:w-[290px] h-auto overflow-visible"
            aria-hidden="true"
          >
            {/* handwritten-style flourish — a single continuous path */}
            <path
              className="sig-path"
              style={{ ["--sig-len" as string]: "640" }}
              d="M8 64 C 22 30, 34 20, 42 34 C 50 48, 40 70, 52 70 C 66 70, 70 24, 82 24
                 C 92 24, 86 66, 98 66 C 112 66, 120 18, 132 34 C 140 46, 128 64, 140 64
                 C 156 64, 162 28, 178 34 C 192 39, 184 60, 200 56 C 224 50, 232 36, 252 42"
            />
          </svg>
          <span className="block mt-1 label text-[0.6rem] border-t border-[var(--color-rule)] pt-2 w-[230px] md:w-[290px] group-hover:text-[var(--color-oxblood)] transition-colors">
            Endispute · signed on resolution
          </span>
        </button>

        {/* wax seal — presses in */}
        <div className="seal shrink-0" aria-hidden="true">
          <svg viewBox="0 0 96 96" className="w-[88px] h-[88px] md:w-[104px] md:h-[104px]">
            <circle cx="48" cy="48" r="44" fill="var(--color-oxblood)" />
            <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="2" />
            <circle
              cx="48"
              cy="48"
              r="35"
              fill="none"
              stroke="rgba(251,249,243,0.55)"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
            <text
              x="48"
              y="44"
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize="26"
              fill="var(--color-parchment-light)"
              fontWeight="500"
            >
              E
            </text>
            <text
              x="48"
              y="62"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="6.5"
              letterSpacing="1.5"
              fill="rgba(251,249,243,0.75)"
            >
              RESOLVED
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
