# localization Specification

## Purpose
The hub's 9-locale surface (en/zh/es/fr/de/ru/ja/ko/ar) with tiered
content localization, RTL support, hreflang, and a visible switcher.

## Requirements

### Requirement: Nine-locale surface with stable root

The site SHALL serve English at the root (canonical, stable URLs) and full
mirrors of every public route for zh, es, fr, de, ru, ja, ko, and ar,
with correct per-locale `<html lang>`, `dir="rtl"` for Arabic, hreflang
alternates including x-default, and a language switcher covering all 9.

#### Scenario: locale mirror

- **WHEN** any public route is requested under a locale prefix (e.g.
  `/ar/projects/opendweb/`)
- **THEN** the page renders localized chrome, `lang="ar"` and `dir="rtl"`
  for ar, and hreflang alternates for all 9 locales plus x-default.

#### Scenario: root stability

- **WHEN** existing root URLs are requested
- **THEN** they serve the English pages unchanged (no redirect).

### Requirement: Tiered content localization

UI chrome and marketing copy SHALL be localized in all 9 locales (the
Owner-provided canonical translations used verbatim); curated project
descriptions SHALL render `descriptionZh` on the zh locale and
`description` elsewhere; README bodies and blog posts SHALL render as
authored under every locale.

#### Scenario: description tier

- **WHEN** the projects grid renders on `/zh/`
- **THEN** each card shows its Chinese description; on `/es/` the English
  description renders.

### Requirement: Locale-covered AI export

The llms export SHALL mirror every locale's public pages with absolute
URLs, byte-identical across re-runs.

#### Scenario: stable regeneration

- **WHEN** the build runs twice without content changes
- **THEN** all locale export files are byte-identical.

### Requirement: Browser language negotiation on the default surface

Default-locale pages SHALL negotiate the visitor language before first
paint: an explicit persisted choice wins; otherwise the first
navigator.languages match among available locales redirects once to the
same page under its locale prefix. Non-default pages never redirect.

#### Scenario: zh browser lands on zh

- **WHEN** a browser with a non-default preference (e.g. zh) loads the default-locale page
- **THEN** it is redirected (path + hash preserved) to its locale
  mirror before content paints.

#### Scenario: explicit choice beats detection

- **WHEN** the visitor has persisted a language choice via the switcher
- **THEN** no detection redirect occurs.
