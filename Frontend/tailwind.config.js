/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // plugin for scrollbar //
    require('tailwind-scrollbar'),
    // If you want to add hover and rounded variants
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

