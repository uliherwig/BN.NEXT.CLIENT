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
      errorMessage : 'text-red-500 text-sm',
      // Add custom styles for the error class
      colors: {
        error: '#FF00FF', // Define a custom error color
      },
      textColor: {
        error: 'text-red-500 text-sm', // Define a custom error text color
      },
      backgroundColor: {
        error: '#FF0000', // Define a custom error background color
      },
      borderColor: {
        error: '#FF0000', // Define a custom error border color
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        '.error-message': {
          '@apply text-red-500 text-sm': {},
        },
      });
    }),
  ],



};
export default config;
