import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Manual toggle via class on <html>
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo — same as original
        accent:  '#10B981', // Emerald — same as original
        dark: {
          bg:   '#0B0F19',
          card: '#111827',
          text: '#E5E7EB',
          muted:'#9CA3AF',
        },
        light: {
          bg:   '#FFFFFF',
          card: '#F9FAFB',
          text: '#111827',
          muted:'#6B7280',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
