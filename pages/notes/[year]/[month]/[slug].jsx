import Head from 'next/head';
import Link from 'next/link';
import { getAllNotes, getNoteBySlugMdx, LOG_TYPES } from '../../../../lib/content';
import { noteUrl, formatDate, TYPE_LABELS } from '../../../../components/NoteRow';
import LinkPreviewCard from '../../../../components/LinkPreviewCard';

function CoverImage({ note }) {
  if (!note.cover) return null;
  return (
    <div
      className="overflow-hidden flex-shrink-0"
      style={{
        width: '8.594rem',
        height: '12.891rem',
        border: '6px solid #F98585',
      }}
    >
      <img
        src={note.cover}
        alt={note.title}
        className="w-full h-full object-cover block"
      />
    </div>
  );
}

export default function NotePage({ note, year, month }) {
  const isLog = LOG_TYPES.includes(note.type);
  const isEssay = note.type === 'essay';
  const isThought = note.type === 'thought';

  const monthName = new Date(`${year}-${month}-01`).toLocaleDateString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });

  const dateText = (
    <span className="font-mono text-[14px] text-ink">
      <span className="sr-only">{TYPE_LABELS[note.type] || note.type} logged on </span>
      {formatDate(note.date)}
    </span>
  );

  const titleMeta = (
    <>
      <h1 className={`font-black text-[1.75rem] leading-9 tracking-[-0.02em] text-ink mb-2${isThought ? ' italic' : ''}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        {note.title}
      </h1>
      {note.creator && (
        <div className="mb-4">
          <span className="text-ink text-[16px]">
            {note.creator}{note.year ? `, ${note.year}` : ''}
          </span>
        </div>
      )}
      {note.source && (
        <div className="mb-4">
          <LinkPreviewCard preview={note.linkPreview} url={note.source} title={note.title} />
        </div>
      )}
    </>
  );

  const noteBody = (
    <>
      {note.contentHtml && (
        <div
          className={`note-body text-[18px] leading-relaxed text-ink${isThought ? ' italic' : ''}`}
          dangerouslySetInnerHTML={{ __html: note.contentHtml }}
        />
      )}
      {note.source && (
        <div className="mt-4">
          <a href={note.source} target="_blank" rel="noopener noreferrer" className="text-sm">
            View source ↗
          </a>
        </div>
      )}
    </>
  );

  return (
    <>
      <Head>
        <title>{note.title} — Aayush Iyer</title>
      </Head>

      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-[18px] flex-wrap">
          <Link href="/" className="">Home</Link>
          <span className="text-ink-muted">/</span>
          <Link href="/notes" className="">Notes</Link>
          <span className="text-ink-muted">/</span>
          <Link href={`/notes/${year}`} className="">{year}</Link>
          <span className="text-ink-muted">/</span>
          <Link href={`/notes/${year}/${month}`} className="">{monthName}</Link>
          <span className="text-ink-muted">/</span>
        </div>

        {/* Article */}
        <article className="py-10 border-t border-border-subtle">
          {/* Mobile */}
          <div className="md:hidden">
            <div className="mb-4">{dateText}</div>
            {isLog && note.cover ? (
              <div className="flex gap-6 mb-6 items-start">
                <CoverImage note={note} />
                <div className="min-w-0">{titleMeta}</div>
              </div>
            ) : (
              <div className="mb-6">{titleMeta}</div>
            )}
            {noteBody}
          </div>

          {/* Desktop */}
          <div
            className="hidden md:grid gap-x-8"
            style={{ gridTemplateColumns: '150px 152px 1fr', alignItems: 'start' }}
          >
            <div className="pt-1">{dateText}</div>
            <div>{isLog && <CoverImage note={note} />}</div>
            <div className="min-w-0">
              {titleMeta}
              {noteBody}
            </div>
          </div>
        </article>

        {/* Referenced items (essays only) */}
        {isEssay && note.resolvedRefs.length > 0 && (
          <div className="mt-16">
            <hr className="border-border-subtle my-8" />
            <h2 className="font-serif font-black text-lg text-ink mb-4">Referenced in this essay</h2>
            <div>
              {note.resolvedRefs.map((ref) => (
                <div key={ref.slug} className="py-4">
                  <Link href={noteUrl(ref)} className="underline">{ref.title}</Link>
                  {ref.creator && (
                    <span className="text-ink-muted text-sm">
                      {' '}— {ref.creator}{ref.year ? `, ${ref.year}` : ''}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Essays that reference this entry */}
        {!isEssay && note.referencedBy.length > 0 && (
          <div className="mt-16">
            <hr className="border-border-subtle my-8" />
            <h2 className="font-serif font-black text-lg text-ink mb-4">Essays about this</h2>
            <div>
              {note.referencedBy.map((essay) => (
                <div key={essay.slug} className="py-4">
                  <Link href={noteUrl(essay)} className="underline">{essay.title}</Link>
                  {essay.date && (
                    <span className="text-ink-muted text-sm">
                      {' '}— {new Date(essay.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const notes = await getAllNotes();
  return {
    paths: notes
      .filter((n) => n.date)
      .map((n) => {
        const d = new Date(n.date);
        return {
          params: {
            year: String(d.getUTCFullYear()),
            month: String(d.getUTCMonth() + 1).padStart(2, '0'),
            slug: n.slug,
          },
        };
      }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const note = await getNoteBySlugMdx(params.slug);
  if (!note) return { notFound: true };

  return {
    props: {
      note: { resolvedRefs: [], referencedBy: [], ...note },
      year: params.year,
      month: params.month,
    },
  };
}
