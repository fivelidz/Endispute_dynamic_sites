"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { company, contact } from "@/lib/content";
import { MaskReveal, SectionHead } from "./primitives";

const DETAILS = [
  { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "Response", value: `Within ${contact.responseWindow}`, href: null },
  { label: "Reach", value: contact.reach, href: null },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="relative border-t border-[#e3e0d8] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHead label="Contact — Start Intake" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-light leading-[0.98] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Start the</MaskReveal>
              <MaskReveal delay={0.08}>process.</MaskReveal>
            </h2>
            <p className="measure mt-6 text-[16px] leading-[1.7] text-[#444444]">
              {company.workingWithUs}
            </p>

            <div className="mt-10 border-t border-[#e3e0d8]">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="flex items-baseline justify-between gap-4 border-b border-[#e3e0d8] py-4"
                >
                  <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#6b6b6b]">
                    {d.label}
                  </span>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="text-[15px] text-[#0a0a0a] transition-colors hover:text-[#6b6b6b]"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span className="text-[15px] text-[#0a0a0a]">{d.value}</span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-5 text-[13px] leading-[1.6] text-[#6b6b6b]">
              Complimentary one-hour consultation. Confidential intake &amp;
              assessment.
            </p>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start gap-5 rounded-[8px] bg-[#0a0a0a] p-10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-[#fefefc] text-[#0a0a0a]">
                    <Check size={24} strokeWidth={2.5} />
                  </span>
                  <h3 className="font-display text-[1.75rem] font-medium text-[#fefefc]">
                    Intake received.
                  </h3>
                  <p className="measure text-[15px] leading-[1.7] text-[#c9c6bd]">
                    Your complimentary assessment request has been logged. We
                    respond within {contact.responseWindow}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-2 text-[13px] font-medium tracking-[0.02em] text-[#fefefc] underline-offset-4 hover:underline"
                  >
                    Submit another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Full Name" name="name" type="text" />
                    <Field label="Organisation" name="org" type="text" />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em] text-[#6b6b6b]"
                    >
                      Describe the dispute
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full rounded-[2px] border border-[#e3e0d8] bg-transparent px-4 py-3 text-[15px] text-[#0a0a0a] outline-none transition-colors placeholder:text-[#9a9a9a] focus:border-[#0a0a0a]"
                      placeholder="Nature, parties, industry, current status…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-[2px] bg-[#0a0a0a] px-6 py-4 text-[13px] font-medium tracking-[0.04em] text-[#fefefc] transition-opacity hover:opacity-85 sm:w-auto"
                  >
                    Submit Intake
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em] text-[#6b6b6b]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full rounded-[2px] border border-[#e3e0d8] bg-transparent px-4 py-3 text-[15px] text-[#0a0a0a] outline-none transition-colors placeholder:text-[#9a9a9a] focus:border-[#0a0a0a]"
      />
    </div>
  );
}
