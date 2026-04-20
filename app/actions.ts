"use server";

import { revalidatePath } from "next/cache";
import { setOverride, resetOverride, type MetadataOverride } from "@/lib/overrides";

export async function saveMetadata(slug: string, fields: MetadataOverride) {
  await setOverride(slug, fields);
  revalidatePath("/");
  revalidatePath(`/p/${slug}`);
}

export async function resetMetadata(slug: string) {
  await resetOverride(slug);
  revalidatePath("/");
  revalidatePath(`/p/${slug}`);
}
