#!/usr/bin/env node
/**
 * ai-tone-metrics.mjs — quantifiable zh AI-tell lint for content/blog
 * (Owner directive 2026-09-07: measurable gate for the release-blog
 * craft pass R5).
 *
 * Feature thresholds derive from the lieflat-less-ai-tone corpus study
 * (300 AI articles vs 329 human articles, ~2.83M chars — see
 * ~/.agents/skills/lieflat-less-ai-tone). Per-1k-char frequencies:
 *   AI / human — dash 2.38/0.80, 翻案腔 ~0.70/~0.21, 提示语冒号
 *   0.29/0.08, 空转句引列表 0.29/0.03, 拟人化喻体 0.018/0.002,
 *   句首连接词 0.18/0.03; numbers 6.34/17.92 (humans use MORE),
 *   time anchors 0.69/1.78 (humans use MORE).
 * Verdicts: RED = above the AI-corpus mean (definite finding),
 * YELLOW = above 1.5× the human mean (check the cluster), LOW = the
 * human-side-above metrics (numbers/time) below half the human mean.
 * Density judgment stays manual for anything the regexes can't see
 * (相邻句同款 needs reading; this script only counts the countable).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = new URL('../content/blog/', import.meta.url).pathname;
const files = readdirSync(dir).filter((f) => f.endsWith('.md') && !f.endsWith('-en.md'));

const FEATURES = [
  {
    id: '翻案腔',
    regex: /(不是|并非|不在于|与其说)[^。，]{1,24}(而是|不如说)|看似[^。，]{1,18}实则|表面[^。，]{1,18}实际|你以为[^。]{1,30}其实/g,
    ai: 0.7, human: 0.21,
  },
  { id: '破折号——', regex: /——/g, ai: 2.38, human: 0.8 },
  { id: '提示语冒号', regex: /(一句话总结|核心是|关键在于|原因如下|结论是|本质上|换句话说)[：:]/g, ai: 0.29, human: 0.08 },
  { id: '空转句引列表', regex: /[：:]\s*(\n[-*]|\n\d+[.、])/g, ai: 0.29, human: 0.03 },
  { id: '顿号罗列≥3', regex: /[^\s、，。；:"「」][^、，。；\n]{0,10}、[^、，。；\n]{1,10}、[^、，。；\n]{1,10}/g, ai: 3.21, human: 1.78 },
  { id: '拟人化喻体', regex: /(像|相当于)\s*一?[位个名]\s?(智慧|全能|永不|贴心|忠实)?[^\s，。]{0,6}(导师|秘书|助手|顾问|管家|审查员|实习生|伙伴)/g, ai: 0.018, human: 0.002 },
  { id: '禁用起手式', regex: /(说白了|说穿了|先说结论)/g, ai: 0.2, human: 0.02 },
  { id: '当…时从句', regex: /(^|[。！？\n])当[^，。]{6,40}时[，,]/g, ai: 0.26, human: 0.07 },
  { id: '前置话题壳', regex: /(^|[。！？\n])(对于[^，。]{2,14}(来说|而言)|就[^，。]{2,14}而言|关于[^，。]{2,14}，|在[^，。]{2,14}方面)/g, ai: 0.22, human: 0.06 },
  { id: '句首连接词', regex: /(^|[。！？\n])(然而|因此|此外|与此同时|换言之|总而言之)[，,]/g, ai: 0.18, human: 0.03 },
  { id: '这意味着复述', regex: /(^|[。！？\n])(这意味着|这表明|这说明|换句话说)/g, ai: 0.15, human: 0.04 },
  { id: '长前置定语', regex: /的[^，。；\n]{1,8}的[^，。；\n]{1,8}的/g, ai: 0.42, human: 0.2 },
];

const LOW_FEATURES = [
  { id: '数字密度', regex: /\d+(\.\d+)?/g, human: 17.92, floor: 8 },
  { id: '时间锚点', regex: /(19|20)\d{2}\s*[年月日]|(19|20)\d{2}-\d{2}/g, human: 1.78, floor: 0.8 },
];

const strip = (raw) =>
  raw
    .replace(/^---[\s\S]*?---\n?/, '') // frontmatter
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links keep text
    .replace(/^#{1,6}\s.*$/gm, ' '); // headings

let failures = 0;
for (const file of files) {
  const text = strip(readFileSync(join(dir, file), 'utf8'));
  const kchars = Math.max(text.replace(/\s/g, '').length, 1) / 1000;
  const rows = [];
  for (const f of FEATURES) {
    const hits = (text.match(f.regex) ?? []).length / kchars;
    let verdict = '';
    if (hits > f.ai) verdict = 'RED';
    else if (hits > f.human * 1.5) verdict = 'YELLOW';
    if (verdict) failures++;
    rows.push(`${f.id} ${hits.toFixed(2)}/${kchars.toFixed(1)}k ${verdict}`);
  }
  for (const f of LOW_FEATURES) {
    const hits = (text.match(f.regex) ?? []).length / kchars;
    if (hits < f.floor) { rows.push(`${f.id} ${hits.toFixed(2)} LOW`); failures++; }
  }
  console.log(`\n${file}${rows.length ? '\n  ' + rows.join('\n  ') : '\n  clean'}`);
}
console.log(`\n${failures ? `✗ ${failures} flagged metric(s)` : '✓ all metrics within thresholds'}`);
process.exit(failures ? 1 : 0);
