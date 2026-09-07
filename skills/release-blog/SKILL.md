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
2. **Pick the archetype** — `references/archetypes.md` A1–A14（40 篇
   实文归纳的模板库）。发布文先选原型再动笔：里程碑 → A1，例行 →
   A2，性能主题 → A6，首次亮相/动机长文 → A8。骨架、证据纪律、
   开头与收尾招式按所选原型执行；本文件的 里程碑/例行模板 是 A1/A2
   的 jixoai 定制版。
3. **Pick the weight class** — 里程碑（x.0 / 重要 minor）→ 叙事文
   1500-3000 词，允许背景弧；例行 minor → 紧凑文 ≤1000 词；patch →
   不发 blog（只进 L1）。org blog 是多项目混排，补丁噪音淹没叙事。
4. **Draft with the craft rules** — `references/craft.md` D1–D12 是
   起草期句级法则（冷开、一句一职、长句+短钉、事实强度天花板……）。
   zh 为主文，en 同构镜像成对发布（结构逐节对齐；zh 先 en 后，
   间隔 ≤48h；镜像按 craft.md M1–M6 独立过一遍）。
5. **Revise gate-ordered** — craft.md R1→R7（对账→追责→结构→机制→
   查簇→朗读→镜像），前一关不过不进下一关。R5 查簇必须跑量化工具：
   `node scripts/ai-tone-metrics.mjs`（全绿才放行，见下节）。zh 终稿
   再过一遍 lieflat 白名单（见 引用技能）。然后 `npm run build` green。
   优先级注记：指标门禁与 lieflat 信息守恒冲突时（如必须保留的枚举
   材料），以 Owner 当次授权为准并在此处记录先例（2026-09-07 首例：
   shell 语义枚举按语法分组改写获准，语义零删减）。

## Quantifiable gate（ai-tone-metrics）

`node scripts/ai-tone-metrics.mjs` 对全部 zh 主文输出每千字特征频率，
阈值取自 lieflat-less-ai-tone 的 283 万字语料实测（AI vs 人类）。
RED = 超 AI 均值（必改），YELLOW = 超 1.5× 人类均值（按簇判断），
LOW = 数字/时间锚点密度低于人类一半（材料稀薄，补证据）。regex 量不到
的（相邻句同款等）靠 craft.md R6 朗读人工把关。工具当前基线教训：
破折号是本站最大犯规点（曾 3.6–6.5/千字 vs 人类 0.8）。

## 引用技能（按路径引用，勿内联——上游会持续更新）

两个外部 skill 安装在全局目录（`git pull` 即更新），本 skill 只做导读：

1. **lieflat-less-ai-tone** —
   `~/.agents/skills/lieflat-less-ai-tone/SKILL.md`（453 行）。
   中文去 AI 味的白名单改写器，规则全部来自 283 万字对照语料（300 篇
   AI vs 329 篇人写），11 条按优先级排序：翻案腔、顿号罗列、相邻句
   同款、破折号、冒号（提示语/空转引列表）、序数词小标题、拟人化
   喻体、概括盖具体数据、禁用起手式、翻译腔（仅五种）、段首零主语。
   **何时调用**：zh 终稿的最后清理（R5 查簇之后），或指标工具报 RED
   而自己不确定怎么改时。**关键边界**：它是成稿清理器不是重写器——
   白名单外的文字逐字保留、信息守恒（不增不删）、结构不动；本站的
   品牌语体（craft.md）是它的「风格参考文档」，冲突时以本站为准。
   它还会证伪流行说法：句长均匀性、句内排比、独立成段的比喻都
   **不是** AI 痕迹，别误伤。
2. **drawio-skill** —
   `~/.agents/skills/drawio-skill/skills/drawio-skill/SKILL.md`（135 行
   + references/ + scripts/diagramctl.py）。文字/真实源 → 可维护的
   .drawio 架构图，统一 CLI `diagramctl.py`（doctor/build/sync/views/
   test/review/transform），本机依赖已装齐（drawio CLI + Python）。
   **何时调用**：文章需要架构图/流程图/时序图时——A7 架构深潜的机制
   图、A1 里程碑的拓扑变化图、A5 迁移路径图、多组件数据流。**不需要**
   当 gif 用：同类博客实况是近乎零 gif（archetypes.md §4.5），代码块、
   表格、CLI 输出框优先；一个组件一句话能说清的不画。**产物落位**：
   PNG 导出到 `static/blog-assets/<slug>/`，文章用绝对路径引用，
   .drawio 源文件同目录入库（可再编辑）。用法细节读它的 SKILL.md，
   不要把它的内容抄进本文档。

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

## 内容权重法则（Owner 法令 2026-09-07）

文章对正面与负面内容必须有别。版面占比 ≈ 对读者的决策价值：

