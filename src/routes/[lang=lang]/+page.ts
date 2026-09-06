// Locale home data (src/routes/[lang=lang]/+page.ts).
//
// Orthogonal intents (maintained 2026-09-06): locale propagation — the
// matcher already guarantees params.lang is one of the eight mirrored
// locales; this load only shapes it for the typed page props.
import type { PageLoad } from './$types';
import type { Locale } from '$lib/i18n';

export const load: PageLoad = ({ params }) => ({ locale: params.lang as Locale });
