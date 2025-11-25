---
name: |
  jixoai.com
description: |
  Jixo AI 组织官网项目，基于 Astro 5 构建的静态网站，用于展示开源项目、博客和文档
---

# jixoai.com 项目技能文档

## 项目概述

**jixoai.com** 是 Jixo AI 组织的官方网站，基于 **Astro 5.16.0** 构建的静态网站项目，用于展示开源项目、博客文章和技术文档。

### 技术栈

- **框架**: Astro 5.16.0 + React 19.2.0
- **样式**: Tailwind CSS v4 (CSS-first @theme inline)
- **组件库**: ShadcnUI + MagicUI
- **类型系统**: TypeScript + Zod
- **包管理**: pnpm

### 项目目录结构

```
jixoai.com/
├── scripts/               # 自动化脚本
│   ├── config.ts          # 项目配置（仓库列表、语言等）
│   ├── fetch-projects.ts  # 获取 GitHub 项目信息
│   ├── fetch-docs.ts      # 获取项目文档
│   ├── shared/
│   │   └── github-client.ts
│   └── translate/         # 翻译系统
│       ├── index.ts
│       ├── types.ts
│       ├── cache-manager.ts
│       ├── file-scanner.ts
│       ├── rules-resolver.ts
│       └── translator.ts
├── src/
│   ├── components/        # React/Astro 组件
│   │   ├── ui/            # ShadcnUI 组件
│   │   ├── magicui/       # MagicUI 动画组件
│   │   ├── docs/          # 文档相关组件
│   │   ├── markdown/      # Markdown 渲染组件
│   │   └── projects/      # 项目展示组件
│   ├── content/           # Astro Content Collections
│   │   ├── blog/          # 博客文章
│   │   ├── docs/          # 项目文档
│   │   └── projects/      # 项目数据
│   ├── layouts/           # 页面布局
│   ├── pages/             # 路由页面
│   ├── styles/            # 全局样式
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   └── lib/               # 通用库
└── .github/workflows/     # CI/CD 配置
```

---

## 使用类技能

### 1. 撰写博客文章

在 `src/content/blog/` 目录下创建 Markdown 文件。

#### Frontmatter 格式

```yaml
---
title: "文章标题"
description: "文章描述"
pubDate: 2024-01-01
author: "作者名称"
tags: ["tag1", "tag2"]
draft: false
---
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 文章标题 |
| `description` | string | 是 | 文章描述/摘要 |
| `pubDate` | Date | 是 | 发布日期 |
| `author` | string | 否 | 作者名称 |
| `tags` | string[] | 否 | 标签列表 |
| `draft` | boolean | 否 | 是否为草稿 |

#### 示例

```markdown
---
title: "Welcome to Jixo AI"
description: "An introduction to our open source projects"
pubDate: 2024-01-15
author: "Jixo Team"
tags: ["announcement", "open-source"]
draft: false
---

# Welcome

This is the content of your blog post...
```

### 2. 自动翻译系统

项目支持 9 种语言的自动翻译。

#### 支持的语言

| 代码 | 语言 |
|------|------|
| `en` | English |
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁體中文 |
| `ru` | Русский |
| `fr` | Francais |
| `es` | Espanol |
| `de` | Deutsch |
| `ja` | 日本語 |
| `ko` | 한국어 |

#### 翻译规则文件

翻译行为由 `i18n-rules.md` 文件控制，定义了：
- 术语保留规则
- 格式保持规则
- 特殊处理指令

#### 使用 API

翻译系统使用 DeepSeek/OpenAI API，需要配置环境变量：
- `DEEPSEEK_API_KEY`: DeepSeek API 密钥

#### 运行翻译

```bash
pnpm run translate
```

### 3. 配置与部署

#### 环境变量

| 变量名 | 说明 | 用途 |
|--------|------|------|
| `GITHUB_TOKEN` | GitHub API Token | 获取项目信息和文档 |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | 翻译服务 |

#### GitHub Actions 自动部署

项目配置了 GitHub Actions 工作流：
- **自动构建**: 推送到 `master` 分支时自动构建
- **跨仓库触发**: 其他仓库可通过 `repository_dispatch` 触发重建

---

## 开发类技能

### 1. 本地开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 获取项目和文档数据
pnpm run fetch

# 翻译内容
pnpm run translate

# 完整构建（fetch + translate + build）
pnpm run build

# 快速构建（跳过 fetch 和 translate）
pnpm run build:fast

# 预览构建结果
pnpm run preview
```

