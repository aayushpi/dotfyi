import { ContactChat } from './ContactChat';

// TODO: confirm this is the right profile URL.
const LINKEDIN_URL = 'https://www.linkedin.com/in/aayushiyer/';

const BIG = 'font-sans text-[2rem] leading-[2.5rem] md:text-[2.5rem] md:leading-[3.25rem] tracking-[-0.02em] text-ink';
const LABEL = 'text-[16px] text-ink-muted mb-4 md:mb-10';

export const SiteFooter = () => (
  <footer className="px-6 lg:px-0 pb-16">
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-start-2 lg:col-span-10 border-t border-ink pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <p className="text-[16px] text-ink m-0">Say hello</p>
          <div>
            <p className={LABEL}>Message</p>
            <ContactChat className={BIG} />
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
