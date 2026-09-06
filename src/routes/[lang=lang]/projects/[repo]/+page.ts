// Locale project-detail data (src/routes/[lang=lang]/projects/[repo]/+page.ts).
//
// Orthogonal intents (maintained 2026-09-06): same param resolution +
// README rendering contract as the root ./+page.ts, plus the locale
// propagation (readme-i18n, 2026-09-06: the README body prefers the
// locale's fetched translation, else the English fallback with
// translated=false for the "original (English)" pill); prerender
// enumeration — every locale × every roster slug, so the mirror never
// depends on the link graph.
import { error } from '@sveltejs/kit';
import { PREFIXED_LOCALES, type Locale } from '$lib/i18n';
import { projectBySlug, projects } from '$lib/projects';
import { readmeView } from '$lib/readme';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  PREFIXED_LOCALES.flatMap((lang) => projects.map((project) => ({ lang, repo: project.slug })));

export const load: PageLoad = ({ params }) => {
  const project = projectBySlug.get(params.repo);
  if (!project) error(404, `Unknown project: ${params.repo}`);
  const locale = params.lang as Locale;
  const readme = readmeView(project, locale);
  return {
    locale,
    project,
    readmeHtml: readme.html,
    readmeLang: readme.lang,
    readmeTranslated: readme.translated,
  };
};
