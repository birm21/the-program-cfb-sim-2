/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom pixel-art style hard shadows (no blur) for retro arcade aesthetic
      boxShadow: {
        'pixel-xs': '1px 1px 0px rgba(0,0,0,0.5)',
        'pixel-sm': '2px 2px 0px rgba(0,0,0,0.5)',
        'pixel': '3px 3px 0px rgba(0,0,0,0.5)',
        'pixel-md': '4px 4px 0px rgba(0,0,0,0.5)',
        'pixel-lg': '6px 6px 0px rgba(0,0,0,0.5)',
        'pixel-xl': '8px 8px 0px rgba(0,0,0,0.5)',
        'pixel-2xl': '12px 12px 0px rgba(0,0,0,0.8)',
        'pixel-3xl': '20px 20px 0px rgba(0,0,0,0.9)',
      },
    },
  },
  plugins: [],
}
