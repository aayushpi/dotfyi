import react from "react";
import Link from "next/link";
import {
  Grid,
  Anchor,
  Column,
  Stack,
  Text,
  Box,
  Flex,
} from "@twilio-paste/core";
import { LinkExternalIcon } from "@twilio-paste/icons/cjs/LinkExternalIcon";
export const SiteFooter = () => (
  <Box
    as="div"
    marginTop="space50"
    paddingTop="space100"
    paddingBottom="space100"
    backgroundColor="colorBackgroundInverse"
  >
      <Grid>
        <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
          <Box 
            paddingLeft={["space50", "auto", "auto"]}
            paddingRight={["space50", "auto", "auto"]}>
            <Text as="p" color="colorTextInverse">
              This site is being built, in an act of extreme dogfooding, with{" "}
              <Flex display="inline-flex" vAlignContent="center">
              <Link href="//paste.twilio.design/" passHref>
                <Text as="a" color="colorTextInverse">
                  Paste
                </Text>
              </Link>
              <LinkExternalIcon
                    decorative={false}
                    title="Opens an external resource"
                    color="colorTextInverse"
                  />
              </Flex>
              . It also uses{" "}
              <Flex display="inline-flex" vAlignContent="center">
              <Link href="//nextjs.org/" passHref>
                <Text as="a" color="colorTextInverse">
                  Next.js
                </Text>
              </Link>
              <LinkExternalIcon
                    decorative={false}
                    title="Opens an external resource"
                    color="colorTextInverse"
                  />
              </Flex>
              , which is nice. It was mostly possible due to{" "}
              <Flex display="inline-flex" vAlignContent="center">
              <Link href="//simontaggart.com/" passHref>
                <Text as="a" color="colorTextInverse">
                  Simon Taggart
                </Text>            
              </Link>
              <LinkExternalIcon
                    decorative={false}
                    title="Opens an external resource"
                    color="colorTextInverse"
                  />
              </Flex>
              , who patiently handled my 101 Qs.
            </Text>
          </Box>
        </Column>
        <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
          <Box
          display={["none", "none", "inline-block"]}>
            <Stack orientation="vertical" spacing="space30">
              <Link href="/work" passHref>
                <Text as="a" color="colorTextInverse">
                  Work
                </Text>
              </Link>
              <Flex display="inline-flex" vAlignContent="center">
                <Link href="//twitter.com/aayush" passHref>
                  <Text as="a" color="colorTextInverse">
                    Twitter
                  </Text>
                </Link>
                <LinkExternalIcon
                  decorative={false}
                  title="Opens an external resource"
                  color="colorTextInverse"
                />
              </Flex>
            </Stack>
          </Box>
        </Column>
        <Column span={[12, 12, 2]} offset={[0, 0, 1]}>
          <Box
          display={["none", "none", "inline-block"]}>
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
