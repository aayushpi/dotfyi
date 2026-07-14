import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';

// Coral page transition — a full-viewport panel that wipes across the screen,
// masks the route change, then wipes off to reveal the destination. It reuses
// the site's coral (#F98585) so the underline motif becomes the transition.
//
// Forward: panel rises up from below, covers, then exits off the top.
// Reverse: panel drops down from above, covers, then exits off the bottom.

const VEIL_ID = 'coral-sweep-veil';
const COVER_MS = 340;
const HOLD_MS = 60;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

export function useCoralSweep() {
  const router = useRouter();
  const running = useRef(false);

  return useCallback(
    async (href, { reverse = false } = {}) => {
      const el = typeof document !== 'undefined' ? document.getElementById(VEIL_ID) : null;
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // No veil or reduced motion → just navigate.
      if (!el || reduce) {
        router.push(href);
        return;
      }
      if (running.current) return;
      running.current = true;

      const start = reverse ? '-101%' : '101%';
      const exit = reverse ? '101%' : '-101%';

      // Park at the start edge with no transition, then force a reflow.
      el.style.transition = 'none';
      el.style.transform = `translateY(${start})`;
      el.style.pointerEvents = 'auto';
      void el.offsetWidth;

      // Cover the screen.
      el.style.transition = `transform ${COVER_MS}ms cubic-bezier(.65, 0, .35, 1)`;
      el.style.transform = 'translateY(0)';
      await wait(COVER_MS);

      // Swap the route while fully covered, let the new page paint.
      await router.push(href);
      await nextFrame();
      await wait(HOLD_MS);

      // Uncover toward the exit edge.
      el.style.transform = `translateY(${exit})`;
      await wait(COVER_MS);

      // Reset to the resting (hidden) position.
      el.style.transition = 'none';
      el.style.transform = 'translateY(101%)';
      el.style.pointerEvents = 'none';
      running.current = false;
    },
    [router],
  );
}

// Shared click handler factory: hijacks a left-click into a sweep, but leaves
// modifier-clicks (open-in-new-tab, etc.) to the browser.
export function sweepOnClick(sweep, href, options) {
  return (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    sweep(href, options);
  };
}
