// Orthogonal intents (maintained 2026-09-06): adapter-static contract
// (pages/assets → dist/, strict); prerender discovery — the site is a
// route tree (/projects/<slug>/, /blog/<slug>/) PLUS eight /[lang]/
// mirrors (2026-09-06 nine-locales change): every locale's directory
// roots seed the crawl and the dynamic routes enumerate themselves via
// their `entries` exports (locale × slug cross products). 2026-09-08
// tag grouping: /blog/tags/ joins the seeded roots and each
// /blog/tags/[tag]/ route enumerates its own tags via `entries`.
// scripts/build-site.mjs copies dist/ into public/ after the vite build
// (the GitHub Pages artifact root — unchanged pipeline contract).
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const PREFIXED_LOCALES = ['zh', 'es', 'fr', 'de', 'ru', 'ja', 'ko', 'ar'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({ script: true }),
  kit: {
    adapter: adapter({ pages: 'dist', assets: 'dist', strict: true }),
    prerender: {
      crawl: true,
      entries: [
        '/',
        '/projects/',
        '/blog/',
        '/blog/tags/',
        ...PREFIXED_LOCALES.flatMap((lang) => [
          `/${lang}/`,
          `/${lang}/projects/`,
          `/${lang}/blog/`,
          `/${lang}/blog/tags/`,
        ]),
      ],
    },
  },
};

export default config;
