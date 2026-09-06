// Orthogonal intents (maintained 2026-09-06): vite build entry;
// [design-language] @tailwindcss/vite consumes the jixoai token sheet
// (CSS-first); [ai-export] llmsTxt() is the ONE llms.txt generation
// point for this plain-build site (generation lands in dist/, carried
// into public/ by build-site step 3 — never wire a second generator).
//
// Original request (2026-09-06): hub relaunch — registry chrome +
// projects/blog surfaces, AI export included. Same day, nine locales:
// the export covers every locale mirror (per-locale llms.txt indices +
// llms-full.txt following the default en only).
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
// registry item llms-txt installs at the project-relative
// vite-plugins/llms-txt.mjs (shadcn drops it in src/vite-plugins/ under
// svelte-kit — moved back to match the lock path contract).
// @ts-expect-error — untyped .mjs registry artifact
import { llmsTxt } from './vite-plugins/llms-txt.mjs';
import { imagetools } from 'vite-imagetools';
import { SITE_URL } from './src/lib/site.ts';

export default defineConfig({
  plugins: [
    // image pipeline (Owner law 2026-09-07): ?w=…&format=webp;png&as=picture imports
    imagetools(),
    sveltekit(),
    tailwindcss(),
    llmsTxt({
      distDir: 'dist',
      siteUrl: SITE_URL,
      title: 'jixoai',
      summary:
        'jixoai builds reliable infrastructure for the AI era — terminal runtimes, design languages, and developer tools that ship one honest contract at a time. The hub lists every flagship with its official site, live release version, and rendered README; the blog publishes lab notes as static pages.',
      // en at the root (default, unsegmented); the eight /[lang]/ mirrors
      // own one llms.txt index each; llms-full.txt follows en (a
      // mixed-language dump defeats retrieval). Section globs must also
      // match the mirrored paths (`*/projects/**` etc.).
      locale: {
        segments: ['zh', 'es', 'fr', 'de', 'ru', 'ja', 'ko', 'ar'],
        default: 'en',
      },
      sections: [
        { title: 'Pages', include: ['index.html', '*/index.html'] },
        { title: 'Projects', include: ['projects/**', '*/projects/**'] },
        { title: 'Blog', include: ['blog/**', '*/blog/**'] },
      ],
    }),
  ],
});
