/**
 * Russian dictionary (src/lib/i18n/locales/ru.ts) — serves `/ru/`.
 * Tagline/summary use the Owner translation table VERBATIM; UI labels
 * translated idiomatically with technical tokens kept verbatim.
 */
import type { Dictionary } from '../schema';

/** Russian plural for "запись" (post): 1 запись / 2–4 записи / 5+ записей,
 *  with the 11–14 override. Shared by the tag surfaces (postCount +
 *  metaForTag). */
const ruPosts = (count: number): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} запись`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} записи`;
  return `${count} записей`;
};

export const ru: Dictionary = {
  htmlLang: 'ru',
  dir: 'ltr',
  label: 'Русский',

  langNames: {
    en: 'английский',
    zh: 'китайский',
  },

  footer: {
    fleet: 'флот',
    hub: 'хаб',
    org: 'организация',
  },

  // Curated project copy (2026-09-07 walkthrough fix A, Owner-provided
  // translations verbatim); repos absent here fall back to the English
  // description.
  projectDescriptions: {
    unipty:
      'PTY, независимая от рантайма, для Node, Bun и Deno — один публичный контракт, выбираемые разработчиком бэкенды, заявления о поддержке, подтверждённые доказательствами.',
    openspecui:
      'Веб-компаньон для разработки, управляемой OpenSpec, — обслуживание, предпросмотр и экспорт spec-проектов одной командой.',
    ui:
      'Язык дизайна jixoai как shadcn-registry: терминальная эстетика, закон одного тона OKLCH и mono-first-компоненты, которые после копирования становятся вашими.',
    opentray:
      'Рантайм статуса на рабочем столе для CLI- и AI-skill-экосистем — tray-first-приложения на Node, Bun и Deno.',
    opendweb:
      'Сети на уровне приложений: приложения нескольких устройств образуют логические сети — как игровые комнаты, а не системный VPN — сначала прямой QUIC, затем собственный relay.',
    openiweb:
      'Узел личных приложений с открытым кодом для обычных людей — self-hosting без изучения ops: передайте MCP-endpoint и ключ своему AI-агенту.',
  },

  chrome: {
    subtitle: 'открытая лаборатория jixoai',
    navHome: 'Главная',
    navProjects: 'Проекты',
    navBlog: 'Блог',
    drawerLabel: 'Основная навигация',
    breadcrumbLabel: 'Навигационная цепочка',
    languageLabel: 'Язык',
  },

  home: {
    title: 'jixoai — Надёжная инфраструктура для эпохи ИИ',
    metaDescription:
      'Лаборатория open source jixoai — флагманские инфраструктурные проекты для эпохи ИИ. Официальные сайты, актуальные версии, README и блог лаборатории.',
    eyebrow: 'jixoai · открытая лаборатория',
    titleLead: 'Надёжная инфраструктура ',
    titleEm: 'для эпохи ИИ.',
    titleTail: '',
    badges: ['открытый код', 'лицензия MIT'],
    summary:
      'jixoai строит несущий слой, на котором стоит эпоха ИИ: терминальные рантаймы, языки дизайна и инструменты для разработчиков, поставляющие по одному честному контракту за раз. Открытый код, доказательная база, MIT.',
    projectsButton: 'Проекты ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — надёжная инфраструктура для эпохи ИИ',
    flagships: 'флагманы:',
    projectsHeading: 'Проекты',
    projectsSummary:
      'Флагманские репозитории организации — у каждого свой официальный сайт, репозиторий на GitHub и README, отрисованный как отдельная страница. Бейджи версий отражают последний GitHub Release и обновляются автоматически: сайт пересобирается при каждом push и по ежедневному расписанию.',
    allProjects: 'Все проекты →',
    allRepositories: 'Все репозитории ↗',
    versionData: (date) => `Данные версий получены ${date} из GitHub Releases.`,
    latestPosts: 'Последние записи',
    allPosts: 'Все записи →',
    noPosts: 'Публикаций пока нет.',
  },

  projectsIndex: {
    title: 'Проекты — jixoai',
    metaDescription:
      'Флагманский состав jixoai — официальные сайты, репозитории GitHub, актуальные версии и отображённые README.',
    heading: 'Проекты',
    summary: (date) =>
      `Все флагманские проекты jixoai в одной сетке — официальный сайт, репозиторий GitHub, последняя версия (зафиксирована ${date}) и отображённый README каждого проекта.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: 'Официальный сайт ↗',
    readmeOnGitHub: 'README на GitHub ↗',
    latestRelease: (tag) => `последний релиз (${tag})`,
    noRelease: 'релизов пока не опубликовано',
    readmeUnavailableLead: 'README недоступен на момент сборки — читайте на',
    readmeUnavailableLink: 'GitHub ↗.',
    originalLanguage: 'Оригинал (English)',
  },

  card: {
    site: 'Сайт ↗',
    readme: 'README →',
  },

  blogIndex: {
    title: 'Блог — jixoai',
    metaDescription:
      'Блог лаборатории jixoai: заметки о перезапуске, архитектурные решения и новости флота — пишут мейнтейнеры, публикуют как простые статические страницы.',
    heading: 'Блог',
    summary:
      'Заметки из лаборатории — пишут мейнтейнеры, рендерятся при сборке, раздаются как простые статические страницы. Без сервера, без клиентских запросов, без слежки.',
    releasePill: (version) => `Релиз на GitHub (${version})`,
  },

  blogTags: {
    title: 'Теги — блог jixoai',
    metaDescription:
      'Все теги блога лаборатории jixoai — по одной статической странице-списку на тег, сгруппированные по проектам и по типу записи.',
    heading: 'Теги',
    summary:
      'Те же записи, сгруппированные. Выберите тег, чтобы прочитать одну ветку целиком — каждая группа это статическая страница из той же сборки, что и индекс.',
    titleForTag: (tag) => `${tag} — блог jixoai`,
    metaForTag: (tag, count) =>
      `Записи с тегом ${tag} в блоге лаборатории jixoai — ${ruPosts(count)}, сначала новые.`,
    postCount: ruPosts,
    allTags: 'Все теги',
  },

  blogPost: {
    titleSuffix: 'блог jixoai',
    writtenIn: (language) => `Эта запись написана на ${language}.`,
    readIn: (language) => `Читать на ${language} →`,
  },
};
