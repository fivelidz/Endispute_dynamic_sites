"use client";

import { company, contact } from "@/lib/content";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Benefits", href: "#benefits" },
  { label: "Process", href: "#process" },
  { label: "Disputes", href: "#disputes" },
  { label: "Panel", href: "#panel" },
  { label: "Director", href: "#director" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] px-5 py-16 text-[#f4f2ed] md:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-[#3a3a37] pb-10 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d92b1c]">
              ▪ {company.shortPitch}
            </span>
            <h2 className="mt-3 font-heavy text-[clamp(2.5rem,8vw,7rem)] uppercase leading-[0.86] tracking-[-0.01em]">
              Endispute<span className="text-[#d92b1c]">.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="bg-[#d92b1c] px-6 py-4 font-mono text-[13px] uppercase tracking-[0.2em] text-[#f4f2ed] transition-colors hover:bg-[#f4f2ed] hover:text-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4f2ed] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            End Your Dispute →
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a877f]">
              / Index
            </span>
            <p className="max-w-md font-display text-base leading-relaxed text-[#c9c6bd]">
              {company.tagline}. Dispute resolution, advisory and management for
              complex disputes — {contact.reach}.
            </p>
          </div>

          <nav className="md:col-span-4">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a877f]">
              / Navigate
            </span>
            <ul className="grid grid-cols-2 gap-y-2">
              {NAV.map((n, i) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="flex items-baseline gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-[#f4f2ed] transition-colors hover:text-[#d92b1c]"
                  >
                    <span className="text-[10px] text-[#8a877f]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a877f]">
              / Contact
            </span>
            <ul className="space-y-2 font-mono text-[12px] tracking-[0.05em] text-[#c9c6bd]">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-[#d92b1c]"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-[#d92b1c]"
                >
                  {contact.email}
                </a>
              </li>
              <li className="text-[#8a877f]">{contact.reach}</li>
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-[#3a3a37] pt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[#8a877f] md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} Endispute — All rights reserved
          </span>
          <span className="text-[#d92b1c]">▪ A1 / 09 — End of Ledger</span>
        </div>
      </div>
    </footer>
  );
}
