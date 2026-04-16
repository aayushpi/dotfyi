# Architecture & Design Reference

> Decision guide for development on `dotfyi` — Aayush Iyer's personal portfolio and blog.

---

## Working Agreement

These rules apply to all development sessions:

1. **Always propose before acting.** Before making any change, suggest the approach and wait for explicit confirmation. Do not start implementing until the plan is approved.

2. **Always use a new branch.** Never commit directly to `master`. Create a descriptive feature branch for every change, no matter how small.

3. **Never push to Git without asking.** Always stop after committing locally and ask before running `git push` or creating a PR.

---

## What This Is

A statically-generated personal site built on Next.js. It is a **content-first portfolio** showcasing writing, work projects, and interests. There is no backend, no database, no authentication. All content lives in source control as markdown or JSX files and is rendered at build time.

---

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (Pages Router) | Not App Router. File-based routing in `/pages`. |
| Language | JavaScript (no TypeScript) | prop-types for runtime checking |
| React | v19 | Concurrent features available but unused |
| UI system | Twilio Paste (`@twilio-paste/core`) | All components, layout, spacing, and color from Paste |
| Styling | Paste's CSS-in-JS (emotion) | Theme tokens only — no hardcoded values |
| Content | Markdown / MDX | `.md` processed via remark, `.mdx` via @next/mdx |
| Deployment | Vercel | Static export + ISR for `/likes` |
| Search | Algolia + react-instantsearch | Installed but not yet surfaced in UI |
| Dependency updates | Renovate | Auto PRs on package updates |

---

## Directory Layout

```
/
├── pages/             # Routes (Next.js Pages Router)
│   ├── _app.js        # ThemeProvider + global styles
│   ├── _document.js   # HTML shell, Google Fonts
│   ├── index.jsx      # Home /
│   ├── writing.jsx    # /writing index
│   ├── work.jsx       # /work portfolio
│   ├── likes.jsx      # /likes — reads content/likes.md at build
│   ├── posts/         # .md and .mdx blog posts (in-progress)
│   └── writing/       # Long-form articles as JSX
├── components/
│   ├── component-provider.js  # MDXProvider: maps markdown → Paste
│   └── footer.js              # Site footer
├── layouts/
│   └── index.js       # Shared page wrapper
├── theme/
│   └── index.js       # Custom Paste theme (Inter, brand pink, tokens)
├── content/
│   └── likes.md       # Source-of-truth for /likes data
└── public/            # Static assets (SVGs, images)
```

---

## Routing & Pages

All routes are **statically generated** at build time. No dynamic segments exist today.

| URL | File | Rendering |
|---|---|---|
| `/` | `pages/index.jsx` | Static |
| `/writing` | `pages/writing.jsx` | Static |
| `/writing/scaling_support` | `pages/writing/scaling_support.jsx` | Static |
| `/writing/dsys-changelog` | `pages/writing/dsys-changelog.jsx` | Static |
| `/work` | `pages/work.jsx` | Static |
| `/likes` | `pages/likes.jsx` | ISR (revalidate: 60s) |

New pages go in `/pages`. Long-form articles live under `/pages/writing/`. Adding MDX posts drops `.mdx` files in `/pages/posts/`.

---

## Content Model

### Structured Markdown (`/content/likes.md`)

Each "like" is a `##` section with bold metadata fields:

```markdown
## Book Title

**Date:** January 2024  
**Type:** Book  
**Creator:** Author Name

Review text paragraph here.
```

`likes.jsx`'s `getStaticProps` parses the remark AST to extract these fields into typed objects. New metadata fields require updates to both the markdown convention and the parser.

### JSX Articles (`/pages/writing/*.jsx`)

Long articles are raw JSX using Paste components. No remark processing — full React expressiveness.

### MDX Posts (`/pages/posts/*.mdx`)

Embedded React in markdown, rendered via `@next/mdx`. ComponentProvider maps standard markdown elements to Paste equivalents.

---

## Styling Rules

**Always use Paste design tokens. Never hardcode colors, spacing, or font sizes.**

```jsx
// Correct
<Box marginTop="space40" color="colorText" />

// Wrong
<div style={{ marginTop: 16, color: '#333' }} />
```

