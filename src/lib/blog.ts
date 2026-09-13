/**
 * Static blog engine (src/lib/blog.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): 1) discover first-party
 * markdown posts under content/blog/ at BUILD time (vite glob, raw);
 * 2) parse the frontmatter subset (title/date/description/author/tags);
 * 3) render markdown through the registry <Markdown> component
 *    (post bodies; project readmes keep their own marked surface); 4)
 *    release linkage — optional
 * repo+version frontmatter validated against projects.manifest.json and
 * resolved to a GitHub Release permalink for the version pill
 * (release-blog spec: unknown repo = hard build error); 5) language
 * governance (2026-09-06 mobile audit) — postLang/postDir/
 * postsForLocale: the authored-language views behind the locale-first
 * index order, the language badge, the summary bidi isolation and the
 * "written in …" notice (bodies stay as-authored under every locale —
 * tier law unchanged; 2026-09-09 naming law: postsForLocale DEDUPES
 * by slug — `<slug>.md` is the international (English) version and
 * `<slug>.<lang>.md` a translation, so both variants share ONE slug
 * and the URL differs by site prefix, not by filename: /blog/<slug>/
 * vs /zh/blog/<slug>/; one variant per article); 6) tag
 * grouping (2026-09-08) — tagsForLocale turns the flat newest-first
 * index into a second, orthogonal axis: one prerendered list page per
 * tag
 * (/blog/tags/<tag>/), derived from the SAME deduped listing so a tag
 * page can never show a post twice. Zero server runtime, zero client
 * fetches — everything below runs inside the prerender.
 *
 * Content is first-party (jixoai authors), so no HTML sanitization is
 * applied on purpose (blog spec, 2026-09-06).
 */

import manifest from '../../projects.manifest.json';
import { dict, LOCALES, type Locale } from './i18n';
import { projects } from './projects';

export interface BlogPost {
  /** filename without .md — the URL slug */
  slug: string;
  title: string;
  /** ISO date from the frontmatter, sorted newest-first */
  date: string;
  description: string;
  author: string;
  tags: string[];
  /** optional authored language (e.g. "zh") — the body renders
   *  as-authored under every locale; this field only records intent */
  lang?: string;
  /** release linkage pair (must be declared together): the manifest
   *  repo the post announces, and the bare version (no v) matching the
   *  GitHub release tag — drives the version pill */
  repo?: string;
  version?: string;
  /** markdown body (frontmatter stripped) */
  markdown: string;
}

/** Release-linkage view for the version pill surfaces (blog index card
 *  + post header — same interaction contract as the projects grid). */
export interface PostRelease {
  /** v-prefixed display form, identical to the projects card pill */
  version: string;
  /** permalink to the GitHub Release for this exact version */
  url: string;
}

const manifestRepos = new Set(
  (manifest as { projects: { repo: string }[] }).projects.map((project) => project.repo),
);

const projectByRepo = new Map(projects.map((project) => [project.repo, project]));

