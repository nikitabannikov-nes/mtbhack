import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e6eeff',
          100: '#c0d0ff',
          500: '#0047CC',
          600: '#0033A0',
          700: '#001F6B',
          900: '#000d30',
        },
        rarity: {
          default:   '#9E9E9E',
          common:    '#607D8B',
          rare:      '#1565C0',
          epic:      '#6A1B9A',
          legendary: '#E65100',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
