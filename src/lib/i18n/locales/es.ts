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

  langNames: {
    en: 'inglés',
    zh: 'chino',
  },

  footer: {
    fleet: 'flota',
    hub: 'hub',
    org: 'organización',
  },

  // Curated project copy (2026-09-07 walkthrough fix A, Owner-provided
  // translations verbatim); repos absent here fall back to the English
  // description.
  projectDescriptions: {
    unipty:
      'PTY neutra al runtime para Node, Bun y Deno — un contrato público único, Backends elegibles por el desarrollador y afirmaciones de apoyo verificadas con evidencia.',
    openspecui:
      'La companion web para el desarrollo guiado por OpenSpec — sirve, previsualiza y exporta proyectos spec-driven con un solo comando.',
    ui:
      'El lenguaje de diseño de jixoai como registry de shadcn: estética de terminal, la ley de un solo matiz OKLCH y componentes mono-first que pasan a ser tuyos al copiarlos.',
    opentray:
      'Runtime de estado de escritorio para ecosistemas CLI y de AI skills — apps tray-first sobre Node, Bun y Deno.',
    opendweb:
      'Redes a nivel de aplicación: apps multidispositivo forman redes lógicas — como salas de juego, no VPN de sistema — con QUIC directo primero y relay autoalojado de respaldo.',
    openiweb:
      'El nodo de aplicaciones personales open source para gente corriente — autohospeda sin aprender ops: entrega un endpoint MCP y una clave a tu agente de código IA.',
  },

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
      'El laboratorio open source de jixoai — proyectos insignia de infraestructura para la era de la IA. Sitios oficiales, versiones en vivo, READMEs y el blog del laboratorio.',
    eyebrow: 'jixoai · laboratorio open source',
    titleLead: 'Infraestructura fiable ',
    titleEm: 'para la era de la IA.',
    titleTail: '',
    badges: ['código abierto', 'licencia MIT'],
    summary:
      "jixoai construye la capa de carga sobre la que se apoya la era de la IA: runtimes de terminal, lenguajes de diseño y herramientas para desarrolladores que entregan un contrato honesto uno a la vez. Código abierto, con evidencia verificable, MIT.",
    projectsButton: 'Proyectos ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — infraestructura fiable para la era de la IA',
    flagships: 'proyectos insignia:',
    projectsHeading: 'Proyectos',
    projectsSummary:
      'Los repositorios insignia de la organización — cada uno con su sitio oficial, su repositorio de GitHub y su README renderizado como página de detalle. Las insignias de versión reflejan el último GitHub Release y se actualizan solas: este sitio se reconstruye en cada push y con una tarea diaria.',
    allProjects: 'Todos los proyectos →',
    allRepositories: 'Todos los repositorios ↗',
    versionData: (date) => `Datos de versión capturados el ${date} desde GitHub Releases.`,
    latestPosts: 'Últimas publicaciones',
    allPosts: 'Todas las publicaciones →',
    noPosts: 'Aún no hay publicaciones.',
  },

  projectsIndex: {
    title: 'Proyectos — jixoai',
    metaDescription:
      'El roster insignia de jixoai — sitios oficiales, repositorios de GitHub, versiones en vivo y READMEs renderizados.',
    heading: 'Proyectos',
    summary: (date) =>
      `Todos los proyectos insignia de jixoai en una cuadrícula — sitio oficial, repositorio de GitHub, última versión (capturada el ${date}) y el README renderizado de cada proyecto.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'Sitio oficial ↗',
    readmeOnGitHub: 'README en GitHub ↗',
    latestRelease: (tag) => `último release (${tag})`,
    noRelease: 'aún sin releases publicados',
    readmeUnavailableLead: 'README no disponible en tiempo de construcción — léelo en',
    readmeUnavailableLink: 'GitHub ↗.',
    originalLanguage: 'Original (English)',
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

  blogTags: {
    title: 'Etiquetas — blog de jixoai',
    metaDescription:
      'Todas las etiquetas del blog del laboratorio jixoai: una página de listado estática por etiqueta, agrupadas por proyecto y tipo de entrada.',
    heading: 'Etiquetas',
    summary:
      'Las mismas entradas, agrupadas. Elige una etiqueta para leer un hilo de una vez: cada grupo es una página estática construida en la misma pasada que el índice.',
    titleForTag: (tag) => `${tag} — blog de jixoai`,
    metaForTag: (tag, count) =>
      `Entradas con la etiqueta ${tag} en el blog del laboratorio jixoai — ${count} ${count === 1 ? 'entrada' : 'entradas'}, de la más reciente a la más antigua.`,
    postCount: (count) => `${count} ${count === 1 ? 'entrada' : 'entradas'}`,
    allTags: 'Todas las etiquetas',
  },

  blogPost: {
    titleSuffix: 'blog de jixoai',
    writtenIn: (language) => `Esta publicación está escrita en ${language}.`,
    readIn: (language) => `Léela en ${language} →`,
  },
};
