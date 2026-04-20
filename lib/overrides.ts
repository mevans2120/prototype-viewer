import "server-only";
import { del, list, put } from "@vercel/blob";

const OVERRIDES_PREFIX = "metadata-overrides";

export type MetadataOverride = { title?: string; description?: string };
export type OverridesMap = Record<string, MetadataOverride>;

async function listOverrides() {
  const { blobs } = await list({ prefix: OVERRIDES_PREFIX });
  return blobs;
}

export async function getOverrides(): Promise<OverridesMap> {
  try {
    const blobs = await listOverrides();
    if (blobs.length === 0) return {};
    const latest = blobs.reduce((a, b) => (a.uploadedAt > b.uploadedAt ? a : b));
    const res = await fetch(latest.url, { cache: "no-store" });
    if (!res.ok) return {};
    return (await res.json()) as OverridesMap;
  } catch {
    return {};
  }
}

async function writeOverrides(map: OverridesMap) {
  const existing = await listOverrides();
  await put(`${OVERRIDES_PREFIX}.json`, JSON.stringify(map), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });
  if (existing.length > 0) {
    await del(existing.map((b) => b.url)).catch(() => {});
  }
}

export async function setOverride(slug: string, fields: MetadataOverride) {
  const current = await getOverrides();
  const cleaned: MetadataOverride = {};
  if (fields.title?.trim()) cleaned.title = fields.title.trim();
  if (fields.description?.trim()) cleaned.description = fields.description.trim();

  if (Object.keys(cleaned).length === 0) {
    delete current[slug];
  } else {
    current[slug] = cleaned;
  }
  await writeOverrides(current);
}

export async function resetOverride(slug: string) {
  const current = await getOverrides();
  if (!(slug in current)) return;
  delete current[slug];
  await writeOverrides(current);
}