**Responsive values use array syntax `[mobile, tablet, desktop]`:**

```jsx
<Grid columns={[1, 1, 12]}>
  <Column span={[12, 12, 6]} />
</Grid>
```

**Theme extensions** (`theme/index.js`): The custom theme extends Paste's DefaultTheme. Overrides:
- Font family: Inter (from Google Fonts)
- Brand accent: `#F98585` (coral)
- Background: `#fce2e0` (light pink)
- Custom fontSize/space/lineHeight scales

Adding new tokens: extend the object in `theme/index.js` under the appropriate key.

---

## MDX Component Mapping (`components/component-provider.js`)

Markdown elements auto-map to Paste equivalents in MDX pages:

| Markdown | Paste Component |
|---|---|
| `# h1` – `###### h6` | `<Heading>` with size variants |
| `- list` | `<UnorderedList>` / `<ListItem>` |
| `1. list` | `<OrderedList>` / `<ListItem>` |
| `[link]()` | `<Anchor>` + `next/link` |
| `_em_` | `<Text as="em">` |
| `**bold**` | `<Text as="strong">` |

New markdown→component mappings go in `component-provider.js`.

---

## Data Fetching Patterns

**Only `getStaticProps` is used.** No `getServerSideProps`, no API routes, no client-side fetching (`SWR`, `React Query`).

When adding a new data source:
1. File-based content: parse in `getStaticProps`, return as props
2. External API (e.g., Algolia): call at build time in `getStaticProps`, cache result
3. ISR: set `revalidate: N` seconds if content changes without deploys
4. Avoid client-side fetching unless UX demands real-time data (e.g., search)

---

## Microfrontends (`microfrontends.json`)

Vercel's microfrontend routing is configured here:

- `dotfyi` — main app, fallback: `aayush.fyi`
- `rad-reviews` — separate app, handles `/reviews` paths

This allows independently deployed apps to share a domain. New microfrontend apps require an entry in `microfrontends.json` and a separate Vercel project.

---

## Conventions

### File Naming
- Pages: `kebab-case.jsx` or `snake_case.jsx` (mixed, follow existing per-directory pattern)
- Components: `kebab-case.js`
- Content: `kebab-case.md`

### Component Structure
Flat functional components with props. No class components. No global state management — all data flows down via props from `getStaticProps`.

### No TypeScript
The project uses plain JavaScript with `prop-types`. Do not introduce TypeScript unless explicitly decided. Adding types means updating tooling, tsconfig, and all existing files.

### No Testing
No test infrastructure exists. Do not add tests without explicit direction.

### No Backend
This is a static site. Do not introduce API routes, databases, or server-only code without explicit architectural discussion.

---

## Decision Log

| Decision | Rationale |
|---|---|
| Pages Router over App Router | Project predates stable App Router; migration cost not justified for a personal site |
| Paste as sole UI library | Author works at Twilio/Algolia; Paste is the design system they build |
| Markdown for likes | Keeps content in version control, no CMS dependency |
| No TypeScript | Portfolio site; low maintenance overhead preferred |
| No tests | Low-change frequency; static site risk tolerance is high |
| ISR on /likes | Content updates without full redeploys |
| Vercel deployment | Zero-config, microfrontend support, ISR support |

---

## Adding New Content

### New article
1. Create `/pages/writing/article-slug.jsx`
2. Use Paste components (Grid, Box, Heading, Paragraph) to structure content
3. Link from `/pages/writing.jsx`

### New MDX post
1. Drop `/pages/posts/post-slug.mdx` — it's auto-routed
2. MDX can import any React component

### New like
1. Add `## Title` section to `/content/likes.md` following the metadata convention
2. Redeploy (or ISR will pick it up within 60s)

### New work project
1. Edit `/pages/work.jsx` and add a new section using existing layout patterns

---

## Outstanding / Future Work

- [ ] `rad-reviews` microfrontend at `/reviews` (routing configured, app TBD)
- [ ] Blog post index page for `/posts/*` routes
- [ ] Environment variable management (currently no `.env` files)
- [ ] Migrate `pages/posts/` example files to real content or remove
