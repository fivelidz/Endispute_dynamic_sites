"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Mail, Phone, Globe, Clock } from "lucide-react";
import { contact, company } from "@/lib/content";
import MouseGlow from "./MouseGlow";

const inputClass =
  "w-full rounded-lg border border-[#26262e] bg-[#000000] px-4 py-3 text-sm text-[#ffffff] placeholder:text-[#9a9a9a] outline-none transition focus:border-[#8052ff] focus:ring-2 focus:ring-[#8052ff]/30";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const reduce = useReducedMotion();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="relative px-6 py-20">
      <div className="mx-auto max-w-[1200px] lg:pl-[8%]">
        {/* final bright node */}
        <div className="mb-10 flex flex-col items-start gap-4">
          <span className="relative flex h-5 w-5 items-center justify-center">
            {!reduce && (
              <motion.span
                className="absolute inset-0 rounded-full bg-[#8052ff]"
                animate={{ scale: [1, 2.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span className="relative h-5 w-5 rounded-full bg-[#8052ff] shadow-[0_0_24px_rgba(128,82,255,1)]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8052ff]">
            The resolution point
          </span>
        </div>

        <h2 className="max-w-3xl font-serif text-4xl font-light leading-tight tracking-tight text-[#ffffff] sm:text-5xl">
          End your dispute with <span className="italic text-[#8052ff]">Endispute.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#bdbdbd]">
          The intake and assessment is complimentary and entirely confidential.
          Tell us about your matter and a senior panel member will map the right
          process to resolve it — efficiently, and without prejudice.
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#9a9a9a]">
          {company.workingWithUs}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* form panel */}
          <MouseGlow className="rounded-3xl border border-[#26262e] bg-[#0c0c12]">
            <div className="p-8 sm:p-10">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="relative flex h-16 w-16 items-center justify-center">
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-[#8052ff]"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <motion.span
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8052ff]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    >
                      <Check size={30} className="text-[#000000]" />
                    </motion.span>
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-[#ffffff]">
                    Message received.
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-[#9a9a9a]">
                    We will respond within {contact.responseWindow}. Your journey to resolution has begun.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#9a9a9a]">
                        Name
                      </label>
                      <input required type="text" className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#9a9a9a]">
                        Email
                      </label>
                      <input required type="email" className={inputClass} placeholder="you@company.com" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#9a9a9a]">
                      Organisation
                    </label>
                    <input type="text" className={inputClass} placeholder="Company / organisation" />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#9a9a9a]">
                      How can we help?
                    </label>
                    <textarea
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your dispute..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#8052ff] py-3.5 font-sans text-sm font-semibold text-[#ffffff] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8052ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]"
                  >
                    Begin the conversation
                  </button>
                </form>
              )}
            </div>
          </MouseGlow>

          {/* details column */}
          <div className="flex flex-col justify-center gap-7">
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="group flex items-start gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8052ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]"
            >
              <Phone size={20} className="mt-0.5 text-[#9a9a9a]" />
              <span>
                <span className="block font-mono text-xs uppercase tracking-wider text-[#9a9a9a]">
                  Phone
                </span>
                <span className="font-serif text-lg text-[#ffffff] transition-colors group-hover:text-[#8052ff]">
                  {contact.phone}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-start gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8052ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]"
            >
              <Mail size={20} className="mt-0.5 text-[#9a9a9a]" />
              <span>
                <span className="block font-mono text-xs uppercase tracking-wider text-[#9a9a9a]">
                  Email
                </span>
                <span className="break-all font-serif text-lg text-[#ffffff] transition-colors group-hover:text-[#8052ff]">
                  {contact.email}
                </span>
              </span>
            </a>
            <div className="flex items-start gap-4">
              <Globe size={20} className="mt-0.5 text-[#9a9a9a]" />
              <span>
                <span className="block font-mono text-xs uppercase tracking-wider text-[#9a9a9a]">
                  Reach
                </span>
                <span className="font-serif text-lg text-[#ffffff]">{contact.reach}</span>
              </span>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="mt-0.5 text-[#9a9a9a]" />
              <span>
                <span className="block font-mono text-xs uppercase tracking-wider text-[#9a9a9a]">
                  Response window
                </span>
                <span className="font-serif text-lg text-[#ffffff]">{contact.responseWindow}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
