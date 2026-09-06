/**
 * Korean dictionary (src/lib/i18n/locales/ko.ts) — serves `/ko/`.
 * Tagline/summary use the Owner translation table VERBATIM; UI labels
 * translated idiomatically with technical tokens kept verbatim.
 */
import type { Dictionary } from '../schema';

export const ko: Dictionary = {
  htmlLang: 'ko',
  dir: 'ltr',
  label: '한국어',

  chrome: {
    subtitle: 'jixoai 오픈소스 랩',
    navHome: '홈',
    navProjects: '프로젝트',
    navBlog: '블로그',
    drawerLabel: '주요 탐색',
    breadcrumbLabel: '이동 경로',
    languageLabel: '언어',
  },

  home: {
    title: 'jixoai — AI 시대를 위한 믿을 수 있는 인프라',
    metaDescription:
      'jixoai는 AI 시대가 기대는 기반 계층을 만듭니다 — UniPty, OpenSpecUI, jixoai 디자인 언어, OpenDWeb, OpenIWeb 등. 공식 사이트, 실시간 릴리스 버전, 랩 블로그.',
    eyebrow: 'jixoai · 오픈소스 랩',
    titleLead: 'AI 시대를 위한 ',
    titleEm: '믿을 수 있는 인프라.',
    titleTail: '',
    badges: ['오픈소스', 'MIT 라이선스', '증거 기반', 'github.com/jixoai'],
    summary:
      'jixoai는 AI 시대가 기대는 기반 계층을 만듭니다: 터미널 런타임, 디자인 언어, 개발자 도구 — 매번 하나의 정직한 계약을 전달합니다. 오픈소스, 증거 기반, MIT.',
    projectsButton: '프로젝트 ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — AI 시대를 위한 믿을 수 있는 인프라',
    flagships: '플래그십:',
    projectsHeading: '프로젝트',
    projectsSummary:
      '조직의 플래그십 저장소 — 각각 공식 사이트, GitHub 저장소, 상세 페이지로 렌더링되는 README를 갖춥니다. 버전 알약은 최신 GitHub Release를 반영해 자동 갱신됩니다: 이 사이트는 매 푸시마다, 그리고 매일 재빌드됩니다.',
    allProjects: '모든 프로젝트 →',
    allRepositories: '모든 저장소 ↗',
    versionData: (date) => `버전 데이터는 ${date}에 GitHub Releases에서 수집.`,
    latestPosts: '최신 글',
    allPosts: '모든 글 →',
    noPosts: '아직 글이 없습니다 — 블로그는 리런치와 함께 시작됩니다.',
  },

  projectsIndex: {
    title: '프로젝트 — jixoai',
    metaDescription:
      'jixoai 플래그십 라인업: UniPty, OpenSpecUI, jixoai/ui, OpenTray, OpenDWeb, OpenIWeb — 공식 사이트, GitHub 저장소, 실시간 릴리스 버전, 렌더링된 README.',
    heading: '프로젝트',
    summary: (date) =>
      `모든 jixoai 플래그십을 한 그리드에 — 허브 자체가 설정입니다: 프로젝트 추가·제거·링크 변경은 projects.manifest.json 편집과 로고 하나면 충분합니다. 버전 알약은 최신 GitHub Release를 반영(${date} 수집); README는 빌드 시 저장소 HEAD에서 렌더링됩니다.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: '공식 사이트 ↗',
    readmeOnGitHub: 'GitHub의 README ↗',
    latestRelease: (tag) => `최신 릴리스(${tag})`,
    noRelease: '아직 게시된 릴리스 없음',
    readmeUnavailableLead: '빌드 시점에 README를 가져올 수 없습니다 —',
    readmeUnavailableLink: 'GitHub ↗에서 읽기.',
  },

  card: {
    site: '사이트 ↗',
    readme: 'README →',
  },

  blogIndex: {
    title: '블로그 — jixoai',
    metaDescription:
      'jixoai 랩 블로그: 리런치 노트, 아키텍처 결정, 플릿 소식 — 메인테이너가 직접 쓰고 평범한 정적 페이지로 게시.',
    heading: '블로그',
    summary:
      '랩에서 온 노트 — 메인테이너가 작성하고 빌드 시 렌더링되어 평범한 정적 페이지로 제공됩니다. 서버 없음, 클라이언트 fetch 없음, 추적 없음.',
    releasePill: (version) => `GitHub 릴리스(${version})`,
  },

  blogPost: {
    titleSuffix: 'jixoai 블로그',
  },
};
