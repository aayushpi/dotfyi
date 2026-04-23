import Head from 'next/head';
import Link from 'next/link';
import { Box } from '@twilio-paste/core/box';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { Stack } from '@twilio-paste/core/stack';
import { Separator } from '@twilio-paste/core/separator';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { getAllNoteSlugs, getNoteBySlug, LOG_TYPES } from '../../lib/content';
import LinkPreviewCard from '../../components/LinkPreviewCard';

const TYPE_LABELS = {
  book: 'Book',
  film: 'Film',
  article: 'Article',
  game: 'Game',
  essay: 'Essay',
  thought: 'Thought',
};

export default function NotePage({ note }) {
  const isLog = LOG_TYPES.includes(note.type);
  const isEssay = note.type === 'essay';

  return (
    <>
      <Head>
        <title>{note.title} — Aayush Iyer</title>
      </Head>
      <Grid>
        <Column span={[12, 12, 7]} offset={[0, 0, 1]}>
          {/* Back nav */}
          <Box marginBottom="space60">
            <Stack orientation="horizontal" spacing="space30">
              <Link href="/" legacyBehavior passHref>
                <Anchor><ScreenReaderOnly>Back to</ScreenReaderOnly> Home</Anchor>
              </Link>
              <Text as="span">/</Text>
              <Link href="/notes" legacyBehavior passHref>
                <Anchor>Notes</Anchor>
              </Link>
              <Text as="span">/</Text>
            </Stack>
          </Box>

          {/* Header */}
          <Box display={isLog ? 'flex' : 'block'} columnGap="space80" marginBottom="space80">
            {/* Cover */}
            {isLog && note.cover && (
              <Box
                flexShrink={0}
                overflow="hidden"
                backgroundColor="colorBackgroundStrong"
                borderStyle="solid"
                borderColor="colorBorderBrandHighlight"
                style={{ width: '6.325rem', height: '10.925rem', borderWidth: '10px' }}
              >
                <Box
                  as="img"
                  src={note.cover}
                  alt={note.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            )}

            {/* Meta */}
            <Box flexGrow={1}>
              <Stack orientation="vertical" spacing="space30">
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

                <Box display="flex" alignItems="baseline" columnGap="space40" flexWrap="wrap">
                  <Heading as="h1" variant="heading10" marginBottom="space0">
                    {note.title}
                  </Heading>
                  {note.creator && (
                    <Text as="span" color="colorTextWeak" fontSize="fontSize30">
                      {note.creator}
                    </Text>
                  )}
                </Box>

                {note.source && (
                  <LinkPreviewCard preview={note.linkPreview} url={note.source} title={note.title} />
                )}
              </Stack>
            </Box>
          </Box>

          <Separator orientation="horizontal" verticalSpacing="space70" />

          {/* Body */}
          <Box
            dangerouslySetInnerHTML={{ __html: note.contentHtml }}
            style={{
              lineHeight: '1.75',
              fontSize: '1.0625rem',
            }}
          />

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
                    <Link href={`/notes/${ref.slug}`} legacyBehavior passHref>
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
                    <Link href={`/notes/${essay.slug}`} legacyBehavior passHref>
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
  const slugs = getAllNoteSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const note = await getNoteBySlug(params.slug);
  if (!note) return { notFound: true };
  return { props: { note: { resolvedRefs: [], referencedBy: [], ...note } } };
}
