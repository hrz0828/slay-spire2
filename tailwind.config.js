/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        spire: {
          900: '#151012',
          950: '#090607',
        },
        blood: {
          600: '#b91c1c',
          700: '#8f1515',
          800: '#641111',
          900: '#3b0a0a',
        },
        ember: {
          300: '#f5b86b',
          400: '#f08a3c',
          500: '#dc5f21',
        },
        bone: {
          100: '#f1eadf',
          300: '#c8bca9',
          500: '#8f8170',
        },
      },
      boxShadow: {
        ember: '0 0 24px rgb(220 95 33 / 0.28)',
      },
      backgroundImage: {
        'spire-radial':
          'radial-gradient(circle at top, rgb(100 17 17 / 0.45), transparent 36rem)',
      },
    },
  },
  plugins: [],
};
