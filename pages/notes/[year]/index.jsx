import Head from 'next/head';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Stack } from '@twilio-paste/core/stack';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { getAllNotes } from '../../../lib/content';
import { NoteRow } from '../../../components/NoteRow';

export default function NotesYear({ notes, year }) {
  return (
    <>
      <Head>
        <title>Notes from {year} — Aayush Iyer</title>
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
              <Link href="/notes" legacyBehavior passHref>
                <Anchor>Notes</Anchor>
              </Link>
              <Text as="span">/</Text>
            </Stack>
          </Box>

          <Box marginBottom="space80">
            <Heading as="h1" variant="heading10" marginBottom="space0">
              Notes from {year}
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

export async function getStaticPaths() {
  const notes = await getAllNotes();
  const years = [...new Set(
    notes.filter((n) => n.date).map((n) => String(new Date(n.date).getUTCFullYear()))
  )];
  return {
    paths: years.map((year) => ({ params: { year } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allNotes = await getAllNotes();
  const notes = allNotes.filter(
    (n) => n.date && String(new Date(n.date).getUTCFullYear()) === params.year
  );
  return { props: { notes, year: params.year } };
}
