import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({ script: true }),
  kit: {
    adapter: adapter({ pages: 'dist', assets: 'dist', strict: true }),
    // Single flat page: nothing to crawl; scripts/build-site.mjs copies dist/
    // into public/ after the vite build (GitHub Pages artifact root).
    prerender: {
      crawl: false,
      entries: ['/'],
    },
  },
};

export default config;
