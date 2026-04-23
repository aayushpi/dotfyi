import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Text } from '@twilio-paste/core/text';
import { Stack } from '@twilio-paste/core/stack';
import { Anchor } from '@twilio-paste/core/anchor';

export default function LinkPreviewCard({ preview, url }) {
  // Fallback to a basic link if preview data isn't available
  if (!preview) {
    return (
      <Anchor href={url} showExternal>
        View source
      </Anchor>
    );
  }

  return (
    <Box
      as="a"
      href={preview.url || url}
      target="_blank"
      rel="noopener noreferrer"
      display="block"
      borderStyle="solid"
      borderColor="colorBorderWeak"
      borderWidth="borderWidth10"
      borderRadius="borderRadius20"
      backgroundColor="colorBackground"
      overflow="hidden"
      textDecoration="none"
      style={{
        transition: 'all 200ms ease',
      }}
      _hover={{
        borderColor: 'colorBorderBrandHighlight',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Box display="flex" flexDirection="row" height="100%">
        {/* Image */}
        {preview.image && (
          <Box
            flexShrink={0}
            overflow="hidden"
            backgroundColor="colorBackgroundStrong"
            style={{
              width: '120px',
              height: '120px',
            }}
          >
            <Box
              as="img"
              src={preview.image}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        )}

        {/* Content */}
        <Box
          paddingX="space40"
          paddingY="space30"
          flexGrow={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Stack orientation="vertical" spacing="space20">
            <Heading
              as="h3"
              variant="heading60"
              marginBottom="space0"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {preview.title}
            </Heading>
            {preview.description && (
              <Text
                as="p"
                color="colorTextWeak"
                fontSize="fontSize20"
                marginBottom="space0"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {preview.description}
              </Text>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
