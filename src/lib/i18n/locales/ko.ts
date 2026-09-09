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

  langNames: {
    en: '영어',
    zh: '중국어',
  },

  footer: {
    fleet: '플릿',
    hub: '허브',
    org: '조직',
  },

  // Curated project copy (2026-09-07 walkthrough fix A, Owner-provided
  // translations verbatim); repos absent here fall back to the English
  // description.
  projectDescriptions: {
    unipty:
      'Node·Bun·Deno를 위한 런타임 중립 PTY — 하나의 공개 계약, 개발자가 선택하는 백엔드, 증거로 뒷받침되는 지원 선언.',
    openspecui:
      'OpenSpec 기반 개발을 위한 웹 컴패니언 — 명령 하나로 spec 기반 프로젝트를 서빙·미리보기·내보내기.',
    ui:
      'shadcn registry 형태의 jixoai 디자인 언어 — 터미널 미학, OKLCH 단일 색조 법칙, 복사하면 당신 소유가 되는 mono-first 컴포넌트.',
    opentray:
      'CLI·AI 스킬 생태계를 위한 데스크톱 상태 런타임 — Node·Bun·Deno 위에서 동작하는 tray-first 앱.',
    opendweb:
      '애플리케이션 수준의 네트워킹 — 멀티 디바이스 앱이 논리 네트워크를 형성합니다(시스템 VPN이 아니라 게임 룸처럼). QUIC 직접 연결 우선, 셀프 호스팅 relay 폴백.',
    openiweb:
      '일반인을 위한 오픈소스 개인 앱 노드 — 운영을 배우지 않고 셀프 호스팅: MCP 엔드포인트와 키 하나를 AI 코딩 에이전트에게 맡기면 됩니다.',
  },

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
      'jixoai 오픈소스 랩 — AI 시대를 위한 플래그십 인프라 프로젝트. 공식 사이트, 최신 버전, README, 랩 블로그.',
    eyebrow: 'jixoai · 오픈소스 랩',
    titleLead: 'AI 시대를 위한 ',
    titleEm: '믿을 수 있는 인프라.',
    titleTail: '',
    badges: ['오픈소스', 'MIT 라이선스'],
    summary:
      'jixoai는 AI 시대가 기대는 기반 계층을 만듭니다: 터미널 런타임, 디자인 언어, 개발자 도구 — 매번 하나의 정직한 계약을 전달합니다. 오픈소스, 증거 기반, MIT.',
    projectsButton: '프로젝트 ↓',
    barTitle: 'jixoai — zsh',
    command: 'cat ~/jixoai/MISSION.txt',
    missionLine: 'jixoai — AI 시대를 위한 믿을 수 있는 인프라',
    flagships: '플래그십:',
    projectsHeading: '프로젝트',
    projectsSummary:
      '조직의 플래그십 저장소 — 각각 공식 사이트, GitHub 저장소, 상세 페이지로 렌더링되는 README를 갖춥니다. 버전 배지는 최신 GitHub Release를 반영해 자동 갱신됩니다: 이 사이트는 매 푸시마다, 그리고 매일 재빌드됩니다.',
    allProjects: '모든 프로젝트 →',
    allRepositories: '모든 저장소 ↗',
    versionData: (date) => `버전 데이터는 ${date}에 GitHub Releases에서 수집.`,
    latestPosts: '최신 글',
    allPosts: '모든 글 →',
    noPosts: '아직 게시물이 없습니다.',
  },

  projectsIndex: {
    title: '프로젝트 — jixoai',
    metaDescription:
      'jixoai 플래그십 라인업 — 공식 사이트, GitHub 저장소, 최신 버전, 렌더링된 README.',
    heading: '프로젝트',
    summary: (date) =>
      `jixoai의 플래그십 프로젝트를 한눈에 — 각 프로젝트의 공식 사이트, GitHub 저장소, 최신 버전(${date} 캡처), 렌더링된 README.`,
  },

  projectDetail: {
    titleSuffix: 'jixoai',
    officialSite: '공식 사이트 ↗',
    readmeOnGitHub: 'GitHub의 README ↗',
    latestRelease: (tag) => `최신 릴리스(${tag})`,
    noRelease: '아직 게시된 릴리스 없음',
    readmeUnavailableLead: '빌드 시점에 README를 가져올 수 없습니다 —',
    readmeUnavailableLink: 'GitHub ↗에서 읽기.',
    originalLanguage: '원문 (English)',
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

  blogTags: {
    title: '태그 — jixoai 블로그',
    metaDescription:
      'jixoai 랩 블로그의 모든 태그 — 태그마다 하나의 정적 목록 페이지, 프로젝트와 글 종류별로 묶음.',
    heading: '태그',
    summary:
      '같은 글을 묶어 본 것입니다. 태그를 고르면 한 흐름을 한 번에 읽을 수 있습니다 — 모든 그룹은 인덱스와 같은 빌드에서 만들어지는 평범한 정적 페이지입니다.',
    titleForTag: (tag) => `${tag} — jixoai 블로그`,
    metaForTag: (tag, count) =>
      `jixoai 랩 블로그에서 ${tag} 태그가 붙은 글 — 총 ${count}개, 최신순.`,
    postCount: (count) => `${count}개`,
    allTags: '모든 태그',
  },

  blogPost: {
    titleSuffix: 'jixoai 블로그',
    writtenIn: (language) => `이 글은 ${language}로 작성되었습니다.`,
    readIn: (language) => `${language} 버전 읽기 →`,
  },
};
