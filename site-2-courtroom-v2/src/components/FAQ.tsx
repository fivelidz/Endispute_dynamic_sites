"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { faqs } from "@/lib/content";

type FAQItem = (typeof faqs)[number];

function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        layout: { type: "spring", stiffness: 80, damping: 20 },
        opacity: { duration: 0.5, delay: index * 0.09 },
        y: { duration: 0.5, delay: index * 0.09 },
      }}
      className={`border-b border-[#2e2e2e] transition-colors duration-200 ${
        isOpen ? "border-[#d4a14a]/30" : ""
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-start gap-6 py-7 text-left group"
      >
        <div className="flex gap-5 items-start">
          <span
            className="text-[10px] font-mono text-[#d4a14a]/50 shrink-0 pt-1 tabular-nums"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-base sm:text-lg font-medium text-[#f4eedf] group-hover:text-[#d4a14a] transition-colors duration-200 leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {faq.q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#d4a14a]/60 text-xl leading-none shrink-0 mt-0.5"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 80, damping: 20 },
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-10">
              <p className="text-[#c8bfa8] text-sm sm:text-base leading-relaxed max-w-3xl">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-28 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-16 pt-4 flex justify-between items-center">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            § Frequently Asked
          </span>
          <span
            className="text-[10px] font-mono text-[#c8bfa8]/30 tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            VII
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <h2
              className="text-[clamp(2.2rem,4vw,3.5rem)] font-light text-[#f4eedf] leading-[1.1]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Common <em className="text-[#d4a14a]">questions.</em>
            </h2>
            <p className="text-[#c8bfa8]/70 text-sm mt-6 leading-relaxed">
              Can't find your answer? Contact us directly for a complimentary
              consultation.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 text-sm text-[#d4a14a] hover:text-[#e0b660] transition-colors duration-200 font-mono group"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span>Contact us</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
          </motion.div>

          {/* Accordion */}
          <motion.div layout className="divide-y-0">
            {faqs.map((faq: FAQItem, i: number) => (
              <AccordionItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                inView={inView}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
