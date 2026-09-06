# jixoai.com Implementation Notes

The jixoai organization hub (`jixoai.com`), relaunched 2026-09-06 as a
config-driven project center + static blog, then localized to nine
locales the same day. Sibling precedents: unipty `packages/www`
(0.2.0-era first consumer), openiweb `apps/website` (0.3.0-era, same
closure), and the dweb bilingual site (the i18n pattern donor). This
file records the registry-consumption facts and every deviation from
the jixoai-website skill.

## Release blog + blog↔projects linkage (2026-09-06 release-blog)

- **House style**: `skills/release-blog/SKILL.md` (project-maintained;
  sourced from `.agents/research/2026-09-06-release-blog-patterns.md`).
  First three posts are zh main + en mirror pairs, structurally
  isomorphic section-by-section, cross-linked in their link bars
  (zh `/blog/<slug>-en/`, en `/zh/blog/<slug>/` — root-absolute so the
  link is locale-stable from any mirror).
- **Linkage (`src/lib/blog.ts`)**: frontmatter gains optional
  `repo`/`version` (must be declared together; `repo` must exist in
  `projects.manifest.json` — module-scope throw = hard build failure,
  negative-path verified live). `postRelease()` derives the pill data:
  v-prefixed display (same grammar as the projects grid `.version-pill`)
  + a permalink to the GitHub Release for that exact version, with the
  tag convention derived from the repo's live tag prefix
  (`v0.2.0` vs `openspecui@12.0.0` → `%40`-encoded URL, owner-aware via
  the generated record; v-prefix default when no release exists yet).
- **Pill surfaces**: blog index card + post header (research doc's
  "same interaction contract"). The index card was restructured from
  one whole-card anchor into title-link + body-link — an `<a>` cannot
  nest inside the card's `<a>` (browsers break the DOM), so the pill
  sits in the title row as a sibling; hover states preserved via
  `.group` on the `<li>`.
- **i18n**: `blogIndex.releasePill(version)` added to
  `schema.ts` + all nine dictionaries (en "GitHub release (vX)" / zh
  "GitHub 发布（vX）" pattern).
- **Frontmatter parser**: values now strip matching surrounding quotes
  (`version: "0.2.0"` → `0.2.0`) in addition to list brackets — the
  skill's documented frontmatter style uses quotes; the naive
  line parser previously kept them (would have produced
  `v"0.2.0"` pills).
- **L1 body gaps**: unipty v0.2.0 and ui v0.3.0 GitHub Releases carry
  NO body text (unipty: empty; ui: bare "Full Changelog" link). Facts
  were sourced instead from the repos' READMEs (pinned at the release
  tag), git logs (unipty's release.yml publish-order comment + npm
  publish timestamps prove the parser-first atomicity claim; ui's
  release commit 125e31f1 is the canonical summary), and the archived
  openspec changes. openspecui's release body is dense and was used
  directly. Skill note: "release body" as the primary L1 source does
  not hold for repos with empty bodies — the skill's gather step should
  name the fallback ladder explicitly (body → release commit →
  compare/commits → openspec archive).
- **Dead-link catch**: `@jixoai/vite-plugin` is NOT on npm (in-repo
  package only) — the draft linked npmjs.com and was corrected to the
  `packages/vite-plugin` tree at the v0.3.0 tag after `npm view`
  404'd. npmjs.com 403s plain curl (bot wall); verify packages via
  `npm view` / the registry API, not curl status.
- **Weight classes used**: unipty v0.2.0 milestone (zh ~1570 units),
  ui v0.3.0 milestone (~1350), openspecui 12.0.0 compact milestone
  (~885) — an adaptation major tracking an upstream CLI line at this
  org's cadence (12 majors since June) is routine-weight in substance;
  flagged to the skill as a gap (its ladder only knows x.0 vs minor).
- **Follow-up (DONE 2026-09-06, see the launch-trio section below)**:
  opentray / opendweb / openiweb each cut their first GitHub Release;
  the three first-release posts shipped the same day.
- **Verification**: build green ×5; two consecutive full-pipeline runs
  byte-identical over all 154 export files (144 page mirrors + 10
  indices; was 100 before the six posts); pills spot-checked on
  en/zh/ar/ja indexes and article headers; unknown-repo post fails the
  build with a named error; all external permalinks (release tags,
  commits, READMEs-at-tag, openspec archive paths, sibling sites)
  curl-verified 200, npm packages via registry.

