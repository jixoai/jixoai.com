> Orthogonal intents (maintained 2026-09-06 Asia/Shanghai): hub-site
> information architecture; config-driven project surface; static blog;
> registry adoption.
>
> Original request (2026-09-06 Asia/Shanghai): 重构 ./jixoai.com 官网：
> 1) 下架 proxy 和 Skill Creator，上架 opendweb 和 openiweb；
> 2) 整个网站重构，可配置相关子站点，配置包括子站点的网站、README、logo；
> 3) 这个站点除了包含 projects，还将开通 blogs 版面，也是纯静态。
> （背景：./jixoai-ui 发布了新版本 0.3.0。）

## Why

The hub site hand-rolls its chrome (pre-registry copies of components that
jixoai-ui 0.3.0 now publishes), lists two retired projects (proxy,
skill-creator) while missing two shipping ones (dweb, iweb), links projects
only to GitHub although every flagship now has an official site, and has no
blog surface. A refactor makes the project list configuration instead of
code and adds the missing surfaces.

## What Changes

### 1. Config-driven project surface

- `projects.manifest.json` becomes the single source for the projects
  section. Each entry gains: `site` (official-site URL), `logo` (path under
  `static/`, optional — a typographic mark renders when absent), and
  owner-aware `repo` (`"opentray"` = jixoai org, `"Gaubee/dweb"` = foreign
  owner) so release fetching and links work for non-org repositories.
- Roster: REMOVE `proxy`, `skill-creator`; ADD `opendweb` (Gaubee/dweb) and
  `openiweb` (jixoai/iweb); KEEP `unipty`, `openspecui`, `ui`, `opentray`.
- `scripts/fetch-projects.mjs` additionally fetches each project's README
  (raw GitHub, same auth ladder and stale-fallback discipline as versions)
  into the generated data; project detail pages (`/projects/<repo>/`)
  render it as the project's README surface, prerendered.
- Logos are vendored once into `static/logos/` (opentray.png, iweb.svg,
  dweb.svg, unipty.svg, openspecui.svg, ui + fallback wordmark).

### 2. Static blog

- `content/blog/*.md` with frontmatter (title, date, description, author,
  tags) discovered at build time via vite glob; routes `/blog/` (index) and
  `/blog/<slug>/` (post), both prerendered — zero server runtime.
- Markdown rendered with `marked` at build time (first-party content, no
  mdsvex); code blocks styled by the family mono style. Seed post: the site
  relaunch announcement (zh) introducing the new sub-sites.

### 3. Registry adoption + refactor

- Bootstrap the site properly on the registry: components.json first
  (jixoai-ui init refuses without it), then `npx jixoai-ui init --hue 0`
  + `jixoai-ui.lock` replacing the hand-copied `src/lib/ui/*` (add
  `website-scaffold`, `terminal-header`, `terminal-footer`,
  `theme-toggle`, `press-button`, `section-card`, `terminal-card`,
  `hero-section`, `card-grid`, `scrollbar-measure`, `llms-txt`, plus the
  dependency closure locked explicitly).
- Information architecture: home (hero + fleet terminal + projects grid
  with logos/sites + latest posts), `/projects/` index + detail pages,
  `/blog/`, ghost footer. Mission copy and the live-version fleet terminal
  carry over.
- AI export layer via the `llms-txt` item (one generation point; blog and
  project pages mirrored).
- Deployment pipeline (build → `public/`, GitHub Pages artifact)
  unchanged in contract; all new pages prerendered into it.

## Capabilities

### New Capabilities

- `blog`: static blog surface (content format, routes, rendering).
- `project-hub`: config-driven projects surface (manifest schema, fetch
  pipeline, detail pages, logos).

### Modified Capabilities

- (none previously captured — this is the repo's first OpenSpec change;
  the site itself is described by the two new capabilities above.)

## Non-goals

- No per-project brand hues on the hub (the hub renders in its own hue 0;
  logos carry the identity).
- No i18n framework; the site stays English-first with zh blog posts
  rendered as authored.
- No search, RSS is included only if trivial (llms.txt covers AI inbound).
