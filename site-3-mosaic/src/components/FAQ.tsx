'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '@/lib/content';
import { Plus } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

function FAQItem({
  q,
  a,
  index,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: EASE }}
      className="bento-cell overflow-hidden bg-surface"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          <span className="text-xs text-sapphire mt-0.5 flex-shrink-0 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold text-fg text-base leading-snug">{q}</span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={`flex-shrink-0 rounded-full p-1.5 transition-colors ${
            isOpen ? 'bg-sapphire text-fg' : 'bg-surface-3 text-fg-2'
          }`}
        >
          <Plus size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="ml-9 text-fg-2 text-sm leading-relaxed border-t border-line pt-4">
                {a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">

        {/* Left: heading */}
        <div className="md:col-span-1">
          <div className="eyebrow text-sapphire mb-4">FAQ</div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-2xl md:text-3xl font-bold text-fg leading-[1.12] tracking-[-0.02em] mb-6"
          >
            Frequently asked questions
          </motion.h2>

          <p className="text-fg-2 text-sm leading-relaxed">
            Have more questions? Contact us for a complimentary one-hour
            consultation.
          </p>

          <div className="mt-8 w-1 h-24 bg-sapphire rounded-full" />
        </div>

        {/* Right: accordion */}
        <div className="md:col-span-2 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
