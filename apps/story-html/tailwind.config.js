/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/**/*.{vue,js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('../../packages/clarity'), 
  ],
  flyonui: {
    themes: [
      {
        entrekids: {
          "primary": "#00b4f0",
          "primary-content": "#fff",
          "secondary": "#ef4444",
          "secondary-content": "#1f1f1f",
          "accent": "#06ccca",
          "accent-content": "#1f1f1f",
          "neutral": "#162a41",
          "neutral-content": "#1f1f1f",
          "base-100": "#fff9f9",
          "base-200": "#ded9d9",
          "base-300": "#beb9b9",
          "base-content": "#161515",
          "info": "#00b7fb",
          "info-content": "#000c15",
          "success": "#06ccca",
          "success-content": "#d9e3d0",
          "warning": "#d06000",
          "warning-content": "#100300",
          "error": "#d20040",
          "error-content": "#fdd6d7"
        }
      }
    ]
  }
}

