# Adding a prototype

Five steps, ~2 minutes.

## 1. Rename the file

Place the HTML file in `public/prototypes/`, renamed to kebab-case:

```
public/prototypes/my-new-concept.html
```

The filename (minus `.html`) becomes the URL slug: `/p/my-new-concept/`.

## 2. Add a manifest entry

Open `public/prototypes/manifest.json` and append an entry to `prototypes`:

```jsonc
{
  "slug": "my-new-concept",
  "title": "My New Concept",
  "description": "One-liner describing what this explores.",
  "file": "my-new-concept.html",
  "project": "creator",                 // must match a project id; optional
  "tags": ["chat", "concept"],          // optional
  "createdAt": "2026-04-18",            // YYYY-MM-DD
  "source": "claude-artifact",          // claude-artifact | figma | hand-coded | other
  "notes": "Optional longer notes."     // optional
}
```

### Fields

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | Lowercase kebab-case. Must be unique. Stable across updates. |
| `title` | yes | Display title on the card and viewer. |
| `description` | no | One-sentence summary shown on the card. |
| `file` | yes | Filename inside `public/prototypes/`. |
| `project` | no | References a project `id` from the `projects` array. |
| `tags` | no | Array of short lowercase tags. |
| `createdAt` | yes | ISO date (YYYY-MM-DD). Used for sort order. |
| `source` | no | `claude-artifact`, `figma`, `hand-coded`, or `other`. |
| `notes` | no | Longer notes shown on the viewer page. |
| `thumbnail` | no | Reserved for a future manual-thumbnails feature. Ignored in v1. |
| `variantGroups` | no | Declares sub-toolbar controls for multi-view prototypes. See "Hoisting internal nav" below. |

## 3. (Optional) Add a new project

If the prototype belongs to a project not yet listed, add it to the `projects` array:

```jsonc
{ "id": "new-project", "name": "New Project", "color": "#7c3aed" }
```

- `id` — lowercase kebab-case, referenced from `prototype.project`
- `color` — hex (`#rrggbb`), used for the gradient placeholder and project chip dot

## 4. Preview locally

```bash
npm run dev
```

Open `http://localhost:3000/`. If the manifest is invalid, the build fails with a list of specific errors.

## Hoisting internal navigation into the viewer chrome

Some prototypes (especially Claude artifacts) ship with their own navigation bar — a concept label, tab strip, or Lobby/Session toggle embedded in the HTML. The viewer can host those controls in its sub-toolbar instead so the iframe canvas stays clean.

### 1. Declare `variantGroups` in the manifest

```jsonc
"variantGroups": [
  {
    "id": "concept",
    "display": "caption",          // left-aligned text; prev/next arrows when >1 option
    "urlParam": "concept",          // key written into the URL hash
    "options": [
      { "id": "A", "label": "Chat — Classic dock", "description": "Drawer-style chat in the session bottom bar" }
    ]
  },
  {
    "id": "view",
    "display": "tabs",              // right-aligned pill buttons
    "urlParam": "view",
    "options": [
      { "id": "lobby",   "label": "Lobby" },
      { "id": "session", "label": "In session" }
    ]
  }
]
```

- `display: "caption"` — shows the active option's label + description inline on the left. Prev/next arrows appear when there are 2+ options.
- `display: "tabs"` — renders every option as a pill on the right. Clicking reloads the iframe with new hash state.

### 2. Inject the hash-reading shim into the prototype HTML

Paste this at the very top of `<head>` in the prototype file, before any other `<script>` or `<style>` tag. It translates the URL hash (e.g. `#view=session&concept=A`) into the variables the prototype already reads (e.g. `window.__TWEAKS__`).

```html
<script>
  (function () {
    var hash = (window.location.hash || "").replace(/^#/, "");
    var overrides = {};
    if (hash) {
      hash.split("&").forEach(function (p) {
        var i = p.indexOf("=");
        if (i > 0) {
          var key = p.slice(0, i);
          var val = decodeURIComponent(p.slice(i + 1));
          if (key === "view") overrides.defaultView = val;
          else if (key === "concept") overrides.defaultConcept = val;
        }
      });
    }
    if (Object.keys(overrides).length === 0) return;
    var current;
    Object.defineProperty(window, "__TWEAKS__", {
      configurable: true,
      enumerable: true,
      get: function () { return current; },
      set: function (v) { current = Object.assign({}, v, overrides); },
    });
  })();
</script>
```

Adjust the `if (key === "view") ...` branches to match the variable names your prototype uses. The defineProperty wrapper is needed because Claude artifacts reassign `__TWEAKS__` after our shim runs — the setter intercepts that assignment and merges our hash overrides on top.

### 3. Hide the internal nav

Add a CSS rule to the same `<head>` block:

```html
<style>.cx-switcher { display: none !important; }</style>
```

Replace `.cx-switcher` with whatever selector targets the prototype's own nav row.

### 4. Verify

`npm run dev`, open the prototype, click through the sub-toolbar tabs. The URL hash should update and the iframe should reload into the new state.

## 5. Commit and push

```bash
git add public/prototypes/ && git commit -m "feat: add my-new-concept prototype" && git push
```

Vercel auto-deploys. Usually live within 60 seconds.
