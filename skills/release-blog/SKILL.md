---
name: release-blog
description: Write release announcement posts for jixoai.com/blog (the L2 narrative layer over GitHub Releases). Use when publishing a blog post about a sub-repo's release — structure, tone, frontmatter linkage, bilingual mirroring, screenshots, and the anti-patterns that get a draft rejected.
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

本文是索引：**法则全文按需读 `references/`**，不要全部内联进上下文。

## Workflow

1. **Gather facts** — the GitHub Release body (L1), the repo's
   CHANGELOG/changesets, and the motivating openspec change (archive/)
   for the "why" behind each highlight. Facts only from these sources;
   never invent claims. `releases.atom` 是拿精确 `published_at` 最稳的通道。
2. **Pick the archetype** — `references/archetypes.md` A1–A14（40 篇
   实文归纳的模板库）。发布文先选原型再动笔：里程碑 → A1，例行 →
   A2，性能主题 → A6，首次亮相/动机长文 → A8。骨架、证据纪律、
   开头与收尾招式按所选原型执行；本文件的 里程碑/例行模板 是 A1/A2
   的 jixoai 定制版。
3. **Pick the weight class** — 里程碑（x.0 / 重要 minor）→ 叙事文
   1500-3000 词，允许背景弧；例行 minor → 紧凑文 ≤1000 词；patch →
   不发 blog（只进 L1）。org blog 是多项目混排，补丁噪音淹没叙事。
4. **Draft with the craft rules** — `references/craft.md` D1–D16 是
   起草期句级法则（冷开、一句一职、长句+短钉、事实强度天花板……）。
   zh 为主文，en 同构镜像成对发布（结构逐节对齐；zh 先 en 后，
   间隔 ≤48h；镜像按 craft.md M1–M6 独立过一遍）。**「主文」指起草
   顺序，不是文件/URL 地位**：命名法里无后缀的 `xxx.md` 是国际版
   （英文），`xxx.zh.md` 是中文版（见 Title & slug laws）。
5. **配图** — 需要截图时读 `references/screenshots.md`（截展示区域不截
   整页；用完释放 ego-browser 的 TaskSpace）。
6. **Revise gate-ordered** — craft.md R1→R7（对账→追责→结构→机制→
   查簇→朗读→镜像），前一关不过不进下一关。R5 查簇必须跑量化工具：
   `node scripts/ai-tone-metrics.mjs`（全绿才放行，见下节）。zh 终稿
   再过一遍 lieflat 白名单（见 `references/external-skills.md`）。然后
   `npm run build` green。
   优先级注记：指标门禁与 lieflat 信息守恒冲突时（如必须保留的枚举
   材料），以 Owner 当次授权为准并在此处记录先例（2026-09-07 首例：
   shell 语义枚举按语法分组改写获准，语义零删减）。

## Quantifiable gate（ai-tone-metrics）

`node scripts/ai-tone-metrics.mjs` 按**文件名**分流两套规则：`*.zh.md`
走每千字特征频率（阈值取自 lieflat-less-ai-tone 的 283 万字语料实测，
AI vs 人类），其余 `*.md` 走 en-tell 预算表（em dash / 对比句式 / 浮夸
词 / 对冲堆叠 / 套话开头 / 动词三连）。**改了命名法就要同步改这里的
后缀判定**，否则会把中文正则套到英文稿上、英文预算表一篇都跑不到。
RED = 超 AI 均值（必改），YELLOW = 超 1.5× 人类均值（按簇判断），
LOW = 数字/时间锚点密度低于人类一半（材料稀薄，补证据）。regex 量不到
的（相邻句同款等）靠 craft.md R6 朗读人工把关。工具当前基线教训：
破折号是本站最大犯规点（曾 3.6–6.5/千字 vs 人类 0.8）。

**门禁只兜底**：全绿不等于不 AI（2026-09-09 实测 7 篇全绿仍偏 AI），
两条易踩的正则口径与 craft 层判据见 `references/tone-laws.md`。

## 引用技能

两个外部 skill（lieflat-less-ai-tone / drawio-skill）与三份本仓库研究档
的导读、调用时机、产物落位，见 `references/external-skills.md`。

## 配图

