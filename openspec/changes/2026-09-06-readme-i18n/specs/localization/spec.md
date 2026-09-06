## MODIFIED Requirements

### Requirement: Tiered content localization

UI chrome and marketing copy SHALL be localized in all 9 locales (the
Owner-provided canonical translations used verbatim); curated project
descriptions SHALL render `descriptionZh` on the zh locale and
`description` elsewhere; project README bodies SHALL render the
requesting locale's fetched translation with an explicit fallback to
the English original (badged, container lang following the content);
blog posts SHALL render as authored under every locale.

#### Scenario: description tier

- **WHEN** the projects grid renders on `/zh/`
- **THEN** each card shows its Chinese description; on `/es/` the English
  description renders.

#### Scenario: README tier

- **WHEN** a project detail page renders under a locale the repo has no
  README translation for
- **THEN** the English README renders unchanged with the locale's
  source pill — never machine-translated copy and never a language
  signal that mislabels the rendered content.
