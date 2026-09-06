// Locale blog-post data (src/routes/[lang=lang]/blog/[slug]/+page.ts).
//
// Orthogonal intents (maintained 2026-09-06): same post resolution +
// markdown rendering contract as the root ./+page.ts, plus locale
// propagation; prerender enumeration — every locale × every post.
import { error } from '@sveltejs/kit';
import { PREFIXED_LOCALES, type Locale } from '$lib/i18n';
import { blogPostBySlug, blogPosts, renderMarkdown } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  PREFIXED_LOCALES.flatMap((lang) => blogPosts.map((post) => ({ lang, slug: post.slug })));

export const load: PageLoad = ({ params }) => {
  const post = blogPostBySlug.get(params.slug);
  if (!post) error(404, `Unknown post: ${params.slug}`);
  return { locale: params.lang as Locale, post, html: renderMarkdown(post.markdown) };
};
