module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true
    },
    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('/images/rectangle.png')"
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
