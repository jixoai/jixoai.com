---
title: "Skill Creator v2.1.0：补齐输入体验，恢复会话内工具"
date: 2026-09-16T14:13:36Z
description: Skill Creator 2.1.0 收拢 2.0.2 之后的 30 个提交。输入框对齐官方网页客户端：中文输入法下回车不再误发，附件按整批检查，/ 统一触发命令与技能，运行中可排队或转向。@ 引用文件与历史会话，$ 引用技能文档，跨工作区模糊搜索。消息队列支持编辑、移除与插话。角色改用 DSH 原生子代理。修复会话内 mcp__skill-creator__* 工具调不通的问题，内核数据目录默认迁入应用目录。无持久化破坏性变更。
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

Skill Creator 2.1.0 发布了（2026-09-16），收拢 2.0.2 之后的 30 个提交。按提交前缀统计，13 个 feat、5 个 fix、9 个 docs，其余 3 个是 chore 与 test。重点有三件。输入框补齐官方网页客户端的输入语义，官方客户端指内核上游 deepseek-harness 自带的 web 界面，`@` 与 `$` 引用随这一版进来。会话里一直调不通的 MCP 工具修好了。内核的 DSH 数据目录默认挪进应用目录。没有持久化数据的破坏性变更，升级就是换个版本号。

## 输入框对齐官方网页客户端

v2.0 的输入框能用，这一版把它对齐到官方网页客户端的语义，四组能力分四步落地。

打字。中文输入法选词时的回车不再把半截拼音发出去，合成结束后 10 毫秒内的回车同样不算发送。粘贴进来的外部文本先清掉不可见占位字符。发送成功清空输入框时，原生撤销栈一并丢弃，Cmd+Z 找不回已发送的内容。占位提示分四级取最具体的一级：编辑中、断线、会话不可用、当前模式。

附件。图片和文件按整批检查，数量或大小任一超标就整批拒收，限额是 4 张图片、每张 4MiB，2 个文件、每个 512KiB。文件还在读取时回车不发送，提示稍后再试。拖放接收范围扩到整个窗口，在哪里松手都走同一套检查。

触发。`/` 统一承载命令与技能，命令在前、技能在后；`+` 按钮不输入也能展开全目录。命令目录目前是 `/compact`、`/queue`、`/steer` 三个，选中即执行。

![输入框上方的 / 菜单：Commands 组里是 /compact、/queue 和 /steer，各带一行描述，Skills 组接在下方，首行 /compact 高亮](/blog-assets/2026-09-16-skill-creator-v2-1-0/slash-menu.png)

提交。会话运行中按回车，排队还是转向由你的偏好决定，Cmd/Ctrl+回车取反向。偏好会记住，设置页与 `/queue`、`/steer` 命令两处可改，改一处两处一致。草稿跟着会话走，切换不丢，发送成功才清空。停止按钮只停当前这轮，排队的消息继续按序跑。

<details>
<summary>机制：带参数命令的占位机制已就绪，目录暂无此类命令</summary>

命令的 claim 状态机（命令名敲定后菜单让位，退格删掉命令名即退出）已经落地；首版目录里没有带参数的命令，这部分界面不渲染。

</details>

## 引用把文件、会话与技能带进对话

`@` 打开文件与历史会话两组引用。文件按目录浏览，目录行继续下钻，`..` 返回上一级；会话组排除当前会话。选中后输入框里出现 `@名称` 引用，底色成块，退格一次删掉整块。发送时只带文中还在的引用，一条消息最多 4 个，内容由服务端展开：文件走和附件同一套检查（绝对路径与真实路径、512KiB 上限与文本扩展名），会话转成对话记录的节选（末 30 条文本、2.4 万字符），以 `[reference: …]` 文本块进入消息。

![输入框上方的 @ 菜单：Files from 标出当前目录，目录条目与高亮的首行](/blog-assets/2026-09-16-skill-creator-v2-1-0/at-menu.png)

`$` 是技能引用，与 `/` 分工明确：`/技能名` 把技能当命令执行，`$技能名` 把技能文档带进对话当参考。菜单跨全部工作区取技能，按「工作区 / Provider」分组，开发机上列出 916 个技能、44 个组，禁用的不出现。搜索是模糊的：大小写不敏感，字母按顺序命中即可，连着拼和词头命中的排前面，描述里命中再加分。不同工作区的同名技能并列出现，按出现顺序配对区分。

![输入框上方的 $ 菜单：916 skills · 44 provider groups，GLOBAL WORKSPACE 组下是 $agents-sdk 等候选，首行高亮](/blog-assets/2026-09-16-skill-creator-v2-1-0/dollar-menu.png)

选中后 `$名称` 落进输入框，交互与 `@` 一致。服务端拿到工作区、Provider 与技能三个标识，解析后读取 SKILL.md，展开成 `[reference: skill 名称 · Provider]` 文本块，超过 20 万字符截断；技能已不存在时，整条消息以明确错误拒绝。

![输入框里的 $agents-sdk 引用：浅绿底色、圆角，下方工具行完整](/blog-assets/2026-09-16-skill-creator-v2-1-0/dollar-chip.png)

