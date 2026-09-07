<!--
  references/archetypes.md — the TEMPLATE library of the release-blog
  skill (Owner directive 2026-09-07: imitation as a learning method).

  Provenance: 40 posts individually read from 13 actively-updated
  front-end toolchain blogs (Astro, Tailwind, Vite, Svelte, Nuxt,
  pnpm, Biome, Deno, Bun, TypeScript devblog, TanStack, Effect, oxc),
  distilled into 14 archetypes + 7 cross-cutting micro-patterns.
  Candidate-pool verification and full method notes:
  .agents/research/2026-09-07-blog-archetypes.md §1.

  How to use: pick the archetype FIRST (workflow step 0), draft to its
  skeleton and evidence discipline, then apply references/craft.md.
  jixoai priority today: A1/A2/A6/A8; pre-write A10 templates; hold
  A3/A4 until cadence justifies; revisit A11/A12 from year two.
  Strongest models: Vite (L2 narrative + zh mirror mechanism), Bun
  (evidence engineering), Astro (cadence + reader service).
-->

## 2. 文章清单（40 篇，全部逐篇读取）

| # | 博客 | 文章（URL） | 日期 | 一句话定位 | 原型 |
|---|---|---|---|---|---|
| 1 | Vite | [Announcing Vite 8](https://vite.dev/blog/announcing-vite8) | 2026-03 | Rolldown 统一打包器的大版本叙事 | A1 |
| 2 | Vite | [Announcing Vite 8.1](https://vite.dev/blog/announcing-vite8-1) | 2026-06 | 常规 minor：6 个实验特性 + Acknowledgments | A2 |
| 3 | Vite | [Announcing Vite 8 Beta](https://vite.dev/blog/announcing-vite8-beta) | 2025-12 | 大版本前的 beta 阶梯帖（TL;DR 开场） | A4 |
| 4 | TypeScript | [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) | 2026-07 | Go 原生移植 GA，10x 基准表 | A1 |
| 5 | TypeScript | [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) | 2026-03 | "桥接版本"：最后一代 JS 实现 + 17 节破坏性变更 | A5 |
| 6 | TypeScript | [Progress on TypeScript 7 – Dec 2025](https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/) | 2025-12 | 移植进度报告：编辑器/编译器/差异/未来 | A11 |
| 7 | Astro | [Astro 7](https://astro.build/blog/astro-7/) | 2026-06 | "All about speed" 大版本：基准表 + 23 个代码块 | A1 |
| 8 | Astro | [Astro 7.3](https://astro.build/blog/astro-730/) | 2026-09 | 三特性小版本 + Other improvements + Community | A2 |
| 9 | Astro | [Content Layer: A Deep Dive](https://astro.build/blog/content-layer-deep-dive/) | 2024-09 | Content Layer API 架构深潜（beta 随行） | A7 |
| 10 | Tailwind | [Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4) | 2025-01 | 情绪化里程碑长文（182x 基准表） | A1 |
| 11 | Tailwind | [Tailwind CSS v4.1](https://tailwindcss.com/blog/tailwindcss-v4-1) | 2025-04 | 11 节特性巡礼，高频玩笑的常规发布 | A2 |
| 12 | Tailwind | [Tailwind CSS v4.3](https://tailwindcss.com/blog/tailwindcss-v4-3) | 2026-05 | 自嘲"忘了发 v4.2 博文"的双版本合并帖 | A2 |
| 13 | Svelte | [The SvelteKit 3 Release Candidate is here](https://svelte.dev/blog/sveltekit-3-release-candidate) | 2026-08 | "清空垃圾抽屉"式 RC：破坏性变更重构成清理叙事 | A4 |
| 14 | Svelte | [CVEs affecting the Svelte ecosystem](https://svelte.dev/blog/cves-affecting-the-svelte-ecosystem) | 2026-01 | 5 个 CVE 的生态级安全公告 | A10 |
| 15 | Svelte | [Svelte 5 is alive](https://svelte.dev/blog/svelte-5-is-alive) | 2024-10 | 18 个月开发的里程碑宣告（FAQ 式四问结构） | A1 |
| 16 | Nuxt | [Announcing Nuxt 4.0](https://nuxt.com/blog/v4) | 2025-07 | 一年实测后的 4.0：结构/数据/TS/CLI 四线升级 | A1 |
| 17 | Nuxt | [Nuxt 4.5](https://nuxt.com/blog/v4-5) | 2026-07 | Vite 8 + Rspack 2 双构建层 + Nuxt 5 预告 | A2 |
| 18 | Nuxt | [Roadmap to v4](https://nuxt.com/blog/roadmap-v4) | 2025-06 | 坦承延期的路线图重设（支持时间线表） | A11 |
| 19 | Nuxt | [Nuxt 2 End-of-Life](https://nuxt.com/blog/nuxt2-eol) | 2024-06 | EOL 通知：日期 → 选项 → 展望 | A9 |
| 20 | Nuxt | [Nuxt Security Patch Releases](https://nuxt.com/blog/v4-5-security) | 2026-07 | 7 个漏洞按严重度分节的安全补丁公告 | A10 |
| 21 | pnpm | [pnpm 12.0](https://pnpm.io/blog/releases/12.0) | 2026-08 | Rust 重写大版本：Breaking changes 前置 | A1/A5 |
| 22 | pnpm | [What's different in pnpm 12](https://pnpm.io/blog/whats-different-in-pnpm-12) | 2026-08 | "升级不应像迁移"的迁移伴随文档 | A5 |
| 23 | Biome | [Biome v2—codename: Biotype](https://biomejs.dev/blog/biome-v2/) | 2025-06 | 不依赖 tsc 的类型感知 lint 大版本 | A1 |
| 24 | Biome | [Biome v2.5](https://biomejs.dev/blog/biome-v2-5/) | 2026-06 | "突破 500 条规则"的里程碑数字帖 | A2 |
| 25 | Biome | [Roadmap 2026](https://biomejs.dev/blog/roadmap-2026/) | 2026-01 | 成绩单 + "过去犯的错"自剖 + 路线图 | A11 |
| 26 | Biome | [GritQL accepted by the Biome organisation](https://biomejs.dev/blog/gritql-under-biome-umbrella/) | 2025-12 | 生态并入公告：通篇 Q&A 式小节标题 | A13 |
| 27 | Deno | [Deno 2.9](https://deno.com/blog/v2.9) | 2026-06 | 目录级长文：deno desktop + MCP 支持为主菜 | A2（长文极型） |
| 28 | Deno | [Deno 2.8](https://deno.com/blog/v2.8) | 2026-05 | "史上最大 minor"：新子命令 + 3.66x 安装提速 | A2（长文极型） |
| 29 | Deno | [Claw Patrol](https://deno.com/blog/clawpatrol) | 2026-05 | 零小节的 why-we-built 安全防火墙短文 | A8 |
| 30 | Deno | [How Deno protects against npm exploits](https://deno.com/blog/deno-protects-npm-exploits) | 2025-09 | 立场文：借 npm 供应链事件重申权限模型 | A14 |
| 31 | Bun | [Bun v1.3.14](https://bun.com/blog/bun-v1.3.14) | 2026-05 | "Fixes 163 issues, addressing 233 👍" 补丁帖 | A3 |
| 32 | Bun | [Behind the Scenes of Bun Install](https://bun.com/blog/behind-the-scenes-of-bun-install) | 2025-09 | 16 代码块 + strace 证据的性能解剖 | A6 |
| 33 | Bun | [Rewriting Bun in Rust](https://bun.com/blog/bun-in-rust) | 2026-07 | 带 Anthropic 利益披露的 why-&-how 重写文 | A7/A14 |
| 34 | Bun | [Bun is joining Anthropic](https://bun.com/blog/bun-joins-anthropic) | 2025-12 | TLDR 收购信 + 编年史 + FAQ | A13 |
| 35 | TanStack | [Announcing TanStack Table V9](https://tanstack.com/blog/announcing-tanstack-table-v9) | 2026-08 | 两大年重构后的大版本：7 大编号特性 | A1 |
| 36 | TanStack | [How an Underrated Refactor Saved 90% Memory Usage](https://tanstack.com/blog/tanstack-table-v9-memory-performance) | 2026-06 | 结果先行 + 方法论节 + 14 行基准表 | A6 |
| 37 | TanStack | [We Stopped Using RSC on TanStack.com](https://tanstack.com/blog/we-stopped-using-rsc-on-tanstack-com) | 2026-07 | 反直觉技术决策复盘：4 张表佐证 | A14 |
| 38 | TanStack | [TanStack Has a New Look](https://tanstack.com/blog/tanstack-has-a-new-look) | 2026-07 | 零小节的品牌随笔（第一人称散文） | A13/A14 |
| 39 | Effect | [Effect v4 RC: August 2026 Updates](https://effect.website/blog/effect-v4-rc-august-recap) | 2026-08 | RC 宣告 + 当月 20+ 子包变更目录 | A4 + A12 混血 |
| 40 | Effect | [Effect 2025 - Year in Review](https://effect.website/blog/effect-2025-year-in-review) | 2026-01 | 链接为主的年度盘点 + 2026 展望 | A12（年度极型） |

补充单帖博客：[oxc.rs/blog — Announcing React Compiler Support](https://oxc.rs/blog/2026-08-18-react-compiler-support)（2026-08-18，Oxlint 集成 React Compiler，含 benchmark + acknowledgements，原型 A8/A1 混合，作者 Boshen）。

---

## 3. 原型模板（14 个）

> 每个原型给：标题公式 / 开场动作（真实引文）/ 骨架（含篇幅权重）/ 证据纪律 / 收尾动作 / jixoai.com 适用判断。
> 「适用」对照 jixoai 约束：zh 主 + en 镜像、L2 叙事层（不复制 changelog）、mono neo-brutalist（冷句而非狂欢）。

### A1 里程碑发布叙事（Major Release Narrative）

**何时**：x.0 / 首个 stable / 项目史转折点。样本：Vite 8、TS 7.0、Svelte 5、Nuxt 4、Biome v2、Tailwind v4.0、Astro 7、Table V9、pnpm 12。

**标题公式**：`Announcing <Project> <X>` 或裸 `<Project> <X>`（全站统一一种）；可加代号（Biome v2—codename: Biotype）。

**开场动作**：两句定式——第 1 句宣告事件（允许情绪），第 2 句一句话定位意义。
- "Vite 8.0 is out! ... we made a pragmatic bet on two bundlers"（历史弧直接跟进）<https://vite.dev/blog/announcing-vite8>
- "After almost 18 months of development, comprising thousands of commits... Svelte 5 is finally stable. It's the most significant release in the project's history." <https://svelte.dev/blog/svelte-5-is-alive>
- "Holy shit it's actually done — we just tagged Tailwind CSS v4.0."（情绪上限样本，一年只许一次）<https://tailwindcss.com/blog/tailwindcss-v4>
- "Today we are proud to announce the availability of TypeScript 7, a 10x faster native port of TypeScript!" <https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/>

**骨架**（1800-5000 词）：
```
[历史弧/问题]        10-15%：当年的赌注或痛点（Vite 双打包器、TS 的性能墙）
[方案]              15-20%：本版的中心主张（Rolldown / 原生移植 / 类型感知 lint）
[旅程]              10%：preview→beta→stable 或 18 个月开发史（可选）
[证据]              15-25%：真实用户数字或基准表（Linear 46s→6s；sentry/vscode/playwright 7.5-10.2x）
[特性目录]          20-30%：2-7 个编号/分节亮点，每节痛点→方案→代码
[迁移/破坏性变更]     10-15%：独立成节，给最低摩擦路径（codemod/兼容层/桥接版本）
[展望 + 致谢]        5-10%：下一版预告 + 点名贡献者/赞助
```

**证据纪律**：必须有跨用户证据（多家公司数字或一张基准表）；基准要具名主体与环境（Tailwind v4.0 表、TS 7.0 双表、Astro 7 六站点表）。代码块可选——Vite 8 零代码纯叙事成立，Astro 7 有 23 个代码块也成立，取决于叙事弧强度。

**收尾动作**：展望 → 致谢 → （TS 式）"Happy Hacking!" 签名收尾；或 Tailwind 式玩笑按钮收尾。

**jixoai 适用**：✅ 核心原型。里程碑（x.0 / 重要 minor）单发 zh 主稿 + 48h 内 en 镜像；开场用冷句版本（"It's done." 级），历史弧只在大版本启用；基准表用终端输出风格（mono 品牌加成）。

### A2 常规发布（Routine Release）

**何时**：minor / 无故事的 patch 级聚合。样本：Astro 7.3、Vite 8.1、Deno 2.8/2.9、Nuxt 4.5、Tailwind v4.1/v4.3、Biome v2.5。

**标题公式**：裸 `<Project> <X.Y>`（Astro/Deno/Nuxt/Biome）或 `<Project> CSS vX.Y`；无 Announcing。

**开场动作**："<X> is here!" + 本版主菜一句话。
- "Astro 7.3 is here! This release brings the --ignore-lock flag to astro preview..." <https://astro.build/blog/astro-730/>
- "Deno 2.8 is here. This is our biggest minor release to date and we're excited to share it with you." <https://deno.com/blog/v2.8>
- "With this release, Biome has surpassed 500 rules! It took us a very long time, but we're thrilled about this milestone."（里程碑数字变体）<https://biomejs.dev/blog/biome-v2-5/>
- "Tailwind CSS v4.3 is here, and because apparently shipping v4.2 was easier than remembering to blog about it, this post is secretly about two releases worth of new stuff."（自嘲变体）<https://tailwindcss.com/blog/tailwindcss-v4-3>

**骨架**（700-1200 词；Deno 式可 3000+ 但仅限"biggest minor"）：
```
[宣告+主菜]    5%：两句话
[升级命令]     5%：紧跟开场即给（Astro "Upgrade now"、Tailwind 顶+底双放）
[特性 1-3]    60%：每节 = 动机 1-2 句 → 代码块 → 文档链接；小节标题写用户能力
[其他变更]     10%：短清单，逐条链 changelog/GitHub Release，不展开
[社区/致谢]    10%：点名贡献者 + 反馈渠道
[收尾]        5%：一句反馈邀请或 "We hope you enjoy <X>"
```

**证据纪律**：每特性至少一个可复制代码块；无基准不硬造（Vite 8.1 用内联数字引用主帖数据）。

**收尾动作**：Astro 式社区渠道清单；Vite 式 Acknowledgments；Nuxt 式 "This was a big one, and it wouldn't happen without you. 💚" <https://nuxt.com/blog/v4-5>

**jixoai 适用**：✅ 但要节制——多项目 org 博客里仅"有用户可感变化"的 minor 才发，例行 patch 留在 GitHub Releases（L1）。标题公式与 version pill 对齐（`UniPty v0.5.0` 式带 v 裸版本号）。

### A3 补丁通报（Patch-Digest Release）

**何时**：高频补丁流，仅当修了用户可感的一批问题。样本：Bun v1.3.14。

**标题公式**：`<Project> vX.Y.Z`（全 semver，Bun 补丁带 v、小版本不带 v 的双轨制）。

**开场动作**：统计数字前置。
- "Bun v1.3.14 — Fixes 163 issues, addressing 233 👍 - 39 dependency updates, 14 crash fixes, a 1.36x faster File constructor, a new bun pm subcommand..." <https://bun.com/blog/bun-v1.3.14>
- pnpm 合并区间的极型："For the complete list, see the v11.25.0 release notes."（全帖即"精选 + 链 release notes"）<https://pnpm.io/blog/releases/11.25>

**骨架**（500-1500 词）：统计开场 → 2-4 个高光修复（各配最小复现/崩溃栈/行为对比）→ 依赖更新与其余修复的短清单（逐条链 issue 永链）→ 升级命令。

**证据纪律**：每个高光修复给"症状 → 根因一句 → 修复验证"；issue/PR 永链密度最高的一型。

**收尾动作**：无修辞，直接结束或一句 "Please report any issues"。

**jixoai 适用**：⚠️ 默认不发（留给 GitHub Releases）；仅当补丁包含性能数字或安全修复时，取其"统计开场"手法并入 A2/A10。

### A4 预发布阶梯（Pre-Release: Alpha / Beta / RC）

**何时**：大版本前的每一级台阶，与正式发布帖构成系列。样本：Vite 8 Beta、SvelteKit 3 RC、TS 7.0 Beta、Effect v4 RC。

**标题公式**：`Announcing <Project> <X> Beta/RC` 或 `<Project> <X> RC is here`。

**开场动作**：TL;DR 定式——第 1 句直接给可得性与版本号。
- "TL;DR: The first beta of Vite 8, powered by Rolldown, is now available." <https://vite.dev/blog/announcing-vite8-beta>
- "SvelteKit 3 is now in the Release Candidate phase. If all goes well — meaning that people like you try it out and find that it works as expected — [stable] will follow soon." <https://svelte.dev/blog/sveltekit-3-release-candidate>

**骨架**（800-1800 词）：
```
[TL;DR]           5%：可得性 + 一句话价值
[它与 stable 的关系] 15%：能用于生产吗 / 与旧版并存方式（TS 7 Beta 并行安装）
[破坏性变更预览]    25-40%：RC 阶段的核心内容就是"还来得及改"
[试装指引]         15%：4 个包管理器 override 片段或 @next 标签
[Road to stable]  10%：时间表
[求反馈]          10%：明确要测什么、往哪报
```

**证据纪律**：可复制的安装/override 片段必给（Vite 8 Beta 4 个 JSON override 块）；基准引用主帖即可，不重做。

**收尾动作**：把反馈框定为对 stable 的贡献——"They help guide us towards the release of a stable 8.0.0." <https://vite.dev/blog/announcing-vite8-beta>

**jixoai 适用**：✅ 用于 x.0 前（beta/RC 各一帖，zh+en）；SvelteKit 3 的"junk drawer"叙事证明破坏性变更可重构为"清理"叙事，jixoai 迁移期可用。

### A5 迁移伴随文档（Migration Companion："What's different in X"）

**何时**：大版本落地后，与发布帖（A1）成对发布。样本：What's different in pnpm 12、TS 6.0（桥接版本=迁移载体）、pnpm 12.0 的 Breaking changes 节。

**标题公式**：`What's different in <Project> <X>` / `Migrating to <X>` / 桥接版本号本身。

**开场动作**：定调升级成本。
- "pnpm 12 is a rewrite of pnpm in Rust, and it is stable. Upgrading should not feel like a migration." <https://pnpm.io/blog/whats-different-in-pnpm-12>
- TS 6.0 用 17 个破坏性变更子节直接构成正文主体 <https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/>

**骨架**（1000-1800 词）：定调 → Breaking changes（每条：行为差 + 原因 + issue 永链 + 回退/开关）→ 新特性简述（指向发布帖）→ Trying it（旧标签共存方案，如 `latest-12`）。

**证据纪律**：每条变更配 before/after 代码或错误信息原文；给"Grep for it before you switch"式的可执行检查建议。

**收尾动作**：极简——"Please report any issues you run into." <https://pnpm.io/blog/whats-different-in-pnpm-12>

**jixoai 适用**：✅ jixoai 的 L3（升级指南）可借此形态独立成博文；破坏性变更用 diff 代码块（mono 品牌天然契合）。zh 稿注意术语表与 en 镜像逐节对齐。

### A6 性能案例研究（Performance Case Study）

**何时**：有一个可量化的大幅提升要讲透。样本：Bun Install 解剖、TanStack 90% 内存、（Deno 2.8 的 Performance 节为其压缩版）。

**标题公式**：`How we made X N times faster` / `How an Underrated Refactor Saved 90% Memory Usage` / `Behind the Scenes of <X>`。

**开场动作**：结果前置，第一句就是数字。
- "Running bun install is fast, very fast. On average, it runs ~7× faster than npm, ~4× faster than pnpm, and ~17× faster than yarn." <https://bun.com/blog/behind-the-scenes-of-bun-install>
- "Up to 90% less memory usage in TanStack Table V9 compared to TanStack Table V8? Yes! For large tables at least."（自限式修正句）<https://tanstack.com/blog/tanstack-table-v9-memory-performance>

**骨架**（2000-3500 词）：
```
[结果]        5-10%：结论数字 + 一张表（14 行 V8/V9 内存对比 / strace 计数表）
[方法论]      10%：怎么测的（Playwright + Chrome DevTools Protocol + 强制 GC + 仓库链接）
[优化逐讲]    60-75%：每节 = 瓶颈 → 原理（syscall/缓存行/写时复制）→ 代码 → 微基准
[诚实地不测]   <5%："not benchmarked" 明示（Bun DNS 节）
[结论升华]     5%：一句工程哲学收束
```

**证据纪律**：本库最严的一型——必须有：基准表、测量方法、可复现仓库链接、未测项声明。微基准（clonefile 2.32x、hardlink 2.97x）配真实场景基准（25x 总结论）双层举证。

**收尾动作**：工程哲学金句——"Installing packages 25x faster isn't 'magic': it's what happens when tools are built for the hardware we actually have." <https://bun.com/blog/behind-the-scenes-of-bun-install>

**jixoai 适用**：✅✅ jixoai 的招牌原型（工具链产品 + mono 品牌最爱基准表/终端输出）。zh 稿可用 `$ unipty bench` 终端输出作首屏证据。必须配方法论节，否则不发。

### A7 架构深潜（Architecture Deep-Dive / How-It-Works）

**何时**：新子系统落地或重大重写，讲机制不讲版本。样本：Astro Content Layer、Bun in Rust。

**标题公式**：`<X>: A Deep Dive` / `Rewriting <Project> in <Lang>` / `Behind the Scenes`。

**开场动作**：锚定事件 + 本文承诺。
- "This week we have released the first beta of Astro 5, which includes a whole new way to handle content in Astro. This post takes a deep dive into the Content Layer API..." <https://astro.build/blog/content-layer-deep-dive/>
- Bun in Rust 开篇先放利益披露（"Disclosure: Bun was acquired by Anthropic in December 2025..."）再进正文 <https://bun.com/blog/bun-in-rust>

**骨架**（1500-2500 词）：
```
[是什么]     15%：概念定义 + 解决的规模问题（tens of thousands of pages）
[怎么做]     50%：生命周期/数据流讲解 + API 代码对（config + usage）
[何时不该用]  10%：Astro 设 "When not to use" 一节——信任度来源
[What's next] 10%：演进方向链接
[上手]       15%：升级指南链接 + 社区 loaders
```

**证据纪律**：概念靠"代码对"（定义 + 使用）呈现；规模主张给数字；明确说边界与反例。

**收尾动作**：社区想象空间——"We're excited to see what you build with it!" <https://astro.build/blog/content-layer-deep-dive/>

**jixoai 适用**：✅ 每个大特性（如 runtime 抽象层）一次；"When not to use" 一节必须保留——冷峻自限恰好符合 neo-brutalist。

### A8 Why-We-Built / Introducing X

**何时**：发布新产品面（子命令、独立工具、集成）。样本：Claw Patrol、（oxc React Compiler 支持）。

**标题公式**：`Introducing <X>` / `<X>: an open-source <category>`。

**开场动作**：从自己的痛处出发，不从产品出发。
- "At Deno, we run Deno Deploy, JSR, and a handful of other production services. We're increasingly using agents to help with operations..." <https://deno.com/blog/clawpatrol>
- "We are excited to announce React Compiler support in Oxlint and Oxc Transform."（直接式变体）<https://oxc.rs/blog/2026-08-18-react-compiler-support>

**骨架**（800-1500 词，可零小节——Claw Patrol 全文无一个 heading）：
```
[我们遇到的痛点]   20%：具体运维场景（triaging PagerDuty、kubectl）
[现有方案为何不够]  15%：LLM gateway / HTTP proxy / sandbox 逐类对比（散文式，非表格）
[方案]           35%：设计主张（"that gap is the whole game"）+ 一个最小规则代码块
[现状与邀请]      15%：alpha 坦承 + 求规则模式/协议输入
[链接栏]         5%：site / repo / docs / demo
```

**证据纪律**：一个可粘贴的最小示例 + 危险命令的具体反例清单；不需要基准表。

**收尾动作**：从零到跑通的时限承诺——"The getting-started guide takes you from zero to a working gateway in five minutes." <https://deno.com/blog/clawpatrol>

**jixoai 适用**：✅ 新项目首发帖的默认原型；"痛点先行、产品后置"的开场纪律必须遵守。

### A9 弃用与 EOL 通知（Deprecation & EOL Notice）

**何时**：版本线终止支持、功能移除。样本：Nuxt 2 EOL、（pnpm 的 env-var 行为变更帖同类）。

**标题公式**：`<Project> <X> End-of-Life (EOL)`。

**开场动作**：历史定位而非道歉。
- "Released in 2018, Nuxt 2.0 marked a major milestone, establishing it as a mainstream framework. Over the past six years..." <https://nuxt.com/blog/nuxt2-eol>

**骨架**（600-900 词，零代码）：
```
[纪念性回顾]     15%：这条版本线的历史贡献
[What happens on <date>] 20%：精确日期后的事实变化（不再修 bug/安全）
[你的选项]       45%：编号路径——停在末版 / 买延长支持 / 升级 / 通知你的用户
[Looking Forward] 15%：资源转向新版本
[个人收尾]       5%：维护者第一人称感言
```

**证据纪律**：日期精确、选项可执行（末版号 2.18.0、企业支持链接、升级指南链接）。

**收尾动作**：第一人称展望——"It is with excitement and energy that I will keep working with the core team..." <https://nuxt.com/blog/nuxt2-eol>

**jixoai 适用**：⚠️ 仅在 jixoai 项目出现弃用线时使用；模板照抄即可，zh 稿语气保持"事实+选项"，不加感伤。

### A10 安全公告（Security Advisory）

**何时**：CVE / 批量安全补丁。样本：Svelte CVEs、Nuxt v4-5-security。

**标题公式**：`<Project> Security Patch Releases` / `CVEs affecting the <Project> ecosystem`。

**开场动作**：动作指令前置。
- "We've released patches for 5 vulnerabilities across devalue, svelte, @sveltejs/kit, and @sveltejs/adapter-node. Here's what you need to know:" <https://svelte.dev/blog/cves-affecting-the-svelte-ecosystem>
- "We've released Nuxt 4.5.1 and Nuxt 3.21.10, security patch releases for the 4.x and 3.x release lines. We recommend upgrading now:" <https://nuxt.com/blog/v4-5-security>

**骨架**（400-900 词）：
```
[Upgrade now]   10%：补丁版本号清单 + 升级命令（第一节就叫 Upgrade now）
[Commentary]    15%：背景与协调过程（可选，Svelte 式）
[Details]       60%：每 CVE 一节——ID + 严重度 + 影响条件 + advisory 永链
[运维提醒]      10%：CDN 缓存清除等部署侧动作（Nuxt）
[Thanks]        5%：致谢研究者与协调方（Vercel 安全团队）
```

**证据纪律**：只陈述影响条件与版本区间，给 GHSA/CVE 永链；不贴利用代码；零修辞。

**收尾动作**：流程性收尾——"We really appreciate responsible disclosure." <https://nuxt.com/blog/v4-5-security>

**jixoai 适用**：✅ 必备模板（建议预先写好占位）；zh+en 必须同发，Upgrade now 节置顶。

### A11 路线图与项目状态（Roadmap / State of the Project）

**何时**：年度路线图、重大进度报告、计划变更。样本：Biome Roadmap 2026、Nuxt Roadmap to v4、TS Progress on TS 7。

**标题公式**：`Roadmap <Year>` / `Roadmap to <X>` / `Progress on <X> – <Month Year>`。

**开场动作**：先交代"这份路线图怎么来的"或直接坦承计划问题。
- "In this article, we want to share with you all our roadmap for 2026! The roadmap is a collection of ideas and interests that the maintainers... collect from various sources" <https://biomejs.dev/blog/roadmap-2026/>
- "We originally planned Nuxt 4 for June 2024, but things don't always go according to plan. I think it's appropriate to take a different approach:" <https://nuxt.com/blog/roadmap-v4>
- "Earlier this year, the TypeScript team announced that we've been porting the compiler and language service to native code..." <https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/>

**骨架**（900-1400 词）：
```
[成绩单]        20%：过去一段的量化成果（Biome "15M monthly downloads" 链 npmcharts）
[过去的错误]     15%：Biome "Past mistakes" 三小节（monorepo/调试难/沟通差）——信任来源
[路线图]        40%：主题制（非日期承诺）；每项链 GitHub discussion/issue
[支持时间线表]   10%：版本支持窗口表（Nuxt v3/v4/v5 表）
[How can I help] 15%：贡献/赞助渠道
```

**证据纪律**：承诺用主题与 issue 链接，不用日期（Nuxt 因给了日期而被迫写道歉帖——反面教材）；进度报告则要基准表（TS 的 sentry/vscode/playwright 7.5-10.2x 表）。

**收尾动作**：感谢耐心——"I'm really excited with this timeline — and thank you for your patience and trust over the last year!" <https://nuxt.com/blog/roadmap-v4>

**jixoai 适用**：✅ 年度一篇（zh 主）；"过去的错误"自剖节强烈建议保留——小组织坦诚即品牌。

### A12 生态汇编（Digest / Roundup / Year in Review）

**何时**：月度 digest 兜小更新；年度盘点。样本：What's new in Svelte/Astro（月度）、Effect 月度 recap + 年度 YIR。

**标题公式**：`What's new in <Project>: <Month Year>`（每月 1 日）/ `<Project> <Year> - Year in Review`。

**开场动作**：
- "The biggest news this month is the first @next releases of SvelteKit 3. Thirteen preview versions shipped in July..."（最大新闻前置）<https://svelte.dev/blog/whats-new-in-svelte-august-2026>
- "Here's a look back at what shaped Effect in 2025." <https://effect.website/blog/effect-2025-year-in-review>

**骨架**（800-1500 词，固定栏目制）：
```
月度：What's new in <core> → 预览通道 → CLI/工具链 → Community Showcase（Apps/Learning/Libraries 三分组）
年度：Community & Events → Team Growth → Ecosystem Releases → Education → Adoption 里程碑（数字）→ Content & Media → 展望
```
每条目 = 一句话 + 链接；零代码或近零代码。

**证据纪律**：不制造证据，只策展——版本号 + PR 链接 + 外链；Astro 版有命名栏目（Mission Control/Cosmic Canvas）和 space 主题词形成签名。

**收尾动作**：节奏句——"Thanks for spending another month with us!"（Astro）/ "Until next time 👋🏼!"（Svelte）/ "2026 will be about continuing the work..."（Effect YIR 展望式）。

**jixoai 适用**：⏸ 暂缓——单项目发布密度上来前不启用月度 digest；年度 YIR 第二年即可开始（数据从 GitHub Releases/manifest 自动汇总）。

### A13 组织里程碑（Org Milestone：收购/合并/融资/品牌）

**何时**：组织层新闻波及项目。样本：Bun joins Anthropic、GritQL 并入 Biome、（辅读：VoidZero 加入 Cloudflare <https://vite.dev/blog/cloudflare-supports-vite>）、TanStack Has a New Look。

**标题公式**：`<Project> is joining <Org>` / `<X> accepted by the <Project> organisation` / `<Project> Has a New Look`。

**开场动作**：TLDR 事实句，不带情绪。
- "TLDR: Bun has been acquired by Anthropic." <https://bun.com/blog/bun-joins-anthropic>
- "Today, we are happy and grateful to make a special announcement regarding the continuation of GritQL." <https://biomejs.dev/blog/gritql-under-biome-umbrella/>
- "Today marks the start of a new stage for Vite. VoidZero is joining Cloudflare." <https://vite.dev/blog/cloudflare-supports-vite>

**骨架**（1200-2000 词 + FAQ）：
```
[TL;DR]          5%
[什么不变/什么变]  15%：两条 bullet 清单（Bun）
[编年史]         30%：How it started → 各版本节点（嵌推文/数字：20k stars 首周、$26M 融资）
[为什么]         20%：决策逻辑（"25% monthly growth, 7.2M downloads" + $0 收入的现实）
[FAQ]           20%：预答社区必问的 5 问（开源吗/会收费吗/团队呢）
[链接/致谢]      10%
```
变体：GritQL 用问句小节标题通篇自答（"So, does that mean...?"）；TanStack 品牌帖则零小节第一人称散文，讲设计价值观。

**证据纪律**：关键数字（融资、增长、下载）内联；治理承诺用 bullet（Vite×Cloudflare 的治理承诺清单）。

**收尾动作**：情绪许可的一次场合——"This is going to be really fun." <https://bun.com/blog/bun-joins-anthropic>

**jixoai 适用**：✅ 组织级事件用（新 lab 项目合并、品牌换脸）；FAQ 节必须保留。zh 主稿情绪仍按品牌冷句处理。

### A14 立场文与反直觉复盘（Opinionated Essay / Contrarian Retro）

**何时**：表达技术主张，或复盘"我们撤回了某决策"。样本：Deno npm 供应链立场文、We Stopped Using RSC、Bun in Rust（why 部分）。

**标题公式**：陈述句主张或反直觉事实——`How <Project> protects against <threat>` / `We Stopped Using <X>`。

**开场动作**：事实冲击或个人化定锚。
- "Two major security breaches happened in npm this month: the @ctrl/tinycolor package (along with 40+ packages... and 2+ million weekly downloads) was compromised..."（新闻锚定）<https://deno.com/blog/deno-protects-npm-exploits>
- "Earlier this year, tanstack.com became one of my favorite examples for React Server Components."（先立再破）<https://tanstack.com/blog/we-stopped-using-rsc-on-tanstack-com>

**骨架**（1200-2000 词）：
```
[锚点]        10%：新闻/自身经历
[论题]        10%：一句话主张
[逐层论证]     50%：分节推进（Deno 8 节从问题到方案到生态）；或数据表推进（RSC 帖 4 张表：JS 体积/Lighthouse/负载对比/删除清单）
[自限与让步]   15%："RSC solved the problem we actually had"——先承认对方正确过
[新主张]       10%：可引用的原则句
```

**证据纪律**：主张必须配表或可验证数字（RSC 帖：358 KiB、六页面 RSC vs SSR gzip 对比表、删除文件行数表、commit hash）；修辞让位于测量。

**收尾动作**：一句可传播的原则——"I'd rather make the dependency small and let content be content." <https://tanstack.com/blog/we-stopped-using-rsc-on-tanstack-com>

**jixoai 适用**：✅ 低频高值（一年 1-2 篇）；jixoai 的技术选型差异点（如 terminal-first、native 工具链立场）适合此型。需数据支撑，纯观点不发。

---

## 4. 横切微模式

### 4.1 版本宣告句式（标题 + 第一句）

- `Announcing <X>`（Vite/TS）｜裸 `<X>`（Astro/Deno/Nuxt/pnpm/Biome）｜`<X> is here!`（Astro/Nuxt 开场句）｜`<X> is out!`（Vite 正文 H1）｜补丁带 v 全 semver、小版本不带（Bun 双轨）。
- 两句定式全场通用：句 1 = 事件宣告，句 2 = 一句话定位（"This release is all about speed." <https://astro.build/blog/astro-7/>；"It is a rewrite of pnpm in Rust." <https://pnpm.io/blog/releases/12.0>；"It's the most significant release in the project's history." <https://svelte.dev/blog/svelte-5-is-alive>）。
- 数字开场变体：Bun "Fixes 163 issues, addressing 233 👍"（<https://bun.com/blog/bun-v1.3.14>）；Vite 8.1 "It is now seeing 41.6 million weekly downloads"（<https://vite.dev/blog/announcing-vite8-1>）；Biome "surpassed 500 rules!"（<https://biomejs.dev/blog/biome-v2-5/>）。
- 自嘲开场变体：Tailwind v4.3 "apparently shipping v4.2 was easier than remembering to blog about it"；Nuxt roadmap "things don't always go according to plan"。
- TL;DR 开场专属两类帖：预发布阶梯与收购公告。

### 4.2 CLI 输出与终端证据的嵌入法

- 升级命令紧跟开场（Astro 7 "Upgrade now" 为第一节；Tailwind 顶+底双放 4 个包管理器变体）。
- 终端 transcript 整段入帖：Astro 7 的 Background Dev Server 3 段终端记录（<https://astro.build/blog/astro-7/>）；TS 进度帖 `tsc -b` vs `tsgo -b` 对照（<https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/>）。
- 诊断输出即证据：oxc 的 error codeframe 代码块（<https://oxc.rs/blog/2026-08-18-react-compiler-support>）；Biome 的 4 行 concise reporter 输出（<https://biomejs.dev/blog/biome-v2-5/>）。
- 系统层证据合法入帖：Bun 的 strace 计数块作为"问题陈述"证据（<https://bun.com/blog/behind-the-scenes-of-bun-install>）。
- jixoai：mono 品牌下终端块是第一等公民，kicker 可用 `$ unipty --version` 输出（见 2026-09-06 文档 §4.2）。

### 4.3 Changelog / Release Notes 的链接纪律

- "Other improvements" 短清单节 → 链 CHANGELOG.md（Astro 7.3）。
- "Full Release Notes" 独立尾节 → 链 GitHub Release tag（Nuxt 4.5）。
- 以链 release notes 作为全文最后一句（pnpm 11.25 "For the complete list, see the v11.25.0 release notes."）。
- 行内 issue/PR 永链密度按帖子类型递增：里程碑帖 < 常规帖 < 补丁帖（pnpm 帖单篇内联 15+ 个 issue 号）。
- TS 6.0 的替代法：不设 changelog 链接，每个变更直接链到 PR/issue 本体。

### 4.4 破坏性变更的语气协议

- 结构上永远独立成节、位置靠前：pnpm 12.0 把 "Breaking changes" 放在 Installing 之后第一节（<https://pnpm.io/blog/releases/12.0>）；TS 6.0 用 17 个子节系统性展开。
- 命名缓冲：Nuxt "⚠️ Heads-Up Before Upgrading"（<https://nuxt.com/blog/v4-5>）；Effect RC 提前预告 "Upcoming breaking changes"（<https://effect.website/blog/effect-v4-rc-august-recap>）。
- 叙事重构：SvelteKit 3 把全部破坏性变更包装为 "We've cleaned out the junk drawer"——清理而非破坏（<https://svelte.dev/blog/sveltekit-3-release-candidate>）。
- 逃生通道三选一必给其一：codemod（`npx nuxt upgrade`、`npx sv migrate`）、兼容开关（TS 6.0 并行安装、pnpm `latest-12` 旧标签共存）、桥接版本（TS 6.0 本身）。
- 语气规则：事实陈述、零道歉、不埋文末。Deno 显式标注 "a behavior change" + opt-in 路径（见 2026-09-06 文档）。

### 4.5 图像/GIF 的真实使用率

- 40 篇样本中 GIF 近乎绝迹；主流证据形态是代码块、对比表、终端 transcript。
- 视觉演示用"渲染后的 HTML demo"（Tailwind 的滚动条/色板 live demo、tabular figures 数字演示）而非录屏（<https://tailwindcss.com/blog/tailwindcss-v4-1>）。
- 图表仅在性能帖出现（TanStack 内存曲线）；推文嵌入仅出现在创始人叙事帖（Bun joins Anthropic）。
- Vite 8 证明零代码零图像的纯叙事在里程碑弧够强时成立（<https://vite.dev/blog/announcing-vite8>）。

### 4.6 收尾动作的六种定式

1. 社区渠道清单（Astro："please join us on Discord, GitHub, Bluesky..."）；
2. 致谢 + 赞助（Vite："thank our sponsors on Vite's GitHub Sponsors and Vite's Open Collective"，两帖逐字复用）；
3. 签名仪式句（TS "Happy Hacking!" 帖尾双感叹号首尾呼应；Effect "Happy Effecting. 🚀"；Svelte "Until next time 👋🏼!"）；
4. 安装命令复现（Tailwind 底部重放 4 个安装命令）；
5. 玩笑按钮（Tailwind v4.0 hot tub 句；v4.3 "a tab size over 4 is a crime"）；
6. 展望一句话（Effect YIR "2026 will be about continuing the work..."）。
- Biome 签名级复用块："I like where this is going, how can I help?"（Translations/Chat/Code/Financial 四子节）在 v2.5、Roadmap 2026、GritQL 三帖逐字出现——组织博客的"可复用尾件"范式。

### 4.7 署名与人称

- 团队署名（The Svelte team、The TypeScript Team）用于里程碑/官方口径；个人署名（Adam Wathan、Daniel Rosenwasser、Zoltan Kochan 式）用于有作者人格的帖子（Tailwind 全部、pnpm 全部、Deno 专题）。
- 人称混用是被接受的手法：Nuxt 4.5 全篇 we、单点切 "This is one I'm particularly excited about"；RSC 复盘 we/I 交替承载自省。
- pnpm 是唯一稳定无人称（第三人称技术体）的博客——单人维护者的效率选择。

### 4.8 系列感机制

- 月度 roundup 标题恒定（What's new in X: <Month>，Svelte 自 2020-10 连续）；
- 预发布阶梯与正式帖标题前缀一致（Announcing Vite 8 Beta → Announcing Vite 8 → Announcing Vite 8.1）；
- 交叉引用前作（Astro 7.3 文末 Related posts 7.1/7.2；Deno 帖内链 v2.6/v2.8）；
- 代号制（Biome codename: Biotype）与 emoji 小节头（Nuxt 📣⚡️🦀）作为栏目签名。

---

## 5. jixoai.com 原型优先级（落地建议）

```
主用（发布叙事主力）   A1 里程碑 ｜ A2 常规发布（节制）｜ A6 性能案例 ｜ A8 why-we-built
必备（预案）          A10 安全公告（预写占位）｜ A5 迁移伴随（有破坏性变更时）
组织与品牌            A13 组织里程碑（低频）｜ A14 立场文（年 1-2 篇，需数据）
暂缓（密度不足）      A3 补丁通报（留给 GitHub Releases）｜ A4 预发布阶梯（首个 x.0 前）
第二年再启           A12 月度 digest / 年度 YIR ｜ A11 年度路线图
低频模板             A7 架构深潜（每大特性一次）｜ A9 EOL（如发生）
```

最强模仿对象：
1. **Vite**（vite.dev/blog）——L2 叙事层的最高范本：发布帖只讲故事+数字、零代码成立；标题公式与预发布阶梯纪律严明；zh 镜像机制（cn.vite.dev 同构翻译）直接可抄。
2. **Bun**（bun.com/blog）——证据工程的天花板：性能帖的方法论节 + strace/微基准双层举证 + 补丁帖统计开场；与 jixoai 的工具链属性和 mono 品牌最同频。
3. **Astro**（astro.build/blog）——节奏与系列感的范本：版本帖 + 月度 digest 双轨、"Community" 致谢节点名文化、升级命令前置的读者服务意识。

---

## 附：本次抓取的全部来源 URL

索引页：astro.build/blog ｜ tailwindcss.com/blog ｜ vite.dev/blog ｜ svelte.dev/blog（+rss.xml）｜ nuxt.com/blog ｜ blog.vuejs.org ｜ pnpm.io/blog（+rss.xml）｜ biomejs.dev/blog ｜ deno.com/blog ｜ bun.com/blog（+rss.xml）｜ devblogs.microsoft.com/typescript ｜ tanstack.com/blog ｜ effect.website/blog ｜ oxc.rs/blog ｜ rspack.rs ｜ rolldown.rs

正文（40+4）：见第 2 节表格内逐篇 URL；辅读 5 篇见第 1 节注。
