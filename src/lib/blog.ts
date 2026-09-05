/**
 * Static blog engine (src/lib/blog.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): 1) discover first-party
 * markdown posts under content/blog/ at BUILD time (vite glob, raw);
 * 2) parse the frontmatter subset (title/date/description/author/tags);
 * 3) render markdown with marked. Zero server runtime, zero client
 * fetches — everything below runs inside the prerender.
 *
 * Content is first-party (jixoai authors), so no HTML sanitization is
 * applied on purpose (blog spec, 2026-09-06).
 */

import { marked } from 'marked';

export interface BlogPost {
  /** filename without .md — the URL slug */
  slug: string;
  title: string;
  /** ISO date from the frontmatter, sorted newest-first */
  date: string;
  description: string;
  author: string;
  tags: string[];
  /** markdown body (frontmatter stripped) */
  markdown: string;
}

/** Parse the flat frontmatter subset: `key: value` lines between the
 *  leading `---` fences. tags accepts both `a, b` and `[a, b]` forms. */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line
      .slice(colon + 1)
      .trim()
      .replace(/^\[|\]$/g, '');
    if (key) data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function invalid(slug: string, reason: string): Error {
  return new Error(`content/blog/${slug}.md: ${reason}`);
}

const files = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const posts: BlogPost[] = Object.entries(files).map(([path, raw]) => {
  const slug = path.slice(path.lastIndexOf('/') + 1, -'.md'.length);
  const { data, body } = parseFrontmatter(raw);
  const title = data.title?.trim();
  const date = data.date?.trim();
  if (!title) throw invalid(slug, 'frontmatter `title` is required');
  if (!date || Number.isNaN(Date.parse(date))) {
    throw invalid(slug, 'frontmatter `date` must be an ISO date (YYYY-MM-DD)');
  }
  return {
    slug,
    title,
    date,
    description: data.description?.trim() ?? '',
    author: data.author?.trim() || 'jixoai',
    tags: (data.tags ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    markdown: body.trim(),
  };
});

/** All posts, newest first (the blog index order; ties fall back to slug). */
export const blogPosts: readonly BlogPost[] = [...posts].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date) || a.slug.localeCompare(b.slug),
);

export const blogPostBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

/** Render markdown to HTML at build time (marked, gfm tables/code). */
export const renderMarkdown = (markdown: string): string =>
  marked.parse(markdown, { async: false, gfm: true, breaks: false });

/** "2026-09-06" → "2026-09-06" display form (ISO in, ISO out — the
 *  authored form is already the display form). */
export const displayDate = (iso: string): string => iso;
