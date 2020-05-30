import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link'
import {
  Anchor,
  Heading,
  Paragraph,
  OrderedList,
  UnorderedList,
  ListItem,
  Separator,
} from '@twilio-paste/core';
export const ComponentProvider= ({ children }) => (
  <MDXProvider
    components={{
      h1: (props) => (
        <Heading {...props} as="h1" variant="heading10" />
      ),
      h2: (props) => (
        <Heading {...props} as="h2" variant="heading20" />
      ),
      h3: (props) => (
        <Heading {...props} as="h3" variant="heading30" />
      ),
      h4: (props) => (
        <Heading {...props} as="h4" variant="heading40" />
      ),
      h5: (props) => (
        <Heading {...props} as="h5" variant="heading50" />
      ),
      h6: (props) => (
        <Heading {...props} as="h6" variant="heading60" />
      ),
      p: (props) => <Paragraph {...props} />,
      ul: (props) => <UnorderedList {...props} />,
      ol: (props) => <OrderedList {...props} />,
      li: (props) => <ListItem {...props} />,
      blockquote: (props) => (
        <blockquote {...props} />
      ),
      table: (props) => <table {...props} />,
      thead: (props) => <thead {...props} />,
      tbody: (props) => <tbody {...props} />,
      tfoot: (props) => <tfoot {...props} />,
      tr: (props) => <tr {...props} />,
      th: (props) => <th {...props} />,
      td: (props) => <td {...props} />,
      pre: (props) => <pre {...props} />,
      code: (props) => <code {...props} />,
      inlineCode: (props) => <code {...props} />,
      em: (props) => <em {...props} />,
      strong: (props) => <strong {...props} />,
      del: (props) => <del {...props} />,
      hr: (props) => (
        <Separator orientation="horizontal" verticalSpacing="space70" {...props} />
      ),
      a: (props) => <Link {...props} passHref><Anchor {...props} /></Link>, // eslint-disable-line jsx-a11y/anchor-has-content
      img: (props) => <img {...props} />, // eslint-disable-line jsx-a11y/alt-text
      sup: (props) => <sup {...props} />,
      content: (props) => <div {...props} />,
      contentwrapper: (props) => (
        <div {...props} />
      ),
    }}
  >
    {children}
  </MDXProvider>
);