import { Box } from '@twilio-paste/core/box';
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
      display="inline-block"
      paddingX="space30"
      paddingY="space20"
      borderRadius="borderRadius20"
      borderStyle="solid"
      borderColor="colorBorderWeak"
      borderWidth="borderWidth10"
      backgroundColor="colorBackgroundStrong"
      textDecoration="none"
      style={{
        transition: 'all 200ms ease',
      }}
      _hover={{
        borderColor: 'colorBorderBrandHighlight',
      }}
    >
      <Stack orientation="vertical" spacing="space10">
        {preview.image && (
          <Box
            as="img"
            src={preview.image}
            alt=""
            style={{
              width: '100%',
              maxWidth: '280px',
              height: 'auto',
              borderRadius: '8px',
              display: 'block',
            }}
          />
        )}
        <Text
          as="div"
          fontSize="fontSize20"
          fontWeight="fontWeightSemibold"
          color="colorTextLink"
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
        </Text>
        {preview.description && (
          <Text
            as="p"
            fontSize="fontSize20"
            color="colorText"
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
  );
}
