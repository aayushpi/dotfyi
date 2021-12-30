import Head from 'next/head';
import Link from 'next/link';

import {
  Grid,
  Column,
  Heading,
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
        <title>Writing</title>
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
            Writing
          </Heading>
        </Column>
      </Grid>

      <Link href="/writing/scaling_support" passHref>
        <Anchor>Scaling Support</Anchor>
      </Link>
    </>
  );
};
