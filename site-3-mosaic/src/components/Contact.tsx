'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { contact } from '@/lib/content';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface FormValues {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  message: string;
}

function FieldCard({
  label,
  children,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 24 }}
      className="bento-cell p-4 bg-white focus-within:shadow-md focus-within:shadow-navy/10 transition-shadow"
    >
      <label className="font-mono-jb text-xs text-muted uppercase tracking-widest block mb-2">
        {label}
      </label>
      {children}
    </motion.div>
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

  const inputClass =
    'w-full bg-transparent text-ink text-sm font-medium placeholder-muted/50 focus:outline-none';

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Left: info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono-jb text-xs text-terracotta uppercase tracking-widest mb-4"
          >
            Contact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-ink leading-[1.15] mb-6"
          >
            Let&apos;s end your{' '}
            <span className="font-serif-italic text-terracotta">dispute</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted leading-relaxed mb-10"
          >
            Contact Endispute to access our professional dispute advisory
            service. We respond within{' '}
            <strong className="text-navy">48 hours</strong> and offer a
            complimentary one-hour consultation to discuss your options.
          </motion.p>

          {/* Contact details */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
              { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
              { icon: MapPin, label: 'Reach', value: `${contact.reach}`, href: undefined },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-navy" />
                </div>
                <div>
                  <div className="font-mono-jb text-xs text-muted mb-0.5">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-ink hover:text-terracotta transition-colors"
                      data-cursor="grow"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-ink">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Bento form */}
        <div>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 250, damping: 28 }}
                className="bento-cell p-10 bg-sage-pale flex flex-col items-center text-center gap-5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 22 }}
                  className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center"
                >
                  <CheckCircle size={32} className="text-sage" />
                </motion.div>
                <h3 className="text-xl font-bold text-navy">Message received</h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs">
                  Thank you. We will respond within{' '}
                  <strong>48 hours</strong> with next steps.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setValues({ name: '', organisation: '', email: '', phone: '', message: '' });
                  }}
                  className="text-xs text-muted hover:text-navy transition-colors underline underline-offset-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <FieldCard label="Name *" delay={0.25}>
                    <input
                      required
                      type="text"
                      value={values.name}
                      onChange={set('name')}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </FieldCard>

                  <FieldCard label="Organisation" delay={0.3}>
                    <input
                      type="text"
                      value={values.organisation}
                      onChange={set('organisation')}
                      placeholder="Company / Firm"
                      className={inputClass}
                    />
                  </FieldCard>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FieldCard label="Email *" delay={0.35}>
                    <input
                      required
                      type="email"
                      value={values.email}
                      onChange={set('email')}
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </FieldCard>

                  <FieldCard label="Phone" delay={0.4}>
                    <input
                      type="tel"
                      value={values.phone}
                      onChange={set('phone')}
                      placeholder="+61 ..."
                      className={inputClass}
                    />
                  </FieldCard>
                </div>

                <FieldCard label="Describe your dispute *" delay={0.45}>
                  <textarea
                    required
                    value={values.message}
                    onChange={set('message')}
                    placeholder="Briefly describe the nature of your dispute and what outcome you are seeking..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </FieldCard>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-end pt-2"
                >
                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3.5 bg-navy text-paper font-semibold rounded-full text-sm hover:bg-terracotta disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-navy/20"
                  >
                    {submitting ? 'Sending…' : 'Send Message →'}
                  </MagneticButton>
                </motion.div>

                <p className="text-xs text-muted text-center">
                  We respond within 48 hours. Confidential.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
