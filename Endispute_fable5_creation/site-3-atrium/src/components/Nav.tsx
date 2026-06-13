"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { contact } from "@/lib/content";

const links = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#processes" },
  { label: "Expertise", href: "#panels" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "glass w-full max-w-6xl rounded-2xl bg-white/55 transition-shadow duration-300",
          scrolled
            ? "shadow-[0_12px_50px_rgba(20,30,50,0.18)]"
            : "shadow-[0_8px_40px_rgba(20,30,50,0.08)]"
        )}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2">
            <span
              className="font-display text-xl font-extrabold tracking-tight text-[#1c2530]"
              style={{ letterSpacing: "-0.02em" }}
            >
              En<span className="text-[#2563ab]">dispute</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#1c2530] transition-colors hover:text-[#2563ab]"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-azure hidden md:inline-flex !py-2 !px-4 text-sm">
              <Phone size={15} strokeWidth={2.2} />
              Get in touch
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#1c2530] transition-colors hover:bg-white/60 md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/50 md:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#1c2530] transition-colors hover:bg-white/60 hover:text-[#2563ab]"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-azure mt-2 justify-center text-sm"
                >
                  <Phone size={15} strokeWidth={2.2} />
                  {contact.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
