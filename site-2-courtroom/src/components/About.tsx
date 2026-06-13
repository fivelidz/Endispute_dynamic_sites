"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { company, benefits } from "@/lib/content";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 lg:py-36 bg-[#0a0a0a]"
    >
      {/* Horizontal rule top */}
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-16 flex justify-between items-center pt-4">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            § About
          </span>
          <span
            className="text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/40"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            II
          </span>
        </div>

        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Left: Pull-quote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote
              className="text-[clamp(1.9rem,4vw,3.4rem)] font-light italic leading-[1.2] text-[#f4eedf]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[#d4a14a] text-[4rem] leading-none mr-1 align-top">&ldquo;</span>
              {company.mission}
            </blockquote>

            {/* Decorative vertical rule */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="origin-top w-px bg-[#d4a14a] h-16 mt-10"
            />
          </motion.div>

          {/* Right: Body content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[#c8bfa8] text-lg leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {company.about}
            </p>

            <p
              className="text-[#c8bfa8] text-base leading-relaxed mb-12"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {company.whoWeAre}
            </p>

            {/* Benefits grid */}
            <div className="space-y-0">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="border-b border-[#2e2e2e] py-5 grid grid-cols-[auto_1fr] gap-5 items-start"
                >
                  <span
                    className="text-[10px] font-mono text-[#d4a14a]/70 pt-1 tabular-nums"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[#f4eedf] font-medium text-sm mb-1">
                      {benefit.title}
                    </p>
                    <p className="text-[#c8bfa8]/70 text-sm">
                      {benefit.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
