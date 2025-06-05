import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import parse from 'remark-parse';

import { Text } from '@twilio-paste/core/text';
import { Box } from '@twilio-paste/core/box';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { Stack } from '@twilio-paste/core/stack';
import { Anchor } from '@twilio-paste/core/anchor';
import { Heading } from '@twilio-paste/core/heading';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Card } from '@twilio-paste/core/card';

const LikeCard = ({ title, date, review, type, creator }) => {
  const getTypeEmoji = (type) => {
    switch (type.toLowerCase()) {
      case 'game':
        return '🎮';
      case 'book':
        return '📚';
      case 'show':
        return '🎬';
      case 'tv':
        return '📺';
      default:
        return '🎬';
    }
  };

  const renderFormattedText = (text) => {
    // First split by links since they might contain emphasis
    const parts = text.split(/(<link url=".*?">.*?<\/link>|<italic>.*?<\/italic>|<bold>.*?<\/bold>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<link')) {
        const urlMatch = part.match(/url="(.*?)"/);
        const content = part.replace(/<link url=".*?">(.*?)<\/link>/, '$1');
        return (
          <Link key={index} href={urlMatch[1]} passHref>
            <Anchor>{renderFormattedText(content)}</Anchor>
          </Link>
        );
      }
      if (part.startsWith('<italic>')) {
        const content = part.replace(/<\/?italic>/g, '');
        return <Text key={index} as="span" fontStyle="italic">{renderFormattedText(content)}</Text>;
      }
      if (part.startsWith('<bold>')) {
        const content = part.replace(/<\/?bold>/g, '');
        return <Text key={index} as="span" fontWeight="fontWeightBold">{renderFormattedText(content)}</Text>;
      }
      return part;
    });
  };
  
  return (
    <Card padding="space60" marginBottom="space40">
      <Stack orientation="vertical" spacing="space20">
        <Box>
          <Box 
            display="flex" 
            alignItems="flex-start" 
            justifyContent="space-between"
          >
            <Box>
              <Heading as="h3" variant="heading30" marginBottom="space0">
                {renderFormattedText(title)}
              </Heading>
              {creator && (
                <Text as="p" fontSize="fontSize30" color="colorTextWeak" marginTop="space10">
                  {renderFormattedText(creator)}
                </Text>
              )}
            </Box>
          </Box>
        </Box>
        <Stack orientation="vertical" spacing="space40">
          {review.split('\n\n').map((paragraph, index) => (
            <Text key={index} as="p" fontSize="fontSize30">
              {renderFormattedText(paragraph)}
            </Text>
          ))}
        </Stack>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="space20">
          {date && (
            <Text as="p" fontSize="fontSize20" color="colorTextWeak">
              {date}
            </Text>
          )}
          <Text as="span" fontSize="fontSize40" lineHeight="lineHeight40">
            {getTypeEmoji(type)}
          </Text>
        </Box>
      </Stack>
    </Card>
  );
};

function parseLikes(content) {
  const processor = remark().use(parse);
  const ast = processor.parse(content);
  
  const likes = [];
  let currentLike = null;
  
  const processTextNode = (node) => {
    if (node.type === 'text') {
      return node.value;
    } else if (node.type === 'emphasis' || node.type === 'strong') {
      const emphasisType = node.type === 'emphasis' ? 'italic' : 'bold';
      const content = node.children.map(processTextNode).join('');
      return `<${emphasisType}>${content}</${emphasisType}>`;
    } else if (node.type === 'link') {
      const content = node.children.map(processTextNode).join('');
      return `<link url="${node.url}">${content}</link>`;
    } else if (node.children) {
      return node.children.map(processTextNode).join('');
    }
    return '';
  };
  
  for (const node of ast.children) {
    if (node.type === 'heading' && node.depth === 2) {
      if (currentLike) {
        likes.push(currentLike);
      }
      const title = node.children
        .map(processTextNode)
        .join('');
      
      currentLike = {
        title,
        date: '',
        type: '',
        creator: '',
        review: ''
      };
    } else if (currentLike && node.type === 'paragraph') {
      const hasDate = node.children.some(child => 
        child.type === 'strong' && 
        child.children.some(c => c.value === 'Date:')
      );
      const hasType = node.children.some(child => 
        child.type === 'strong' && 
        child.children.some(c => c.value === 'Type:')
      );
      const hasCreator = node.children.some(child => 
        child.type === 'strong' && 
        child.children.some(c => c.value === 'Creator:')
      );

      if (hasDate || hasType || hasCreator) {
        node.children.forEach(child => {
          if (child.type === 'strong') {
            const strongText = child.children.map(c => c.value).join('');
            if (strongText === 'Date:') {
              const nextNode = node.children[node.children.indexOf(child) + 1];
              if (nextNode && nextNode.type === 'text') {
                currentLike.date = nextNode.value.trim();
              }
            } else if (strongText === 'Type:') {
              const nextNode = node.children[node.children.indexOf(child) + 1];
              if (nextNode && nextNode.type === 'text') {
                const typeText = nextNode.value.trim();
                currentLike.type = typeText.split(' ')[0].toLowerCase();
              }
            } else if (strongText === 'Creator:') {
              const nextNode = node.children[node.children.indexOf(child) + 1];
              if (nextNode && nextNode.type === 'text') {
                currentLike.creator = nextNode.value.trim();
              }
            }
          }
        });
      } else {
        const paragraphText = node.children
          .map(processTextNode)
          .join('')
          .trim();
        
        if (paragraphText && paragraphText !== '---') {
          currentLike.review = currentLike.review 
            ? `${currentLike.review}\n\n${paragraphText}`
            : paragraphText;
        }
      }
    }
  }
  
  if (currentLike) {
    likes.push(currentLike);
  }
  
  return likes;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'likes.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const likes = parseLikes(fileContent);
  
  return {
    props: {
      likes: likes.sort((a, b) => {
        const dateA = a.date.includes(' ') ? new Date(a.date) : new Date(a.date);
        const dateB = b.date.includes(' ') ? new Date(b.date) : new Date(b.date);
        return dateB - dateA;
      })
    },
    revalidate: 60
  };
}

export default function Likes({ likes }) {
  return (
    <>
      <Head>
        <title>Likes</title>
      </Head>
      <Grid>
        <Column span={[12, 12, 4]} offset={[0, 0, 1]}>
          <Box>
            <Stack orientation="horizontal" spacing="space30">
              <Link href="/" passHref>
                <Anchor>
                  <ScreenReaderOnly>Back to</ScreenReaderOnly> Home
                </Anchor>
              </Link>
              <Text as="span">/</Text>
            </Stack>
          </Box>
          <Heading as="h1" variant="heading10">
            Likes
          </Heading>
          <Text as="p" fontSize="fontSize40" marginTop="space40">
            There was a wonderful charm to the old web. We'd talk about the things we loved and were excited to share it with the world. Not for likes or clout, but just because. Let's do that again
          </Text>
        </Column>
      </Grid>

      <Box marginTop="space100">
        <Grid>
          <Column span={[12, 12, 4]} offset={[0, 0, 1]}>
            <Box as="div" marginBottom={["space50", "space50", "space50"]}>
              <Stack orientation="vertical" spacing="space60">
                {likes.map((like, index) => (
                  <LikeCard key={index} {...like} />
                ))}
              </Stack>
            </Box>
          </Column>
        </Grid>
      </Box>
    </>
  );
} 