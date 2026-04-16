import Head from 'next/head';
import Link from 'next/link';

import { Text } from '@twilio-paste/core/text';
import { Box } from '@twilio-paste/core/box';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { Stack } from '@twilio-paste/core/stack';
import { Anchor } from '@twilio-paste/core/anchor';
import { Heading } from '@twilio-paste/core/heading';
import { Grid, Column } from '@twilio-paste/core/grid';

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
              <Link href="/" legacyBehavior passHref>
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

      <Link href="/writing/scaling_support" legacyBehavior passHref>
        <Anchor>Scaling Support</Anchor>
      </Link>
    </>
  );
};
