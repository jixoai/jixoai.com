# Release Blog 模式调研：成熟开源组织如何撰写发布博客

> 意图：为 jixoai.com 的 release-blog 建立可执行的写作规范素材。
> 原始需求（2026-09-06）：调研 github.blog / blog.rust-lang.org / Svelte / Vite / Deno / Node / Bun / Astro / Vercel / Tailwind / pnpm / Go / React / Vue 的发布文写法，产出样本清单、结构模板、写作法则、jixoai.com 适配建议。
> 方法：全部结论来自 2026-09-06 的实时抓取（WebFetch），每条论断附来源 URL；无训练记忆编造。

---

## 1. 样本清单

| # | 组织 | 标题惯例 | 节奏 | 篇幅/形态 |
|---|------|---------|------|-----------|
| 1 | Rust | `Announcing Rust 1.98.0` | 每 6 周一版必发 | ~650 词，克制 |
| 2 | Astro | `Astro 7.3`（裸版本号） | 每 3-4 周 + 月度 digest | ~900 词，亲切 |
| 3 | Deno | `Deno 2.9`（裸版本号） | 每 1-3 个月 | 5500-6500 词，目录级长文 |
| 4 | Vite | `Announcing Vite 8`（正文标题 "Vite 8.0 is out!"） | 大版本年度一发 | ~1700 词，叙事弧 |
| 5 | Svelte | `Announcing Svelte 4` / `Svelte 5 is alive` | 大版本才发 + 月度 roundup | ~750 词，谦逊 |
| 6 | Bun | 补丁 `Bun v1.4.2`（带 v 全 semver）/ 小版本 `Bun 1.4`（不带 v） | 补丁 1-3 周一发 | 补丁帖短，小版本帖长 |
| 7 | Node.js | `Node.js 26.8.0 (Current)` | 双周-月度 | 机器生成 changelog，20 分钟读 |
| 8 | GitHub Changelog | 陈述句（"Copilot code review can now approve pull requests"） | 每天 3-6 条 | 单条 1-2 句，feed 非 blog |
| 9 | Tailwind | `Tailwind CSS v4.0` | 大版本一发 | ~2800 词，20+ 代码块 |
| 10 | React | `React v19` | 大版本一发 | 4000-5000 词，文档化 |
| 11 | Go | （不发版本博客；分层文档） | — | 见分层模型 |
| 12 | pnpm | `pnpm 11.25`（可合并区间 `pnpm 11.15-11.19`） | 周-双周 | 4-16 分钟读 |
| 13 | Vercel | `Introducing X` / `AI SDK 7` | 每周 2-4 篇 | 产品公告混合工程深潜 |
| 14 | Vue | `Announcing Vue 3.5`（带动漫代号） | 每年 2-4 篇 | 叙事驱动 |

### 逐家观察

1. **Rust** — 最纪律的"每版必发"样本：标题恒为 `Announcing Rust X.Y.Z`，署名 "The Rust Release Team"，正文固定骨架 `What's in X.Y.Z stable →（2-4 个特性各配动机短文）→ Stabilized APIs（清单）→ Contributors`，结尾一句话致谢链到 thanks.rust-lang.org。无 tag、无翻译。~650 词，两段小代码（`rustup update` + 一个 UB 示例），无截图。
   <https://blog.rust-lang.org/2026/08/20/Rust-1.98.0/>

2. **Astro** — 高频小步发布的范本：裸版本号标题，开场白 `Astro 7.3 is here!`，骨架为 `2-3 个特性小节（各配代码示例与动机）→ Other improvements（短清单）→ Community（点名致谢核心团队与贡献者）`，结尾 "We hope you enjoy Astro 7.3" + Discord/Bluesky 等反馈渠道。另有每月末 `What's new in Astro - <Month>` digest 兜住零碎更新。
   <https://astro.build/blog/astro-730/>

3. **Deno** — 目录级长文上限：5500-6500 词，每大节先讲痛点再讲方案（"Building a desktop app has usually meant pulling in Electron or Tauri…"），破坏性变更显式标注 "a behavior change" 并给 opt-in 路径，升级一句话 `deno upgrade`，PR 永链 + docs 交叉链密集，结尾 Acknowledgments 点名 ~30 位贡献者 + `That's all for 2.9, thanks for reading and see you in the next release.` 帖子带 `Product Update` tag；偶发日语本地活动帖。
   <https://deno.com/blog/v2.9>

