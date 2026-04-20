import Link from "next/link";
import { Card, Flex, Text } from "@radix-ui/themes";
import type { Prototype } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function PrototypeCard({ prototype }: { prototype: Prototype }) {
  return (
    <Link href={`/p/${prototype.slug}/`} className="group block">
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
  );
}
