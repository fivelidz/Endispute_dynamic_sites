"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, Mail, Clock, Globe } from "lucide-react";
import { contact, company } from "@/lib/content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* SIDE ONE — details */}
        <div className="relative flex w-full flex-col justify-center bg-[#0a0a0a] px-7 py-20 text-[#cccccc] md:w-1/2 md:py-28 md:pr-12 lg:pr-16">
          <div className="split-left-inner">
            <p className="mono-label mb-5 text-[#cccccc]">09 — Get in touch</p>
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
              End your <span className="text-[#fc1c46]">dispute</span>.
            </h2>
            <p className="mt-6 max-w-sm text-[16px] leading-[1.5] text-[#cccccc]">
              {company.workingWithUs}
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-[#fc1c46]" />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-[16px] text-white transition-colors hover:text-[#fc1c46]"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-[#fc1c46]" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[16px] text-white transition-colors hover:text-[#fc1c46]"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Clock size={18} className="text-[#fc1c46]" />
                <span className="text-[16px] text-[#cccccc]">
                  Response within {contact.responseWindow}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Globe size={18} className="text-[#fc1c46]" />
                <span className="text-[16px] text-[#cccccc]">{contact.reach}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SIDE TWO — form */}
        <div className="relative flex w-full flex-col justify-center bg-[#1a1a1a] px-7 py-20 text-[#cccccc] md:w-1/2 md:py-28 md:pl-12 lg:pl-16">
          <div className="split-right-inner">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-start"
                >
                  <span className="mono-label text-[#fc1c46]">Message sent</span>
                  <h3 className="mt-4 font-serif text-3xl italic text-white">
                    Thank you.
                  </h3>
                  <p className="mt-4 max-w-sm text-[16px] leading-[1.5] text-[#cccccc]">
                    We&apos;ll be in touch within {contact.responseWindow}.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" />
                    <Field label="Company" name="company" required={false} />
                  </div>
                  <Field label="Email" name="email" type="email" />
                  <div className="flex flex-col gap-2">
                    <label className="mono-label text-[#cccccc]">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="resize-none border border-[#4c4c4c] bg-[#0a0a0a] px-4 py-3 text-[16px] text-white transition-colors focus:border-[#fc1c46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc1c46] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 self-start rounded-full bg-[#fc1c46] px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
                  >
                    Send message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* The red seam between the two sides */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 h-[2px] -translate-y-1/2 bg-[#fc1c46] md:left-1/2 md:right-auto md:top-0 md:h-full md:w-[2px] md:-translate-x-1/2 md:translate-y-0" />
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="mono-label text-[#cccccc]">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="border border-[#4c4c4c] bg-[#0a0a0a] px-4 py-3 text-[16px] text-white transition-colors focus:border-[#fc1c46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc1c46] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
      />
    </div>
  );
}
