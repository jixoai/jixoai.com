# 引用技能与外部研究（按路径引用，勿内联——上游会持续更新）

两个外部 skill 安装在全局目录（`git pull` 即更新），本 skill 只做导读。
**不要把它们的正文抄进本仓库**，改了就过期。

## 1. lieflat-less-ai-tone

`~/.agents/skills/lieflat-less-ai-tone/SKILL.md`（453 行）。
中文去 AI 味的白名单改写器，规则全部来自 283 万字对照语料（300 篇
AI vs 329 篇人写），11 条按优先级排序：翻案腔、顿号罗列、相邻句
同款、破折号、冒号（提示语/空转引列表）、序数词小标题、拟人化
喻体、概括盖具体数据、禁用起手式、翻译腔（仅五种）、段首零主语。

- **何时调用**：zh 终稿的最后清理（R5 查簇之后），或指标工具报 RED
  而自己不确定怎么改时。
- **关键边界**：它是成稿清理器不是重写器——白名单外的文字逐字保留、
  信息守恒（不增不删）、结构不动；本站的品牌语体（craft.md）是它的
  「风格参考文档」，冲突时以本站为准。
- 它还会证伪流行说法：句长均匀性、句内排比、独立成段的比喻都
  **不是** AI 痕迹，别误伤。

## 2. drawio-skill

`~/.agents/skills/drawio-skill/skills/drawio-skill/SKILL.md`（135 行
+ references/ + scripts/diagramctl.py）。文字/真实源 → 可维护的
.drawio 架构图，统一 CLI `diagramctl.py`（doctor/build/sync/views/
test/review/transform），本机依赖已装齐（drawio CLI + Python）。

- **何时调用**：文章需要架构图/流程图/时序图时——A7 架构深潜的机制
  图、A1 里程碑的拓扑变化图、A5 迁移路径图、多组件数据流。
- **不需要**当 gif 用：同类博客实况是近乎零 gif（archetypes.md §4.5），
  代码块、表格、CLI 输出框优先；一个组件一句话能说清的不画。
- **产物落位**：PNG 导出到 `static/blog-assets/<slug>/`，文章用绝对路径
  引用，.drawio 源文件同目录入库（可再编辑）。
- 用法细节读它的 SKILL.md，不要把它的内容抄进本文档。

> 实拍截图（截展示区域）见 `references/screenshots.md`——那条路比手绘图
> 更可信，能截就截。

## 本仓库的研究档

- `.agents/research/2026-09-07-writing-craft.md` — craft 的逐源清单
- `.agents/research/2026-09-07-blog-archetypes.md` — 16 候选池验证 + 方法
- `.agents/research/2026-09-06-release-blog-patterns.md` — org 级惯例源
  （14 orgs / 35 laws，每条带 URL；本 skill 压缩不够时读它）
