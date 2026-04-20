# Prototype Viewer

A private gallery for single-file HTML prototypes (Claude artifacts, Figma exports, hand-coded concepts). Drop a file, add a manifest entry, push. Vercel rebuilds.

Public URL is excluded from search engines via `robots.txt` and `noindex` meta.

## Stack

- Next.js 15 (App Router, static export)
- TypeScript strict
- Tailwind CSS + Radix UI Themes
- Phosphor Icons
- Zod for manifest validation

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produces static site in out/
npm run typecheck
```

## Adding a prototype

See `docs/adding-a-prototype.md`.

## Deploy

Push to `main`. Vercel builds and deploys automatically. Build command `next build`, output directory `out/`.

## Project layout

```
app/                       # Next.js App Router
  layout.tsx
  page.tsx                 # gallery index
  p/[slug]/page.tsx        # viewer
components/                # UI components
lib/                       # manifest loader, types, utils
public/prototypes/
  manifest.json            # source of truth
  <slug>.html              # prototype files
```

See `PLAN.md` for the full design document.
