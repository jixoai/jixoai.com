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
