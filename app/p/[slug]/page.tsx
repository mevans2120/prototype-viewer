import { notFound } from "next/navigation";
import { ViewerFrame } from "@/components/ViewerFrame";
import { getPrototype, getPrototypes, getProject } from "@/lib/manifest";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getPrototypes().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const prototype = getPrototype(slug);
  if (!prototype) return { title: "Not found" };
  return {
    title: `${prototype.title} — Prototype Viewer`,
    description: prototype.description,
    robots: { index: false, follow: false },
  };
}

export default async function PrototypePage({ params }: { params: Params }) {
  const { slug } = await params;
  const prototype = getPrototype(slug);
  if (!prototype) notFound();
  const project = getProject(prototype.project);
  return <ViewerFrame prototype={prototype} project={project} />;
}
