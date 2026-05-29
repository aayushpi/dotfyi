import Head from 'next/head';
import Link from 'next/link';

function WorkSection({ title, description, links }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 py-12 border-t border-border-subtle">
      <div>
        <h2 className="font-serif font-black text-2xl text-ink mb-3">{title}</h2>
        <p className="text-base text-ink">{description}</p>
      </div>
      <div>
        <h3 className="font-serif font-black text-sm text-ink-muted uppercase tracking-wide mb-3">
          Links, talks, and related writing
        </h3>
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <>
      <Head>
        <title>Work Portfolio — Aayush Iyer</title>
      </Head>

      <div>
        <div className="mb-6 flex items-center gap-2 text-[18px]">
          <Link href="/" className="no-underline hover:underline">Home</Link>
          <span className="text-ink-muted">/</span>
        </div>

        <h1 className="font-sans font-black text-4xl text-ink mb-16">Aayush&rsquo;s Work</h1>

        <div className="mb-8">
          <h2 className="font-serif font-black text-3xl text-ink mb-2">
            Paste is{' '}
            <span className="bg-highlight px-0.5">Twilio&rsquo;s design system</span>
            {' '}and supports the work of building accessible, consistent, and high quality customer experiences.
          </h2>
          <div className="mt-4">
            <a href="https://paste.twilio.design" target="_blank" rel="noopener noreferrer" className="underline">
              Explore Paste Design System ↗
            </a>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-serif font-black text-xl text-ink mb-8">Past work</h3>
          <WorkSection
            title="Twilio Studio"
            description="Studio is a visual, drag & drop, interface to Twilio's APIs. With it, you can quickly prototype and even productionize communications in a low-code way."
            links={[
              { href: 'https://www.twilio.com/studio', label: 'Explore Twilio Studio' },
              { href: 'https://youtu.be/VBjVi4mV0Qk', label: 'Introducing Studio at Signal 2017' },
            ]}
          />
        </div>

        <div className="mt-8">
          <h3 className="font-serif font-black text-xl text-ink mb-8">Archive content</h3>
          <WorkSection
            title="Vouch"
            description="Vouch was a lending startup that hypothesized an alternate solution for credit-worthiness."
            links={[{ href: 'https://aayushisin.netlify.app/#vouch', label: 'Read about Vouch' }]}
          />
          <WorkSection
            title="piq"
            description="piq is a hardware headless jukebox for social spaces. It was a Kickstarter project in 2013 that failed to hit its funding goal, but was a valuable design exercise."
            links={[
              { href: 'https://aayushisin.netlify.app/#piq', label: 'Read about piq' },
              { href: 'https://youtu.be/eIMHxpT_cjc', label: 'Introducing piq at a fundraising event' },
              { href: 'https://medium.com/design-startups/a12142e9ab28', label: 'Notes from building piq' },
            ]}
          />
        </div>
      </div>
    </>
  );
}
