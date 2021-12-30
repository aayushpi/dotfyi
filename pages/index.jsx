import Head from 'next/head';
import Link from 'next/link';
import {
  Grid,
  Column,
  Heading,
  Paragraph,
  Anchor,
  Stack,
  Box,
  Flex,
} from '@twilio-paste/core';
import { LinkExternalIcon } from '@twilio-paste/icons/cjs/LinkExternalIcon';

export default function Index() {
  return (
    <>
      <Head>
        <title>aayush.fyi</title>
      </Head>
      <Box>
        <Grid>
          <Column span={[12, 12, 4]} offset={[0, 0, 1]}>
            <Heading as="h1" variant="heading10">
              I&rsquo;m{' '}
              <Box as="span" backgroundColor="colorBackgroundBrandHighlight">
                Aayush Iyer
              </Box>
              . I work on building better products through design, and better
              design through systems.
            </Heading>
            <Box backgroundColor="colorText">
              <Stack
                orientation={['vertical', 'vertical', 'horizontal']}
                spacing="space60"
              >
                <Link href="/work" passHref>
                  <Anchor>Work</Anchor>
                </Link>
                <Flex display="inline-flex" vAlignContent="center">
                  <Link href="https://twitter.com/aayush" passHref>
                    <Anchor>Twitter</Anchor>
                  </Link>
                  <LinkExternalIcon
                    decorative={false}
                    title="Opens an external resource"
                  />
                </Flex>
              </Stack>
            </Box>
          </Column>
        </Grid>
        <Box marginTop="space100">
          <Grid>
            <Column span={[12, 12, 4]} offset={[0, 0, 1]}>
              <Box as="div" marginBottom={['space50', 'space50', 0]}>
                <Heading as="h2" variant="heading20">
                  Recent Writing
                </Heading>
                <Link href="/writing/scaling_support" passHref>
                  <Anchor>
                    Growing Pains: How We Scaled Our Design System Support
                  </Anchor>
                </Link>
              </Box>
            </Column>
            <Column span={[12, 12, 4]} offset={[0, 0, 1]}>
              <Heading as="h2" variant="heading20">
                Work
              </Heading>
              <Heading as="h3" variant="heading40">
                Design at Twilio
              </Heading>
              <Paragraph>
                I joined Twilio in 2017 as their third Product Designer. Today,
                I manage the Design Systems team, and am part of UX Leadership.
                My focus at Twilio has been on resilient UI design &amp;
                engineering, and widening the spectrum of who gets to build and
                communicate with technology.
              </Paragraph>
              <Heading as="h3" variant="heading40">
                Other work
              </Heading>
              <Paragraph>
                The 17 years since my first job as a journalist have shaped my
                approach towards building things. Along the way I&rsquo;ve built
                hardware jukeboxes, award-winning digital campaigns, and a whole
                host of really terrible software - somehow, they all informed
                where I got to and where I&rsquo;m going.
              </Paragraph>
            </Column>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
