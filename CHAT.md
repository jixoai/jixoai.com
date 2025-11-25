帮我构建jixoai.com官网。

这是GithubOrg
https://github.com/jixoai

logo文件是 logo.jpg

使用 astro + shadcnui + magicui 来构建我们的静态网站。
自动化的 github-page-action。

Blog/News 板块，我会编写md博客文件。

Projects 板块，自动在构建阶段，展示 https://github.com/jixoai 的所有公开项目（非archive）。
如果这些项目目录下有 `logo.jpg|png|avif|webp` 文件，那么自动将这个logo拿过来作为项目图标展示，否则使用项目名称进行艺术字渲染。

Projects 模块中，我们需要为每个子项目提供对应的文档网站。比如 https://github.com/jixoai/ccski ，这里 `https://jixoai.com/ccski` 就是要留给 ccski 这个项目作为这个项目的官网。
所以最好能做到监听整个 https://github.com/jixoai 的项目变动，然后自动抽取其中的 /docs 文件夹，来生成网站。如果做不到，那么就提供手动触发github-actions的方式来抽取子项目的docs文件夹来构建网站。

我们需要内置一些对md友好的插件：

1. 比如自动生成目录导航（右边的nav）
2. 比如自动生成下一章上一章。
3. 默认根据文件名称排序，如果有多层文件夹，那么自动进行分组。默认情况下，我们可以从左边的nav看到所有的文档链接，即便是多层文件夹，也能看到分组。
4. 因为我们使用文件夹作为分组名称，在自动翻译的时候，这点也得考虑进去。

多语言支持，英文、简体中文、繁体中文、俄文、法文、西班牙文、德语、日语、韩语。
提供自动化的翻译脚本，使用AI进行自动翻译：提供一篇面向部署人员的帮助文档，引导如何配置 API-KEY 来实现Github-Action的自动翻译，我自己使用 deepseek-api-key；当然，本地也可以通过env.local 来配置API-KEY，然后执行翻译脚本来进行增量翻译。
原文可能是英文可能是简体中文，AI需要自动识别原始语言。
可以配置翻译建议（提示词:i18n-rules.md）来改进AI翻译质量。这不是单个文件，而是自动发现，被发现的 i18n-rules 的作用域是它所在的文件夹。
所以我在 https://github.com/jixoai/jixoai.com 这个项目内配置的 i18n-rules.md 文件，作用域是全局。

我们的脚本在做自动化翻译的时候，需要有一个 i18n.zip 包，如果没有，会自动从上一个 releases 下载，然后进行增量翻译。
本地执行翻译，也是如此。

---

这是代码审查报告 CODE_REVIEW_REPORT.md
这是对你的接下来任务的提示词： AI_FIX_PROMPT.md

最后，**请用chrome-devtools进行截图验收**

---

我刚才让另外一个AI优化了我们的网站，这是它的工作计划：