## Launch trio + jixoai-ui upgrade (2026-09-06 release-blog trio)

- **Three first-release posts** (zh main + en mirror, launch/milestone
  band — narrative focus: why the project exists + what the first
  externally-promised version contains): `opentray-v0-21-1` (repo's
  first GitHub Release; create-opentray install-404 fix is the
  "first installable release of command families"; the devDependencies
  fix is the live case behind the packaging law), `iweb-v0-1-0` (first
  public cut; single-port Rust kernel, MCP ops surface, two-tier trust,
  revocable owner keys, ≤240MB envelope), `dweb-v0-4-2` (repo's first
  GitHub Release documenting the six-package family; logical-networks-
  not-VPN positioning from the README pair + EXAMPLE). Facts from the
  three release bodies (all dense this time — no L1-body-gap fallback
  needed), READMEs pinned at tags, opentray AGENTS.md Vision, npm
  registry versions (`npm view`), commit 0b0fe632, and the
  release-automation openspec archive. All 29 unique external links
  curl-verified 200. Pill URL for the `opentray@` tag form works with
  ZERO code change — `postRelease()`'s generic lastIndexOf('@') prefix
  path (the openspecui@ precedent) covers it; the URL renders as
  `releases/tag/opentray%400.21.1`, verified in built HTML (zh + en).
- **jixoai-ui upgrade (registry consumer-feedback-fixes)**:
  `npx jixoai-ui upgrade` refreshed 8 files + lock (language-switcher,
  theme-toggle, hero-section, press-button, defaults, context-plugin,
  scrollbar-measure, jixoai-theme). The site-local language-switcher
  persistence patch is now CANONICAL upstream (P0-2: `persistLocale`
  writes localStorage `lang`, silent on failure, pure anchor
  navigation — byte-for-byte the same contract our patch had), so the
  recorded lock-vs-disk divergence for that file is CLOSED (63/64
  locked files match; the only remaining intentional divergence is
  jixoai.css's `--brand-hue: 0` line vs the pristine lock hash — the
  CLI re-applied hue 0 itself during upgrade). jixoai.css was moved
  aside before upgrading (the overwrite-prompt EOF trap); the fresh
  sheet differs from the old one ONLY in line 34's comment text.
  theme-toggle gains an optional `labels` prop (absent = byte-
  identical behavior); the TS-5.9 carrier casts in defaults/context-
  plugin are runtime-identical. Live switcher matrix re-run on the
  canonical component: 7/7 (click zh → `lang=zh` → `/zh/`, reload
  stays; zh-CN detection redirects; mirror never bounces; persisted
  en beats detection).
- **Verification**: `npm run build` green ×3; all 10 llms indices
  (root + 8 locale mirrors + llms-full) byte-identical across
  consecutive builds; 14 page routes 200 on a static server (six new
  posts × root/zh + ja/ar mirrors + `/projects/`); projects grid shows
  v0.21.1 / v0.1.0 / v0.4.2 pills for the three repos (opentray's
  title reads "latest release (opentray@0.21.1)"). Zero dependency
  changes (package.json / package-lock untouched).

## Nine locales (2026-09-06 site-i18n-nine-locales)

- **Routing**: en at the root (canonical, stable URLs); zh/es/fr/de/
  ru/ja/ko/ar mirror every public route under `/[lang=lang]/` (matcher
  `src/params/lang.ts` accepts exactly the eight prefixed locales).
  Page markup lives once in `src/lib/pages/*.svelte`; the ten route
  files per side are thin wrappers passing the locale.
- **`<html lang>`/`dir`**: the dweb hooks pattern, extended with a
  direction placeholder — app.html ships `lang`/`dir` sigils that
  `src/hooks.server.ts` substitutes per route at render time, so the
  prerendered artifacts carry the real attrs (ar pages ship
  `dir="rtl"`; no client flash). Client-side navigation ALSO syncs the
  attrs via a `$effect` in `+layout.svelte` — SvelteKit's client router
  swaps only body+head, and without the effect a locale switch kept the
  previous document lang/dir (a stuck `dir="rtl"` visibly breaks the
  zh layout after switching from Arabic).
