// Locale tag-group data (src/routes/[lang=lang]/blog/tags/[tag]/+page.ts).
//
// Orthogonal intents (2026-09-08): same tag resolution as the root
// ./+page.ts plus locale propagation; prerender enumeration — every
// locale × every tag that exists IN THAT LOCALE (not the global union:
// tagsForLocale derives from the mirror-deduped, locale-preferred
// listing, so a locale that has no post under a tag has no page for
// it, and the 404 stays truthful).
import { error } from '@sveltejs/kit';
import { PREFIXED_LOCALES, type Locale } from '$lib/i18n';
import { tagGroupFor, tagsForLocale } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  PREFIXED_LOCALES.flatMap((lang) => tagsForLocale(lang).map((group) => ({ lang, tag: group.tag })));

export const load: PageLoad = ({ params }) => {
  const locale = params.lang as Locale;
  const group = tagGroupFor(locale, params.tag);
  if (!group) error(404, `Unknown tag: ${params.tag}`);
  return { locale, group };
};
