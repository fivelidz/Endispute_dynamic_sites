'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import MagneticButton from './MagneticButton';
import { cn } from '@/lib/cn';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 25 }}
        className={cn(
          'flex items-center justify-between gap-6 px-4 py-2.5 rounded-full transition-colors duration-300 max-w-5xl w-full',
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border border-line-strong'
            : 'bg-[#0a0a0a]/60 backdrop-blur-sm border border-line'
        )}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <div className="relative w-28 h-8">
            <Image
              src="/Endispute-Logo2.png"
              alt="Endispute"
              fill
              className="object-contain object-left"
            />
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="px-3 py-1.5 text-sm font-medium text-fg-2 hover:text-fg rounded-full hover:bg-surface-2 transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <MagneticButton
            onClick={() => handleLinkClick('#contact')}
            className="btn-primary px-5 py-2 text-sm rounded-full"
          >
            Get in Touch
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 items-center"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 bg-fg rounded-full origin-center transition-transform"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            className="block h-0.5 w-5 bg-fg rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 bg-fg rounded-full origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-16 left-4 right-4 bg-[#0a0a0a]/95 backdrop-blur-md rounded-2xl border border-line-strong p-4 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-fg-2 hover:text-fg hover:bg-surface-2 rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-line">
              <MagneticButton
                onClick={() => handleLinkClick('#contact')}
                className="btn-primary w-full px-4 py-3 text-sm rounded-xl"
              >
                Get in Touch
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
