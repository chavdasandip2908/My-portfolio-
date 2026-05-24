'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '@/lib/api';

const bootLines = [
  'Initializing system...',
  'Loading kernel modules...',
  'Mounting file systems...',
  'Starting network interfaces...',
  '[  OK  ] System operational.',
];

export default function HeroSection() {
  const [downloading, setDownloading] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);

  // Typewriter boot effect
  useEffect(() => {
    if (visibleLines >= bootLines.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 400);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  const handleHireMe = () => {
    toast.success('Redirecting to contact section!', { icon: '👋' });
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cli-bg cli-grid-bg pt-16"
    >
      {/* Background glow accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cli-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cli-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-cli-green/40 bg-cli-green/5 font-jetbrains text-xs tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-cli-green cli-status-dot" aria-hidden="true" />
              <span className="text-cli-green uppercase">[ONLINE] OPEN TO NEW PROFESSIONAL OPPORTUNITIES</span>
            </motion.div>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-jetbrains text-cli-cyan text-sm tracking-widest uppercase mb-3"
            >
              <span className="text-cli-muted">//</span> SR. FULL-STACK ENGINEER
            </motion.p>

            {/* Main Heading — SEO h1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-jetbrains font-bold text-3xl md:text-4xl lg:text-5xl text-cli-text leading-tight mb-6"
            >
              ARCHITECTING{' '}
              <span className="text-cli-green cli-glow-green">HIGH-SCALE</span>
              <br />
              DISTRIBUTED SYSTEMS
              <br />
              <span className="text-cli-cyan cli-glow-cyan">&amp; WEB SOLUTIONS</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-jetbrains text-cli-muted text-sm md:text-base leading-relaxed mb-8 max-w-xl"
            >
              Specializing in{' '}
              <span className="text-cli-green">scalable APIs</span>,{' '}
              <span className="text-cli-green">interactive frontends</span>, and{' '}
              <span className="text-cli-green">robust full-stack applications</span>{' '}
              that drive business value and solve complex technical challenges.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                onClick={handleHireMe}
                data-text="INITIALIZE_CONTACT →"
                className="cli-btn-primary group inline-flex items-center justify-center gap-2 px-6 py-3 bg-cli-green text-cli-bg font-jetbrains font-bold text-sm tracking-wider border border-cli-green hover:bg-cli-green/90 hover:shadow-lg hover:shadow-cli-green/20 transition-all duration-200"
                aria-label="Go to contact section"
              >
                INITIALIZE_CONTACT
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <button
                onClick={handleResumeDownload}
                disabled={downloading}
                aria-label="Download Sandip Chavda's resume PDF"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-cli-green/40 text-cli-green font-jetbrains font-medium text-sm tracking-wider hover:border-cli-green/80 hover:bg-cli-green/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {downloading ? 'DECRYPTING...' : 'DOWNLOAD_RESUME'}
              </button>
            </motion.div>
          </div>

          {/* Right — System Debug Log Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
            aria-hidden="true"
          >
            <div className="border border-cli-green/30 bg-cli-surface cli-box-glow">
              {/* Panel Title Bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-cli-green/20 bg-cli-surface2">
                <div className="w-2.5 h-2.5 rounded-full bg-cli-red" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-cli-green" />
                <span className="ml-3 font-jetbrains text-xs text-cli-muted tracking-widest">
                  SYSTEM :: INIT_SEQUENCE
                </span>
                <span className="ml-auto font-jetbrains text-xs text-cli-green">● ONLINE</span>
              </div>

              {/* Boot log */}
              <div className="p-6 font-jetbrains text-sm space-y-2 min-h-[280px]">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`text-xs mt-0.5 ${
                      i === bootLines.length - 1 ? 'text-cli-green' : 'text-cli-cyan'
                    }`}>
                      {i === bootLines.length - 1 ? '[ OK ]' : '[    ]'}
                    </span>
                    <span className={i === bootLines.length - 1 ? 'text-cli-green' : 'text-cli-muted'}>
                      {line}
                    </span>
                  </div>
                ))}
                {visibleLines < bootLines.length && (
                  <div className="flex items-center gap-2">
                    <span className="text-cli-cyan text-xs">[    ]</span>
                    <span className="text-cli-muted">
                      {bootLines[visibleLines].slice(0, 5)}<span className="cli-cursor" />
                    </span>
                  </div>
                )}
                {visibleLines >= bootLines.length && (
                  <div className="mt-4 pt-4 border-t border-cli-green/10 space-y-1.5">
                    <div className="text-cli-muted text-xs">// SYSTEM INFO</div>
                    <div><span className="text-cli-cyan">NODE</span><span className="text-cli-muted">: </span><span className="text-cli-text">sandip@portfolio-v2</span></div>
                    <div><span className="text-cli-cyan">ROLE</span><span className="text-cli-muted">: </span><span className="text-cli-green">Senior Full-Stack Engineer</span></div>
                    <div><span className="text-cli-cyan">STATUS</span><span className="text-cli-muted">: </span><span className="text-cli-green">Available for hire</span></div>
                    <div><span className="text-cli-cyan">UPTIME</span><span className="text-cli-muted">: </span><span className="text-cli-text">1+ year experience</span></div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="text-cli-green">➜</span>
                      <span className="text-cli-muted">~</span>
                      <span className="cli-cursor" />
                    </div>
                  </div>
                )}
              </div>
            </div>


          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-jetbrains text-xs text-cli-muted flex flex-col items-center gap-2"
      >
        <span>SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-6 border border-cli-green/40 flex justify-center pt-1"
        >
          <div className="w-0.5 h-1.5 bg-cli-green rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