### 2. 组件开发

#### ShadcnUI 组件（`src/components/ui/`）

已集成的组件：
- `button.tsx` - 按钮组件
- `card.tsx` - 卡片组件
- `badge.tsx` - 徽章组件
- `sheet.tsx` - 抽屉组件
- `scroll-area.tsx` - 滚动区域
- `separator.tsx` - 分隔线

#### MagicUI 组件（`src/components/magicui/`）

动画组件：
- `blur-fade.tsx` - 模糊淡入效果
- `meteors.tsx` - 流星动画
- `marquee.tsx` - 跑马灯效果

#### 使用示例

```tsx
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";

export function MyComponent() {
  return (
    <BlurFade delay={0.2}>
      <Button variant="default">Click me</Button>
    </BlurFade>
  );
}
```

### 3. 内容集合（Content Collections）

#### 配置文件

`src/content/config.ts` 定义了三个集合：

```typescript
// blog 集合
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

// docs 集合
const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

// projects 集合
const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    // ... 其他字段
  }),
});
```

### 4. 国际化系统

#### Language 类型定义

```typescript
type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ru' | 'fr' | 'es' | 'de' | 'ja' | 'ko';
```

#### LanguageSwitcher 组件

`src/components/LanguageSwitcher.tsx` 提供语言切换功能：

```tsx
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// 在布局或页面中使用
<LanguageSwitcher currentLang="zh-CN" />
```

### 5. 自动化脚本

#### 配置文件（`scripts/config.ts`）

定义了：
- 要拉取的 GitHub 仓库列表
- 支持的语言列表
- API 配置

#### fetch-projects.ts

从 GitHub 获取项目元数据：
- 仓库名称、描述
- Star 数量
- 最后更新时间
- 主要编程语言

#### fetch-docs.ts

从各项目仓库获取文档文件。

#### translate 脚本

多语言翻译处理：
- `file-scanner.ts`: 扫描需要翻译的文件
- `translator.ts`: 调用翻译 API
- `cache-manager.ts`: 缓存已翻译内容
- `rules-resolver.ts`: 解析翻译规则

---

## CLI Commands

```bash
# Add user content
skill-creator add-skill --pwd "D:\Documents\GitHub\jixoai.com\.claude\skills\jixoai.com" [--title "Title" --content "Content"]|[--file=*.md]

# Search documentation
skill-creator search-skill --pwd "D:\Documents\GitHub\jixoai.com\.claude\skills\jixoai.com" "query" [--mode=auto|chroma|fuzzy]

# Download Context7 docs
skill-creator download-context7 --pwd "D:\Documents\GitHub\jixoai.com\.claude\skills\jixoai.com" <context7_library_id>

# Update Context7 docs
skill-creator download-context7 --pwd "D:\Documents\GitHub\jixoai.com\.claude\skills\jixoai.com" --force [<context7_library_id>]

# List all Context7 projects
skill-creator list-context7 --pwd "D:\Documents\GitHub\jixoai.com\.claude\skills\jixoai.com"

# Remove Context7 project
skill-creator remove-context7 --pwd "D:\Documents\GitHub\jixoai.com\.claude\skills\jixoai.com" <context7_library_id>
```

## User Skills

<user-skills baseDir="assets/references/user">
</user-skills>

## Context7 Documentation

<!-- Context7 projects will be listed here automatically -->

<context7-skills id="astro/astro" baseDir="assets/references/context7/astro/astro">

</context7-skills>

---

## 常见任务速查

| 任务 | 命令/位置 |
|------|----------|
| 新建博客 | `src/content/blog/your-post.md` |
| 添加组件 | `src/components/` |
| 修改样式 | `src/styles/global.css` |
| 配置项目列表 | `scripts/config.ts` |
| 添加翻译规则 | `i18n-rules.md` |
| 查看部署配置 | `.github/workflows/` |
