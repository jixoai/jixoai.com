/**
 * English dictionary (src/lib/i18n/locales/en.ts) — the canonical
 * locale at `/`. Extracted verbatim from the pre-i18n pages (2026-09-06
 * nine-locale change): every string here is byte-equal to the copy it
 * replaced; zero-regression contract.
 */
import type { Dictionary } from '../schema';

export const en: Dictionary = {
  htmlLang: 'en',
  dir: 'ltr',
  label: 'English',

  chrome: {
    subtitle: 'the jixoai open-source lab',
    navHome: 'Home',
    navProjects: 'Projects',
    navBlog: 'Blog',
    drawerLabel: 'Primary',
    breadcrumbLabel: 'Breadcrumb',
    languageLabel: 'Language',
  },

  home: {
    title: 'jixoai — reliable infrastructure for the AI era',
    metaDescription:
      'jixoai builds the load-bearing layer the AI era stands on — UniPty, OpenSpecUI, the jixoai design language, OpenDWeb, OpenIWeb and more. Official sites, live release versions, and the lab blog.',
    eyebrow: 'jixoai · open-source lab',
    titleLead: 'Reliable infrastructure ',
    titleEm: 'for the AI era.',
    titleTail: '',
    badges: ['open source', 'MIT licensed', 'evidence-gated', 'github.com/jixoai'],
    summary:
      'jixoai builds the boring, load-bearing layer the AI era stands on: terminal runtimes, design languages, and developer tools that ship one honest contract at a time. Open source, evidence-gated, MIT.',
    projectsButton: 'Projects ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — reliable infrastructure for the AI era',
    flagships: 'flagships:',
    projectsHeading: 'Projects',
    projectsSummary:
      'The flagship repositories of the organization — each with its official site, its GitHub repo, and its README rendered as a detail page. Version pills mirror the latest GitHub Release and refresh automatically: this site rebuilds on every push and on a daily schedule.',
    allProjects: 'All projects →',
    allRepositories: 'All repositories ↗',
    versionData: (date) => `Version data captured ${date} from GitHub Releases.`,
    latestPosts: 'Latest posts',
    allPosts: 'All posts →',
    noPosts: 'No posts yet — the blog ships with the relaunch.',
  },

  projectsIndex: {
    title: 'Projects — jixoai',
    metaDescription:
      'The jixoai flagship roster: UniPty, OpenSpecUI, jixoai/ui, OpenTray, OpenDWeb and OpenIWeb — official sites, GitHub repositories, live release versions, and rendered READMEs.',
    heading: 'Projects',
    summary: (date) =>
      `Every jixoai flagship in one grid — the hub itself is configuration: adding, removing or relinking a project is a projects.manifest.json edit plus a logo asset. Version pills mirror the latest GitHub Release (captured ${date}); READMEs render from the repository head at build time.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'Official site ↗',
    readmeOnGitHub: 'README on GitHub ↗',
    latestRelease: (tag) => `latest release (${tag})`,
    noRelease: 'no release published yet',
    readmeUnavailableLead: 'README unavailable at build time — read it on',
    readmeUnavailableLink: 'GitHub ↗.',
    originalLanguage: 'Original (English)',
  },

  card: {
    site: 'Site ↗',
    readme: 'README →',
  },

  blogIndex: {
    title: 'Blog — jixoai',
    metaDescription:
      'The jixoai lab blog: relaunch notes, architecture decisions, and fleet announcements — written by the maintainers, published as plain static pages.',
    heading: 'Blog',
    summary:
      'Notes from the lab — written by the maintainers, rendered at build time, served as plain static pages. No server, no client fetches, no tracking.',
    releasePill: (version) => `GitHub release (${version})`,
  },

  blogPost: {
    titleSuffix: 'jixoai blog',
    writtenIn: (language) => `This post is written in ${language}.`,
  },
};
