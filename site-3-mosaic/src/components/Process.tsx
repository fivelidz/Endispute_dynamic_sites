'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { processSteps } from '@/lib/content';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;
const CARD_WIDTH = 340;
const CARD_GAP = 20;
const TOTAL_WIDTH = processSteps.length * (CARD_WIDTH + CARD_GAP);

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 28 });

  const maxDrag = -(TOTAL_WIDTH - (CARD_WIDTH + CARD_GAP * 2));

  const activeFromX = useTransform(springX, (val) => {
    const idx = Math.round(-val / (CARD_WIDTH + CARD_GAP));
    return Math.max(0, Math.min(processSteps.length - 1, idx));
  });

  activeFromX.on('change', (v) => setActiveStep(Math.round(v)));

  const goTo = (idx: number) => {
    x.set(-(idx * (CARD_WIDTH + CARD_GAP)));
    setActiveStep(idx);
  };

  return (
    <section id="process" className="py-24 overflow-hidden">
      <div className="px-6 md:px-8 max-w-6xl mx-auto mb-10">
        <div className="eyebrow text-sapphire mb-4">How we work</div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-3xl md:text-4xl font-bold text-fg leading-[1.12] tracking-[-0.02em] mb-4"
        >
          The process
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
          className="text-fg-2 text-[15px]"
        >
          Drag or click the dots to navigate through our 4-step process.
        </motion.p>
      </div>

      {/* Draggable timeline */}
      <div
        ref={containerRef}
        className="relative px-6 md:px-8 overflow-visible select-none"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.08}
          style={{ x: springX }}
          className="flex gap-5 drag-cursor w-max"
          whileDrag={{ cursor: 'grabbing' }}
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              onClick={() => goTo(i)}
              animate={{
                opacity: activeStep === i ? 1 : 0.55,
              }}
              transition={{ duration: 0.3, ease: EASE }}
              className={cn(
                'bento-cell flex-shrink-0 p-7 flex flex-col gap-4',
                activeStep === i ? 'bg-surface-2' : 'bg-surface'
              )}
              style={{ width: CARD_WIDTH, minHeight: 280 }}
            >
              <div
                className={cn(
                  'text-5xl font-bold leading-none tabular-nums',
                  activeStep === i ? 'text-sapphire' : 'text-surface-3'
                )}
              >
                {step.number}
              </div>

              <h3 className="font-semibold text-xl leading-snug text-fg">
                {step.title}
              </h3>

              <p
                className={cn(
                  'text-sm leading-relaxed',
                  activeStep === i ? 'text-fg-2' : 'text-muted'
                )}
              >
                {step.summary}
              </p>

              <motion.ul
                animate={{
                  opacity: activeStep === i ? 1 : 0,
                  height: activeStep === i ? 'auto' : 0,
                }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden space-y-2 mt-auto"
              >
                {step.details.map((d, di) => (
                  <li
                    key={di}
                    className="text-xs text-muted leading-relaxed flex gap-2"
                  >
                    <span className="text-sapphire mt-0.5 flex-shrink-0">—</span>
                    {d}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2.5 mt-8">
        {processSteps.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'transition-all duration-300 rounded-full',
              activeStep === i
                ? 'w-8 h-2.5 bg-sapphire'
                : 'w-2.5 h-2.5 bg-surface-3 hover:bg-muted'
            )}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>

      {/* Step labels */}
      <div className="flex justify-center gap-8 mt-4 px-4">
        {processSteps.map((step, i) => (
          <button
            key={step.number}
            onClick={() => goTo(i)}
            className={cn(
              'text-xs font-medium transition-colors hidden md:block',
              activeStep === i ? 'text-fg' : 'text-muted hover:text-fg-2'
            )}
          >
            {step.title.split(' ')[0]}
          </button>
        ))}
      </div>
    </section>
  );
}
