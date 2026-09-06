> Orthogonal intents (maintained 2026-09-06 Asia/Shanghai): release-blog
> skill (project-maintained); blog↔projects linkage; first release posts.
>
> Original request (2026-09-06 Asia/Shanghai)：jixoai.com 的 blogs 专注于
> 子仓库的 releases：观察各仓库历史关键 releases（太多太乱则只取最新
> 一个），为这些 releases 写文章；写之前先学习开源 org 如何写技术发布
> blog，结合本地 skills 整合成 jixoai.com 的项目级 skills，在项目内维护。

## Why

The blog currently has only the relaunch post; the org's releases have
no narrative layer. Research into 14 OSS orgs' release-blog practice
(completed: `.agents/research/2026-09-06-release-blog-patterns.md`)
distills into a repeatable house style that must live in the repo.

## What Changes

- **Project skill**: `skills/release-blog/SKILL.md` — the house style
  (L1/L2/L3 layering, title/slug laws, milestone vs routine templates,
  tone laws, frontmatter linkage, link discipline, anti-patterns,
  verification checklist). Maintained in-repo; research doc is its
  cited source.
- **Blog↔projects linkage**: blog frontmatter gains `repo` and
  `version` keys; the blog index card renders a version pill linked to
  the release when present (same pill grammar as the projects grid).
- **First posts** (zh main + en mirror pairs, per the skill): latest
  release per repo — unipty v0.2.0, openspecui 12.0.0, ui 0.3.0
  (milestone weight per the skill's classification). The three new
  sites' first releases get posts once their release automation cuts
  them (follow-up, tracked in NOTES).
- Blog surface: index ordering unchanged (date desc); posts render
  under all locales with their authored language.

## Capabilities

### Modified Capabilities

- `blog`: release-post format (frontmatter keys, linkage) — additive.

### New Capabilities

- `release-blog`: the project skill as the writing law (structure,
  tone, linkage, verification).

## Non-goals

- No automation of post generation this round (manual/agent-authored
  posts via the skill; automation is a future change).
