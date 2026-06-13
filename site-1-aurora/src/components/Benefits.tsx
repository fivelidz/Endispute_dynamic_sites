'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, Users, Clock, Target, Award } from 'lucide-react';
import { benefits } from '@/lib/content';
import { fadeUpContainer, fadeUpItem } from '@/lib/variants';

const icons = [ShieldCheck, Users, Clock, Target, Award];

const gridClasses = [
  'lg:col-span-2 lg:row-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
];

export default function Benefits() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="services" className="py-24 lg:py-36 bg-[#0e4a4a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="mb-16"
        >
          <p
            className="text-xs font-medium tracking-widest uppercase text-[#c9a14a] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Why Choose Endispute
          </p>
          <h2
            className="text-4xl lg:text-5xl font-semibold text-[#fbf7f0] max-w-2xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Resolution that protects what{' '}
            <em className="text-[#c9a14a]" style={{ fontStyle: 'italic' }}>
              matters most
            </em>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={fadeUpContainer}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
        >
          {benefits.map((benefit, i) => {
            const Icon = icons[i] ?? Award;
            const isLarge = i === 0;

            return (
              <motion.div
                key={i}
                variants={fadeUpItem}
                whileHover={
                  shouldReduce
                    ? {}
                    : {
                        y: -4,
                        boxShadow: '0 20px 40px rgba(201,161,74,0.15)',
                        borderColor: 'rgba(201,161,74,0.4)',
                      }
                }
                className={`${gridClasses[i]} relative rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col justify-between overflow-hidden cursor-default`}
                style={{ transition: 'box-shadow 0.25s, border-color 0.25s, transform 0.25s' }}
              >
                {isLarge && (
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, #c9a14a 0%, transparent 70%)',
                      transform: 'translate(30%, -30%)',
                    }}
                  />
                )}

                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#c9a14a]/15 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#c9a14a]" />
                  </div>
                  <h3
                    className={`font-semibold text-[#fbf7f0] mb-3 ${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl'}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{benefit.detail}</p>
                </div>

                <div className="mt-6 w-2 h-2 rounded-full bg-[#c9a14a]/40" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
