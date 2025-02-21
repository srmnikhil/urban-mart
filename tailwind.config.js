/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./**/*.{js,jsx,ts,tsx}", // Include all JS/TS files
    "!./node_modules/**/*"     // Exclude node_modules
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}