```md
# Implementation Plan - JixoAI.com Upgrade

This plan outlines the steps to upgrade `jixoai.com` into a premium, automated, and multi-lingual static site using Astro, ShadcnUI, and MagicUI.

## User Review Required

> [!IMPORTANT]
> **GitHub CLI (`gh`) Dependency**: The translation script relies on `gh release download`. Ensure `gh` is installed locally and authenticated. In GitHub Actions, `GITHUB_TOKEN` will handle this.

> [!NOTE]
> **MagicUI Integration**: MagicUI components are typically copied into the project. I will create a `src/components/magicui` directory for them.

> [!NOTE]
> **Project Logos**: If a project has no logo, I will implement a fallback using "Art Text" (styled typography) as requested.

## Proposed Changes

### 1. UI & Aesthetics Upgrade (Astro + ShadcnUI + MagicUI)

We will transform the current basic UI into a premium experience.

#### [MODIFY] `tailwind.config.mjs` (or `astro.config.mjs` integration)

- Configure Tailwind for ShadcnUI (colors, animations).
- Add `tailwindcss-animate` plugin.

#### [NEW] `src/components/ui`

- Add ShadcnUI components: `Button`, `Card`, `Badge`, `Separator`, `ScrollArea`, `Sheet` (for mobile nav).

#### [NEW] `src/components/magicui`

- Add MagicUI components: `HeroVideoDialog` (if needed), `Marquee`, `BlurFade`, `Meteors` (for background).

#### [MODIFY] `src/layouts/BaseLayout.astro`

- Implement a premium dark-themed layout.
- Add a sticky, glassmorphism Header.
- Add a comprehensive Footer.

#### [MODIFY] `src/pages/index.astro`

- **Hero Section**: High-impact design with MagicUI effects.
- **Featured Projects**: Grid display using Shadcn Cards.
- **Latest News**: Blog preview section.

### 2. Projects & Docs Automation

Enhance the fetching scripts to meet specific requirements.

#### [MODIFY] `scripts/fetch-projects.ts`

- **Logo Handling**: Ensure it downloads `logo.{png,jpg,avif,webp}`.
- **Fallback**: If no logo, ensure the JSON data indicates this so the UI can render "Art Text".
- **Output**: Save to `src/content/projects` (or `public/projects` for images, `src/content` for data).

#### [MODIFY] `scripts/fetch-docs.ts`

- **Sub-project Docs**: Continue fetching `/docs` from sub-projects.
- **Structure**: Ensure it maps `org/repo/docs/**` to `src/content/docs/repo/**`.

#### [NEW] `.github/workflows/deploy.yml`

- **Automation**: Configure a workflow that runs on:
  - Push to `main` (jixoai.com repo).
  - Schedule (e.g., daily) to fetch updates from other repos.
  - `repository_dispatch` to allow other repos to trigger a rebuild.

### 3. Blog & Documentation Features

Improve the content consumption experience.

#### [NEW] `src/components/docs/Sidebar.astro`

- **File-based Grouping**: Auto-generate sidebar from file structure.
- **Sorting**: Alphabetical by default.

#### [NEW] `src/components/docs/TableOfContents.astro`

- **Right Nav**: Auto-generate TOC from headings (using `remark-toc` output or Astro's `headings` prop).

#### [NEW] `src/components/docs/Pagination.astro`

- **Nav**: Next/Previous chapter buttons.

#### [MODIFY] `src/pages/docs/[...slug].astro`

- **Layout**: 3-column layout (Sidebar, Content, TOC).
- **I18n**: Handle localized slugs (e.g., `/zh/docs/...`).

### 4. Internationalization (i18n)

Refine the existing translation system.

#### [MODIFY] `scripts/translate/index.ts`

- **Incremental**: Verify `i18n.zip` logic (already present).
- **Rules**: Verify `i18n-rules.md` scoping (already present).
- **Language Detection**: Ensure AI detects source language (DeepSeek usually does, but we can be explicit if needed).

#### [NEW] `src/components/LanguageSwitcher.astro`

- Dropdown to switch between supported languages.

## Verification Plan

### Automated Tests

- **Build Test**: Run `pnpm build` to ensure all scripts (fetch, translate, build) pass.
- **Lint**: Run `pnpm astro check`.

### Manual Verification

1.  **UI Check**:
    - Open `http://localhost:4321`.
    - Verify "Premium" look and feel (Dark mode, animations).
    - Check Project Cards (Logo vs Art Text).
2.  **Docs Navigation**:
    - Go to a project doc page.
    - Verify Sidebar grouping.
    - Verify TOC on the right.
    - Verify Next/Prev buttons.
3.  **Translation**:
    - Run `pnpm run translate`.
    - Check if `src/content/docs/zh/...` files are generated.
    - Switch language on UI and verify content changes.
4.  **Automation**:
    - (Mock) Trigger the fetch script and verify new projects/docs appear.
```

它还没有完成，但是有一些不错的进展，接下来需要你延续它的工作，完成它的工作

---

请你为当前这个项目的使用，生成一份 `jixoaiwebsite/SKILL.md` 文件，详细介绍这个项目的各种功能的使用、如何配置等等

- 关于这个项目使用的技能
  - 比如如何撰写博文
  - 比如如何进行自动翻译
  - 比如如何进行配置、部署
- 还有各种关于这个项目开发类的技能

---

1. 优化项目的样式：
   1. 使用更好的字体，优化行高
   1. 更好的配色
   1. 优化一些小的布局错乱问题（比如有些图标和文本不是同一行，而是换行了）
2. 修复项目：
   1. 暗色亮色模式的开关不见了
   2. 多语言切换后，页面404报错
