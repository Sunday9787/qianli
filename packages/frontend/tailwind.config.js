/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/view/**/*.pug'],
  theme: {
    screens: {
      sx: '480px',
      sm: '680px',
      md: '768px',
      lg: '1170px',
      xl: '1368px',
      xxl: '1480px'
    },
    extend: {}
  },
  plugins: []
}
