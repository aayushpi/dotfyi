import Head from 'next/head';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Stack } from '@twilio-paste/core/stack';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { getAllNotes, LOG_TYPES } from '../../lib/content';

const TYPE_LABELS = {
  book: 'Book',
  film: 'Film',
  tv: 'TV',
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

function CoverImage({ note }) {
  return (
    <Box
      overflow="hidden"
      borderStyle={note.cover ? 'solid' : 'none'}
      borderColor="colorBorderBrandHighlight"
      style={{
        width: '8.594rem',
        height: '12.891rem',
        borderWidth: note.cover ? '6px' : '0',
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
  );
}

function NoteBody({ note, isThought }) {
  return (
    <>
      {note.contentHtml && (
        <Box
          fontSize="fontSize30"
          lineHeight="lineHeight30"
          color="colorText"
          fontStyle={isThought ? 'italic' : 'normal'}
          dangerouslySetInnerHTML={{ __html: note.contentHtml }}
        />
      )}
      {note.source && (
        <Box marginTop="space40">
          <Anchor href={note.source} showExternal>
            View source
          </Anchor>
        </Box>
      )}
    </>
  );
}

function NoteRow({ note }) {
  const isLog = LOG_TYPES.includes(note.type);
  const isThought = note.type === 'thought';

  const dateText = (
    <Text
      as="span"
      fontSize="fontSize10"
      color="colorTextWeak"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
    >
      <ScreenReaderOnly>{TYPE_LABELS[note.type] || note.type} logged on </ScreenReaderOnly>
      {formatDate(note.date)}
    </Text>
  );

  const titleMeta = (
    <>
      <Heading as="h2" variant="heading30" marginBottom="space20" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Box as="span" fontStyle={isThought ? 'italic' : 'normal'}>
          {note.title}
        </Box>
      </Heading>
      {note.creator && (
        <Box marginBottom="space40">
          <Text as="span" color="colorTextWeak" fontSize="fontSize20">
            {note.creator}{note.year ? `, ${note.year}` : ''}
          </Text>
        </Box>
      )}
    </>
  );

  return (
    <Box
      as="article"
      paddingTop="space80"
      paddingBottom="space80"
      borderTopWidth="borderWidth10"
      borderTopStyle="solid"
      borderTopColor="colorBorderSubtle"
    >
      {/* Mobile layout */}
      <Box display={['block', 'block', 'none']}>
        <Box marginBottom="space40">{dateText}</Box>
        {isLog && note.cover ? (
          <Box display="flex" columnGap="space60" marginBottom="space50" alignItems="flex-start">
            <CoverImage note={note} />
            <Box minWidth="size0">{titleMeta}</Box>
          </Box>
        ) : (
          <Box marginBottom="space50">{titleMeta}</Box>
        )}
        <NoteBody note={note} isThought={isThought} />
      </Box>

      {/* Desktop layout */}
      <Box
        display={['none', 'none', 'grid']}
        columnGap="space70"
        style={{ gridTemplateColumns: '150px 152px 1fr', alignItems: 'start' }}
      >
        <Box paddingTop="space20">{dateText}</Box>
        <Box>{isLog && <CoverImage note={note} />}</Box>
        <Box minWidth="size0">
          {titleMeta}
          <NoteBody note={note} isThought={isThought} />
        </Box>
      </Box>
    </Box>
  );
}

export default function NotesIndex({ notes }) {
  return (
    <>
      <Head>
        <title>Notes — Aayush Iyer</title>
      </Head>
      <Grid>
        <Column span={[12, 12, 8]} offset={[0, 0, 1]}>
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

          <Box marginBottom="space80">
            <Heading as="h1" variant="heading10" marginBottom="space0">
              Notes
            </Heading>
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
                <NoteRow key={note.slug} note={note} />
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
