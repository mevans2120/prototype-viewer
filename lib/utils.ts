import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function gradientFor(seed: string, baseColor?: string): string {
  const hue = hashHue(seed);
  const base = baseColor ?? `hsl(${hue}, 60%, 45%)`;
  const accent = `hsl(${(hue + 40) % 360}, 70%, 65%)`;
  return `linear-gradient(135deg, ${base} 0%, ${accent} 100%)`;
}

function hashHue(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}
