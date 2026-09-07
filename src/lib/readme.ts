/**
 * Project README rendering (src/lib/readme.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): render the build-time
 * fetched README markdown with marked, absolutizing repo-relative URLs
 * against the repository (images → raw.githubusercontent, links →
 * github.com blob view) so vendored READMEs hyperlink correctly from the
 * hub. First-party content: no sanitization (project-hub spec).
 * (2026-09-06 readme-i18n) locale-aware body selection: locale L renders
 * readmeTranslations[L], falling back to the default (English) README
 * with translated=false so the page can badge the fallback — the
 * container lang tag follows the CONTENT language (CJK typography).
 *
 * Two-pass URL handling: markdown-level image/link tokens ride marked
 * renderer hooks (adding target=_blank on outbound links); raw HTML
 * embeds inside the README (opentray's <img src="docs/…">, iweb's
 * favicon include) pass the lexer untouched, so a post-pass rewrites
 * remaining relative src/href attributes in the final HTML.
 *
 * (2026-09-07 walkthrough fix E) double-title law: when the README's
 * FIRST element is an h1 approximately naming the project (its text
 * contains the project name case-insensitively, or vice versa), that
 * h1 is dropped — the detail page's identity header already carries
 * the name, the rendered body must not repeat it.
 */

import { Marked } from 'marked';
import type { GeneratedProject } from './projects';
import type { Locale } from './i18n';
import { dict, localeHref } from './i18n';

/** The rendered-README contract for a project detail page: the HTML,
 *  the content language (container lang attribute), and whether the
 *  markdown matched the UI locale (false = English fallback, page
 *  shows the "original (English)" pill when locale ≠ en). */
export interface ReadmeView {
  html: string | null;
  lang: string;
  translated: boolean;
}

/** en renders the default README (lang en, no pill); every other
 *  locale prefers its fetched translation, else falls back to the
 *  default README with translated=false. */
export function readmeView(project: GeneratedProject, locale: Locale): ReadmeView {
  const translation = locale === 'en' ? null : (project.readmeTranslations?.[locale] ?? null);
  const markdown = translation ?? project.readme;
  return {
    html: markdown ? renderReadme(project, markdown) : null,
    lang: translation ? locale : 'en',
    translated: translation !== null || locale === 'en',
  };
}

const isAbsolute = (href: string): boolean =>
  href.startsWith('#') ||
  href.startsWith('/') ||
  href.startsWith('http://') ||
  href.startsWith('https://') ||
  href.startsWith('mailto:') ||
  /^[a-z]+:/i.test(href);

/** Absolutize one repo-relative reference. Images deep-link the raw
 *  content; everything else lands on the blob view. */
