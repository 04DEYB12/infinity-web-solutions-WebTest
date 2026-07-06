/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,php}",
    "./dist/**/*.{html,js,php}",
    "./*.html",
    "./*.php",
    "./view/**/*.php",
    "./controller/**/*.js",
    "./scripts/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}