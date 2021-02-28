---
title: first post
date: "2020-05-29"
---

import {
Grid,
Column,
Card,
Heading,
Paragraph,
Button,
Anchor,
OrderedList,
UnorderedList,
ListItem,
Stack,
Text,
Separator,
Box,
DisclosurePrimitive,
DisclosurePrimitiveContent,
useDisclosurePrimitiveState,
Flex,
} from "@twilio-paste/core";

<Box>
  <Grid>
    <Column span={[12, 12, 4]} offset={[0, 0, 1]}>

# FIRST POST

The design system at Twilio started as a Slack channel. Without subject matter experts, the focus was to provide accountability and an organization level git blame for when a team’s UI broke, or couldn’t be implemented. Given that we were only just at the basecamp of the front end maturity model, developers naturally flocked to it and questions around UI, UI tooling, front-end, and application logic came in: we answered them all, as best we could.

Fast forward about a year, and Paste was in the middle of steep adoption curve. Designers and engineers were using the system as a baseline for their UIs. Paste is a fairly modern design system, with a number of “new” concepts that were quite unlike the plurality of component libraries that we were deprecating. Because of this, the transition between experiences was a learning curve, and we experienced that through support tickets and a dramatic rise in office hour engagements. Given that slack was our support system, we went from handling literally any question around UI, to slowly deflect anything not related to design systems. Eventually, even this got too much and we ended up where we are today: dedicated flankers manage support questions for the entire week, and adjust their expected contributions to DSYS sprints as such.

In spite of these triage efforts, adoption grew and so did questions. We started getting increasingly complex questions around accessibility, composition, UI reviews, and of course Typescript errors. We’d see upwards of 10 questions a day, and the team began to feel it.

We knew we had to make a change, and in this investigation, we recognized a few important themes:

- The immediacy of Slack led to support requests that were already sufficiently documented on the doc site, or in other channels.
- Slack itself was proving ineffective in the face of ephemeral messages, and teams would routinely wake up to a host of new questions or even answers that they’d potentially missed.
- Similarly, we began to see repeated questions (often from the same team!)

We firmly believed that moving to a less immediate medium for support would have a few benefits:

- Incoming requests would have more clarifying context which would lead to higher quality discussions (“My build screenshot attached failed, I am currently doing x, and tried to do y”) vs (“My build broke can you help?”)
- Escalate via DM would be avoided
- The expectation of an instant reply would reduce, leading to more protection of the team itself.
- Knowledge bases would be more searchable
- We could reference URLs for common discussion topics

In doing so, we identified GitHub’s new discussions feature as a promising candidate for future conversations. We set it up, and were raring to go. Except, everyone’s on Slack.

Systems should solve problems of scale so that designers can solve more interesting problems.

In this case, the change was cultural. Moving the support model from Slack to a new platform was at the very least, a significant inconvenience. At worst, it was a breach of trust that the system was founded on. Managing how our users felt about this change was the criteria for success. We had already used Github for issues, with less than ideal outcomes. We had to get this right. At some point, we’d need to inform people of the change, and then remind them enough till the habit was broken and remade. And we had to hope that in all of this, they still loved us (or at least didn’t hate us)

How we announced the change

We made the change official by announcing a new support model at an All Hands meeting. It was sandwiched in between two big, generally positive announcements. That helped mask the initial blow, but was also missed by quite a few folks. Keeping this change going meant we’d need to be persistent. We’d need to politely, but firmly say no to every request unless it came from the right channel.

Enter automation.

Using Slack’s workflow builder, we built a bot that DM’d anyone who joined our slack channel for the first time with a greeting, important information, and a link to our support area.

screenshot of welcome bot

And while that helped, we knew that we still had hundreds of people still active in the channel with a previous social contract. To remedy this, we built another bot: This one was a little less discrete. For every new question that showed up in Slack, it posted a response suggesting the user redirect this question to a support channel.

screenshot of concierge bot

We sweated the details on the copy of this. IT had to be polite, had to feel sufficiently robotic, and also provide reasons why we were making this change. We also included an escalation path: while the chances of hitting this button are extremely rare (given that our design system does not directly deploy to customers), it did give customers peace of mind in knowing that urgent requests were still handled in this channel.

For a number of reasons, this couldn’t be automatic: we set it to respond to an emoji reaction as a trigger. Since we’re mostly picky, we sweated on the perfect reaction too: it can’t be snarky, it can’t be rude: it had to convey the message that we’re doing this for a higher bar of documentation. So we turned to one of our favorite Twilio Values: write it down. By using it as an emoji, we framed the redirection as an application of company values, and not personal hubris.

We launched this about two months ago. Here’s what we’ve observed so far:

1. Slack support requests have dropped from 10+ a day to ~ 3 a week. Some of these are redirected to GitHub, but others are managed directly.
2. GitHub discussion did _not_ increase to 10+ a day (it did increase significantly, but nowhere as close) A hypothesis we have for this is that customers are more willing to try a few things out if the immediacy of slack is not available.
3. The quality of discussions increased somewhat. We still have a ways to go. Our hypothesis here is that independent of the medium, we probably have a lot more that we can do to help frame better conversations around UI.

There’s still unanswered questions about design system support at Twilio. In the year ahead, we hope to:

- Make support more conversational, and less transactional: each support question should influence the design and direction of the system.
- Move discussions from 1:1 conversations to 1:many - like a good design problem, there’s a number of ways to tackle a specific problem. Diverse perspective usually lead to better outcomes.

</Column>
</Grid>
</Box>
