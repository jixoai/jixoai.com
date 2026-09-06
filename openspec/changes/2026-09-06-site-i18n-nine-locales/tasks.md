## 1. Locale infrastructure

- [x] 1.1 Locale routing: `en` at root (canonical) + `zh es fr de ru ja ko
  ar` at `/[lang]/`, mirroring home, projects index/detail, blog
  index/post; `lang` matcher; `dir="rtl"` for `ar`; per-locale `<html
  lang>` in prerendered output (postbuild or layout strategy — the
  agent's choice, but prerendered pages must ship the right attrs with no
  client flash).
- [x] 1.2 hreflang alternates (9 + x-default → root) on every page.
- [x] 1.3 `npx jixoai-ui add language-switcher` (verify disk landed), wire
  into the header; switching preserves the current page across locales.
- [x] 1.4 i18n dictionary module with the Owner-provided canonical
  tagline/summary/descriptionZh translations used VERBATIM; short UI
  labels translated consistently; en strings extracted from current copy
  without regression.

## 2. Content + repo surface

- [x] 2.1 Manifest: add `descriptionZh` per project; zh locale renders it,
  others render `description`.
- [x] 2.2 Blog: posts render under all locales with authored language
  (frontmatter `lang` optional); index lists all posts.
- [x] 2.3 Add root `README.md` + `README-zh.md` (concise, bilingual pair
  with cross-links).

## 3. Verification

- [x] 3.1 `npm run build` green; spot-check under public/: root en,
  /zh/, /ar/ (RTL attrs + no layout breakage), /ja/projects/opendweb/,
  hreflang tags present; llms export covers all locales, byte-identical
  re-run.
- [x] 3.2 Headless render check on root + zh + ar pages (0 console
  errors, dir/lang correct).
- [x] 3.3 NOTES.md deviations; friction log reported.
