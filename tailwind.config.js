/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-green': 'hsla(160, 100%, 37%, 1)',
        'custom-green-hover': 'hsla(160, 100%, 37%, 0.2)'
      }
    }
  },
  plugins: []
}
