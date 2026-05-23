'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTheme } from '@/hooks/useTheme';
import { API_ENDPOINTS } from '@/lib/api';

export default function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [downloading, setDownloading] = useState(false);

  const heroImage = resolvedTheme === 'dark' ? '/developer3.png' : '/developer2.png';

  const handleHireMe = () => {
    toast.success('Redirecting to contact form!', { icon: '👋' });
  };

  const handleResumeDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    try {
      const response = await fetch(API_ENDPOINTS.resumeDownload);
      if (!response.ok) throw new Error('Resume not found');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sandip_Chavda_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Resume downloaded successfully!');
    } catch {
      toast.error('Failed to download resume. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0B0F19] dark:via-[#111a2e] dark:to-[#0B0F19] transition-colors duration-300 pt-16"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-medium text-sm md:text-base">
                Open to New Professional Opportunities
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl font-semibold text-primary mb-4"
            >
              Senior Full-Stack Engineer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text mb-6 leading-tight"
            >
              Architecting
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                High-Performance
              </span>
              <br />
              Web Solutions.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto lg:mx-0 text-light-muted dark:text-dark-muted text-lg md:text-xl mb-10 leading-relaxed"
            >
              Specializing in{' '}
              <span className="text-primary font-semibold">scalable APIs</span>,{' '}
              <span className="text-primary font-semibold">interactive frontends</span>, and{' '}
              <span className="text-primary font-semibold">robust full-stack applications</span>{' '}
              that drive business value and solve complex technical challenges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col md:flex-row justify-center lg:justify-start gap-4"
            >
              <a
                href="#contact"
                onClick={handleHireMe}
                className="group px-8 py-4 bg-accent hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span>Contact Me</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button
                onClick={handleResumeDownload}
                disabled={downloading}
                aria-label="Download Sandip Chavda's resume PDF"
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-light-text dark:text-dark-text font-semibold rounded-xl hover:border-primary dark:hover:border-primary transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {downloading ? 'Downloading...' : 'Download Resume'}
              </button>
            </motion.div>
          </div>

          {/* Developer Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <Image
                src={heroImage}
                alt="Sandip Chavda — Senior Full-Stack Engineer working on laptop"
                width={500}
                height={500}
                priority
                className="w-full max-w-lg drop-shadow-2xl"
              />
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
                className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-accent/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-hidden="true"
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
