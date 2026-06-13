'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { contact } from '@/lib/content';
import { cn } from '@/lib/cn';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Panels', href: '#panels' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  const prevScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      prevScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(251,247,240,0.92)' : 'transparent',
          boxShadow: scrolled
            ? '0 1px 24px 0 rgba(14,74,74,0.08)'
            : '0 0 0 0 transparent',
        }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)' }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-shrink-0"
          >
            <Image
              src="/Endispute-Logo2.png"
              alt="Endispute"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors duration-200',
                  scrolled
                    ? 'text-[#161614] hover:text-[#0e4a4a]'
                    : 'text-[#161614] hover:text-[#0e4a4a]'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#c25b4a] text-white text-sm font-medium hover:bg-[#a84a3a] transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              {contact.phone}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#161614]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 z-40 bg-[#fbf7f0] border-b border-[#e8e0d4] shadow-xl px-6 py-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className="text-lg font-medium text-[#161614] hover:text-[#0e4a4a] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${contact.phone}`}
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-full bg-[#c25b4a] text-white font-medium justify-center hover:bg-[#a84a3a] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {contact.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
