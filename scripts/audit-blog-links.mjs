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
 * Cross-locale rule: a locale-prefixed link (/zh/... and friends) is
 * legitimate only on the mirror line at the end of a post, where the
 * article points at its own translation. Anywhere else it means an en
 * post is sending readers to a zh-only URL.
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
    const linkLang = clean.split('/')[1];
    if (PREFIXED.includes(linkLang)) {
      // A link inside your own locale is not a leak: a zh post pointing at
      // /zh/blog/... is the correct URL for its own readers. Only a hop into
      // a *different* locale can strand someone on the wrong language, and
      // that is legitimate solely on the mirror line (the post pointing at
      // its own translation). (2026-09-10: the old code flagged every
      // locale-prefixed link, which made zh→zh links unwritable and is why
      // the zh variants had no "on this blog" row.)
      if (linkLang === fileLang) continue;
      const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // A mirror line is one list item holding an optional label and *only*
      // that one link: `- Chinese version: [/zh/…/](/zh/…/)`. The label may
      // not swallow a bracket, so a row carrying several links cannot match
      // it. A looser "line ends with the link" test used to exempt any
      // multi-link row whose last link happened to be locale-prefixed, which
      // let real leaks through (fixed 2026-09-10).
      const onMirrorLine = new RegExp(`^- [^[\\]]*\\[[^\\]]*\\]\\(${escaped}\\)\\s*$`, 'm').test(text);
      if (!onMirrorLine) {
        crossLocale++;
        issues.push(`  ↔ ${href}  (locale-prefixed, not on the mirror line)`);
      }
    }
  }

  if (issues.length) {
    console.log(`\n### ${file}`);
    console.log(issues.join('\n'));
  }
}

console.log(`\n=== 断链 ${broken} 个，跨语种 ${crossLocale} 个，无尾斜杠 ${noSlash} 个`);
