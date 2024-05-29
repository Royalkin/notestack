module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Updated from 'purge' to 'content'
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        // Define your custom accent colors here
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
