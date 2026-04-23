import { Box } from '@twilio-paste/core/box';
import { Anchor } from '@twilio-paste/core/anchor';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';

// MDX components that use Paste for styling
const mdxComponents = {
  a: ({ href, children, ...props }) => (
    <Anchor href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" {...props}>
      {children}
    </Anchor>
  ),
  p: (props) => <Paragraph {...props} />,
  h1: (props) => <Heading as="h1" variant="heading10" {...props} />,
  h2: (props) => <Heading as="h2" variant="heading20" {...props} />,
  h3: (props) => <Heading as="h3" variant="heading30" {...props} />,
  h4: (props) => <Heading as="h4" variant="heading40" {...props} />,
  h5: (props) => <Heading as="h5" variant="heading50" {...props} />,
  h6: (props) => <Heading as="h6" variant="heading60" {...props} />,
  em: (props) => <Text as="em" {...props} />,
  i: (props) => <Text as="i" {...props} />,
  strong: (props) => <Text as="strong" {...props} />,
  b: (props) => <Text as="b" {...props} />,
  ul: (props) => <Box as="ul" {...props} />,
  ol: (props) => <Box as="ol" {...props} />,
  li: (props) => <Box as="li" {...props} />,
  blockquote: (props) => <Box as="blockquote" {...props} />,
  code: (props) => <code {...props} />,
  pre: (props) => <pre {...props} />,
};

export default mdxComponents;
