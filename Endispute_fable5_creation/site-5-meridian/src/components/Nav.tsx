"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { company, contact } from "@/lib/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#approaches", label: "Approaches" },
  { href: "#panel", label: "Panel" },
  { href: "#team", label: "Director" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[#232c48] bg-[#0b1020]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]">
          <span className="block h-2 w-2 rounded-full bg-[#d4a843] shadow-[0_0_10px_rgba(212,168,67,0.8)]" />
          <span className="font-serif text-xl font-semibold tracking-tight text-[#e8ecf4]">
            {company.name}
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded font-sans text-sm text-[#b8c0d4] transition-colors hover:text-[#e8ecf4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#d4a843] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="rounded-full border border-[#d4a843]/50 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-[#d4a843] transition-colors hover:bg-[#d4a843]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
          >
            {contact.phone}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded text-[#e8ecf4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020] md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[#232c48] bg-[#0b1020]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[#232c48]/60 py-3 font-sans text-base text-[#b8c0d4] transition-colors hover:text-[#d4a843]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="mt-3 font-mono text-sm text-[#d4a843]"
              >
                {contact.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
