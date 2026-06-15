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
    <section id="services" className="py-16 lg:py-24 bg-[#111a4a]">
      <div className="container-x">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p
            className="text-xs font-medium tracking-widest uppercase text-[#ec652b] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Why Choose Endispute
          </p>
          <h2
            className="text-3xl lg:text-[40px] font-medium text-[#f6f6f8] max-w-2xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Resolution that protects what{' '}
            <em className="text-[#ec652b]" style={{ fontStyle: 'italic' }}>
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
                        boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
                        borderColor: 'rgba(236,101,43,0.4)',
                      }
                }
                className={`${gridClasses[i]} relative rounded-lg border border-white/10 bg-white/5 p-8 flex flex-col justify-between overflow-hidden cursor-default`}
                style={{ transition: 'box-shadow 0.25s, border-color 0.25s, transform 0.25s' }}
              >
                {isLarge && (
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, #ec652b 0%, transparent 70%)',
                      transform: 'translate(30%, -30%)',
                    }}
                  />
                )}

                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#ec652b]/15 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#ec652b]" />
                  </div>
                  <h3
                    className={`font-medium text-[#f6f6f8] mb-3 ${isLarge ? 'text-xl lg:text-2xl' : 'text-xl'}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{benefit.detail}</p>
                </div>

                <div className="mt-6 w-2 h-2 rounded-full bg-[#ec652b]/40" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
