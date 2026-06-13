'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '@/lib/content';
import { Plus } from 'lucide-react';

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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 24 }}
      className="bento-cell overflow-hidden bg-white"
    >
      <button
        onClick={onToggle}
        data-cursor="grow"
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          <span className="font-mono-jb text-xs text-terracotta mt-0.5 flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold text-navy text-base leading-snug">{q}</span>
        </div>

        {/* Morphing plus → ✕ */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className={`flex-shrink-0 rounded-full p-1.5 transition-colors ${
            isOpen ? 'bg-navy text-paper' : 'bg-border text-ink'
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
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="ml-9 text-muted text-sm leading-relaxed border-t border-border pt-4">
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

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">

        {/* Left: heading */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono-jb text-xs text-terracotta uppercase tracking-widest mb-4"
          >
            FAQ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-ink leading-[1.15] mb-6"
          >
            Frequently asked{' '}
            <span className="font-serif-italic text-terracotta">questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm leading-relaxed"
          >
            Have more questions? Contact us for a complimentary one-hour
            consultation.
          </motion.p>

          {/* Decorative element */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 w-1 h-24 bg-gradient-to-b from-terracotta to-sage rounded-full origin-top"
          />
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
