---
name: release-blog
description: Write release announcement posts for jixoai.com/blog (the L2 narrative layer over GitHub Releases). Use when publishing a blog post about a sub-repo's release — structure, tone, frontmatter linkage, bilingual mirroring, and the anti-patterns that get a draft rejected.
---

# jixoai.com release-blog

jixoai.com/blog is the organization's L2 release-narrative layer. It never
duplicates L1 (GitHub Releases / CHANGELOG); it answers **why this release
matters and what it means for the user**.

```
L1  GitHub Releases            全量、机器生成。回答「改了什么」。
L2  jixoai.com/blog（本 skill）  精选 2-4 亮点 + 动机叙事。只链接 L1。
L3  Upgrade Guide / MIGRATION   破坏性变更操作手册，随 repo 提供，L2 链接。
```

Source research (14 orgs, 35 laws, every claim with a URL):
`.agents/research/2026-09-06-release-blog-patterns.md` — read it when this
skill's compression is not enough.

## Workflow

1. **Gather facts** — the GitHub Release body (L1), the repo's
   CHANGELOG/changesets, and the motivating openspec change (archive/)
   for the "why" behind each highlight. Facts only from these sources;
   never invent claims.
2. **Pick the weight class** — 里程碑（x.0 / 重要 minor）→ 叙事文
   1500-3000 词，允许背景弧；例行 minor → 紧凑文 ≤1000 词；patch →
   不发 blog（只进 L1）。org blog 是多项目混排，补丁噪音淹没叙事。
3. **Draft** with the templates below; zh 为主文，en 同构镜像成对发布
   （结构逐节对齐；zh 先 en 后，间隔 ≤48h）。
4. **Self-check** against the 反模式 list; then `npm run build` green.

## Title & slug laws

- 标题公式全站唯一：`<Project> vX.Y.Z`（裸版本号带 v，与 version pill
  的 tag 显示同构）。里程碑可加冒号副题：
  `UniPty v1.0：runtime-neutral PTY 的第一份长期契约`。
- slug 英文 kebab、含版本、永不改链：
  `content/blog/2026-09-06-unipty-v0-2-0.md`（+ `-en` 后缀作英文镜像）。
- tags 受控：`release` + 每项目一个 repo tag（`unipty`/`openspecui`/
  `ui`/`opentray`/`opendweb`/`openiweb`）。

## Structure

### 里程碑模板

```
[钩子]   可用一行终端输出作 kicker（品牌彩蛋），下一句必须是正常
         宣告 + 一句话定位："$ unipty --version … / UniPty v0.5.0
         发布了。这一版的主菜是……"
[背景]   仅大版本：当年的设计赌注 → 现在的主张变化
[亮点×2-4] 标题 = 用户能做什么（非内部模块名）；
          痛点 1-2 句 → 方案 → 代码块/数字证据 → 文档链接
[其余变更] 一段短清单，逐条链 changelog，不展开
[迁移]    有破坏性变更 → 独立章节 + 最低摩擦路径（一键命令/diff 块）；
          无破坏 → 一句 "升级即 `npm i xxx@latest`"
[致谢]    贡献者/前置依赖
[链接栏]  changelog / 升级指南 / 讨论区 / 官网 / GitHub
```

### 例行模板

钩子 → 2-3 个特性小节（动机+代码块+链接）→ Other improvements 短清单
→ 升级一行 → 致谢一行。≤1000 词，无故事不写故事。

## Tone laws

- 开发者对开发者；兴奋通过能力声明与数字表达，不通过形容词。
- 数字优先于形容词（体积/耗时/依赖数/issue 数）；性能声明带基线。
- 一篇至多一句情绪化语句；jixoai 是 neo-brutalist 不是 carnival —
  Tailwind 式粗口开场不适配，用 "It's done." 级冷句。
- 代码块即视觉：CLI/框架类每个亮点至少一个可复制块；mono 品牌下
  benchmark 输出与 `--help` 片段是天然素材；破坏性变用 diff 块。
- 坦承不完美（"mainly a maintenance release" 级诚实）比粉饰可信。

## Frontmatter (linkage to projects)

```yaml
---
title: "UniPty v0.5.0"
date: 2026-09-20
description: 一句话定位（索引页摘要直接用它）
author: jixoai
tags: [release, unipty]
repo: unipty        # 必须等于 projects.manifest.json 的 repo 字段
version: "0.5.0"    # 与 GitHub release tag 对齐（去 v）
lang: zh            # en 镜像标 en
---
```

`repo` + `version` 驱动博客卡片上的 version pill 与项目页联动。

## Link discipline

每篇至少外链四类：changelog（L1 永链）、文档、升级指南（若有破坏性
变更）、讨论/反馈渠道。提及具体改动链 PR 永链或 milestone，不链可变
列表页。交叉链上版发布文建立系列感。

## 反模式（看到即打回）

1. changelog 全文转贴（Node 式 230 条 commit 是反面教材）
2. 只写 "新增了 X" 不写为什么你需要 X
3. 有破坏性变更却无迁移节/无最低摩擦路径
4. 读完是死路（无 changelog/文档/讨论出口）
5. 形容词多于数字与代码块
6. 破坏性变更埋在 Other changes 里
7. 标题公式漂移（Announcing/released/is here 混用）

## Verification

- [ ] facts 可溯源（L1 body / changelog / openspec archive）
- [ ] 亮点小节都有动机句 + 代码或数字
- [ ] 链接四类齐全且是永链
- [ ] zh/en 成对、结构同构、slug 稳定
- [ ] frontmatter repo/version 与 manifest/tag 对齐
- [ ] `npm run build` 绿；文章页在 public/ 抽查 200
