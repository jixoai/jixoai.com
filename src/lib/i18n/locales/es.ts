/**
 * Spanish dictionary (src/lib/i18n/locales/es.ts) — serves `/es/`.
 * Tagline/summary use the Owner translation table VERBATIM; UI labels
 * translated idiomatically with technical tokens kept verbatim.
 */
import type { Dictionary } from '../schema';

export const es: Dictionary = {
  htmlLang: 'es',
  dir: 'ltr',
  label: 'Español',

  chrome: {
    subtitle: 'el laboratorio open source de jixoai',
    navHome: 'Inicio',
    navProjects: 'Proyectos',
    navBlog: 'Blog',
    drawerLabel: 'Navegación principal',
    breadcrumbLabel: 'Ruta de navegación',
    languageLabel: 'Idioma',
  },

  home: {
    title: 'jixoai — Infraestructura fiable para la era de la IA',
    metaDescription:
      'jixoai construye la capa de carga sobre la que se apoya la era de la IA — UniPty, OpenSpecUI, el lenguaje de diseño jixoai, OpenDWeb, OpenIWeb y más. Sitios oficiales, versiones de release en vivo y el blog del laboratorio.',
    eyebrow: 'jixoai · laboratorio open source',
    titleLead: 'Infraestructura fiable ',
    titleEm: 'para la era de la IA.',
    titleTail: '',
    badges: ['código abierto', 'licencia MIT', 'con evidencia verificable', 'github.com/jixoai'],
    summary:
      "jixoai construye la capa de carga sobre la que se apoya la era de la IA: runtimes de terminal, lenguajes de diseño y herramientas para desarrolladores que entregan un contrato honesto a la vez. Código abierto, con evidencia verificable, MIT.",
    projectsButton: 'Proyectos ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — infraestructura fiable para la era de la IA',
    flagships: 'proyectos insignia:',
    projectsHeading: 'Proyectos',
    projectsSummary:
      'Los repositorios insignia de la organización — cada uno con su sitio oficial, su repositorio de GitHub y su README renderizado como página de detalle. Las píldoras de versión reflejan el último GitHub Release y se actualizan solas: este sitio se reconstruye en cada push y con una tarea diaria.',
    allProjects: 'Todos los proyectos →',
    allRepositories: 'Todos los repositorios ↗',
    versionData: (date) => `Datos de versión capturados el ${date} desde GitHub Releases.`,
    latestPosts: 'Últimas publicaciones',
    allPosts: 'Todas las publicaciones →',
    noPosts: 'Aún no hay publicaciones — el blog llega con el relanzamiento.',
  },

  projectsIndex: {
    title: 'Proyectos — jixoai',
    metaDescription:
      'El elenco insignia de jixoai: UniPty, OpenSpecUI, jixoai/ui, OpenTray, OpenDWeb y OpenIWeb — sitios oficiales, repositorios de GitHub, versiones de release en vivo y READMEs renderizados.',
    heading: 'Proyectos',
    summary: (date) =>
      `Cada insignia de jixoai en una sola cuadrícula — el hub en sí es configuración: añadir, quitar o reenlazar un proyecto es editar projects.manifest.json y añadir un logo. Las píldoras de versión reflejan el último GitHub Release (capturado el ${date}); los README se renderizan desde la cabeza del repositorio en tiempo de construcción.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'Sitio oficial ↗',
    readmeOnGitHub: 'README en GitHub ↗',
    latestRelease: (tag) => `último release (${tag})`,
    noRelease: 'aún sin releases publicados',
    readmeUnavailableLead: 'README no disponible en tiempo de construcción — léelo en',
    readmeUnavailableLink: 'GitHub ↗.',
  },

  card: {
    site: 'Sitio ↗',
    readme: 'README →',
  },

  blogIndex: {
    title: 'Blog — jixoai',
    metaDescription:
      'El blog del laboratorio jixoai: notas del relanzamiento, decisiones de arquitectura y anuncios de la flota — escritos por los mantenedores, publicados como páginas estáticas.',
    heading: 'Blog',
    summary:
      'Notas del laboratorio — escritas por los mantenedores, renderizadas en tiempo de construcción y servidas como páginas estáticas. Sin servidor, sin peticiones del cliente, sin rastreo.',
    releasePill: (version) => `Publicación de GitHub (${version})`,
  },

  blogPost: {
    titleSuffix: 'blog de jixoai',
  },
};
