# 配图：真实截图流程

Owner 明确要过「你最好自己做一些截图，配合展示」。截图比手绘图可信，
凡是「组件长什么样」这类主张，能截就截。

**第一原则：截展示区域，不截整页**（Owner 法令 2026-09-11）。整页视口
截图（含侧边栏与大片留白）会被退回，理由是「截得太宽」；要的是针对某个
区块的针对性裁剪。先例：ui v0.4.0 的 8 张图第一版是 1440×900 整页视口，
全部被退回，改为按区块裁剪的 880 宽图后通过。

## 流程

1. **先看线上有没有**。线上站点常常还没部署到新版本
   （ui v0.4.0 时 `/docs/effects.html` 线上 404）——404 就转本地构建。
2. **本地出静态产物**。目标站的 `vite dev` 经常在沙箱里起不来（SvelteKit
   要写 `.svelte-kit`，在工作区之外会触发 `CODEBUDDY_BROKER_DENY`）。
   改跑它自己的构建脚本（如 `node scripts/build-site.mjs`），必要时加
   `dangerouslyDisableSandbox: true`，产物在 `public/` 或 `dist/`。
3. **起本地静态服务**：`python3 -m http.server 13900 --bind 127.0.0.1`。
   本机 curl 要走 `--noproxy '*'`（环境有代理）。
4. **用 ego-browser，不用 agent-browser**（Owner 法令 2026-09-11）。
   二进制在 `~/.local/bin/ego-browser`，**不在默认 PATH**，先
   `export PATH="$HOME/.local/bin:$PATH"`。API 是 TaskSpace/Page 子集，
   **不是 Playwright**（没有 `locator()`）。
   - 视口：`page.cdp("Emulation.setDeviceMetricsOverride", {width:1440,
     height:900, deviceScaleFactor:1, mobile:false})`。
   - 落盘：`page.screenshot({ path, fullPage, clip, scale, raw })`。
   - **heredoc 里 `page.evaluate` 不能用模板字符串**：`${…}` 会被 shell
     替换（报 `Bad substitution`）→ 一律用字符串拼接。
   - **截图必须包一层重试**（4–8 次、每次退避 2–3s）：超大视口下
     `Page.captureScreenshot` 会随机超时，重试几乎总能成功。
   - `deviceScaleFactor: 2` 在超大视口下会失败，且 `clip` 仍按 1× 输出
     —— 别指望它出 2 倍图，用 1× 即可。
5. **先量后裁**：
   - 找到目标区块的选择器（ui 文档站是 `[class*="jx-canvas-host"]`，
     内含 `.jx-canvas-head-text` / `.jx-canvas-stage` / `.jx-canvas-dock`；
     页面级区块就取 `h1` + 到首个 `INSTALL` 块为止）。
   - **在同一轮、同一个视口里**量 `getBoundingClientRect()` 再 `clip`。
     跨视口复用坐标一定错：这些文档站的布局随视口高度变化，同一元素在
     900 高与 17000 高下的 `top` 能差几百像素。
   - 一个区块配一张图，标题/引言 + 徽章 + 安装命令算一个区块；演示画布
     （stage + dock）算另一个。**不要**把侧边栏、页头页脚截进来。
   - 匹配区块标题时先 `innerText.replace(/\s+/g, " ").trim()`——
     `innerText` 带换行，直接 `startsWith` 会全部匹配不到。
6. **文档站的内部滚动容器往往推不动**（ui 的 `.jx-shell-body` 声明了
   `overflow:auto`、`scrollHeight` 也大于 `clientHeight`，但设
   `scrollTop`、`scrollIntoView`、CDP 滚轮事件全都无效——
   `scroll-behavior: smooth` 且有东西把它重置回 0）。**不要去和它斗**：
   直接把视口高度设成 `scrollHeight + 60`，整页一次性绘制完，再按第 5 步
   的实测坐标 `clip`。代价是超长页面（>12k px）截图较慢且偶发超时，
   所以务必配合第 4 步的重试。
7. **落位**：`static/blog-assets/<slug>/`，正文用绝对路径引用
   `![alt](/blog-assets/<slug>/x.png)`。alt 要写清「这张图证明了什么」，
   不是文件名。**中英两稿必须引用同一组图**（用 `grep -o` 对比两张清单）。
   换图后要重建站点，否则 `dist/` 与 `public/` 还是旧图。

## 用完必须释放 ego-browser（Owner 法令 2026-09-11）

**一个目标只用一个 TaskSpace**：`const task = await taskSpace("…")` 建一次，
打印 `spaceId`，后续轮次用 `taskSpace(<id>)` 恢复同一个 space。每次排查都
新建一个 space 会留下大量泄漏的浏览器窗口——ui v0.4.0 那轮就漏了 24 个。

收尾时**逐个关掉**（`finish()` 每个 space 只能调一次）：

```js
const spaces = await listTaskSpaces();
for (const s of spaces) {
  if (s.createdBy !== "agent") continue;      // 用户自己的 space 不要动
  const t = await taskSpace(s.id);
  await t.finish({ keep: [] });               // 默认不留任何 Page
}
console.log(await listTaskSpaces());          // 确认为空
```

`keep` 只在「结果必须留在浏览器里给用户看」时才用。中途不要用
`finish()`；任务失败或交还用户控制时也不要调。
