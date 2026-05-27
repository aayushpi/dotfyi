import { useState } from 'react';
import Link from 'next/link';
import { LOG_TYPES } from '../lib/content';

export const TYPE_LABELS = {
  book: 'Book',
  film: 'Film',
  tv: 'TV',
  article: 'Article',
  game: 'Game',
  essay: 'Essay',
  thought: 'Thought',
};

export function noteUrl(note) {
  if (!note.date) return `/notes/${note.slug}`;
  const d = new Date(note.date);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `/notes/${year}/${month}/${note.slug}`;
}

export function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

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

function NoteBody({ note, isThought }) {
  return (
    <>
      {note.contentHtml && (
        <div
          className={`note-body text-base leading-relaxed text-ink${isThought ? ' italic' : ''}`}
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
}

function CopyLinkButton({ note }) {
  const [label, setLabel] = useState('Copy link');
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}${noteUrl(note)}`);
          setLabel('Copied!');
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => { setVisible(false); setLabel('Copy link'); }}
        className="inline-flex items-center text-ink/40 hover:text-ink transition-colors p-0 bg-transparent border-none cursor-pointer"
        aria-label="Copy link"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
      {visible && (
        <div
          className="absolute bg-ink text-bg text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '6px',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export function NoteRow({ note }) {
  const isLog = LOG_TYPES.includes(note.type);
  const isThought = note.type === 'thought';

  const dateText = (
    <span className="font-mono text-xs text-ink/50">
      <span className="sr-only">{TYPE_LABELS[note.type] || note.type} logged on </span>
      {formatDate(note.date)}
    </span>
  );

  const titleMeta = (
    <>
      <div className="flex items-center gap-2 mb-2">
        <h2 className={`font-sans font-bold text-xl text-ink m-0${isThought ? ' italic' : ''}`}>
          <Link href={noteUrl(note)} className="no-underline hover:underline">
            {note.title}
          </Link>
        </h2>
        <CopyLinkButton note={note} />
      </div>
      {note.creator && (
        <div className="mb-4">
          <span className="text-ink/50 text-sm">
            {note.creator}{note.year ? `, ${note.year}` : ''}
          </span>
        </div>
      )}
    </>
  );

  return (
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
        <NoteBody note={note} isThought={isThought} />
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
          <NoteBody note={note} isThought={isThought} />
        </div>
      </div>
    </article>
  );
}
