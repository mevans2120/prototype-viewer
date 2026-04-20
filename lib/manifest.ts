import fs from "node:fs";
import path from "node:path";
import { ManifestSchema, type Manifest, type Prototype, type Project } from "./types";

const MANIFEST_PATH = path.join(process.cwd(), "public", "prototypes", "manifest.json");

export function loadManifest(): Manifest {
  const raw = fs.readFileSync(MANIFEST_PATH, "utf-8");
  const parsed = JSON.parse(raw);
  const result = ManifestSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid manifest.json:\n${issues}`);
  }
  return result.data;
}

export function getPrototypes(): Prototype[] {
  return [...loadManifest().prototypes].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function getPrototype(slug: string): Prototype | undefined {
  return loadManifest().prototypes.find((p) => p.slug === slug);
}

export function getProjects(): Project[] {
  return loadManifest().projects;
}

export function getProject(id: string | undefined): Project | undefined {
  if (!id) return undefined;
  return loadManifest().projects.find((p) => p.id === id);
}

