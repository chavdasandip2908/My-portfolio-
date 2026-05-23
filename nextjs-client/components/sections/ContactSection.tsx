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
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-[#080c14] dark:to-[#0B0F19] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 id="contact-heading" className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
            Get In{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-lg text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
            I am always open to discussing new professional opportunities and technical challenges. Let&apos;s connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
            aria-label="Contact information"
          >
            {/* Email */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                navigator.clipboard.writeText('chavdasandip2908@gmail.com');
                toast.success('Email copied to clipboard!');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigator.clipboard.writeText('chavdasandip2908@gmail.com');
                  toast.success('Email copied to clipboard!');
                }
              }}
              aria-label="Copy email address to clipboard"
              className="group relative cursor-pointer"
            >
              <div aria-hidden="true" className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-10 group-hover:opacity-30 blur transition duration-300" />
              <div className="relative flex items-center p-6 bg-white dark:bg-[#111827]/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-xl mr-6 text-primary group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 font-mono">Mail Me At</h2>
                  <p className="text-gray-900 dark:text-white font-semibold truncate text-sm sm:text-base">chavdasandip2908@gmail.com</p>
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/chavdasandip/" target="_blank" rel="noopener noreferrer" className="group relative block" aria-label="Visit Sandip Chavda on LinkedIn">
              <div aria-hidden="true" className="absolute -inset-0.5 bg-gradient-to-r from-[#0077b5] to-blue-400 rounded-2xl opacity-10 group-hover:opacity-30 blur transition duration-300" />
              <div className="relative flex items-center p-6 bg-white dark:bg-[#111827]/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center bg-[#0077b5]/10 rounded-xl mr-6 text-[#0077b5] group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 font-mono">LinkedIn</h2>
                  <p className="text-gray-900 dark:text-white font-semibold truncate">chavdasandip</p>
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a href="https://github.com/chavdasandip2908" target="_blank" rel="noopener noreferrer" className="group relative block" aria-label="Visit Sandip Chavda on GitHub">
              <div aria-hidden="true" className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-500 rounded-2xl opacity-10 group-hover:opacity-30 blur transition duration-300" />
              <div className="relative flex items-center p-6 bg-white dark:bg-[#111827]/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center bg-gray-500/10 rounded-xl mr-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 font-mono">GitHub</h2>
                  <p className="text-gray-900 dark:text-white font-semibold truncate">chavdasandip2908</p>
                </div>
              </div>
            </a>
          </motion.aside>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#111827] p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700/50"
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Send a Quick Message
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">
                    Name
                  </label>
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
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all duration-300 disabled:opacity-50 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">
                    Email
                  </label>
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
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all duration-300 disabled:opacity-50 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase ml-1">
                  Message
                </label>
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
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all duration-300 disabled:opacity-50 outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                aria-label={sending ? 'Sending message...' : 'Send message'}
                className="w-full py-4 bg-gradient-to-r from-accent to-emerald-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-accent/20 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
