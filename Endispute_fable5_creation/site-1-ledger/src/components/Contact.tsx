"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { company, contact } from "@/lib/content";
import { MaskReveal, Coord, DrawRule } from "./primitives";

const DETAILS = [
  { index: "01", label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { index: "02", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { index: "03", label: "Response", value: `Within ${contact.responseWindow}`, href: null },
  { index: "04", label: "Reach", value: contact.reach, href: null },
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
      className="relative border-t border-[#d6d2c8] bg-[#f4f2ed] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-start justify-between">
          <Coord label="A9 / 08 — Contact" />
          <Coord label="§ Start Intake" />
        </div>

        <h2 className="mb-3 font-display font-semibold text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.86] tracking-[-0.02em] text-[#0a0a0a]">
          <MaskReveal>Start The</MaskReveal>
          <MaskReveal delay={0.08}>
            Process<span className="text-[#d92b1c]">.</span>
          </MaskReveal>
        </h2>
        <p className="mb-12 max-w-2xl font-display text-lg leading-snug text-[#8a877f]">
          {company.workingWithUs}
        </p>

        <DrawRule className="mb-12" color="#0a0a0a" thickness={2} />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Form */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="flex flex-col items-start gap-5 border border-[#0a0a0a] bg-[#0a0a0a] p-10"
                >
                  <span className="flex h-12 w-12 items-center justify-center bg-[#d92b1c] text-[#f4f2ed]">
                    <Check size={26} strokeWidth={2.5} />
                  </span>
                  <h3 className="font-heavy text-2xl uppercase text-[#f4f2ed]">
                    Intake Received.
                  </h3>
                  <p className="max-w-md font-display text-base leading-snug text-[#c9c6bd]">
                    Your complimentary assessment request has been logged. We
                    respond within {contact.responseWindow}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-2 font-mono text-[12px] uppercase tracking-[0.15em] text-[#d92b1c] hover:underline"
                  >
                    ← Submit another
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
                    <Field index="01" label="Full Name" name="name" type="text" />
                    <Field index="02" label="Organisation" name="org" type="text" />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field index="03" label="Email" name="email" type="email" />
                    <Field index="04" label="Phone" name="phone" type="tel" />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a877f]"
                    >
                      <span className="text-[#d92b1c]">05</span>
                      Describe the dispute
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full border border-[#d6d2c8] bg-transparent px-4 py-3 font-display text-base text-[#0a0a0a] outline-none transition-colors placeholder:text-[#8a877f] focus:border-[#d92b1c]"
                      placeholder="Nature, parties, industry, current status…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0a0a0a] px-6 py-4 font-mono text-[13px] uppercase tracking-[0.2em] text-[#f4f2ed] transition-colors hover:bg-[#d92b1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d92b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed] sm:w-auto"
                  >
                    Submit Intake →
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact details */}
          <div className="md:col-span-5">
            <span className="mb-6 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a877f]">
              / Direct lines
            </span>
            <div className="border-t border-[#0a0a0a]">
              {DETAILS.map((d) => (
                <div
                  key={d.index}
                  className="flex items-baseline gap-4 border-b border-[#d6d2c8] py-5"
                >
                  <span className="font-mono text-[12px] tabular-nums tracking-[0.1em] text-[#d92b1c]">
                    {d.index}
                  </span>
                  <div className="flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a877f]">
                      {d.label}
                    </span>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="font-display text-lg text-[#0a0a0a] transition-colors hover:text-[#d92b1c]"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <span className="font-display text-lg text-[#0a0a0a]">
                        {d.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-[#8a877f]">
              ▪ Complimentary one-hour consultation. Confidential intake &
              assessment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  index,
  label,
  name,
  type,
}: {
  index: string;
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a877f]"
      >
        <span className="text-[#d92b1c]">{index}</span>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full border border-[#d6d2c8] bg-transparent px-4 py-3 font-display text-base text-[#0a0a0a] outline-none transition-colors placeholder:text-[#8a877f] focus:border-[#d92b1c]"
      />
    </div>
  );
}
