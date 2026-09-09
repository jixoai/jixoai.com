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

  langNames: {
    en: 'English',
    zh: 'Chinese',
  },

  footer: {
    fleet: 'fleet',
    hub: 'hub',
    org: 'org',
  },

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
      'The jixoai open-source lab — flagship infrastructure projects for the AI era. Official sites, live release versions, rendered READMEs, and the lab blog.',
    eyebrow: 'jixoai · open-source lab',
    titleLead: 'Reliable infrastructure ',
    titleEm: 'for the AI era.',
    titleTail: '',
    badges: ['open source', 'MIT licensed'],
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
    noPosts: 'No posts yet.',
  },

  projectsIndex: {
    title: 'Projects — jixoai',
    metaDescription:
      'The jixoai flagship roster — official sites, GitHub repositories, live release versions, and rendered READMEs.',
    heading: 'Projects',
    summary: (date) =>
      `Every jixoai flagship in one grid — the official site, the GitHub repository, the latest release version (captured ${date}), and the rendered README for each project.`,
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

  blogTags: {
    title: 'Tags — jixoai blog',
    metaDescription:
      'Every tag on the jixoai lab blog — one static list page per tag, grouped by project and by post kind.',
    heading: 'Tags',
    summary:
      'The same posts, grouped. Pick a tag to read one thread at a time — every group is a plain static page, built in the same pass as the index.',
    titleForTag: (tag) => `${tag} — jixoai blog`,
    metaForTag: (tag, count) =>
      `Posts tagged ${tag} on the jixoai lab blog — ${count} ${count === 1 ? 'post' : 'posts'}, newest first.`,
    postCount: (count) => `${count} ${count === 1 ? 'post' : 'posts'}`,
    allTags: 'All tags',
  },

  blogPost: {
    titleSuffix: 'jixoai blog',
    writtenIn: (language) => `This post is written in ${language}.`,
    readIn: (language) => `Read it in ${language} →`,
  },
};