- **hreflang + canonical**: 9 locale alternates + x-default → root URL,
  plus a self canonical, absolute against SITE_URL — emitted from
  `+layout.svelte` for every page. **Do not join `$app/paths` `base`
  into absolute URLs**: with `paths.base = ''` and relative paths on,
  `base` is `.`/`../..` at prerender depth, which corrupted the URLs
  (`https://jixoai.com../..`) until removed.
- **Dictionaries** (`src/lib/i18n/`): one TS file per locale under a
  shared `schema.ts` contract (structure drift = type error). The
  Owner-provided tagline/summary/descriptionZh translations are used
  VERBATIM — the hero title is split lead/`<em>`/tail so the
  concatenated text equals the canonical tagline byte-for-byte
  (verified by script for all nine). en is the byte-equal extraction of
  the pre-i18n copy (zero regression). Project descriptions: zh renders
  the manifest's `descriptionZh`, every other locale renders
  `description`; README bodies and blog posts render as-authored under
  every locale (blog frontmatter gained an optional `lang` field).
- **RTL**: site-owned `.markdown-body` rules switched to logical
  properties (`padding-inline-start`, `border-inline-start`,
  `text-align: start`); rewritten page markup uses `ms-`/`me-` instead
  of `ml-`/`mr-`. Registry components keep their physical-direction
  utilities (cosmetic ltr-isms in terminal-header/jixoai.css left
  untouched — registry files stay pristine); ar pages measure 0px
  horizontal overflow at 1280px and 390px.
- **llms export**: `locale.segments` covers the eight mirrors — each
  locale gets its own `llms.txt` index at `/<lang>/llms.txt`; the root
  index (default en) appends an "Other languages" section;
  `llms-full.txt` follows en only. Section globs extended to
  `*/projects/**`, `*/blog/**`, `*/index.html` so mirrored pages bucket
  correctly. 90 pages → 90 .md mirrors + 10 indices; two consecutive
  full-pipeline builds byte-identical (100 export files).
- **language-switcher** (registry item #23, menu variant — the pair
  variant only fits two locales): nine entries, each linking the same
  page in the target locale; `jixoai.css` was moved aside before the
  add per the skill and came back byte-identical (hue 0 IS the pristine
  sheet for this site). Lock↔disk hashes verified.
- **Dev-port collision during verification**: a sibling agent's static
  server had claimed port 13501 mid-run (symptom: the unipty site
  answering our headless checks). Re-serve on a fresh port before
  believing a sudden all-FAIL sweep — multi-agent port discipline
  applies to static preview servers too, not just dev servers.

## Locale negotiation (2026-09-06 locale-negotiation)

OpenSpec change `2026-09-06-locale-negotiation` (original request:
站点没有基于浏览器语言自动选择默认语言——需要补上). A zh browser
landing on `/` previously got English unless it clicked the switcher.

