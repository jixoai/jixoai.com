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
4. **Draft with the craft rules** — `references/craft.md` D1–D16 是
   起草期句级法则（冷开、一句一职、长句+短钉、事实强度天花板……）。
   zh 为主文，en 同构镜像成对发布（结构逐节对齐；zh 先 en 后，
   间隔 ≤48h；镜像按 craft.md M1–M6 独立过一遍）。**「主文」指起草
   顺序，不是文件/URL 地位**：命名法里无后缀的 `xxx.md` 是国际版
   （英文），`xxx.zh.md` 是中文版（见 Title & slug laws）。
5. **Revise gate-ordered** — craft.md R1→R7（对账→追责→结构→机制→
   查簇→朗读→镜像），前一关不过不进下一关。R5 查簇必须跑量化工具：
   `node scripts/ai-tone-metrics.mjs`（全绿才放行，见下节）。zh 终稿
   再过一遍 lieflat 白名单（见 引用技能）。然后 `npm run build` green。
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

**全绿 ≠ 不 AI（2026-09-09 实测）**：7 篇原文在这个门禁上**全部零
告警**，但读起来仍偏 AI。原因是它只量正则能抓的表层特征，而实际的
AI 味在 craft 层，具体是三条 Owner 法令的违反 ——

1. 一篇文只讲一个版本（背景节写版本编年史、中间版本进叙事）；
2. 版面占比 ≈ 决策价值（发布管道、fixtures、CI 占了用户价值的位子）；
3. 专有名词预算 + 大白话价值句（亮点先讲机制、后讲或不讲读者所得）。

加上一类非法令但同样致命的：**自我标榜的形容词**（「诚实的限制清单」
「照实说」「不是营销数字」）—— 读者没有质疑过，辩护句只会显得心虚。
结论：门禁只用来兜底，判断一篇是否偏 AI 必须回到 craft 层逐条比对。

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

## 配图：真实截图流程（2026-09-11 先例，ui v0.4.0）

Owner 明确要过「你最好自己做一些截图，配合展示」。截图比手绘图可信，
凡是「组件长什么样」这类主张，能截就截。流程（一次跑通，可复用）：

1. **先看线上有没有**。线上站点常常还没部署到新版本
   （ui v0.4.0 时 `/docs/effects.html` 线上 404）——404 就转本地构建。
2. **本地出静态产物**。目标站的 `vite dev` 经常在沙箱里起不来（SvelteKit
   要写 `.svelte-kit`，在工作区之外会触发 `CODEBUDDY_BROKER_DENY`）。
   改跑它自己的构建脚本（如 `node scripts/build-site.mjs`），必要时加
   `dangerouslyDisableSandbox: true`，产物在 `public/` 或 `dist/`。
3. **起本地静态服务**：`python3 -m http.server 13900 --bind 127.0.0.1`。
   本机 curl 要走 `--noproxy '*'`（环境有代理）。
4. **用 ego-browser，不用 agent-browser**（Owner 法令 2026-09-11）。
   二进制在 `~/.local/bin/ego-browser`，**不在默认 PATH**，先
   `export PATH="$HOME/.local/bin:$PATH"`。API 是 TaskSpace/Page 子集，
   **不是 Playwright**（没有 `locator()`）。
   - 视口：`page.cdp("Emulation.setDeviceMetricsOverride", {width:1440,
     height:900, deviceScaleFactor:2, mobile:false})`。
   - 落盘：`page.screenshot({ path, fullPage, clip, scale, raw })`。
   - **heredoc 里 `page.evaluate` 不能用模板字符串**：`${…}` 会被 shell
     替换（报 `Bad substitution`）→ 一律用字符串拼接。
5. **找对滚动容器**。文档站的主滚动常在内部元素上（ui 是
   `.jx-shell-body`，`document` 根本不滚）→ 先探明是谁在滚，再直接设
   `scroller.scrollTop = n`，并在**下一轮** heredoc 里读回确认（同一轮里
   读会因为水合重置而误判）。
