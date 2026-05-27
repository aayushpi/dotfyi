import Head from 'next/head';
import Link from 'next/link';
import { getAllNotes } from '../../../../lib/content';
import { NoteRow } from '../../../../components/NoteRow';

export default function NotesYearMonth({ notes, year, month }) {
  const monthName = new Date(`${year}-${month}-01`).toLocaleDateString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });

  return (
    <>
      <Head>
        <title>Notes from {monthName}, {year} — Aayush Iyer</title>
      </Head>

      <div className="max-w-3xl">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="no-underline hover:underline">Home</Link>
          <span className="text-ink/40">/</span>
          <Link href="/notes" className="no-underline hover:underline">Notes</Link>
          <span className="text-ink/40">/</span>
          <Link href={`/notes/${year}`} className="no-underline hover:underline">{year}</Link>
          <span className="text-ink/40">/</span>
        </div>

        <div className="mb-12">
          <h1 className="font-sans font-black text-4xl text-ink">
            Notes from {monthName}, {year}
          </h1>
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
  const keys = new Set(
    notes.filter((n) => n.date).map((n) => {
      const d = new Date(n.date);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    })
  );
  return {
    paths: [...keys].map((key) => {
      const [year, month] = key.split('-');
      return { params: { year, month } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allNotes = await getAllNotes();
  const notes = allNotes.filter((n) => {
    if (!n.date) return false;
    const d = new Date(n.date);
    return (
      String(d.getUTCFullYear()) === params.year &&
      String(d.getUTCMonth() + 1).padStart(2, '0') === params.month
    );
  });
  return { props: { notes, year: params.year, month: params.month } };
}
