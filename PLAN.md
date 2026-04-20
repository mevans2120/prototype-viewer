# Prototype Viewer — Plan

**Status:** Draft, awaiting approval
**Date:** 2026-04-18
**Owner:** Michael Evans

## 1. Goal

A simple, extensible gallery for single-file HTML prototypes (Claude artifacts, Figma exports, hand-rolled concepts). Host on Vercel. Drop a new file + metadata → push → it shows up.

## 2. Primary use cases

- Share a batch of concept prototypes with stakeholders via one link.
- Keep a browsable archive of past prototypes per project/client.
- Quick side-by-side review of variations (e.g. "ProSocial Chat Concepts v1 / v2").

## 3. Non-goals (first version)

- No auth. Public, but **excluded from search indexing** via `robots.txt` + `<meta name="robots" content="noindex,nofollow">` on all pages.
- No WYSIWYG upload UI. Git-based workflow only.
- No edit-in-place — prototypes are immutable artifacts.
- No server — static export, no API routes.
- No analytics, no comments, no version diffing.
- No manual thumbnails in v1 — gradient placeholders derived from project color.

## 4. Stack

- **Next.js 15 App Router**, TypeScript strict, static export (`output: 'export'`).
- **Tailwind CSS** + `cn()` utility. Dark mode variants.
- **Radix UI Themes** for components (intentionally different from other projects — no shadcn, no Headless UI this time).
- **Phosphor Icons** for iconography.
- **Zod** for validating `manifest.json`.
- **Zustand** only if we add client-side filter/search state.
- Deployed to **Vercel** via GitHub integration. Static only — no server functions needed.

### Why Next.js over pure static HTML

Future extension points (search, tag filter, per-project grouping, OG image generation, preview thumbnails) come free. Static export keeps Vercel bill at zero.

## 5. Repo structure

```
prototype-viewer/
├── PLAN.md                       # this file
├── README.md                     # quick start + how to add a prototype
├── next.config.ts                # output: 'export', images unoptimized
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── app/
│   ├── layout.tsx                # Radix Themes provider, global styles
│   ├── page.tsx                  # gallery index
│   ├── p/[slug]/page.tsx         # per-prototype viewer (iframe)
│   └── not-found.tsx
├── components/
│   ├── PrototypeCard.tsx
│   ├── TagFilter.tsx
│   ├── ViewerFrame.tsx           # iframe + toolbar (open in new tab, copy link, desktop/mobile widths)
│   └── EmptyState.tsx
├── lib/
│   ├── manifest.ts               # loads + validates manifest.json
│   ├── types.ts                  # Prototype, Project, Tag types
│   └── utils.ts                  # cn(), date formatting
├── public/
│   └── prototypes/
│       ├── manifest.json         # source of truth — see §6
│       ├── creator-team-chat.html
│       ├── prosocial-chat-concepts.html
│       └── thumbnails/
│           └── creator-team-chat.png
└── docs/
    └── adding-a-prototype.md     # step-by-step workflow
```

## 6. Metadata schema (`public/prototypes/manifest.json`)

Single top-level manifest. Simpler than per-file sidecars for small-to-medium collections (<100 items). If it gets unwieldy, swap to per-file `.meta.json` later — schema stays identical.

```jsonc
{
  "version": 1,
  "prototypes": [
    {
      "slug": "creator-team-chat",              // URL-safe id, stable
      "title": "Creator Dashboard — Team Chat",
      "description": "Concept for in-app team chat inside the Creator dashboard.",
      "file": "creator-team-chat.html",         // relative to /public/prototypes/
      "thumbnail": "thumbnails/creator-team-chat.png",  // optional
      "project": "creator",                     // optional — groups in UI
      "tags": ["chat", "dashboard", "concept"],
      "createdAt": "2026-04-15",
      "source": "claude-artifact",              // optional — claude-artifact | figma | hand-coded | other
      "notes": "Warm palette, Georgia display type. V1."
    }
  ],
  "projects": [
    { "id": "creator",   "name": "Creator",   "color": "#0d9488" },
    { "id": "prosocial", "name": "ProSocial", "color": "#d97706" }
  ]
}
```

Validated with Zod at build time. Invalid manifest → build fails loudly.

## 7. UX — gallery index (`/`)

- **Header:** site title, short tagline, link to README / "How to add a prototype".
- **Controls row:** project filter (chips), tag filter (multi-select), search (filters by title/description/tags).
- **Card grid:** responsive (1/2/3 cols). Each card shows thumbnail (or generated placeholder), title, project badge, tag chips, created date. Click → `/p/[slug]`.
- **Empty state:** friendly message + link to docs when manifest is empty.

