import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      boxShadow: {
        'custom-top': '0px -2px 6px rgba(0, 0, 0, 0.05)', // nav 상단 그림자
      },
      screens: {
        '2xl': '1400px',
        'h-815': { raw: '(max-height: 815px)' }, // 높이 기준 브레이크포인트 추가
        'w-380': { raw: '(max-width: 380px)' },
      },

      backgroundImage: {
        messageDetail: "url('/detailMessageBg.png')",
        honestTalkPreview: "url('/honestTalkPreviewBg.png')",
        thanksPreview: "url('/thanksPreviewBg.png')",
        home: "url('/home_banner_normal.svg')",
        main: "url('/bg_splash.svg')",
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Main Colors
        'system-green': '#4DDF22',
        'system-blue': '#35B6FF',
        'system-pink': '#FFD4FE',

        // Grayscale
        'gray-1': '#F6F7FC',
        'gray-2': '#C5C5C5',
        'gray-3': '#474747',
        'gray-4': '#1F1F1F',
        black: '#000000',
        white: '#FFFFFF',
      },

      letterSpacing: {
        '-0.75': '-0.047rem', // -0.75px (16px 기준 rem 값)
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [tailwindcssAnimate, require('tailwind-scrollbar-hide')],
} satisfies Config

export default config
