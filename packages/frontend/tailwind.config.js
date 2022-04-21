/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const setting = {
  content: [
    '*/pages/**/*.{js,ts,jsx,tsx}',
    '*/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      screens: {
        mobile: '320px',
        tablet: '630px',
        laptop: '1024px',
        desktop: '1280px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

module.exports = setting