截图流程、区块裁剪口径、ego-browser 的坑与**用完释放**，见
`references/screenshots.md`。第一原则：截展示区域，不截整页。

## Title & slug laws

- 标题公式全站唯一：`<Project> vX.Y.Z`（裸版本号带 v，与 version pill
  的 tag 显示同构）。里程碑可加冒号副题：
  `UniPty v1.0：runtime-neutral PTY 的第一份长期契约`。
- slug 英文 kebab、含版本、永不改链：
  `content/blog/2026-09-06-unipty-v0-2-0.md`。
- **双语文件命名（2026-09-09 法令）**：语种写在**文件名**里，不写在
  slug 里——国际版/英文版是无后缀的 `xxx.md`，中文版是 `xxx.zh.md`。
  两者共用同一个 slug，URL 只差站点前缀：`/blog/<slug>/`（英文）与
  `/zh/blog/<slug>/`（中文）。旧的 `xxx-en.md` 约定已废：它让一篇
  文章占两个 slug、两个 URL，列表页要靠后缀猜语种。
- **en 稿零中文（2026-09-09 法令）**：英文版正文不得出现汉字，包括
  小节标题里的括注（如 `Figure（浮）`）和镜像栏的标签（`中文主文` →
  `Chinese version`）。唯一豁免是外链 URL 里的真实文件名/路径
  （如 GitHub 上的 `架构设计.md`）——那是标识符，不是行文。
- **链接栏必须同语种（2026-09-10 法令）**：一篇稿子里所有站内链接都
  要指向**它自己那个语种**的 URL——中文稿里的「本站系列」「上一版」
  等交叉链接必须写 `/zh/blog/...`，不能写 `/blog/...`（那会把中文读者
  送到英文文章）。唯一例外是末尾的镜像行，即**只含一个链接**的那个
  列表项（`- English version: [...]` / `- Chinese version: [...]`）。
  写多个链接的「本站系列」行**不算**镜像行，不适用豁免。
- **图片是资源，不是页（2026-09-11）**：配图写
  `![alt](/blog-assets/<slug>/x.png)`，从 `static/` 原样发出，既没有尾
  斜杠也没有语种。链接审计对 `.png/.jpg/.jpeg/.webp/.svg/.gif/.avif/
  .ico/.pdf/.mp4/.webm` 走资源分支——跳过尾斜杠规则与跨语种判定，改判
  `dist/<path>` 是否存在。没有这条分支时，配图会被误报成「无尾斜杠」。
- tags 受控：每项目一个 repo tag（`unipty`/`openspecui`/`ui`/
  `opentray`/`opendweb`/`openiweb`）。**不要加 `release`**
  （2026-09-09：它跟 `/blog/` 索引完全重合，标签分组会退化成第二个
  "全部文章"页）。

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

### changelog 视角（Owner 先例 2026-09-11，ui v0.4.0）

Owner 可能要求「基于客观的 commits 去写，changelog 的角度去靠，每一个点
都提一下，关键的点配图」。这与「精选 2-4 亮点」不冲突，是另一种切法：

- 把该版本全部 commit **按 scope 归组**（`git log A..B --pretty=%s`），
  每组一个小节，标题统一成「能力名：一句话」。
- **均衡覆盖**：不要把一个主题写长、其余一句带过（ui v0.4.0 第一版
  特效占了一半篇幅，被退回重写）。破坏性变更独立成迁移节。
- 机制细节压缩，代码示例只留可复制的关键块；每组都挂一句动机。
- 篇末补一行提交类型统计（口径见 tone-laws）。

## 内容权重与 Tone laws

完整法则（平实基调、一篇文只讲一个版本、修复默认一句话、聚合数字口径、
比喻/专有名词预算、示例折叠……）见 `references/tone-laws.md`。

三条最常犯的，先记住：

