# Deployment Guide

This guide explains how to configure and deploy the Jixo AI website.

## Prerequisites

- Node.js 20+
- pnpm 10+
- GitHub account with access to the `jixoai` organization

## Environment Setup

### Required Secrets

Configure these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

1. **GITHUB_TOKEN** (automatically provided by GitHub Actions)
   - Used to fetch projects and documentation from the jixoai organization

2. **DEEPSEEK_API_KEY** or **OPENAI_API_KEY**
   - Required for AI-powered translation
   - Get a DeepSeek API key at: https://platform.deepseek.com/
   - Alternatively, use OpenAI API key from: https://platform.openai.com/

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jixoai/jixoai.com.git
   cd jixoai.com
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env.local` file:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   DEEPSEEK_API_KEY=your_deepseek_api_key
   # OR
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Fetch projects and docs:
   ```bash
   pnpm run fetch
   ```

5. Run the development server:
   ```bash
   pnpm run dev
   ```

## Translation System

### How It Works

The translation system automatically translates all Markdown content from English to 8 other languages:
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW)
- Russian (ru)
- French (fr)
- Spanish (es)
- German (de)
- Japanese (ja)
- Korean (ko)

### Translation Cache

The system maintains an `i18n.zip` file that caches all translations. This enables:
- **Incremental translation**: Only new or modified content is translated
- **Cost efficiency**: Avoids re-translating unchanged content
- **Faster builds**: Cached translations are reused

The cache is automatically:
1. Downloaded from the latest GitHub release before building
2. Updated with new translations during the build
3. Uploaded as a new release after successful build

### Customizing Translation Rules

You can customize translation behavior using `i18n-rules.md` files:

1. **Global rules** - Place in project root:
   ```markdown
   # Global Translation Rules

   - Always translate "Jixo AI" as is (do not translate)
   - Use formal tone for technical documentation
   - Preserve all code examples unchanged
   ```

2. **Scoped rules** - Place in any directory to affect only that directory and subdirectories:
   ```
   project-root/
   ├── i18n-rules.md           # Global rules
   └── src/
       └── content/
           ├── blog/
           │   └── i18n-rules.md   # Rules for blog posts
           └── docs/
               ├── api/
               │   └── i18n-rules.md   # Rules for API docs
               └── guide/
   ```

Rules are applied hierarchically from root to specific directories.

### Local Translation

To run translation locally:

```bash
# Set your API key
export DEEPSEEK_API_KEY=your_key_here

# Run translation
pnpm run translate
```

The script will:
1. Check for `i18n.zip` locally, or download from latest release
2. Scan for new/modified Markdown files
3. Translate only changed content
4. Save translations alongside original files
5. Update the i18n.zip cache

## Build Process

### Full Build (Production)

```bash
pnpm run build
```

This runs:
1. `fetch:projects` - Fetches all projects from GitHub
2. `fetch:docs` - Downloads documentation from each project
3. `translate` - Translates all content
4. `astro build` - Builds the static site

### Fast Build (Development)

```bash
pnpm run build:fast
```

Skips fetching and translation, only builds the site with existing content.

## GitHub Actions Workflow

The site automatically deploys on every push to `main` branch:

1. **Fetch Phase**
   - Fetches all projects from jixoai organization
   - Downloads documentation and logos from each project

2. **Translation Phase**
   - Downloads i18n.zip from latest release
   - Translates new/modified content
   - Uploads updated i18n.zip as artifact

3. **Build Phase**
   - Builds static site with Astro
   - Generates sitemap and optimizes assets

4. **Deploy Phase**
   - Deploys to GitHub Pages

5. **Release Phase**
   - Creates/updates `i18n-cache` release with updated i18n.zip

### Manual Workflow Trigger

You can manually trigger the workflow from the GitHub Actions tab:

1. Go to Actions → Deploy to GitHub Pages
2. Click "Run workflow"
3. Select branch and click "Run workflow"

## Content Management

### Adding Blog Posts

1. Create a new Markdown file in `src/content/blog/`:
   ```markdown
   ---
   title: "Your Post Title"
   description: "Brief description"
   pubDate: 2024-01-01
   author: "Your Name"
   tags: ["ai", "tech"]
   ---

   Your content here...
   ```

2. Commit and push - translation happens automatically

### Managing Documentation

Documentation is automatically fetched from project repositories. To add docs for a project:

1. In your project repository, create a `docs/` folder
2. Add Markdown files with frontmatter:
   ```markdown
   ---
   title: "Guide Title"
   description: "Guide description"
   order: 1
   ---

   Your documentation...
   ```

3. Optionally add `i18n-rules.md` for project-specific translation rules

4. The next build will automatically fetch and include your docs

### Adding Project Logos

1. Add a `logo.jpg`, `logo.png`, `logo.avif`, or `logo.webp` file to your project repository root
2. The logo will be automatically detected and used in the Projects page

## Troubleshooting

### Translation Fails

- **Check API key**: Ensure DEEPSEEK_API_KEY or OPENAI_API_KEY is set correctly
- **API quota**: Verify you haven't exceeded your API quota
- **Network issues**: Check if the API endpoint is accessible

### Projects Not Showing

- **GitHub token**: Verify GITHUB_TOKEN has access to the organization
- **Build logs**: Check the "Fetch GitHub projects" step in Actions
- **Content collection**: Ensure `src/content/projects/` has JSON files

### Docs Not Appearing

- **Docs folder**: Verify your project has a `docs/` folder
- **Markdown files**: Ensure files have `.md` or `.mdx` extension
- **Frontmatter**: Check that files have valid frontmatter

## Configuration

### Changing Supported Languages

Edit `src/types/index.ts`:

```typescript
export const languages: Language[] = [
  'en',
  'zh-CN',
  // Add or remove languages here
];
```

### Customizing Site Metadata

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  // ...
});
```

## Performance Optimization

### Build Times

- **First build**: 10-15 minutes (fetching + full translation)
- **Incremental builds**: 2-5 minutes (only new content translated)
- **Fast builds**: < 1 minute (no fetching/translation)

### Caching Strategy

The workflow uses:
- pnpm package caching
- i18n translation cache
- Astro build cache

This ensures fast, efficient builds.

## Support

For issues or questions:
- Open an issue: https://github.com/jixoai/jixoai.com/issues
- Check Actions logs for detailed error messages
- Review this documentation for common solutions
