import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import { GalleryControls } from "@/components/GalleryControls";
import { getPrototypes, getProjects, getAllTags } from "@/lib/manifest";

export default function HomePage() {
  const prototypes = getPrototypes();
  const projects = getProjects();
  const tags = getAllTags();

  return (
    <Container size="4" px="4" py="8">
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="2">
          <Heading size="8" weight="bold">
            Prototype Viewer
          </Heading>
          <Text color="gray" size="3">
            A private gallery of in-progress design concepts. {prototypes.length}{" "}
            {prototypes.length === 1 ? "prototype" : "prototypes"}.
          </Text>
        </Flex>

        <GalleryControls
          prototypes={prototypes}
          projects={projects}
          tags={tags}
        />
      </Flex>
    </Container>
  );
}
