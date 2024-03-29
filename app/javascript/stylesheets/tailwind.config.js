module.exports = {
  //mode: 'jit',
  // purge: [
  //   './app/**/*.html.erb',
  //   './app/**/*.erb',
  //   './app/javascript/**/*.scss',
  //   './app/helpers/**/*.rb',
  //   './app/javascript/**/*.js',
  //   './app/javascript/**/*.vue',
  //   './app/javascript/**/*.jsx',
  // ],
  purge: false,
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      absolutewhite: '#ffffff',
      black: '#27282d',
      white: '#f9f9f9',
      purple: '#736EFE',
      teal: '#1dffd4',

      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },
      red: '#F76C48',
      orange: {
        100: '#fffaf0',
        200: '#feebc8',
        300: '#fbd38d',
        400: '#f6ad55',
        500: '#ed8936',
        600: '#dd6b20',
        700: '#c05621',
        800: '#9c4221',
        900: '#7b341e',
      },
      yellow: {
        100: '#fffff0',
        200: '#fefcbf',
        300: '#faf089',
        400: '#f6e05e',
        500: '#ecc94b',
        600: '#d69e2e',
        700: '#b7791f',
        800: '#975a16',
        900: '#744210',
      },
      green: {
        100: '#f0fff4',
        200: '#c6f6d5',
        300: '#9ae6b4',
        400: '#68d391',
        500: '#48bb78',
        600: '#38a169',
        700: '#2f855a',
        800: '#276749',
        900: '#22543d',
      },
      blue: {
        100: '#85BBFF',
        400: '#63b3ed',
        500: '#2E8BFF',
        600: '#177EFE',
        700: '#0A77FF',
        900: '#0071FF',
      },
    },  
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
