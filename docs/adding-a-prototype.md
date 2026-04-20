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

## 5. Commit and push

```bash
git add public/prototypes/ && git commit -m "feat: add my-new-concept prototype" && git push
```

Vercel auto-deploys. Usually live within 60 seconds.
