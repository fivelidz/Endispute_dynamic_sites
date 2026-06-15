"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone, Mail, Clock, Globe } from "lucide-react";
import { contact } from "@/lib/content";
import { UnderlineFlourish } from "@/lib/flourishes";

export default function Contact() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl px-5 py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <p className="smallcaps text-[15px] text-[#a8842c]">By correspondence</p>
        <h2 className="mt-2 font-garamond text-3xl font-500 text-[#1f1c1b] md:text-4xl">
          Begin a confidential conversation
        </h2>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        {/* Letter-form */}
        <div>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <UnderlineFlourish
                  draw
                  className="mb-5 h-6 w-[260px]"
                  color="#a8842c"
                />
                <p className="font-garamond text-2xl italic text-[#1f1c1b]">
                  Your correspondence has been received.
                </p>
                <p className="mt-2 font-garamond text-base text-[#6b6b6b]">
                  We respond promptly and in confidence.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {[
                  { id: "name", label: "Your name", type: "text", required: true, placeholder: "e.g. Jordan Avery" },
                  { id: "org", label: "Organisation", type: "text", required: false, placeholder: "Company or firm (optional)" },
                  { id: "email", label: "Email address", type: "email", required: true, placeholder: "name@example.com" },
                  { id: "phone", label: "Telephone", type: "tel", required: false, placeholder: "Optional" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="smallcaps mb-1.5 block text-[14px] font-600 text-[#1f1c1b]"
                    >
                      {field.label}
                      {field.required && (
                        <span className="ml-1 text-[#9e3b2b]" aria-hidden>
                          *
                        </span>
                      )}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full rounded-[2px] border border-[#1f1c1b]/45 bg-[#fefefc] px-3 py-2.5 font-garamond text-lg text-[#1f1c1b] transition-colors placeholder:text-[#6b6b6b] hover:border-[#1f1c1b]/70 focus:border-[#9e3b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e3b2b]/40 focus-visible:ring-offset-1 focus-visible:ring-offset-[#ebe9e1]"
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="smallcaps mb-1.5 block text-[14px] font-600 text-[#1f1c1b]"
                  >
                    Message — the nature of the matter
                    <span className="ml-1 text-[#9e3b2b]" aria-hidden>
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="A brief outline of the matter…"
                    className="w-full resize-none rounded-[2px] border border-[#1f1c1b]/45 bg-[#fefefc] px-3 py-2.5 font-garamond text-lg text-[#1f1c1b] transition-colors placeholder:text-[#6b6b6b] hover:border-[#1f1c1b]/70 focus:border-[#9e3b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e3b2b]/40 focus-visible:ring-offset-1 focus-visible:ring-offset-[#ebe9e1]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-ink smallcaps px-8 py-3 text-[16px]"
                >
                  Send correspondence
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Contact details */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="space-y-6 md:border-l md:border-[#1f1c1b]/20 md:pl-12"
        >
          {[
            { icon: Phone, label: "By telephone", value: contact.phone },
            { icon: Mail, label: "By email", value: contact.email },
            { icon: Clock, label: "Response window", value: "Prompt & in confidence" },
            { icon: Globe, label: "Where we operate", value: contact.reach },
          ].map((d) => (
            <div key={d.label} className="flex items-start gap-3">
              <d.icon size={18} className="mt-1 shrink-0 text-[#a8842c]" />
              <div>
                <p className="smallcaps text-[13px] text-[#6b6b6b]">{d.label}</p>
                <p className="font-garamond text-lg text-[#1f1c1b]">{d.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
