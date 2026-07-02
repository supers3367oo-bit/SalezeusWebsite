/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Familjen Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Martian Mono"', 'monospace'],
        display: ['Anton', 'sans-serif'],
      },
      colors: {
        sz: {
          dark: '#040508',
          primary: '#303640',
          secondary: '#C3C3C3',
          interaction: '#3258A4',
          'interaction-hover': '#274A8F',
          'interaction-soft': 'rgba(50,88,164,0.12)',
          accent: '#F0B80D',
          'accent-soft': 'rgba(240,184,13,0.15)',
          border: '#E8E4DE',
          text: '#040508',
          surface: '#F8F7F4',
        },
      },
      borderRadius: {
        btn: '10px',
        card: '12px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
