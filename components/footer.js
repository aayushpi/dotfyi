import react from "react";
import Link from "next/link";
import { Grid, Column, Stack, Text, Box } from "@twilio-paste/core";
export const SiteFooter = () => (
  <Box
    as="section"
    marginTop="space50"
    paddingTop="space100"
    paddingBottom="space100"
    backgroundColor="colorBackgroundInverse"
  >
    <Grid gutter={["space0", "space0", "space0"]}>
      <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
        <Text as="p" color="colorTextInverse">
          This site is being built, in an act of extreme dogfooding, with{" "}
          <Link href="//paste.twilio.design/" passHref>
            <Text as="a" color="colorTextInverse">
              Paste
            </Text>
          </Link>
          . It also uses{" "}
          <Link href="//nextjs.org/" passHref>
            <Text as="a" color="colorTextInverse">
              Next.js
            </Text>
          </Link>
          , which is nice. It was mostly possible due to{" "}
          <Link href="//simontaggart.com/" passHref>
            <Text as="a" color="colorTextInverse">
              Simon Taggart
            </Text>
          </Link>
          , who patiently handled my 101 Qs.
        </Text>
      </Column>
      <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
        <Box>
          <Stack orientation="vertical" spacing="space30">
            <Link href="/work" passHref>
              <Text as="a" color="colorTextInverse">
                Work
              </Text>
            </Link>
            <Link href="//twitter.com/aayush" passHref>
              <Text as="a" color="colorTextInverse">
                Twitter
              </Text>
            </Link>
          </Stack>
        </Box>
      </Column>
      <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
        <Box>
          <Stack orientation="vertical" spacing="space30">
            <Text as="p" color="colorTextInverse">
              Black Lives Matter.
            </Text>
            <Text as="p" color="colorTextInverse">
              No man is illegal.
            </Text>
            <Text as="p" color="colorTextInverse">
              Sex worker rights are labor rights.
            </Text>
            <Text as="p" color="colorTextInverse">
              Our liberation is bound together.
            </Text>
          </Stack>
        </Box>
      </Column>
    </Grid>
  </Box>
);
