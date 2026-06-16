"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react";
import { team, inMemoriam } from "@/lib/content";

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  // Parallax scroll for the portrait
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1.08, 1.0]);
  const yImg = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["-4%", "4%"]);

  const tania = team[0];

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-28 bg-[#1c1c1c] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-16 pt-4 flex justify-between items-center">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            § Leadership
          </span>
          <span
            className="text-[10px] font-mono text-[#c8bfa8]/30 tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            VI
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-start">
          {/* Left: Photo with parallax */}
          <div
            ref={imgRef}
            className="relative overflow-hidden aspect-[3/4] bg-[#0a0a0a]"
          >
            {/* The portrait itself is ALWAYS visible — never gated behind an
                opacity:0 / useInView wrapper (that could leave it invisible if
                the observer didn't fire). Only the gentle parallax scale/shift
                is applied. Eager <img> for instant, reliable rendering under
                static export on a subpath. */}
            <motion.div
              className="absolute inset-0"
              style={{ scale, y: yImg }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tania.photo}
                alt={`Portrait of ${tania.name}`}
                loading="eager"
                decoding="async"
                data-darkreader-ignore=""
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </motion.div>

            {/* Overlay gradient at bottom — purely decorative, never covers
                the face, and can't intercept the image. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a]/85 to-transparent"
            />

            {/* Role label on image */}
            <div className="absolute bottom-8 left-8 right-8">
              <span
                className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a] block mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {tania.role}
              </span>
              <p
                className="text-2xl font-light text-[#f4eedf] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tania.name}
              </p>
            </div>
          </div>

          {/* Right: Bio and credentials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p
              className="text-lg text-[#c8bfa8] leading-relaxed mb-6 italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{tania.short}&rdquo;
            </p>
            <p className="text-[#c8bfa8]/70 text-sm leading-relaxed mb-10">
              {tania.bio}
            </p>

            {/* Credentials */}
            <div>
              <h3
                className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4a14a] mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Credentials &amp; Appointments
              </h3>
              <ul className="space-y-3">
                {tania.credentials.map((cred, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                    className="flex gap-4 items-start text-sm text-[#c8bfa8]/80"
                  >
                    <span
                      className="text-[#d4a14a]/60 shrink-0 font-mono mt-0.5"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      —
                    </span>
                    <span>{cred}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* In Memoriam */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 border border-[#8b2e2e]/40 bg-[#8b2e2e]/5 p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#8b2e2e]" aria-hidden="true" />
          <div className="pl-6">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8b2e2e] block mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ✦ In Memoriam
            </span>
            <h3
              className="text-2xl font-light text-[#f4eedf] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {inMemoriam.name}
            </h3>
            <p
              className="text-sm font-mono text-[#c8bfa8]/50 mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {inMemoriam.years}
            </p>
            <p
              className="text-[#c8bfa8] text-base leading-relaxed max-w-2xl italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{inMemoriam.note}&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
