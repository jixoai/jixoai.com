// Route matcher for /[lang=lang]/ mirrors (src/params/lang.ts).
// Accepts exactly the eight prefixed locales — en is NOT matched (it
// serves from the root, canonical), anything else 404s before the
// load functions run.
import type { ParamMatcher } from '@sveltejs/kit';
import { PREFIXED_LOCALES } from '$lib/i18n';

export const match: ParamMatcher = (param) =>
  (PREFIXED_LOCALES as readonly string[]).includes(param);
