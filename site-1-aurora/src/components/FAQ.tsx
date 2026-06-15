'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/lib/content';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, index, isOpen, onToggle }: FAQItemProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: index * 0.07,
        type: 'spring' as const,
        stiffness: 200,
        damping: 25,
      }}
      className="border-b border-[#e3e4e8] last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="text-lg font-medium text-[#011821] group-hover:text-[#111a4a] transition-colors leading-snug"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-[#111a4a]/8 flex items-center justify-center text-[#111a4a]"
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-6 pr-12">
              <p className="text-[#7c7f88] leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-12">
          {/* Left: label + heading */}
          <div className="lg:sticky lg:top-24 self-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xs font-medium tracking-widest uppercase text-[#ec652b] mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Common Questions
              </p>
              <h2
                className="text-3xl lg:text-[40px] font-medium text-[#011821] leading-tight mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Everything you need{' '}
                <em className="text-[#111a4a]" style={{ fontStyle: 'italic' }}>
                  to know
                </em>
              </h2>
              <p className="text-[#7c7f88] leading-relaxed">
                Have more questions? Reach out — we respond{' '}
                <span className="text-[#111a4a] font-medium">promptly</span>.
              </p>
            </motion.div>
          </div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
