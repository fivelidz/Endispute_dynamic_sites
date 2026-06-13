"use client";

import { Phone, Mail } from "lucide-react";
import { company, contact } from "@/lib/content";

const links = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#processes" },
  { label: "Expertise", href: "#panels" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="relative px-4 pb-8 pt-4">
      <div className="glass mx-auto max-w-6xl rounded-[2rem] bg-white/45 p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span
              className="font-display text-2xl font-extrabold tracking-tight text-[#1c2530]"
              style={{ letterSpacing: "-0.02em" }}
            >
              En<span className="text-[#2563ab]">dispute</span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#1c2530]/80">
              {company.shortPitch}. Dispute resolution, advisory and management
              for complex commercial matters across Australia and internationally.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[#1c2530]/80 transition-colors hover:text-[#2563ab]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-[#1c2530]/80 transition-colors hover:text-[#2563ab]"
                >
                  <Phone size={15} strokeWidth={2} className="text-[#2563ab]" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 text-sm text-[#1c2530]/80 transition-colors hover:text-[#2563ab]"
                >
                  <Mail size={15} strokeWidth={2} className="text-[#2563ab]" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#1c2530]/10 pt-6 sm:flex-row">
          <p className="text-xs text-[#1c2530]/75">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[#1c2530]/70">
            {company.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
