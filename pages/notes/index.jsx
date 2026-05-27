import Head from 'next/head';
import Link from 'next/link';
import { getAllNotes } from '../../lib/content';
import { NoteRow } from '../../components/NoteRow';

export default function NotesIndex({ notes }) {
  return (
    <>
      <Head>
        <title>Notes &amp; Thoughts — Aayush Iyer</title>
      </Head>

      <div className="max-w-3xl">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="no-underline hover:underline">Home</Link>
          <span className="text-ink/40">/</span>
        </div>

        <div className="mb-12">
          <h1 className="font-sans font-black text-4xl text-ink mb-2">Notes &amp; Thoughts</h1>
          <p className="text-ink/50">A blog about film, books, and ideas.</p>
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

export async function getStaticProps() {
  const notes = await getAllNotes();
  return { props: { notes } };
}
