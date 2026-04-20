import { notFound } from "next/navigation";
import { ViewerFrame } from "@/components/ViewerFrame";
import { getPrototype, getPrototypes, getProject } from "@/lib/manifest";

export function generateStaticParams() {
  return getPrototypes().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const prototype = getPrototype(params.slug);
  if (!prototype) return { title: "Not found" };
  return {
    title: `${prototype.title} — Prototype Viewer`,
    description: prototype.description,
    robots: { index: false, follow: false },
  };
}

export default function PrototypePage({ params }: { params: { slug: string } }) {
  const prototype = getPrototype(params.slug);
  if (!prototype) notFound();
  const project = getProject(prototype.project);
  return <ViewerFrame prototype={prototype} project={project} />;
}
