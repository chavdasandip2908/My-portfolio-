'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '@/lib/api';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const socialLinks = [
  {
    label: 'Mail Me At',
    value: 'chavdasandip2908@gmail.com',
    href: 'mailto:chavdasandip2908@gmail.com',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    accentClass: 'text-cli-green border-cli-green/30 hover:border-cli-green/70 hover:bg-cli-green/5',
  },
  {
    label: 'LinkedIn',
    value: 'chavdasandip',
    href: 'https://www.linkedin.com/in/chavdasandip/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    accentClass: 'text-cli-cyan border-cli-cyan/30 hover:border-cli-cyan/70 hover:bg-cli-cyan/5',
  },
  {
    label: 'GitHub',
    value: 'chavdasandip2908',
    href: 'https://github.com/chavdasandip2908',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    accentClass: 'text-cli-muted border-cli-muted/30 hover:border-cli-muted/60 hover:bg-cli-muted/5',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('All fields are required');
      return;
    }
    if (formData.name.length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }
    if (formData.message.length < 10) {
      toast.error('Message must be at least 10 characters');
      return;
    }

    setSending(true);
    try {
      const response = await fetch(API_ENDPOINTS.contactSend, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 bg-cli-bg cli-grid-bg transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center w-full mb-4">
            <div className="flex-1 h-px bg-cli-green/20" />
            <h2
              id="contact-heading"
              className="px-6 font-jetbrains text-lg tracking-widest text-cli-muted uppercase"
            >
              CONTACT SANDIP CHAVDA
            </h2>
            <div className="flex-1 h-px bg-cli-green/20" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Social / Contact Info Column */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            aria-label="Contact information and social links"
          >
            {/* Info terminal window */}
            <div className="border border-cli-green/30 bg-cli-surface cli-box-glow">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cli-green/20 bg-cli-surface2">
                <div className="w-2.5 h-2.5 rounded-full bg-cli-red" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-cli-green" />
                <span className="ml-3 font-jetbrains text-xs text-cli-muted tracking-widest">
                  CONTACT :: CHANNELS
                </span>
              </div>

              <div className="p-6 space-y-4 font-jetbrains">


                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={`${link.label}: ${link.value}`}
                    className={`group flex items-center gap-4 p-4 border transition-all duration-200 ${link.accentClass}`}
                  >
                    <div className="flex-shrink-0">
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] tracking-widest uppercase text-cli-muted mb-1">
                        {link.label}
                      </div>
                      <div className="text-sm font-medium truncate group-hover:opacity-90 transition-opacity">
                        {link.value}
                      </div>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ))}

                {/* Status widget */}
                <div className="mt-4 pt-4 border-t border-cli-green/10 text-xs">
                  <div className="flex items-center gap-2 text-cli-muted">
                    <span className="w-2 h-2 rounded-full bg-cli-green cli-status-dot" />
                    <span>I&apos;m always open to discussing new professional opportunities and technical challenges. Let&apos;s connect!</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <div className="border border-cli-green/30 bg-cli-surface cli-box-glow">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cli-green/20 bg-cli-surface2">
                <div className="w-2.5 h-2.5 rounded-full bg-cli-red" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-cli-green" />
                <span className="ml-3 font-jetbrains text-xs text-cli-muted tracking-widest">
                  MESSAGE :: DISPATCHER
                </span>
              </div>

              {/* Form — padded container */}
              <div className="p-8">


                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block font-jetbrains text-[10px] tracking-widest uppercase text-cli-muted"
                      >
                        // NAME
                      </label>
                      <div className="flex items-center border border-cli-green/25 bg-cli-bg focus-within:border-cli-green/60 transition-colors">
                        <span className="pl-3 font-jetbrains text-cli-green text-sm flex-shrink-0" aria-hidden="true">$</span>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          disabled={sending}
                          required
                          minLength={2}
                          aria-required="true"
                          className="flex-1 px-3 py-3 bg-transparent font-jetbrains text-sm text-cli-text placeholder-cli-muted/40 outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block font-jetbrains text-[10px] tracking-widest uppercase text-cli-muted"
                      >
                        // EMAIL
                      </label>
                      <div className="flex items-center border border-cli-green/25 bg-cli-bg focus-within:border-cli-green/60 transition-colors">
                        <span className="pl-3 font-jetbrains text-cli-green text-sm flex-shrink-0" aria-hidden="true">$</span>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email"
                          disabled={sending}
                          required
                          aria-required="true"
                          className="flex-1 px-3 py-3 bg-transparent font-jetbrains text-sm text-cli-text placeholder-cli-muted/40 outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block font-jetbrains text-[10px] tracking-widest uppercase text-cli-muted"
                    >
                      // MESSAGE
                    </label>
                    <div className="border border-cli-green/25 bg-cli-bg focus-within:border-cli-green/60 transition-colors">
                      <div className="flex items-start pt-3 pl-3 gap-2">
                        <span className="font-jetbrains text-cli-green text-sm flex-shrink-0" aria-hidden="true">$</span>
                        <textarea
                          id="contact-message"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can I help you today?"
                          disabled={sending}
                          required
                          minLength={10}
                          aria-required="true"
                          className="flex-1 pb-3 pr-3 bg-transparent font-jetbrains text-sm text-cli-text placeholder-cli-muted/40 outline-none resize-none disabled:opacity-50 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={sending}
                    aria-label={sending ? 'Sending message...' : 'Send message'}
                    className="w-full py-3.5 border border-cli-green bg-cli-green/5 text-cli-green font-jetbrains font-bold text-sm tracking-wider hover:bg-cli-green hover:text-cli-bg transition-all duration-200 shadow-lg shadow-cli-green/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <span>MESSAGE</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
