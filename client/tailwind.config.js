module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Manual toggle
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo
        accent: '#10B981', // Emerald
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          text: '#E5E7EB',
          muted: '#9CA3AF'
        },
        light: {
          bg: '#FFFFFF',
          card: '#F9FAFB',
          text: '#111827',
          muted: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
