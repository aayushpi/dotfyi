import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SubscribeForm } from './SubscribeForm';

export function SubscribeLink() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Anchor (not <button>) so it inherits the site-wide link style from
          globals.css — the animated coral underline. role/keyboard keep it
          accessible since it opens a modal rather than navigating. */}
      <a
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="cursor-pointer"
      >
        Or an email every fortnight
      </a>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Subscribe by email"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.45)' }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-bg border border-ink p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-2 right-3 text-[24px] leading-none text-ink hover:text-highlight bg-transparent border-none p-1 cursor-pointer"
              >
                &times;
              </button>
              <SubscribeForm />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
