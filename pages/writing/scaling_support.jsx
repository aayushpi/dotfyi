import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function UserBubble({ children }) {
  return (
    <div className="flex justify-start">
      <div>
        <div className="bg-ink text-bg rounded-2xl rounded-bl-none text-base leading-snug p-3 max-w-xs">
          {children}
        </div>
      </div>
    </div>
  );
}

function SystemBubble({ children, emoji }) {
  return (
    <div className="flex justify-end">
      <div>
        <div className="bg-highlight text-ink rounded-2xl rounded-br-none text-base leading-snug p-3 max-w-xs">
          {children}
        </div>
        {emoji && <div className="text-2xl mt-1 text-right">{emoji}</div>}
      </div>
    </div>
  );
}

function EmergencyWidget() {
  const [triggered, setTriggered] = useState(false);
  return (
    <div className="flex justify-end">
      <div>
        <div className="bg-highlight text-ink rounded-2xl rounded-br-none text-base leading-snug p-3 max-w-xs">
          Hi! Post your question on{' '}
          <a href="https://github.com/twilio-labs/paste/discussions" className="underline">GitHub</a>
          ! If this is an extremely urgent request press the emergency button, and a DSYS team member
          will get back to you!
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setTriggered(true)}
              className="bg-ink text-bg text-sm px-3 py-1 rounded"
            >
              🚨 Emergency
            </button>
          </div>
          {triggered && (
            <div className="mt-4">Aye aye! Paging a team member now. Hang tight!</div>
          )}
        </div>
        <div className="text-2xl mt-1 text-right">🤖</div>
      </div>
    </div>
  );
}

