import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Stack } from '@twilio-paste/core/stack';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { Separator } from '@twilio-paste/core/separator';
import { getAllNotes, LOG_TYPES } from '../../lib/content';

const TYPE_LABELS = {
  book: 'Book',
  film: 'Film',
  article: 'Article',
  game: 'Game',
  essay: 'Essay',
  thought: 'Thought',
};

const FILTER_TYPES = ['book', 'film', 'article', 'game', 'essay', 'thought'];

function NoteCard({ note }) {
  const isLog = LOG_TYPES.includes(note.type);

  return (
    <Box
      as="article"
      display="flex"
      columnGap="space60"
      paddingTop="space70"
      paddingBottom="space70"
    >
      {isLog && (
        <Box
          flexShrink={0}
          width="size1000"
          overflow="hidden"
          backgroundColor="colorBackgroundStrong"
          style={{ aspectRatio: '2/3' }}
        >
          {note.cover ? (
            <Box
              as="img"
              src={note.cover}
              alt={note.title}
              width="100%"
              height="100%"
              style={{ objectFit: 'cover', display: 'block' }}
            />
          ) : null}
        </Box>
      )}

      <Box flexGrow={1} minWidth="size0">
        <Stack orientation="vertical" spacing="space20">
          <Box display="flex" alignItems="baseline" columnGap="space30" flexWrap="wrap">
            <Text
              as="span"
              color="colorTextWeak"
              fontSize="fontSize10"
              fontWeight="fontWeightSemibold"
              style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              {TYPE_LABELS[note.type] || note.type}
            </Text>
            {note.date && (
              <Text as="time" dateTime={note.date} color="colorTextWeak" fontSize="fontSize10">
                {new Date(note.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            )}
          </Box>

          <Heading as="h2" variant="heading40" marginBottom="space0">
            <Link href={`/notes/${note.slug}`} legacyBehavior passHref>
              <Anchor>{note.title}</Anchor>
            </Link>
          </Heading>

          {note.creator && (
            <Text as="p" color="colorTextWeak" fontSize="fontSize20" marginBottom="space0">
              {note.creator}
            </Text>
          )}

          {note.excerpt && (
            <Text as="p" fontSize="fontSize20" color="colorText" marginBottom="space0">
              {note.excerpt}
              {!note.isShort && (
                <>
                  {'… '}
                  <Link href={`/notes/${note.slug}`} legacyBehavior passHref>
                    <Anchor>More</Anchor>
                  </Link>
                </>
              )}
            </Text>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default function NotesIndex({ notes }) {
  const [activeType, setActiveType] = useState(null);

  const filtered = activeType ? notes.filter((n) => n.type === activeType) : notes;

  return (
    <>
      <Head>
        <title>Notes — Aayush Iyer</title>
      </Head>
      <Grid>
        <Column span={[12, 12, 8]} offset={[0, 0, 1]}>
          <Box marginBottom="space60">
            <Stack orientation="horizontal" spacing="space30">
              <Link href="/" legacyBehavior passHref>
                <Anchor>
                  <ScreenReaderOnly>Back to</ScreenReaderOnly> Home
                </Anchor>
              </Link>
              <Text as="span">/</Text>
            </Stack>
          </Box>

          <Heading as="h1" variant="heading10">
            Notes
          </Heading>

          <Box marginTop="space70" marginBottom="space20">
            <Stack orientation="horizontal" spacing="space50">
              <Box
                as="button"
                onClick={() => setActiveType(null)}
                background="none"
                border="none"
                padding="space0"
                cursor="pointer"
              >
                <Text
                  as="span"
                  fontSize="fontSize20"
                  fontWeight={!activeType ? 'fontWeightSemibold' : 'fontWeightNormal'}
                  color={!activeType ? 'colorText' : 'colorTextWeak'}
                >
                  All
                </Text>
              </Box>
              {FILTER_TYPES.map((type) => (
                <Box
                  key={type}
                  as="button"
                  onClick={() => setActiveType(type)}
                  background="none"
                  border="none"
                  padding="space0"
                  cursor="pointer"
                >
                  <Text
                    as="span"
                    fontSize="fontSize20"
                    fontWeight={activeType === type ? 'fontWeightSemibold' : 'fontWeightNormal'}
                    color={activeType === type ? 'colorText' : 'colorTextWeak'}
                  >
                    {TYPE_LABELS[type]}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>

          <Separator orientation="horizontal" verticalSpacing="space0" />

          {filtered.length === 0 ? (
            <Box paddingTop="space100">
              <Text as="p" color="colorTextWeak">Nothing here yet.</Text>
            </Box>
          ) : (
            <Box>
              {filtered.map((note, i) => (
                <Box key={note.slug}>
                  <NoteCard note={note} />
                  {i < filtered.length - 1 && (
                    <Separator orientation="horizontal" verticalSpacing="space0" />
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Column>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const notes = getAllNotes();
  return { props: { notes } };
}
