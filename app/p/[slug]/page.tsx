import { notFound } from "next/navigation";
import { ViewerFrame } from "@/components/ViewerFrame";
import { getPrototype, getPrototypeSlugs, getProject } from "@/lib/manifest";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getPrototypeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const prototype = await getPrototype(slug);
  if (!prototype) return { title: "Not found" };
  return {
    title: `${prototype.title} — Prototype Viewer`,
    description: prototype.description,
    robots: { index: false, follow: false },
  };
}

export default async function PrototypePage({ params }: { params: Params }) {
  const { slug } = await params;
  const prototype = await getPrototype(slug);
  if (!prototype) notFound();
  const project = getProject(prototype.project);
  return <ViewerFrame prototype={prototype} project={project} />;
}
