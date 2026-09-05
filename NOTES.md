# jixoai.com Implementation Notes

The jixoai organization hub (`jixoai.com`), relaunched 2026-09-06 as a
config-driven project center + static blog. Sibling precedents: unipty
`packages/www` (0.2.0-era first consumer) and openiweb `apps/website`
(0.3.0-era, same closure). This file records the registry-consumption
facts and every deviation from the jixoai-website skill.

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
- Locked items (22): the direct adds `scrollbar-measure`,
  `website-scaffold`, `terminal-header`, `terminal-footer`,
  `theme-toggle`, `press-button`, `section-card`, `terminal-card`,
  `hero-section`, `card-grid`, `llms-txt` + the closure `icons`,
  `defaults`, `utils`, `jixoai-theme`, `navigation-menu`, `popover`,
  `density`, `paint`, `separator`, `figure`, `context-plugin`.
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
