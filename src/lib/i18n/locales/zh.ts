/**
 * Chinese dictionary (src/lib/i18n/locales/zh.ts) — serves `/zh/`.
 * Tagline/summary/project descriptions use the Owner translation table
 * VERBATIM (proposal 2026-09-06-site-i18n-nine-locales).
 */
import type { Dictionary } from '../schema';

export const zh: Dictionary = {
  htmlLang: 'zh',
  dir: 'ltr',
  label: '中文',

  langNames: {
    en: '英文',
    zh: '中文',
  },

  footer: {
    fleet: '项目',
    hub: '枢纽',
    org: '组织',
  },

  // Curated project copy (2026-09-07 walkthrough fix A) — replaces the
  // manifest descriptionZh tier for every covered repo; repos absent
  // here fall back through descriptionZh to the English description.
  projectDescriptions: {
    unipty:
      '面向 Node、Bun、Deno 的运行时中立 PTY——一份公开契约、开发者可自选 Backend、每条支持声明都有证据背书。',
    openspecui:
      'OpenSpec 驱动开发的 Web 伴侣——一条命令完成 spec 项目的启动、预览与导出。',
    ui: '以 shadcn registry 形式发布的 jixoai 设计语言——终端美学、OKLCH 单色相法则，组件复制过来就是你的。',
    opentray:
      '面向 CLI 与 AI skill 生态的桌面常驻状态运行时——托盘优先的应用，跑在 Node、Bun、Deno 上。',
    opendweb:
      '应用级组网——多设备应用组成逻辑网络：像游戏房间，而非系统级 VPN；QUIC 直连优先，可自建 Relay 兜底。',
    openiweb:
      '给普通人用的开源个人应用节点——不必学运维也能自托管：交给 AI 编程代理一个 MCP 端点和一把密钥即可。',
  },

  chrome: {
    subtitle: 'jixoai 开源实验室',
    navHome: '首页',
    navProjects: '项目',
    navBlog: '博客',
    drawerLabel: '主导航',
    breadcrumbLabel: '面包屑',
    languageLabel: '语言',
  },

  home: {
    title: 'jixoai — 面向 AI 时代的可靠基础设施',
    metaDescription:
      'jixoai 开源实验室——面向 AI 时代的旗舰基础设施项目：官网、实时发布版本、README 与实验室博客。',
    eyebrow: 'jixoai · 开源实验室',
    titleLead: '面向 AI 时代',
    titleEm: '的可靠基础设施。',
    titleTail: '',
    badges: ['开源', 'MIT 许可'],
    summary:
      'jixoai 打造 AI 时代所依赖的承重层：终端运行时、设计语言与开发者工具，每一次交付都只给出一份诚实的契约。开源、证据门控、MIT。',
    projectsButton: '项目 ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — 面向 AI 时代的可靠基础设施',
    flagships: '旗舰项目:',
    projectsHeading: '项目',
    projectsSummary:
      '组织的旗舰仓库 —— 每个项目都有自己的官方网站、GitHub 仓库，以及渲染为详情页的 README。版本徽章实时对应每个项目的最新 GitHub Release：本站在每次推送与每日定时任务时重建。',
    allProjects: '全部项目 →',
    allRepositories: '全部仓库 ↗',
    versionData: (date) => `版本数据取自 GitHub Releases（捕获于 ${date}）。`,
    latestPosts: '最新文章',
    allPosts: '全部文章 →',
    noPosts: '暂无文章。',
  },

  projectsIndex: {
    title: '项目 — jixoai',
    metaDescription:
      'jixoai 旗舰项目一览——官网、GitHub 仓库、实时发布版本与渲染后的 README。',
    heading: '项目',
    summary: (date) =>
      `所有 jixoai 旗舰项目一览——每个项目的官网、GitHub 仓库、最新发布版本（${date} 捕获）与渲染后的 README。`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: '官方网站 ↗',
    readmeOnGitHub: 'GitHub 上的 README ↗',
    latestRelease: (tag) => `最新 release（${tag}）`,
    noRelease: '尚未发布 release',
    readmeUnavailableLead: '构建时无法获取 README —— 请到',
    readmeUnavailableLink: 'GitHub ↗ 阅读。',
    originalLanguage: '原文（English）',
  },

  card: {
    site: '网站 ↗',
    readme: 'README →',
  },

  blogIndex: {
    title: '博客 — jixoai',
    metaDescription:
      'jixoai 实验室博客：重构说明、架构决策与旗舰动态 —— 由维护者撰写，以纯静态页面发布。',
    heading: '博客',
    summary:
      '来自实验室的笔记 —— 由维护者撰写，构建时渲染，以纯静态页面提供服务。无服务器、无客户端请求、无追踪。',
    releasePill: (version) => `GitHub 发布（${version}）`,
  },

  blogPost: {
    titleSuffix: 'jixoai 博客',
    writtenIn: (language) => `本文以${language}撰写。`,
    readIn: (language) => `阅读${language}版 →`,
  },
};
