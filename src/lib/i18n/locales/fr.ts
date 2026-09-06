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
      "jixoai construit la couche porteuse sur laquelle repose l'ère de l'IA — UniPty, OpenSpecUI, le langage de conception jixoai, OpenDWeb, OpenIWeb et plus. Sites officiels, versions de release en direct et le blog du labo.",
    eyebrow: 'jixoai · labo open source',
    titleLead: 'Une infrastructure fiable ',
    titleEm: "pour l'ère de l'IA.",
    titleTail: '',
    badges: ['open source', 'sous licence MIT', 'à preuve d’usage', 'github.com/jixoai'],
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
    noPosts: 'Pas encore de billet — le blog arrive avec la refonte.',
  },

  projectsIndex: {
    title: 'Projets — jixoai',
    metaDescription:
      'La flottille phare de jixoai : UniPty, OpenSpecUI, jixoai/ui, OpenTray, OpenDWeb et OpenIWeb — sites officiels, dépôts GitHub, versions de release en direct et READMEs rendus.',
    heading: 'Projets',
    summary: (date) =>
      `Chaque projet phare de jixoai sur une seule grille — le hub est lui-même de la configuration : ajouter, retirer ou relier un projet se résume à une modification de projects.manifest.json plus un logo. Les pastilles de version reflètent le dernier GitHub Release (capturé le ${date}) ; les README sont rendus depuis la tête du dépôt à la construction.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'Site officiel ↗',
    readmeOnGitHub: 'README sur GitHub ↗',
    latestRelease: (tag) => `dernier release (${tag})`,
    noRelease: 'aucun release publié pour le moment',
    readmeUnavailableLead: 'README indisponible à la construction — à lire sur',
    readmeUnavailableLink: 'GitHub ↗.',
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
  },
};
