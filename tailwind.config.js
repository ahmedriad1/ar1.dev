const theme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['app/**/*.{tsx,ts,jsx,js}', 'content/**/*.{tsx,ts,jsx,js,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...theme.fontFamily.sans],
      },
      colors: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'primary-lighter': 'var(--primary-lighter)',
        light: 'var(--light)',
        accent: 'var(--accent)',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
