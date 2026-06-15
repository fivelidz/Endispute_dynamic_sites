'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import MagneticButton from './MagneticButton';
import { contact, stats } from '@/lib/content';
import { Phone, Mail, Clock, Award } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Reveal cell ─ scroll-in fade, no per-frame pointer work ───────── */
function Cell({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: EASE }}
      className={`bento-cell hover-lift ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated counter ─────────────────────────────────────────────── */
function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/\D/g, ''), 10);
    if (reduce || isNaN(num) || num <= 0) {
      setDisplayed(value);
      return;
    }
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setDisplayed(value.replace(/\d+/, String(start)));
      if (start >= num) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-fg tabular-nums">
        {inView ? displayed : '0'}
      </div>
      <div className="text-xs text-muted mt-1 leading-tight">{label}</div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-32 pb-20 px-6 md:px-8 flex flex-col justify-center max-w-6xl mx-auto"
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-7 flex items-center gap-3"
      >
        <span className="eyebrow text-sapphire">Leaders in Conflict Resolution</span>
        <span className="h-px flex-1 max-w-[80px] bg-line-strong" />
      </motion.div>

      {/* Strict bento grid: 6 columns, equal gaps, consistent cell padding */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[minmax(0,1fr)]">

        {/* Main hero — spans 4 cols, 2 rows */}
        <Cell
          delay={0.05}
          className="col-span-2 lg:col-span-4 lg:row-span-2 bg-surface p-8 md:p-10 flex flex-col justify-between min-h-[360px]"
        >
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-fg leading-[1.08] tracking-[-0.02em] mb-6">
              End Your Dispute
              <br />
              <span className="text-fg-2 text-3xl md:text-4xl font-semibold">
                with Endispute
              </span>
            </h1>
            <p className="text-fg-2 text-[15px] md:text-base leading-relaxed max-w-lg">
              Dispute resolution, advisory and management services for complex
              commercial matters — across Australia and internationally.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <MagneticButton
              onClick={scrollToContact}
              className="btn-primary px-6 py-3 text-sm"
            >
              Start a Conversation
            </MagneticButton>
            <MagneticButton
              onClick={scrollToServices}
              className="btn-ghost px-6 py-3 text-sm"
            >
              Our Services
            </MagneticButton>
          </div>
        </Cell>

        {/* Stats — spans 2 cols */}
        <Cell
          delay={0.12}
          className="col-span-2 bg-surface p-5 flex flex-col justify-between min-h-[170px]"
        >
          <div className="eyebrow mb-4">By the numbers</div>
          <div className="grid grid-cols-2 gap-3">
            {stats.slice(0, 2).map((s, i) => (
              <AnimatedStat
                key={s.value}
                value={s.value}
                label={s.label}
                delay={0.2 + i * 0.1}
              />
            ))}
          </div>
        </Cell>

        {/* Contact card */}
        <Cell
          delay={0.18}
          className="col-span-1 bg-surface p-5 flex flex-col gap-3 min-h-[170px]"
        >
          <div className="eyebrow">Contact</div>
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-fg-2 hover:text-fg transition-colors"
          >
            <Phone size={14} className="text-sapphire flex-shrink-0" />
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-start gap-2 text-sm font-medium text-fg-2 hover:text-fg transition-colors break-all"
          >
            <Mail size={14} className="text-sapphire flex-shrink-0 mt-0.5" />
            {contact.email}
          </a>
        </Cell>

        {/* Tania photo */}
        <Cell
          delay={0.24}
          className="col-span-1 relative min-h-[170px] bg-surface-2"
        >
          <Image
            src="/Endispute-V1Taniafinal.jpg"
            alt="Professor Tania Sourdin"
            fill
            className="object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-fg text-xs font-semibold">Prof. Tania Sourdin</div>
            <div className="text-muted text-xs">Director &amp; Co-Founder</div>
          </div>
        </Cell>

        {/* Confidential badge — spans 3 cols */}
        <Cell
          delay={0.3}
          className="col-span-2 lg:col-span-3 bg-surface p-5 flex items-center gap-4 min-h-[120px]"
        >
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-sapphire" />
            <span className="text-2xl font-bold text-fg">Confidential</span>
          </div>
          <div className="text-xs text-muted leading-relaxed">
            Without prejudice, out of court.
            <span className="flex items-center gap-1.5 mt-1.5 text-fg-2">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-sapphire inline-block" />
              We respond promptly, in confidence
            </span>
          </div>
        </Cell>

        {/* NBN highlight — spans 3 cols */}
        <Cell
          delay={0.36}
          className="col-span-2 lg:col-span-3 bg-surface p-5 flex items-center gap-4 min-h-[120px]"
        >
          <Award size={20} className="text-sapphire flex-shrink-0" />
          <div>
            <div className="font-semibold text-fg text-sm">NBN Appointed</div>
            <div className="text-xs text-muted mt-1 leading-relaxed">
              Resolution Advisor for NBN industry disputes since 2014.
            </div>
          </div>
        </Cell>
      </div>
    </section>
  );
}
