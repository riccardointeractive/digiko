/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        digiko: {
          primary: '#0066FF', // Vibrant deep blue
          secondary: '#0052CC', // Darker variant
          blue: {
            50: '#E6F0FF',
            100: '#B3D4FF',
            200: '#80B8FF',
            300: '#4D9CFF',
            400: '#1A80FF',
            500: '#0066FF', // Primary
            600: '#0052CC',
            700: '#003D99',
            800: '#002966',
            900: '#001433',
          },
          dark: {
            50: '#1C1C1E',
            100: '#18181A',
            200: '#121214',
            300: '#0A0A0C',
            400: '#050506',
          },
          gray: {
            50: '#2C2C2E',
            100: '#242426',
            200: '#1C1C1E',
            300: '#161618',
            400: '#0E0E10',
          },
          accent: '#00D4FF',
          'accent-secondary': '#7C3AED',
        },
        klever: {
          purple: '#0070ba',
          dark: '#0a0a0a',
          gray: '#141414',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 112, 186, 0.3)',
        'glow-md': '0 0 20px rgba(0, 112, 186, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 112, 186, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};