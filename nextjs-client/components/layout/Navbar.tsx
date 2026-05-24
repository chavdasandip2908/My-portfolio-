'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';


const navLinks = [
  { name: 'About',    href: '/#about' },
  { name: 'Terminal', href: '/#terminal' },
  { name: 'Skills',   href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact',  href: '/#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -50% 0px' }
    );
    const sections = ['hero', 'about', 'terminal', 'skills', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);



  const isActive = (href: string) => {
    if (pathname !== '/') return false;
    const hash = href.split('#')[1];
    return activeSection === hash;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cli-bg/98 shadow-lg shadow-cli-green/5'
          : 'bg-cli-bg/90'
      } dark:bg-cli-bg backdrop-blur-xl border-b border-cli-green/20`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo — path-style */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center gap-2 group" aria-label="Home">
              <span className="text-cli-muted font-jetbrains text-sm">~/</span>
              <span className="text-xl font-black tracking-tighter font-jetbrains">
                <span className="text-cli-text dark:text-cli-text">Sandip</span>
                <span className="text-cli-green cli-glow-green">Chavda</span>
                <span className="text-cli-green animate-pulse">.</span>
              </span>
            </Link>
          </motion.div>



          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                role="none"
              >
                <Link
                  href={link.href}
                  role="menuitem"
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`relative px-4 py-1.5 text-sm font-medium font-jetbrains border transition-all duration-200 ${
                    isActive(link.href)
                      ? 'border-cli-green/60 bg-cli-green/10 text-cli-green cli-glow-green'
                      : 'border-transparent text-cli-muted hover:text-cli-green hover:border-cli-green/40 hover:bg-cli-green/5'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}


          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">


            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-cli-green/30 text-cli-muted hover:text-cli-green hover:border-cli-green/60 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-cli-green/20 bg-cli-bg"
            role="menu"
          >
            <div className="px-4 py-3 space-y-1 font-jetbrains">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  role="menuitem"
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-sm border transition-colors ${
                    isActive(link.href)
                      ? 'border-cli-green/50 bg-cli-green/10 text-cli-green'
                      : 'border-transparent text-cli-muted hover:text-cli-green hover:border-cli-green/30 hover:bg-cli-green/5'
                  }`}
                >
                  <span className="text-cli-green/60 text-xs">$</span>
                  {link.name.toLowerCase()}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
