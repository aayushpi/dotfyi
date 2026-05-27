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

      <div className="max-w-3xl">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="no-underline hover:underline">Home</Link>
          <span className="text-ink/40">/</span>
          <Link href="/notes" className="no-underline hover:underline">Notes</Link>
          <span className="text-ink/40">/</span>
        </div>

        <div className="mb-12">
          <h1 className="font-sans font-black text-4xl text-ink">Notes from {year}</h1>
        </div>

        {notes.length === 0 ? (
          <p className="text-ink/50 pt-16">Nothing here yet.</p>
        ) : (
          <div className="border-b border-border-subtle">
            {notes.map((note) => (
              <NoteRow key={note.slug} note={note} />
            ))}
          </div>
        )}
      </div>
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
