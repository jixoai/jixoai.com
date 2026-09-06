// Locale projects-index data (src/routes/[lang=lang]/projects/+page.ts).
import type { PageLoad } from './$types';
import type { Locale } from '$lib/i18n';

export const load: PageLoad = ({ params }) => ({ locale: params.lang as Locale });
