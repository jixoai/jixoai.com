# jixoai.com

[English](README.md)

jixoai 组织官网 —— <https://jixoai.com>：配置驱动的项目中心（官方网站、
logo、渲染的 README、实时 release 版本）加静态博客，支持九语种（en 在根路径；
zh / es / fr / de / ru / ja / ko / ar 在 `/[lang]/`，阿语 RTL）。技术栈为
SvelteKit + adapter-static，部署在 GitHub Pages；站点 chrome 来自 `@jixoai`
registry（<https://ui.jixoai.com>）。

## 站点结构

```text
/                     首页（en，canonical）     /[lang]/        各语言镜像
/projects/            旗舰项目网格              /[lang]/projects/
/projects/<repo>/     README 详情页             /[lang]/projects/<repo>/
/blog/                博客索引                  /[lang]/blog/
/blog/<slug>/         博客文章                  /[lang]/blog/<slug>/
```

每个页面都带对应 locale 的 `<html lang>` / `dir`、hreflang 备用链接
（9 语种 + x-default → 根路径，绝对 URL），以及保持当前页面的语言切换器。

本地化分层（有文档约定，不静默混排）：

1. UI chrome + 营销文案 —— 九语种全量本地化
   （`src/lib/i18n/locales/*`；Owner 提供的 canonical tagline/summary
   逐字使用）。
2. 项目简介 —— `projects.manifest.json` 的 `description` +
   `descriptionZh`；zh 渲染 `descriptionZh`，其余渲染 `description`。
3. README 正文 + 博客文章 —— 各语言下按原文渲染。

## 构建

```bash
npm install
npm run build     # 三步流水线（scripts/build-site.mjs）：
                  #  1. fetch-projects  → src/lib/projects.generated.json
                  #                       （GitHub Releases + README）
                  #  2. vite build      → dist/（adapter-static 预渲染）
                  #  3. 拷贝 dist/ → public/（Pages 产物）
npm run dev       # 开发服务器（先执行 fetch）
```

部署为既有的 GitHub Actions 工作流：运行 `npm run build` 并上传
`public/`。

## 配置接缝

| 接缝 | 文件 |
| --- | --- |
| 项目清单（repo / 名称 / 简介 / 站点 / logo） | `projects.manifest.json` |
| 语种集合 + 字典（文案、标签） | `src/lib/i18n/`（`index.ts`、`locales/*.ts`） |
| 路由 → locale / hreflang / 切换器助手 | `src/lib/i18n/index.ts` |
| 博客文章（markdown + frontmatter） | `content/blog/*.md` |
| 预渲染种子（含各语言根路径） | `svelte.config.js` |
| llms.txt 导出（语种、分区） | `vite.config.ts` |
| Registry chrome（锁定项，hue 0） | `jixoai-ui.lock`、`components.json` |

新增项目 = 编辑 manifest 并在 `static/logos/` 放一枚 logo；新增语种 =
一个字典文件，加上 `src/lib/i18n/index.ts` 中的列表（以及预渲染种子 /
llms 分段）。

## 许可

MIT — © jixoai
