/**
 * Site-wide constants (src/lib/site.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): organization-level identity
 * (domain, org URL, mission) + the blog surface size on the home strip.
 * Project roster data lives in projects.manifest.json → generated data,
 * never here.
 */

export const SITE_DOMAIN = 'jixoai.com';
export const SITE_URL = 'https://jixoai.com';
export const GITHUB_ORG_URL = 'https://github.com/jixoai';
/** Registry default brand hue: 0 (the jixoai organization red). */
export const BRAND_HUE = 0;
export const MISSION = 'Reliable infrastructure for the AI era.';
/** Latest-posts strip on the home page (blog index always lists all). */
export const HOME_POSTS_COUNT = 3;
