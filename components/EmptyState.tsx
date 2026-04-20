import { Callout, Flex, Text } from "@radix-ui/themes";
import { FolderOpenIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";

export function EmptyState({ hasPrototypes }: { hasPrototypes: boolean }) {
  if (!hasPrototypes) {
    return (
      <Callout.Root size="2" color="gray" variant="soft">
        <Callout.Icon>
          <FolderOpenIcon size={18} />
        </Callout.Icon>
        <Callout.Text>
          No prototypes yet. See{" "}
          <a
            href="https://github.com/"
            className="underline decoration-dotted underline-offset-4"
          >
            docs/adding-a-prototype.md
          </a>{" "}
          to add one.
        </Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <Flex align="center" gap="2" py="6" justify="center">
      <MagnifyingGlassIcon size={18} />
      <Text size="2" color="gray">
        No prototypes match these filters.
      </Text>
    </Flex>
  );
}