4. **Vite** — 叙事弧最完整的样本：URL slug 是 `announcing-vite8` 但页面标题为 "Vite 8.0 is out!"。骨架：`当年双打包器的 pragmatic bet → 问题 → Rolldown 方案 → preview→beta→stable 的旅程 → 真实性能（Linear 46s→6s）→ 迁移（兼容层 + 两步走）→ Looking Ahead → Thank You, Rollup and esbuild → Acknowledgments`。零代码块零截图，纯讲故事；赞助链接收尾。**双语标杆**：7 个语言子域（cn/ja/es/pt/ko/de/fa.vite.dev），中文版结构逐节对齐英文版、标题锚点保持英文 slug，由社区翻译仓库（vitejs/docs-cn）维护，页脚带 "edit this page" 链接。
   <https://vite.dev/blog/announcing-vite8> ・ <https://cn.vite.dev/blog/announcing-vite8>

5. **Svelte** — 谦逊叙事样本：`Announcing Svelte 4` 副题 "Updated performance, developer experience, and site"，~750 词零代码，用内联数字说话（产物 126.3→110.2 kB、包体积 10.6MB→2.8MB、依赖 61→16），坦承 "mainly a maintenance release"，专设 Migrating 节 + `npx svelte-migrate@latest svelte-4` 一键迁移，结尾致谢 + Svelte 5 预告 "stay tuned!"。日常节奏靠每月 1 日的 `What's new in Svelte: <Month>` roundup 支撑（自 2020-10 持续至今）。
   <https://svelte.dev/blog/svelte-4>

6. **Bun** — 补丁发布工业化的样本：补丁帖标题带 v 和全 semver（`Bun v1.4.2`），开场固定句式 `Fixes 202 issues, addressing 236 👍`；小版本标题不带 v（`Bun 1.4`）。博客有 `Everything / Articles / Releases` 三档过滤器，178 篇帖子里绝大多数是 release。
   <https://bun.sh/blog>

7. **Node.js** — 反面参照（对 jixoai 而言）：`Node.js 26.8.0 (Current)` 帖即 CHANGELOG.md 机器转贴：Notable Changes 13 条 + 全量 ~230 条 commit + SHASUMS 校验和，20 分钟阅读时长，无一句动机。它证明"发布帖 ≠ 博客帖"——Node 把博客栏目当发布注册表用。博客有 announcements/release/vulnerability/migrations/events 五分类。
   <https://nodejs.org/en/blog/release/v26.8.0>

8. **GitHub Changelog** — changelog 与 blog 物理分家的样本：github.blog 域名下挂一个纯 feed，每天 3-6 条原子条目，单条 = 日期 + 分类（Release/Improvement/Retired）+ 一句陈述句标题 + 产品域 tag（可多选、Any/All 匹配）。版本号和营销语都不进标题。
   <https://github.blog/changelog/>

9. **Tailwind v4** — 情绪化长文的样本：作者署名 Adam Wathan，开场 `Holy shit it's actually done — we just tagged Tailwind CSS v4.0.`，~2800 词、18 节、20+ 代码块、一张基准表（增量构建 35ms→192µs, 182x）。破坏性变更**前置**处理："we've published a comprehensive upgrade guide and built an automated upgrade tool"。结尾玩笑收场 + newsletter 订阅。
   <https://tailwindcss.com/blog/tailwindcss-v4>

10. **React 19** — 文档化克制样本：署名 The React Team，语气官方克制（兴奋只通过能力声明表达）。骨架 = 特性目录，但每个特性先给痛点（"In the past, you would need to handle pending states, errors, optimistic updates… manually"）再给 ~20 个代码块。**破坏性变更完全外包**给独立的 Upgrade Guide（正文引用 4 次），结尾 abrupt："See the React 19 Upgrade Guide for step-by-step instructions…"
    <https://react.dev/blog/2024/12/05/react-19>