6. **落位**：`static/blog-assets/<slug>/`，正文用绝对路径引用
   `![alt](/blog-assets/<slug>/x.png)`。alt 要写清「这张图证明了什么」，
   不是文件名。**中英两稿必须引用同一组图**（用 `grep -o` 对比两张清单）。

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
  **Owner 先例 2026-09-10（opentray v0.23.0）**：8.5 小时内连发
  0.22.0 与 0.23.0 时，Owner 选择合并成一篇 v0.23.0，把「图标内核 →
  图标管线」当作一条跨 tag 落地的能力弧来写。执行方式（可复用）：
  站在**最新版本**的立场写，所有内容都以「现在」陈述（0.23.0 的依赖
  里确实含 @opentray/icon@0.23.0，读者装最新版就能全拿到），正文不出现
  中间版本号，只在链接栏把两个 release 永链都列出来做溯源。这样既守住
  「不写版本编年史」的实质，又不丢中间版本的信息。
- **对比用表格 + 数字**：优缺点横向对照，客观陈述，别一惊一乍。
- **致谢只致谢**：对象是人与社区。复核轮次、阻塞修复数、CI 过程
  一律不进致谢；要提最多在「其余变更」一句话，通常不提。


- 开发者对开发者；兴奋通过能力声明与数字表达，不通过形容词。
- 数字优先于形容词（体积/耗时/依赖数/issue 数）；性能声明带基线。
- **聚合数字必须说明口径，且可复现（2026-09-11）**：写进正文的
  `N 个 feat / N 个 fix` 这类统计，一律用严格口径
  `git log A..B --pretty=%s | grep -cE '^fix(\(|!|:)'`（按 conventional
  前缀计类型）。**不要用 `grep -ci fix`**——它统计的是「主题里出现过
  fix 字样」的提交，会把 `docs: fix the …` 也算进去，把 49 报成 73。
  本轮 ui v0.4.0 就因此把 49 个 fix 写成了 73。项目自己文档里的数字
  （如 openspec 提案的「197 处注入」「443 画布对 1580 卡片」）可直接
  引用，但要在提案原文里核到那一行。
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

## 重写既有稿：信息守恒（2026-09-09）

对已发布的稿子做减法改写时，删掉的内容必须逐条对账。起因是一次真丢失：
保留了「（release commit 原话）」这个归因，却删了原文开头的 commit 链接，
留下一个悬空引用。

- **引文留着，链接就得留着。** 任何「某某原话」「release commit 说」的
  归因必须带可点永链。信息守恒优先于精简。
- **真删除 ≠ diff 的删除行。** 改写过的行会同时出现在 `-` 与 `+` 两侧。
  判据：删掉的行若在新稿里找不到对位（字符 bigram Jaccard ≥ 0.3）才算丢
  失；frontmatter 行不计入。
- **丢失锚点单独扫。** URL / 行内 `` `…` `` / 版本号，出现在旧稿而不在新
  稿里的，逐个判定「刻意删」还是「误删」。三类常见误报：内容挪进了代码
  块（行内反引号正则抓不到）、反引号被拆开（`uvx/pipx run` → 两个）、
  措辞改写（`@latest` → `name@version`）。
- **站内链接单独验。** 正文的站内链接要在 `dist/` 里逐个确认能解析，且不
  出现跨语种泄漏（en 稿链到 zh-only 路径；镜像行除外）。

## Verification

- [ ] facts 可溯源（L1 body / changelog / openspec archive）
- [ ] 亮点小节都有动机句 + 代码或数字
- [ ] 链接四类齐全且是永链
- [ ] zh/en 成对、结构同构、slug 稳定
- [ ] frontmatter repo/version 与 manifest/tag 对齐；date = release published_at
- [ ] `node scripts/ai-tone-metrics.mjs` 全绿（RED 清零）
- [ ] zh 终稿过 lieflat 白名单（引用技能 1），en 镜像过 craft.md §en tells
- [ ] 重写稿跑过删除对账：真删除与丢失锚点逐个确认，无悬空引文（见上一节）
- [ ] 站内链接逐个能解析，无跨语种泄漏
- [ ] `npm run build` 绿；文章页在 public/ 抽查 200
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
- `.agents/research/2026-09-07-writing-craft.md` — craft 的逐源清单
- `.agents/research/2026-09-07-blog-archetypes.md` — 16 候选池验证 + 方法
- `.agents/research/2026-09-06-release-blog-patterns.md` — org 级惯例源
