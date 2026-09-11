/**
 * shots-lib.mjs — 配图截图的共享样板（release-blog / 真实截图流程）。
 *
 * 与 references/screenshots.md 配套：把每张图共用的部分抽在这里，每张图
 * 只写一个几十行的 sNN.js，这样「一张张打磨」才便宜——改参数重跑即可。
 *
 * 用法（每张图一个脚本，跑法见下）：
 *
 *   const { SPACE, prepare, rect, capture2x } = await import("./shots-lib.mjs");
 *   const task = await taskSpace(SPACE);
 *   const page = task.page("p1");
 *   await prepare(page, { url: "http://127.0.0.1:13930/docs/effects.html" });
 *   await page.cdp("Emulation.setDeviceMetricsOverride",
 *     { width: 1440, height: 16200, deviceScaleFactor: 2, mobile: false });
 *   await page.waitForTimeout(3000);
 *   const r = await rect(page, "[class*='jx-canvas-host']");
 *   const shot = await capture2x(page, { x: r.x, y: r.y, w: r.w, h: r.h }, "/tmp/s01.png");
 *   console.log(shot); // { path, w, h, kb }
 *
 * 跑法：`~/.local/bin/ego-browser nodejs < s01.js`
 * （子命令是 `nodejs`，不是 `run`；支持 stdin。不要用 `npm run`。）
 *
 * 打磨期间**不要**调 `task.finish()`——space 会被回收，后续脚本直接报
 * `task space not found`。整批结束再统一释放（见 screenshots.md 末节）。
 */

const fs = await import("node:fs/promises");

/** 命名 space：整批截图复用同一个，不要每次新建。 */
export const SPACE = "blog-shots";

/**
 * 为截图做的「呈现清理」，在导航后注入。
 * - 展开内部滚动容器（只对「量坐标」有用，内容仍只绘制视口内的部分）
 * - 隐藏浮动 dock / 侧栏，避免压住正文
 */
export const CSS_BASE = [
  ".jx-shell-body { height: auto !important; overflow: visible !important; }",
  ".jx-shell { height: auto !important; }",
  ".jx-canvas-stage-row > aside { display: none !important; }",
  ".jx-canvas-dock { display: none !important; }",
].join("\n");

/**
 * 导航 + 设视口 + 注入清理 CSS。
 *
 * 视口高度要给足：内部滚动容器推不动（scrollTop / scrollIntoView / 滚轮
 * 全无效），只能把视口设成「页面总高 + 60」让整页一次性绘制完。
 * 超大视口下 deviceScaleFactor: 2 是可用的（实测 12000 / 16200 高均正常）。
 */
