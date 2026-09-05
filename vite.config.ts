// Orthogonal intents (maintained 2026-09-06): vite build entry;
// [design-language] @tailwindcss/vite consumes the jixoai token sheet
// (CSS-first); [ai-export] llmsTxt() is the ONE llms.txt generation
// point for this plain-build site (generation lands in dist/, carried
// into public/ by build-site step 3 — never wire a second generator).
//
// Original request (2026-09-06): hub relaunch — registry chrome +
// projects/blog surfaces, AI export included.
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
// registry item llms-txt installs at the project-relative
// vite-plugins/llms-txt.mjs (shadcn drops it in src/vite-plugins/ under
// svelte-kit — moved back to match the lock path contract).
// @ts-expect-error — untyped .mjs registry artifact
import { llmsTxt } from './vite-plugins/llms-txt.mjs';
import { SITE_URL } from './src/lib/site.ts';

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
    llmsTxt({
      distDir: 'dist',
      siteUrl: SITE_URL,
      title: 'jixoai',
      summary:
        'jixoai builds reliable infrastructure for the AI era — terminal runtimes, design languages, and developer tools that ship one honest contract at a time. The hub lists every flagship with its official site, live release version, and rendered README; the blog publishes lab notes as static pages.',
      sections: [
        { title: 'Pages', include: ['index.html'] },
        { title: 'Projects', include: ['projects/**'] },
        { title: 'Blog', include: ['blog/**'] },
      ],
    }),
  ],
});
