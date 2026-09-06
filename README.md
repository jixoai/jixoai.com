# jixoai.com

[中文版](README-zh.md)

The jixoai organization hub — <https://jixoai.com>: a config-driven project
center (official sites, logos, rendered READMEs, live release versions) and a
static blog, in nine locales (en at the root; zh / es / fr / de / ru / ja /
ko / ar under `/[lang]/`, Arabic RTL). SvelteKit + adapter-static, deployed
to GitHub Pages; chrome ships from the `@jixoai` registry
(<https://ui.jixoai.com>).

## Site structure

```text
/                     home (en, canonical)      /[lang]/        locale mirrors
/projects/            flagship roster grid      /[lang]/projects/
/projects/<repo>/     README detail page        /[lang]/projects/<repo>/
/blog/                blog index                /[lang]/blog/
/blog/<slug>/         blog post                 /[lang]/blog/<slug>/
```

Every page carries per-locale `<html lang>` / `dir`, hreflang alternates
(9 locales + x-default → root, absolute URLs), and a language switcher that
preserves the current page.

Localization tiers (documented, no silent mixing):

1. UI chrome + marketing copy — fully localized in all 9
   (`src/lib/i18n/locales/*`; the Owner-provided canonical tagline/summary
   translations are used verbatim).
2. Curated project descriptions — `description` + `descriptionZh` in
   `projects.manifest.json`; zh renders `descriptionZh`, everything else
   renders `description`.
3. README bodies + blog posts — rendered as-authored under every locale.

## Build

```bash
npm install
npm run build     # 3-step pipeline (scripts/build-site.mjs):
                  #  1. fetch-projects  → src/lib/projects.generated.json
                  #                       (GitHub Releases + READMEs)
                  #  2. vite build      → dist/ (adapter-static prerender)
                  #  3. copy dist/ → public/  (the Pages artifact)
npm run dev       # dev server (fetches first)
```

Deploy is the unchanged GitHub Actions workflow: it runs `npm run build`
and uploads `public/`.

## Configuration seams

| Seam | File |
| --- | --- |
| Project roster (repo / names / descriptions / sites / logos) | `projects.manifest.json` |
| Locale set + dictionaries (copy, labels) | `src/lib/i18n/` (`index.ts`, `locales/*.ts`) |
| Route → locale / hreflang / switcher helpers | `src/lib/i18n/index.ts` |
| Blog posts (markdown + frontmatter) | `content/blog/*.md` |
| Prerender seeds (incl. locale roots) | `svelte.config.js` |
| llms.txt export (locales, sections) | `vite.config.ts` |
| Registry chrome (locked items, hue 0) | `jixoai-ui.lock`, `components.json` |

Adding a project = a manifest edit plus a logo asset under `static/logos/`;
adding a locale = one dictionary file plus the lists in
`src/lib/i18n/index.ts` (and the prerender seeds / llms segments).

## License

MIT — © jixoai
