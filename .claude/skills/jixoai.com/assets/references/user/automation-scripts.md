---
title: 自动化脚本说明
---

## jixoai.com 自动化脚本

### 脚本位置
所有脚本在 `scripts/` 目录下。

### 主要脚本

#### fetch-projects.ts
从 GitHub API 获取组织下所有项目的元数据。
- 读取 `scripts/config.ts` 中的仓库列表
- 获取 star 数、最后更新时间、主要语言等
- 输出到 `src/content/projects/`

#### fetch-docs.ts
从各项目仓库获取文档文件。
- 支持 README.md 和 docs/ 目录
- 输出到 `src/content/docs/`

#### translate/index.ts
自动翻译系统入口。
- 支持 9 种语言
- 使用 DeepSeek API
- 带缓存机制避免重复翻译
- 遵循 `i18n-rules.md` 规则

### 执行命令
```bash
pnpm run fetch      # 执行 fetch-projects + fetch-docs
pnpm run translate  # 执行翻译
pnpm run build      # fetch + translate + astro build
```
