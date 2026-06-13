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
        <h2 className="mt-2 font-garamond text-3xl font-500 text-[#2b2118] md:text-4xl">
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
                <p className="font-garamond text-2xl italic text-[#2b2118]">
                  Your correspondence has been received.
                </p>
                <p className="mt-2 font-garamond text-base text-[#7a6a55]">
                  We respond within {contact.responseWindow}.
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
                  { id: "name", label: "Your name", type: "text", required: true },
                  { id: "org", label: "Organisation", type: "text", required: false },
                  { id: "email", label: "Email address", type: "email", required: true },
                  { id: "phone", label: "Telephone", type: "tel", required: false },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="smallcaps block text-[13px] text-[#7a6a55]"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.required}
                      className="w-full rounded-sm border-b border-[#2b2118]/35 bg-transparent py-2 font-garamond text-lg text-[#2b2118] transition-colors placeholder:text-[#7a6a55]/50 focus:border-[#9e3b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e3b2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e3]"
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="smallcaps block text-[13px] text-[#7a6a55]"
                  >
                    Message — the nature of the matter
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    className="w-full resize-none rounded-sm border-b border-[#2b2118]/35 bg-transparent py-2 font-garamond text-lg text-[#2b2118] transition-colors focus:border-[#9e3b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e3b2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e3]"
                  />
                </div>

                <button
                  type="submit"
                  className="smallcaps rounded-sm bg-[#9e3b2b] px-8 py-3 text-[16px] text-[#f7f1e3] transition-colors hover:bg-[#86311f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e3b2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e3]"
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
          className="space-y-6 md:border-l md:border-[#7a6a55]/30 md:pl-12"
        >
          {[
            { icon: Phone, label: "By telephone", value: contact.phone },
            { icon: Mail, label: "By email", value: contact.email },
            { icon: Clock, label: "Response window", value: contact.responseWindow },
            { icon: Globe, label: "Where we operate", value: contact.reach },
          ].map((d) => (
            <div key={d.label} className="flex items-start gap-3">
              <d.icon size={18} className="mt-1 shrink-0 text-[#a8842c]" />
              <div>
                <p className="smallcaps text-[13px] text-[#7a6a55]">{d.label}</p>
                <p className="font-garamond text-lg text-[#2b2118]">{d.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
