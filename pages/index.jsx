import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function SectionRow({ children }) {
  return <div className="pt-[1.75rem] pb-3">{children}</div>;
}

function ExpandableSection({ title, children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <SectionRow>
      <button
        type="button"
        className="flex items-baseline gap-3 cursor-pointer w-full text-left bg-transparent border-none p-0"
        onClick={() => setExpanded((e) => !e)}
      >
        <h2 className="font-serif font-black text-[2rem] leading-[2.5rem] tracking-[-0.02em] text-ink m-0 link-highlight">{title}</h2>
        <span className="text-ink text-lg">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && <div className="mt-6">{children}</div>}
    </SectionRow>
  );
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Aayush Iyer</title>
      </Head>
      <div className="grid grid-cols-12"><div className="col-span-12 lg:col-start-2 lg:col-span-4">
        <h1 className="font-sans font-black text-[2.75rem] leading-[3.5rem] tracking-[-0.02em] text-ink">
          I&rsquo;m{' '}
          <span className="bg-highlight px-0.5">Aayush Iyer</span>
          . I work on building better products.
        </h1>

        <div className="mt-8">
          <SectionRow>
            <Link href="/notes" style={{ backgroundImage: 'none', paddingBottom: 0 }}>
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif font-black text-[2rem] leading-[2.5rem] tracking-[-0.02em] text-ink m-0 link-highlight">Notes &amp; Thoughts</h2>
                <span className="text-ink text-lg">→</span>
              </div>
            </Link>
          </SectionRow>

          <ExpandableSection title="Projects">
            <div className="flex flex-col">
              {[
                {
                  name: "Elder Dragon Actuary",
                  desc: 'Statistics and logs for your Commander games.',
                  href: 'https://gocommando.vercel.app/',
                },
                {
                  name: 'Scrycast',
                  desc: 'Search Scryfall and your personal MTG collection inside Raycast.',
                  href: 'https://www.raycast.com/aayushpi/scrycast',
                },
              ].map((p, i) => (
                <div
                  key={p.href}
                  className={`grid grid-cols-[22px_1fr] gap-3.5 py-[18px] ${i ? 'border-t border-border-subtle' : ''}`}
                >
                  <span className="font-mono text-base font-semibold text-highlight leading-none pt-[5px] flex justify-center">
                    /
                  </span>
                  <div>
                    <h3 className="font-sans font-black text-xl leading-[1.6rem] text-ink mb-2">
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        {p.name} ↗
                      </a>
                    </h3>
                    <p className="mb-2.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ExpandableSection>

          <ExpandableSection title="Work">
            <h3 className="font-serif font-black text-[1.25rem] leading-7 tracking-[-0.02em] text-ink mb-2">
              User Experience &amp; UI Platform at Algolia
            </h3>
            <p className="mb-4">
              I lead product, product design, research, and engineering teams at Algolia.{' '}
              <a href="https://www.algolia.com/careers/" target="_blank" rel="noopener noreferrer">
                We&rsquo;re still hiring
              </a>{' '}
              thoughtfully. The common thread across these teams is a deep commitment to understanding
              customer pain and defining what &ldquo;good quality&rdquo; looks like.
            </p>

            <h3 className="font-serif font-black text-[1.25rem] leading-7 tracking-[-0.02em] text-ink mb-2">UX at Twilio</h3>
            <p className="mb-4">
              I founded the design systems practice at Twilio and grew a team from an ad-hoc,
              unsystemized front-end environment to a fully funded, staffed, and roadmapped
              discipline. Over time, this scope evolved to the entire spectrum of UX Infrastructure
              including content writing, visual design, and design operations and focused on
              alignment of design, engineering, and product to create great customer experiences.
            </p>
            <p className="mb-4">
              My outputs were both tactical and cultural: setting product teams up for quick wins by
              providing resilient, performant UI, uplevelling the scale at which product design is
              delivered to an organization, and focusing on customer inclusion and happiness through
              inclusive design, UX engineering, content writing, and more.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-1">
                <a href="https://paste.twilio.design" target="_blank" rel="noopener noreferrer">
                  Paste
                </a>{' '}
                A comprehensive UX platform to build great customer experiences
              </li>
              <li className="mb-1">
                <a href="https://www.twilio.com/studio" target="_blank" rel="noopener noreferrer">
                  Studio
                </a>{' '}
                A low-code visual programming language to build powerful workflows.
              </li>
            </ul>

            <h3 className="font-serif font-black text-[1.25rem] leading-7 tracking-[-0.02em] text-ink mb-2">Other work</h3>
            <p className="mb-4">
              The 17 years since my first job as a journalist have shaped my approach towards
              building things. Along the way I&rsquo;ve built hardware jukeboxes, award-winning
              digital campaigns, and a whole host of really terrible software &mdash; somehow, they
              all informed where I got to and where I&rsquo;m going.
            </p>
          </ExpandableSection>

          <ExpandableSection title="Writing and Speaking">
            <div className="flex flex-col gap-6">
              {[
                {
                  title: 'Designing a great developer experience',
                  desc: 'I joined an online roundtable hosted by Evil Martians on the topic of designing tools for developers.',
                  href: 'https://www.youtube.com/watch?v=PIhJtTboXZ0',
                  label: 'Watch podcast',
                  external: true,
                },
                {
                  title: "How we built a unified, inclusive design system to nurture Twilio's UX",
                  desc: "I talked about the foundation and operation of Twilio Paste and its impact on Twilio at SIGNAL, 2021.",
                  href: 'https://www.youtube.com/watch?v=55gd38mph2g',
                  label: 'View talk',
                  external: true,
                },
                {
                  title: 'Growing Pains: How We Scaled Our Design System Support',
                  desc: 'I talk about the challenges of a growing platform (in this case, Twilio Paste) and ways to grow support around it.',
                  href: '/writing/scaling_support',
                  label: 'Read article',
                  external: false,
                },
                {
                  title: "Introducing Studio, Twilio's low-code visual programming language",
                  desc: "I introduced Twilio's low-code programming language and why we built it at SIGNAL 2017, London.",
                  href: 'https://www.youtube.com/watch?v=VBjVi4mV0Qk',
                  label: 'View talk',
                  external: true,
                },
              ].map((item) => (
                <div
                  key={item.href}
                  className="border border-border-subtle rounded p-5"
                >
                  <h3 className="font-serif font-black text-lg text-ink mb-2">{item.title}</h3>
                  <p className="mb-3 text-ink-muted text-[0.9rem]">{item.desc}</p>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-sm">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </ExpandableSection>
        </div>
      </div></div>
    </>
  );
}
