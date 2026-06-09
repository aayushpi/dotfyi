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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-[inherit] text-[inherit] underline underline-offset-2 text-ink hover:text-highlight transition-colors bg-transparent border-none p-0 cursor-pointer"
      >
        Or an email every fortnight
      </button>

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
