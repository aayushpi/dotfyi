import { useEffect, useState } from 'react';

// Temporary: lets the serif variants in styles/globals.css be compared on
// the live site. Pick from the menu or link straight to one with ?serif=<key>.
const VARIANTS = [
  { key: 'current', label: 'Playfair Display (current)' },
  { key: 'playfair', label: 'Playfair 2.0 Light' },
  { key: 'instrument', label: 'Instrument Serif' },
  { key: 'fraunces', label: 'Fraunces Light' },
  { key: 'bodoni', label: 'Bodoni Moda' },
  { key: 'newsreader', label: 'Newsreader Light' },
  { key: 'source', label: 'Source Serif 4 Light' },
  { key: 'italiana', label: 'Italiana' },
];

const KEYS = VARIANTS.map((v) => v.key);

function applySerif(key) {
  const root = document.documentElement;
  if (key === 'current') delete root.dataset.serif;
  else root.dataset.serif = key;
}

export default function SerifPicker() {
  const [serif, setSerif] = useState('current');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get('serif');
    const stored = localStorage.getItem('serif');
    const initial = KEYS.includes(fromQuery) ? fromQuery : KEYS.includes(stored) ? stored : 'current';
    setSerif(initial);
    applySerif(initial);
    localStorage.setItem('serif', initial);
    setMounted(true);
  }, []);

  function choose(event) {
    const next = event.target.value;
    setSerif(next);
    localStorage.setItem('serif', next);
    applySerif(next);
  }

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <label htmlFor="serif-picker" className="sr-only">Heading serif</label>
      <select
        id="serif-picker"
        value={serif}
        onChange={choose}
        className="font-mono text-[12px] text-ink bg-bg cursor-pointer px-2 py-2 rounded border border-ink max-w-[60vw]"
      >
        {VARIANTS.map((v) => (
          <option key={v.key} value={v.key}>{v.label}</option>
        ))}
      </select>
    </div>
  );
}
