'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Phone, Mail, Clock, Globe, CheckCircle2, Send } from 'lucide-react';
import { contact, processes } from '@/lib/content';
import { cn } from '@/lib/cn';
import { fadeUpContainer, fadeUpItem } from '@/lib/variants';

interface FormState {
  name: string;
  organisation: string;
  email: string;
  disputeType: string;
  message: string;
}

const initialForm: FormState = {
  name: '',
  organisation: '',
  email: '',
  disputeType: '',
  message: '',
};

const inputBase =
  'w-full rounded-xl border border-[#e3e4e8] bg-white px-4 py-3 text-sm text-[#011821] placeholder-[#a7aab2] focus:outline-none focus:ring-2 focus:ring-[#111a4a]/30 focus:border-[#111a4a] transition-all duration-200';

export default function Contact() {
  const shouldReduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const contactDetails = [
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Clock,
      label: 'Response',
      value: contact.responseWindow,
      href: null as string | null,
    },
    {
      icon: Globe,
      label: 'We operate',
      value: contact.reach,
      href: null as string | null,
    },
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#f6f6f8]">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-12">
          {/* Left: contact details */}
          <motion.div
            variants={fadeUpContainer}
            initial={shouldReduce ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={fadeUpItem}
              className="text-xs font-medium tracking-widest uppercase text-[#ec652b] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Get In Touch
            </motion.p>
            <motion.h2
              variants={fadeUpItem}
              className="text-3xl lg:text-[40px] font-medium text-[#011821] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Start your{' '}
              <em className="text-[#111a4a]" style={{ fontStyle: 'italic' }}>
                resolution journey
              </em>
            </motion.h2>
            <motion.p variants={fadeUpItem} className="text-[#7c7f88] leading-relaxed mb-10">
              Contact us for a complimentary one-hour consultation. We&apos;ll assess your dispute
              and recommend the most appropriate process.
            </motion.p>

            <motion.div variants={fadeUpContainer} className="flex flex-col gap-5 mb-12">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  variants={fadeUpItem}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#111a4a]/8 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#111a4a]" />
                  </div>
                  <div>
                    <p
                      className="text-xs text-[#7c7f88] mb-0.5"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {label}
                    </p>
                    {href !== null ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-[#011821] hover:text-[#111a4a] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-[#011821]">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative teal box */}
            <motion.div
              variants={fadeUpItem}
              className="rounded-lg bg-[#111a4a] p-6 text-white"
            >
              <p
                className="text-xs tracking-widest uppercase text-[#ec652b] mb-2"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Complimentary
              </p>
              <p
                className="font-semibold text-lg mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                One-hour intake consultation
              </p>
              <p className="text-sm text-white/65 leading-relaxed">
                No commitment — our initial consultation is complimentary. We&apos;ll discuss your
                dispute, recommend the right process, and outline transparent costs.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="bg-white rounded-lg border border-[#e3e4e8] shadow-xl shadow-[#111a4a]/6 p-8 lg:p-10 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <h3
                    className="text-2xl font-medium text-[#011821] mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Arrange a consultation
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-medium text-[#7c7f88]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        Full name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="organisation"
                        className="text-xs font-medium text-[#7c7f88]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        Organisation
                      </label>
                      <input
                        id="organisation"
                        name="organisation"
                        type="text"
                        placeholder="Company or firm"
                        value={form.organisation}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium text-[#7c7f88]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      Email address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="disputeType"
                      className="text-xs font-medium text-[#7c7f88]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      Dispute process of interest
                    </label>
                    <select
                      id="disputeType"
                      name="disputeType"
                      value={form.disputeType}
                      onChange={handleChange}
                      className={cn(inputBase, 'cursor-pointer')}
                    >
                      <option value="">Select a process…</option>
                      {processes.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                      <option value="Not sure">Not sure yet</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-medium text-[#7c7f88]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      Brief description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Briefly describe your dispute situation…"
                      value={form.message}
                      onChange={handleChange}
                      className={cn(inputBase, 'resize-none')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      'mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold transition-all duration-200',
                      submitting
                        ? 'bg-[#111a4a]/60 cursor-wait text-white'
                        : 'bg-[#111a4a] text-white hover:bg-[#1c2a6e] shadow-lg shadow-[#111a4a]/20'
                    )}
                  >
                    {submitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send enquiry
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-[#a7aab2]">
                    Your information is kept strictly confidential.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-5"
                >
                  <motion.div
                    initial={shouldReduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#111a4a]" />
                  </motion.div>
                  <h3
                    className="text-3xl font-medium text-[#011821]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Enquiry received
                  </h3>
                  <p className="text-[#7c7f88] leading-relaxed max-w-sm">
                    Thank you for reaching out. We&apos;ll review your enquiry and respond{' '}
                    <strong className="text-[#111a4a]">promptly, in confidence</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm(initialForm);
                    }}
                    className="mt-4 px-5 py-2.5 rounded-full border-2 border-[#111a4a] text-[#111a4a] text-sm font-medium hover:bg-[#111a4a] hover:text-white transition-colors"
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
