import { z } from "zod";

export const PrototypeSourceSchema = z.enum([
  "claude-artifact",
  "figma",
  "hand-coded",
  "other",
]);

export const ProjectSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/, "lowercase kebab-case only"),
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "expect #rrggbb hex"),
});

export const VariantOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional(),
});

export const VariantGroupSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/, "lowercase kebab-case only"),
  display: z.enum(["caption", "tabs"]),
  urlParam: z.string().min(1),
  options: z.array(VariantOptionSchema).min(1),
});

export const PrototypeSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "lowercase kebab-case only"),
  title: z.string().min(1),
  description: z.string().default(""),
  file: z.string().min(1),
  thumbnail: z.string().optional(),
  project: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expect YYYY-MM-DD"),
  source: PrototypeSourceSchema.optional(),
  notes: z.string().optional(),
  variantGroups: z.array(VariantGroupSchema).optional(),
});

export const ManifestSchema = z.object({
  version: z.literal(1),
  prototypes: z.array(PrototypeSchema),
  projects: z.array(ProjectSchema).default([]),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Prototype = z.infer<typeof PrototypeSchema>;
export type Manifest = z.infer<typeof ManifestSchema>;
export type PrototypeSource = z.infer<typeof PrototypeSourceSchema>;
export type VariantGroup = z.infer<typeof VariantGroupSchema>;
export type VariantOption = z.infer<typeof VariantOptionSchema>;
