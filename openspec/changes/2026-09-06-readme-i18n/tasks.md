## 1. Pipeline

- [x] 1.1 `scripts/fetch-projects.mjs`: fetch `README-<lang>.md` for
  zh es fr de ru ja ko ar per repo, concurrently, through the existing
  auth ladder; 404 → null, transport failure → previous generated value;
  generated data carries `readmeTranslations` (all eight keys).
- [x] 1.2 `GeneratedProject` type gains `readmeTranslations`.

## 2. Locale-aware detail surface

- [x] 2.1 `readmeView(project, locale)` in `src/lib/readme.ts`:
  translation-first selection with English fallback; both project-detail
  route loaders consume it (root en + the eight mirrors).
- [x] 2.2 README container `lang` attribute follows the content language.
- [x] 2.3 Fallback pill (locale ≠ en on the English original):
  `projectDetail.originalLanguage` in `schema.ts` + all nine
  dictionaries; renders once above the README body.
- [x] 2.4 Chinese signals only on Chinese content: no per-locale
  "version" label beyond the fallback pill that names English; the
  rendered markdown itself is the language of record.

## 3. Verify

- [x] 3.1 Fetch: six repos × zh translation present in the generated
  data; other languages null until the repos add them.
- [x] 3.2 Headless spot-checks: `/zh/projects/*` Chinese README on all
  six; `/ar/projects/opendweb/` English fallback + pill; `lang` attrs.
- [x] 3.3 `npm run build` green ×2; llms export byte-identical.
