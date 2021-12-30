import Head from 'next/head';
import Link from 'next/link';

import {
  Grid,
  Column,
  Heading,
  Paragraph,
  Anchor,
  Stack,
  ScreenReaderOnly,
  Box,
  Text,
  MediaObject,
  MediaFigure,
  MediaBody,
} from '@twilio-paste/core';

export default function Work() {
  return (
    <>
      <Head>
        <title>Work Portfolio</title>
      </Head>
      <Grid>
        <Column span={[12, 12, 6]} offset={[0, 0, 1]}>
          <Box>
            <Stack orientation="horizontal" spacing="space30">
              <Link href="/" passHref>
                <Anchor>
                  <ScreenReaderOnly>Back to</ScreenReaderOnly> Home
                </Anchor>
              </Link>
              <Text as="span">/</Text>
            </Stack>
          </Box>
          <Heading as="h1" variant="heading10">
            Aayush&rsquo;s Work
          </Heading>
        </Column>
      </Grid>

      <Box marginTop="space160">
        <Grid>
          <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
            <MediaObject as="div">
              <MediaFigure as="div" spacing={['space0', 'space0', 'space60']}>
                <Box
                  backgroundColor="colorBackgroundDark"
                  height={['sizeIcon0', 'sizeIcon0', 'sizeIcon100']}
                  width={['sizeIcon0', 'sizeIcon0', 'sizeIcon100']}
                >
                  <img src="/paste/paste.svg" alt="Paste" />
                </Box>
              </MediaFigure>
              <MediaBody as="div">
                <Heading
                  as="h2"
                  variant={['heading50', 'heading30', 'heading10']}
                >
                  Paste is{' '}
                  <Box
                    as="span"
                    backgroundColor="colorBackgroundBrandHighlight"
                  >
                    Twilio&rsquo;s design system
                  </Box>{' '}
                  and supports the work of building accessible, consistent, and
                  high quality customer experiences.
                </Heading>
              </MediaBody>
            </MediaObject>
          </Column>
          <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
            <Heading as="h3" variant="heading60">
              Links, talks, and related writing
            </Heading>
            <Stack orientation={'vertical'} spacing="space30">
              <Link href="https://paste.twilio.design" passHref>
                <Anchor showExternal>Explore Paste Design System</Anchor>
              </Link>
            </Stack>
          </Column>
        </Grid>
      </Box>

      <Box marginTop="space80">
        <Grid>
          <Column span={[12, 12, 12]} offset={[0, 0, 1]}>
            <Heading as="h3" variant="heading30">
              Past work
            </Heading>
          </Column>
        </Grid>
      </Box>

      <Box marginTop="space120">
        <Grid>
          <Column span={[12, 12, 3]} offset={[0, 0, 1]}>
            <Heading as="h2" variant="heading50">
              Twilio Studio
            </Heading>
            <Paragraph>
              Studio is a visual, drag &amp; drop, interface to Twilio&rsquo;s
              APIs. With it, you can quickly prototype and even productionize
              communications in a low-code way.
            </Paragraph>
          </Column>
          <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
            <Heading as="h3" variant="heading60">
              Links, talks, and related writing
            </Heading>
            <Stack orientation="vertical" spacing="space30">
              <Link href="https://www.twilio.com/studio" passHref>
                <Anchor showExternal>Explore Twilio Studio</Anchor>
              </Link>
              <Link href="https://youtu.be/VBjVi4mV0Qk" passHref>
                <Anchor showExternal>Introducing Studio at Signal 2017</Anchor>
              </Link>
            </Stack>
          </Column>
        </Grid>
      </Box>

      <Box marginTop="space160">
        <Grid>
          <Column span={[12, 12, 12]} offset={[0, 0, 1]}>
            <Heading as="h3" variant="heading30">
              Archive content
            </Heading>
          </Column>
        </Grid>
      </Box>

      <Box marginTop="space120">
        <Grid>
          <Column span={[12, 12, 3]} offset={[0, 0, 1]}>
            <Heading as="h2" variant="heading50">
              Vouch
            </Heading>
            <Paragraph>
              Vouch was a lending startup that hypothesized an alternate
              solution for credit-worthiness.
            </Paragraph>
          </Column>
          <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
            <Heading as="h3" variant="heading60">
              Links, talks, and related writing
            </Heading>
            <Stack orientation="vertical" spacing="space30">
              <Link href="https://aayushisin.netlify.app/#vouch" passHref>
                <Anchor showExternal>Read about Vouch</Anchor>
              </Link>
            </Stack>
          </Column>
        </Grid>
      </Box>

      <Box marginTop="space120">
        <Grid>
          <Column span={[12, 12, 3]} offset={[0, 0, 1]}>
            <Heading as="h2" variant="heading50">
              piq
            </Heading>
            <Paragraph>
              piq is a hardware headless jukebox for social spaces. It was a
              Kickstarter project in 2013 that failed to hit its funding goal,
              but was a valuable design exercise.
            </Paragraph>
          </Column>
          <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
            <Heading as="h3" variant="heading60">
              Links, talks, and related writing
            </Heading>
            <Stack orientation="vertical" spacing="space30">
              <Link href="https://aayushisin.netlify.app/#piq" passHref>
                <Anchor showExternal>Read about piq</Anchor>
              </Link>
              <Link href="https://youtu.be/eIMHxpT_cjc" passHref>
                <Anchor showExternal>
                  Introducing piq at a fundraising event
                </Anchor>
              </Link>
              <Link
                href="https://medium.com/design-startups/a12142e9ab28"
                passHref
              >
                <Anchor showExternal>Notes from building piq</Anchor>
              </Link>
            </Stack>
          </Column>
        </Grid>
      </Box>
    </>
  );
}