1. **一篇文只讲一个版本** —— 中间版本不进叙事，只在链接栏列永链溯源。
2. **顺序 = 新功能 → 破坏性变更 → 修复**；修复默认一句话 + commit 永链。
3. **聚合数字用严格口径** —— `grep -cE '^fix(\(|!|:)'`，不要 `grep -ci fix`。

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
tags: [unipty]      # 只放项目 tag，不要加 release（见 Title & slug laws）
repo: unipty        # 必须等于 projects.manifest.json 的 repo 字段
version: "0.5.0"    # 与 GitHub release tag 对齐（去 v）
lang: zh            # 冗余兜底：语种由文件名决定（.zh.md = zh，无后缀 = en），
                    # 两者不一致时以文件名为准；镜像与主文 date 必须一致
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

## 重写既有稿：信息守恒

引文与链接同生共死、真删除判据、丢失锚点三类误报、链接审计脚本的判定
细节，见 `references/information-conservation.md`。

## Verification

- [ ] facts 可溯源（L1 body / changelog / openspec archive）
- [ ] 亮点小节都有动机句 + 代码或数字
- [ ] 链接四类齐全且是永链
- [ ] zh/en 成对、结构同构、slug 稳定
- [ ] frontmatter repo/version 与 manifest/tag 对齐；date = release published_at
- [ ] `node scripts/ai-tone-metrics.mjs` 全绿（RED 清零）
- [ ] zh 终稿过 lieflat 白名单（引用技能 1），en 镜像过 craft.md §en tells
- [ ] 重写稿跑过删除对账：真删除与丢失锚点逐个确认，无悬空引文
- [ ] 站内链接逐个能解析，无跨语种泄漏
- [ ] **事实与口径复核**（`references/tone-laws.md` 末节，五类）：第三方
  库版本回上游 CHANGELOG 核实（不转述仓库提案）；破坏性变更条数与 `!`
  标记对账并写明口径；「新增 N」区分净值/增量；每个数字能指到源且算术
  自洽；专有名词先 `git grep` 仓库再判断是不是自造比喻
- [ ] `npm run build` 绿；文章页在 public/ 抽查 200
- [ ] **推送后抽查线上页面**（2026-09-11）：`curl` 抓 `/zh/blog/<slug>/` 与
  `/blog/<slug>/`，逐个 grep 本轮改动的关键词，确认**新串在、旧串已消失**，
  再抽查配图 URL 是否 200。只看 HTTP 200 会把「部署没跑完/跑了旧版」当成
  通过；deploy.yml 在 push 到 main 时触发，本地产物（dist/、public/）不入库
- [ ] 配图是**展示区域的裁剪图**（不是整页视口），每张单看就能知道它
  证明了什么；中英两稿引用同一组图；换图后重建过站点
- [ ] 用过 ego-browser 的话，`listTaskSpaces()` 已清空（`finish({keep:[]})`）
- [ ] **改过门禁脚本后，必须造反例验证它没失效**（2026-09-10）：全站
  0 告警既可能是干净，也可能是门禁坏了。往 zh 稿塞一行「别的文章的
  英文页 + 德文页」双链接、往 en 稿塞一行 `/zh/` + `/de/` 双链接，
  应分别报 2 与 2；还原后必须回到 0。两个方向都要试——只看一个方向
  会漏掉「zh 稿链英文页」这类反向泄漏。
- [ ] **加资源分支时，反例要覆盖三类**（2026-09-11）：一次探针文件同时
  塞进 ① 无尾斜杠的页链接（报 noSlash）② 缺图 `…/nope.png`（报断链）
  ③ 多链接的跨语种正文行（报跨语种），并放一张**存在**的图作为对照
  （必须不被报）。预期 1/1/1；删掉探针回到 0/0/0。只测「存在」的图会
  把「资源分支吞掉了全部检查」误判成通过。

## References

- `references/craft.md` — D1–D16 起草法则 / R1–R7 修订门 / 中英 AI 腔
  清单 / M1–M6 镜像规则（源自本机写作 skill 群 + 网上编辑忠告的提炼）
- `references/archetypes.md` — A1–A14 原型模板 + 7 组横切微模式
  （40 篇前端工具链官方博文实读归纳，每条带来源 URL）
- `references/tone-laws.md` — Owner 语体与内容权重法令全文
- `references/screenshots.md` — 真实截图流程 + ego-browser 释放
- `references/information-conservation.md` — 重写对账 + 链接审计判定细节
- `references/external-skills.md` — 引用技能导读 + 本仓库研究档索引
