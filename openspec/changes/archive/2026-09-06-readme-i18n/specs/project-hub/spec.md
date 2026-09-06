## ADDED Requirements

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
