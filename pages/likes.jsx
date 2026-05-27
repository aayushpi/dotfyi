import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import parse from 'remark-parse';

const LikeCard = ({ title, date, review, type, creator }) => {
  const getTypeEmoji = (t) => {
    switch (t.toLowerCase()) {
      case 'game': return '🎮';
      case 'book': return '📚';
      case 'show': return '🎬';
      case 'tv': return '📺';
      default: return '🎬';
    }
  };

  const renderFormattedText = (text) => {
    const parts = text.split(/(<link url=".*?">.*?<\/link>|<italic>.*?<\/italic>|<bold>.*?<\/bold>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<link')) {
        const urlMatch = part.match(/url="(.*?)"/);
        const content = part.replace(/<link url=".*?">(.*?)<\/link>/, '$1');
        return (
          <Link key={index} href={urlMatch[1]} className="underline">
            {renderFormattedText(content)}
          </Link>
        );
      }
      if (part.startsWith('<italic>')) {
        const content = part.replace(/<\/?italic>/g, '');
        return <span key={index} className="italic">{renderFormattedText(content)}</span>;
      }
      if (part.startsWith('<bold>')) {
        const content = part.replace(/<\/?bold>/g, '');
        return <span key={index} className="font-bold">{renderFormattedText(content)}</span>;
      }
      return part;
    });
  };

  return (
    <div className="border border-border-subtle rounded p-6 mb-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="font-serif font-black text-xl text-ink m-0">
            {renderFormattedText(title)}
          </h3>
          {creator && (
            <p className="text-ink/50 text-sm mt-1">{renderFormattedText(creator)}</p>
          )}
        </div>
      </div>
      <div className="mt-3 space-y-3">
        {review.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-base">{renderFormattedText(paragraph)}</p>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        {date && <p className="text-ink/40 text-sm">{date}</p>}
        <span className="text-2xl">{getTypeEmoji(type)}</span>
      </div>
    </div>
  );
};

function parseLikes(content) {
  const processor = remark().use(parse);
  const ast = processor.parse(content);
  const likes = [];
  let currentLike = null;

  const processTextNode = (node) => {
    if (node.type === 'text') return node.value;
    if (node.type === 'emphasis' || node.type === 'strong') {
      const emphasisType = node.type === 'emphasis' ? 'italic' : 'bold';
      const content = node.children.map(processTextNode).join('');
      return `<${emphasisType}>${content}</${emphasisType}>`;
    }
    if (node.type === 'link') {
      const content = node.children.map(processTextNode).join('');
      return `<link url="${node.url}">${content}</link>`;
    }
    if (node.children) return node.children.map(processTextNode).join('');
    return '';
  };

  for (const node of ast.children) {
    if (node.type === 'heading' && node.depth === 2) {
      if (currentLike) likes.push(currentLike);
      currentLike = {
        title: node.children.map(processTextNode).join(''),
        date: '', type: '', creator: '', review: '',
      };
    } else if (currentLike && node.type === 'paragraph') {
      const hasDate = node.children.some((c) => c.type === 'strong' && c.children.some((x) => x.value === 'Date:'));
      const hasType = node.children.some((c) => c.type === 'strong' && c.children.some((x) => x.value === 'Type:'));
      const hasCreator = node.children.some((c) => c.type === 'strong' && c.children.some((x) => x.value === 'Creator:'));

      if (hasDate || hasType || hasCreator) {
        node.children.forEach((child) => {
          if (child.type === 'strong') {
            const strongText = child.children.map((c) => c.value).join('');
            const nextNode = node.children[node.children.indexOf(child) + 1];
            if (nextNode?.type === 'text') {
              if (strongText === 'Date:') currentLike.date = nextNode.value.trim();
              if (strongText === 'Type:') currentLike.type = nextNode.value.trim().split(' ')[0].toLowerCase();
              if (strongText === 'Creator:') currentLike.creator = nextNode.value.trim();
            }
          }
        });
      } else {
        const paragraphText = node.children.map(processTextNode).join('').trim();
        if (paragraphText && paragraphText !== '---') {
          currentLike.review = currentLike.review ? `${currentLike.review}\n\n${paragraphText}` : paragraphText;
        }
      }
    }
  }
  if (currentLike) likes.push(currentLike);
  return likes;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'likes.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const likes = parseLikes(fileContent);
  return {
    props: {
      likes: likes.sort((a, b) => new Date(b.date) - new Date(a.date)),
    },
    revalidate: 60,
  };
}

export default function Likes({ likes }) {
  return (
    <>
      <Head>
        <title>Likes — Aayush Iyer</title>
      </Head>

      <div className="max-w-sm">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="no-underline hover:underline">Home</Link>
          <span className="text-ink/40">/</span>
        </div>

        <h1 className="font-sans font-black text-4xl text-ink mb-4">Likes</h1>
        <p className="text-xl text-ink/70 mt-4">
          There was a wonderful charm to the old web. We&rsquo;d talk about the things we loved and
          were excited to share it with the world. Not for likes or clout, but just because.
          Let&rsquo;s do that again.
        </p>
      </div>

      <div className="mt-16 max-w-sm">
        {likes.map((like, index) => (
          <LikeCard key={index} {...like} />
        ))}
      </div>
    </>
  );
}