export async function prepare(page, opts) {
  const o = Object.assign(
    { width: 1440, height: 900, settle: 1500, css: CSS_BASE },
    opts,
  );
  await page.goto(o.url);
  await page.waitForLoadState("load");
  await page.cdp("Emulation.setDeviceMetricsOverride", {
    width: o.width,
    height: o.height,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await page.waitForTimeout(o.settle);
  await page.evaluate(function (c) {
    var st = document.getElementById("__shot");
    if (!st) {
      st = document.createElement("style");
      st.id = "__shot";
      document.head.appendChild(st);
    }
    st.textContent = c;
  }, o.css);
  await page.waitForTimeout(500);
}

/** 追加一条呈现清理规则（如给表格最后一行补收口线）。 */
export async function addCss(page, css) {
  await page.evaluate(function (c) {
    var st = document.getElementById("__shot");
    if (st) st.textContent = st.textContent + "\n" + c;
  }, css);
  await page.waitForTimeout(400);
}

/** 单个元素的 rect（文档坐标；这些页面 scrollTop 恒为 0）。 */
export async function rect(page, selector) {
  return page.evaluate(function (sel) {
    var el = document.querySelector(sel);
    if (!el) return null;
    var r = el.getBoundingClientRect();
    return {
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  }, selector);
}

/**
 * 在某个容器**内部**取元素 rect。
 * 必要：`document.querySelector("table")` 拿的是页面第一个表，不是你要的那个。
 * 两个参数都必须是**合法 CSS 选择器**（`querySelector` 不支持 `xpath=..`
 * 这类写法，传了会直接抛异常）。要往上找祖先就先自己给元素打标记：
 *   await page.evaluate(...) 里 el.closest("section").setAttribute("data-x", "1")
 * 再 `rectIn(page, "[data-x]", "table")`。
 */
export async function rectIn(page, containerSel, innerSel) {
  return page.evaluate(function (a) {
    var box = document.querySelector(a[0]);
    if (!box) return null;
    var el = box.querySelector(a[1]);
    if (!el) return null;
    var r = el.getBoundingClientRect();
    return {
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
      bottom: Math.round(r.bottom),
    };
  }, [containerSel, innerSel]);
}

/** 跨多个选择器的包围盒（按 DOM 顺序取第一个与最后一个）。 */
export async function rectSpan(page, firstSel, lastSel) {
  return page.evaluate(function (a) {
    var f = document.querySelector(a[0]);
    var l = document.querySelector(a[1]);
    if (!f || !l) return null;
    var rf = f.getBoundingClientRect();
    var rl = l.getBoundingClientRect();
    var top = Math.min(rf.top, rl.top);
    var bot = Math.max(rf.bottom, rl.bottom);
    var left = Math.min(rf.left, rl.left);
    var right = Math.max(rf.right, rl.right);
    return {
      x: Math.round(left),
      y: Math.round(top),
      w: Math.round(right - left),
      h: Math.round(bot - top),
    };
  }, [firstSel, lastSel]);
}

/**
 * 取 **真 2x** 图。这是唯一可用通道：
 *   page.screenshot({ scale }) 只接受 "css"（传 "device" / 2 直接报错），
 *   raw: true 无效；光设 deviceScaleFactor: 2 再 page.screenshot() 仍出 1×。
 * 在 deviceScaleFactor: 2 下，CDP 的 clip.scale: 1 输出的就是 CSS 像素的
 * 2 倍（600×400 → 1200×800）。clip.scale: 2 会再翻倍，不要。
 *
 * @param clip {x,y,w,h} 文档坐标（captureBeyondViewport: true 时）
 * @returns {path, w, h, kb}
 */
export async function capture2x(page, clip, outPath, opts) {
  const o = Object.assign({ retries: 6, beyond: true }, opts);
  const c = {
    x: clip.x,
    y: clip.y,
    width: clip.w,
    height: clip.h,
    scale: 1,
  };
  let lastErr;
  for (let i = 0; i < o.retries; i++) {
    try {
      const r = await page.cdp(
        "Page.captureScreenshot",
        { format: "png", captureBeyondViewport: !!o.beyond, clip: c },
        { timeout: 90000 },
      );
      const buf = Buffer.from(r.data, "base64");
      await fs.writeFile(outPath, buf);
      // PNG 头：宽在第 16 字节，高在第 20 字节（大端）
      return {
        path: outPath,
        w: buf.readUInt32BE(16),
        h: buf.readUInt32BE(20),
        kb: Math.round(buf.length / 1024),
      };
    } catch (e) {
      lastErr = e;
      console.log("    retry " + (i + 1) + ": " + String(e.message).slice(0, 70));
      await page.waitForTimeout(1500 + i * 600);
    }
  }
  throw lastErr;
}

/** 批次结束时释放 agent 创建的 space（用户自己的不要动）。 */
export async function releaseAll() {
  const spaces = await listTaskSpaces();
  for (const s of spaces) {
    if (s.createdBy !== "agent") continue;
    const t = await taskSpace(s.id);
    await t.finish({ keep: [] });
  }
  return await listTaskSpaces();
}
