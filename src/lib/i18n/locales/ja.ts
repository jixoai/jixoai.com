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

  langNames: {
    en: '英語',
    zh: '中国語',
  },

  footer: {
    fleet: 'フリート',
    hub: 'ハブ',
    org: '組織',
  },

  // Curated project copy (2026-09-07 walkthrough fix A, Owner-provided
  // translations verbatim); repos absent here fall back to the English
  // description.
  projectDescriptions: {
    unipty:
      'Node・Bun・Denoのためのランタイム中立PTY —— 単一の公開コントラクト、開発者が選べるバックエンド、エビデンスで裏付けられたサポート宣言。',
    openspecui:
      'OpenSpec駆動開発のためのWebコンパニオン —— コマンド一つでspec-drivenプロジェクトをserve・プレビュー・エクスポート。',
    ui:
      'shadcn registryとしてのjixoaiデザイン言語 —— ターミナル美学、OKLCH単一色相の法則、コピー後にあなたのものになるmono-firstコンポーネント。',
    opentray:
      'CLI・AIスキルエコシステムのためのデスクトップステータスランタイム —— Node・Bun・Deno上で動くtray-firstアプリ。',
    opendweb:
      'アプリケーションレベルのネットワーキング —— マルチデバイスアプリが論理ネットワークを形成します。ゲームルームのようで、システムVPNではありません。QUIC直結優先・セルフホストrelayフォールバック。',
    openiweb:
      '普通人のためのオープンソース個人アプリノード —— 運用を学ばずセルフホスト：MCPエンドポイントと鍵をAIコーディングエージェントに委譲するだけ。',
  },

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
      '組織のフラッグシップリポジトリ — それぞれが公式サイト・GitHub リポジトリ・詳細ページとしてレンダリングされた README を備えます。バージョンバッジは最新の GitHub Release を反映して自動更新されます：このサイトはプッシュごとと毎日のスケジュールで再ビルドされます。',
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
    readIn: (language) => `${language}版を読む →`,
  },
};
