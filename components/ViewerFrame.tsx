"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import {
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  CheckIcon,
  DesktopIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  LinkIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Project, Prototype } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

type Width = "desktop" | "tablet" | "mobile";

const WIDTHS: Record<Width, { label: string; px: number | null; Icon: typeof DesktopIcon }> = {
  desktop: { label: "Desktop", px: null, Icon: DesktopIcon },
  tablet: { label: "Tablet (768)", px: 768, Icon: DeviceTabletIcon },
  mobile: { label: "Mobile (390)", px: 390, Icon: DeviceMobileIcon },
};

export function ViewerFrame({
  prototype,
  project,
}: {
  prototype: Prototype;
  project?: Project;
}) {
  const [width, setWidth] = useState<Width>("desktop");
  const [copied, setCopied] = useState(false);
  const fileUrl = `/prototypes/${prototype.file}`;

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  async function handleCopy() {
    if (typeof window === "undefined") return;
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }

  const target = WIDTHS[width];

  return (
    <Flex direction="column" className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
        <Flex align="center" gap="3" px="4" py="2" wrap="wrap">
          <Link href="/" aria-label="Back to gallery">
            <IconButton size="2" variant="ghost" color="gray">
              <ArrowLeftIcon size={18} />
            </IconButton>
          </Link>

          <Flex direction="column" gap="0" className="min-w-0 flex-1">
            <Flex align="center" gap="2">
              <Text weight="bold" size="3" className="truncate">
                {prototype.title}
              </Text>
              {project ? (
                <Badge color="gray" variant="soft" radius="full">
                  {project.name}
                </Badge>
              ) : null}
            </Flex>
            <Text size="1" color="gray">
              {formatDate(prototype.createdAt)}
            </Text>
          </Flex>

          <Flex align="center" gap="1" className="rounded-full border border-stone-200 bg-stone-50 p-1 dark:border-stone-800 dark:bg-stone-900">
            {(Object.keys(WIDTHS) as Width[]).map((key) => {
              const { label, Icon } = WIDTHS[key];
              const active = key === width;
              return (
                <Tooltip key={key} content={label}>
                  <button
                    type="button"
                    onClick={() => setWidth(key)}
                    aria-pressed={active}
                    aria-label={label}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                      active
                        ? "bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-white"
                        : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200",
                    )}
                  >
                    <Icon size={16} weight={active ? "fill" : "regular"} />
                  </button>
                </Tooltip>
              );
            })}
          </Flex>

          <Tooltip content={copied ? "Copied!" : "Copy permalink"}>
            <IconButton size="2" variant="soft" color="gray" onClick={handleCopy}>
              {copied ? <CheckIcon size={16} /> : <LinkIcon size={16} />}
            </IconButton>
          </Tooltip>

          <Tooltip content="Open raw prototype">
            <IconButton size="2" variant="soft" color="gray" asChild>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                <ArrowSquareOutIcon size={16} />
              </a>
            </IconButton>
          </Tooltip>
        </Flex>
      </header>

      <main className="flex-1 bg-stone-100 p-4 dark:bg-stone-900">
        <div
          className="mx-auto h-[calc(100vh-140px)] overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-[max-width] dark:border-stone-800 dark:bg-stone-950"
          style={{ maxWidth: target.px ? `${target.px}px` : "100%" }}
        >
          <iframe
            key={prototype.slug}
            src={fileUrl}
            title={prototype.title}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

        {(prototype.description || prototype.notes || prototype.tags.length > 0) ? (
          <section className="mx-auto mt-6 max-w-3xl rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950">
            {prototype.description ? (
              <Text as="p" size="2" className="mb-3">
                {prototype.description}
              </Text>
            ) : null}
            {prototype.notes ? (
              <Text as="p" size="2" color="gray" className="mb-3 italic">
                {prototype.notes}
              </Text>
            ) : null}
            {prototype.tags.length > 0 ? (
              <Flex gap="1" wrap="wrap">
                {prototype.tags.map((tag) => (
                  <Badge key={tag} color="teal" variant="soft" radius="full">
                    #{tag}
                  </Badge>
                ))}
              </Flex>
            ) : null}
          </section>
        ) : null}
      </main>
    </Flex>
  );
}
