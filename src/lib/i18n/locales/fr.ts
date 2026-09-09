/**
 * French dictionary (src/lib/i18n/locales/fr.ts) — serves `/fr/`.
 * Tagline/summary use the Owner translation table VERBATIM; UI labels
 * translated idiomatically with technical tokens kept verbatim.
 */
import type { Dictionary } from '../schema';

export const fr: Dictionary = {
  htmlLang: 'fr',
  dir: 'ltr',
  label: 'Français',

  langNames: {
    en: 'anglais',
    zh: 'chinois',
  },

  footer: {
    fleet: 'flotte',
    hub: 'hub',
    org: 'organisation',
  },

  // Curated project copy (2026-09-07 walkthrough fix A, Owner-provided
  // translations verbatim); repos absent here fall back to the English
  // description.
  projectDescriptions: {
    unipty:
      "PTY indépendante du runtime pour Node, Bun et Deno — un contrat public unique, des Backends au choix du développeur, des affirmations de support prouvées par des preuves.",
    openspecui:
      'Le compagnon web du développement piloté par OpenSpec — servir, prévisualiser et exporter des projets spec-driven en une seule commande.',
    ui:
      'Le langage de design jixoai en registry shadcn : esthétique terminal, la loi OKLCH à une seule teinte, des composants mono-first qui vous appartiennent après copie.',
    opentray:
      "Runtime d'état desktop pour les écosystèmes CLI et AI skills — des apps tray-first sur Node, Bun et Deno.",
    opendweb:
      'Le réseau au niveau applicatif : des apps multi-appareils forment des réseaux logiques — comme des salles de jeu, pas un VPN système — QUIC direct d’abord, relais auto-hébergé en repli.',
    openiweb:
      "Le nœud d'applications personnel open source pour tout le monde — auto-hébergez sans apprendre l'ops : confiez un endpoint MCP et une clé à votre agent de code IA.",
  },

  chrome: {
    subtitle: 'le laboratoire open source de jixoai',
    navHome: 'Accueil',
    navProjects: 'Projets',
    navBlog: 'Blog',
    drawerLabel: 'Navigation principale',
    breadcrumbLabel: "Fil d'Ariane",
    languageLabel: 'Langue',
  },

  home: {
    title: "jixoai — Une infrastructure fiable pour l'ère de l'IA",
    metaDescription:
      "Le laboratoire open source jixoai — des projets d'infrastructure phares pour l'ère de l'IA. Sites officiels, versions en direct, README et le blog du labo.",
    eyebrow: 'jixoai · labo open source',
    titleLead: 'Une infrastructure fiable ',
    titleEm: "pour l'ère de l'IA.",
    titleTail: '',
    badges: ['open source', 'sous licence MIT'],
    summary:
      "jixoai construit la couche porteuse sur laquelle repose l'ère de l'IA : runtimes de terminal, langages de conception et outils pour développeurs qui livrent un contrat honnête un à la fois. Open source, à preuve d'usage, MIT.",
    projectsButton: 'Projets ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: "jixoai — une infrastructure fiable pour l'ère de l'IA",
    flagships: 'projets phares :',
    projectsHeading: 'Projets',
    projectsSummary:
      'Les dépôts phares de l’organisation — chacun avec son site officiel, son dépôt GitHub et son README rendu en page de détail. Les badges de version reflètent le dernier GitHub Release et se rafraîchissent automatiquement : ce site se reconstruit à chaque push et selon une tâche quotidienne.',
    allProjects: 'Tous les projets →',
    allRepositories: 'Tous les dépôts ↗',
    versionData: (date) => `Données de version capturées le ${date} depuis GitHub Releases.`,
    latestPosts: 'Derniers billets',
    allPosts: 'Tous les billets →',
    noPosts: 'Pas encore de publication.',
  },

  projectsIndex: {
    title: 'Projets — jixoai',
    metaDescription:
      'Le roster des réalisations phares de jixoai — sites officiels, dépôts GitHub, versions en direct et READMEs affichés.',
    heading: 'Projets',
    summary: (date) =>
      `Toutes les réalisations phares de jixoai en une grille — site officiel, dépôt GitHub, dernière version (capturée le ${date}) et le README affiché de chaque projet.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'Site officiel ↗',
    readmeOnGitHub: 'README sur GitHub ↗',
    latestRelease: (tag) => `dernier release (${tag})`,
    noRelease: 'aucun release publié pour le moment',
    readmeUnavailableLead: 'README indisponible à la construction — à lire sur',
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
      "Le blog du labo jixoai : notes de refonte, décisions d'architecture et annonces de la flottille — écrits par les mainteneurs, publiés en pages statiques.",
    heading: 'Blog',
    summary:
      'Notes du labo — écrites par les mainteneurs, rendues à la construction, servies en pages statiques. Pas de serveur, pas de requêtes client, pas de pistage.',
    releasePill: (version) => `Publication GitHub (${version})`,
  },

  blogTags: {
    title: 'Étiquettes — blog de jixoai',
    metaDescription:
      "Toutes les étiquettes du blog du labo jixoai — une page de liste statique par étiquette, regroupées par projet et par type de billet.",
    heading: 'Étiquettes',
    summary:
      "Les mêmes billets, regroupés. Choisissez une étiquette pour lire un fil d'une traite : chaque groupe est une page statique construite dans la même passe que l'index.",
    titleForTag: (tag) => `${tag} — blog de jixoai`,
    metaForTag: (tag, count) =>
      `Billets étiquetés ${tag} sur le blog du labo jixoai — ${count} ${count <= 1 ? 'billet' : 'billets'}, du plus récent au plus ancien.`,
    postCount: (count) => `${count} ${count <= 1 ? 'billet' : 'billets'}`,
    allTags: 'Toutes les étiquettes',
  },

  blogPost: {
    titleSuffix: 'blog de jixoai',
    writtenIn: (language) => `Ce billet est rédigé en ${language}.`,
    readIn: (language) => `Lire en ${language} →`,
  },
};
