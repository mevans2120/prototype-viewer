import Link from "next/link";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <Container size="2" px="4" py="9">
      <Flex direction="column" gap="4" align="start">
        <Heading size="7">Not found</Heading>
        <Text color="gray">
          That prototype doesn&apos;t exist in the manifest.
        </Text>
        <Button asChild variant="soft">
          <Link href="/">Back to gallery</Link>
        </Button>
      </Flex>
    </Container>
  );
}
