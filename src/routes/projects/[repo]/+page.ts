// Project detail data (src/routes/projects/[repo]/+page.ts).
//
// Orthogonal intents (maintained 2026-09-06): param resolution — the
// slug is the repo path with `/` replaced by `--` (org repos stay bare,
// owner-qualified repos read `jixoai--<name>`); README rendering — markdown →
// HTML at build time (marked, repo-relative URLs absolutized); prerender
// enumeration — the entries export lists every roster slug so the
// prerenderer never depends on the link graph alone.
import { error } from '@sveltejs/kit';
import { projectBySlug, projects } from '$lib/projects';
import { renderReadme } from '$lib/readme';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  projects.map((project) => ({ repo: project.slug }));

export const load: PageLoad = ({ params }) => {
  const project = projectBySlug.get(params.repo);
  if (!project) error(404, `Unknown project: ${params.repo}`);
  return {
    project,
    readmeHtml: renderReadme(project),
  };
};
