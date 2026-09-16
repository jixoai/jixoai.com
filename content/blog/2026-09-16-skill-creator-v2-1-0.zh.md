---
title: "Skill Creator v2.1.0：$ 技能引用、双纪元 MCP 与隔离的内核 home"
date: 2026-09-16T14:13:36Z
description: Skill Creator v2.1.0 覆盖 v2.0.2 之后的 30 个提交：composer 输入面对齐官方能力矩阵（IME 安全编辑核、整批附件、/ 统一触发、队列与转向提交）；@ 文件会话引用与 $ 跨工作区技能引用芯片（模糊搜索，daemon 展开技能文档）；队列 dock 获得内核 inbox 的行级操作；Roles 骑上 DSH 0.1.6 原生子代理；/mcp 端点迁移 @modelcontextprotocol/server@2 双纪元，修复会话内 mcp__skill-creator__* 工具面不可用；内核 DSH home 默认隔离到应用目录。无持久化破坏性变更。
author: jixoai
tags: [skill-creator]
repo: skill-creator
version: "2.1.0"
lang: zh
---

```text
$ git log v2.0.2..v2.1.0 --oneline | wc -l
30
```

Skill Creator v2.1.0 发布了（2026-09-16）。这一版收拢了 v2.0.2 之后的 30 个提交，按提交前缀统计是 13 个 feat、5 个 fix 与 9 个 docs，其余 3 个是 chore 与 test。主线有三条：composer 输入面把官方 webui 的能力矩阵补齐；内核侧接上 DSH 0.1.6 的原生子代理并把 MCP 端点修到双纪元；运行时 home 与设置面滚动做了一轮治理。无持久化破坏性变更，升级即换版本。

## Composer：编辑核、附件与提交面

v2.0 的输入框是一个可用的 textarea，这一版把它对齐到官方 webui 的语义。四组能力分四步落地。

编辑核（W1）：IME 合成语境下的 Enter 不再误提交（composition 期间与结束后的 10ms 宽限都算合成中），粘贴进来的外部文本先过芯片占位符消毒，发送成功后清空草稿会重建 textarea 元素丢弃原生 undo 栈，Cmd+Z 不能复活已发送内容。占位符按「编辑态、断线、会话不可用、模式」四级取最具体的一级。

附件（W2）：图片与文件按整批预检，数量或大小任一越界就整批拒绝（4 张图片各 4MiB、2 个文件各 512KiB），读入未完成时 Enter 保持并在完成前提示。拖放覆盖层扩到整个窗口，任何位置松手都进同一条准入链。

触发（W3）：`/` 统一承载命令与技能两组候选，命令在前技能随后；`+` 按钮无输入也能展开全目录。输入吃参数的命令有 claim 机制：token 落定后菜单让位，退格删掉 token 即退出。

![composer 上方的 / 统一菜单：Commands 组列出 /compact、/queue、/steer 与各自描述，Skills 组接在下方，首行 /compact 高亮](/blog-assets/2026-09-16-skill-creator-v2-1-0/slash-menu.png)

提交（W4）：运行中的会话里 Enter 按「忙碌偏好」决定排队或转向，Cmd/Ctrl+Enter 取反向，偏好持久化且进了 Settings → Agent。草稿按会话分轨，切换不丢，发送成功才清当前轨；停止按钮只停当前轮，已排队消息保留。

## 引用：`@` 文件会话与 `$` 技能

`@` 触发文件与历史会话两组引用。文件走 daemon 的目录钻取（目录行续览、`..` 上级），会话组排除当前会话。选中落 `@name` 纯文本 token，镜像绘制层在 textarea 同度量底层画芯片底色，退格在 token 尾部一次整删。提交时只带文中仍存在的 token 对应引用，内容由 daemon 展开：文件读盘走与附件同一守卫链（绝对路径、realpath、512KiB、文本扩展名），会话走转录的有界摘要（末 30 条文本帧、24k 字符），注入为 `[reference: …]` 文本块。

![composer 上方的 @ 菜单：Files from 副标题标出当前目录，目录条目与高亮首行](/blog-assets/2026-09-16-skill-creator-v2-1-0/at-menu.png)

`$` 是新增的技能引用，语义与 `/` 的命令触发正交：`/name` 触发技能执行，`$name` 把技能文档作为上下文注入。菜单跨全部工作区取技能，组头是 `Workspace / provider`（开发机实测 916 个技能、44 个组），排除禁用项；匹配是大小写不敏感的子序列模糊搜索，连续命中与词首边界加权，描述命中作低权重加成。同名技能跨组并列，靠出现序配对消歧。

![composer 上方的 $ 技能菜单：916 skills · 44 provider groups 副标题，GLOBAL WORKSPACE 组头下 $agents-sdk 等候选与高亮首行](/blog-assets/2026-09-16-skill-creator-v2-1-0/dollar-menu.png)

选中落 `$name ` token 与芯片，复用 `@` 的全部机制：绘制、原子退格、提交剪除。daemon 收到的是 opaque 三元组（workspace、provider、skill），经注册表作用域解析后读 SKILL.md，展开为 `[reference: skill <name> · <provider>]` 文本块（20 万字符截断），目标缺失以类型化 NOT_FOUND 拒绝整条 prompt。

