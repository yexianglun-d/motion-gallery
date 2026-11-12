/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#e7ecf3',
          900: '#ffffff',
          850: '#f6f8fb',
          800: '#ffffff',
          700: '#f1f5f9',
          600: '#e5eaf1',
          500: '#d6dce6',
        },
        brand: {
          300: '#818cf8',
          400: '#6366f1',
          500: '#6366f1',
          600: '#4f46e5',
        },
        aqua: {
          300: '#22d3ee',
          400: '#06b6d4',
          500: '#0891b2',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'system-ui',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 10px 30px -16px rgba(15, 23, 42, 0.18)',
        glow: '0 0 0 1px rgba(99,102,241,0.25), 0 14px 34px -14px rgba(99,102,241,0.35)',
        drawer: '-20px 0 60px -24px rgba(15,23,42,0.25)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s cubic-bezier(0.22,1,0.36,1) both',
        'overlay-in': 'overlay-in 0.25s ease both',
      },
    },
  },
  plugins: [],
}
