/**
 * Site-wide constants (src/lib/site.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): organization-level
 * identity (domain, org URL) + the blog surface size on the home strip.
 * The mission copy moved into the locale dictionaries
 * (src/lib/i18n/locales/*) with the 2026-09-06 nine-locale change —
 * mission/home copy now has exactly one home per locale. Project
 * roster data lives in projects.manifest.json → generated data, never
 * here.
 */

export const SITE_DOMAIN = 'jixoai.com';
export const SITE_URL = 'https://jixoai.com';
export const GITHUB_ORG_URL = 'https://github.com/jixoai';
/** Registry default brand hue: 0 (the jixoai organization red). */
export const BRAND_HUE = 0;
/** Latest-posts strip on the home page (blog index always lists all). */
export const HOME_POSTS_COUNT = 3;
