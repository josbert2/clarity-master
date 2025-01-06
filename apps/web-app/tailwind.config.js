/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/flyonui/dist/js/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [

    require('clarity'),

  ],
}

