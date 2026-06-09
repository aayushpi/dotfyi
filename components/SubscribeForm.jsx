import { useState } from 'react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setMessage("You're subscribed. New notes will land in your inbox.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      <h2 className="font-sans font-black text-[1.5rem] tracking-[-0.02em] text-ink mb-1">
        Notes &amp; Thoughts in your Email
      </h2>
      <p className="text-ink text-[16px] mb-5">
        New notes by email, at most once every two weeks. Each email has an unsubscribe link that you can press if you'd like.
      </p>

      {status === 'success' ? (
        <p className="text-ink text-[16px]">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            disabled={status === 'loading'}
            className="flex-1 px-3 py-2 text-[16px] text-ink bg-bg border border-ink rounded-none outline-none focus:ring-2 focus:ring-highlight disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2 text-[16px] font-sans font-semibold text-bg bg-ink border border-ink cursor-pointer disabled:opacity-60 hover:opacity-90 transition-opacity"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-[14px] mt-3" style={{ color: '#F98585' }}>
          {message}
        </p>
      )}
    </div>
  );
}
