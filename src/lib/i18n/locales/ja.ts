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
      'jixoai は AI 時代が依拠する基幹レイヤーを構築します — UniPty、OpenSpecUI、jixoai デザイン言語、OpenDWeb、OpenIWeb など。公式サイト、最新のリリースバージョン、ラボのブログ。',
    eyebrow: 'jixoai · オープンソースラボ',
    titleLead: 'AI時代のための',
    titleEm: '信頼できるインフラ。',
    titleTail: '',
    badges: ['オープンソース', 'MIT ライセンス', 'エビデンスゲート', 'github.com/jixoai'],
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
    noPosts: 'まだ記事はありません — ブログはリニューアルとともに始動します。',
  },

  projectsIndex: {
    title: 'プロジェクト — jixoai',
    metaDescription:
      'jixoai のフラッグシップ一覧：UniPty、OpenSpecUI、jixoai/ui、OpenTray、OpenDWeb、OpenIWeb — 公式サイト、GitHub リポジトリ、最新リリースバージョン、レンダリングされた README。',
    heading: 'プロジェクト',
    summary: (date) =>
      `すべての jixoai フラッグシップを一つのグリッドに — ハブ自体が設定です：プロジェクトの追加・削除・リンク変更は projects.manifest.json の編集とロゴの配置だけで済みます。バージョンピルは最新の GitHub Release を反映（${date} 取得）；README はビルド時にリポジトリ HEAD からレンダリングされます。`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: '公式サイト ↗',
    readmeOnGitHub: 'GitHub の README ↗',
    latestRelease: (tag) => `最新リリース（${tag}）`,
    noRelease: 'リリースは未公開',
    readmeUnavailableLead: 'ビルド時に README を取得できませんでした —',
    readmeUnavailableLink: 'GitHub ↗ で読む。',
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
  },
};
