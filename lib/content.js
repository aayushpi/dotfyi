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
                author: parsed.data.author || null,
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

function astToComponents(node) {
  if (node.type === 'text') {
    return node.value;
  }

  if (node.type === 'root') {
    const components = node.children ? node.children.map(child => astToComponents(child)).flat().filter(item => item !== null && item !== undefined) : [];
    return components;
  }

  const children = node.children ? node.children.map(child => astToComponents(child)).flat().filter(item => item !== null && item !== undefined) : [];

  if (node.type === 'paragraph') {
    return {
      type: 'p',
      children,
      props: {},
    };
  }

  if (node.type === 'link') {
    return {
      type: 'a',
      children,
      props: {
        href: node.url || '#',
        target: node.url?.startsWith('http') ? '_blank' : undefined,
        rel: node.url?.startsWith('http') ? 'noopener noreferrer' : undefined,
      },
    };
  }

  if (node.type === 'heading') {
    return {
      type: `h${node.depth}`,
      children,
      props: {},
    };
  }

  if (node.type === 'emphasis') {
    return {
      type: 'em',
      children,
      props: {},
    };
  }

  if (node.type === 'strong') {
    return {
      type: 'strong',
      children,
      props: {},
    };
  }

  if (node.type === 'blockquote') {
    return {
      type: 'blockquote',
      children,
      props: {},
    };
  }

  if (node.type === 'list') {
    return {
      type: node.ordered ? 'ol' : 'ul',
      children,
      props: {},
    };
  }

  if (node.type === 'listItem') {
    return {
      type: 'li',
      children,
      props: {},
    };
  }

  return null;
}

async function markdownToComponents(markdown) {
  try {
    const ast = remark().parse(markdown);
    const components = astToComponents(ast);
    return Array.isArray(components) ? components : (components || []);
  } catch (error) {
    console.error('markdownToComponents error:', error);
    return [];
  }
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
  let contentComponents = [];
  try {
    contentComponents = await markdownToComponents(note.rawContent);
  } catch (error) {
    console.error(`Error processing markdown for ${slug}:`, error);
    contentComponents = [];
  }

  const { rawContent, ...rest } = note;
  let linkPreview = null;
  if (rest.type === 'article' && rest.source) {
    linkPreview = await fetchLinkPreview(rest.source);
  }

  return { ...rest, contentComponents, linkPreview };
}

// MDX-specific functions for loading note content as JSX components
export async function getNoteBySlugMdx(slug) {
  const mdxPath = path.join(notesDir, `${slug}.mdx`);
  const mdPath = path.join(notesDir, `${slug}.md`);

  // Try .mdx first, fall back to .md
  let filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const isMdx = filePath.endsWith('.mdx');

  let linkPreview = null;
  if (data.type === 'article' && data.source) {
    linkPreview = await fetchLinkPreview(data.source);
  }

  let contentHtml = null;
  if (!isMdx) {
    contentHtml = await markdownToHtml(content);
  }

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
    linkPreview,
    contentHtml,
    isMdx,
  };
}

export async function getAllNotesMdx({ type } = {}) {
  if (!fs.existsSync(notesDir)) return [];

  const files = fs.readdirSync(notesDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  let notes = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.(mdx?|md)$/, '');
      return getNoteBySlugMdx(slug);
    })
  );

  if (type) {
    notes = notes.filter((n) => n.type === type);
  }

  return notes.sort((a, b) => (a.date < b.date ? 1 : -1));
}
