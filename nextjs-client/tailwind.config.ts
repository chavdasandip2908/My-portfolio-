import type { Config } from 'tailwindcss';

// NOTE: In Tailwind v4, most theme configuration moved to CSS @theme directive in globals.css.
// This file only handles content paths and dark mode strategy.
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
