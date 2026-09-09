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

  langNames: {
    en: 'Englisch',
    zh: 'Chinesisch',
  },

  footer: {
    fleet: 'Flotte',
    hub: 'Hub',
    org: 'Organisation',
  },

  // Curated project copy (2026-09-07 walkthrough fix A, Owner-provided
  // translations verbatim); repos absent here fall back to the English
  // description.
  projectDescriptions: {
    unipty:
      'Runtime-neutrales PTY für Node, Bun und Deno — ein öffentlicher Vertrag, vom Entwickler wählbare Backends, evidenzbasierte Support-Aussagen.',
    openspecui:
      'Der Web-Begleiter für OpenSpec-getriebene Entwicklung — spec-driven-Projekte mit einem Befehl servieren, vorschauen und exportieren.',
    ui:
      'Die jixoai-Designsprache als shadcn-Registry: Terminal-Ästhetik, das OKLCH-Ein-Farbton-Gesetz und Mono-first-Komponenten, die nach dem Kopieren dir gehören.',
    opentray:
      'Desktop-Status-Runtime für CLI- und AI-Skill-Ökosysteme — tray-first-Apps auf Node, Bun und Deno.',
    opendweb:
      'Vernetzung auf Anwendungsebene: Multi-Device-Apps bilden logische Netzwerke — wie Spielräume, kein System-VPN — QUIC direkt zuerst, selbst gehosteter Relay als Fallback.',
    openiweb:
      'Der offene Personal-App-Knoten für alle — self-hosten ohne Ops zu lernen: übergib einen MCP-Endpoint und einen Key an deinen KI-Coding-Agenten.',
  },

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
      'Das Open-Source-Labor jixoai — Leuchtturm-Infrastrukturprojekte für das KI-Zeitalter. Offizielle Websites, Live-Versionen, READMEs und das Lab-Blog.',
    eyebrow: 'jixoai · Open-Source-Labor',
    titleLead: 'Zuverlässige Infrastruktur ',
    titleEm: 'für das KI-Zeitalter.',
    titleTail: '',
    badges: ['Open Source', 'MIT-lizenziert'],
    summary:
      'jixoai baut die tragende Schicht, auf der das KI-Zeitalter ruht: Terminal-Runtimes, Designsprachen und Entwicklerwerkzeuge, die jeweils einen ehrlichen Vertrag liefern. Open Source, evidenzbasiert, MIT.',
    projectsButton: 'Projekte ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — zuverlässige Infrastruktur für das KI-Zeitalter',
    flagships: 'Flaggschiffe:',
    projectsHeading: 'Projekte',
    projectsSummary:
      'Die Flaggschiff-Repositories der Organisation — jedes mit offizieller Website, GitHub-Repo und als Detailseite gerendertem README. Die Versions-Badges spiegeln das neueste GitHub Release und aktualisieren sich automatisch: diese Site wird bei jedem Push und täglich neu gebaut.',
    allProjects: 'Alle Projekte →',
    allRepositories: 'Alle Repositories ↗',
    versionData: (date) => `Versionsdaten am ${date} aus GitHub Releases übernommen.`,
    latestPosts: 'Neueste Beiträge',
    allPosts: 'Alle Beiträge →',
    noPosts: 'Noch keine Beiträge.',
  },

  projectsIndex: {
    title: 'Projekte — jixoai',
    metaDescription:
      'Das jixoai-Leuchtturm-Roster — offizielle Websites, GitHub-Repositories, Live-Versionen und gerenderte READMEs.',
    heading: 'Projekte',
    summary: (date) =>
      `Alle jixoai-Leuchttürme in einem Raster — offizielle Website, GitHub-Repository, neueste Version (erfasst am ${date}) und das gerenderte README jedes Projekts.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'Offizielle Website ↗',
    readmeOnGitHub: 'README auf GitHub ↗',
    latestRelease: (tag) => `neuestes Release (${tag})`,
    noRelease: 'noch kein Release veröffentlicht',
    readmeUnavailableLead: 'README zur Build-Zeit nicht erreichbar — auf',
    readmeUnavailableLink: 'GitHub ↗ lesen.',
    originalLanguage: 'Original (English)',
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
    releasePill: (version) => `GitHub-Release (${version})`,
  },

  blogTags: {
    title: 'Schlagwörter — jixoai-Blog',
    metaDescription:
      'Alle Schlagwörter des jixoai-Lab-Blogs — eine statische Listenseite pro Schlagwort, gruppiert nach Projekt und Beitragsart.',
    heading: 'Schlagwörter',
    summary:
      'Dieselben Beiträge, gruppiert. Wähle ein Schlagwort, um einen Strang am Stück zu lesen — jede Gruppe ist eine statische Seite aus demselben Build wie der Index.',
    titleForTag: (tag) => `${tag} — jixoai-Blog`,
    metaForTag: (tag, count) =>
      `Beiträge mit dem Schlagwort ${tag} im jixoai-Lab-Blog — ${count} ${count === 1 ? 'Beitrag' : 'Beiträge'}, neueste zuerst.`,
    postCount: (count) => `${count} ${count === 1 ? 'Beitrag' : 'Beiträge'}`,
    allTags: 'Alle Schlagwörter',
  },

  blogPost: {
    titleSuffix: 'jixoai-Blog',
    writtenIn: (language) => `Dieser Beitrag ist auf ${language} verfasst.`,
    readIn: (language) => `Auf ${language} lesen →`,
  },
};