11. **Go** — 分层沟通模型（不写版本博客）：`Release History` 页是极简注册表（每条 = 版本+日期 + 受影响包清单 + milestone 链接），全量 changelog 在 `/change`，特性叙事在 `/doc/go1.26` release notes，"为什么"在 go.dev/blog。四层各答一个问题：改了什么 / 哪些 bug / 有什么新能力 / 为什么这样设计。
    <https://go.dev/doc/devel/release>

12. **pnpm** — 单人维护式节奏：裸版本号标题（`pnpm 11.25`），周-双周一发，多版本可合并成一篇（`pnpm 11.15-11.19`），统一单 tag `release`，固定作者 Zoltan Kochan（Lead maintainer 头衔）。站点级语言选择器带翻译完成度百分比（简体中文 99%）。
    <https://pnpm.io/blog>

13. **Vercel** — 平台型公告混排：`Introducing X` 主导产品发布，GA 里程碑用 "now generally available"，工程深潜用 "How we…"，AI SDK 版本帖用裸版本号（`AI SDK 7`），每周 2-4 篇，索引页无作者署名。
    <https://vercel.com/blog>

14. **Vue** — 低频叙事样本：`Announcing Vue 3.5`，版本带动漫代号（One Piece/Naruto…），每年仅 2-4 篇，第一人称叙事（"Today we are excited to announce"）。双语处理用"文末追加"模式：Volar 1.0 帖注明 "There is Chinese version of this post at the end"。
    <https://blog.vuejs.org/>

---

## 2. 提炼的结构模板

### 2.1 沟通分层（changelog 与 blog 的分工——Go/Vite/GitHub 共同验证）

```
┌─────────────────────────────────────────────────────────────┐
│  L1  GitHub Releases / CHANGELOG.md                          │
│      全量、机器生成、可订阅。回答「改了什么」。               │
│      (Node 的 blog=changelog 转贴；GitHub Changelog 是独立feed)│
├─────────────────────────────────────────────────────────────┤
│  L2  Release Blog Post（本文档的主角）                        │
│      精选 2-4 个亮点 + 动机叙事。回答「为什么做、对你意味着    │
│      什么」。只链接 L1，不复制 L1。                           │
├─────────────────────────────────────────────────────────────┤
│  L3  Upgrade Guide / Migration Doc                           │
│      破坏性变更操作手册。回答「怎么升」。                     │
│      (React 把 breaking 全部外包给 L3；Tailwind 提供 L3+自动  │
│       迁移工具；Svelte 提供 npx svelte-migrate)              │
├─────────────────────────────────────────────────────────────┤
│  L4  月度 digest（可选）「What's new in X - <Month>」        │
│      兜住不值得单发的小更新。(Astro/Svelte 双验证)            │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 里程碑发布文模板（大版本/重要 minor，叙事型）

```
标题:  Announcing <Project> vX.Y    （或裸 "<Project> vX.Y"，二选一并全站统一）
────────────────────────────────────────────────────────────
[钩子]  1-2 句。状态宣告 + 本版一句话定位。
        例: "Vite 8.0 is out!" / "Deno 2.9 is here, headlined
             by deno desktop" / "Svelte 4 … stable release"
[背景]  只在大版本需要：当年的设计赌注 / 演进弧线
        (Vite: "we made a pragmatic bet on two bundlers")
────────────────────────────────────────────────────────────
[亮点 1]  小节标题 = 用户能做什么，不是内部改动名
          痛点(1-2句) → 方案 → 代码示例/数字证据 → 文档链接
[亮点 2]  同上（大版本挑 2-4 个；React 19 上限 ~6 个）
[亮点 3]  同上
────────────────────────────────────────────────────────────
[其余变更] 一段短清单或一段话，逐条链 changelog，不展开
────────────────────────────────────────────────────────────
[迁移]   有破坏性变更 → 专节，语气温和笃定，给一键路径
         (npx migrate / 兼容层 / 两步走)；无破坏 → 一句
         "升级即 `npm i xxx@latest`"
