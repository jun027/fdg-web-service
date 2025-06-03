const { palette } = require('./src/style/config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        1440: '1440px',
        1520: '1520px',
        650: '650px',
      },
      zIndex: {
        // Level 1
        header: 100,
        depositBadge: 900,

        // Level 2
        // --- Header ---
        headerMobileBG: 10,
        headerMobileMenu: 20,
      },
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        4: '4px',
      },
      boxShadow: {
        'announcement-card': '0 2px 8px 0px #aeaeae',
      },
      animation: {
        'divination-blocks-animation': 'sprite-sheet-keyframes 0.5s steps(4) infinite',
        'smoke-animation': 'sprite-sheet-keyframes 4.0s steps(65) infinite',
      },
      keyframes: {
        'sprite-sheet-keyframes': {
          '0%': { backgroundPositionX: '0%' },
          '100%': { backgroundPositionX: '100%' },
        },
      },
      fontFamily: {
        'noto-sans-tc': ['Noto Sans TC', 'sans-serif'],
        'noto-serif-tc': ['Noto Serif TC', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        albert: ['Albert Sans', 'sans-serif'],
      },
      fontSize: {
        88: '88px',
        72: '72px',
        64: '64px',
        56: '56px',
        48: '48px',
        36: '36px',
        32: '32px',
        24: '24px',
        20: '20px',
        16: '16px',
        14: '14px',
        12: '12px',
      },
      colors: {
        // Common
        dark: palette.common.dark,
        white: palette.common.white,
        background: palette.common.background,
        success: palette.common.success,
        'success-background': palette.common['success-background'],
        link: palette.common.link,
        // Dark
        'dark-900': palette.dark[900],
        'dark-800': palette.dark[800],
        'dark-700': palette.dark[700],
        'dark-600': palette.dark[600],
        'dark-500': palette.dark[500],
        'dark-400': palette.dark[400],
        'dark-300': palette.dark[300],
        'dark-200': palette.dark[200],
        'dark-100': palette.dark[100],
        // Primary
        'primary-900': palette.primary[900],
        'primary-800': palette.primary[800],
        'primary-700': palette.primary[700],
        'primary-600': palette.primary[600],
        'primary-500': palette.primary[500],
        'primary-400': palette.primary[400],
        'primary-300': palette.primary[300],
        'primary-200': palette.primary[200],
        'primary-100': palette.primary[100],
        // Secondary
        'secondary-900': palette.secondary[900],
        'secondary-800': palette.secondary[800],
        'secondary-700': palette.secondary[700],
        'secondary-600': palette.secondary[600],
        'secondary-500': palette.secondary[500],
        'secondary-400': palette.secondary[400],
        'secondary-300': palette.secondary[300],
        'secondary-200': palette.secondary[200],
        'secondary-100': palette.secondary[100],
        // Red
        'red-900': palette.red[900],
        'red-800': palette.red[800],
        'red-700': palette.red[700],
        'red-600': palette.red[600],
        'red-500': palette.red[500],
        'red-400': palette.red[400],
        'red-300': palette.red[300],
        'red-200': palette.red[200],
        'red-100': palette.red[100],
      },
    },
  },
  plugins: [],
}
