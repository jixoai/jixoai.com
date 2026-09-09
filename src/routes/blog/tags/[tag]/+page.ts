// Tag-group data (src/routes/blog/tags/[tag]/+page.ts).
//
// Orthogonal intents (2026-09-08): resolve one tag against the
// build-time tag groups of the en listing; prerender enumeration — the
// entries export lists every tag that exists in that listing (a tag
// unknown to a locale is a 404 there, which is exactly why each
// locale's route enumerates only its own tags).
import { error } from '@sveltejs/kit';
import { tagGroupFor, tagsForLocale } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => tagsForLocale('en').map((group) => ({ tag: group.tag }));

export const load: PageLoad = ({ params }) => {
  const group = tagGroupFor('en', params.tag);
  if (!group) error(404, `Unknown tag: ${params.tag}`);
  return { group };
};
