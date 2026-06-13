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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
            Get in touch
          </span>
          <h2
            className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1c2530] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Start with a complimentary assessment.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#1c2530]/80">
            {company.workingWithUs}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className="glass overflow-hidden rounded-[2rem] bg-white/55"
        >
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Details — left, dark slate panel for contrast */}
            <div className="flex flex-col gap-6 bg-[#16243a]/90 p-8 sm:p-10">
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
              <ContactRow icon={Clock} label="Response" value={`Within ${contact.responseWindow}`} />
              <ContactRow icon={Globe2} label="Reach" value={contact.reach} />

              <div className="mt-auto border-t border-white/12 pt-6">
                <p className="text-sm leading-relaxed text-[#dce6f2]/75">
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
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center"
                  >
                    <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2563ab]/12">
                      <CheckCircle2 size={32} className="text-[#2563ab]" strokeWidth={2} />
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#1c2530]">
                      Message received.
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#1c2530]/80">
                      Thank you — we&apos;ll respond within {contact.responseWindow}.
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
                      <label htmlFor="msg" className="text-sm font-semibold text-[#1c2530]">
                        How can we help?
                      </label>
                      <textarea
                        id="msg"
                        required
                        rows={4}
                        placeholder="Briefly describe your matter…"
                        className="glass resize-none rounded-xl bg-white/50 px-4 py-3 text-sm text-[#1c2530] outline-none transition-shadow placeholder:text-[#1c2530]/45 focus:shadow-[0_0_0_3px_rgba(37,99,171,0.35)]"
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
        <Icon size={19} className="text-[#dce6f2]" strokeWidth={2} />
      </span>
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-[#b87545]">
          {label}
        </p>
        <p className="mt-0.5 text-[15px] font-semibold text-[#dce6f2]">{value}</p>
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
      <label htmlFor={id} className="text-sm font-semibold text-[#1c2530]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="glass rounded-xl bg-white/50 px-4 py-3 text-sm text-[#1c2530] outline-none transition-shadow placeholder:text-[#1c2530]/45 focus:shadow-[0_0_0_3px_rgba(37,99,171,0.35)]"
      />
    </div>
  );
}
