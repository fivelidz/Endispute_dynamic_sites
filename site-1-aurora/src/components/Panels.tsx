'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useAnimationFrame } from 'motion/react';
import { panels, clients } from '@/lib/content';
import { fadeUpContainer, fadeUpItem } from '@/lib/variants';

function Marquee({ items }: { items: readonly string[] }) {
  const shouldReduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useAnimationFrame((_, delta) => {
    if (shouldReduce || !trackRef.current) return;
    xRef.current -= delta * 0.04;
    const trackWidth = trackRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= trackWidth) {
      xRef.current = 0;
    }
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div ref={trackRef} className="flex gap-6 whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm font-medium text-white/70 px-4 py-2 rounded-full border border-white/15 bg-white/5 flex-shrink-0"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ec652b] flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Panels() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="panels" className="py-16 lg:py-24 bg-[#111a4a]">
      <div className="container-x">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-3xl"
        >
          <p
            className="text-xs font-medium tracking-widest uppercase text-[#ec652b] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Expert Panels
          </p>
          <h2
            className="text-3xl lg:text-[40px] font-medium text-[#f6f6f8] leading-tight mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Specialists across every{' '}
            <em className="text-[#ec652b]" style={{ fontStyle: 'italic' }}>
              industry sector
            </em>
          </h2>
          <p className="text-lg text-white/65 leading-relaxed">{panels.intro}</p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Marquee items={panels.expertise} />
        </motion.div>

        {/* Cards row */}
        <motion.div
          variants={fadeUpContainer}
          initial={shouldReduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {/* NBN featured client */}
          <motion.div
            variants={fadeUpItem}
            className="rounded-lg border border-[#ec652b]/30 bg-[#ec652b]/10 p-8"
          >
            <p
              className="text-xs font-medium tracking-widest uppercase text-[#ec652b] mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Featured Appointment
            </p>
            <h3
              className="text-2xl font-medium text-[#f6f6f8] mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {clients.featured.name}
            </h3>
            <p className="text-sm text-white/60 mb-4">{clients.featured.relation}</p>
            <p className="text-white/80 leading-relaxed">{clients.featured.detail}</p>
          </motion.div>

          {/* Confidentiality card */}
          <motion.div
            variants={fadeUpItem}
            className="rounded-lg border border-white/10 bg-white/5 p-8 flex flex-col justify-between"
          >
            <div>
              <p
                className="text-xs font-medium tracking-widest uppercase text-[#ec652b] mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Client Confidentiality
              </p>
              <h3
                className="text-2xl font-medium text-[#f6f6f8] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Our client list is private
              </h3>
              <p className="text-white/65 leading-relaxed">{clients.privacy}</p>
            </div>
            <div className="mt-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>

          {/* Expert note — full width */}
          <motion.div
            variants={fadeUpItem}
            className="sm:col-span-2 rounded-lg border border-white/10 bg-white/5 p-8"
          >
            <p className="text-white/75 leading-relaxed text-lg">{panels.expertNote}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
