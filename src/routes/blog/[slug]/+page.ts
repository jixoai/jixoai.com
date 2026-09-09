// Blog post data (src/routes/blog/[slug]/+page.ts).
//
// Orthogonal intents (maintained 2026-09-06): param resolution against
// the build-time discovered post map; markdown → HTML rendering (marked,
// first-party content, no sanitization by spec); prerender enumeration —
// the entries export lists every discovered slug.
import { error } from '@sveltejs/kit';
import { blogSlugs, postForLocale, renderMarkdown } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

// One entry per ARTICLE (not per language variant): every variant of an
// article shares its slug — the language is the site prefix.
export const entries: EntryGenerator = () => blogSlugs.map((slug) => ({ slug }));

export const load: PageLoad = ({ params }) => {
  // the root site is the international one: always the English variant
  const post = postForLocale('en', params.slug);
  if (!post) error(404, `Unknown post: ${params.slug}`);
  return { post, html: renderMarkdown(post.markdown) };
};
