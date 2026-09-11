/**
 * Internal-link audit (scripts/audit-blog-links.mjs).
 *
 * Third gate, alongside ai-tone-metrics (tone) and audit-blog-deletions
 * (information conservation): every internal link in content/blog must
 * resolve in the prerendered dist/, and no post may leak into the wrong
 * locale.
 *
 * Run it AFTER `npm run build` — resolution is checked against dist/,
 * which is the only place the real URL space exists (trailingSlash:
 * 'always' means /a/b/ is dist/a/b/index.html).
 *
 * Cross-locale rule: a post must only link within its own locale. Both
 * directions are leaks -- an en post sending readers to /zh/..., and a zh
 * post sending them to the unprefixed (en) /blog/.... The single exception
 * is the mirror line at the end of a post, where an article points at its
 * own translation; it is recognised by being a list item carrying exactly
 * one link.
 *
 * Assets are not pages (2026-09-11): `![alt](/blog-assets/…/x.png)` is
 * served straight from static/, so it never has a trailing slash and has
 * no locale to leak into. Such paths skip both the trailing-slash rule and
 * the cross-locale rule; existence is checked against dist/ instead.
 *
 * Usage: npm run build && node scripts/audit-blog-links.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BLOG = join(ROOT, 'content/blog');
const DIST = join(ROOT, 'dist');
const PREFIXED = ['zh', 'es', 'fr', 'de', 'ru', 'ja', 'ko', 'ar'];

/** Served verbatim from static/, so they carry no trailing slash and no
 *  locale — they are assets, not pages. */
const ASSET_RE = /\.(png|jpe?g|webp|svg|gif|avif|ico|pdf|mp4|webm)$/i;

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first');
  process.exit(1);
}

const files = readdirSync(BLOG).filter((f) => f.endsWith('.md')).sort();

let broken = 0;
let crossLocale = 0;
let noSlash = 0;

for (const file of files) {
  const text = readFileSync(join(BLOG, file), 'utf8');
  const links = [...new Set([...text.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]))];
  const issues = [];
  /** Language of the file itself, from the filename: `x.zh.md` is zh, the
   *  unsuffixed `x.md` is the international (en) variant. */
  const fileLang = PREFIXED.find((lang) => file.endsWith(`.${lang}.md`)) ?? 'en';

  for (const href of links) {
    const clean = href.split('#')[0].split('?')[0];
    if (ASSET_RE.test(clean)) {
      // Not a page: no trailing slash expected. Still verify it shipped.
      if (!existsSync(join(DIST, clean))) {
        broken++;
        issues.push(`  ✗ ${href}  -> missing in dist/`);
      }
      continue;
    }
    if (!clean.endsWith('/')) {
      noSlash++;
      issues.push(`  ? ${href}  (no trailing slash — the site is trailingSlash: 'always')`);
      continue;
    }
    if (!existsSync(join(DIST, clean, 'index.html'))) {
      broken++;
      issues.push(`  ✗ ${href}  -> missing in dist/`);
      continue;
    }
  }

  // Cross-locale is judged per *occurrence*, on the line that carries it —
  // not per href. An href that legitimately sits on the mirror line must
  // not exempt the same href when it reappears in a body row; the previous
  // per-href test did exactly that (fixed 2026-09-10).
  //
  // An unprefixed "/blog/…" is the en URL, so compare locale both ways: a
  // link is a leak whenever its locale differs from the file's, in either
  // direction. (a) en post → /zh/… (b) zh post → /blog/…, the case the
  // first version missed entirely: three zh posts shipped a "本站系列" row
  // pointing at English articles (fixed 2026-09-10). Same locale is always
  // fine, and a deliberate hop is allowed only on the mirror line.
  for (const line of text.split('\n')) {
    const onLine = [...line.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);
    for (const href of onLine) {
      const clean = href.split('#')[0].split('?')[0];
      if (!clean.endsWith('/')) continue;
      const linkLang = PREFIXED.includes(clean.split('/')[1]) ? clean.split('/')[1] : 'en';
      if (linkLang === fileLang) continue;
      // A mirror line is one list item carrying exactly one link:
      // `- Chinese version: [/zh/…/](/zh/…/)`. Anything with two or more
      // links is a body row and gets no exemption. A looser "line ends with
      // the link" test used to exempt any multi-link row whose last link
      // happened to be locale-prefixed, which let real leaks through.
      const onMirrorLine = line.startsWith('- ') && onLine.length === 1;
      if (!onMirrorLine) {
        crossLocale++;
        issues.push(`  ↔ ${href}  (cross-locale, not on the mirror line)`);
      }
    }
  }

  if (issues.length) {
    console.log(`\n### ${file}`);
    console.log(issues.join('\n'));
  }
}

console.log(`\n=== 断链 ${broken} 个，跨语种 ${crossLocale} 个，无尾斜杠 ${noSlash} 个`);
