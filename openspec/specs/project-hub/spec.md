# project-hub Specification

## Purpose
The projects surface of the organization hub: a manifest-driven roster of
sub-sites with their official sites, logos, READMEs, and live release
versions, refreshed at build time.

## Requirements

### Requirement: Manifest-driven project roster

The projects surface SHALL be driven exclusively by
`projects.manifest.json`; adding, removing, or relinking a sub-site is a
manifest + asset edit, never a component edit. Each entry SHALL support
`repo` (owner-aware), `name`, `description`, `site` (official-site URL),
and optional `logo` (asset under `static/`).

#### Scenario: roster reflects the 2026-09-06 fleet

- **WHEN** the site is built
- **THEN** the roster is unipty, openspecui, ui, opentray, dweb (opendweb),
  iweb (openiweb) — proxy and skill-creator absent — each card linking its
  official site, GitHub repo, and README detail page.

#### Scenario: missing logo degrades gracefully

- **WHEN** a manifest entry has no `logo`
- **THEN** the card renders a typographic mark instead (no broken image).

### Requirement: Build-time README + release pipeline

Release versions and README sources SHALL be fetched at build time with the
existing auth ladder (token → gh → anonymous), cached as generated data, and
a transport failure SHALL fall back to the previous generated values rather
than fail the build; foreign-owner repos (e.g. `Gaubee/dweb`) resolve
identically to org repos.

#### Scenario: foreign-owner repo

- **WHEN** the fetcher processes `Gaubee/dweb`
- **THEN** the latest release and README resolve from
  `repos/Gaubee/dweb` and the project page renders them.

### Requirement: Registry-governed chrome

The site's chrome SHALL come from the `@jixoai` registry under
`jixoai-ui.lock` (hue 0), with no hand-copied component duplicates.

#### Scenario: upgrade convergence

- **WHEN** `npx jixoai-ui upgrade` runs
- **THEN** locked items refresh and `npm run build` passes; a second run
  writes nothing.

### Requirement: Localized curated descriptions

The manifest SHALL carry an optional `descriptionZh` per project; the zh
locale renders it, every other locale renders `description`.

#### Scenario: manifest-driven zh descriptions

- **WHEN** the projects surface builds with `descriptionZh` present
- **THEN** `/zh/` cards show the Chinese copy and root/other-locale cards
  show the English copy, both driven solely by the manifest.

### Requirement: Locale-aware README translations

The build-time pipeline SHALL fetch each manifest repo's translated
READMEs (`README-<lang>.md` for the eight non-en hub locales) with the
same auth ladder as the default README, fetch them concurrently, and
record them in the generated data keyed by locale (null = no such
translation; a transport failure keeps the previous generated value).
A project detail page under locale L SHALL render the L translation when
present and otherwise fall back to the default (English) README; the
README container SHALL carry a `lang` attribute matching the rendered
content's language, and the fallback under L ≠ en SHALL show a one-time
source pill from the locale dictionary naming the English original.

#### Scenario: translated detail page

- **WHEN** `/zh/projects/opendweb/` renders and the repo carries
  `README-zh.md`
- **THEN** the README body is the Chinese translation, the container
  carries `lang="zh"`, and no fallback pill renders.

#### Scenario: honest fallback

- **WHEN** `/ar/projects/opendweb/` renders and the repo has no
  `README-ar.md`
- **THEN** the README body is the English original inside
  `lang="en"`, with the locale's "original (English)" pill above it.

#### Scenario: fetch degradation

- **WHEN** a translation fetch fails at transport level but the previous
  generated data exists
- **THEN** the build keeps the stale translation rather than failing or
  silently dropping it to null.