function absolutize(href: string, repo: string, image: boolean): string {
  if (!href || isAbsolute(href)) return href;
  const clean = href.replace(/^\.\//, '');
  return image
    ? `https://raw.githubusercontent.com/${repo}/HEAD/${clean}`
    : `https://github.com/${repo}/blob/HEAD/${clean}`;
}

const escapeAttr = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Top-level README variant filename: `README.md` (default) or
 *  `README-<lang>.md` where <lang> is a hub locale. Returns the locale
 *  (null = default README), undefined = not a mappable README file. */
function readmeLocaleOf(filename: string): Locale | null | undefined {
  if (/^readme\.(?:md|markdown)$/i.test(filename)) return null;
  const suffix = /^readme-([a-z-]+)\.(?:md|markdown)$/i.exec(filename)?.[1];
  return (suffix && suffix in dict ? (suffix as Locale) : undefined);
}

/** README self-link interception (Owner 2026-09-07): links pointing at
 *  the repository's own README files — relative links the absolutizer
 *  just turned into github.com blob URLs, or absolute ones authored
 *  straight into the README — resolve to the hub's own locale pages
 *  instead of bouncing readers to GitHub:
 *
 *    github.com/<repo>/blob/<any-ref>/README.md    → /projects/<slug>/
 *    github.com/<repo>/blob/<any-ref>/README-zh.md → /zh/projects/<slug>/
 *
 *  marky-markdown solves the sibling problem on npmjs by rewriting
 *  repo-relative URLs against the package's repository; here the
 *  rewrite target is the hub's README-as-page mirrors, so a README's
 *  "中文版" affordance becomes in-site navigation (and the /zh mirror's
 *  "English" link lands back on the default page). Only TOP-LEVEL
 *  README files of the SAME repo qualify; anything else (EXAMPLE.md,
 *  docs/README.md, other repos, unknown language suffixes) keeps its
 *  GitHub URL. */
function internalizeReadmeLink(href: string, repo: string, slug: string): string {
  const prefix = `https://github.com/${repo}/blob/`;
  if (!href.startsWith(prefix)) return href;
  const segments = href.slice(prefix.length).replace(/[?#].*$/, '').split('/'); // <ref>/<path…>
  if (segments.length !== 2) return href; // subdirectory — not a top-level file
  const locale = readmeLocaleOf(segments[1]);
  if (locale === undefined) return href;
  return localeHref(locale ?? 'en', `/projects/${slug}/`);
}

/** Post-pass for raw HTML embeds: rewrite relative src/href attributes
 *  the lexer never saw as markdown tokens (img src → raw, else blob);
 *  hrefs additionally pass the README self-link interception — relative
 *  ones after absolutization, absolute ones as authored. */
function absolutizeRawHtml(html: string, repo: string, slug: string): string {
  return html.replace(/\b(src|href)="([^"]*)"/g, (match, attr: string, value: string) => {
    if (attr !== 'src' && attr !== 'href') return match;
    const internal = attr === 'href' ? internalizeReadmeLink(value, repo, slug) : value;
    if (internal !== value) return `${attr}="${escapeAttr(internal)}"`;
    if (isAbsolute(value)) return match;
    const resolved = absolutize(value, repo, attr === 'src');
    if (attr === 'href') {
      const rewritten = internalizeReadmeLink(resolved, repo, slug);
      if (rewritten !== resolved) return `${attr}="${escapeAttr(rewritten)}"`;
    }
    return `${attr}="${escapeAttr(resolved)}"`;
  });
}

/** Drop the README's FIRST h1 when it duplicates the project name
 *  (fix E): comparison is case-insensitive containment either way on
 *  an alphanumerics-only normalization — "jixoai-ui" matches
 *  "jixoai-ui", "OpenSpec UI" matches "OpenSpecUI". Vendored READMEs
 *  often open with an HTML comment or a wrapper div before the title,
 *  so the h1 need not be the first ELEMENT — but it must be the first
 *  HEADING (nothing h1–h3 before it), which keeps deep section titles
 *  out of the rule's reach. */
function stripDuplicateTitle(html: string, name: string): string {
  const first = /<h1[^>]*>[\s\S]*?<\/h1>/.exec(html);
  if (!first) return html;
  const earlierHeading = /<h[123][^>]*>/.exec(html.slice(0, first.index));
  if (earlierHeading) return html;
  const normalize = (value: string): string =>
    value
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z#0-9]+;/gi, ' ')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  const heading = normalize(first[0]);
  const target = normalize(name);
  if (!heading || !target) return html;
  return heading.includes(target) || target.includes(heading)
    ? html.slice(0, first.index) + html.slice(first.index + first[0].length)
    : html;
}

/** A per-call Marked instance keeps the URL overrides scoped (the shared
 *  marked singleton stays pristine for the blog renderer). */
export function renderReadme(project: GeneratedProject, markdown: string): string {
  const repo = project.repo.includes('/') ? project.repo : `jixoai/${project.repo}`;
  const md = new Marked({
    gfm: true,
    breaks: false,
    renderer: {
      // token-based renderer hooks (marked's classic class signatures
      // retired; these receive the lexed token)
      image(token) {
        const src = absolutize(String(token.href), repo, true);
        return `<img src="${escapeAttr(src)}" alt="${escapeAttr(String(token.text ?? ''))}" loading="lazy" />`;
      },
      link(token) {
        // README self-links internalize to the hub's own locale pages
        // BEFORE the external test, so they stay in-site (no _blank)
        const resolved = internalizeReadmeLink(
          absolutize(String(token.href), repo, false),
          repo,
          project.slug,
        );
        const external = resolved.startsWith('http');
        const title = token.title ? ` title="${escapeAttr(String(token.title))}"` : '';
        const target = external ? ' target="_blank" rel="noreferrer"' : '';
        return `<a href="${escapeAttr(resolved)}"${title}${target}>${this.parser.parseInline(token.tokens)}</a>`;
      },
    },
  });
  const html = md.parse(markdown, { async: false }) as string;
  return stripDuplicateTitle(absolutizeRawHtml(html, repo, project.slug), project.name);
}
