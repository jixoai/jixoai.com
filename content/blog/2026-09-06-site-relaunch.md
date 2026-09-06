---
title: 站点改版：配置驱动的项目中心上线
date: 2026-09-06
description: jixoai.com 官网重构公告——项目中心改为 manifest 配置驱动，新上线 OpenDWeb、OpenIWeb、opentray 官网入口，并开通博客版面。
author: jixoai
tags: [relaunch, project-hub, blog]
lang: zh
---

今天，jixoai.com 完成了一次整体重构。新站点是一个**配置驱动的项目中心**（project hub），同时开通了博客版面。本文记录这次改版做了什么、为什么这么做。

## 项目中心：名单即配置

旧站点的项目列表写死在页面组件里，增删一个项目意味着改代码。新站点的名单收敛到唯一的配置文件 `projects.manifest.json`：每个项目声明仓库、展示名、描述、官网地址和 logo 资源，构建时由 `scripts/fetch-projects.mjs` 拉取最新 Release 版本与 README，全部预渲染为纯静态页面。

本次名单变更：

- **下架**：proxy、skill-creator；
- **上新**：[OpenDWeb](https://opendweb.jixoai.com)与 [OpenIWeb](https://openiweb.jixoai.com)；
- **保留**：[UniPty](https://unipty.jixoai.com)、[OpenSpecUI](https://www.openspecui.com)、[jixoai/ui](https://ui.jixoai.com)、[OpenTray](https://jixoai.github.io/opentray)。

每个项目的卡片现在提供三个入口：**官网**、**GitHub 仓库**、以及渲染在本站的 **README 详情页**——README 在构建期从仓库 HEAD 拉取，用 `marked` 渲染成静态 HTML，仓库内的相对图片与链接会被自动改写为 GitHub 上的绝对地址。

外部仓库（例如 OpenDWeb 属于 `Gaubee` 而非 jixoai 组织）与组织内仓库走完全相同的解析路径：owner-aware 的仓库声明让 Release 查询、仓库链接与 README 抓取对两者一视同仁。

## 新上线的子站点

随本次改版，三个项目拥有了（或即将拥有）自己的官方站点：

| 项目 | 官网 | 说明 |
| --- | --- | --- |
| OpenDWeb | <https://opendweb.jixoai.com> | 应用级组网平台：多设备应用组成邀请制的逻辑网络，QUIC 直连优先，可自建中继回退 |
| OpenIWeb | <https://openiweb.jixoai.com> | 个人应用节点：把 MCP 端点和一个 owner key 交给 AI 编码代理，它替你部署和运维应用 |
| OpenTray | <https://jixoai.github.io/opentray> | 面向 CLI 与 AI 技能生态的桌面状态运行时：托盘优先的应用，跑在 Node、Bun、Deno 上 |

## 整套视觉与组件来自 registry

本次重构同步完成了向 `jixoai-ui` **0.3.0** registry 的迁移：站点外壳（header / footer / scaffold）、hero、卡片等全部组件通过 `npx jixoai-ui add` 从 <https://ui.jixoai.com> 安装，由 `jixoai-ui.lock` 锁定，不再有任何手工拷贝的组件副本。组织主站保持品牌色相 **hue 0**（jixoai 红）。

一条命令即可复刻同样的外观：

```bash
npx jixoai-ui init --hue 0
```

## 博客版面

你现在阅读的正是新博客的第一篇文章。博客是纯静态的：`content/blog/` 下的 markdown 文件在构建期被发现并渲染，索引页按日期倒序排列，文章页预渲染、零运行时依赖。没有评论系统、没有追踪、没有客户端请求——只有 HTML。

后续我们会在这里发布架构决策、发布说明和实验室动态。

---

*本文由 jixoai 维护者撰写，以 markdown 源文件形式存放于仓库 `content/blog/` 目录。*
