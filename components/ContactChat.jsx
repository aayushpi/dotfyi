import { useEffect, useRef, useState } from 'react';

// "Send a note" trigger + a small floating chat window anchored next to it.
// The destination address lives only on the server (pages/api/contact.js).
export function ContactChat({ className = '' }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [sentNote, setSentNote] = useState('');
  const openedAt = useRef(0);
  const wrapRef = useRef(null);
  const emailRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    openedAt.current = Date.now();
    emailRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  async function send(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, note, website, elapsed: Date.now() - openedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Try again?');
      setSentNote(note);
      setNote('');
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  const toggle = () => setOpen((o) => !o);

  return (
    <div ref={wrapRef} className="relative">
      <a
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls="contact-chat"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        className={`${className} cursor-pointer`}
      >
        Send a note
      </a>

      {open && (
        <div
          id="contact-chat"
          role="dialog"
          aria-label="Send a note"
          className="fixed inset-x-4 bottom-4 z-[60] md:absolute md:inset-x-auto md:left-0 md:bottom-full md:mb-4 md:w-[22rem] bg-bg border border-ink shadow-[6px_6px_0_0_#F98585] flex flex-col max-h-[calc(100vh-2rem)]"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
            <span className="text-[16px] font-semibold text-ink">Aayush</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-[22px] leading-none text-ink hover:text-highlight bg-transparent border-none p-0 cursor-pointer"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col gap-2 px-4 py-4 overflow-y-auto text-[15px] leading-snug">
            <p className="self-start max-w-[85%] m-0 px-3 py-2 bg-ink text-bg">
              Hi! Leave a note and your email. I&rsquo;ll write back.
            </p>
            {status === 'sent' && (
              <>
                <p className="self-end max-w-[85%] m-0 px-3 py-2 bg-highlight text-[#2c3e50] whitespace-pre-wrap break-words">
                  {sentNote}
                </p>
                <p className="self-start max-w-[85%] m-0 px-3 py-2 bg-ink text-bg">
                  Got it, thanks. I&rsquo;ll reply to {email}.
                </p>
              </>
            )}
          </div>

          {status !== 'sent' && (
            <form onSubmit={send} className="flex flex-col gap-2 px-4 pb-4">
              {/* Honeypot: invisible to people, tempting to bots. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                aria-hidden="true"
                className="absolute w-px h-px opacity-0 pointer-events-none -left-[9999px]"
              />
              <input
                ref={emailRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Your email"
                disabled={status === 'sending'}
                className="w-full px-3 py-2 text-[16px] text-ink bg-bg border border-ink rounded-none outline-none focus:ring-2 focus:ring-highlight disabled:opacity-60"
              />
              <div className="flex gap-2 items-end">
                <textarea
                  required
                  rows={3}
                  maxLength={5000}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) e.currentTarget.form.requestSubmit();
                  }}
                  placeholder="Write a note…"
                  aria-label="Your note"
                  disabled={status === 'sending'}
                  className="flex-1 px-3 py-2 text-[16px] text-ink bg-bg border border-ink rounded-none outline-none resize-none focus:ring-2 focus:ring-highlight disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-label="Send"
                  className="h-10 w-10 shrink-0 flex items-center justify-center text-bg bg-ink border border-ink cursor-pointer disabled:opacity-60 hover:opacity-90"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              {status === 'error' && (
                <p role="alert" className="m-0 text-[14px] font-semibold text-ink">{error}</p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
