import Head from 'next/head';
import Link from 'next/link';
import { LinkExternalIcon } from '@twilio-paste/icons/cjs/LinkExternalIcon';

import { Flex } from '@twilio-paste/core/flex';
import { Box } from '@twilio-paste/core/box';
import { Stack } from '@twilio-paste/core/stack';
import { Anchor } from '@twilio-paste/core/anchor';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Heading } from '@twilio-paste/core/heading';
import { Grid, Column } from '@twilio-paste/core/grid';
import {OrderedList, UnorderedList, ListItem} from '@twilio-paste/core/list';


export default () => {
  return (
    <>
      <Head>
        <title>Aayush Iyer</title>
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
                  Writing and Speaking
                </Heading>
                <UnorderedList>
                  <ListItem>
                    <Link href="/writing/scaling_support" passHref>
                      <Anchor>
                        Growing Pains: How We Scaled Our Design System Support
                      </Anchor>
                    </Link>
                  </ListItem>
                <ListItem>
                    <Link href="https://www.youtube.com/watch?v=55gd38mph2g" passHref>
                      <Anchor showExternal>
                        How we built a unified, inclusive design system to nurture Twilio&rsquo;s UX
                      </Anchor>
                    </Link>       
                </ListItem>
              </UnorderedList>
              </Box>
            </Column>
            <Column span={[12, 12, 4]} offset={[0, 0, 1]}>
              <Heading as="h2" variant="heading20">
                Work
              </Heading>
              <Heading as="h3" variant="heading40">
                UX at Twilio
              </Heading>
              <Paragraph>
                I founded the design systems practice at Twilio and grew a team from an ad-hoc, unsystemized front-end environment to a fully funded, staffed, and roadmapped discipline. Over time, this scope evolved to the entire spectrum of UX Infrastructure including content writing, visual design, and design operations and focused on alignment of design, engineering, and product to create great customer experiences.
              </Paragraph>
              <Paragraph>
                My outputs were both tactical and cultural: setting product teams up for quick wins by providing resilient, performant UI, uplevelling the scale at which product design is delivered to an organization, and focusing on customer inclusion and happiness through inclusive design, UX engineering, content writing, and more.
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
};
