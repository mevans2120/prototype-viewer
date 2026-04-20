import { gradientFor } from "@/lib/utils";
import type { Project, Prototype } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrototypeThumb({
  prototype,
  project,
  className,
}: {
  prototype: Prototype;
  project?: Project;
  className?: string;
}) {
  const background = gradientFor(prototype.slug, project?.color);
  const initial = (project?.name ?? prototype.title).charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "relative aspect-[3/2] w-full overflow-hidden rounded-t-lg",
        className,
      )}
      style={{ background }}
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-6xl font-bold text-white/70 drop-shadow">
          {initial}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
