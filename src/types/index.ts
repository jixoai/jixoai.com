export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ru' | 'fr' | 'es' | 'de' | 'ja' | 'ko';

export const languages: Language[] = [
  'en',      // English
  'zh-CN',   // Simplified Chinese
  'zh-TW',   // Traditional Chinese
  'ru',      // Russian
  'fr',      // French
  'es',      // Spanish
  'de',      // German
  'ja',      // Japanese
  'ko',      // Korean
];

export const languageNames: Record<Language, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'ru': 'Русский',
  'fr': 'Français',
  'es': 'Español',
  'de': 'Deutsch',
  'ja': '日本語',
  'ko': '한국어',
};

export const defaultLanguage: Language = 'en';

export interface GitHubProject {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  logo?: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TranslationRule {
  scope: string;
  rules: string;
}

export interface I18nContext {
  lang: Language;
  defaultLang: Language;
  availableLangs: Language[];
}