1. **顺序**：新功能 → 破坏性变更 → 修复与其他。修复是负面内容。
2. **修复默认一句话**：`修复 <什么坏了>（<commit/PR 永链>）`，归入
   「其余变更」清单；不设小节、不叙事、不写动机段。反面教材：曾用
   1/3 篇幅讲一个 404 修复（opentray v0.21.1 文，后已纠正）。
3. **唯一例外**：hotfix release（该版本存在的唯一理由就是修复）→
   开头一句直陈 + 升级行即可，全文可以只有三段；但 patch 本就按
   重量级不发博客——能并入下一个 minor 叙事的就并入。
4. 流程/工程内容（发布自动化、CI 改造）按「新能力」对待，但同样
   受版面占比约束：它改变的是维护者的体验，不是用户的。

## Tone laws

### 平实基调（Owner 法令 2026-09-07，此为全站默认）

平实风格是默认基调，不是可选风格。参照系是 unipty v0.2.2 的
zigpty 路由文（2026-09-07-unipty-v0-2-2）：

- **宣告句直陈**：发布了什么、一句话定位，完事。不写"走了两步"
  "从 X 到 Y"这类版本旅程框架，不用标题复述叙事弧。
- **一篇文只讲一个版本**：合并发布或能力跨 tag 落地时，中间版本
  不进入叙事（不提它的发布时刻、门禁变迁、changelog 分段）；
  版本号只允许出现在 substrate 固定版本与 npm 安装命令里。
- **对比用表格 + 数字**：优缺点横向对照，客观陈述，别一惊一乍。
- **致谢只致谢**：对象是人与社区。复核轮次、阻塞修复数、CI 过程
  一律不进致谢；要提最多在「其余变更」一句话，通常不提。


- 开发者对开发者；兴奋通过能力声明与数字表达，不通过形容词。
- 数字优先于形容词（体积/耗时/依赖数/issue 数）；性能声明带基线。
- 一篇至多一句情绪化语句；jixoai 是 neo-brutalist 不是 carnival —
  Tailwind 式粗口开场不适配，用 "It's done." 级冷句。
- 代码块即视觉：CLI/框架类每个亮点至少一个可复制块；mono 品牌下
  benchmark 输出与 `--help` 片段是天然素材；破坏性变用 diff 块。
- 坦承不完美（"mainly a maintenance release" 级诚实）比粉饰可信。
- 比喻克制（Owner 法令 2026-09-07）：比喻=阅读成本。一篇至多一个、
  且只许出现在机制讲完后的定位句；主菜/赌注/接缝/同船/游戏房间这类
  行文比喻一律清除（craft.md D13，指标工具有计数）。
- 专有名词预算 + 大白话价值句（Owner 法令 2026-09-07）：内部代号一篇
  一把、首次出现必须大白话释义，否则换成行为描述；API/包名/CLI/错误码
  是对象不是术语，照用。每个亮点先说"你现在能做什么/什么日常痛点消失
  了"，再讲机制（craft.md D14/D15）。
- 示例代码必要、过剩折叠（Owner 法令 2026-09-07）：每个亮点至少一个
  可敲的示例；多了用 `<details><summary>示例：…</summary>` 折叠
  （.markdown-body details 已有样式）。示例只能来自 L1 release body、
  文中已链的 README/文档、或文章已断言的命令，不许发明 API（D16）。

## Frontmatter (linkage to projects)

```yaml
---
title: "UniPty v0.5.0"
date: 2026-09-20T09:12:34Z   # GitHub Release 的 published_at 全量 UTC 时间戳
                              # （Owner 法令 2026-09-07：文章日期 = release 发布
                              #  时刻，不是写作日；同日多篇按时刻排序。
                              #  展示层 displayDate 裁剪为 YYYY-MM-DD）
description: 一句话定位（索引页摘要直接用它）
author: jixoai
tags: [release, unipty]
repo: unipty        # 必须等于 projects.manifest.json 的 repo 字段
version: "0.5.0"    # 与 GitHub release tag 对齐（去 v）
lang: zh            # en 镜像标 en；镜像与主文 date 必须一致
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
- [ ] frontmatter repo/version 与 manifest/tag 对齐；date = release published_at
- [ ] `node scripts/ai-tone-metrics.mjs` 全绿（RED 清零）
- [ ] zh 终稿过 lieflat 白名单（引用技能 1），en 镜像过 craft.md §en tells
- [ ] `npm run build` 绿；文章页在 public/ 抽查 200

## References

- `references/craft.md` — D1–D12 起草法则 / R1–R7 修订门 / 中英 AI 腔
  清单 / M1–M6 镜像规则（源自本机写作 skill 群 + 网上编辑忠告的提炼）
- `references/archetypes.md` — A1–A14 原型模板 + 7 组横切微模式
  （40 篇前端工具链官方博文实读归纳，每条带来源 URL）
- `.agents/research/2026-09-07-writing-craft.md` — craft 的逐源清单
- `.agents/research/2026-09-07-blog-archetypes.md` — 16 候选池验证 + 方法
- `.agents/research/2026-09-06-release-blog-patterns.md` — org 级惯例源
