/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1e40d9', 50:'#eef2ff',100:'#dbe4ff',600:'#1e40d9',700:'#1731ad',900:'#101d5e' },
        saffron: { DEFAULT: '#ff891f', 50:'#fff3e8',100:'#ffe2c2',600:'#ff891f',700:'#e6720c' },
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
    },
  },
  plugins: [],
}
