/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        neutra: ['Neutra Text Book', 'Neutra Text Bold', 'Arial', 'sans-serif'],
        neutraBold: ['Neutra Text Bold', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
