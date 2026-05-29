import Head from 'next/head';
import Link from 'next/link';

export default function DsysChangelog() {
  return (
    <>
      <Head>
        <title>DSYS CHANGELOG — Aayush Iyer</title>
      </Head>

      <div className="max-w-4xl">
        <div className="mb-6 flex items-center gap-2 text-[18px]">
          <Link href="/" className="no-underline hover:underline">Home</Link>
          <span className="text-ink-muted">/</span>
          <Link href="/writing" className="no-underline hover:underline">Writing</Link>
          <span className="text-ink-muted">/</span>
        </div>

        <h1 className="font-sans font-black text-4xl text-ink mb-6">
          Twilio&rsquo;s Design System{' '}
          <span className="bg-highlight px-0.5">Changelog</span>
        </h1>

        <p className="mb-4 max-w-2xl">
          As we&rsquo;ve built Paste from scratch, we always wondered: How did GitHub | Atlassian |
          Shopify solve this problem? Only recently have I had the confidence to peek out of the hole
          to look around, and ask teams about how they&rsquo;re scaling their systems.
        </p>
        <p className="mb-8 max-w-2xl">
          In an effort for some radical transparency, here&rsquo;s a changelog of Twilio&rsquo;s
          design system efforts. I hope it&rsquo;s useful as you pave your own path towards
          accessible, systemized UI.
        </p>

        <h2 className="font-serif font-black text-2xl text-ink mb-6">People</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border-subtle rounded p-5">
              <h3 className="font-serif font-black text-xl text-ink mb-2">2018–2019</h3>
              <p>
                <strong>Engineering:</strong> Part time contribution from an engineer, contractor
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
