import { useEffect, useState } from 'react';

const THEMES = ['auto', 'light', 'dark'];

const ICONS = {
  auto: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  light: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />

    </svg>
  ),
  dark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

const LABELS = { auto: 'Auto', light: 'Light', dark: 'Dark' };

function applyTheme(theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (theme === 'dark' || (theme === 'auto' && prefersDark)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState('auto');
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'auto';
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if ((localStorage.getItem('theme') || 'auto') === 'auto') applyTheme('auto');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  function cycle() {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-auto lg:top-[5.25rem] z-50">
      <div className="relative">
        <button
          onClick={cycle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="text-ink bg-transparent cursor-pointer p-2 flex items-center justify-center rounded border border-ink transition-colors"
          aria-label={`Theme: ${LABELS[theme]}`}
        >
          {ICONS[theme]}
        </button>
        {showTooltip && (
          <div
            className="absolute right-0 bottom-full mb-1 lg:bottom-auto lg:top-full lg:mb-0 lg:mt-1 px-2 py-1 text-[12px] font-mono bg-ink text-bg rounded whitespace-nowrap pointer-events-none"
          >
            {LABELS[theme]}
          </div>
        )}
      </div>
    </div>
  );
}
