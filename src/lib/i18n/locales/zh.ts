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
      'jixoai 打造 AI 时代所依赖的承重层 —— UniPty、OpenSpecUI、jixoai 设计语言、OpenDWeb、OpenIWeb 等。官方网站、实时 release 版本与实验室博客。',
    eyebrow: 'jixoai · 开源实验室',
    titleLead: '面向 AI 时代',
    titleEm: '的可靠基础设施。',
    titleTail: '',
    badges: ['开源', 'MIT 许可', '证据门控', 'github.com/jixoai'],
    summary:
      'jixoai 打造 AI 时代所依赖的承重层：终端运行时、设计语言与开发者工具，每一次交付都只给出一份诚实的契约。开源、证据门控、MIT。',
    projectsButton: '项目 ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — 面向 AI 时代的可靠基础设施',
    flagships: '旗舰项目:',
    projectsHeading: '项目',
    projectsSummary:
      '组织的旗舰仓库 —— 每个项目都有自己的官方网站、GitHub 仓库，以及渲染为详情页的 README。版本徽章镜像最新 GitHub Release 并自动刷新：本站在每次推送与每日定时任务时重建。',
    allProjects: '全部项目 →',
    allRepositories: '全部仓库 ↗',
    versionData: (date) => `版本数据取自 GitHub Releases（捕获于 ${date}）。`,
    latestPosts: '最新文章',
    allPosts: '全部文章 →',
    noPosts: '暂无文章 —— 博客随站点重构一同上线。',
  },

  projectsIndex: {
    title: '项目 — jixoai',
    metaDescription:
      'jixoai 旗舰阵容：UniPty、OpenSpecUI、jixoai/ui、OpenTray、OpenDWeb 与 OpenIWeb —— 官方网站、GitHub 仓库、实时 release 版本与渲染的 README。',
    heading: '项目',
    summary: (date) =>
      `所有 jixoai 旗舰汇于一格 —— 中心本身即配置：新增、移除或重新链接项目只需编辑 projects.manifest.json 并放置一枚 logo。版本徽章镜像最新 GitHub Release（捕获于 ${date}）；README 在构建时从仓库 HEAD 渲染。`,
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
  },
};
