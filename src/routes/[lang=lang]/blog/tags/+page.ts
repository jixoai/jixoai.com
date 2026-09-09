// Locale tag-index data (src/routes/[lang=lang]/blog/tags/+page.ts).
import type { PageLoad } from './$types';
import type { Locale } from '$lib/i18n';

export const load: PageLoad = ({ params }) => ({ locale: params.lang as Locale });
