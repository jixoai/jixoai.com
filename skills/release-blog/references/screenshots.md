# 配图：真实截图流程

Owner 明确要过「你最好自己做一些截图，配合展示」。截图比手绘图可信，
凡是「组件长什么样」这类主张，能截就截。

**第一原则：截展示区域，不截整页**（Owner 法令 2026-09-11）。整页视口
截图（含侧边栏与大片留白）会被退回，理由是「截得太宽」；要的是针对某个
区块的针对性裁剪。先例：ui v0.4.0 的 8 张图第一版是 1440×900 整页视口，
全部被退回，改为按区块裁剪的 880 宽图后通过。

**第二原则：每张都必须出 2 倍图**（Owner 法令 2026-09-11）。1× 的图在
2 倍屏上发虚，会被退回。2× 的唯一可用通道见第 4 步。

**第三原则：一张张打磨，不要批处理**（Owner 法令 2026-09-11）。每截完
一张就 `Read` 回看这张图本身，据此决定「裁剪要不要改、要不要重截」。
一口气截完 8 张再统一检查 = 8 张一起返工。

## 流程

1. **先看线上有没有**。线上站点常常还没部署到新版本
   （ui v0.4.0 时 `/docs/effects.html` 线上 404）——404 就转本地构建。
2. **本地出静态产物**。目标站的 `vite dev` 经常在沙箱里起不来（SvelteKit
   要写 `.svelte-kit`，在工作区之外会触发 `CODEBUDDY_BROKER_DENY`）。
   改跑它自己的构建脚本（如 `node scripts/build-site.mjs`），必要时加
   `dangerouslyDisableSandbox: true`，产物在 `public/` 或 `dist/`。
   **不要用 `npm run <script>`**：本沙箱里 npm 会挂起（实测卡 2 分钟无输出
   后被 SIGTERM），直接 `node scripts/<x>.mjs` 秒回。
3. **起本地静态服务**：`python3 -m http.server 13900 --bind 127.0.0.1`。
   本机 curl 要走 `--noproxy '*'`（环境有代理）。
4. **用 ego-browser，不用 agent-browser**（Owner 法令 2026-09-11）。
   二进制在 `~/.local/bin/ego-browser`，**不在默认 PATH**。API 是
   TaskSpace/Page 子集，**不是 Playwright**（没有 `locator()`）。
   子命令是 `ego-browser nodejs`（**不是 `run`**），支持 stdin：
   `ego-browser nodejs < s01.js`。
   - **取 2 倍图的唯一通道（2026-09-11 实测）**：
     `page.screenshot()` 的 `scale` **只接受 `"css"`**（传 `"device"` / `2`
     直接报错），`raw: true` 也不改变输出尺寸；光设
     `Emulation.setDeviceMetricsOverride({deviceScaleFactor:2})` 再
     `page.screenshot()` 仍出 1×。正确做法是走 CDP，并让 `clip.scale: 1`：
     ```js
     await page.cdp("Emulation.setDeviceMetricsOverride",
       { width: 1440, height: <pageH>, deviceScaleFactor: 2, mobile: false });
     await page.cdp("Page.captureScreenshot",
       { format: "png", captureBeyondViewport: true,
         clip: { x, y, width, height, scale: 1 } }, { timeout: 90000 });
     // 返回 base64 → Buffer → 读 PNG 头第 16/20 字节即宽高
     ```
     在 `deviceScaleFactor: 2` 下，`clip.scale: 1` 输出的就是 **CSS 像素的
     2 倍**（600×400 → 1200×800）；`scale: 2` 会再翻一倍（2400×1600），
     不要。
   - **超大视口 + `deviceScaleFactor: 2` 是可用的**：旧文档说会失败，实测
     12000 与 16200 高都正常出图。慢、偶发超时是真的，所以**截图必须包一层
     重试**（4–8 次、每次退避 1.5–3s）。
   - **`captureBeyondViewport` 的坐标系**：`true` 用**文档坐标**，`false`
     用**视口坐标**。两者都**截不到内部滚动容器视口外的内容**——所以不是
     「设了 true 就能截全页」，见第 6 步。
   - **heredoc 里 `page.evaluate` 不能用模板字符串**：`${…}` 会被 shell
     替换（报 `Bad substitution`）→ 一律用字符串拼接。
5. **先量后裁**：
   - 找到目标区块的选择器（ui 文档站是 `[class*="jx-canvas-host"]`——
     **不能写 `section.jx-canvas-host`**，类名里是 `@container/jx-canvas-host`
     带斜杠，转义后匹配不到；内含 `[class*="canvas-head-text"]` /
     `[class*="canvas-stage"]` / `[class*="canvas-stage-row"]`。
     页面级区块取内容列 `.flex.min-w-0.flex-col.gap-8` 的**直接子元素**
     （`col.children[i]`），别用别的选择器猜）。
   - **在同一轮、同一个视口里**量 `getBoundingClientRect()` 再 `clip`。
     跨视口复用坐标一定错：这些文档站的布局随视口高度变化，同一元素在
     900 高与 17000 高下的 `top` 能差几百像素。
   - 匹配区块标题时先 `innerText.replace(/\s+/g, " ").trim()`——
     `innerText` 带换行，直接 `startsWith` 会全部匹配不到。
   - **`document.querySelector("table")` 取的是页面第一个表**，不是你要的
     那个 → 在目标区块内部定位（`h2.closest("section").querySelector(...)`）。
   - **路由要先验证**：ui 的 icons 页真实路径是 `/docs/icons.html`，
     `/docs/components/icons.html` 会返回一个内容为 `Error response` 的页面
     （截图成功但内容是错误页）。截完看到 `Error response` 就说明路由错了。
