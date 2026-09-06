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
