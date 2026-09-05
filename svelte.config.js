// Orthogonal intents (maintained 2026-09-06): adapter-static contract
// (pages/assets → dist/, strict); prerender discovery — since the
// 2026-09-06 relaunch the site is a route tree (/projects/<slug>/,
// /blog/<slug>/): the three directory roots seed the crawl and the
// dynamic routes enumerate themselves via their `entries` exports.
// scripts/build-site.mjs copies dist/ into public/ after the vite build
// (the GitHub Pages artifact root — unchanged pipeline contract).
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({ script: true }),
  kit: {
    adapter: adapter({ pages: 'dist', assets: 'dist', strict: true }),
    prerender: {
      crawl: true,
      entries: ['/', '/projects/', '/blog/'],
    },
  },
};

export default config;
