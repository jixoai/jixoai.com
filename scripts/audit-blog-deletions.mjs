/**
 * Deletion audit (scripts/audit-blog-deletions.mjs).
 *
 * Companion gate to ai-tone-metrics.mjs: that one polices TONE, this one
 * polices INFORMATION CONSERVATION. Run it after any subtractive rewrite
 * of content/blog — a rewrite that only deletes must prove it deleted
 * nothing a reader needed.
 *
 * Two checks:
 *
 *  1. Pure deletions. A plain `git diff` is unusable here: a reworded line
 *     shows up in BOTH the `-` and `+` sets. A removed line counts as
 *     lost only when no added line in the same file is a plausible
 *     counterpart (char-bigram Jaccard >= 0.3). Frontmatter lines are
 *     excluded (they churn on every tag/date sweep).
 *  2. Lost fact anchors. URLs, inline `code` spans and version numbers
 *     present in HEAD but absent from the working tree.
 *
 * Renames are followed (2026-09-09): `<slug>.md` / `<slug>.zh.md` means
 * a post can move paths, and `git show HEAD:<new path>` would fail on a
 * path that only exists in the working tree. The audit compares
 * HEAD:<old path> against the working-tree <new path>, so a pure rename
 * reports zero deletions instead of "everything was deleted".
 *
 * Both lists are a TO-DO for a human, not a verdict: the expected
 * outcome is that each entry resolves to "deleted on purpose" (version
 * chronicles, maintainer-facing detail) or "false positive" (content
 * moved into a fenced block, a backtick span split in two, a term
 * reworded). What matters is that every entry gets resolved.
 *
 * Usage: npm run audit:deletions
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const git = (args) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const bigrams = (s) => {
  const t = s.replace(/\s+/g, ' ').trim();
  const set = new Set();
  for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2));
  return set;
};
const jaccard = (a, b) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
};

const ANCHOR = /https?:\/\/[^\s)`\]>]+|`[^`\n]+`|\b\d+\.\d+(?:\.\d+)?\b/g;
const FRONTMATTER = /^(title|description|tags|date|author|repo|version|lang):/;

/** One `diff --git` block → the (old, new) path pair it compares. A pure
 *  rename carries no `---`/`+++` lines, hence the rename headers first. */
function pathsOf(block) {
  const from = /^rename from (.+)$/m.exec(block);
  const to = /^rename to (.+)$/m.exec(block);
  if (from && to) return { old: from[1], current: to[1] };
  const minus = /^--- (?:a\/(.+)|(?:\/dev\/null))$/m.exec(block);
  const plus = /^\+\+\+ (?:b\/(.+)|(?:\/dev\/null))$/m.exec(block);
  return { old: minus?.[1] ?? null, current: plus?.[1] ?? null };
}

const showHead = (path) => {
  if (!path) return '';
  try {
    return git(['show', `HEAD:${path}`]);
  } catch {
    return '';
  }
};

const readCurrent = (path) => {
  if (!path) return '';
  const abs = join(ROOT, path);
  return existsSync(abs) ? readFileSync(abs, 'utf8') : '';
};

// HEAD (not the index) so a `git mv`-staged rename shows up too; -M so a
// rename is one block instead of a delete plus an unrelated add.
const full = git(['diff', 'HEAD', '-M', '-U0', '--', 'content/blog']);
const blocks = full.split(/^diff --git /m).slice(1).filter((b) => b.trim());

if (blocks.length === 0) {
  console.log('no changes under content/blog — nothing to audit');
  process.exit(0);
}

let totalPure = 0;
let totalLost = 0;

for (const block of blocks) {
  const { old, current } = pathsOf(block);
  const label = old && current && old !== current ? `${old} → ${current}` : (current ?? old);

  const removed = [];
  const added = [];
  for (const line of block.split('\n')) {
    if (line.startsWith('-') && !line.startsWith('---')) removed.push(line.slice(1));
    else if (line.startsWith('+') && !line.startsWith('+++')) added.push(line.slice(1));
  }
  const addedGrams = added.filter((l) => l.trim()).map(bigrams);

  const pure = removed.filter(
    (line) =>
      line.trim() &&
      !FRONTMATTER.test(line) &&
      !addedGrams.some((ag) => jaccard(bigrams(line), ag) >= 0.3),
  );

  const oldText = showHead(old);
  const newText = readCurrent(current);
  const oldAnchors = new Set(oldText.match(ANCHOR) ?? []);
  const newAnchors = new Set(newText.match(ANCHOR) ?? []);
  const lost = [...oldAnchors].filter((a) => !newAnchors.has(a)).sort();

  totalPure += pure.length;
  totalLost += lost.length;

  console.log(`\n### ${label}   (-${removed.length} / +${added.length})`);
  console.log(`真删除 ${pure.length} 行，丢失锚点 ${lost.length} 个`);
  for (const line of pure) console.log(`  - ${line.length > 150 ? line.slice(0, 150) + '…' : line}`);
  for (const a of lost) console.log(`  ! ${a}`);
}

console.log(`\n=== 合计：真删除 ${totalPure} 行，丢失锚点 ${totalLost} 个（逐个确认是刻意删还是误删）`);
