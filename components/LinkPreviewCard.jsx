import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';

export default function LinkPreviewCard({ preview, url, title }) {
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
        backgroundColor: 'colorBorderBrandHighlight',
        borderColor: 'colorBorderBrandHighlight',
      }}
    >
      <Text
        as="span"
        fontSize="fontSize20"
        fontWeight="fontWeightSemibold"
        color="colorTextLink"
        marginBottom="space0"
      >
        {title || preview.title}
        {preview.author && (
          <>
            <Text as="span" marginX="space20">—</Text>
            {preview.author}
          </>
        )}
      </Text>
      <Text
        as="span"
        marginLeft="space20"
        color="colorTextLink"
        fontSize="fontSize20"
      >
        ↗
      </Text>
    </Box>
  );
}
