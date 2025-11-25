// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://jixoai.com',
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, [remarkToc, { heading: '目录|Table of Contents|TOC' }]],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }]
      ],
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'github-dark' }
    }),
    sitemap()
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});