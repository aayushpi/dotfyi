import react from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { MediaObject, MediaBody } from '@twilio-paste/core/media-object';
import { OrderedList, UnorderedList, ListItem } from '@twilio-paste/core/list';
import { Text } from '@twilio-paste/core/text';
import { Box } from '@twilio-paste/core/box';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { Stack } from '@twilio-paste/core/stack';
import { Separator } from '@twilio-paste/core/separator';
import { Anchor } from '@twilio-paste/core/anchor';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Heading } from '@twilio-paste/core/heading';
import { Button } from '@twilio-paste/core/button';
import { Grid, Column } from '@twilio-paste/core/grid';

const triggerEmergency = () => {
  const [displayProp, setDisplayProp] = react.useState('none');
  return (
    <>
      <Head>
        <title>Growing Pains and How We Scaled our Design System Support</title>
      </Head>
      <Box display="flex" justifyContent="flex-end">
        <MediaObject as="div">
          <MediaBody>
            <Box
              as="div"
              color="colorText"
              backgroundColor="colorBackgroundUser"
              borderRadius="borderRadius20"
              borderBottomRightRadius="borderRadius0"
              fontSize="fontSize30"
              lineHeight="lineHeight20"
              padding="space30"
              maxWidth="size30"
            >
              Hi! Post your question on{' '}
              <Anchor href="https://github.com/twilio-labs/paste/discussions">GitHub</Anchor>
              ! If this is an extremely urgent request press the emergency
              button, and a DSYS team member will get back to you!
              <Box marginTop="space20">
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => {
                    setDisplayProp('flex');
                  }}
                >
                  🚨 Emergency
                </Button>
              </Box>
              <Box display={displayProp} marginTop="space40">
                Aye aye! Paging a team member now. Hang tight!
              </Box>
            </Box>
            <Text
              as="div"
              color="colorText"
              fontSize="fontSize50"
              marginTop="space10"
              textAlign="right"
            >
              🤖
            </Text>
          </MediaBody>
        </MediaObject>
      </Box>
      <Box display={displayProp} justifyContent="flex-end">
        <MediaObject as="div">
          <MediaBody>
            <Box
              as="div"
              color="colorText"
              backgroundColor="colorBackgroundUser"
              borderRadius="borderRadius20"
              borderBottomRightRadius="borderRadius0"
              fontSize="fontSize30"
              lineHeight="lineHeight20"
              padding="space30"
              maxWidth="size30"
            >
              Hi there, we intentionally haven't introduced classNames in Paste.
              Read about it in our doc site!
            </Box>
            <Text
              as="div"
              color="colorText"
              fontSize="fontSize50"
              marginTop="space10"
              textAlign="right"
            >
              🙂
            </Text>
          </MediaBody>
        </MediaObject>
      </Box>
    </>
  );
};

