> Orthogonal intents (maintained 2026-09-06 Asia/Shanghai): project
> README translations (per-repo README-<lang>.md) through the hub —
> fetch, locale-aware rendering, honest fallback.
>
> Original request (2026-09-06 Asia/Shanghai, Owner)：项目元数据要涵盖
> 多语言 README——切语言时显示对应语言版本，缺失则回退默认。

## Why

The six flagship repos each maintain a `README-zh.md` alongside the
default `README.md`, but the hub rendered the English original under
every locale — a zh visitor read Chinese chrome around an English body,
and dweb's English README even carries its own `[中文版]` pointer that the
hub never followed. README content is the largest surface on every
project detail page; it must follow the same locale-awareness as the
curated description tier, with an honest signal when it cannot.

## What Changes

- **Fetch** (`scripts/fetch-projects.mjs`): per repo, fetch
  `README-<lang>.md` for the eight non-en hub locales (zh es fr de ru ja
  ko ar) concurrently, same auth ladder as the default README (token →
  gh → anonymous); 404 = "no translation" → null; transport failure
  keeps the previous generated value (a stale build beats a broken
  build). Generated data gains `readmeTranslations` (all eight keys,
  null where absent).
- **Rendering** (`src/lib/readme.ts` — `readmeView`): locale L renders
  `readmeTranslations[L]`; L without a translation falls back to the
  default (English) README. The README container's `lang` attribute
  follows the CONTENT language (correct CJK typography inside an
  unchanged page locale).
- **Fallback badge**: when L ≠ en renders the English fallback, a small
  one-time pill labels the source — `projectDetail.originalLanguage`
  added to the dictionary schema + all nine locales ("原文（English）" /
  "Original (English)" / …). A "Chinese version" signal can only ever
  appear when the rendered content actually is Chinese (the zh pill
  exists only in the fallback direction that names English; translated
  pages carry no pill).
- **Tier law update**: README bodies leave localization tier 3 and gain
  their own tier — locale-aware with explicit fallback; blog posts stay
  as-authored under every locale (tier 3 unchanged).

## Capabilities

### Modified Capabilities

- `localization`: tiered content localization — README bodies split out
  of the as-authored tier into the locale-aware-with-fallback tier.

### New Capabilities

- `project-hub`: README translation pipeline + locale-aware detail-page
  rendering (ADDED requirement below).

## Rejected

- Auto-translation of missing READMEs (machine output on flagship pages
  violates the evidence-gated voice; null + pill is the honest state).
- Locale-specific README filenames beyond `README-<lang>.md` (the family
  convention; no case-insensitive discovery needed — the exact filename
  is pinned).

## Verification

- Fetch log: all six repos land their zh translation
  (unipty/openspecui/ui/opentray/opendweb/openiweb).
- `/zh/projects/*` renders the Chinese README on all six detail pages;
  `/ar/projects/opendweb/` renders the English fallback + the
  "الأصل (English)" pill; `lang` attributes follow content.
- `npm run build` green twice, llms export byte-identical.
