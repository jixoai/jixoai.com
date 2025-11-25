---
title: 博客写作指南
---

## 在 jixoai.com 撰写博客文章

### 文件位置
所有博客文章放在 `src/content/blog/` 目录下。

### Frontmatter 必填字段
- title: 文章标题
- description: 文章描述
- pubDate: 发布日期 (YYYY-MM-DD 格式)

### Frontmatter 可选字段
- author: 作者名称
- tags: 标签数组
- draft: 是否为草稿 (true/false)

### 多语言支持
文件命名规则：
- 默认语言 (zh-CN): `welcome.md`
- 英文: `welcome.en.md`
- 日文: `welcome.ja.md`

翻译由自动翻译系统处理，运行 `pnpm run translate` 即可。
