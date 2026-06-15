"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, Clock, Globe2, Send, CheckCircle2 } from "lucide-react";
import { contact, company } from "@/lib/content";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: local-state stub only — no data is sent anywhere.
    // TODO: wire to a real endpoint (e.g. POST to a form handler / API route /
    // serverless function) before production. Currently just flips UI to "sent".
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-pad relative px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#a69b92]">
            Get in touch
          </span>
          <h2
            className="mt-3 font-display text-4xl text-[#1f1c1b] sm:text-5xl"
            style={{ fontWeight: 350, letterSpacing: "-0.01em", lineHeight: 1.0 }}
          >
            Start with a complimentary assessment.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#1f1c1b]/80">
            {company.workingWithUs}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="glass overflow-hidden rounded-[2rem] bg-white/55"
        >
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Details — left, dark slate panel for contrast */}
            <div className="flex flex-col gap-6 bg-[#1f1c1b]/90 p-8 sm:p-10">
              <ContactRow
                icon={Phone}
                label="Phone"
                value={contact.phone}
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={Mail}
                label="Email"
                value={contact.email}
                href={`mailto:${contact.email}`}
              />
              <ContactRow icon={Clock} label="Response" value="Prompt & in confidence" />
              <ContactRow icon={Globe2} label="Reach" value={contact.reach} />

              <div className="mt-auto border-t border-white/12 pt-6">
                <p className="text-sm leading-relaxed text-[#f5f4f0]/75">
                  {company.tagline}
                </p>
              </div>
            </div>

            {/* Form — right, glass fields */}
            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center"
                  >
                    <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#d9d6ce]">
                      <CheckCircle2 size={32} className="text-[#ff7714]" strokeWidth={2} />
                    </span>
                    <h3 className="font-display text-xl font-medium text-[#1f1c1b]">
                      Message received.
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#1f1c1b]/80">
                      Thank you — we&apos;ll respond promptly and in confidence.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <Field label="Full name" id="name" type="text" placeholder="Your name" />
                    <Field label="Email" id="email" type="email" placeholder="you@company.com" />
                    <Field label="Organisation" id="org" type="text" placeholder="Company (optional)" required={false} />
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="msg" className="text-sm font-semibold text-[#1f1c1b]">
                        How can we help?
                      </label>
                      <textarea
                        id="msg"
                        required
                        rows={4}
                        placeholder="Briefly describe your matter…"
                        className="resize-none border border-[#d9d6ce] bg-white px-4 py-3 text-sm text-[#1f1c1b] outline-none transition-colors placeholder:text-[#a69b92] focus:border-[#ff7714]"
                      />
                    </div>
                    <button type="submit" className="btn-azure mt-2 justify-center">
                      Send message
                      <Send size={16} strokeWidth={2.2} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/12">
        <Icon size={19} className="text-[#f5f4f0]" strokeWidth={2} />
      </span>
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-[#ff7714]">
          {label}
        </p>
        <p className="mt-0.5 text-[15px] font-semibold text-[#f5f4f0]">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="transition-opacity hover:opacity-80">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({
  label,
  id,
  type,
  placeholder,
  required = true,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#1f1c1b]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="border border-[#d9d6ce] bg-white px-4 py-3 text-sm text-[#1f1c1b] outline-none transition-colors placeholder:text-[#a69b92] focus:border-[#ff7714]"
      />
    </div>
  );
}
