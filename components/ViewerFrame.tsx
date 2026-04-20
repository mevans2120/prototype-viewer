"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Badge, Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import {
  ArrowLeftIcon,
  ArrowSquareOutIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  DesktopIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  LinkIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Project, Prototype, VariantGroup } from "@/lib/types";
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

  const groups: VariantGroup[] = prototype.variantGroups ?? [];
  const captionGroups = groups.filter((g) => g.display === "caption");
  const tabGroups = groups.filter((g) => g.display === "tabs");

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    for (const g of groups) out[g.id] = g.options[0]!.id;
    return out;
  });

  useEffect(() => {
    if (typeof window === "undefined" || groups.length === 0) return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const params = new URLSearchParams(hash);
    setSelected((prev) => {
      const next = { ...prev };
      for (const g of groups) {
        const v = params.get(g.urlParam);
        if (v && g.options.some((o) => o.id === v)) next[g.id] = v;
      }
      return next;
    });
    // groups is stable per mounted prototype
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hashString = useMemo(() => {
    const parts: string[] = [];
    for (const g of groups) {
      if (g.options.length <= 1) continue;
      parts.push(`${g.urlParam}=${encodeURIComponent(selected[g.id] ?? "")}`);
    }
    return parts.join("&");
  }, [groups, selected]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const current = window.location.hash.replace(/^#/, "");
    if (current === hashString) return;
    const url = hashString
      ? `${window.location.pathname}#${hashString}`
      : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [hashString]);

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

  function cycleCaption(group: VariantGroup, direction: 1 | -1) {
    const idx = group.options.findIndex((o) => o.id === selected[group.id]);
    const nextIdx = (idx + direction + group.options.length) % group.options.length;
    setSelected((prev) => ({ ...prev, [group.id]: group.options[nextIdx]!.id }));
  }

  function selectTab(groupId: string, optionId: string) {
    setSelected((prev) => ({ ...prev, [groupId]: optionId }));
  }

  const target = WIDTHS[width];
  const iframeSrc = hashString ? `${fileUrl}#${hashString}` : fileUrl;
  const iframeKey = `${prototype.slug}-${hashString}`;
  const mainHeight = groups.length > 0 ? "h-[calc(100vh-184px)]" : "h-[calc(100vh-140px)]";

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
              <a href={iframeSrc} target="_blank" rel="noopener noreferrer">
                <ArrowSquareOutIcon size={16} />
              </a>
            </IconButton>
          </Tooltip>
        </Flex>
      </header>

      {groups.length > 0 ? (
        <div className="sticky top-[52px] z-10 border-b border-stone-200 bg-white/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
          <Flex align="center" gap="4" px="4" py="2" wrap="wrap">
            <Flex align="center" gap="5" className="min-w-0 flex-1" wrap="wrap">
              {captionGroups.map((g) => {
                const opt = g.options.find((o) => o.id === selected[g.id]) ?? g.options[0]!;
                const multi = g.options.length > 1;
                return (
                  <Flex align="center" gap="2" key={g.id} className="min-w-0">
                    {multi ? (
                      <IconButton
                        size="1"
                        variant="ghost"
                        color="gray"
                        onClick={() => cycleCaption(g, -1)}
                        aria-label={`Previous ${g.id}`}
                      >
                        <CaretLeftIcon size={14} />
                      </IconButton>
                    ) : null}
                    <Flex align="baseline" gap="2" className="min-w-0">
                      <Text
                        size="1"
                        weight="bold"
                        className="whitespace-nowrap uppercase tracking-wider text-stone-600 dark:text-stone-300"
                      >
                        {opt.label}
                      </Text>
                      {opt.description ? (
                        <Text size="1" color="gray" className="truncate">
                          {opt.description}
                        </Text>
                      ) : null}
                    </Flex>
                    {multi ? (
                      <IconButton
                        size="1"
                        variant="ghost"
                        color="gray"
                        onClick={() => cycleCaption(g, 1)}
                        aria-label={`Next ${g.id}`}
                      >
                        <CaretRightIcon size={14} />
                      </IconButton>
                    ) : null}
                  </Flex>
                );
              })}
            </Flex>

            <Flex gap="3" align="center">
              {tabGroups.map((g) => (
                <Flex
                  key={g.id}
                  className="rounded-full border border-stone-200 bg-stone-50 p-1 dark:border-stone-800 dark:bg-stone-900"
                  role="tablist"
                  aria-label={g.id}
                >
                  {g.options.map((o) => {
                    const active = selected[g.id] === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => selectTab(g.id, o.id)}
                        className={cn(
                          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                          active
                            ? "bg-stone-900 text-white shadow-sm dark:bg-stone-100 dark:text-stone-900"
                            : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100",
                        )}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </Flex>
              ))}
            </Flex>
          </Flex>
        </div>
      ) : null}

      <main className="flex-1 bg-stone-100 p-4 dark:bg-stone-900">
        <div
          className={cn(
            "mx-auto overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-[max-width] dark:border-stone-800 dark:bg-stone-950",
            mainHeight,
          )}
          style={{ maxWidth: target.px ? `${target.px}px` : "100%" }}
        >
          <iframe
            key={iframeKey}
            src={iframeSrc}
            title={prototype.title}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </main>
    </Flex>
  );
}
