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
        {/* INK half — details */}
        <div className="relative flex w-full flex-col justify-center bg-[#101418] px-7 py-20 text-[#efe9dc] md:w-1/2 md:px-14 md:py-28 lg:px-20">
          <p className="mono-label mb-5 text-[#b8ae98]">09 — Get in touch</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            End your <span className="italic text-[#c8472b]">dispute</span>.
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#b8ae98]">
            {company.workingWithUs}
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-center gap-4">
              <Phone size={18} className="text-[#c8472b]" />
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="text-[15px] text-[#efe9dc] transition-colors hover:text-[#c8472b]"
              >
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={18} className="text-[#c8472b]" />
              <a
                href={`mailto:${contact.email}`}
                className="text-[15px] text-[#efe9dc] transition-colors hover:text-[#c8472b]"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Clock size={18} className="text-[#c8472b]" />
              <span className="text-[15px] text-[#b8ae98]">
                Response within {contact.responseWindow}
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Globe size={18} className="text-[#c8472b]" />
              <span className="text-[15px] text-[#b8ae98]">{contact.reach}</span>
            </li>
          </ul>
        </div>

        {/* PAPER half — form */}
        <div className="relative flex w-full flex-col justify-center bg-[#f6f1e7] px-7 py-20 text-[#16191d] md:w-1/2 md:px-14 md:py-28 lg:px-20">
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
                <span className="mono-label text-[#c8472b]">Message sent</span>
                <h3 className="mt-4 font-serif text-3xl italic text-[#16191d]">
                  Thank you.
                </h3>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#6e6a60]">
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
                  <label className="mono-label text-[#6e6a60]">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="resize-none border border-[#16191d]/25 bg-transparent px-4 py-3 text-[15px] text-[#16191d] transition-colors focus:border-[#c8472b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8472b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e7]"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 self-start bg-[#c8472b] px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#f6f1e7] transition-opacity hover:opacity-90"
                >
                  Send message
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* vermilion seam bridging */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 h-[2px] -translate-y-1/2 bg-[#c8472b] md:left-1/2 md:right-auto md:top-0 md:h-full md:w-[2px] md:-translate-x-1/2 md:translate-y-0" />
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
      <label className="mono-label text-[#6e6a60]">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="border border-[#16191d]/25 bg-transparent px-4 py-3 text-[15px] text-[#16191d] transition-colors focus:border-[#c8472b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8472b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e7]"
      />
    </div>
  );
}
