'use client';

import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { processSteps } from '@/lib/content';
import { staggerSlow, slideInLeft } from '@/lib/variants';

export default function ProcessSteps() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="process" className="py-24 lg:py-36 bg-[#fbf7f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="mb-20 max-w-2xl"
        >
          <p
            className="text-xs font-medium tracking-widest uppercase text-[#c25b4a] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            How It Works
          </p>
          <h2
            className="text-4xl lg:text-5xl font-semibold text-[#161614] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A managed process from{' '}
            <em className="text-[#0e4a4a]" style={{ fontStyle: 'italic' }}>
              start to resolution
            </em>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerSlow}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {/* Vertical connector line */}
          <div
            className="absolute left-[2.6rem] top-8 bottom-8 w-px bg-gradient-to-b from-[#0e4a4a]/30 via-[#c9a14a]/30 to-transparent hidden lg:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={slideInLeft}
                className="relative grid lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-10 items-start"
              >
                {/* Step number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#0e4a4a] flex items-center justify-center shadow-lg shadow-[#0e4a4a]/20 relative z-10">
                    <span
                      className="text-2xl font-semibold text-[#fbf7f0] tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Title + summary */}
                <div>
                  <h3
                    className="text-2xl lg:text-3xl font-semibold text-[#161614] mb-3 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#6b6560] leading-relaxed">{step.summary}</p>

                  {/* Mobile details */}
                  <ul className="mt-5 flex flex-col gap-2 lg:hidden">
                    {step.details.map((detail, di) => (
                      <li key={di} className="flex items-start gap-2.5 text-sm text-[#6b6560]">
                        <CheckCircle2 className="w-4 h-4 text-[#0e4a4a] mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Desktop details */}
                <ul className="hidden lg:flex flex-col gap-2.5">
                  {step.details.map((detail, di) => (
                    <motion.li
                      key={di}
                      initial={shouldReduce ? false : { opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{
                        delay: i * 0.1 + di * 0.06,
                        type: 'spring',
                        stiffness: 200,
                        damping: 25,
                      }}
                      className="flex items-start gap-2.5 text-sm text-[#6b6560]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0e4a4a] mt-0.5 flex-shrink-0" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
