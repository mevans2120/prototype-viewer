"use client";

import { useMemo, useState } from "react";
import { Badge, Box, Flex, Grid, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import type { Project, Prototype } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PrototypeCard } from "./PrototypeCard";
import { EmptyState } from "./EmptyState";

type Props = {
  prototypes: Prototype[];
  projects: Project[];
  tags: string[];
};

export function GalleryControls({ prototypes, projects, tags }: Props) {
  const [query, setQuery] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const projectById = useMemo(
    () => new Map(projects.map((p) => [p.id, p])),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prototypes.filter((p) => {
      if (projectId && p.project !== projectId) return false;
      if (activeTags.size > 0 && !p.tags.some((t) => activeTags.has(t))) return false;
      if (q) {
        const haystack = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [prototypes, query, projectId, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="3">
        <Box maxWidth="420px">
          <TextField.Root
            size="3"
            placeholder="Search title, description, or tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon size={16} />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        {projects.length > 0 ? (
          <Flex gap="2" wrap="wrap" align="center">
            <FilterChip
              active={projectId === null}
              onClick={() => setProjectId(null)}
            >
              All projects
            </FilterChip>
            {projects.map((proj) => (
              <FilterChip
                key={proj.id}
                active={projectId === proj.id}
                onClick={() => setProjectId(proj.id)}
                dotColor={proj.color}
              >
                {proj.name}
              </FilterChip>
            ))}
          </Flex>
        ) : null}

        {tags.length > 0 ? (
          <Flex gap="2" wrap="wrap" align="center">
            {tags.map((tag) => (
              <FilterChip
                key={tag}
                active={activeTags.has(tag)}
                onClick={() => toggleTag(tag)}
                small
              >
                #{tag}
              </FilterChip>
            ))}
          </Flex>
        ) : null}
      </Flex>

      {filtered.length === 0 ? (
        <EmptyState hasPrototypes={prototypes.length > 0} />
      ) : (
        <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
          {filtered.map((prototype) => (
            <PrototypeCard
              key={prototype.slug}
              prototype={prototype}
              project={projectById.get(prototype.project ?? "")}
            />
          ))}
        </Grid>
      )}
    </Flex>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  dotColor,
  small,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dotColor?: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors",
        small ? "text-xs" : "text-sm",
        active
          ? "border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500"
          : "border-stone-300 bg-white text-stone-700 hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-600",
      )}
    >
      {dotColor ? (
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: dotColor }}
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}
