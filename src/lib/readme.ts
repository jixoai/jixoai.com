/**
 * Project README rendering (src/lib/readme.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): render the build-time
 * fetched README markdown with marked, absolutizing repo-relative URLs
 * against the repository (images → raw.githubusercontent, links →
 * github.com blob view) so vendored READMEs hyperlink correctly from the
 * hub. First-party content: no sanitization (project-hub spec).
 *
 * Two-pass URL handling: markdown-level image/link tokens ride marked
 * renderer hooks (adding target=_blank on outbound links); raw HTML
 * embeds inside the README (opentray's <img src="docs/…">, iweb's
 * favicon include) pass the lexer untouched, so a post-pass rewrites
 * remaining relative src/href attributes in the final HTML.
 */

import { Marked } from 'marked';
import type { GeneratedProject } from './projects';

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

/** Post-pass for raw HTML embeds: rewrite relative src/href attributes
 *  the lexer never saw as markdown tokens (img src → raw, else blob). */
function absolutizeRawHtml(html: string, repo: string): string {
  return html.replace(/\b(src|href)="([^"]*)"/g, (match, attr: string, value: string) => {
    if (isAbsolute(value)) return match;
    return `${attr}="${escapeAttr(absolutize(value, repo, attr === 'src'))}"`;
  });
}

/** A per-call Marked instance keeps the URL overrides scoped (the shared
 *  marked singleton stays pristine for the blog renderer). */
export function renderReadme(project: GeneratedProject): string | null {
  if (!project.readme) return null;
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
        const resolved = absolutize(String(token.href), repo, false);
        const external = resolved.startsWith('http');
        const title = token.title ? ` title="${escapeAttr(String(token.title))}"` : '';
        const target = external ? ' target="_blank" rel="noreferrer"' : '';
        return `<a href="${escapeAttr(resolved)}"${title}${target}>${this.parser.parseInline(token.tokens)}</a>`;
      },
    },
  });
  const html = md.parse(project.readme, { async: false }) as string;
  return absolutizeRawHtml(html, repo);
}
