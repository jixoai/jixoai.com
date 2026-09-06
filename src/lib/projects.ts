/**
 * Project hub data access (src/lib/projects.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): typed views over the
 * build-time generated data (src/lib/projects.generated.json, written by
 * scripts/fetch-projects.mjs from projects.manifest.json) — the roster is
 * configuration, this module only shapes it for routes. Detail-page slugs
 * are the repo path with `/` replaced by `--` (org repos stay bare).
 * Curated-copy tier (2026-09-06 nine-locales change): the description is
 * locale-aware — zh renders the manifest's descriptionZh, every other
 * locale renders description (localization spec, no silent mixing).
 */

import generated from './projects.generated.json';
import { localeHref, type Locale } from './i18n';

export interface GeneratedProject {
  /** owner-aware repo path from the manifest: "opentray" | "jixoai/opendweb" */
  repo: string;
  /** route slug: repo path with `/` → `--` (org repos stay bare) */
  slug: string;
  name: string;
  description: string;
  /** curated Chinese description from the manifest, null when absent */
  descriptionZh: string | null;
  /** official-site URL from the manifest, null when absent */
  site: string | null;
  /** asset path under static/, null → typographic wordmark fallback */
  logo: string | null;
  /** raw latest-release tag, null when the repo has no release */
  tag: string | null;
  /** display version: v-prefixed semver, "v—" when no release */
  version: string;
  repoUrl: string;
  releaseUrl: string | null;
  /** README markdown fetched at build time, null when unreachable */
  readme: string | null;
}

export interface GeneratedData {
  fetchedAt: string;
  projects: GeneratedProject[];
}

export const projectsData = generated as GeneratedData;
export const projects = projectsData.projects;
export const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

/** Route helpers — directory pages carry the trailing slash (trailingSlash
 *  'always'; flat files only for the home page); the locale-aware form
 *  prefixes the /[lang]/ mirror (en keeps the stable root URL). */
export const projectsUrl = (slug: string, locale: Locale = 'en'): string =>
  localeHref(locale, `/projects/${slug}/`);

/** Locale-aware curated description: zh → descriptionZh (manifest
 *  tier), every other locale → description. */
export const localizedDescription = (project: GeneratedProject, locale: Locale): string =>
  locale === 'zh' && project.descriptionZh ? project.descriptionZh : project.description;
