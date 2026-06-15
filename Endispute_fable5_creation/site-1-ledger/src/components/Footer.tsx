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
    <footer className="bg-[#0a0a0a] px-5 py-20 text-[#fefefc] md:px-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-[#2a2a28] pb-12 md:flex-row md:items-end">
          <div>
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">
              {company.shortPitch}
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,8vw,6rem)] font-light leading-[0.95] tracking-[-0.02em]">
              Endispute.
            </h2>
          </div>
          <a
            href="#contact"
            className="rounded-[2px] bg-[#fefefc] px-6 py-4 text-[13px] font-medium tracking-[0.04em] text-[#0a0a0a] transition-opacity hover:opacity-85"
          >
            End Your Dispute
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="measure-tight text-[15px] leading-[1.7] text-[#c9c6bd]">
              {company.tagline}. Dispute resolution, advisory and management for
              complex disputes — {contact.reach}.
            </p>
          </div>

          <nav className="md:col-span-4">
            <span className="mb-4 block text-[12px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">
              Navigate
            </span>
            <ul className="grid grid-cols-2 gap-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[14px] text-[#fefefc] transition-colors hover:text-[#9a9a9a]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <span className="mb-4 block text-[12px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">
              Contact
            </span>
            <ul className="space-y-2.5 text-[14px] text-[#c9c6bd]">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-[#fefefc]"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-[#fefefc]"
                >
                  {contact.email}
                </a>
              </li>
              <li className="text-[#9a9a9a]">{contact.reach}</li>
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="border-t border-[#2a2a28] pt-6 text-[12px] tracking-[0.04em] text-[#9a9a9a]">
          © {new Date().getFullYear()} Endispute — All rights reserved
        </div>
      </div>
    </footer>
  );
}
