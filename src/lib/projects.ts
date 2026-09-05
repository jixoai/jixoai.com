/**
 * Project hub data access (src/lib/projects.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): typed views over the
 * build-time generated data (src/lib/projects.generated.json, written by
 * scripts/fetch-projects.mjs from projects.manifest.json) — the roster is
 * configuration, this module only shapes it for routes. Detail-page slugs
 * are the repo path with `/` replaced by `--` (org repos stay bare).
 */

import generated from './projects.generated.json';

export interface GeneratedProject {
  /** owner-aware repo path from the manifest: "opentray" | "Gaubee/dweb" */
  repo: string;
  /** route slug: repo path with `/` → `--` (org repos stay bare) */
  slug: string;
  name: string;
  description: string;
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
 *  'always'; flat files only for the home page). */
export const projectsUrl = (slug: string): string => `/projects/${slug}/`;
