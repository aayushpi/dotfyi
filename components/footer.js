import { ContactChat } from './ContactChat';

// TODO: confirm this is the right profile URL.
const LINKEDIN_URL = 'https://www.linkedin.com/in/aayushiyer/';
const SIGNOFF_URL = 'https://electricliterature.com/the-great-silence-by-ted-chiang/';

// Same style as the "Notes & Thoughts" heading on the homepage.
const HEADING = 'font-serif font-black text-[2rem] leading-[2.5rem] tracking-[-0.02em] text-ink m-0';

export const SiteFooter = () => (
  <footer className="px-6 lg:px-0 pb-32 md:pb-48">
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-start-2 lg:col-span-10 border-t border-ink pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <p className="text-[16px] text-ink m-0">
            <a href={SIGNOFF_URL} target="_blank" rel="noopener noreferrer">
              you be good, I love you
            </a>
          </p>
          <div className="flex flex-col gap-6">
            <ContactChat className={HEADING} />
            <p className={HEADING}>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
