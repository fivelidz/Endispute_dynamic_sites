"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { company } from "@/lib/content";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Panel", href: "#panel" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2e2e2e]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <span
              className="text-2xl font-light tracking-tight text-[#f4eedf]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="italic text-[#d4a14a]">En</span>
              <span>dispute</span>
            </span>
            <span className="hidden sm:block text-[10px] font-mono text-[#c8bfa8] tracking-widest uppercase border-l border-[#3a3a3a] pl-3 ml-1">
              {company.shortPitch}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="gold-underline text-sm text-[#c8bfa8] hover:text-[#f4eedf] transition-colors duration-200 font-body tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-5 py-2 bg-[#d4a14a] text-[#0a0a0a] text-sm font-semibold tracking-wide hover:bg-[#e0b660] transition-colors duration-200"
            >
              Enquire
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-[#c8bfa8] hover:text-[#f4eedf]"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#0a0a0a]"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                <span
                  className="text-2xl font-light text-[#f4eedf]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="italic text-[#d4a14a]">En</span>dispute
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-[#c8bfa8]"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-light text-[#f4eedf] hover:text-[#d4a14a] transition-colors py-2 border-b border-[#1c1c1c]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-8 py-3 bg-[#d4a14a] text-[#0a0a0a] font-semibold tracking-wide"
                >
                  Make an Enquiry
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
