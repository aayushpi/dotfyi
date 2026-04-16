import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const notesDir = path.join(process.cwd(), 'content/notes');

// All valid types
export const NOTE_TYPES = ['book', 'film', 'article', 'game', 'essay', 'thought'];

// Types that are "log" entries (have cover, creator, year, etc.)
export const LOG_TYPES = ['book', 'film', 'article', 'game'];

async function markdownToHtml(markdown) {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

function slugFromFilename(filename) {
  return filename.replace(/\.md$/, '');
}

const LONGFORM_WORD_THRESHOLD = 500;

// Strip basic markdown for plain-text preview
function toPlainText(markdown) {
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')         // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
    .replace(/#{1,6}\s+/g, '')               // headings
    .replace(/[*_`~]/g, '')                  // bold/italic/code/strikethrough
    .replace(/\n+/g, ' ')                    // newlines → space
    .trim();
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function makeExcerpt(rawContent) {
  const plain = toPlainText(rawContent);
  const isShort = wordCount(plain) <= LONGFORM_WORD_THRESHOLD;
  if (isShort) {
    return { excerpt: plain, isShort: true };
  }
  // Truncate at ~500 words
  const words = plain.split(/\s+/);
  return { excerpt: words.slice(0, LONGFORM_WORD_THRESHOLD).join(' '), isShort: false };
}

// Read and parse a single note file. Returns null if file doesn't exist.
function parseNoteFile(filename) {
  const slug = slugFromFilename(filename);
  const fullPath = path.join(notesDir, filename);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  const { excerpt, isShort } = makeExcerpt(content);

  return {
    slug,
    title: data.title || '',
    type: data.type || 'thought',
    creator: data.creator || null,
    year: data.year || null,
    date: data.date ? new Date(data.date).toISOString() : null,
    cover: data.cover || null,
    source: data.source || null,
    refs: data.refs || [],
    excerpt,
    isShort,
    rawContent: content,
  };
}

// Returns all notes sorted by date descending, with optional type filter.
export function getAllNotes({ type } = {}) {
  if (!fs.existsSync(notesDir)) return [];

  const files = fs.readdirSync(notesDir).filter((f) => f.endsWith('.md'));
  let notes = files.map(parseNoteFile);

  if (type) {
    notes = notes.filter((n) => n.type === type);
  }

  return notes
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ rawContent, ...rest }) => rest); // strip raw content from list view
}

// Returns all slugs (for getStaticPaths).
export function getAllNoteSlugs() {
  if (!fs.existsSync(notesDir)) return [];
  return fs
    .readdirSync(notesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => slugFromFilename(f));
}

// Returns a single note with rendered HTML body and resolved essay cross-refs.
export async function getNoteBySlug(slug) {
  const filename = `${slug}.md`;
  const fullPath = path.join(notesDir, filename);
  if (!fs.existsSync(fullPath)) return null;

  const note = parseNoteFile(filename);
  const contentHtml = await markdownToHtml(note.rawContent);

  // Find all essays that reference this slug
  const allNotes = getAllNotes();
  const referencedBy = allNotes.filter(
    (n) => n.type === 'essay' && Array.isArray(n.refs) && n.refs.includes(slug)
  );

  // Resolve this note's refs to full note objects (for essays)
  const resolvedRefs = (note.refs || [])
    .map((refSlug) => allNotes.find((n) => n.slug === refSlug))
    .filter(Boolean);

  return {
    ...note,
    contentHtml,
    referencedBy,
    resolvedRefs,
  };
}
