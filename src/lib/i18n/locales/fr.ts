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
      "jixoai construit la couche porteuse sur laquelle repose l'ère de l'IA : runtimes de terminal, langages de conception et outils pour développeurs qui livrent un contrat honnête à la fois. Open source, à preuve d'usage, MIT.",
    projectsButton: 'Projets ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: "jixoai — une infrastructure fiable pour l'ère de l'IA",
    flagships: 'projets phares :',
    projectsHeading: 'Projets',
    projectsSummary:
      'Les dépôts phares de l’organisation — chacun avec son site officiel, son dépôt GitHub et son README rendu en page de détail. Les pastilles de version reflètent le dernier GitHub Release et se rafraîchissent automatiquement : ce site se reconstruit à chaque push et selon une tâche quotidienne.',
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

  blogPost: {
    titleSuffix: 'blog de jixoai',
    writtenIn: (language) => `Ce billet est rédigé en ${language}.`,
  },
};
