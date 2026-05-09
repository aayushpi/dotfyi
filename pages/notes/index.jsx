import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Stack } from '@twilio-paste/core/stack';
import { Button } from '@twilio-paste/core/button';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { getAllNotes, LOG_TYPES } from '../../lib/content';

const TYPE_LABELS = {
  book: 'Book',
  film: 'Film',
  article: 'Article',
  game: 'Game',
  essay: 'Essay',
  thought: 'Thought',
};

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Pull a short preview from contentHtml for the always-visible excerpt.
function deriveExcerpt(html) {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const firstSentenceEnd = text.search(/(?<=[.!?])\s/);
  const cut = firstSentenceEnd > 60 && firstSentenceEnd < 260 ? firstSentenceEnd + 1 : 220;
  if (text.length <= cut) return text;
  return text.slice(0, cut).trim() + '…';
}

function wordCount(html) {
  if (!html) return 0;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(Boolean).length;
}

function hasMore(note) {
  if (!note.contentHtml) return false;
  return wordCount(note.contentHtml) > 500;
}

function NoteRow({ note, expanded, onToggle }) {
  const isLog = LOG_TYPES.includes(note.type);
  const isThought = note.type === 'thought';
  const expandable = hasMore(note);
  const excerpt = deriveExcerpt(note.contentHtml);

  return (
    <Box
      as="article"
      display="grid"
      columnGap="space70"
      paddingTop="space80"
      paddingBottom="space80"
      borderTopWidth="borderWidth10"
      borderTopStyle="solid"
      borderTopColor="colorBorderSubtle"
      style={{ gridTemplateColumns: '150px 110px 1fr', alignItems: 'start' }}
    >
      {/* Left rail: date only */}
      <Box paddingTop="space20">
        <Text
          as="span"
          fontSize="fontSize10"
          color="colorTextWeak"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
        >
          <ScreenReaderOnly>{TYPE_LABELS[note.type] || note.type} logged on </ScreenReaderOnly>
          {formatDate(note.date)}
        </Text>
      </Box>

      {/* Cover slot — reserved width even when empty so columns stay aligned */}
      <Box>
        {isLog && (
          <Box
            overflow="hidden"
            borderStyle={note.cover ? 'solid' : 'none'}
            borderColor="colorBorderBrandHighlight"
            style={{
              width: expanded ? '6.875rem' : '5.75rem',
              height: expanded ? '10.3125rem' : '8.625rem',
              borderWidth: note.cover ? '6px' : '0',
              transition: 'width 180ms ease, height 180ms ease',
              flexShrink: 0,
            }}
          >
            {note.cover && (
              <Box
                as="img"
                src={note.cover}
                alt={note.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </Box>
        )}
      </Box>

      {/* Body */}
      <Box minWidth="size0">
        <Heading as="h2" variant="heading30" marginBottom="space20" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Link href={`/notes/${note.slug}`} legacyBehavior passHref>
            <Box
              as="a"
              fontStyle={isThought ? 'italic' : 'normal'}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {note.title}
            </Box>
          </Link>
        </Heading>
        {note.creator && (
          <Box marginBottom="space40">
            <Text as="span" color="colorTextWeak" fontSize="fontSize20">
              {note.creator}{note.year ? `, ${note.year}` : ''}
            </Text>
          </Box>
        )}

        {expanded && expandable ? (
          <Box
            fontSize="fontSize30"
            lineHeight="lineHeight30"
            color="colorText"
            fontStyle={isThought ? 'italic' : 'normal'}
            dangerouslySetInnerHTML={{ __html: note.contentHtml }}
          />
        ) : (
          <Paragraph marginBottom="space0" fontStyle={isThought ? 'italic' : 'normal'}>
            {excerpt}
          </Paragraph>
        )}

        {expanded && expandable && note.source && (
          <Box marginTop="space40">
            <Anchor href={note.source} showExternal>
              View source
            </Anchor>
          </Box>
        )}

        {expandable && (
          <Box marginTop="space40">
            <Button variant="link" onClick={onToggle} aria-expanded={expanded}>
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                columnGap="space20"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '14px',
                }}
              >
                <Box
                  as="span"
                  borderColor="colorBorder"
                  borderStyle="solid"
                  borderWidth="borderWidth10"
                  backgroundColor={expanded ? 'colorBackgroundBrandHighlight' : 'colorBackgroundBody'}
                  style={{
                    display: 'inline-block',
                    width: '14px',
                    height: '14px',
                    position: 'relative',
                  }}
                  aria-hidden="true"
                >
                  <Box
                    as="span"
                    backgroundColor="colorBorder"
                    style={{
                      position: 'absolute', left: '2px', right: '2px', top: '6px', height: '1px',
                    }}
                  />
                  {!expanded && (
                    <Box
                      as="span"
                      backgroundColor="colorBorder"
                      style={{
                        position: 'absolute', top: '2px', bottom: '2px', left: '6px', width: '1px',
                      }}
                    />
                  )}
                </Box>
                {expanded ? 'Collapse' : 'Read more'}
              </Box>
            </Button>
          </Box>
        )}

        {!expandable && note.source && (
          <Box marginTop="space40">
            <Anchor href={note.source} showExternal>
              View source
            </Anchor>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default function NotesIndex({ notes }) {
  const [openSlugs, setOpenSlugs] = useState(() => new Set());

  const expandableSlugs = useMemo(
    () => notes.filter(hasMore).map((n) => n.slug),
    [notes]
  );
  const allOpen = openSlugs.size === expandableSlugs.length && expandableSlugs.length > 0;

  const toggle = (slug) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const toggleAll = () => {
    if (allOpen) setOpenSlugs(new Set());
    else setOpenSlugs(new Set(expandableSlugs));
  };

  return (
    <>
      <Head>
        <title>Notes — Aayush Iyer</title>
      </Head>
      <Grid>
        <Column span={[12, 12, 8]} offset={[0, 0, 1]}>
          {/* Breadcrumb */}
          <Box marginBottom="space50">
            <Stack orientation="horizontal" spacing="space30">
              <Link href="/" legacyBehavior passHref>
                <Anchor>
                  <ScreenReaderOnly>Back to</ScreenReaderOnly> Home
                </Anchor>
              </Link>
              <Text as="span">/</Text>
            </Stack>
          </Box>

          {/* Title + expand-all */}
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
            columnGap="space70"
            flexWrap="wrap"
            rowGap="space40"
            marginBottom="space80"
          >
            <Heading as="h1" variant="heading10" marginBottom="space0">
              Notes
            </Heading>
            {expandableSlugs.length > 0 && (
              <Button variant="secondary" onClick={toggleAll}>
                {allOpen ? 'Collapse all' : 'Expand all'}
              </Button>
            )}
          </Box>

          {notes.length === 0 ? (
            <Box paddingTop="space100">
              <Text as="p" color="colorTextWeak">
                Nothing here yet.
              </Text>
            </Box>
          ) : (
            <Box
              borderBottomWidth="borderWidth10"
              borderBottomStyle="solid"
              borderBottomColor="colorBorderSubtle"
            >
              {notes.map((note) => (
                <NoteRow
                  key={note.slug}
                  note={note}
                  expanded={openSlugs.has(note.slug)}
                  onToggle={() => toggle(note.slug)}
                />
              ))}
            </Box>
          )}
        </Column>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const notes = await getAllNotes();
  return { props: { notes } };
}