export default function ScalingSupport() {
  return (
    <>
      <Head>
        <title>Growing Pains: How We Scaled Our Design System Support — Aayush Iyer</title>
      </Head>

      <div className="mb-10">
        <div className="mb-6 flex items-center gap-2 text-[18px]">
          <Link href="/" className="no-underline hover:underline">Home</Link>
          <span className="text-ink-muted">/</span>
          <Link href="/writing" className="no-underline hover:underline">Writing</Link>
          <span className="text-ink-muted">/</span>
        </div>
        <h1 className="font-sans font-black text-4xl text-ink">
          Growing Pains: How We{' '}
          <span className="bg-highlight px-0.5">Scaled Our Design System Support</span>
        </h1>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-12">
        {/* Main content */}
        <div>
          <p className="mb-4">
            If you&rsquo;re building a new platform team, your customers are going to go through many
            changes. In the case of a design system, tools, hacks, and practices that made your team
            wildly successful are also the cause of long term design and technical debt. Making
            corrective changes to mitigate these problems with a platform can often mean taking away
            these legos. Although this is positive, you&rsquo;re playing with feelings and agency.
            And the way you communicate these changes and support people in the transition can be the
            differentiator between success and rejection.{' '}
          </p>
          <p className="mb-4">
            We saw this as the{' '}
            <a href="https://paste.twilio.design/" className="underline">Twilio design system</a>{' '}
            was incubated and eventually scaled organization wide. Here are some of the ways we
            scaled our support, helping our customers and ourselves through these stages.
          </p>

          <h2 className="font-serif font-black text-2xl text-ink mt-8 mb-4">Stage 1: Support as incubation</h2>
          <p className="mb-4">
            In 2018, we didn&rsquo;t have a design system at Twilio. This meant that the most
            efficient way to express a UI solution involved copying older implementations and adopting
            popular code snippets and packages. In and of itself, this was fine: however, it did
            create situations where a UI compromise was necessary.
          </p>
          <p className="mb-4">
            Since we were just incubating and weren&rsquo;t fully staffed or bought-in by the
            organization, we took small steps. One such step was the creation of a <em>help</em>{' '}
            slack channel. Here, no matter what your UI question was, we&rsquo;d attempt to solve it.
            What&rsquo;s more, we wanted to solve it quickly. While this approach didn&rsquo;t allow
            for the best answer for each experience, it did allow us to take diving catches that built
            trust with designers, PMs, and engineers.
          </p>
          <p className="mb-4">
            This support model worked as intended. Over the years, engagement in this slack channel
            increased. Front-end engineers and product designers organically found community and the
            best possible way to solve a problem. This whet the appetite for a design systems team,
            and provided enough evidence to make key hires could <em>actually</em> build a system.
          </p>

          <h2 className="font-serif font-black text-2xl text-ink mt-8 mb-4">Stage 2: Support as we scaled</h2>
          <p className="mb-4">
            Fast forward about a year, and Paste was at the foot of a steep adoption curve. Unlike
            our legacy libraries (which had larger, more complex monolithic components), we had moved
            to an approach of small, accessible, and composable pieces of kit that could be mixed and
            matched. Designers and engineers were beginning to use the system in their UIs. As they
            went about this, there was a lot of learning and undoing of old habits that was necessary.
            We started getting a lot of questions around component usage, accessibility, composition,
            UI reviews, etc. Answering these questions took some time, and as we saw 20+ questions a
            day, the four person team began to feel it.
          </p>
          <p className="mb-4">
            This was a good problem to have: customers were buying in to the design system at a pace
            that was greater than anticipated. However, this meant that we were increasingly devoting
            more time to support rather than new development. This put a dent in our shipping
            velocity but more importantly affected team health: support is hard and often a thankless
            job. To mitigate these problems, we investigated why our support model was failing at
            scale:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              The immediacy of Slack meant it was easier for people to get answers to their questions
              through a Slack message than go to the doc site to look for an answer.
            </li>
            <li>
              Slack messages are ephemeral and teams around the world would routinely wake up to a
              host of new information that they&rsquo;d just not see, leading to repeated questions.
            </li>
            <li>
              The quality of incoming requests was affected by the medium: &ldquo;My build broke, can
              you help?&rdquo; instead of &ldquo;My build (screenshot attached) failed, I am
              currently doing <em>x</em>, and tried to do <em>y</em>&rdquo;
            </li>
          </ul>
          <p className="mb-4">
            A change was necessary: we needed to evolve our discussions from &ldquo;What&rsquo;s fast
            and cheap?&rdquo; to &ldquo;What&rsquo;s right?&rdquo;. To address the rising tide of
            support questions, the team stepped back from answering every question and made some
            changes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              We improved documentation structure based on feedback. This included a greater focus on
              examples and do&rsquo;s and don&rsquo;ts.
            </li>
            <li>
              We began a rotating helper model for the team to lead support conversations through the
              week. This allowed the majority of the team to focus on work, while mentally preparing
              our weekly support helper to embrace conversations with service mindset.
            </li>
            <li>
              We also made a <strong>big change</strong> to how we support teams by moving all
              conversations from Slack to GitHub discussions.
            </li>
          </ul>
          <p className="mb-4">
            The last change was particularly significant: moving the support model from Slack to a
            new platform was more than a minor inconvenience. To many, it was a breach of trust that
            the system was founded on. Managing how our users felt about this change was an important
            criteria for success. We&rsquo;d need to inform people of the change, and then remind
            them of it enough till the habit was broken and remade. And we had to hope that in all of
            this, they still trusted us.
          </p>

          <h2 className="font-serif font-black text-2xl text-ink mt-8 mb-4">Making the support change</h2>
          <h3 className="font-serif font-black text-xl text-ink mt-6 mb-3">How we announced it</h3>
          <p className="mb-4">
            We made the support official at an All Hands meeting. But, keeping this change from
            unraveling meant a consistent change in team and customer behavior:{' '}
            <em>we&rsquo;d need to be persistent</em>. We had to politely, but firmly say no to every
            request unless it came from the right channel. This also made it a{' '}
            <strong>feelings</strong> management problem: it was hard to have a team that had once
            routinely said <em>yes, and</em> to every request, now point to an external URL for any
            help.
          </p>

          <h3 className="font-serif font-black text-xl text-ink mt-6 mb-3">Enter the automations</h3>
          <p className="mb-4">
            We addressed new users first: using Slack&rsquo;s{' '}
            <a href="https://slack.com/features/workflow-automation" className="underline">Workflow Builder</a>
            , I built a bot that DM&rsquo;d anyone who joined our Slack channel for the first time
            with a greeting, important information, and link to our support and documentation. While
            this helped, we still had hundreds of people still active in the channel with a previous
            social contract.
          </p>
          <p className="mb-4">
            To guide our existing customers, I built another bot: this one was a little less discrete.
            For every new question that showed up in Slack, it posted a response suggesting the user
            redirect this question to a support channel.
          </p>
          <p className="mb-4">
            We sweated the details of this bot&rsquo;s message and tone. It had to be polite,
            sufficiently firm, and also provide reasons why we were making this change. For example,
            the bot responded to a slack reaction that&rsquo;s used company wide to positively promote
            the value of better documentation. We also included an escalation path for the truly rare
            request that needed urgent intervention: while the chances of needing to hit this button
            were extremely rare, it gave customers peace of mind in knowing that a short circuit still
            existed.
          </p>
          <p className="mb-4">
            We called this bot the <em>Paste Concierge</em>. It launched two months ago and we paid
            keen attention to how customers might react to it. Our largest customer persona (front-end
            engineers) took to the GitHub model easily. However, it took a while to convince designers
            and other users to sign up for GitHub just to engage with the system. We held firm with
            this new support model, and here&rsquo;s what we&rsquo;ve observed so far:
          </p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              Slack support requests have dropped from 20+ a day to ~1 a week. Some of these are
              redirected to GitHub, but others are managed directly.
            </li>
            <li>
              GitHub discussions did <em>not</em> proportionally increase to 20+ a day, which was a
              net-win for ticket deflection 🎉. One hypothesis for this is customers are more willing
              to try a few things out if the immediacy of Slack is not available.
            </li>
          </ol>
          <p className="mb-4">
            While the Paste Concierge clearly helped, there&rsquo;s still more work to be done with
            design system support at Twilio. In the year ahead, we hope to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Make support more conversational, and less transactional: each support question should
              influence the design and direction of the system.
            </li>
            <li>
              Our conversations are still mostly <em>public DMs</em>, and not true discussions. This
              isn&rsquo;t ideal: like any design problem, involving diverse perspectives usually leads
              to better outcomes.
            </li>
          </ul>

          <h2 className="font-serif font-black text-2xl text-ink mt-8 mb-4">Closing thoughts</h2>
          <p className="mb-4">
            Perfect customer support doesn&rsquo;t exist. Also, there&rsquo;s no single or linear
            way to scale for it.{' '}
            <a href="https://www.jennieyip.design/" className="underline">Jennie Yip</a>{' '}
            nailed it when she said:
          </p>
          <blockquote className="border-l-4 border-highlight pl-5 mx-0 my-4 italic">
            &ldquo;We don&rsquo;t often talk about how much we get beat up being on a #designsystems
            team. The leads have to be strong + resilient to protect the focus of our team and for
            the system to be successful. I am deeply grateful to my passionate and empathetic team.
            But damn, some days are hard.&rdquo;{' '}
            <a href="https://twitter.com/jenniesyip/status/1278380817090150405" className="underline not-italic">(Source)</a>
          </blockquote>
          <p className="mb-4">
            The UX and UI that we ship is dynamic and changes with time. So should our support
            models. Healthy design systems respond to the world around them— whether it&rsquo;s
            making space to switch off when we&rsquo;re sheltered in place, time off for direct or
            political action, or surging for important deadlines like launches. In each of these
            cultural situations, consider the success of your support to not be about the answer
            itself, but the process in which your customer gets there, and how your team feels about
            it.
          </p>

          <hr className="border-border-subtle my-8" />
          <p className="text-sm text-ink-muted">
            Many thanks to{' '}
            <a href="https://www.jennieyip.design/" className="underline">Jennie Yip</a>
            ,{' '}
            <a href="https://heysarah.li/" className="underline">Sarah Li</a>
            , and{' '}
            <a href="https://chexee.me/" className="underline">Chelsea Otakan</a>{' '}
            for guidance and edits on this article. If you see a typo or an error, please{' '}
            <a href="https://github.com/aayushpi/dotfyi/blob/master/pages/writing/scaling_support.mdx" className="underline">
              suggest an edit
            </a>
            . I&rsquo;d love to hear your thoughts and comments on this{' '}
            <a href="https://twitter.com/aayush/status/1356690446135619585" className="underline">Twitter thread</a>
          </p>
        </div>

        {/* Chat sidebar */}
        <div className="flex flex-col gap-6 pt-2">
          {/* Stage 1 */}
          <UserBubble>My build broke, can you help?</UserBubble>
          <SystemBubble emoji="😀">
            Sure! What&rsquo;s the error? What component were you trying to use? What version of
            React are you on?
          </SystemBubble>

          {/* Stage 2 */}
          <UserBubble>My build broke, can you help?</UserBubble>
          <SystemBubble emoji="😀">Sure! What&rsquo;s the error? What component we--</SystemBubble>
          <UserBubble>What component can I use to make multiple selections from a list?</UserBubble>
          <SystemBubble emoji="🙂">You could use a Combobox. However for now --</SystemBubble>
          <UserBubble>
            <strong>@here</strong> Hey folks where can I find the Sketch files for Paste?
          </UserBubble>
          <SystemBubble emoji="😐">It&rsquo;s in the Getting Started section.</SystemBubble>
          <UserBubble>Do you have an updated ETA on tables?</UserBubble>
          <SystemBubble emoji="😖">Not yet, still working on it!</SystemBubble>

          {/* Stage 3: concierge */}
          <UserBubble>👩🏻‍🎤 joined design system help.</UserBubble>
          <SystemBubble emoji="🤖">
            Hey 👩🏻‍🎤! Welcome to design system help!
            <br />
            📖 Start by{' '}
            <a href="https://paste.twilio.design/" className="underline">exploring our docs</a>
            <br />❓ Still need help?{' '}
            <a href="https://github.com/twilio-labs/paste/discussions" className="underline">Start a discussion</a>
            <br />
            🕐 Expect a 1 day response time
            <br />
            🚨 Extremely urgent request, post in Slack!
          </SystemBubble>
          <UserBubble>
            Is there a way to style Paste components? className props don&rsquo;t seem to work!
          </UserBubble>
          <EmergencyWidget />
        </div>
      </div>
    </>
  );
}
