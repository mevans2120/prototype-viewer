# ProSocial Design System

A design system for **ProSocial** — a volunteer social amplification app where organizers queue up political / issue social posts and volunteers earn points by liking, commenting, watching, and sharing them. Primary pilot partner is **Swing Left**; the Iowa deployment is a C3 charitable entity, so content and AI prompts avoid partisan framing.

The product is a single **Next.js web app** (App Router, Tailwind v4, Supabase Auth, Prisma/Postgres). There is no native app, no marketing site, no separate admin product — the admin surfaces live as `/admin/*` routes within the same codebase.

## Sources

- **GitHub (private):** `oestech/prosocial-banking-poc` — branch `staging`
  - Tokens: `src/app/globals.css`
  - Brand logo: `src/app/icon.svg`
  - Fonts via Next/Font: Archivo (display/UI), Source Sans 3 (body), Newsreader (editorial)
  - Core components: `src/components/{TaskCard,Leaderboard,LogoMark,Button,AuthModal,GlobalNav,HeroCTA,NavPointsPill,PlatformIcon,ActionIcons}.tsx`
  - Product copy: `src/components/LandingPage.tsx`, `src/lib/constants.ts`
- **Live environments:** prosocial-poc.vercel.app (prod), prosocial-staging.vercel.app, prosocial-preview.vercel.app

## Products

One product → one UI kit:

- **`ui_kits/web-app/`** — the volunteer web experience: landing → auth → session (task feed + leaderboard + bottom bar). Admin surfaces exist in the codebase but are excluded from this kit.

## Content fundamentals

**Tone.** Warm, direct, collective. Addresses the volunteer as part of a team, not a lone user. Short sentences, plain words, zero jargon. Low-stakes even when the mission is political — reads like a friendly organizer, not a platform.

**Voice rules.**
- **"We" and "you", rarely "I".** Product speaks as the team to the volunteer.
- **Sentence case.** Titles are sentence case: "Join the team", "Check your email", "Mark what you did", "How it works". No Title Case Buttons.
- **Action verbs, not labels.** CTAs start with verbs: *Get Started*, *Send sign-in link*, *Join Session*, *I Liked*, *I Commented*, *I Shared*, *I Watched*. The "I" framing on action confirmations is load-bearing — it turns logging into a statement of participation.
- **Numbers + units together.** "47 pts", "14 posts ready", "+1pt", "All done!" — no bare numbers floating.
- **Partisan-neutral.** No "left", "right", "conservative", "liberal" in product copy. Messaging stays issue-focused ("voices that matter", "help us engage").
- **No emoji in product chrome.** The only exceptions are the top-3 leaderboard medals (🥇🥈🥉) — everything else is an inline SVG icon or unicode dingbat.

**Headline patterns.**
- Hero: "Amplify the voices that matter" — verb + object + purpose.
- Section labels: eyebrows in ALL CAPS with +1.5px tracking ("HOW IT WORKS", "LEADERBOARD", "PROGRESS").
- Empty states are gentle nudges, not errors: *"Start engaging with posts below"*, *"No active session right now. Your admin will start one soon — check back or watch for a notification."*
- Modals lead with a short command or question: *"Join the team"*, *"Welcome back"*, *"Check your email"*.

**Microcopy examples.**
- Confirmation: *"All done! You amplified this post."*
- Engaged state prompt: *"Mark what you did"*
- Reset link: *"Didn't engage"*
- Auth secondary: *"I already have an account"*
- Error tone: Supabase auth errors bubble through unchanged — product doesn't dress them up.

## Visual foundations

**Palette.** A single navy hero color (`#0A2852`) carries almost all brand weight — used for text, logo mark, primary buttons, avatar initials, leaderboard scores, the thin left-border on the current user row. Plum (`#5E3D82`) is a quiet secondary, used sparingly as `--color-accent`. Semantic colors (`info` cyan, `green`, `blue`, `gold`) also serve as **engagement tiers**: as a volunteer completes 1/2/all actions on a post, its checkmarks escalate Info → Blue → Gold. A tint scale (`*-light` pairs: `#E0F7FF`, `#EFF6FF`, `#FFFBEB`, `#FEF2F2`) provides low-contrast backgrounds for state pills.

**Type.** Three families, very clearly partitioned:
- **Archivo** (400–800) for every piece of UI chrome — nav, buttons, headlines, eyebrows, avatar initials, action button labels, leaderboard point totals. This is what the product sounds like.
- **Source Sans 3** (400–600) for body copy — hero subtitles, content previews, descriptions. Sits calm next to Archivo's warmth.
- **Newsreader** (400, italic) is loaded but used extremely rarely — an editorial accent for quotes. Flag it when you reach for it.

Text uses a **5-step navy ramp** (primary → secondary → tertiary → muted → dim) rather than gray; even the dimmest meta text is still tinted navy (`#7D93AB`), which keeps the product feeling cohesive.

**Backgrounds.** Flat. `#F5F7FA` page / `#FFFFFF` cards / `#E8F4FC` subtle tint zones. **No gradients**, except one: the Instagram platform badge (orange → pink → plum), which is quoted from IG's own brand. No hand-drawn illustrations, no textures, no patterns, no imagery in the chrome. Post thumbnails (content) are the only imagery, and they're content not decoration.

**Corner radii.** `xs 4 / sm 6 / md 10 / lg 14 / xl 20` px. Small buttons use 6, inputs use 10, cards use 10–12, action buttons use 10, modals use 20, avatar circles are 999. Corners are consistently friendly-but-crisp — never pill-by-default.

