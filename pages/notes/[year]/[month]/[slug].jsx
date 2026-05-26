import Head from 'next/head';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Stack } from '@twilio-paste/core/stack';
import { Separator } from '@twilio-paste/core/separator';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { getAllNotes, getNoteBySlugMdx, LOG_TYPES } from '../../../../lib/content';
import { noteUrl, formatDate, TYPE_LABELS } from '../../../../components/NoteRow';
import LinkPreviewCard from '../../../../components/LinkPreviewCard';

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

export default function NotePage({ note, year, month }) {
  const isLog = LOG_TYPES.includes(note.type);
  const isEssay = note.type === 'essay';
  const isThought = note.type === 'thought';

  const monthName = new Date(`${year}-${month}-01`).toLocaleDateString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });

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
      <Heading as="h1" variant="heading30" marginBottom="space20">
        <Box as="span" fontStyle={isThought ? 'italic' : 'normal'} style={{ fontFamily: "'Playfair Display', serif" }}>
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
      {note.source && (
        <Box marginBottom="space40">
          <LinkPreviewCard preview={note.linkPreview} url={note.source} title={note.title} />
        </Box>
      )}
    </>
  );

  const noteBody = (
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

  return (
    <>
      <Head>
        <title>{note.title} — Aayush Iyer</title>
      </Head>
      <Grid>
        <Column span={[12, 12, 8]} offset={[0, 0, 1]}>
          {/* Back nav */}
          <Box marginBottom="space50">
            <Stack orientation="horizontal" spacing="space30">
              <Link href="/" legacyBehavior passHref>
                <Anchor><ScreenReaderOnly>Back to</ScreenReaderOnly> Home</Anchor>
              </Link>
              <Text as="span">/</Text>
              <Link href="/notes" legacyBehavior passHref>
                <Anchor>Notes</Anchor>
              </Link>
              <Text as="span">/</Text>
              <Link href={`/notes/${year}`} legacyBehavior passHref>
                <Anchor>{year}</Anchor>
              </Link>
              <Text as="span">/</Text>
              <Link href={`/notes/${year}/${month}`} legacyBehavior passHref>
                <Anchor>{monthName}</Anchor>
              </Link>
              <Text as="span">/</Text>
            </Stack>
          </Box>

          {/* Note article */}
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
              {noteBody}
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
                {noteBody}
              </Box>
            </Box>
          </Box>

          {/* Referenced items (essays only) */}
          {isEssay && note.resolvedRefs.length > 0 && (
            <Box marginTop="space100">
              <Separator orientation="horizontal" verticalSpacing="space70" />
              <Heading as="h2" variant="heading50">
                Referenced in this essay
              </Heading>
              <Stack orientation="vertical" spacing="space0">
                {note.resolvedRefs.map((ref) => (
                  <Box key={ref.slug} paddingTop="space50" paddingBottom="space50">
                    <Link href={noteUrl(ref)} legacyBehavior passHref>
                      <Anchor>{ref.title}</Anchor>
                    </Link>
                    {ref.creator && (
                      <Text as="span" color="colorTextWeak" fontSize="fontSize20">
                        {' '}— {ref.creator}{ref.year ? `, ${ref.year}` : ''}
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Essays that reference this entry */}
          {!isEssay && note.referencedBy.length > 0 && (
            <Box marginTop="space100">
              <Separator orientation="horizontal" verticalSpacing="space70" />
              <Heading as="h2" variant="heading50">
                Essays about this
              </Heading>
              <Stack orientation="vertical" spacing="space0">
                {note.referencedBy.map((essay) => (
                  <Box key={essay.slug} paddingTop="space50" paddingBottom="space50">
                    <Link href={noteUrl(essay)} legacyBehavior passHref>
                      <Anchor>{essay.title}</Anchor>
                    </Link>
                    {essay.date && (
                      <Text as="span" color="colorTextWeak" fontSize="fontSize20">
                        {' '}— {new Date(essay.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Column>
      </Grid>
    </>
  );
}

export async function getStaticPaths() {
  const notes = await getAllNotes();
  return {
    paths: notes
      .filter((n) => n.date)
      .map((n) => {
        const d = new Date(n.date);
        return {
          params: {
            year: String(d.getUTCFullYear()),
            month: String(d.getUTCMonth() + 1).padStart(2, '0'),
            slug: n.slug,
          },
        };
      }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const note = await getNoteBySlugMdx(params.slug);
  if (!note) return { notFound: true };

  return {
    props: {
      note: { resolvedRefs: [], referencedBy: [], ...note },
      year: params.year,
      month: params.month,
    },
  };
}