- **Pre-paint bootstrap** (`src/app.html`, first inline `<head>`
  script, before the theme bootstrap): an explicit persisted choice
  wins — localStorage `lang` (the switcher's key) with a prefixed
  locale redirects ONCE to the same page under its mirror
  (`location.replace`, path + hash preserved), while a stored `en` is
  an explicit stay and suppresses detection too (caught live by the
  matrix's first run: the naive "valid prefixed value only" reading
  let stored-en fall through to detection and bounced a fr browser to
  `/fr/`). Otherwise `navigator.languages` is walked in order, primary
  subtag only (`zh-Hans-CN` → zh; `pt-BR` → no match, next entry);
  first hit among the eight prefixed locales wins. Loop laws: the
  script only ever LEAVES the default surface (returns when the first
  path segment is a prefixed locale — also what makes the unknown
  `/xx/` 404 matcher untouched), the target always carries its prefix,
  and mirrors never bounce back. No match → stay on en (x-default;
  hreflang already advertises the mirrors, SEO untouched). Storage
  access is try/caught (private mode degrades to detection).
- **Switcher persistence** (`language-switcher.svelte`, both
  variants): every locale anchor records its code to localStorage
  `lang` before the anchored navigation, so an explicit click always
  beats detection afterwards; storage failures are swallowed (the
  anchor still navigates). Site-level divergence from the registry
  bytes — `jixoai-ui.lock` still records the pristine hash for the
  file (same posture as unipty's recorded lock-vs-disk divergences);
  re-adding the item would need the persist handlers re-applied.
- **Verification**: `npm run build` green; headless matrix
  (playwright-core, machine-cached Chromium for Testing 151) with
  emulated `navigator.languages` + seeded `lang` via context init
  scripts — 15 dev-server cases (zh-CN/zh-Hans-CN → `/zh/`, fr-CA →
  `/fr/`, ar-EG → `/ar/` with `dir="rtl"`, ru-RU, en-US/pt-BR stay,
  `pt-BR,es-AR` → `/es/`, `pt-BR,zh-CN` → `/zh/` list walk, persisted
  de beats en-US, persisted en stays, mirror-never-bounces, deep path
  `/projects/` → `/ja/projects/`, hash preserved) + static-artifact
  spot checks on `public/` + a real-click switcher test (menu variant:
  open popover, click zh → `lang=zh`, lands `/zh/`) — 30/30 after the
  stored-en fix. `/zz/` and `/zh/zz/` still 404. `__SITE_URL__`/
  hreflang surfaces unchanged.

## Registry consumption (2026-09-06) — jixoai-ui 0.3.0

- `components.json` hand-written FIRST (init refuses without it): style
  new-york, `tsx: true` (shadcn schema-mandatory even for Svelte),
  aliases `ui → src/lib/ui` / `lib → src/lib`, css `src/app.css`,
  `registries.@jixoai`, `jixoai.brandHue: 0`.
- `npx jixoai-ui init --hue 0` installs `jixoai-theme` →
  `src/lib/jixoai.css` (0.3.0 sheet already maps
  popover/destructive/input/ring/shadows; scroll-driven reveal CSS
  included — `data-reveal=""` static attributes, no IO action, no
  html.js gate on reveal; the `html.js` flag stays for the surface
  family's no-JS branch).
- Locked items (23 since the nine-locale change): the direct adds
  `scrollbar-measure`, `website-scaffold`, `terminal-header`,
  `terminal-footer`, `theme-toggle`, `press-button`, `section-card`,
  `terminal-card`, `hero-section`, `card-grid`, `llms-txt`,
  `language-switcher` + the closure `icons`, `defaults`, `utils`,
  `jixoai-theme`, `navigation-menu`, `popover`, `density`, `paint`,
  `separator`, `figure`, `context-plugin`.
  Excluded on purpose (nothing on disk pulls them): `toc-engine`,
  `toc`, `badge`, `scaffold-float`.
- **Lock hash semantics**: `jixoai-ui.lock` records the PRISTINE
  registry hash for `src/lib/jixoai.css`; after init/add applies
  `--brand-hue: 0` the on-disk hash intentionally differs (the hue
  substitution is line 34 only — verified by diff against the openiweb
  hue-253 copy). Same state as every sibling site.
- **CLI traps observed live**: the jixoai.css overwrite prompt EOFs in
  non-interactive mode while STILL locking the item (locked-but-not-
  written; three items needed re-adds), one transient
  `shadcn add @jixoai/popover` connect-timeout needed a plain retry,
  and `llms-txt` lands in `src/vite-plugins/` under svelte-kit — moved
  to project-root `vite-plugins/` to match the lock path (openiweb
  precedent).
- 0.3.0 layout is directory-form (`src/lib/ui/<item>/<file>` +
  `index.ts` barrels); component-internal imports are `$lib/...`
  already — no unipty-era import fixes needed.

## Deviations from the skill / reference

- **trailingSlash 'always'** (was 'never'). The single flat page grew
  into a route tree; directory-style output (`projects/index.html`) is
  the only shape both GitHub Pages and a plain `python3 -m http.server`
  serve for `/projects/` URLs without extension-rewrite rules.
- **marked 18 token-based renderer API.** The classic
  `new Renderer()` + `(href, title, text)` signatures are retired; the
  README renderer uses `new Marked({ renderer: { image(token), link(token) } })`
  instances (per-call instance — the shared `marked` singleton stays
  pristine for the blog). Raw HTML embeds inside READMEs (opentray's
  `<img src="docs/…">`, iweb's favicon include) bypass the lexer, so a
  post-pass regex absolutizes remaining relative `src`/`href` attributes
  in the final HTML (images → raw.githubusercontent, links → blob view).
- **No `badge` item**: the hero badges snippet composes plain bordered
  spans (the registry `badge` item is not otherwise pulled in by any
  locked dependency — adding an item with no other consumer just to
  restyle four chips was judged not worth the lock entry).
- **`pnpm build` → `npm run build`**: this repo is npm-based
  (package-lock.json, npm install in deploy.yml) — the skill's pnpm
  phrasing doesn't apply here; the pipeline contract (build → dist →
  public/ artifact, upload-pages-artifact) is unchanged.
- **Reveal attributes on plain wrappers**: `data-reveal=""` static
  attributes only (0.3.0 law); the old `use:reveal` action file is
  deleted. `CardGrid` also runs its own internal entrance observer.
- **README detail pages rewrite repo-relative URLs** to GitHub
  (raw/blob at HEAD) — vendored READMEs hyperlink correctly from the
  hub without mirroring their binary assets.
- **devDependency-only runtime**: clsx + tailwind-merge (utils) and
  marked are devDependencies — everything renders at build time into
  prerendered HTML; the artifact ships zero runtime deps.

## Verification record (2026-09-06)

- `npm run build` green ×4 (two consecutive full-pipeline runs:
  all 12 export files byte-identical — llms.txt, llms-full.txt, 10
  page mirrors).
- `python3 -m http.server --directory public` spot-check: `/`,
  `/blog/`, `/blog/2026-09-06-site-relaunch/`, `/projects/`, all six
  `/projects/<slug>/` (incl. `gaubee--dweb`), five `static/logos/*`,
  `/logo.webp`, `/llms.txt`, `/llms-full.txt` — all 200.
- Headless Chromium (machine-cached, playwright-core from /tmp): five
  routes render with zero console/page errors; hero badges four chips;
  terminal typing settles to the fleet listing; dark mode + 390px
  mobile pass; dev server boots on port 13400 (/, /projects/, /blog/
  post all 200).

## Deploy contract (unchanged)

`.github/workflows/deploy.yml` untouched — it runs
`node scripts/build-site.mjs` and uploads `public/`; the build command
did not change. Logos vendored once into `static/logos/` (opentray.png
from opentray/docs, iweb.svg from admin-console favicon, dweb.png from
/Volumes/dweb/assets/opendweb-icon.png — the Owner-designated direct
variant, unipty.svg + openspecui.svg from their site static dirs; ui
reuses static/logo.webp).

## README i18n (2026-09-06 readme-i18n, openspec change active)

Original request (Owner): 项目元数据要涵盖多语言 README — 切语言时显示对应
语言版本，缺失则回退默认.

- **Fetch** (`scripts/fetch-projects.mjs`): per repo, `README-<lang>.md`
  for the eight non-en hub locales, fetched CONCURRENTLY (Promise.all —
  the audit-era serial ladder stays for the default README only); the
  contents API with the path pinned (`repos/{o}/{r}/contents/README-zh.md`)
  because the case-insensitive `…/readme` endpoint cannot address
  translations. 404 → null (normal), transport failure → previous
  generated value per language. Generated record gains
  `readmeTranslations` (all eight keys, null where absent). Live state:
  all six repos ship README-zh.md; no other language exists yet.
- **Selection** (`src/lib/readme.ts` — `readmeView(project, locale)`):
  translation-first with English fallback; the returned `lang` follows
  the CONTENT (container attribute — CJK typography inside a foreign
  page locale), `translated=false` drives the fallback pill. Both
  project-detail loaders consume it (root en + eight mirrors); the
  pill copy is `projectDetail.originalLanguage` in all nine
  dictionaries ("原文（English）" / "Original (English)" / "الأصل
  (English)" / …) — the source is always English, so every locale
  names it identically.
- **A3 note**: the vision P1 "「中文版」标签中文内容英文" was dweb's
  English README carrying its own `[中文版](README-zh.md)` pointer —
  no site-level label existed. Fixed structurally: /zh/ now renders
  the actual Chinese README; the only language claim the chrome makes
  is the fallback pill, which only ever names English.
- **Verbatim guard (zh tagline)**: the em moved to the tail phrase
  (面向 AI 时代`<em>`的可靠基础设施。</em>`); lead+em+tail
  concatenation is byte-identical to the Owner table.

## Mobile audit fixes (2026-09-06, nine-locale 390px pass)

- **RTL terminal/code isolation (P1)**: the hero terminal is wrapped
  in `<div dir="ltr">` at the consumer (home-page snippet) — registry
  component untouched; `.markdown-body pre/code` get
  `direction: ltr; unicode-bidi: isolate` under `[dir='rtl']` (app.css
  site-supplement layer, never the registry sheet). Verified: prompt $
  left of typed text, cursor right, command un-reordered.
- **Mobile table law (P1)**: `@media (max-width: 639.98px)` switches
  `.markdown-body table` to `display: table; table-layout: fixed;
  width: 100%` + cell `overflow-wrap: break-word` + th
  `white-space: normal`. Measured live: block+width:100% alone does
  NOT wrap (the anonymous inner table still lays out at max-content →
  nested scroll); display:table with AUTO layout re-inflates to 582px
  and clips; FIXED layout holds scrollW==clientW==358 @390px. pre
  keeps overflow-x:auto (terminal blocks scroll like GitHub).
- **RTL arrows (P1)**: ar dictionary "continue" arrows mirror → ←
  (allProjects/allPosts/card.readme); ↗ diagonals kept (audit scope).
- **Blog language governance (P0)**: `postLang/postDir/postsForLocale`
  in blog.ts (frontmatter `lang`, missing → en; the relaunch post
  gained its missing `lang: zh`). Blog index + home strip list the UI
  locale's posts first, foreign posts carry an autonym badge
  (dict[lang].label); summaries get per-post `dir`/`lang` (bidi
  isolation); post pages show a one-time `blogPost.writtenIn(autonym)`
  notice when UI locale ≠ post language — bodies stay as-authored
  (tier law unchanged).
- **Locale typography (P2)**: `:lang(ko) { word-break: keep-all }`,
  `:lang(ja) .markdown-body h1 { text-wrap: balance }`.
- **Header subtitle (P2)**: already `hidden lg:block` in the registry
  terminal-header — verified computed display:none @390px (the audit
  finding predates the registry markup; no code change needed).
- **ar typo (P2)**: "البناءء" does NOT exist in ar.ts (byte-level
  grep) — the vision reading was shaped-glyph misread; rendered page
  re-checked clean.
- **es/fr eyebrow OPEN SOURCE**: intentionally untouched (audit
  accepted).

## Verification record additions (2026-09-06 readme-i18n + audit)

- `npm run build` green ×4 across the two work streams; consecutive
  run pairs: llms export (10 files) byte-identical every time. Page
  HTML differs across runs ONLY through vite chunk-hash filenames —
  `fetchedAt` (millisecond ISO) rides the data chunk and changes its
  content hash; no timestamp reaches page HTML (pre-existing
  mechanism, spec only claims llms-export stability).
- Generated data: six repos × README-zh (5-10k chars each); zh detail
  pages render Chinese bodies with lang="zh" and no pill;
  /ar/projects/opendweb/ renders lang="en" + "الأصل (English)" pill.
- CDP audit (chrome-headless-shell 1228, 390×844, reduced motion):
  ko word-break keep-all + zero viewport overflow; ar terminal island
  LTR with $ left of text; zh opendweb table scrollW==clientW==358,
  pre scrolls internally; zh blog zh-first order with English badges
  on the -en mirrors; header subtitle display:none; ja post h1
  text-wrap:balance + mismatch notice. Screenshots:
  `.agents/images/2026-09-06-mobile-audit/fix-{ar-home,zh-opendweb-detail,ko-home}.png`.
- Browser-stack friction (recorded for the next agent): "Chromium for
  Testing" 151 full binary wedges its renderer DevTools after any
  http navigation under `--headless=new` on this machine (navigate
  acks lost, Runtime.evaluate dead; data:/about:blank fine) — the
  playwright-cached chrome-headless-shell build drives cleanly over
  plain-WebSocket CDP (Node 24 global WebSocket, browser endpoint +
  Target.attachToTarget flatten).
