import Head from "next/head";
import Link from "next/link";
import { LinkExternalIcon } from "@twilio-paste/icons/cjs/LinkExternalIcon";

import { Flex } from "@twilio-paste/core/flex";
import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";
import { Anchor } from "@twilio-paste/core/anchor";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Heading } from "@twilio-paste/core/heading";
import { Grid, Column } from "@twilio-paste/core/grid";
import { OrderedList, UnorderedList, ListItem } from "@twilio-paste/core/list";
import { Card } from "@twilio-paste/core/card";

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
              I&rsquo;m{" "}
              <Box as="span" backgroundColor="colorBackgroundBrandHighlight">
                Aayush Iyer
              </Box>
              . I work on building better products.
            </Heading>
            <Box backgroundColor="colorText">
              <Stack
                orientation={["vertical", "vertical", "horizontal"]}
                spacing="space60"
              >
                <Link href="https://www.linkedin.com/in/aayushpi/" passHref>
                  <Anchor showExternal>LinkedIn</Anchor>
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
              <Box as="div" marginBottom={["space50", "space50", "space50"]}>
                <Heading as="h2" variant="heading20">
                  Writing and Speaking
                </Heading>
                <Stack orientation="vertical" spacing="space60">
                <Card>
                    <Heading as="h3" variant="heading50">
                    Designing a great developer experience
                    </Heading>
                    <Paragraph>
                      I joined an online roundtable hosted by Evil Martians on the topic of designing tools for developers. 
                    </Paragraph>
                    <Link
                      href="https://www.youtube.com/watch?v=PIhJtTboXZ0"
                      passHref
                    >
                      <Anchor showExternal>Watch podcast</Anchor>
                    </Link>
                  </Card>
                  <Card>
                    <Heading as="h3" variant="heading50">
                    The death of traditional shopping: How AI-powered conversational commerce changes everything
                    </Heading>
                    <Paragraph>
                      A blog post launching Algolia&rsquo;s new AI powered framework for conversational commerce
                    </Paragraph>
                    <Link
                      href="https://www.algolia.com/blog/ai/ai-conversational-commerce-ux/"
                      passHref
                    >
                      <Anchor showExternal>View article</Anchor>
                    </Link>
                  </Card>
                  <Card>
                    <Heading as="h3" variant="heading50">
                      How we built a unified, inclusive design system to nurture
                      Twilio&rsquo;s UX
                    </Heading>
                    <Paragraph>
                      I talked about the foundation and operation of Twilio
                      Paste and its impact on Twilio at SIGNAL, 2021.
                    </Paragraph>
                    <Link
                      href="https://www.youtube.com/watch?v=55gd38mph2g"
                      passHref
                    >
                      <Anchor showExternal>View talk</Anchor>
                    </Link>
                  </Card>
                  <Card>
                    <Heading as="h3" variant="heading50">
                      Growing Pains: How We Scaled Our Design System Support
                    </Heading>
                    <Paragraph>
                      I talk about the challenges of a growing platform (in this
                      case, Twilio Paste) and ways to grow support around it.
                    </Paragraph>
                    <Link href="/writing/scaling_support" passHref>
                      <Anchor>Read article</Anchor>
                    </Link>
                  </Card>
                  <Card>
                    <Heading as="h3" variant="heading50">
                      Introducing Studio, Twilio&rsquo;s low-code visual
                      programming language
                    </Heading>
                    <Paragraph>
                      I introduced Twilio&rsquo;s low-code programming language
                      and why we built it at SIGNAL 2017, London.
                    </Paragraph>
                    <Link
                      href="https://www.youtube.com/watch?v=VBjVi4mV0Qk"
                      passHref
                    >
                      <Anchor showExternal>View talk</Anchor>
                    </Link>
                  </Card>
                </Stack>
              </Box>
              <Box as="div" marginBottom={["space50", "space50", 0]}>
                <Heading as="h2" variant="heading20">
                  Stuff I&rsquo;ve built
                </Heading>
                <UnorderedList>
                  <ListItem>
                    <Link href="https://paste.twilio.design" passHref>
                      <Anchor showExternal>Paste</Anchor>
                    </Link>{" "}
                    A comprehensive UX platform to build great customer
                    experiences
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.twilio.com/studio" passHref>
                      <Anchor showExternal>Studio</Anchor>
                    </Link>
                    A low-code visual programming language to build powerful
                    workflows.
                  </ListItem>
                </UnorderedList>
              </Box>
            </Column>
            <Column span={[12, 12, 4]} offset={[0, 0, 1]}>
              <Heading as="h2" variant="heading20">
                Work
              </Heading>
              <Heading as="h3" variant="heading40">
                User Experience &amp; UI Platform at Algolia
              </Heading>
              <Paragraph>
                I lead product, product design, research, and engineering teams
                at Algolia.{" "}
                <Link href="https://www.algolia.com/careers/" passHref>
                  <Anchor showExternal>We&rsquo;re still hiring</Anchor>
                </Link>{" "}
                thoughtfully. The common thread across these teams is a deep
                commitment to understanding customer pain and defining what "good quality" looks like.
              </Paragraph>
              <Heading as="h3" variant="heading40">
                UX at Twilio
              </Heading>
              <Paragraph>
                I founded the design systems practice at Twilio and grew a team
                from an ad-hoc, unsystemized front-end environment to a fully
                funded, staffed, and roadmapped discipline. Over time, this
                scope evolved to the entire spectrum of UX Infrastructure
                including content writing, visual design, and design operations
                and focused on alignment of design, engineering, and product to
                create great customer experiences.
              </Paragraph>
              <Paragraph>
                My outputs were both tactical and cultural: setting product
                teams up for quick wins by providing resilient, performant UI,
                uplevelling the scale at which product design is delivered to an
                organization, and focusing on customer inclusion and happiness
                through inclusive design, UX engineering, content writing, and
                more.
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
