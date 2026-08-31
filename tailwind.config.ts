import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0c',
          soft: '#141418',
          line: '#26262c',
        },
        paper: {
          DEFAULT: '#ffffff',
          muted: '#f4f4f6',
          card: '#ffffff',
        },
        silver: {
          100: '#eef0f2',
          200: '#d9dce0',
          300: '#c9ccd1',
          500: '#9aa0a8',
          700: '#5b6169',
        },
        // Amarillo suave de marca JP (acento). Predominan negro/gris/blanco.
        gold: {
          DEFAULT: '#f6cf5b',
          soft: '#ffe08a',
          deep: '#c99b2e',
        },
        // Aliases por compatibilidad.
        brass: { DEFAULT: '#f6cf5b', soft: '#ffe08a', deep: '#c99b2e' },
        red: { DEFAULT: '#f6cf5b', soft: '#ffe08a', deep: '#c99b2e' },
        steel: {
          50: '#f5f6f7',
          100: '#e9ebee',
          200: '#d2d6dc',
          400: '#8a9199',
          600: '#525a63',
          800: '#272b31',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,10,12,.06), 0 14px 34px -14px rgba(10,10,12,.20)',
        lift: '0 26px 64px -24px rgba(10,10,12,.5)',
      },
      borderRadius: {
        xl2: '1.1rem',
      },
      maxWidth: {
        content: '1240px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'logo-in': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(.96)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,.61,.36,1) both',
        marquee: 'marquee 32s linear infinite',
        'logo-in': 'logo-in .9s cubic-bezier(.22,.61,.36,1) both',
        sweep: 'sweep 1.1s ease-in-out .35s both',
      },
    },
  },
  plugins: [],
};

export default config;
