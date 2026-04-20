import { Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { PrototypeCard } from "@/components/PrototypeCard";
import { getPrototypes, getProjects } from "@/lib/manifest";

export default function HomePage() {
  const prototypes = getPrototypes();
  const projects = getProjects();
  const projectById = new Map(projects.map((p) => [p.id, p]));

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

        {prototypes.length === 0 ? (
          <Text color="gray" size="2">
            No prototypes yet. See <code>docs/adding-a-prototype.md</code> to add one.
          </Text>
        ) : (
          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
            {prototypes.map((prototype) => (
              <PrototypeCard
                key={prototype.slug}
                prototype={prototype}
                project={projectById.get(prototype.project ?? "")}
              />
            ))}
          </Grid>
        )}
      </Flex>
    </Container>
  );
}
