"use client";

import { company, contact } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#26262e] px-6 py-16">
      <div className="starlayer-far pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1200px] lg:pl-[8%]">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="block h-2 w-2 rounded-full bg-[#8052ff] shadow-[0_0_10px_rgba(128,82,255,0.8)]" />
            <span className="font-serif text-2xl font-semibold text-[#ffffff]">
              {company.name}
            </span>
          </div>
          <p className="max-w-md font-serif text-lg italic text-[#9a9a9a]">
            {company.tagline}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#26262e] pt-8 font-mono text-xs uppercase tracking-wider text-[#9a9a9a] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {company.name}. {company.shortPitch}.
          </span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-[#8052ff]">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-[#8052ff]">
              {contact.email}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
