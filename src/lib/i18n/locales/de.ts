/**
 * German dictionary (src/lib/i18n/locales/de.ts) — serves `/de/`.
 * Tagline/summary use the Owner translation table VERBATIM; UI labels
 * translated idiomatically with technical tokens kept verbatim.
 */
import type { Dictionary } from '../schema';

export const de: Dictionary = {
  htmlLang: 'de',
  dir: 'ltr',
  label: 'Deutsch',

  chrome: {
    subtitle: 'das Open-Source-Labor von jixoai',
    navHome: 'Start',
    navProjects: 'Projekte',
    navBlog: 'Blog',
    drawerLabel: 'Hauptnavigation',
    breadcrumbLabel: 'Brotkrumen',
    languageLabel: 'Sprache',
  },

  home: {
    title: 'jixoai — Zuverlässige Infrastruktur für das KI-Zeitalter',
    metaDescription:
      'jixoai baut die tragende Schicht, auf der das KI-Zeitalter ruht — UniPty, OpenSpecUI, die jixoai-Designsprache, OpenDWeb, OpenIWeb und mehr. Offizielle Websites, aktuelle Release-Versionen und das Lab-Blog.',
    eyebrow: 'jixoai · Open-Source-Labor',
    titleLead: 'Zuverlässige Infrastruktur ',
    titleEm: 'für das KI-Zeitalter.',
    titleTail: '',
    badges: ['Open Source', 'MIT-lizenziert', 'evidenzbasiert', 'github.com/jixoai'],
    summary:
      'jixoai baut die tragende Schicht, auf der das KI-Zeitalter ruht: Terminal-Runtimes, Designsprachen und Entwicklerwerkzeuge, die jeweils einen ehrlichen Vertrag liefern. Open Source, evidenzbasiert, MIT.',
    projectsButton: 'Projekte ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — zuverlässige Infrastruktur für das KI-Zeitalter',
    flagships: 'Flaggschiffe:',
    projectsHeading: 'Projekte',
    projectsSummary:
      'Die Flaggschiff-Repositories der Organisation — jedes mit offizieller Website, GitHub-Repo und als Detailseite gerendertem README. Die Versions-Pills spiegeln das neueste GitHub Release und aktualisieren sich automatisch: diese Site wird bei jedem Push und täglich neu gebaut.',
    allProjects: 'Alle Projekte →',
    allRepositories: 'Alle Repositories ↗',
    versionData: (date) => `Versionsdaten am ${date} aus GitHub Releases übernommen.`,
    latestPosts: 'Neueste Beiträge',
    allPosts: 'Alle Beiträge →',
    noPosts: 'Noch keine Beiträge — das Blog startet mit dem Relaunch.',
  },

  projectsIndex: {
    title: 'Projekte — jixoai',
    metaDescription:
      'Die jixoai-Flaggschiff-Flotte: UniPty, OpenSpecUI, jixoai/ui, OpenTray, OpenDWeb und OpenIWeb — offizielle Websites, GitHub-Repositories, aktuelle Release-Versionen und gerenderte READMEs.',
    heading: 'Projekte',
    summary: (date) =>
      `Alle jixoai-Flaggschiffe in einem Raster — der Hub selbst ist Konfiguration: Hinzufügen, Entfernen oder Verlinken eines Projekts ist eine projects.manifest.json-Änderung plus ein Logo. Die Versions-Pills spiegeln das neueste GitHub Release (erfasst am ${date}); READMEs werden zur Build-Zeit vom Repository-HEAD gerendert.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'Offizielle Website ↗',
    readmeOnGitHub: 'README auf GitHub ↗',
    latestRelease: (tag) => `neuestes Release (${tag})`,
    noRelease: 'noch kein Release veröffentlicht',
    readmeUnavailableLead: 'README zur Build-Zeit nicht erreichbar — auf',
    readmeUnavailableLink: 'GitHub ↗ lesen.',
  },

  card: {
    site: 'Website ↗',
    readme: 'README →',
  },

  blogIndex: {
    title: 'Blog — jixoai',
    metaDescription:
      'Das jixoai-Lab-Blog: Relaunch-Notizen, Architekturentscheidungen und Flottenankündigungen — von den Maintainern geschrieben, als schlichte statische Seiten veröffentlicht.',
    heading: 'Blog',
    summary:
      'Notizen aus dem Lab — von den Maintainern geschrieben, zur Build-Zeit gerendert, als schlichte statische Seiten ausgeliefert. Kein Server, keine Client-Requests, kein Tracking.',
  },

  blogPost: {
    titleSuffix: 'jixoai-Blog',
  },
};
