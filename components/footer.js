import Link from 'next/link';
import { LinkExternalIcon } from '@twilio-paste/icons/cjs/LinkExternalIcon';
import { Flex } from '@twilio-paste/core/flex';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Stack } from '@twilio-paste/core/stack';
import { Grid, Column } from '@twilio-paste/core/grid';

export const SiteFooter = () => (
  <Box
    as="div"
    marginTop="space50"
    paddingTop="space100"
    paddingBottom="space100"
    backgroundColor="colorBackgroundInverse"
  >
    <Grid>
      <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
        <Box
          paddingLeft={['space50', 'auto', 'auto']}
          paddingRight={['space50', 'auto', 'auto']}
        >
          <Text as="p" color="colorTextInverse">
            Built with{' '}
            <Flex display="inline-flex" vAlignContent="center">
              <Link href="https://paste.twilio.design/" passHref>
                <Text as="a" color="colorTextInverse">
                  Paste
                </Text>
              </Link>
              <LinkExternalIcon
                decorative={false}
                title="Opens an external resource"
                color="colorTextInverse"
              />
            </Flex>
            . Mostly possible due to{' '}
            <Flex display="inline-flex" vAlignContent="center">
              <Link href="https://simontaggart.com/" passHref>
                <Text as="a" color="colorTextInverse">
                  Simon Taggart
                </Text>
              </Link>
              <LinkExternalIcon
                decorative={false}
                title="Opens an external resource"
                color="colorTextInverse"
              />
            </Flex>
            , who patiently handles my 101 Qs.
          </Text>
        </Box>
      </Column>
      <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
        <Box display={['none', 'none', 'inline-block']}>
          <Stack orientation="vertical" spacing="space30">
          <Flex display="inline-flex" vAlignContent="center">
              <Link href="https://www.linkedin.com/in/aayushpi/" passHref>
                <Text as="a" color="colorTextInverse">
                  LinkedIn
                </Text>
              </Link>
              <LinkExternalIcon
                decorative={false}
                title="Opens an external resource"
                color="colorTextInverse"
              />
            </Flex>
            <Flex display="inline-flex" vAlignContent="center">
              <Link href="https://twitter.com/aayush" passHref>
                <Text as="a" color="colorTextInverse">
                  Twitter
                </Text>
              </Link>
              <LinkExternalIcon
                decorative={false}
                title="Opens an external resource"
                color="colorTextInverse"
              />
            </Flex>
          </Stack>
        </Box>
      </Column>
      <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
        <Box display={['none', 'none', 'inline-block']}>
          <Stack orientation="vertical" spacing="space30">
            <Text as="p" color="colorTextInverse">
              Black Lives Matter.
            </Text>
            <Text as="p" color="colorTextInverse">
              No human is illegal.
            </Text>
            <Text as="p" color="colorTextInverse">
              Sex worker rights are labor rights.
            </Text>
            <Text as="p" color="colorTextInverse">
              Our liberation is bound together.
            </Text>
          </Stack>
        </Box>
      </Column>
    </Grid>
  </Box>
);
