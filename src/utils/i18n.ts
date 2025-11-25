import { languages, defaultLanguage, type Language, languageNames } from '../types/index.js';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang && languages.includes(lang as Language)) {
    return lang as Language;
  }
  return defaultLanguage;
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLanguage) {
    return path;
  }
  return `/${lang}${path}`;
}

export function stripLangFromPath(path: string): string {
  const [, maybeLang, ...rest] = path.split('/');
  if (maybeLang && languages.includes(maybeLang as Language)) {
    return '/' + rest.join('/');
  }
  return path;
}

export function getLanguageNames() {
  return languageNames;
}

export function getAllLanguages() {
  return languages;
}

export interface I18nConfig {
  lang: Language;
  defaultLang: Language;
  availableLangs: Language[];
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.docs': 'Docs',
    'footer.copyright': 'Open Source Projects',
    'projects.title': 'Our Projects',
    'projects.viewOnGithub': 'View on GitHub',
    'projects.homepage': 'Homepage',
    'docs.prev': 'Previous',
    'docs.next': 'Next',
    'docs.toc': 'Table of Contents',
  },
  'zh-CN': {
    'nav.home': '首页',
    'nav.projects': '项目',
    'nav.blog': '博客',
    'nav.docs': '文档',
    'footer.copyright': '开源项目',
    'projects.title': '我们的项目',
    'projects.viewOnGithub': '在 GitHub 上查看',
    'projects.homepage': '主页',
    'docs.prev': '上一页',
    'docs.next': '下一页',
    'docs.toc': '目录',
  },
  'zh-TW': {
    'nav.home': '首頁',
    'nav.projects': '專案',
    'nav.blog': '部落格',
    'nav.docs': '文件',
    'footer.copyright': '開源專案',
    'projects.title': '我們的專案',
    'projects.viewOnGithub': '在 GitHub 上查看',
    'projects.homepage': '主頁',
    'docs.prev': '上一頁',
    'docs.next': '下一頁',
    'docs.toc': '目錄',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.projects': 'Проекты',
    'nav.blog': 'Блог',
    'nav.docs': 'Документация',
    'footer.copyright': 'Проекты с открытым исходным кодом',
    'projects.title': 'Наши проекты',
    'projects.viewOnGithub': 'Посмотреть на GitHub',
    'projects.homepage': 'Домашняя страница',
    'docs.prev': 'Предыдущая',
    'docs.next': 'Следующая',
    'docs.toc': 'Содержание',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.docs': 'Documentation',
    'footer.copyright': 'Projets Open Source',
    'projects.title': 'Nos projets',
    'projects.viewOnGithub': 'Voir sur GitHub',
    'projects.homepage': 'Page d\'accueil',
    'docs.prev': 'Précédent',
    'docs.next': 'Suivant',
    'docs.toc': 'Table des matières',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.blog': 'Blog',
    'nav.docs': 'Documentación',
    'footer.copyright': 'Proyectos de código abierto',
    'projects.title': 'Nuestros proyectos',
    'projects.viewOnGithub': 'Ver en GitHub',
    'projects.homepage': 'Página principal',
    'docs.prev': 'Anterior',
    'docs.next': 'Siguiente',
    'docs.toc': 'Tabla de contenidos',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.projects': 'Projekte',
    'nav.blog': 'Blog',
    'nav.docs': 'Dokumentation',
    'footer.copyright': 'Open-Source-Projekte',
    'projects.title': 'Unsere Projekte',
    'projects.viewOnGithub': 'Auf GitHub ansehen',
    'projects.homepage': 'Startseite',
    'docs.prev': 'Vorherige',
    'docs.next': 'Nächste',
    'docs.toc': 'Inhaltsverzeichnis',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.projects': 'プロジェクト',
    'nav.blog': 'ブログ',
    'nav.docs': 'ドキュメント',
    'footer.copyright': 'オープンソースプロジェクト',
    'projects.title': '私たちのプロジェクト',
    'projects.viewOnGithub': 'GitHub で見る',
    'projects.homepage': 'ホームページ',
    'docs.prev': '前へ',
    'docs.next': '次へ',
    'docs.toc': '目次',
  },
  ko: {
    'nav.home': '홈',
    'nav.projects': '프로젝트',
    'nav.blog': '블로그',
    'nav.docs': '문서',
    'footer.copyright': '오픈 소스 프로젝트',
    'projects.title': '우리의 프로젝트',
    'projects.viewOnGithub': 'GitHub에서 보기',
    'projects.homepage': '홈페이지',
    'docs.prev': '이전',
    'docs.next': '다음',
    'docs.toc': '목차',
  },
};

export function useI18n(lang: Language): I18nConfig {
  return {
    lang,
    defaultLang: defaultLanguage,
    availableLangs: languages,
    t: (key: string) => translations[lang]?.[key] || translations[defaultLanguage][key] || key,
  };
}
