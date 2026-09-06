/**
 * Japanese dictionary (src/lib/i18n/locales/ja.ts) — serves `/ja/`.
 * Tagline/summary use the Owner translation table VERBATIM; UI labels
 * translated idiomatically with technical tokens kept verbatim.
 */
import type { Dictionary } from '../schema';

export const ja: Dictionary = {
  htmlLang: 'ja',
  dir: 'ltr',
  label: '日本語',

  chrome: {
    subtitle: 'jixoai オープンソースラボ',
    navHome: 'ホーム',
    navProjects: 'プロジェクト',
    navBlog: 'ブログ',
    drawerLabel: 'メインナビゲーション',
    breadcrumbLabel: 'パンくずリスト',
    languageLabel: '言語',
  },

  home: {
    title: 'jixoai — AI時代のための信頼できるインフラ',
    metaDescription:
      'jixoai オープンソースラボ — AI時代のための主力インフラプロジェクト。公式サイト、最新リリース、README、ラボブログ。',
    eyebrow: 'jixoai · オープンソースラボ',
    titleLead: 'AI時代のための',
    titleEm: '信頼できるインフラ。',
    titleTail: '',
    badges: ['オープンソース', 'MIT ライセンス'],
    summary:
      'jixoai は AI 時代が依拠する基幹レイヤーを構築します。ターミナルランタイム、デザイン言語、開発者ツール — 一度に一つの誠実な契約を届ける。オープンソース、エビデンスゲート、MIT。',
    projectsButton: 'プロジェクト ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — AI時代のための信頼できるインフラ',
    flagships: 'フラッグシップ:',
    projectsHeading: 'プロジェクト',
    projectsSummary:
      '組織のフラッグシップリポジトリ — それぞれが公式サイト・GitHub リポジトリ・詳細ページとしてレンダリングされた README を備えます。バージョンピルは最新の GitHub Release を反映して自動更新されます：このサイトはプッシュごとと毎日のスケジュールで再ビルドされます。',
    allProjects: 'すべてのプロジェクト →',
    allRepositories: 'すべてのリポジトリ ↗',
    versionData: (date) => `バージョンデータは ${date} に GitHub Releases から取得。`,
    latestPosts: '最新の記事',
    allPosts: 'すべての記事 →',
    noPosts: '投稿はまだありません。',
  },

  projectsIndex: {
    title: 'プロジェクト — jixoai',
    metaDescription:
      'jixoai の主力ラインナップ — 公式サイト、GitHubリポジトリ、最新リリース、レンダリングされたREADME。',
    heading: 'プロジェクト',
    summary: (date) =>
      `jixoai の主力プロジェクトを一覧 — 各プロジェクトの公式サイト、GitHubリポジトリ、最新リリース（${date} 時点）、レンダリングされたREADME。`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: '公式サイト ↗',
    readmeOnGitHub: 'GitHub の README ↗',
    latestRelease: (tag) => `最新リリース（${tag}）`,
    noRelease: 'リリースは未公開',
    readmeUnavailableLead: 'ビルド時に README を取得できませんでした —',
    readmeUnavailableLink: 'GitHub ↗ で読む。',
    originalLanguage: '原文（English）',
  },

  card: {
    site: 'サイト ↗',
    readme: 'README →',
  },

  blogIndex: {
    title: 'ブログ — jixoai',
    metaDescription:
      'jixoai ラボのブログ：リニューアルノート、アーキテクチャの決定、フリートの発表 — メンテナーが書き、プレーンな静的ページとして公開。',
    heading: 'ブログ',
    summary:
      'ラボからのノート — メンテナーが執筆し、ビルド時にレンダリングされ、プレーンな静的ページとして配信。サーバーなし、クライアント fetch なし、トラッキングなし。',
    releasePill: (version) => `GitHub リリース（${version}）`,
  },

  blogPost: {
    titleSuffix: 'jixoai ブログ',
    writtenIn: (language) => `この記事は${language}で書かれています。`,
  },
};
