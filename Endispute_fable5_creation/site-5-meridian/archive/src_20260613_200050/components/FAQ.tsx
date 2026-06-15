"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import Node from "./Node";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="border-b border-[#232c48]"
    >
      <button
        id={buttonId}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
      >
        <span className="block h-2 w-2 shrink-0 rounded-full bg-[#b8c0d4]" />
        <span className="flex-1 font-serif text-lg font-medium text-[#e8ecf4] sm:text-xl">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#8a93a8]"
        >
          <Plus size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-6 text-[15px] leading-relaxed text-[#b8c0d4]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl lg:pl-[8%]">
        <Node label="06 — Questions" className="mb-8" />
        <h2 className="font-serif text-4xl font-light leading-tight tracking-tight text-[#e8ecf4] sm:text-5xl">
          Frequently asked <span className="italic text-[#d4a843]">questions.</span>
        </h2>

        <div className="mt-12 max-w-4xl">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
