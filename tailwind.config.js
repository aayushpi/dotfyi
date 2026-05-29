/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,md,mdx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fce2e0',
        highlight: '#F98585',
        ink: '#2c3e50',
        'border-subtle': 'rgba(44, 62, 80, 0.2)',
        'ink-muted': '#606b85',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2c3e50',
            a: { color: '#2c3e50', textDecoration: 'underline' },
            'h1,h2,h3,h4,h5,h6': { color: '#2c3e50' },
          },
        },
      },
    },
  },
  plugins: [],
};
