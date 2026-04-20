# ProSocial — Web App UI Kit

Hi-fi recreation of the volunteer web experience from `oestech/prosocial-banking-poc`. One interactive index.html walks through the full flow: landing → sign up → session (task feed + leaderboard + bottom bar) → all done.

## Files

- `index.html` — demo entry. Open this.
- `kit.css` — all component styles (imports `../../colors_and_type.css`)
- `Icons.jsx` — `LogoMark`, `PlatformBadge` (TikTok/IG/YouTube/X/Facebook), action icons (heart/comment/share/watch), CheckIcon
- `Nav.jsx` — `GlobalNav`, `PointsPill`, `BottomBar`
- `Landing.jsx` — `Landing`, `StepItem` (the hero + "How it works" right rail)
- `AuthModal.jsx` — two-step email magic-link modal (`signin` / `signup`)
- `TaskCard.jsx` — the core feed unit. States: `default → engaged → complete`. Progressive tier colors (info → blue → gold) as you complete actions
- `Leaderboard.jsx` — `Leaderboard`, `ActivityTicker`
- `App.jsx` — orchestrator with seeded posts/leaderboard/ticker, state machine

## What's covered

- Landing page (desktop): navy hero + 380px tinted "How it works" rail, with Get Started / I already have an account CTAs
- Auth modals: Join the team (signup) + Welcome back (signin), both with magic-link "Check your email" step
- Session view: 70/30 split feed + sticky sidebar, task feed, leaderboard with current-user highlight, live activity ticker
- Task card: all three states, dismiss button, tier-colored action buttons (dashed default → filled semantic), action-count indicators, completion check
- Points pill, sticky bottom bar, session meta (live dot + progress)

## What's excluded

- Admin surfaces (`/admin/*`). The kit scopes to the volunteer experience only.
- Real auth — magic-link flow is mocked; clicking "Send" auto-signs you in after ~1.6s to demo the post-auth state.
- Polling / realtime — leaderboard and ticker are seeded, not live.
- Profile dropdown and full mobile layout — desktop-first.

## Interactivity

1. Land on hero → **Get Started** opens signup modal → enter anything → auto-signs in → lands on session
2. In session, click any task card → it enters "engaged" state, showing the action buttons
3. Click "I Liked / Commented / Shared / Watched" to mark actions — buttons fill with the progressive tier color (1 action = info cyan, 2 = blue, 3+ = gold)
4. Complete all required actions → card goes to "complete" state with "All done!" message; confetti is a production-only touch (omitted here)
5. Points accumulate in both the nav pill and bottom bar; leaderboard re-sorts live as "you" climb
6. Dismiss (×) a card to remove it from the feed
