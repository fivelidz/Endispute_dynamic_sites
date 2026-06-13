'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'motion/react';
import { processSteps } from '@/lib/content';
import { cn } from '@/lib/cn';

const CARD_WIDTH = 340;
const CARD_GAP = 20;
const TOTAL_WIDTH = processSteps.length * (CARD_WIDTH + CARD_GAP);

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 28 });

  const maxDrag = -(TOTAL_WIDTH - (CARD_WIDTH + CARD_GAP * 2));

  // Map x position to active step index
  const activeFromX = useTransform(springX, (val) => {
    const idx = Math.round((-val) / (CARD_WIDTH + CARD_GAP));
    return Math.max(0, Math.min(processSteps.length - 1, idx));
  });

  activeFromX.on('change', (v) => setActiveStep(Math.round(v)));

  const goTo = (idx: number) => {
    x.set(-(idx * (CARD_WIDTH + CARD_GAP)));
    setActiveStep(idx);
  };

  return (
    <section id="process" className="py-24 overflow-hidden">
      <div className="px-4 md:px-8 max-w-7xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono-jb text-xs text-terracotta uppercase tracking-widest mb-4"
        >
          How we work
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-ink leading-[1.15] mb-4"
        >
          The{' '}
          <span className="font-serif-italic text-terracotta">process</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm"
        >
          Drag or click the dots to navigate through our 4-step process.
        </motion.p>
      </div>

      {/* Draggable timeline */}
      <div
        ref={containerRef}
        className="relative px-4 md:px-8 overflow-visible select-none"
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
                scale: activeStep === i ? 1 : 0.95,
                opacity: activeStep === i ? 1 : 0.65,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className={cn(
                'bento-cell flex-shrink-0 p-7 flex flex-col gap-4',
                activeStep === i ? 'bg-navy' : 'bg-white'
              )}
              style={{ width: CARD_WIDTH, minHeight: 280 }}
              data-cursor="grow"
            >
              {/* Number */}
              <div
                className={cn(
                  'font-mono-jb text-5xl font-bold leading-none',
                  activeStep === i ? 'text-[#c46442]' : 'text-[#c8cdd6]'
                )}
              >
                {step.number}
              </div>

              {/* Title */}
              <h3
                className={cn(
                  'font-bold text-xl leading-snug',
                  activeStep === i ? 'text-paper' : 'text-ink'
                )}
              >
                {step.title}
              </h3>

              {/* Summary */}
              <p
                className={cn(
                  'text-sm leading-relaxed',
                  activeStep === i ? 'text-paper/70' : 'text-muted'
                )}
              >
                {step.summary}
              </p>

              {/* Details list (only active) */}
              <motion.ul
                animate={{
                  opacity: activeStep === i ? 1 : 0,
                  height: activeStep === i ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden space-y-2 mt-auto"
              >
                {step.details.map((d, di) => (
                  <li
                    key={di}
                    className="text-xs text-[#c8bfb0] leading-relaxed flex gap-2"
                  >
                    <span className="text-terracotta mt-0.5 flex-shrink-0">—</span>
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
            data-cursor="grow"
            className={cn(
              'transition-all duration-300 rounded-full',
              activeStep === i
                ? 'w-8 h-2.5 bg-navy'
                : 'w-2.5 h-2.5 bg-border hover:bg-muted'
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
              activeStep === i ? 'text-navy' : 'text-muted hover:text-ink'
            )}
          >
            {step.title.split(' ')[0]}
          </button>
        ))}
      </div>
    </section>
  );
}
