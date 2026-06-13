"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { panels, clients } from "@/lib/content";

export default function Seal() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-5xl px-5 py-20">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="smallcaps text-[15px] text-[#a8842c]"
          >
            The panel
          </motion.p>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-2 font-garamond text-3xl font-500 text-[#2b2118] md:text-4xl"
          >
            Specialist experts &amp; appointed advisors
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-garamond text-lg leading-relaxed text-[#2b2118]"
          >
            {panels.intro}
          </motion.p>

          {/* Expertise list as small-caps separated by ✦ */}
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 leading-loose"
          >
            {panels.expertise.map((e, i) => (
              <Fragment key={e}>
                <span className="smallcaps text-[14px] text-[#7a6a55]">{e}</span>
                {i < panels.expertise.length - 1 && (
                  <span className="mx-2 text-[#a8842c]">✦</span>
                )}
              </Fragment>
            ))}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 font-garamond text-base italic leading-relaxed text-[#7a6a55]"
          >
            {panels.expertNote}
          </motion.p>
        </div>

        {/* THE WAX SEAL */}
        <motion.div
          initial={reduce ? false : { scale: 0, opacity: 0, rotate: -25 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 130, damping: 12, delay: 0.2 }}
          className="mx-auto"
        >
          <div className="relative flex h-[160px] w-[160px] items-center justify-center rounded-full bg-[#9e3b2b] text-[#f7f1e3] shadow-[0_4px_14px_rgba(43,33,24,0.35)] outline outline-2 outline-offset-[5px] outline-[#9e3b2b]/45">
            <div className="flex h-[140px] w-[140px] flex-col items-center justify-center rounded-full border border-[#f7f1e3]/55 text-center">
              <span className="smallcaps text-[13px] leading-tight tracking-[0.18em] text-[#f7f1e3]/85">
                NBN
              </span>
              <span className="my-1 font-garamond text-base font-600 leading-tight">
                Resolution
                <br />
                Advisor
              </span>
              <span className="smallcaps text-[12px] tracking-[0.2em] text-[#f7f1e3]/80">
                Est. 2014
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured client note */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mt-14 border-t border-[#7a6a55]/30 pt-8 text-center"
      >
        <p className="smallcaps text-[14px] text-[#a8842c]">
          {clients.featured.relation}
        </p>
        <p className="mx-auto mt-2 max-w-2xl font-garamond text-lg leading-relaxed text-[#2b2118]">
          {clients.featured.detail}
        </p>
        <p className="mt-3 font-garamond text-base italic text-[#7a6a55]">
          {clients.privacy}
        </p>
      </motion.div>
    </section>
  );
}
