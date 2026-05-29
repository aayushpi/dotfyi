/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,md,mdx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        highlight: '#F98585',
        ink: 'var(--color-ink)',
        'border-subtle': 'var(--color-border-subtle)',
        'ink-muted': 'var(--color-ink-muted)',
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
