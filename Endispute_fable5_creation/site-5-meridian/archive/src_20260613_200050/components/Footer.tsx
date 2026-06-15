"use client";

import { company, contact } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#232c48] px-6 py-16">
      <div className="starlayer-far pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl lg:pl-[8%]">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="block h-2 w-2 rounded-full bg-[#d4a843] shadow-[0_0_10px_rgba(212,168,67,0.8)]" />
            <span className="font-serif text-2xl font-semibold text-[#e8ecf4]">
              {company.name}
            </span>
          </div>
          <p className="max-w-md font-serif text-lg italic text-[#8a93a8]">
            {company.tagline}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#232c48] pt-8 font-mono text-xs uppercase tracking-wider text-[#8a93a8] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {company.name}. {company.shortPitch}.
          </span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-[#d4a843]">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-[#d4a843]">
              {contact.email}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
