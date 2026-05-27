import Head from 'next/head';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Stack } from '@twilio-paste/core/stack';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { getAllNotes } from '../../lib/content';
import { NoteRow } from '../../components/NoteRow';

export default function NotesIndex({ notes }) {
  return (
    <>
      <Head>
        <title>Notes &amp; Thoughts — Aayush Iyer</title>
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
            <Heading as="h1" variant="heading10" marginBottom="space30">
              Notes &amp; Thoughts
            </Heading>
            <Text as="p" color="colorTextWeak" fontSize="fontSize30">
              A blog about film, books, and ideas.
            </Text>
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
