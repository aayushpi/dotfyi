import fs from 'fs';
import path from 'path';
import https from 'https';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const notesDir = path.join(process.cwd(), 'content/notes');

async function fetchLinkPreview(url) {
  return new Promise((resolve) => {
    try {
      const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`;

      https.get(apiUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.data) {
              const preview = {
                title: parsed.data.title || null,
                description: parsed.data.description || null,
                image: parsed.data.image?.url || null,
                url: parsed.data.url || url,
              };
              resolve(preview);
            } else {
              resolve(null);
            }
          } catch (e) {
            resolve(null);
          }
        });
      }).on('error', (err) => {
        resolve(null);
      });
    } catch (error) {
      resolve(null);
    }
  });
}

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

function parseNoteFile(filename) {
  const slug = slugFromFilename(filename);
  const fullPath = path.join(notesDir, filename);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

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
    rawContent: content,
  };
}

// Returns all notes sorted by date descending, with rendered HTML body.
export async function getAllNotes({ type } = {}) {
  if (!fs.existsSync(notesDir)) return [];

  const files = fs.readdirSync(notesDir).filter((f) => f.endsWith('.md'));
  let notes = await Promise.all(
    files.map(async (filename) => {
      const note = parseNoteFile(filename);
      const contentHtml = await markdownToHtml(note.rawContent);
      const { rawContent, ...rest } = note;

      let linkPreview = null;
      if (rest.type === 'article' && rest.source) {
        linkPreview = await fetchLinkPreview(rest.source);
      }

      return { ...rest, contentHtml, linkPreview };
    })
  );

  if (type) {
    notes = notes.filter((n) => n.type === type);
  }

  return notes.sort((a, b) => (a.date < b.date ? 1 : -1));
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

  let linkPreview = null;
  if (note.type === 'article' && note.source) {
    linkPreview = await fetchLinkPreview(note.source);
  }

  return { ...note, contentHtml, linkPreview };
}