## 排队的消息可以编辑、移除与插话

队列从只读列表变成可以直接操作。铅笔按钮就地改文本，保存时图片和附件原样保留；叉号删除，按内核消息标识生效；插话把运行中会话的下一条排队消息转成当前轮的下一步，会话空闲时按钮置灰。

刚发出的消息先显示为「发送中」，等内核确认后由真实队列接手，文字相同的行自动去重。`/技能名` 命中技能目录时会加上底色。

## 角色改用 DSH 原生子代理

内核依赖的 DSH 家族从 0.1.5-rc.2 升到 0.1.6-alpha.1，21 个 dsh 包随之升版。角色子系统直接用官方的子代理能力，不再自建桥接。一个角色就是一个子代理定义：版本化的 persona、按会话模式放行的工具与唯一的角色工具名，内置 Reviewer、Researcher、Writer 三个。

子代理的启动、加入与取消都会显示在 Agent 面板里。工具收窄规则对子代理同样生效，专注模式不会被绕开。

## 行为变更：内核数据目录默认迁入应用目录

daemon 过去直接读写 `~/.dsh`。你的 DSH 目录里如果有不兼容的状态，比如损坏的 profile，整个 agent 内核会挂载失败。现在默认使用 `<home>/.skill-creator/dsh-home`：首次启动自动建好空目录，模型路由的 settings.yaml 和凭据也写进同一目录，你的 `~/.dsh` 默认不再被读写。想继续用原目录，设一个环境变量。

```bash
DSH_HOME=~/.dsh skill-creator start
```

## 会话内工具恢复响应

会话里的 `mcp__skill-creator__*` 工具此前一直调不通，这一版修好了。回归测试用真实的 v2 客户端走 HTTP 端点，完成协商并调用工具；dev 环境日志里零协议错误，内核挂载 94 个条目。stdio 形态同步迁移。

<details>
<summary>机制：根因与双协议修复</summary>

内核的 MCP 客户端走 2026-07-28 协议版本，daemon 端点（SDK 1.30）最高只接受 2025-11-25，新版本的请求头被 400 拒绝。端点迁到 `@modelcontextprotocol/server@2` 后，一个按请求构建的工厂同时服务两条线：新协议客户端按 `server/discover` 协商，2025 线客户端继续走 `initialize`，外部客户端不受影响。

</details>

## 其余变更

- **设置页 Model 分区的滚动**：右栏按分区切换滚动归属，Model 分区只剩 tab 内容一个纵向滚动区，provider 画廊不再自带滚动条，tab 条只在真的可横向滚动时才接管滚轮。桌面与窄屏、明暗主题逐容器核查过（[79e51ec](https://github.com/jixoai/skill-creator/commit/79e51ec7602fd5795e8482a9c2cf7e8ff7ca4f4a)）。
- **连接建立前打开 Agent 面板会卡死应用**：Svelte effect 无限循环导致整个应用失去响应。惰性加载现在等连接状态就绪才启动（同上提交）。
- 菜单选中行底色加深，队列行操作从 12px 裸图标改成 24px 底座并扩大点击区，插话按钮有了明确的置灰态。
- CI 恢复全量门禁：测试隔离全局技能目录（[299207f](https://github.com/jixoai/skill-creator/commit/299207f1966ea0ff9d471446912713dc87fb90ea)），web 模式浏览器冒烟测试进入专门的 ubuntu CI 任务（[998a9ff](https://github.com/jixoai/skill-creator/commit/998a9ffa68cd615ab1ed6a99ab778f464dc8aaa2)）。
- 项目官网连过三轮：排版、动效与内容收尾（图注核实、无障碍修正与 JSON-LD）；README 改为英文正文加中文镜像的双语对，两份同步维护。

## 升级

```bash
npm install -g skill-creator@2.1.0
```

没有持久化迁移。唯一的行为变更是内核数据目录的默认位置，上一节给了回滚开关。

## 致谢

上游 [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) 的原生子代理与官方网页客户端输入语义，是这一版两项主要能力的来源。

## 链接

- Changelog：[GitHub Release v2.1.0](https://github.com/jixoai/skill-creator/releases/tag/v2.1.0) · [compare v2.0.2...v2.1.0](https://github.com/jixoai/skill-creator/compare/v2.0.2...v2.1.0) · [CHANGELOG](https://github.com/jixoai/skill-creator/blob/v2.1.0/CHANGELOG.md)
- 契约来源：[composer-capability-parity 归档](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-capability-parity) · [composer-references-queue-actions 归档](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-references-queue-actions) · [composer-skill-refs-and-platform-fixes 归档](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-skill-refs-and-platform-fixes) · [dsh-alpha-native-subagents 归档](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-dsh-alpha-native-subagents)
- 文档：[README](https://github.com/jixoai/skill-creator/blob/v2.1.0/README.md)
- 本站系列：[Skill Creator v2.0](/zh/blog/2026-09-15-skill-creator-v2-0-0/)
- 反馈：[GitHub Issues](https://github.com/jixoai/skill-creator/issues)
- English version: [/blog/2026-09-16-skill-creator-v2-1-0/](/blog/2026-09-16-skill-creator-v2-1-0/)
