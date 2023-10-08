/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./frontend/views/**/*.pug'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '1920px'
    },
    extend: {}
  },
  plugins: []
}
