/**
 * Russian dictionary (src/lib/i18n/locales/ru.ts) — serves `/ru/`.
 * Tagline/summary use the Owner translation table VERBATIM; UI labels
 * translated idiomatically with technical tokens kept verbatim.
 */
import type { Dictionary } from '../schema';

export const ru: Dictionary = {
  htmlLang: 'ru',
  dir: 'ltr',
  label: 'Русский',

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
      'Флагманские репозитории организации — у каждого свой официальный сайт, репозиторий на GitHub и README, отрисованный как отдельная страница. Пилюли версий отражают последний GitHub Release и обновляются автоматически: сайт пересобирается при каждом push и по ежедневному расписанию.',
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

  blogPost: {
    titleSuffix: 'блог jixoai',
    writtenIn: (language) => `Эта запись написана на ${language}.`,
  },
};
