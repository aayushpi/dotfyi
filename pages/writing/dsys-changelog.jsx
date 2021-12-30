import Head from 'next/head';
import Link from 'next/link';

import {
  Grid,
  Column,
  Card,
  Heading,
  Paragraph,
  Anchor,
  Stack,
  ScreenReaderOnly,
  Box,
  Text,
} from '@twilio-paste/core';

export default () => {
  return (
    <>
      <Head>
        <title>DSYS CHANGELOG</title>
      </Head>
      <Grid gutter="space40">
        <Column span={12} offset={1}>
          <Box>
            <Stack orientation="horizontal" spacing="space30">
              <Link href="/" passHref>
                <Anchor>
                  <ScreenReaderOnly>Back to</ScreenReaderOnly> Home
                </Anchor>
              </Link>
              <Text as="span">/</Text>
              <Link href="/" passHref>
                <Anchor>Writing</Anchor>
              </Link>
              <Text as="span">/</Text>
            </Stack>
          </Box>
          <Heading as="h1" variant="heading10">
            Twilio&rsquo;s Design System{' '}
            <Box as="span" backgroundColor="colorBackgroundBrandHighlight">
              Changelog
            </Box>
          </Heading>
          <Paragraph>
            As we&rsquo;ve built Paste from scratch, we always wondered: How did
            GitHub | Atlassian | Shopify solve this problem? Only recently have
            I had the confidence to peek out of the hole to look around, and ask
            teams about how they&rsquo;re scaling their systems.
          </Paragraph>
          <Paragraph>
            In an effort for some radical transparency, here's a changelog of
            Twilio's design system efforts. I hope it's useful as you pave your
            own path towards accessible, systemized UI.
          </Paragraph>
          <Heading as="h2" variant="heading20">
            People
          </Heading>
          <Grid gutter="space60">
            <Column span={3}>
              <Card>
                <Heading as="h3" variant="heading30">
                  2018-2019
                </Heading>
                <Paragraph>
                  <strong>Engineering:</strong>Part time contribution from an
                  engineer, contractor
                </Paragraph>
              </Card>
            </Column>
            <Column span={3}>
              <Card>
                <Heading as="h3" variant="heading30">
                  2018-2019
                </Heading>
                <Paragraph>
                  <strong>Engineering:</strong>Part time contribution from an
                  engineer, contractor
                </Paragraph>
              </Card>
            </Column>
            <Column span={3}>
              <Card>
                <Heading as="h3" variant="heading30">
                  2018-2019
                </Heading>
                <Paragraph>
                  <strong>Engineering:</strong>Part time contribution from an
                  engineer, contractor
                </Paragraph>
              </Card>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </>
  );
};
