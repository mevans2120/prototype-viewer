import Link from "next/link";
import { Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import type { Prototype } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { EditMetadataDialog } from "./EditMetadataDialog";

export function PrototypeCard({ prototype }: { prototype: Prototype }) {
  return (
    <div className="group relative">
      <Link href={`/p/${prototype.slug}/`} className="block">
        <Card className="transition-transform group-hover:-translate-y-0.5 group-hover:shadow-lg">
          <Flex direction="column" gap="2" p="3">
            <Text size="1" color="gray">
              {formatDate(prototype.createdAt)}
            </Text>
            <Text as="div" weight="bold" size="3">
              {prototype.title}
            </Text>
            {prototype.description ? (
              <Text as="p" size="2" color="gray">
                {prototype.description}
              </Text>
            ) : null}
          </Flex>
        </Card>
      </Link>
      <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <EditMetadataDialog
          slug={prototype.slug}
          title={prototype.title}
          description={prototype.description}
          trigger={
            <IconButton size="1" variant="soft" color="gray" aria-label="Edit metadata">
              <PencilSimpleIcon size={14} />
            </IconButton>
          }
        />
      </div>
    </div>
  );
}
