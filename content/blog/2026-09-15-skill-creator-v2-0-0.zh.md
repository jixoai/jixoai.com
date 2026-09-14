---
title: "Skill Creator v2.0：三应用工作台、模型路由与 Agent 面板"
date: 2026-09-13T20:04:46Z
description: Skill Creator v2.0（2026-09-14 发布，当前 2.0.1）是一次重写。1.x 系列是 CLI 加 Claude Code 子代理；2.0 线改为本地优先的 Agent 技能工作台：Workspaces、Creator、Repository 三个应用负责技能管理、创建与固定 commit 安装；模型配置重建为路由标签页（九种协议一键测连通）；Agent 面板重做（上下文计量、/compact、$ 补全、320-720px 调宽）；附件按钮唤起系统文件对话框，2.0.1 修复 macOS 上对话框打不开的问题。破坏性变更：持久化状态不迁移（先备份 ~/.skill-creator），Node 最低 24.0.0。
author: jixoai
tags: [skill-creator]
repo: skill-creator
version: "2.0.1"
lang: zh
---

```text
$ git log v1.5.2..v2.0.1 --oneline | wc -l
196
```

Skill Creator v2.0（2026-09-14 发布，当前 2.0.1）是一次重写，共 196 个提交：82 feat、56 fix、36 docs，其余 22 个为 test、chore、refactor 与格式化整理。整条 2.0 线经过六轮独立评审（codex 评审代理，最终 PASS 9.6/10）。本文挑与日常使用最相关的部分讲，完整清单在 [GitHub Release v2.0.0](https://github.com/jixoai/skill-creator/releases/tag/v2.0.0) 与 [CHANGELOG](https://github.com/jixoai/skill-creator/blob/v2.0.1/CHANGELOG.md)。

1.x 系列的最后一条 release 是 2026-05-21 的 1.5.2，形态是 CLI 加 Claude Code 子代理，技能按 `package@version` 命名写入 `.claude/skills`，文档靠 Context7 下载切片。2.0 线换了形态：CLI 只管生命周期（`start`、`status`、`stop`），常驻 daemon 以自己的界面承载全部功能；技能的发现、校验和安装仍由 ccski SDK 完成，Provider 投影、权限边界与跨路由体验属于应用本身。对话能力来自 DSH（DeepSeek Harness）headless 内核，只驱动会话，不出界面；Manager 的领域能力同时以 MCP server（daemon 内 `/mcp` 与 `skill-creator mcp` stdio 两种形态）供给内核与外部 client，写入类调用一律先产 proposal，等人批准后才执行。

## 三个应用

一个窗口里完成技能的日常管理、编写与安装，这是 2.0 最直观的变化。

Workspaces 是首页。它聚合各 Agent 的全局技能目录（Global Workspace，`~`）与手动导入的 Workspace，每个 Provider 卡片列出技能数、可用性与写入状态；技能可以查看、校验、启用或禁用，也能对比上游 lock hash 找出过时技能并按需重装。移除 Workspace 只删注册表项，不动用户目录。

![Workspaces 首页：标题与说明下方是 Create skill、Import workspace、Scan a repo、Discover sources 四张快捷操作卡，Global Workspace 区的 Provider 卡片列出技能数、可用项数与操作入口](/blog-assets/2026-09-15-skill-creator-v2-0-0/workspaces.png)

Creator 负责写。在已导入的 Workspace.Provider 里新建技能，或加载现有 `SKILL.md` 编辑；保存与删除都带内容 revision 校验，基于陈旧内容的写入会被拒绝，每次修订进入 change log。

![Creator 页按类别分组列出当前范围内的技能，每张卡片有名称与一行描述，顶部提供 New skill 与 Open existing 按钮](/blog-assets/2026-09-15-skill-creator-v2-0-0/creator.png)

Repository 负责装。输入 Git 源（仅接受 https），扫描会话固定到一个 commit，预览与安装复用同一份临时快照；多选已导入的 Workspace.Provider 作为目标，逐项安装、逐项复核，只有通过验证的结果才拿到本地技能 ID。Discover 页另有 curated 与自建源列表。

![Repository 的 Discover 页列出源卡片（Skills Library v1 指向 github.com/jixoai/skills-library，Agent Skills 指向 github.com/vercel-labs/skills），右上角是 New scan 入口](/blog-assets/2026-09-15-skill-creator-v2-0-0/repository.png)

安全上，mutation 由 server 把 workspace 与 provider 解析到真实根目录再执行，WebUI 不拼输出路径；安装目标只能是已导入的可写 Workspace.Provider，写不进 `~`。

## 模型路由

v2.0 把模型配置从一份长表单重做成一组标签页。每个 provider endpoint 一个 tab，自带身份图标、凭据、endpoint、模型列表与移除按钮；从目录里添加立即生效，重复添加自动编号（`zai-2`、`Z.ai (1)`）。

模型级的配置项覆盖六件事：modelId 补全跨 provider 进行并过滤命名空间 ID，显示名自动生成，推理强度用标签选择（默认 `low/high/max`，标准档位带补全），上下文窗口与最大输出 token 接受 `0.5M`、`253k` 这类简写，输入输出类型默认值取自 models.dev，连通测试一键覆盖全部九种协议。

## Agent 面板

面板重做。assistant 消息通栏显示，用户消息右对齐成气泡；thinking、tool、todo 行可折叠展开；上下文计量条按当前模型的容量显示剩余空间。`/compact` 菜单手动压缩上下文，auto-compact 在 `inputTokens >= contextWindow - maxOutputTokens` 时自动触发，转录里留下可见标记。

`$` 触发技能名补全，把技能直接引进对话。面板宽度在 320-720px 之间可调，窄屏转为抽屉覆盖；收起只是隐藏，不销毁会话，草稿按会话隔离，每个角色首次使用时才创建会话。

![Agent 面板的新会话状态：会话选择器下方是 Create、Manage、Explore、General 四张模式卡，底部 composer 带附件与模型入口](/blog-assets/2026-09-15-skill-creator-v2-0-0/agent-panel.png)

## 原生文件与图片选择

附件按钮直接唤起系统文件对话框（daemon 侧经 `@xmorse/rfd`），选中后真实路径进入 prompt attachments，daemon 侧做大小守卫；图片由 jSquash 在服务端生成缩略图预览。

2.0.1（2026-09-15）修了一个阻断问题：macOS 上这个对话框此前打不开，异步对话框在非 GUI 宿主进程里 panic，RPC promise 永远挂起，只能重启恢复。现在同步对话框跑在独立子进程里，panic 被隔离，10 分钟看门狗兜底，失败会弹 toast；第二个客户端并发请求会收到明确的「对话框已打开」拒绝。见 [v2.0.1 changelog](https://github.com/jixoai/skill-creator/releases/tag/v2.0.1)。

## 其他变更

会话管理进了设置页。Settings → Sessions 按日期列出会话，可逐行删除，内核会话有标记且受保护；保留策略 `sessionCleanupDays` 默认 30 天，daemon 启动时执行，另有 Clean-now 立即清理。只清产品转录，`$DSH_HOME` 的内核日志不动。

- 内核事件门禁：每个 DSH 事件在 daemon 边界过一层 Zod safeParse，坏载荷连同有界诊断一起丢弃，不污染帧序列；assistant 推理持久化，重启后原样重放。
- 安全面调整：设置视图按 2026-09-13 的产品决定回显已存的 `providers[].apiKey`（UI 里密码遮罩，眼睛图标切换），回环地址加 token 的单用户本地边界不变；运行与审计载荷保留结构性凭据脱敏。
- 修复：凭据写入内核 v1 `refs` 布局，平铺顶层键不再破坏下一次 DSH 启动；effort 标签点击自删；composer 失焦清空与外框样式回归。

## 升级与破坏性变更

破坏性变更有三条。

1. 持久化状态加载即收窄。`workspaces.json` 与技能管家（steward，维护工作流）存储里的未知字段按无兼容策略丢弃，不迁移也不重写。要保留回滚能力，升级前先做一次备份。

   ```bash
   cp -r ~/.skill-creator ~/.skill-creator.bak
   ```

2. CLI 与 daemon 版本必须一致，不一致时 CLI 会替换 daemon。
3. Node 最低版本 24.0.0（内核持久化用 `node:zlib` 的 zstd）。

安装与启动：

```bash
npm install -g skill-creator@2.0.1
skill-creator start
```

macOS 与 Windows 走原生窗口；Linux 默认 web 模式（纯托盘加系统浏览器），任何平台都可用 `--web` / `--no-web` 显式覆盖。

## 下一步

角色子代理与 `@` 召唤在提案阶段，三个设计决定待定，见 [roles-as-subagents 提案](https://github.com/jixoai/skill-creator/blob/v2.0.1/docs/research/2026-09-12-roles-as-subagents.md)。

## 致谢

六轮独立评审（codex）给出最终 PASS 9.6/10。DSH（DeepSeek Harness）提供内核与 dsh-webui 的面板设计语法；`@xmorse/rfd`、jSquash、models.dev 与 ccski SDK 是本次亮点的直接依赖。

## 链接

- Changelog：[GitHub Release v2.0.1](https://github.com/jixoai/skill-creator/releases/tag/v2.0.1) · [v2.0.0](https://github.com/jixoai/skill-creator/releases/tag/v2.0.0) · [compare v1.5.2...v2.0.1](https://github.com/jixoai/skill-creator/compare/v1.5.2...v2.0.1)
- 文档：[README](https://github.com/jixoai/skill-creator/blob/v2.0.1/README.md)
- 仓库：[github.com/jixoai/skill-creator](https://github.com/jixoai/skill-creator)
- 反馈：[GitHub Issues](https://github.com/jixoai/skill-creator/issues)
- English version: [/blog/2026-09-15-skill-creator-v2-0-0/](/blog/2026-09-15-skill-creator-v2-0-0/)
