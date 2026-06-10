import Head from 'next/head';
import Link from 'next/link';
import { getAllNotes } from '../../lib/content';
import { NoteRow } from '../../components/NoteRow';
import { SubscribeLink } from '../../components/SubscribeLink';

export default function NotesIndex({ notes }) {
  return (
    <>
      <Head>
        <title>Notes &amp; Thoughts — Aayush Iyer</title>
      </Head>

      <div className="grid grid-cols-12"><div className="col-span-12 lg:col-start-2 lg:col-span-8">
        <div className="mb-6 flex items-center gap-2 text-[18px]">
          <Link href="/" className="">Home</Link>
          <span className="text-ink-muted">/</span>
        </div>

        <div className="mb-12">
          <h1 className="font-sans font-black text-[2.75rem] leading-[3.5rem] tracking-[-0.02em] text-ink mb-2">Notes &amp; Thoughts</h1>
          <p className="text-ink text-[18px]">A blog about film, books, and ideas. <SubscribeLink /></p>
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

export async function getStaticProps() {
  const notes = await getAllNotes();
  return { props: { notes } };
}
