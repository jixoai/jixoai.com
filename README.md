# Jixo AI Official Website

The official website for Jixo AI organization, showcasing our open source projects and documentation.

[![Deploy to GitHub Pages](https://github.com/jixoai/jixoai.com/actions/workflows/deploy.yml/badge.svg)](https://github.com/jixoai/jixoai.com/actions/workflows/deploy.yml)

## Features

- **Automatic Project Discovery**: Fetches all public projects from the jixoai GitHub organization
- **Multi-language Support**: AI-powered translation to 9 languages (EN, ZH-CN, ZH-TW, RU, FR, ES, DE, JA, KO)
- **Documentation Hub**: Automatically aggregates docs from all projects
- **Incremental Translation**: Smart caching system to minimize translation costs
- **Modern Stack**: Built with Astro, React, Tailwind CSS v4, and TypeScript

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Fetch projects and documentation
pnpm run fetch

# Start development server
pnpm run dev
```

Visit http://localhost:4321 to see the site.

## Project Structure

```text
jixoai.com/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions workflow
├── scripts/
│   ├── fetch-projects.ts        # Fetch GitHub projects
│   ├── fetch-docs.ts            # Fetch project documentation
│   └── translate.ts             # AI-powered translation
├── src/
│   ├── components/
│   │   ├── markdown/            # Markdown enhancements (TOC, navigation)
│   │   ├── projects/            # Project display components
│   │   └── ui/                  # Shared UI components
│   ├── content/
│   │   ├── blog/                # Blog posts
│   │   ├── docs/                # Aggregated documentation
│   │   ├── projects/            # Project metadata (auto-generated)
│   │   └── config.ts            # Content collections config
│   ├── layouts/                 # Page layouts
│   ├── pages/                   # Astro pages
│   ├── styles/                  # Global styles
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utility functions
├── public/
│   ├── logo.jpg                 # Jixo AI logo
│   └── projects/                # Project logos (auto-generated)
├── DEPLOYMENT.md                # Detailed deployment guide
└── package.json
```

## Available Commands

| Command                | Description                                              |
| :--------------------- | :------------------------------------------------------- |
| `pnpm install`         | Install dependencies                                     |
| `pnpm dev`             | Start development server at `localhost:4321`             |
| `pnpm build`           | Full build: fetch + translate + build                    |
| `pnpm build:fast`      | Quick build without fetching or translation              |
| `pnpm fetch`           | Fetch projects and documentation from GitHub             |
| `pnpm fetch:projects`  | Fetch only project metadata                              |
| `pnpm fetch:docs`      | Fetch only project documentation                         |
| `pnpm translate`       | Run AI translation for all content                       |
| `pnpm preview`         | Preview production build locally                         |

## Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete setup and deployment instructions
- [Translation System](./DEPLOYMENT.md#translation-system) - How the AI translation works
- [Content Management](./DEPLOYMENT.md#content-management) - Adding blog posts and docs

## Translation System

The site uses an intelligent translation system that:

1. **Automatically translates** all Markdown content to 9 languages
2. **Caches translations** in `i18n.zip` to avoid redundant API calls
3. **Incremental updates** - only translates new or modified content
4. **Customizable rules** - use `i18n-rules.md` files for translation guidelines

### Translation Rules

You can customize translation behavior by adding `i18n-rules.md` files:

```markdown
# Translation Rules

- Keep "Jixo AI" untranslated
- Use technical terminology consistently
- Preserve all code examples
```

Rules can be global (project root) or scoped (in specific directories).

## Contributing

### Adding Blog Posts

1. Create a Markdown file in `src/content/blog/`:

```markdown
---
title: "Post Title"
description: "Post description"
pubDate: 2024-01-01
tags: ["tag1", "tag2"]
---

Your content here...
```

2. Commit and push - automatic translation will happen during deployment

### Adding Project Documentation

Documentation is automatically fetched from project repositories:

1. In your project repo, create a `docs/` folder
2. Add Markdown files with frontmatter
3. Optionally add a `logo.jpg/png/avif/webp` to your project root
4. The next build will include your docs

## Tech Stack

- **Framework**: [Astro](https://astro.build) 5.x
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui + Magic UI
- **Icons**: Lucide React
- **Content**: MDX with enhanced Markdown features
- **Type Safety**: TypeScript + Zod
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages via GitHub Actions

## License

Open source under the MIT License.

## Links

- Website: https://jixoai.com
- GitHub: https://github.com/jixoai
- Issues: https://github.com/jixoai/jixoai.com/issues