Sort: newest-first by `createdAt`, with a toggle for A→Z.

## 8. UX — viewer (`/p/[slug]`)

- **Top toolbar (sticky, 40–48px):**
  - Back to gallery (← icon)
  - Title + project badge
  - Width selector: **Desktop (100%) / Tablet (768px) / Mobile (390px)** — resizes iframe container
  - "Open raw" (opens `.html` in new tab, full-screen, no frame)
  - "Copy link" (permalink to this prototype)
- **Main:** full-viewport `<iframe>` with `sandbox="allow-scripts allow-same-origin"` (these artifacts need scripts to render; same-origin is fine since we serve them ourselves). No `allow-top-navigation` — prototype can't escape.
- **Below iframe:** description, tags, notes, created date. Collapsed by default on mobile.

## 9. Workflow — adding a prototype

1. Copy the HTML file into `public/prototypes/`. Rename to `kebab-case.html`.
2. (Optional) Add a 1200×800 PNG thumbnail to `public/prototypes/thumbnails/`. If absent, the card shows a generated gradient placeholder based on the project color.
3. Append an entry to `manifest.json`.
4. `npm run dev` to preview locally. `npm run build` to verify Zod validation passes.
5. `git add . && git commit -m "feat: add <slug> prototype" && git push`.
6. Vercel auto-deploys. New prototype live in ~60 seconds.

A short `scripts/add-prototype.ts` helper (interactive CLI that copies the file, prompts for metadata, updates manifest) is a nice-to-have — not in v1.

## 10. Deployment

- GitHub repo → Vercel project, auto-deploy on push to `main`.
- Build command: `next build`. Output dir: `out/`.
- Preview deployments on every branch — useful for sharing WIP gallery updates.
- Custom domain: TBD (suggest `prototypes.mevans.dev` or similar).
- No environment variables required for v1.

### Search engine exclusion

- `public/robots.txt`:
  ```
  User-agent: *
  Disallow: /
  ```
- `<meta name="robots" content="noindex,nofollow">` in `app/layout.tsx` as belt-and-suspenders (some crawlers ignore robots.txt).
- No sitemap.xml generated.

## 11. Extension points (not in v1, but easy to add later)

- **Auth** — Vercel Password Protection (one env var) or Clerk/Auth.js if per-user access is needed.
- **Auto-thumbnails** — GitHub Action that runs Playwright on each new prototype and commits a screenshot back.
- **OG images** — dynamic Open Graph image per prototype for nicer link previews in Slack.
- **Version history** — stack multiple files under one `slug` (v1, v2, v3) with a dropdown in the viewer.
- **Client-specific sub-galleries** — `/clients/[id]` route, driven by the `project` field.
- **Comments / reactions** — Giscus (GitHub Discussions) or a dedicated service.
- **CLI helper** (`scripts/add-prototype.ts`) for one-command imports.

## 12. Decisions locked in (2026-04-18)

1. ~~Public or private?~~ → **Public, but noindex.** robots.txt + meta robots tag. No auth.
2. Custom domain? → **Still open.** Default to `*.vercel.app` until you pick one.
3. ~~Thumbnails in v1?~~ → **Gradient placeholders only.** No manual PNGs.
4. CLI helper script? → **Still open.** Defaulting to "defer" unless you say otherwise.
5. ~~Seed with the two Downloads files?~~ → **Yes.** Import both as part of initial setup.

## 13. Rough implementation milestones

Estimates assume I do the work; each is independently shippable.

1. **Scaffold** (~30 min) — `create-next-app`, Tailwind, Radix Themes, Phosphor, Zod, tsconfig strict, Vercel-ready `next.config.ts`.
2. **Manifest + types** (~20 min) — Zod schema, loader, types, fixtures for testing.
3. **Index page** (~45 min) — card grid, project/tag filters, search, empty state.
4. **Viewer page** (~45 min) — iframe frame, width selector, toolbar, permalink.
5. **Seed prototypes** (~15 min) — import the two Downloads files, write manifest entries.
6. **Docs + deploy** (~20 min) — README, `docs/adding-a-prototype.md`, Vercel setup.

Total: ~3 hours of focused work for v1.

## 14. What I need from you to start

Answers to §12 (especially #1 and #3). Once those are settled, I'll wait for your go-ahead before writing any code.