**Cards.** White fill, 1px `#C8DDF0` border, 10–12px radius, tiny 2-layer shadow (`0 1px 2px rgba(10,40,82,0.04)`). On hover: `shadow-card-hover` (`0 4px 20px rgba(10,40,82,0.06)`) — a very soft lift, no scale, no color shift. Critical: cards **never** use colored left-border accents; the only left-border in the system is the 3px navy stripe on the current user's leaderboard row.

**Shadows.** Four named tiers keyed to purpose, all using navy-tinted alphas (never neutral gray): `brand-glow` (sticky nav/pills), `card-hover` (hover lift), `elevated` (popovers/dropdowns), `dialog` (modals). Dark mode swaps to near-black alphas.

**Borders.** `#C8DDF0` default on light surfaces, `#B8CEE0` for slightly stronger separation. Dashed borders appear exactly in one place: the default state of action buttons ("I Liked" before you tap), signaling "intent, not yet committed." Once tapped, they become solid + filled with the engagement tier color.

**Hover / press.**
- **Hover:** slight `opacity-80` or swap to `brand-dark` (#071D3E) for primary, subtle background tint (`bg-surface-subtle`) for secondary. Cards raise with soft shadow.
- **Press:** `active:bg-surface-subtle` on pressable cards. No scale transforms. No ripple.
- **Action buttons** have a bespoke interaction: on hover they weight up from `font-medium` to `font-semibold` (a half-step), which feels like the button is "leaning in" before commit.

**Animation.** Framer Motion + canvas-confetti are in the stack but used restrainedly. The confetti burst fires only when you hit "All done" on a post. Keyframes defined: `pulse-dot`, `nudge-glow`, `ticker` (for the live activity ticker). Transitions are 150ms ease — mostly color, opacity, box-shadow. No bounces, no springs in chrome.

**Transparency / blur.** Minimal. Modal overlay is `rgba(10,40,82,0.4)` on light / `rgba(0,0,0,0.6)` on dark. No backdrop blur. Tint-only backgrounds use 3–10% alpha of the brand color (`bg-brand/5`, `bg-brand/8`, `bg-brand/10`).

**Iconography vibe.** Feather-stroke SVG — 2px stroke, rounded caps/joins, 24×24 viewBox. Monochromatic via `currentColor`. See ICONOGRAPHY below.

**Imagery.** User-submitted social content is the only imagery; warmth / tone / b&w is dictated by whatever TikTok/IG/YouTube is serving. The brand itself uses no stock imagery.

**Layout rules.**
- Max content width: `1400px`, centered. Nav is full-bleed on a white raised surface.
- Session view is a **70/30 split** on desktop (feed left, sticky sidebar right, tinted `#E8F4FC` bleed on the right zone). Collapses to single column + bottom sheet on mobile.
- Landing page is split: CTA centered on main surface + a narrow right rail (`380px`) holding a tinted "How it works" panel.
- Sticky bottom bar ≥ mobile — holds points total and session CTA, with `env(safe-area-inset-bottom)` respected.

## Iconography

- **No icon font.** No Lucide / Heroicons / Feather dependency in the codebase. All icons are **hand-rolled inline SVGs** following Feather's visual conventions: 24×24 viewBox, 2px stroke, round caps/joins, `currentColor` fill.
- **Action icons** (`src/components/ActionIcons.tsx`): heart (like), chat bubble (comment), up-arrow-tray (share), eye (watch). Rendered at 14–20px. Color comes from tier state, not the icon itself.
- **Platform icons** (`src/components/PlatformIcon.tsx`): filled SVG glyphs quoted from each platform's brand (TikTok, Instagram, YouTube, X/Twitter, Facebook). 18px default. Each uses its brand color via a class from `PLATFORM_ICON_COLORS`.
- **Logo mark** (`src/components/LogoMark.tsx`): lightning bolt on navy rounded square. The bolt is the same `path` used across the app for anything amplification-adjacent.
- **Decorative glyphs.** Medals (🥇🥈🥉) for top-3 leaderboard only. No other unicode/emoji in chrome.
- **Checkmarks / close** use inline Feather-style polyline SVGs, never font glyphs.

All UI kit icons copied here should follow the same 2px-stroke Feather aesthetic. If substituting from a CDN, match Feather's proportions — **do not** mix in filled Heroicons.

## Files in this system

| Path | What it is |
|------|------------|
| `README.md` | This file |
| `SKILL.md` | Claude Code compatible skill entry point |
| `colors_and_type.css` | All color + type tokens as CSS vars, with dark theme |
| `assets/logo.svg` | Brand mark (lightning bolt on navy rounded square) |
| `preview/*.html` | Per-token cards rendered in the Design System tab |
| `ui_kits/web-app/` | Hi-fi recreation of the volunteer web experience |

## Caveats & font substitutions

- **Fonts:** Product loads Archivo / Source Sans 3 / Newsreader from Google Fonts at runtime. This design system does not ship local `.ttf` files — previews and the UI kit load the same three families from Google Fonts via `@import` in CSS. If you need offline or print-fidelity artifacts, drop the TTFs into `fonts/` and flag.
- **Icons:** The codebase hand-rolls its own SVGs rather than using a set. The UI kit uses the same approach; if you need to extend, stay inside the 2px-stroke Feather aesthetic.
- **Admin surfaces** are excluded from the UI kit — the product defines a lot of admin UI (`/admin/groups`, `/admin/creators`, `/admin/add-content`, etc.) that isn't core to the volunteer story this system is meant to support.
