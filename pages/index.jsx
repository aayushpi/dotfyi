import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";
import { Anchor } from "@twilio-paste/core/anchor";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Heading } from "@twilio-paste/core/heading";
import { Grid, Column } from "@twilio-paste/core/grid";
import { UnorderedList, ListItem } from "@twilio-paste/core/list";
import { Card } from "@twilio-paste/core/card";
import { Text } from "@twilio-paste/core/text";

function SectionRow({ children }) {
  return (
    <Box paddingTop="space60" paddingBottom="space20">
      {children}
    </Box>
  );
}

function ExpandableSection({ title, children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <SectionRow>
      <Box
        display="flex"
        alignItems="baseline"
        columnGap="space30"
        onClick={() => setExpanded((e) => !e)}
        style={{ cursor: "pointer" }}
        marginBottom={expanded ? "space60" : "space0"}
      >
        <Heading as="h2" variant="heading20" marginBottom="space0">
          {title}
        </Heading>
        <Text as="span" color="colorTextWeak" fontSize="fontSize30">
          {expanded ? "−" : "+"}
        </Text>
      </Box>
      {expanded && <Box>{children}</Box>}
    </SectionRow>
  );
}

export default function HomePage() {
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

            <Box marginTop="space70">
              {/* Notes — navigates away */}
              <SectionRow>
                <Link href="/notes" legacyBehavior passHref>
                  <Box as="a" style={{ textDecoration: "none", color: "inherit" }}>
                    <Box display="flex" alignItems="baseline" columnGap="space30">
                      <Heading as="h2" variant="heading20" marginBottom="space0">
                        Notes &amp; Thoughts
                      </Heading>
                      <Text as="span" color="colorBorderBrandHighlight" fontSize="fontSize30">
                        →
                      </Text>
                    </Box>
                  </Box>
                </Link>
              </SectionRow>

              {/* Work */}
              <ExpandableSection title="Work">
                <Heading as="h3" variant="heading40">
                  User Experience &amp; UI Platform at Algolia
                </Heading>
                <Paragraph>
                  I lead product, product design, research, and engineering teams
                  at Algolia.{" "}
                  <Anchor href="https://www.algolia.com/careers/">We&rsquo;re still hiring</Anchor>{" "}
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
              </ExpandableSection>

              {/* Writing and Speaking */}
              <ExpandableSection title="Writing and Speaking">
                <Stack orientation="vertical" spacing="space60">
                  <Card>
                    <Heading as="h3" variant="heading50">
                      Designing a great developer experience
                    </Heading>
                    <Paragraph>
                      I joined an online roundtable hosted by Evil Martians on the topic of designing tools for developers.
                    </Paragraph>
                    <Anchor href="https://www.youtube.com/watch?v=PIhJtTboXZ0" showExternal>Watch podcast</Anchor>
                  </Card>
                  <Card>
                    <Heading as="h3" variant="heading50">
                      The death of traditional shopping: How AI-powered conversational commerce changes everything
                    </Heading>
                    <Paragraph>
                      A blog post launching Algolia&rsquo;s new AI powered framework for conversational commerce
                    </Paragraph>
                    <Anchor href="https://www.algolia.com/blog/ai/ai-conversational-commerce-ux/" showExternal>View article</Anchor>
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
                    <Anchor href="https://www.youtube.com/watch?v=55gd38mph2g" showExternal>View talk</Anchor>
                  </Card>
                  <Card>
                    <Heading as="h3" variant="heading50">
                      Growing Pains: How We Scaled Our Design System Support
                    </Heading>
                    <Paragraph>
                      I talk about the challenges of a growing platform (in this
                      case, Twilio Paste) and ways to grow support around it.
                    </Paragraph>
                    <Link href="/writing/scaling_support" legacyBehavior passHref>
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
                    <Anchor href="https://www.youtube.com/watch?v=VBjVi4mV0Qk" showExternal>View talk</Anchor>
                  </Card>
                </Stack>
              </ExpandableSection>

              {/* Stuff I've built */}
              <SectionRow>
                <Heading as="h2" variant="heading20">
                  Stuff I&rsquo;ve built
                </Heading>
                <UnorderedList>
                  <ListItem>
                    <Anchor href="https://paste.twilio.design" showExternal>Paste</Anchor>{" "}
                    A comprehensive UX platform to build great customer experiences
                  </ListItem>
                  <ListItem>
                    <Anchor href="https://www.twilio.com/studio" showExternal>Studio</Anchor>{" "}
                    A low-code visual programming language to build powerful workflows.
                  </ListItem>
                </UnorderedList>
              </SectionRow>
            </Box>
          </Column>
        </Grid>
      </Box>
    </>
  );
}
