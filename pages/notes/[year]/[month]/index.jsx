import Head from 'next/head';
import Link from 'next/link';
import { getAllNotes } from '../../../../lib/content';
import { NoteRow } from '../../../../components/NoteRow';
import { useCoralSweep, sweepOnClick } from '../../../../lib/sweep';

export default function NotesYearMonth({ notes, year, month }) {
  const sweep = useCoralSweep();
  const monthName = new Date(`${year}-${month}-01`).toLocaleDateString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });

  return (
    <>
      <Head>
        <title>Notes from {monthName}, {year} — Aayush Iyer</title>
      </Head>

      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-8">
          <div className="mb-6 flex items-center gap-2 text-[18px]">
            <Link href="/" onClick={sweepOnClick(sweep, '/', { reverse: true })} className="">Home</Link>
            <span className="text-ink-muted">/</span>
            <Link href="/notes" className="">Notes</Link>
            <span className="text-ink-muted">/</span>
            <Link href={`/notes/${year}`} className="">{year}</Link>
            <span className="text-ink-muted">/</span>
          </div>

          <div className="mb-12">
            <h1 className="font-sans font-black text-[2.75rem] leading-[3.5rem] tracking-[-0.02em] text-ink">
              Notes from {monthName}, {year}
            </h1>
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
        </div>
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
