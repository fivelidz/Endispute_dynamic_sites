"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { company, contact, stats } from "@/lib/content";

// Word-by-word kinetic typography
function KineticHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.1 + i * 0.12,
          }}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Scramble-style counter
function ScrambleCounter({
  target,
  label,
  reducedMotion,
}: {
  target: string;
  label: string;
  reducedMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState(reducedMotion ? target : "---");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!inView || reducedMotion) {
      setDisplayed(target);
      return;
    }

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+%";
    let frame = 0;
    const totalFrames = 28;

    intervalRef.current = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplayed(target);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      const scrambled = target
        .split("")
        .map((char) => {
          if (char === " " || char === "'" || char === "'") return char;
          if (frame > totalFrames * 0.7) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplayed(scrambled);
    }, 40);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inView, target, reducedMotion]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-2xl sm:text-3xl font-mono font-medium text-[#d4a14a] tabular-nums tracking-tight"
        style={{ fontFamily: "var(--font-mono)", minWidth: "6ch" }}
      >
        {displayed}
      </div>
      <div className="text-[11px] text-[#c8bfa8] uppercase tracking-widest mt-1 font-body">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f4eedf 1px, transparent 1px),
            linear-gradient(to bottom, #f4eedf 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Oxblood vertical rule */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-[#8b2e2e] opacity-60"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-32 pb-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="text-[11px] uppercase tracking-[0.22em] text-[#d4a14a] font-mono"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {company.tagline}
          </span>
          <span className="cursor-blink" aria-hidden="true" />
        </motion.div>

        {/* Main heading */}
        <h1
          className="mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <div className="text-[clamp(3rem,8vw,7rem)] font-light leading-[1.0] text-[#f4eedf] overflow-hidden">
            {reducedMotion ? (
              <span>End Your Dispute.</span>
            ) : (
              <>
                <KineticHeading text="End Your" />
                <br />
                {/* "Endispute" — gold italic, larger */}
                <motion.span
                  initial={{ y: 70, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    delay: 0.45,
                  }}
                  className="inline-block italic text-[#d4a14a] text-[clamp(3.5rem,9.5vw,8.5rem)]"
                >
                  Endispute.
                </motion.span>
              </>
            )}
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#c8bfa8] text-lg sm:text-xl max-w-2xl leading-relaxed mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {company.whatWeDo}
        </motion.p>

        {/* Working with us line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-[#c8bfa8]/70 text-sm max-w-xl mb-12 border-l-2 border-[#d4a14a]/40 pl-4 italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {company.workingWithUs}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-[#d4a14a] text-[#0a0a0a] font-semibold text-sm tracking-wide hover:bg-[#e0b660] transition-colors duration-200"
          >
            Book Your Free Consultation
          </a>
          <a
            href="#process"
            className="px-8 py-4 border border-[#3a3a3a] text-[#c8bfa8] font-medium text-sm tracking-wide hover:border-[#d4a14a] hover:text-[#d4a14a] transition-all duration-200"
          >
            Our Process →
          </a>
        </motion.div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="border-t border-[#2e2e2e] pt-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <ScrambleCounter
                key={stat.label}
                target={stat.value}
                label={stat.label}
                reducedMotion={reducedMotion ?? false}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-[10px] font-mono text-[#c8bfa8]/50 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[#d4a14a]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
