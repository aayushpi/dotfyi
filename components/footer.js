import { useState } from 'react';

// TODO: confirm this is the right profile URL.
const LINKEDIN_URL = 'https://www.linkedin.com/in/aayushiyer/';

// The address never appears in the HTML or as a plain string in the JS bundle.
// It's stored as shifted char codes and only decoded after a real click.
const ENCODED = [123, 115, 125, 114, 68, 102, 100, 125, 122, 118, 108, 51, 105, 125, 110];
const decode = () => ENCODED.map((c, i) => String.fromCharCode(c - (i % 3) - 3)).join('');

const BIG = 'font-sans text-[2rem] leading-[2.5rem] md:text-[2.5rem] md:leading-[3.25rem] tracking-[-0.02em] text-ink';
const LABEL = 'text-[16px] text-ink-muted mb-4 md:mb-10';

function MaskedEmail() {
  const [email, setEmail] = useState(null);

  if (email) {
    return (
      <a href={`mailto:${email}`} className={BIG}>
        {email}
      </a>
    );
  }

  const reveal = (e) => {
    // Ignore synthetic clicks/keypresses from scripts.
    if (e.isTrusted) setEmail(decode());
  };

  // Anchor (not <button>) so it picks up the site-wide link underline, same
  // pattern as SubscribeLink.
  return (
    <a
      role="button"
      tabIndex={0}
      onClick={reveal}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          reveal(e);
        }
      }}
      className={`${BIG} cursor-pointer`}
    >
      Reveal email
    </a>
  );
}

export const SiteFooter = () => (
  <footer className="px-6 lg:px-0 pb-16">
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-start-2 lg:col-span-10 border-t border-ink pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <p className="text-[16px] text-ink m-0">Say hello</p>
          <div>
            <p className={LABEL}>Email</p>
            <MaskedEmail />
          </div>
          <div>
            <p className={LABEL}>Social</p>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={BIG}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
