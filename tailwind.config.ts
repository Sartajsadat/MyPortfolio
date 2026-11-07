import type { Config } from 'tailwindcss';

const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // Classes built dynamically in the project mockups
  safelist: [
    { pattern: /^(bg|text)-(accent|cyan|violet|success|warning|danger)$/ },
    { pattern: /^bg-(accent|cyan|violet|success|warning|danger)\/(15|40|70)$/ },
  ],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem' } },
    extend: {
      colors: {
        bg: c('bg'),
        surface: c('surface'),
        elevated: c('elevated'),
        line: c('line'),
        ink: c('ink'),
        muted: c('muted'),
        faint: c('faint'),
        accent: c('accent'),
        cyan: c('cyan'),
        violet: c('violet'),
        success: c('success'),
        danger: c('danger'),
        warning: c('warning'),
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: { site: '76rem' },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        blink: { '0%,50%': { opacity: '1' }, '50.01%,100%': { opacity: '0' } },
        dash: { to: { strokeDashoffset: '-40' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite',
        blink: 'blink 1s step-end infinite',
        dash: 'dash 1.6s linear infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
