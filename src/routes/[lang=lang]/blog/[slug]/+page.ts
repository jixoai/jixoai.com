// Locale blog-post data (src/routes/[lang=lang]/blog/[slug]/+page.ts).
//
// Orthogonal intents (maintained 2026-09-06): same post resolution +
// markdown rendering contract as the root ./+page.ts, plus locale
// propagation; prerender enumeration — every locale × every post.
import { error } from '@sveltejs/kit';
import { PREFIXED_LOCALES, type Locale } from '$lib/i18n';
import { blogSlugs, postForLocale, renderMarkdown } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

// locale × ARTICLE (not locale × variant — see the root route).
export const entries: EntryGenerator = () =>
  PREFIXED_LOCALES.flatMap((lang) => blogSlugs.map((slug) => ({ lang, slug })));

export const load: PageLoad = ({ params }) => {
  const locale = params.lang as Locale;
  const post = postForLocale(locale, params.slug);
  if (!post) error(404, `Unknown post: ${params.slug}`);
  return { locale, post, html: renderMarkdown(post.markdown) };
};
