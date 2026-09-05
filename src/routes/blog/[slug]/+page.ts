// Blog post data (src/routes/blog/[slug]/+page.ts).
//
// Orthogonal intents (maintained 2026-09-06): param resolution against
// the build-time discovered post map; markdown → HTML rendering (marked,
// first-party content, no sanitization by spec); prerender enumeration —
// the entries export lists every discovered slug.
import { error } from '@sveltejs/kit';
import { blogPostBySlug, blogPosts, renderMarkdown } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  blogPosts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
  const post = blogPostBySlug.get(params.slug);
  if (!post) error(404, `Unknown post: ${params.slug}`);
  return { post, html: renderMarkdown(post.markdown) };
};