6. **裁剪细则**：
   - **横向贴紧内容列，只加纵向留白**。对区块 rect 再加左右 `PAD` 会把侧栏
     边线（x < 内容列左沿）带进图里，直接废图。
   - **文档站的内部滚动容器往往推不动**（ui 的 `.jx-shell-body` 声明了
     `overflow:auto`、`scrollHeight` 也大于 `clientHeight`，但设
     `scrollTop`、`scrollIntoView`、CDP 滚轮事件全都无效——
     `scroll-behavior: smooth` 且有东西把它重置回 0）。**不要去和它斗**：
     直接把视口高度设成 `scrollHeight + 60`，整页一次性绘制完，再按第 5 步
     的实测坐标 `clip`。
     - 覆盖 `.jx-shell-body { height:auto!important; overflow:visible!important }`
       可以把滚动容器展开，但**内容仍只绘制视口内的部分**，所以它只对
       「量坐标」有用，不能替代超大视口。
     - 给内容外层加 `transform: translateY(-y)` 再截**无效**：变换不会被
       合成绘制，截到的还是页头。这条路走不通。
   - **封底要按「下一段的实际顶边」算**，不能只给固定 padding：区块底与
     下一段的间距常常小于你给的留白，结果漏进下一段的字头
     （`bottom = min(区块底 + pad, 下一段顶边 - 6)`）。
   - **表格/列表的最后一行常常没有 `border-bottom`**（设计上故意省略），
     按区块底裁出来会像「表格没结束」。截图前补一条与其它行同款的收口线：
     `table tr:last-child { border-bottom: 1px solid <同款> !important }`
     （分隔线挂在 `tr` 上，不在 `td` 上——`border-collapse` 下要去
     `getComputedStyle(tr)` 取，取 `td` 会得到 `0px`）。
7. **隐藏浮动控件再截**（Owner 法令 2026-09-11）。文档站常有浮动 dock /
   TOC 压住正文，截出来内容被遮。ui 的浮动 dock 选择器是
   `.jx-canvas-stage-row > aside`，注入
   `display: none !important`（可连 `.jx-canvas-dock` 一起隐藏）即可。
   隐藏后**正文里描述该控件的 alt 必须同步改**——图里没有的东西不能写进
   alt。这类「为截图做的呈现清理」（隐藏浮动层、补一条收口线）属于
   presentation tweak，改的是渲染结果而不是内容，可以做；改完要在
   交付说明里讲清楚动了什么。
8. **落位**：`static/blog-assets/<slug>/`，正文用绝对路径引用
   `![alt](/blog-assets/<slug>/x.png)`。alt 要写清「这张图证明了什么」，
   不是文件名，也不是你希望它证明什么——**按图里实际可见的内容写**。
   **中英两稿必须引用同一组图**（用 `grep -o` 对比两张清单）。
   换图后要重建站点，否则 `dist/` 与 `public/` 还是旧图。

## 可复用的样板

把每张图共用的部分抽成一个 `lib.mjs`（`prepare` / `rect` / `capture2x`），
每张图只写一个几十行的 `sNN.js`。这样「一张张打磨」才便宜：改参数重跑即可，
不用每张重抄一遍视口、CSS 注入与重试逻辑。`capture2x` 的签名：

```js
capture2x(page, clip, outPath, opts) // opts: { retries, beyond }
// 内部：CDP Page.captureScreenshot + clip.scale:1 + 重试 + 读 PNG 头返回 {w,h,kb}
```

## 用完必须释放 ego-browser（Owner 法令 2026-09-11）

**一个目标只用一个 TaskSpace**：`const task = await taskSpace("…")` 建一次
（**传名称字符串**；传数字 id 也行，但名称更稳），打印 `spaceId`，后续轮次
用同一个标识恢复。每次排查都新建一个 space 会留下大量泄漏的浏览器窗口
——ui v0.4.0 那轮就漏了 24 个。

**打磨期间不要调 `finish()`**：一旦 `finish({keep:[]})`，这个 space 就被
回收，后续脚本会直接报 `task space not found: <id>`，只能重建。
`finish` 只在**整批截图全部结束**时调一次。

收尾时**逐个关掉**：

```js
const spaces = await listTaskSpaces();
for (const s of spaces) {
  if (s.createdBy !== "agent") continue;      // 用户自己的 space 不要动
  const t = await taskSpace(s.id);
  await t.finish({ keep: [] });               // 默认不留任何 Page
}
console.log(await listTaskSpaces());          // 确认为空
```

`keep` 只在「结果必须留在浏览器里给用户看」时才用。任务失败或交还用户
控制时也不要调。
