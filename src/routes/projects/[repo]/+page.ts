// Project detail data (src/routes/projects/[repo]/+page.ts).
//
// Orthogonal intents (maintained 2026-09-06): param resolution — the
// slug is the repo path with `/` replaced by `--` (org repos stay bare,
// owner-qualified repos read `jixoai--<name>`); README rendering — the
// locale-aware view (markdown → HTML at build time, marked, repo-relative
// URLs absolutized; readme-i18n, 2026-09-06); prerender enumeration —
// the entries export lists every roster slug so the prerenderer never
// depends on the link graph alone.
import { error } from '@sveltejs/kit';
import { projectBySlug, projects } from '$lib/projects';
import { readmeView } from '$lib/readme';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  projects.map((project) => ({ repo: project.slug }));

export const load: PageLoad = ({ params }) => {
  const project = projectBySlug.get(params.repo);
  if (!project) error(404, `Unknown project: ${params.repo}`);
  const readme = readmeView(project, 'en');
  return {
    project,
    readmeHtml: readme.html,
    readmeLang: readme.lang,
    readmeTranslated: readme.translated,
  };
};
