let environment = {
  plugins: [
    require('tailwindcss')('./app/javascript/stylesheets/tailwind.config.js'),
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
}

// if (process.env.RAILS_ENV === 'production') {
//   environment.plugins.push(
//     require('@fullhuman/postcss-purgecss')({
//       content: [
//         './app/**/.html.erb',
//         './app/helpers/**/*.rb',
//         './app/javascript/**/*.js',
//         './app/javascript/**/*.jsx',
//       ],
//       defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || []
//     })
//   )
// }

module.exports = environment;
