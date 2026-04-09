/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1020',
        paper: '#f5efe7',
        accent: '#ff7f50',
        accentSoft: '#ffb29a',
        panel: '#11182d',
      },
      boxShadow: {
        glow: '0 20px 80px rgba(255, 127, 80, 0.18)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at top left, rgba(255,127,80,0.25), transparent 36%), radial-gradient(circle at top right, rgba(134, 92, 255, 0.18), transparent 24%), linear-gradient(180deg, #0b1020 0%, #11182d 52%, #0b1020 100%)',
      },
    },
  },
  plugins: [],
};
