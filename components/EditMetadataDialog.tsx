"use client";

import { useState, useTransition } from "react";
import { Button, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { resetMetadata, saveMetadata } from "@/app/actions";

export function EditMetadataDialog({
  slug,
  title,
  description,
  trigger,
}: {
  slug: string;
  title: string;
  description: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [descValue, setDescValue] = useState(description);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(next: boolean) {
    if (next) {
      setTitleValue(title);
      setDescValue(description);
    }
    setOpen(next);
  }

  function handleSave() {
    startTransition(async () => {
      await saveMetadata(slug, { title: titleValue, description: descValue });
      setOpen(false);
    });
  }

  function handleReset() {
    startTransition(async () => {
      await resetMetadata(slug);
      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content maxWidth="480px">
        <Dialog.Title>Edit metadata</Dialog.Title>
        <Dialog.Description size="2" color="gray" mb="3">
          Changes are visible to everyone.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="Prototype title"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
              placeholder="Short summary"
              rows={3}
            />
          </label>
        </Flex>

        <Flex mt="4" justify="between" align="center" gap="3">
          <Button
            variant="ghost"
            color="gray"
            onClick={handleReset}
            disabled={isPending}
          >
            Reset to default
          </Button>
          <Flex gap="2">
            <Dialog.Close>
              <Button variant="soft" color="gray" disabled={isPending}>
                Cancel
              </Button>
            </Dialog.Close>
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