![输入框内的 $agents-sdk 芯片：浅绿底色、圆角，下方工具行完整](/blog-assets/2026-09-16-skill-creator-v2-1-0/dollar-chip.png)

## 队列：内核 inbox 的读写面

队列 dock 从只读投影升级为内核 ReactLoopInbox 的读写面。行内编辑保存时非文本块（图片、附件）由内核保留；移除按消息 id 生效；插话把运行中会话的 next-turn 项转成 next-step，空闲时禁用。乐观发件箱只作发送在途的过渡，durable 帧到达即退场，文本全等去重。`/name` 命中技能目录还会画出词法装饰，忙碌 Enter 偏好同时存在于设置面与 `/queue` `/steer` 命令，单一事实源。

## Roles：骑上 DSH 原生子代理

内核的 DSH 家族从 0.1.5-rc.2 升到 0.1.6-alpha.1（22 个 @deepseek-ai 包），产品直接消费官方的 dsh-subagent 能力而不是自建桥接。角色定义为子代理行：版本化 persona、按模式放行的工具面、唯一的 role 工具名。子代理生命周期（spawn、join、abort）投影进 Agent 面板，工具面收窄法则对子代理同样生效，专注模式不会被子代理旁路。产品预设（persona、ask-user）经 heal 镜像供给，内核在开发机实测挂载 94 个 entries。

## 行为变更：内核 DSH home 默认隔离

daemon 此前直接读 `~/.dsh`，你的真实 harness 状态不兼容时（比如一个损坏的 profile）整个 agent 内核挂载失败。现在默认隔离到 `<home>/.skill-creator/dsh-home`，首次启动自举空目录，模型路由桥把 settings.yaml 与凭据投影写进同一目录。要回到共享的 harness home，设 `DSH_HOME` 即可：

```bash
DSH_HOME=~/.dsh skill-creator start
```

## 修复：MCP 端点双纪元

会话内的 `mcp__skill-creator__*` 工具面此前实际不可用：内核的 MCP 客户端走 2026-07-28 协议线，daemon 端点（SDK 1.30，支持到 2025-11-25）把它的协议头拒为 400。修复把 MCP 服务端栈迁到 `@modelcontextprotocol/server@2`：一个按请求新建实例的工厂同时服务两个纪元，modern 客户端经 `server/discover` 协商，2025 线客户端继续走 `initialize`。回归测试用真实 v2 客户端穿过 HTTP 端点协商后调用工具，dev 栈日志零协议错误。stdio 形态同步迁到 `serveStdio`。

## 修复与打磨

- **Settings → Model 滚动治理**：右栏按分区切换滚动所有权，Model 分区只有 tab 内容一个纵向滚动容器；provider 画廊不再有自己的 52vh 滚动条；负边距逃逸导致的横向滚动条消失；tab 条只在真的可横滚时劫持滚轮。桌面与窄窗、明暗主题逐容器走查通过。
- **面板早开竞态**：连接建立前打开 Agent 面板会触发 Svelte effect 无限环（同步抛错在同一个 effect 帧里写回自己的输入），整个应用失去响应。惰性加载现在以连接状态为闸。
- 菜单选中行对比度加强（primary/15 底色），队列行操作从裸 12px 图标改为 24px 底座加扩张热区，插话按钮有了显式禁用态。
- CI 恢复全量门禁：全局 provider roots 的测试密闭性修复；web 模式浏览器冒烟 E2E 进入专门的 ubuntu CI 任务。

## 站点与文档

项目站点连过三轮：排版（字族节奏、行长上限、标题梯级）、动效（进场节律系统、锚点落位）、内容与收尾（图注真实性、a11y 修正、JSON-LD）。README 改为英文正典加中文镜像的双语对，按家族标准同步事实。

## 升级

```bash
npm install -g skill-creator@2.1.0
```

无持久化迁移。唯一的行为变更是内核 DSH home 的默认位置，上一节给了回滚开关。

## 链接

- Changelog：[GitHub Release v2.1.0](https://github.com/jixoai/skill-creator/releases/tag/v2.1.0) · [compare v2.0.2...v2.1.0](https://github.com/jixoai/skill-creator/compare/v2.0.2...v2.1.0) · [CHANGELOG](https://github.com/jixoai/skill-creator/blob/v2.1.0/CHANGELOG.md)
- 契约来源：[composer-skill-refs-and-platform-fixes 归档](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-skill-refs-and-platform-fixes) · [composer-references-queue-actions 归档](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-references-queue-actions) · [dsh-alpha-native-subagents 归档](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-dsh-alpha-native-subagents)
- 文档：[README](https://github.com/jixoai/skill-creator/blob/v2.1.0/README.md)
- 本站系列：[Skill Creator v2.0](/zh/blog/2026-09-15-skill-creator-v2-0-0/)
- 反馈：[GitHub Issues](https://github.com/jixoai/skill-creator/issues)
- English version: [/blog/2026-09-16-skill-creator-v2-1-0/](/blog/2026-09-16-skill-creator-v2-1-0/)
