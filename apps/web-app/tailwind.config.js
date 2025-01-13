/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './node_modules/clarity/dist/js/*.js',
  ],
  theme: {
    extend: {},
  },
  flyonui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff0095",
          "primary-content": "#160008",
          "secondary": "#00e899",
          "secondary-content": "#001308",
          "accent": "#00ffff",
          "accent-content": "#001616",
          "neutral": "#081008",
          "neutral-content": "#c6c9c6",
          "base-100": "#e5ffff",
          "base-200": "#c7dede",
          "base-300": "#aabebe",
          "base-content": "#121616",
          "info": "#008ca0",
          "info-content": "#000709",
          "success": "#00f09f",
          "success-content": "#001409",
          "warning": "#ff4900",
          "warning-content": "#160200",
          "error": "#ff989c",
          "error-content": "#160809"
        }
      }
    ]
  },
  plugins: [

    require('clarity'),
    require('clarity/plugin')
  ],
}

