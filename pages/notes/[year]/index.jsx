import Head from 'next/head';
import Link from 'next/link';
import { getAllNotes } from '../../../lib/content';
import { NoteRow } from '../../../components/NoteRow';

export default function NotesYear({ notes, year }) {
  return (
    <>
      <Head>
        <title>Notes from {year} — Aayush Iyer</title>
      </Head>

      <div className="grid grid-cols-12"><div className="col-span-12 lg:col-start-2 lg:col-span-8">
        <div className="mb-6 flex items-center gap-2 text-[18px]">
          <Link href="/" className="">Home</Link>
          <span className="text-ink-muted">/</span>
          <Link href="/notes" className="">Notes</Link>
          <span className="text-ink-muted">/</span>
        </div>

        <div className="mb-12">
          <h1 className="font-sans font-black text-[2.75rem] leading-[3.5rem] tracking-[-0.02em] text-ink">Notes from {year}</h1>
        </div>

        {notes.length === 0 ? (
          <p className="text-ink-muted pt-16">Nothing here yet.</p>
        ) : (
          <div className="border-b border-border-subtle">
            {notes.map((note) => (
              <NoteRow key={note.slug} note={note} />
            ))}
          </div>
        )}
      </div></div>
    </>
  );
}

export async function getStaticPaths() {
  const notes = await getAllNotes();
  const years = [...new Set(
    notes.filter((n) => n.date).map((n) => String(new Date(n.date).getUTCFullYear()))
  )];
  return {
    paths: years.map((year) => ({ params: { year } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allNotes = await getAllNotes();
  const notes = allNotes.filter(
    (n) => n.date && String(new Date(n.date).getUTCFullYear()) === params.year
  );
  return { props: { notes, year: params.year } };
}
