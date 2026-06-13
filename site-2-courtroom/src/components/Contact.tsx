"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { contact, company } from "@/lib/content";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success";

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    message: "",
    process: "",
  });
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  };

  const inputClass =
    "w-full bg-[#1c1c1c] border border-[#2e2e2e] text-[#f4eedf] placeholder-[#c8bfa8]/30 px-5 py-3.5 text-sm outline-none focus:border-[#d4a14a] transition-colors duration-200 font-body";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 bg-[#1c1c1c]"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-16 pt-4 flex justify-between items-center">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            § Contact
          </span>
          <span
            className="text-[10px] font-mono text-[#c8bfa8]/30 tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            VIII
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-[clamp(2.2rem,4vw,3.5rem)] font-light text-[#f4eedf] leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Begin your <em className="text-[#d4a14a]">resolution.</em>
            </h2>
            <p className="text-[#c8bfa8] text-base leading-relaxed mb-12">
              {company.workingWithUs}
            </p>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <Phone size={16} className="text-[#d4a14a] shrink-0 mt-1" />
                <div>
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/40 mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-[#f4eedf] hover:text-[#d4a14a] transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={16} className="text-[#d4a14a] shrink-0 mt-1" />
                <div>
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/40 mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[#f4eedf] hover:text-[#d4a14a] transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={16} className="text-[#d4a14a] shrink-0 mt-1" />
                <div>
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/40 mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Reach
                  </p>
                  <p className="text-[#f4eedf]">{contact.reach}</p>
                </div>
              </div>
            </div>

            {/* Response time badge */}
            <div className="mt-12 border border-[#d4a14a]/20 p-6 bg-[#d4a14a]/5">
              <span
                className="text-[10px] font-mono uppercase tracking-widest text-[#d4a14a] block mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ⏱ Response Window
              </span>
              <p className="text-[#f4eedf] text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>
                Within {contact.responseWindow}
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative bg-[#0a0a0a] border border-[#2e2e2e] p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle size={48} className="text-[#d4a14a] mb-6" />
                    <h3
                      className="text-3xl font-light text-[#f4eedf] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Enquiry received.
                    </h3>
                    <p className="text-[#c8bfa8] text-sm max-w-xs leading-relaxed">
                      We will respond within {contact.responseWindow}. Thank you
                      for contacting Endispute.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/50 mb-2"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={fields.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="organisation"
                          className="block text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/50 mb-2"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Organisation
                        </label>
                        <input
                          id="organisation"
                          name="organisation"
                          type="text"
                          value={fields.organisation}
                          onChange={handleChange}
                          placeholder="Company Pty Ltd"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/50 mb-2"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={fields.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/50 mb-2"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={fields.phone}
                          onChange={handleChange}
                          placeholder="+61 2 0000 0000"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="process"
                        className="block text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/50 mb-2"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Preferred Process
                      </label>
                      <select
                        id="process"
                        name="process"
                        value={fields.process}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="">— Select if known</option>
                        <option value="Facilitation">Facilitation</option>
                        <option value="Structured Mediation">Structured Mediation</option>
                        <option value="Evaluative Processes">Evaluative Processes</option>
                        <option value="Expert Referral">Expert Referral</option>
                        <option value="Arbitration">Arbitration</option>
                        <option value="Unsure / Advice needed">Unsure / Advice needed</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] font-mono uppercase tracking-widest text-[#c8bfa8]/50 mb-2"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Brief description of dispute *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={fields.message}
                        onChange={handleChange}
                        placeholder="Please briefly describe the nature of your dispute..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full py-4 bg-[#d4a14a] text-[#0a0a0a] font-semibold text-sm tracking-wide hover:bg-[#e0b660] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {formState === "submitting"
                        ? "Sending..."
                        : "Submit Enquiry"}
                    </button>

                    <p className="text-[10px] text-[#c8bfa8]/30 text-center leading-relaxed">
                      Your first consultation is complimentary. All information is
                      treated with strict confidentiality.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
