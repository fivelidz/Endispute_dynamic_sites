'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { contact } from '@/lib/content';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

interface FormValues {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  message: string;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="eyebrow">{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormValues>({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

        {/* Left: info */}
        <div>
          <div className="eyebrow text-sapphire mb-4">Contact</div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-3xl md:text-4xl font-bold text-fg leading-[1.12] tracking-[-0.02em] mb-6"
          >
            Let&apos;s end your dispute
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            className="text-fg-2 leading-relaxed mb-10 text-[15px]"
          >
            Contact Endispute to access our professional dispute advisory
            service. We respond{' '}
            <strong className="text-fg">promptly and in confidence</strong> and offer a
            complimentary one-hour consultation to discuss your options.
          </motion.p>

          <div className="flex flex-col gap-4">
            {[
              { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
              { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
              { icon: MapPin, label: 'Reach', value: `${contact.reach}`, href: undefined },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.45, ease: EASE }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-line flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-sapphire" />
                </div>
                <div>
                  <div className="text-xs text-muted mb-0.5">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-fg hover:text-sapphire transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-fg">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="bento-cell p-10 bg-surface flex flex-col items-center text-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-sapphire-soft flex items-center justify-center">
                  <CheckCircle size={32} className="text-sapphire" />
                </div>
                <h3 className="text-xl font-semibold text-fg">Message received</h3>
                <p className="text-fg-2 text-sm leading-relaxed max-w-xs">
                  Thank you. We will respond <strong>promptly and in confidence</strong> with
                  next steps.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setValues({ name: '', organisation: '', email: '', phone: '', message: '' });
                  }}
                  className="text-xs text-muted hover:text-fg transition-colors underline underline-offset-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="bento-cell bg-surface p-6 md:p-8 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Name *">
                    <input
                      required
                      type="text"
                      value={values.name}
                      onChange={set('name')}
                      placeholder="Your name"
                      className="atlas-input"
                    />
                  </Field>

                  <Field label="Organisation">
                    <input
                      type="text"
                      value={values.organisation}
                      onChange={set('organisation')}
                      placeholder="Company / Firm"
                      className="atlas-input"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Email *">
                    <input
                      required
                      type="email"
                      value={values.email}
                      onChange={set('email')}
                      placeholder="you@company.com"
                      className="atlas-input"
                    />
                  </Field>

                  <Field label="Phone">
                    <input
                      type="tel"
                      value={values.phone}
                      onChange={set('phone')}
                      placeholder="+61 ..."
                      className="atlas-input"
                    />
                  </Field>
                </div>

                <Field label="Describe your dispute *">
                  <textarea
                    required
                    value={values.message}
                    onChange={set('message')}
                    placeholder="Briefly describe the nature of your dispute and what outcome you are seeking..."
                    rows={5}
                    className="atlas-input resize-none"
                  />
                </Field>

                <div className="flex justify-end pt-1">
                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    className="btn-primary px-8 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending…' : 'Send Message →'}
                  </MagneticButton>
                </div>

                <p className="text-xs text-muted text-center">
                  We respond promptly. Confidential.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
