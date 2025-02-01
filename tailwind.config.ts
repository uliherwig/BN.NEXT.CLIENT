import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin');

const config: Config = {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#334155', // Custom primary color
        secondary: '#f1f5f9', // Custom secondary color
        error: '#FF0000', // Custom error color
        success: '#10B981', // Custom success color
        warning: '#F59E0B', // Custom warning color
      },
      textColor: {
        primary: '#334155', // Custom primary text color
        secondary: '#f1f5f9', // Custom secondary text color
        error: '#FF0000', // Custom error text color
        success: '#10B981', // Custom success text color
        warning: '#F59E0B', // Custom warning text color
      },
      backgroundColor: {
        primary: '#f1f5f9', // Custom primary background color
        secondary: '#9333EA', // Custom secondary background color
        error: '#FF0000', // Custom error background color
        success: '#10B981', // Custom success background color
        warning: '#F59E0B', // Custom warning background color
      },
      borderColor: {
        primary: '#1D4ED8', // Custom primary border color
        secondary: '#9333EA', // Custom secondary border color
        error: '#FF0000', // Custom error border color
        success: '#10B981', // Custom success border color
        warning: '#F59E0B', // Custom warning border color
      },
      spacing: {
        '1': '0.25rem', // 4px
        '2': '0.5rem', // 8px
        '3': '0.75rem', // 12px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem', // 24px
        '8': '2rem', // 32px
        '10': '2.5rem', // 40px
        '12': '3rem', // 48px
        '16': '4rem', // 64px
        '20': '5rem', // 80px
        '24': '6rem', // 96px
        '32': '8rem', // 128px
      },
      fontSize: {
        'headline': ['1.25rem', { lineHeight: '1.5rem', fontWeight: 'bold' }], 
        'component-head': ['1.1rem', { lineHeight: '2rem', fontWeight: 'bold' }], 
        'subhead': ['1.2rem', { lineHeight: '1.3rem' }], // 24px
        'normal': ['0.9rem', { lineHeight: '0.9rem' }], // 16px
        'button': ['0.7rem', { lineHeight: '1.0rem' }], // 16px
      },
      height: {
        'content': 'calc(100vh - 70px)',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        '.content-container': {
          '@apply flex flex-row gap-0.5 h-content bg-slate-400': {},
        },
        '.component-container': {
          '@apply bg-white p-4 py-2 h-full': {},
        },
        '.component-head': {
          '@apply text-component-head mb-2': {},
        },
        '.bg-bn-dark': {
          '@apply bg-slate-700 h-[40px] text-white p-2': {},
        },
        '.error-message': {
          '@apply text-red-500 text-sm': {},
        },
      });
    }),
  ],



};
export default config;