────────────────────────────────────────────────────────────
[展望]   下一版本/下一阶段的 1-2 句预告 (可选，Looking Ahead)
[致谢]   点名或链到贡献者页；感谢前置依赖与生态
[链接栏] changelog / 升级指南 / 讨论区 / 官网 / 赞助
────────────────────────────────────────────────────────────
署名:   个人名+头衔 或 "The X Team"；日期
```

### 2.3 例行发布文模板（小步快跑，Astro/Rust 验证）

```
标题:  <Project> vX.Y.Z            （裸版本号，不带 "Announcing"）
[钩子]  "<Project> vX.Y.Z is here!" + 一句话本版主菜
[特性]  2-3 个小节，各: 动机一两句 + 代码块 + 文档链接
[其他]  "Other improvements" 短清单
[升级]  npx 升级命令 或 包管理器一行
[社区]  致谢贡献者名单 + 反馈渠道(Discord/GitHub issues)
全文 ≤ 1000 词；无故事可讲就不写故事
```

---

## 3. 写作法则清单（可直接作为 SKILL.md 正文）

> 自足版：以下法则不依赖本文其它章节即可执行。每条括注来源样本。

### 3.1 标题与命名

1. 全站统一一种标题公式，不得混用。可选：`Announcing <Project> vX.Y`（Rust/Vite/Svelte/Vue）或裸 `<Project> vX.Y`（Astro/Deno/pnpm/Vercel AI SDK）。(Rust <https://blog.rust-lang.org/2026/08/20/Rust-1.98.0/>; Astro <https://astro.build/blog/astro-730/>)
2. 标题里放版本号，别放营销语；亮点短语只作副题或描述字段。(Svelte 4 副题 "Updated performance, developer experience, and site" <https://svelte.dev/blog/svelte-4>)
3. 补丁帖与小版本帖若都发，用可区分的命名约定（Bun：补丁带 v 全 semver，小版本不带 v）。(<https://bun.sh/blog>)
4. URL slug 用英文 kebab-case 且稳定（vite 的 slug `announcing-vite8` 与页面标题解耦，永不因改标题而换链）。(<https://vite.dev/blog/announcing-vite8>)
5. tag 用受控词表（release / announcement / 每项目一个 repo tag），拒绝自由标签。(Node 五分类 <https://nodejs.org/en/blog/release/v26.8.0>; Deno `Product Update` <https://deno.com/blog/v2.9>)

### 3.2 结构

6. 钩子必须在前两句内完成两件事：宣告版本 + 一句话定位本版。("Deno 2.9 is here, headlined by deno desktop" <https://deno.com/blog/v2.9>)
7. 正文挑 2-4 个亮点深讲，其余变更收敛进一个短清单节并逐条外链 changelog——blog 是精选不是全量。(Rust `Other changes` 节 <https://blog.rust-lang.org/2026/08/20/Rust-1.98.0/>)
8. 每个亮点小节先给动机（痛点 1-2 句）再给方案，最后才是证据；小节标题写成用户视角的能力而非内部模块名。(React "In the past, you would need to handle pending states… manually" <https://react.dev/blog/2024/12/05/react-19>)
9. 破坏性变更必须有独立的迁移章节，且提供最低摩擦升级路径（一键迁移命令 / 兼容层 / 分步方案），语气笃定不道歉。(Svelte `npx svelte-migrate@latest svelte-4` <https://svelte.dev/blog/svelte-4>; Vite 兼容层+两步走 <https://vite.dev/blog/announcing-vite8>; Tailwind 升级指南+自动工具 <https://tailwindcss.com/blog/tailwindcss-v4>)
10. 结尾三件套：致谢（点名或链贡献者页）→ 反馈/讨论渠道 → （可选）下一版预告。Deno 的 "That's all for 2.9, thanks for reading and see you in the next release" 是节奏感范本。(Rust contributors 节 <https://blog.rust-lang.org/2026/08/20/Rust-1.98.0/>; Deno <https://deno.com/blog/v2.9>)
11. 大版本才需要"背景弧"（当年为什么这么做→现在改了什么主张）；例行版本禁用背景节，直接进特性。(Vite "pragmatic bet on two bundlers" <https://vite.dev/blog/announcing-vite8>)

### 3.3 篇幅与语气

12. 篇幅分级：例行版 ≤ 1000 词（Astro ~900、Rust ~650、Svelte ~750）；里程碑版 1500-3000 词（Vite ~1700、Tailwind ~2800）；Deno 式 5000+ 词目录长文只配得上半年一遇的大版本。(各样本 URL 同上)
13. 语气 = "开发者对开发者"的兴奋，不是营销文案。允许一句情绪化开场（Tailwind "Holy shit it's actually done"）但全篇只此一次；React 的克制风格同样成立——能力声明代替形容词堆砌。(Tailwind <https://tailwindcss.com/blog/tailwindcss-v4>; React <https://react.dev/blog/2024/12/05/react-19>)
14. 数字优先于形容词：内联具体指标（体积、耗时、依赖数）自带说服力。(Svelte 126.3→110.2 kB、依赖 61→16 <https://svelte.dev/blog/svelte-4>; Tailwind 基准表 182x <https://tailwindcss.com/blog/tailwindcss-v4>)
15. 坦承不完美比粉饰更可信：Vite 专设 "Install Size" 一节公开包体积上涨，Svelte 自称 "mainly a maintenance release"。(Vite <https://vite.dev/blog/announcing-vite8>; Svelte <https://svelte.dev/blog/svelte-4>)

### 3.4 代码、演示与媒体

16. CLI/框架类项目：每个亮点配一个可复制的最小代码块（bash 安装/升级命令必有一个）；纯叙事型里程碑（Vite 8）可以零代码，但那是叙事弧够强时的例外。(Astro 3 个代码块 <https://astro.build/blog/astro-730/>; Vite 零代码 <https://vite.dev/blog/announcing-vite8>)
17. 截图/视频不是必需品——14 个样本中多数里程碑文靠代码块和数字，不靠动图。(统计自全部样本)
18. 性能声明给对比基线和环境（Tailwind 基准表、Vite 引 Linear/Ramp 实例）。(<https://tailwindcss.com/blog/tailwindcss-v4>; <https://vite.dev/blog/announcing-vite8>)

### 3.5 changelog 与 blog 的分工（链接纪律）

19. blog 绝不复制 changelog 全文；"Other improvements" 一节每条一行并链到 changelog/GitHub Releases。(Astro 链 `packages/astro/CHANGELOG.md` <https://astro.build/blog/astro-730/>)
20. 每篇至少外链四类目的地：changelog、文档、升级指南（若有破坏性变更）、讨论/反馈渠道。缺一类就在文末链接栏补齐。(Vite 链接矩阵 <https://vite.dev/blog/announcing-vite8>)
21. 提及具体改动时链 PR 永链或 milestone，不链可变的列表页。(Deno PR permalinks <https://deno.com/blog/v2.9>; Go milestone 链接 <https://go.dev/doc/devel/release>)
22. 交叉链历史发布文（"上版本我们做了 X"）建立系列感。(Astro 文末 Related posts 7.1/7.2 <https://astro.build/blog/astro-730/>; Deno 链 v2.6/v2.8 <https://deno.com/blog/v2.9>)

### 3.6 发布节奏与系列感

23. 节奏公式 = 发布频率 × 帖子重量成反比：6 周-3 月一版的可以每版都发（Rust/Astro）；年度大版本配一篇重叙事（Vite）；补丁流只在有用户可感修复时发短帖（Bun "Fixes 202 issues"）。(各索引页)
24. 小更新不值得单发时，用月度 digest 兜底（`What's new in X - <Month>`，Astro 与 Svelte 双验证，Svelte 自 2020-10 连续运行至今）。(<https://astro.build/blog/whats-new-august-2026/>; <https://svelte.dev/blog>)
25. 每 post 固定署名（个人+头衔或 Team 名），让读者建立人脸记忆。(pnpm "Zoltan Kochan, Lead maintainer" <https://pnpm.io/blog>; Rust "The Rust Release Team")

### 3.7 双语/多语言

26. 双语的正解是"同构镜像"而非"文末追加"：Vite 用语言子域 + 社区翻译仓库，中文版逐节对齐英文版、标题锚点保留英文 slug，保证跨语言链接和锚点不碎。文末追加（Vue Volar 帖）只适合偶发短文。(Vite zh <https://cn.vite.dev/blog/announcing-vite8>; Vue <https://blog.vuejs.org/>)
27. 本地语言只用于本地事件（Deno 日语帖仅限东京聚会公告），产品发布保持统一主语言。(Deno <https://deno.com/blog>)
28. 翻译要有可见的完成度和修错入口（pnpm 站点级语言选择器带百分比；Vite 页脚 "edit this page" 指向翻译仓库）。(<https://pnpm.io/blog>; <https://cn.vite.dev/blog/announcing-vite8>)

### 3.8 反模式（看到即打回）

29. 纯罗列：把 changelog 原文贴进博客（Node 式 230 条 commit 转贴对读者是 20 分钟的惩罚；它只在"博客即注册表"的定位下成立）。(<https://nodejs.org/en/blog/release/v26.8.0>)
30. 无动机：只写"新增了 X"不写"为什么你需要 X"——每个特性至少一句痛点。(对照正例 React/Deno 的每节痛点开场)
31. 无升级路径：有破坏性变更却不给迁移节/工具/指南链接。(React 反面即正例：4 次引用 Upgrade Guide <https://react.dev/blog/2024/12/05/react-19>)
32. 无链接纪律：正文没有 changelog/文档/讨论区出口，读者读完即死路。
33. 营销语淹没技术内容：形容词多于数字和代码块。
34. 破坏性变更埋在文末或 "Other changes" 里不打招呼；正确做法是迁移节显式标注（Deno "a behavior change" + opt-in 指引 <https://deno.com/blog/v2.9>）。
35. 标题公式漂移：同一博客里 "Announcing X"/"X released"/"X is here" 混用，破坏系列辨识度。

---

## 4. jixoai.com 适配建议

> 本节为基于调研的推导建议（非来源论断），落点在 jixoai.com 现有资产：`content/blog/` markdown + frontmatter、`projects.manifest.json` 驱动的 projects 页（构建期拉取 GitHub Release，卡片带 version pill 链到 releaseUrl）、terminal/mono 视觉（jixoai-ui registry，hue 0）、llms.txt 导出层。

### 4.1 总体定位

```
GitHub Releases        = L1 全量 changelog（已有，version pill 正在消费它）
jixoai.com/blog        = L2 发布叙事（本文档规范的对象，新增）
MIGRATION.md / 指南    = L3 升级手册（有破坏性变更时随 repo 提供，blog 链接）
（暂不需要 L4 月度 digest——等单项目发布密度上来再引入）
```

发布权重分级：**里程碑（x.0）/ 重要 minor → org blog 单发叙事文；例行 patch → 只进 GitHub Releases，不发 blog**。jixoai 是多项目组织博客（对照 Vercel 混排模式），补丁噪音会淹没组织叙事。

### 4.2 terminal/mono 品牌下的写法

- **标题公式**：项目名带 `v` 前缀的裸版本号 `UniPty v0.5.0`（Bun 补丁式命名，与 version pill 显示的 tag 格式天然一致）；里程碑可加冒号短语副题：`UniPty v1.0：runtime-neutral PTY 的第一份长期契约`。全站固定一种。
- **slug**：`content/blog/2026-09-06-unipty-v0-5-0.md`，英文 kebab、永不改链。
- **terminal 化的"钩子"**：正文第一行可用一行终端输出作 kicker（品牌彩蛋），但下一句必须回到正常人话的宣告+定位：
  ```text
  $ unipty --version
  unipty/0.5.0 (darwin-arm64, napi)

  UniPty v0.5.0 发布了。这一版的主菜是 backend 热切换……
  ```
- **代码块即视觉**：mono-first 品牌下，代码块是最廉价的演示图——每个亮点至少一个可复制块；破坏性变更用 diff 块呈现（绿红即语义，零颜色 token 之外的装饰）。
- **数字优先**（法则 14）与 terminal 审美同源：benchmark 输出、`--help` 片段都是天然素材。
- **克制情绪**：品牌是 neo-brutalist 不是 carnival；Tailwind 式粗口开场不适配，用 "It's done." 级的冷句即可。

### 4.3 frontmatter 扩展与 projects 页联动

现状 frontmatter：`title/date/description/author/tags`（见 `content/blog/2026-09-06-site-relaunch.md`）。建议 release 帖增加两个键，打通 manifest：

```yaml
---
title: "UniPty v0.5.0"
date: 2026-09-20
description: ……一句话定位……
author: jixoai
tags: [release, unipty]
repo: unipty        # ← 键必须等于 projects.manifest.json 的 repo 字段
version: "0.5.0"    # ← 与 GitHub release tag 对齐（去 v）
---
```

联动点（全部是构建期静态拼接，零运行时成本）：

```
projects 页 version pill ──(已有)──→ GitHub Release (L1)
projects/[repo] 详情页  ──(新增)──→ 本 repo 的 release 帖列表（按 repo 字段过滤）
release 帖头部          ──(新增)──→ 复用 .version-pill 组件渲染 version 字段，
                                    点击进 GitHub Release（与卡片 pill 同一交互契约）
release 帖文末链接栏    ──(规范)──→ changelog(GH Release) / 升级指南 / 讨论区
                                    (GitHub Discussions/Issues) / 项目官网 / projects 页
```

这样 version pill 成为全站统一的"版本入口"：卡片上它是最新版的快捷方式，博文里它是同一视觉组件的复用，读者在任何页面都以同一心智抵达 release。

### 4.4 zh/en 双语策略

- **主语言 zh，en 做同构镜像**（Vite 模式，法则 26）：同一 stem 双文件 `2026-09-20-unipty-v0-5-0.zh.md` / `.en.md`，frontmatter 加 `lang` 与互链字段（`translation: <stem>`）。
- **锚点纪律**：两个语言版本的标题锚点保持一致（headings 用英文，或显式 slug），保证 `zh#backend-switch` ↔ `en#backend-switch` 互跳不碎，也让 llms.txt 的两语言镜像对齐。
- **发布时序**：zh 先发（母语产出效率），en 在 48h 内补齐；补齐前 zh 帖文末放 "English version: coming soon" 占位链接，避免死链。
- **分工例外**（Deno 法则 27）：面向国际 OSS 受众的项目发布文，允许 en 为主 zh 为镜像（如 unipty/openspecui）；组织动态（lab news）zh 单语即可。默认规则写入项目 skill，不逐篇决策。
- **翻译出口**：文末一行 `发现翻译问题？编辑此页 →` 链到仓库文件路径（Vite 的 edit-this-page 模式）。

### 4.5 与现有 llms.txt 层的对齐

发布文是 AI 代理最常消费的内容形态（版本能力、迁移路径）。jixoai.com 已有 per-page `.md` 镜像导出：release 帖应保证结构化 frontmatter（repo/version/tags）随镜像导出，使 `llms.txt` 索引能按项目/版本检索发布文——这是上述 frontmatter 扩展的第二个收益。

---

## 附：本次抓取的全部来源 URL

- <https://blog.rust-lang.org/> ・ <https://blog.rust-lang.org/2026/08/20/Rust-1.98.0/>
- <https://astro.build/blog/> ・ <https://astro.build/blog/astro-730/> ・ <https://astro.build/blog/whats-new-august-2026/>
- <https://deno.com/blog> ・ <https://deno.com/blog/v2.9>
- <https://vite.dev/blog/> ・ <https://vite.dev/blog/announcing-vite8> ・ <https://cn.vite.dev/blog/announcing-vite8>
- <https://svelte.dev/blog> ・ <https://svelte.dev/blog/svelte-4> ・ <https://svelte.dev/blog/svelte-5-is-alive>
- <https://bun.sh/blog>
- <https://nodejs.org/en/blog> ・ <https://nodejs.org/en/blog/release/v26.8.0>
- <https://github.blog/changelog/>
- <https://tailwindcss.com/blog/tailwindcss-v4>
- <https://react.dev/blog/2024/12/05/react-19>
- <https://go.dev/doc/devel/release>
- <https://pnpm.io/blog>
- <https://vercel.com/blog>
- <https://blog.vuejs.org/>
