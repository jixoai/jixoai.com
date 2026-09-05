> Execution law: implementation is delegated work; DNS/deploy acceptance
> stays with the Owner.

## 1. Registry adoption

- [x] 1.1 Create `components.json` FIRST (hand-write following the unipty
  www precedent: shadcn schema fields, `tsx: true` schema-mandatory,
  aliases `ui → src/lib/ui`, `registries.@jixoai =
  "https://ui.jixoai.com/r/{name}.json"`) — `jixoai-ui init` refuses to run
  without it. Then `npx jixoai-ui init --hue 0`; add `scrollbar-measure`
  (root layout import), `website-scaffold`, `terminal-header`,
  `terminal-footer`, `theme-toggle`, `press-button`, `section-card`,
  `terminal-card`, `hero-section`, `card-grid`, `llms-txt`; LOCK THE
  DEPENDENCY CLOSURE (explicit `npx jixoai-ui add` of every closure item on
  disk — icons/defaults/utils/jixoai-theme/navigation-menu/popover/density/
  paint/separator/figure/context-plugin/toc-engine …as present); delete the
  hand-copied `src/lib/ui/*` flat duplicates so the lock describes
  everything.

## 2. Config-driven projects

- [x] 2.1 Extend `projects.manifest.json` (site/logo/owner-aware repo),
  apply the roster change (−proxy −skill-creator +opendweb +openiweb);
  vendor logos into `static/logos/` (opentray.png from opentray/docs,
  iweb.svg from admin-console favicon, dweb.svg from the dweb icon,
  unipty.svg + openspecui.svg from their site static dirs, ui reuses the
  existing static/logo.webp).
- [x] 2.2 Extend `scripts/fetch-projects.mjs` with owner-aware parsing —
  the three touchpoints: the `ORG`-prefixed releases URL
  (`repos/${ORG}/${repo}` → `repos/${owner}/${name}`), the `repoUrl`
  concatenation, and the README fetch (raw GitHub, same auth ladder +
  stale-fallback; a transport failure must not break the build when a
  previous generated file exists).
- [x] 2.3 Project cards: logo (typographic fallback), description, version
  pill, links — 官网 (site), GitHub, README detail page. Detail route
  `/projects/[repo]/` with the slug defined as the repo path with `/`
  replaced by `--` (org repos stay bare: `opentray`; foreign:
  `gaubee--dweb`), prerendered, rendered markdown (marked, no mdsvex).

## 3. Blog

- [x] 3.1 `content/blog/` + frontmatter schema (title, date, description,
  author, tags) + vite glob discovery; `/blog/` index (newest first) and
  `/blog/[slug]/` post pages, prerendered; mono-styled code blocks;
  markdown rendered with `marked` (add as devDependency; sanitize not
  required — content is first-party); seed zh relaunch post.
- [x] 3.2 Home surface gains a "latest posts" strip linking the blog.

## 4. Verification + wrap

- [x] 4.1 `llms-txt` wired as the `llmsTxt()` vite plugin (generation lands
  in `dist/`, carried into `public/` by build-site step 3 — ordering stays
  sound); mirrors for home, projects index/detail, blog index/posts;
  byte-identical re-run.
- [x] 4.2 `npm run build` green; `public/` serves correctly from a file
  server (spot-check links incl. `/projects/gaubee--dweb/`).
- [x] 4.3 jixoai-website skill checklist reviewed; deviations in NOTES;
  friction log reported.
