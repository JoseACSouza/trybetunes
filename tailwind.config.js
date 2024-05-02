/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.js',
    './src/components/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'trybe-green': '#05352d',
        'nav-green': 'RGB(40, 200, 137)',
        'selected-nav-green': 'RGB(4, 111, 81)',
        'bg-login': 'RGB(252, 251, 251)',
      },
    },
  },
  plugins: [],
};