export default () => {
  return (
    <>
      <Box marginBottom="space60">
        <Grid gutter="space40">
          <Column span={[12, 12, 4]} offset={[0, 0, 1]}>
            <Box>
              <Stack orientation="horizontal" spacing="space30">
                <Link href="/" legacyBehavior passHref>
                  <Anchor>
                    <ScreenReaderOnly>Back to</ScreenReaderOnly> Home
                  </Anchor>
                </Link>
                <Text as="span">/</Text>
                Writing
                <Text as="span">/</Text>
              </Stack>
            </Box>
            <Heading as="h1" variant="heading10">
              Growing Pains: How We{' '}
              <Box as="span" backgroundColor="colorBackgroundBrandHighlight">
                Scaled Our Design System Support
              </Box>
            </Heading>
          </Column>
        </Grid>
      </Box>
      <Grid gutter="space40">
        <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
          <Paragraph>
            If you're building a new platform team, your customers are going to
            go through many changes. In the case of a design system, tools,
            hacks, and practices that made your team wildly successful are also
            the cause of long term design and technical debt. Making corrective
            changes to mitigate these problems with a platform can often mean
            taking away these legos. Although this is positive, you're playing
            with feelings and agency. And the way you communicate these changes
            and support people in the transition can be the differentiator
            between success and rejection.{' '}
          </Paragraph>
          <Paragraph>
            We saw this as the{' '}
            <Anchor href="https://paste.twilio.design/">Twilio design system</Anchor>{' '}
            was incubated and eventually scaled organization wide. Here are some
            of the ways we scaled our support, helping our customers and
            ourselves through these stages.
          </Paragraph>
          <Heading as="h2" variant="heading20">
            Stage 1: Support as incubation
          </Heading>
          <Paragraph>
            In 2018, we didn’t have a design system at Twilio. This meant that
            the most efficient way to express a UI solution involved copying
            older implementations and adopting popular code snippets and
            packages. In and of itself, this was fine: however, it did create
            situations where a UI compromise was necessary.
          </Paragraph>
          <Paragraph>
            Since we were just incubating and weren't fully staffed or bought-in
            by the organization, we took small steps. One such step was the
            creation of a *help* slack channel. Here, no matter what your UI
            question was, we'd attempt to solve it. What's more, we wanted to
            solve it quickly. While this approach didn't allow for the best
            answer for each experience, it did allow us to take diving catches
            that built trust with designers, PMs, and engineers.
          </Paragraph>
          <Paragraph>
            This support model worked as intended. Over the years, engagement in
            this slack channel increased. Front-end engineers and product
            designers organically found community and the best possible way to
            solve a problem. This whet the appetite for a design systems team,
            and provided enough evidence to make key hires could{' '}
            <em>actually</em> build a system.
          </Paragraph>
        </Column>
        <Column span={[12, 12, 3]} offset={[0, 0, 1]}>
          <Stack orientation="vertical" spacing="space60">
            <Box display="flex" justifyContent="flex-start">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorTextInverse"
                    backgroundColor="colorBackgroundInverse"
                    borderRadius="borderRadius30"
                    borderBottomLeftRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    My build broke, can you help?
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                  >
                    🧒🏽
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorText"
                    backgroundColor="colorBackgroundUser"
                    borderRadius="borderRadius20"
                    borderBottomRightRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    Sure! What's the error? What component were you trying to
                    use? What version of React are you on?
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                    textAlign="right"
                  >
                    😀
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
          </Stack>
        </Column>
      </Grid>
      <Grid gutter="space40">
        <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
          <Heading as="h2" variant="heading20">
            Stage 2: Support as we scaled
          </Heading>
          <Paragraph>
            Fast forward about a year, and Paste was at the foot of a steep
            adoption curve. Unlike our legacy libraries (which had larger, more
            complex monolithic components), we had moved to an approach of
            small, accessible, and composable pieces of kit that could be mixed
            and matched. Designers and engineers were beginning to use the
            system in their UIs. As they went about this, there was a lot of
            learning and undoing of old habits that was necessary. We started
            getting a lot of questions around component usage, accessibility,
            composition, UI reviews, etc. Answering these questions took some
            time, and as we saw 20+ questions a day, the four person team began
            to feel it.
          </Paragraph>
          <Paragraph>
            This was a good problem to have: customers were buying in to the
            design system at a pace that was greater than anticipated. However,
            this meant that we were increasingly devoting more time to support
            rather than new development. This put a dent in our shipping
            velocity but more importantly affected team health: support is hard
            and often a thankless job. To mitigate these problems, we
            investigated why our support model was failing at scale:
          </Paragraph>
          <UnorderedList>
            <ListItem>
              The immediacy of Slack meant it was easier for people to get
              answers to their questions through a Slack message than go to the
              doc site to look for an answer.
            </ListItem>
            <ListItem>
              Slack messages are ephemeral and teams around the world would
              routinely wake up to a host of new information that they’d just
              not see, leading to repeated questions.
            </ListItem>
            <ListItem>
              The quality of incoming requests was affected by the medium: “My
              build broke, can you help?” instead of “My build (screenshot
              attached) failed, I am currently doing <em>x</em>, and tried to do{' '}
              <em>y</em>”
            </ListItem>
          </UnorderedList>
          <Paragraph>
            A change was necessary: we needed to evolve our discussions from
            "What's fast and cheap?" to "What's right?". To address the rising
            tide of support questions, the team stepped back from answering
            every question and made some changes:
          </Paragraph>
          <UnorderedList>
            <ListItem>
              We improved documentation structure based on feedback. This
              included a greater focus on examples and do's and don'ts.
            </ListItem>
            <ListItem>
              We began a rotating helper model for the team to lead support
              conversations through the week. This allowed the majority of the
              team to focus on work, while mentally preparing our weekly support
              helper to embrace conversations with service mindset.
            </ListItem>
            <ListItem>
              We also made a <strong>big change</strong> to how we support teams
              by moving all conversations from Slack to GitHub discussions.
            </ListItem>
          </UnorderedList>
          <Paragraph>
            The last change was particularly significant: moving the support
            model from Slack to a new platform was more than a minor
            inconvenience. To many, it was a breach of trust that the system was
            founded on. Managing how our users felt about this change was an
            important criteria for success. We’d need to inform people of the
            change, and then remind them of it enough till the habit was broken
            and remade. And we had to hope that in all of this, they still
            trusted us.
          </Paragraph>
        </Column>
        <Column span={[12, 12, 3]} offset={[0, 0, 1]}>
          <Stack orientation="vertical" spacing="space60">
            <Box display="flex" justifyContent="flex-start">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorTextInverse"
                    backgroundColor="colorBackgroundInverse"
                    borderRadius="borderRadius30"
                    borderBottomLeftRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    My build broke, can you help?
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                  >
                    🧒🏽
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorText"
                    backgroundColor="colorBackgroundUser"
                    borderRadius="borderRadius20"
                    borderBottomRightRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    Sure! What's the error? What component we--
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                    textAlign="right"
                  >
                    😀
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-start">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorTextInverse"
                    backgroundColor="colorBackgroundInverse"
                    borderRadius="borderRadius30"
                    borderBottomLeftRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    What component can I use to make multiple selections from a
                    list?
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                  >
                    👩🏼‍🦰
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorText"
                    backgroundColor="colorBackgroundUser"
                    borderRadius="borderRadius20"
                    borderBottomRightRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    You could use a Combobox. However for now --
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                    textAlign="right"
                  >
                    🙂
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-start">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorTextInverse"
                    backgroundColor="colorBackgroundInverse"
                    borderRadius="borderRadius30"
                    borderBottomLeftRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    <strong>@here</strong> Hey folks where can I find the Sketch
                    files for Paste?
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                  >
                    👨🏻
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorText"
                    backgroundColor="colorBackgroundUser"
                    borderRadius="borderRadius20"
                    borderBottomRightRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    It's in the Getting Started section.
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                    textAlign="right"
                  >
                    😐
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-start">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorTextInverse"
                    backgroundColor="colorBackgroundInverse"
                    borderRadius="borderRadius30"
                    borderBottomLeftRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    Do you have an updated ETA on tables?
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                  >
                    🧕🏼
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorText"
                    backgroundColor="colorBackgroundUser"
                    borderRadius="borderRadius20"
                    borderBottomRightRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    Not yet, still working on it!
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                    textAlign="right"
                  >
                    😖
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
          </Stack>
        </Column>
      </Grid>
      <Grid gutter="space40">
        <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
          <Heading as="h2" variant="heading20">
            Making the support change
          </Heading>
          <Heading as="h3" variant="heading40">
            How we announced it
          </Heading>
          <Paragraph>
            We made the support official at an All Hands meeting. But, keeping
            this change from unraveling meant a consistent change in team and
            customer behavior: <em>we’d need to be persistent</em>. We had to
            politely, but firmly say no to every request unless it came from the
            right channel. This also made it a <strong>feelings</strong>{' '}
            management problem: it was hard to have a team that had once
            routinely said <em>yes, and</em> to every request, now point to an
            external URL for any help.
          </Paragraph>
        </Column>
      </Grid>
      <Grid gutter="space40">
        <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
          <Heading as="h3" variant="heading40">
            Enter the automations
          </Heading>
          <Paragraph>
            We addressed new users first: using Slack’s{' '}
            <Anchor href="https://slack.com/features/workflow-automation">Workflow Builder</Anchor>
            , I built a bot that DM’d anyone who joined our Slack channel for
            the first time with a greeting, important information, and link to
            our support and documentation. While this helped, we still had
            hundreds of people still active in the channel with a previous
            social contract.
          </Paragraph>
          <Paragraph>
            To guide our existing customers, I built another bot: this one was a
            little less discrete. For every new question that showed up in
            Slack, it posted a response suggesting the user redirect this
            question to a support channel.
          </Paragraph>
          <Paragraph>
            We sweated the details of this bot's message and tone. It had to be
            polite, sufficiently firm, and also provide reasons why we were
            making this change. For example, the bot responded to a slack
            reaction that's used company wide to positively promote the value of
            better documentation. We also included an escalation path for the
            truly rare request that needed urgent intervention: while the
            chances of needing to hit this button were extremely rare, it gave
            customers peace of mind in knowing that a short circuit still
            existed.
          </Paragraph>
          <Paragraph>
            We called this bot the <em>Paste Concierge</em>. It launched two
            months ago and we paid keen attention to how customers might react
            to it. Our largest customer persona (front-end engineers) took to
            the GitHub model easily. However, it took a while to convince
            designers and other users to sign up for GitHub just to engage with
            the system. We held firm with this new support model, and here’s
            what we’ve observed so far:
          </Paragraph>
          <OrderedList>
            <ListItem>
              Slack support requests have dropped from 20+ a day to ~1 a week.
              Some of these are redirected to GitHub, but others are managed
              directly.
            </ListItem>
            <ListItem>
              GitHub discussions did <em>not</em> proportionally increase to 20+
              a day, which was a net-win for ticket deflection 🎉. One
              hypothesis for this is customers are more willing to try a few
              things out if the immediacy of Slack is not available.
            </ListItem>
          </OrderedList>
          <Paragraph>
            While the Paste Concierge clearly helped, there's still more work to
            be done with design system support at Twilio. In the year ahead, we
            hope to:
          </Paragraph>
          <UnorderedList>
            <ListItem>
              Make support more conversational, and less transactional: each
              support question should influence the design and direction of the
              system.
            </ListItem>
            <ListItem>
              Our conversations are still mostly <em>public DMs</em>, and not
              true discussions. This isn't ideal: like any design problem,
              involving diverse perspectives usually leads to better outcomes.
            </ListItem>
          </UnorderedList>
        </Column>
        <Column span={[12, 12, 3]} offset={[0, 0, 1]}>
          <Stack orientation="vertical" spacing="space60">
            <Box display="flex" justifyContent="flex-start">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorTextInverse"
                    backgroundColor="colorBackgroundInverse"
                    borderRadius="borderRadius30"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    👩🏻‍🎤 joined design system help.
                  </Box>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-start">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorText"
                    backgroundColor="colorBackgroundUser"
                    borderRadius="borderRadius20"
                    borderBottomRightRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                  >
                    Hey 👩🏻‍🎤! Welcome to design system help!
                    <br />
                    📖 Start by{' '}
                    <Anchor href="https://paste.twilio.design/">exploring our docs</Anchor>
                    <br />❓ Still need help?{' '}
                    <Anchor href="https://github.com/twilio-labs/paste/discussions">Start a discussion</Anchor>
                    <br />
                    🕐 Expect a 1 day response time
                    <br />
                    🚨 Extremely urgent request, post in Slack!
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                    textAlign="right"
                  >
                    🤖
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            <Box display="flex" justifyContent="flex-start">
              <MediaObject as="div">
                <MediaBody>
                  <Box
                    as="div"
                    color="colorTextInverse"
                    backgroundColor="colorBackgroundInverse"
                    borderRadius="borderRadius30"
                    borderBottomLeftRadius="borderRadius0"
                    fontSize="fontSize30"
                    lineHeight="lineHeight20"
                    padding="space30"
                    maxWidth="size30"
                  >
                    Is there a way to style Paste components? className props
                    don't seem to work!
                  </Box>
                  <Text
                    as="div"
                    color="colorText"
                    fontSize="fontSize50"
                    marginTop="space10"
                  >
                    👩🏼‍🦰
                  </Text>
                </MediaBody>
              </MediaObject>
            </Box>
            {triggerEmergency()}
          </Stack>
        </Column>
      </Grid>
      <Grid gutter="space40">
        <Column span={[12, 12, 5]} offset={[0, 0, 1]}>
          <Heading as="h2" variant="heading20">
            Closing thoughts
          </Heading>
          <Paragraph>
            Perfect customer support doesn't exist. Also, there's no single or
            linear way to scale for it.{' '}
            <Anchor href="https://www.jennieyip.design/">Jennie Yip</Anchor>{' '}
            nailed it when she said:
          </Paragraph>
          <Box as="blockquote" paddingLeft={['space0', 'space40', 'space40']}>
            <Text fontStyle="italic">
              "We don’t often talk about how much we get beat up being on a
              #designsystems team. The leads have to be strong + resilient to
              protect the focus of our team and for the system to be successful.
              I am deeply grateful to my passionate and empathetic team. But
              damn, some days are hard."
            </Text>{' '}
            <Anchor href="https://twitter.com/jenniesyip/status/1278380817090150405">(Source)</Anchor>
          </Box>
          <Paragraph>
            The UX and UI that we ship is dynamic and changes with time. So
            should our support models. Healthy design systems respond to the
            world around them— whether it's making space to switch off when
            we're sheltered in place, time off for direct or political action,
            or surging for important deadlines like launches. In each of these
            cultural situations, consider the success of your support to not be
            about the answer itself, but the process in which your customer gets
            there, and how your team feels about it.
          </Paragraph>
          <Box as="section">
            <Separator orientation="horizontal" verticalSpacing="space50" />
            <Text as="p" fontSize="fontSize20">
              Many thanks to{' '}
              <Anchor href="https://www.jennieyip.design/">Jennie Yip</Anchor>
              ,{' '}
              <Anchor href="https://heysarah.li/">Sarah Li</Anchor>
              , and{' '}
              <Anchor href="https://chexee.me/">Chelsea Otakan</Anchor>{' '}
              for guidance and edits on this article. If you see a typo or an
              error, please{' '}
              <Anchor href="https://github.com/aayushpi/dotfyi/blob/master/pages/writing/scaling_support.mdx">suggest an edit</Anchor>
              . I'd love to hear your thoughts and comments on this{' '}
              <Anchor href="https://twitter.com/aayush/status/1356690446135619585">Twitter thread</Anchor>
            </Text>
          </Box>
        </Column>
      </Grid>
    </>
  );
};
