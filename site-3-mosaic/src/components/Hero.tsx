'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from 'motion/react';
import Image from 'next/image';
import MagneticButton from './MagneticButton';
import { contact, stats } from '@/lib/content';
import { Phone, Mail, Clock, Award } from 'lucide-react';

/* ── 3D Tilt Cell ─────────────────────────────────────────────────── */
function TiltCell({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useTransform(rawX, [-50, 50], [-8, 8]);
  const rotateX = useTransform(rawY, [-50, 50], [8, -8]);
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 });
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      rawX.set(e.clientX - rect.left - cx);
      rawY.set(e.clientY - rect.top - cy);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 22,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
      className={className}
      data-cursor="grow"
    >
      {children}
    </motion.div>
  );
}

/* ── Animated Counter ─────────────────────────────────────────────── */
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
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!inView) return;
    // Animate numbers if numeric, otherwise just reveal
    const num = parseInt(value.replace(/\D/g, ''), 10);
    if (!isNaN(num) && num > 0) {
      let start = 0;
      const step = Math.ceil(num / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, num);
        setDisplayed(value.replace(/\d+/, String(start)));
        if (start >= num) clearInterval(timer);
      }, 40);
      return () => clearInterval(timer);
    } else {
      setDisplayed(value);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay, duration: 0.5 }}
        className="text-2xl font-bold text-[#0c1f3d] font-mono-jb"
      >
        {inView ? displayed : '0'}
      </motion.div>
      <div className="text-xs text-[#6b7280] mt-0.5 leading-tight">{label}</div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-28 pb-16 px-4 md:px-8 flex flex-col justify-center max-w-7xl mx-auto"
    >
      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex items-center gap-2"
      >
        <span className="font-mono-jb text-xs text-terracotta tracking-widest uppercase">
          Leaders in Conflict Resolution
        </span>
        <span className="h-px flex-1 max-w-[80px] bg-terracotta/30" />
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto">

        {/* Cell 1: Main hero — 2×2 */}
        <TiltCell
          delay={0.15}
          className="bento-cell col-span-2 md:col-span-2 row-span-2 bg-navy p-8 md:p-10 flex flex-col justify-between min-h-[340px]"
        >
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-paper leading-[1.1] mb-6">
              End Your{' '}
              <span className="font-serif-italic text-terracotta-light">
                Dispute
              </span>
              <br />
              <span className="text-paper/70 text-3xl md:text-4xl font-light">
                with Endispute
              </span>
            </h1>
            <p className="text-paper/60 text-sm md:text-base leading-relaxed max-w-lg">
              Dispute resolution, advisory and management services for complex
              commercial matters — across Australia and internationally.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <MagneticButton
              onClick={scrollToContact}
              className="px-6 py-3 bg-terracotta text-white font-semibold rounded-full text-sm hover:bg-terracotta-light transition-colors shadow-lg shadow-terracotta/30"
            >
              Start a Conversation
            </MagneticButton>
            <MagneticButton
              onClick={scrollToServices}
              className="px-6 py-3 bg-paper/10 text-paper font-semibold rounded-full text-sm hover:bg-paper/20 transition-colors border border-paper/20"
            >
              Our Services
            </MagneticButton>
          </div>
        </TiltCell>

        {/* Cell 2: Stats */}
        <TiltCell
          delay={0.25}
          className="bento-cell p-5 flex flex-col justify-between bg-[#fafaf7] min-h-[160px]"
        >
          <div className="font-mono-jb text-xs text-[#c46442] uppercase tracking-widest mb-4">
            By the numbers
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.slice(0, 2).map((s, i) => (
              <AnimatedStat
                key={s.value}
                value={s.value}
                label={s.label}
                delay={0.4 + i * 0.1}
              />
            ))}
          </div>
        </TiltCell>

        {/* Cell 3: Contact card */}
        <TiltCell
          delay={0.3}
          className="bento-cell p-5 bg-sage-pale flex flex-col gap-3 min-h-[160px]"
        >
          <div className="font-mono-jb text-xs text-sage uppercase tracking-widest">
            Contact
          </div>
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-ink hover:text-sage transition-colors"
            data-cursor="grow"
          >
            <Phone size={14} className="text-sage flex-shrink-0" />
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 text-sm font-medium text-ink hover:text-sage transition-colors break-all"
            data-cursor="grow"
          >
            <Mail size={14} className="text-sage flex-shrink-0" />
            {contact.email}
          </a>
        </TiltCell>

        {/* Cell 4: Tania photo */}
        <TiltCell
          delay={0.35}
          className="bento-cell overflow-hidden relative min-h-[200px] bg-navy-pale"
        >
          <div className="absolute inset-0">
            <Image
              src="/Endispute-V1Taniafinal.jpg"
              alt="Professor Tania Sourdin"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-paper text-xs font-semibold">
              Prof. Tania Sourdin
            </div>
            <div className="text-paper/60 text-xs">Director & Co-Founder</div>
          </div>
        </TiltCell>

        {/* Cell 5: 48hr badge */}
        <TiltCell
          delay={0.4}
          className="bento-cell p-5 bg-terracotta-pale flex flex-col items-center justify-center gap-2 min-h-[120px]"
        >
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-terracotta" />
            <span className="text-3xl font-bold text-terracotta font-mono-jb">
              48hr
            </span>
          </div>
          <div className="text-xs text-terracotta/70 text-center font-medium">
            Response window guaranteed
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="pulse-dot w-2 h-2 rounded-full bg-terracotta inline-block" />
            <span className="text-xs text-terracotta/60">Always responding</span>
          </div>
        </TiltCell>

        {/* Cell 6: NBN highlight */}
        <TiltCell
          delay={0.45}
          className="bento-cell p-5 bg-[#e8edf5] flex flex-col justify-between min-h-[120px]"
        >
          <Award size={18} className="text-[#0c1f3d] mb-2" />
          <div>
            <div className="font-semibold text-[#0c1f3d] text-sm">NBN Appointed</div>
            <div className="text-xs text-[#4a5568] mt-1">
              Resolution Advisor for NBN industry disputes since 2014
            </div>
          </div>
        </TiltCell>
      </div>
    </section>
  );
}
