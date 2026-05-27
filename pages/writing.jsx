import Head from 'next/head';
import Link from 'next/link';

export default function Writing() {
  return (
    <>
      <Head>
        <title>Writing — Aayush Iyer</title>
      </Head>

      <div>
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="no-underline hover:underline">Home</Link>
          <span className="text-ink/40">/</span>
        </div>

        <h1 className="font-sans font-black text-4xl text-ink mb-8">Writing</h1>

        <div className="flex flex-col gap-3">
          <Link href="/writing/scaling_support" className="underline">
            Growing Pains: How We Scaled Our Design System Support
          </Link>
        </div>
      </div>
    </>
  );
}
