import Head from 'next/head';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Stack } from '@twilio-paste/core/stack';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { LinkExternalIcon } from '@twilio-paste/icons/cjs/LinkExternalIcon';
import { getAllNotes, LOG_TYPES } from '../../lib/content';
import LinkPreviewCard from '../../components/LinkPreviewCard';

const TYPE_LABELS = {
  book: 'Book',
  film: 'Film',
  article: 'Article',
  game: 'Game',
  essay: 'Essay',
  thought: 'Thought',
};

function NoteCard({ note }) {
  const isLog = LOG_TYPES.includes(note.type);
  const isArticle = note.type === 'article';

  return (
    <Box
      as="article"
      display="flex"
      alignItems="flex-start"
      columnGap="space60"
      paddingTop="space60"
      paddingBottom="space60"
    >
      {isLog && note.cover && (
        <Box
          flexShrink={0}
          overflow="hidden"
          backgroundColor="colorBackgroundStrong"
          borderStyle="solid"
          borderColor="colorBorderBrandHighlight"
          style={{ width: '7.9rem', height: '11.85rem', borderWidth: '7.5px' }}
        >
          <Box
            as="img"
            src={note.cover}
            alt={note.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      )}

      <Box flexGrow={1} minWidth="size0">
        <ScreenReaderOnly>
          <span>{TYPE_LABELS[note.type] || note.type}</span>
          {note.date && (
            <time dateTime={note.date}>
              {new Date(note.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </ScreenReaderOnly>

        <Stack orientation="vertical" spacing="space40">
          {isArticle && note.source && (
            <LinkPreviewCard preview={note.linkPreview} url={note.source} title={note.title} />
          )}

          {!isArticle && (
            <Box>
              <Heading as="h2" variant="heading20" marginBottom="space20">
                {note.title}
              </Heading>
              {note.creator && (
                <Text as="span" color="colorTextWeak" fontSize="fontSize20">
                  {note.creator}
                </Text>
              )}
            </Box>
          )}

          {note.contentHtml && (
            <Box
              dangerouslySetInnerHTML={{ __html: note.contentHtml }}
              fontSize="fontSize20"
              color="colorText"
              lineHeight="lineHeight30"
            />
          )}
        </Stack>
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

          <Heading as="h1" variant="heading10" marginBottom="space20">
            Notes
          </Heading>


          {notes.length === 0 ? (
            <Box paddingTop="space100">
              <Text as="p" color="colorTextWeak">Nothing here yet.</Text>
            </Box>
          ) : (
            <Box>
              {notes.map((note, i) => (
                <Box key={note.slug}>
                  <NoteCard note={note} />
                  {i < notes.length - 1 && (
                    <Box borderBottomWidth="borderWidth10" borderBottomStyle="solid" borderBottomColor="colorBorderSubtle" />
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
  const notes = await getAllNotes();
  return { props: { notes } };
}
