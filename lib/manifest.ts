import fs from "node:fs";
import path from "node:path";
import { ManifestSchema, type Manifest, type Prototype, type Project } from "./types";

const MANIFEST_PATH = path.join(process.cwd(), "public", "prototypes", "manifest.json");
const IS_PROD = process.env.NODE_ENV === "production";

let cached: { manifest: Manifest; bySlug: Map<string, Prototype>; byProjectId: Map<string, Project> } | null = null;

function load() {
  if (IS_PROD && cached) return cached;
  const raw = fs.readFileSync(MANIFEST_PATH, "utf-8");
  const result = ManifestSchema.safeParse(JSON.parse(raw));
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid manifest.json:\n${issues}`);
  }
  const manifest = result.data;
  cached = {
    manifest,
    bySlug: new Map(manifest.prototypes.map((p) => [p.slug, p])),
    byProjectId: new Map(manifest.projects.map((p) => [p.id, p])),
  };
  return cached;
}

export function loadManifest(): Manifest {
  return load().manifest;
}

export function getPrototypes(): Prototype[] {
  return [...load().manifest.prototypes].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function getPrototype(slug: string): Prototype | undefined {
  return load().bySlug.get(slug);
}

export function getProject(id: string | undefined): Project | undefined {
  return id ? load().byProjectId.get(id) : undefined;
}