/** Parse the flat frontmatter subset: `key: value` lines between the
 *  leading `---` fences. tags accepts both `a, b` and `[a, b]` forms;
 *  values may carry matching surrounding quotes (skill frontmatter
 *  style) which are stripped. */
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
      .replace(/^[\["']|[\]"']$/g, '');
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

/** Naming law (2026-09-09): `<slug>.md` is the international version,
 *  `<slug>.<lang>.md` a translation. The language lives in the
 *  FILENAME, not in the slug, so every variant of one article resolves
 *  to the SAME URL segment — the site prefix carries the locale
 *  (/blog/<slug>/ vs /zh/blog/<slug>/). Only known locale codes read
 *  as a suffix; anything else stays part of the slug. */
const LANG_SUFFIX = new RegExp(`\\.(${LOCALES.join('|')})$`);

const posts: BlogPost[] = Object.entries(files).map(([path, raw]) => {
  const file = path.slice(path.lastIndexOf('/') + 1, -'.md'.length);
  const suffix = LANG_SUFFIX.exec(file);
  const slug = suffix ? file.slice(0, suffix.index) : file;
  const { data, body } = parseFrontmatter(raw);
  const title = data.title?.trim();
  const date = data.date?.trim();
  if (!title) throw invalid(slug, 'frontmatter `title` is required');
  if (!date || Number.isNaN(Date.parse(date))) {
    throw invalid(slug, 'frontmatter `date` must be an ISO date (YYYY-MM-DD)');
  }
  const repo = data.repo?.trim() || undefined;
  const version = data.version?.trim() || undefined;
  if (repo !== undefined || version !== undefined) {
    if (!repo || !version) {
      throw invalid(slug, 'frontmatter `repo` and `version` must be declared together');
    }
    if (!manifestRepos.has(repo)) {
      throw invalid(slug, `frontmatter \`repo\` "${repo}" is not a projects.manifest.json repo`);
    }
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
    // the filename suffix wins (the naming law is the source of truth);
    // the frontmatter `lang:` field stays supported for posts predating it
    lang: suffix?.[1] || data.lang?.trim() || undefined,
    repo,
    version,
    markdown: body.trim(),
  };
});

/** A tag is a URL segment (/blog/tags/<tag>/): letters or digits of any
 *  script plus `-`/`_`, starting alphanumeric — no path separators, no
 *  percent-encoding traps. Violations are a hard build error (same
 *  discipline as the repo/version validation above): a tag that cannot
 *  be a path segment would emit an unroutable page. */
const URL_SAFE_TAG = /^[\p{L}\p{N}][\p{L}\p{N}_-]*$/u;

for (const post of posts) {
  for (const tag of post.tags) {
    if (!URL_SAFE_TAG.test(tag)) {
      throw invalid(post.slug, `frontmatter tag "${tag}" is not a URL-safe path segment`);
    }
  }
}

/** All posts, newest first (the blog index order; ties fall back to slug). */
export const blogPosts: readonly BlogPost[] = [...posts].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date) || a.slug.localeCompare(b.slug),
);

/** Every distinct article slug, sorted — one URL per ARTICLE (2026-09-09
 *  naming law); a slug's language variants are resolved per request by
 *  postForLocale. This is the prerender entry list for /blog/[slug]/. */
export const blogSlugs: readonly string[] = [...new Set(blogPosts.map((post) => post.slug))].sort();

/** Every language variant of one article (index order: newest first). */
export const postVariants = (slug: string): readonly BlogPost[] =>
  blogPosts.filter((post) => post.slug === slug);

/** The variant a route serves for a slug (2026-09-09): exact UI locale >
 *  en > zh > first — the SAME preference law as postsForLocale, so a
 *  card built from the listing and the page its link opens can never
 *  disagree about which language is shown. */
export function postForLocale(locale: Locale, slug: string): BlogPost | undefined {
  const variants = postVariants(slug);
  return (
    variants.find((post) => postLang(post) === locale) ??
    variants.find((post) => postLang(post) === 'en') ??
    variants.find((post) => postLang(post) === 'zh') ??
    variants[0]
  );
}

/** The other-language sibling of a variant (the "read in …" link); null
 *  when the article ships in one language only. Under the shared slug
 *  the mirror is reached by switching SITE PREFIX, not filename — the
 *  caller builds the href from the sibling's language. */
export const mirrorPostFor = (post: BlogPost): BlogPost | null =>
  postVariants(post.slug).find((variant) => postLang(variant) !== postLang(post)) ?? null;

/** A post's authored language (frontmatter `lang`; posts predate the
 *  field, so a missing value reads as en — the release-blog era always
 *  declares it). */
export const postLang = (post: BlogPost): Locale => {
  const lang = post.lang as Locale | undefined;
  return lang && lang in dict ? lang : 'en';
};

/** Locale-aware listing (2026-09-06 mobile-audit, mixed-language
 *  governance; 2026-09-07 walkthrough fix B — mirror dedup; 2026-09-09
 *  naming law): posts group by slug — which IS the base, because every
 *  language variant of an article shares it — and each group surfaces
 *  exactly ONE variant, picked
 *  exact-UI-locale > en > zh, so a seven-locale home never lists the
 *  same article twice (once per language). en outranks zh on third
 *  locales (vision fix 2026-09-07: /ar/ served Chinese titles — for a
 *  non-CJK reader the English mirror is the useful fallback; zh stays
 *  last-resort for posts with no English mirror, and /zh/ still hits
 *  its exact variant first). Order: the UI locale's picks first,
 *  everything else by date desc (slug tiebreak). */
export function postsForLocale(locale: Locale): readonly BlogPost[] {
  const groups = new Map<string, BlogPost[]>();
  for (const post of blogPosts) {
    // the slug IS the base (naming law 2026-09-09): variants share it
    const variants = groups.get(post.slug);
    if (variants) variants.push(post);
    else groups.set(post.slug, [post]);
  }
  const picks: BlogPost[] = [];
  for (const variants of groups.values()) {
    picks.push(
      variants.find((post) => postLang(post) === locale) ??
        variants.find((post) => postLang(post) === 'en') ??
        variants.find((post) => postLang(post) === 'zh') ??
        variants[0],
    );
  }
  return picks.sort(
    (a, b) =>
      Number(postLang(b) === locale) - Number(postLang(a) === locale) ||
      Date.parse(b.date) - Date.parse(a.date) ||
      a.slug.localeCompare(b.slug),
  );
}

/** One tag and the posts that carry it (a prerendered /blog/tags/<tag>/
 *  group; 2026-09-08 — the blog's tag-grouping axis). */
export interface TagGroup {
  /** the frontmatter tag verbatim — display text AND the URL segment
   *  (URL_SAFE_TAG guarantees the two are the same string). */
  tag: string;
  /** the posts carrying it, newest first (index order). */
  posts: readonly BlogPost[];
}

/** Tag grouping for one locale (2026-09-08): built from
 *  postsForLocale — not from blogPosts — so a tag page inherits the
 *  mirror-dedup and locale-preference law of the index it hangs off
 *  (never the same article twice, the UI locale's variant first).
 *  Order: post count desc (a tag's weight is its breadth), then tag
 *  name — stable across locales and across rebuilds. */
export function tagsForLocale(locale: Locale): readonly TagGroup[] {
  const groups = new Map<string, BlogPost[]>();
  for (const post of postsForLocale(locale)) {
    for (const tag of post.tags) {
      const bucket = groups.get(tag);
      if (bucket) bucket.push(post);
      else groups.set(tag, [post]);
    }
  }
  return [...groups]
    .map(([tag, groupPosts]) => ({ tag, posts: groupPosts }))
    .sort((a, b) => b.posts.length - a.posts.length || a.tag.localeCompare(b.tag));
}

/** One locale's tag group by name; null when the tag does not exist in
 *  that locale (the route turns that into a 404 — which is also why
 *  each locale's route enumerates ONLY its own tags). */
export function tagGroupFor(locale: Locale, tag: string): TagGroup | null {
  return tagsForLocale(locale).find((group) => group.tag === tag) ?? null;
}

/** Bidi direction of a post's authored content (summary isolation on
 *  RTL surfaces); undefined when it matches the default. */
export const postDir = (post: BlogPost): 'ltr' | 'rtl' => dict[postLang(post)].dir;

/**
 * LIVE COMPONENT DEMOS (2026-09-13, the v0.5 spin-era article): the
 * site is a registry consumer, so a post can show a component EFFECT
 * by mounting the real component instead of shipping a screenshot —
 * the fence authoring form is
 *
 *   ```spin
 *   { "demos": [{ "spinner": "dots" }], "caption": "…" }
 *   ```
 *
 * splitLiveDemos operates on the MARKDOWN SOURCE (not rendered
 * output — every renderer swap stays transparent to the fence):
 * segments alternate markdown sources and demo specs, and post-page
 * renders the markdown through the registry's <Markdown> component.
 * Rendering stays inside the prerender (the text lane is pure CSS
 * animation, the svg lane raw SMIL — both alive in a static export,
 * zero client fetches); screenshots remain for effects a live embed
 * cannot carry (the restraint law: a screenshot shows an EFFECT,
 * never page text).
 */
export interface SpinDemo {
  spinner: string;
  /** aria label for the status region; defaults to the spinner name */
  label?: string;
  interval?: number | 'auto';
  linger?: number | 'auto';
  lingerType?: 'auto' | 'end' | 'start' | 'both';
  size?: number | string;
}

export interface LiveSpinBlock {
  kind: 'spin';
  demos: SpinDemo[];
  caption?: string;
}

export type BodySegment = { kind: 'md'; source: string } | LiveSpinBlock;

const SPIN_FENCE = /```spin\n([\s\S]*?)\n```/g;

/** Split a post's markdown source into markdown segments and live-demo
 *  blocks. A malformed fence is an authoring error, not a
 *  page-killer: it stays in the markdown flow (rendered as the code
 *  block it literally is, so the mistake stays visible). */
export function splitLiveDemos(markdown: string): BodySegment[] {
  const segments: BodySegment[] = [];
  let cursor = 0;
  for (const match of markdown.matchAll(SPIN_FENCE)) {
    const at = match.index!;
    if (at > cursor) segments.push({ kind: 'md', source: markdown.slice(cursor, at) });
    let spec: { demos?: SpinDemo[]; caption?: string };
    try {
      spec = JSON.parse(match[1]!) as typeof spec;
    } catch {
      cursor = at + match[0].length;
      segments.push({ kind: 'md', source: markdown.slice(at, cursor) });
      continue;
    }
    segments.push({ kind: 'spin', demos: spec.demos ?? [], caption: spec.caption });
    cursor = at + match[0].length;
  }
  if (cursor < markdown.length) segments.push({ kind: 'md', source: markdown.slice(cursor) });
  return segments;
}

/** Version-pill data for a post, null when it carries no release
 *  linkage. The release URL is owner-aware via the generated project
 *  record; the tag convention follows the repo's live tag prefix
 *  ("v0.2.0" vs "openspecui@12.0.0"), defaulting to v-prefix. */
export function postRelease(post: BlogPost): PostRelease | null {
  if (!post.repo || !post.version) return null;
  const project = projectByRepo.get(post.repo);
  const repoUrl = project?.repoUrl ?? `https://github.com/jixoai/${post.repo}`;
  const tag = project?.tag?.includes('@')
    ? `${project.tag.slice(0, project.tag.lastIndexOf('@') + 1)}${post.version}`
    : `v${post.version}`;
  return {
    version: `v${post.version}`,
    url: `${repoUrl}/releases/tag/${encodeURIComponent(tag)}`,
  };
}

/** Display form of a post's date: frontmatter carries the release's
 * full UTC publication timestamp (Owner 2026-09-07 — posts date from
 * the GitHub Release published_at, not the writing day; the timestamp
 * keeps same-day releases ordered correctly), every surface shows the
 * UTC calendar date — a plain 10-char slice, no timezone shifting. */
export const displayDate = (iso: string): string => iso.slice(0, 10);
