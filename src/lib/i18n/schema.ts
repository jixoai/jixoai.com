/**
 * i18n dictionary type contract (src/lib/i18n/schema.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): the shape every locale
 * dictionary must satisfy — all nine dictionaries are structurally
 * identical, so pages render purely from the contract and structure
 * drift is a type error. Verbatim fields (tagline title pieces, hero
 * summary) come from the Owner translation table in the
 * 2026-09-06-site-i18n-nine-locales proposal — do not reword them.
 */

export interface Dictionary {
  /** <html lang> value (identity of the dictionary itself). */
  htmlLang: string;
  /** text direction of the locale. */
  dir: 'ltr' | 'rtl';
  /** switcher trigger label (native endonym, e.g. "中文" / "Español"). */
  label: string;

  chrome: {
    /** header brand block third line. */
    subtitle: string;
    navHome: string;
    navProjects: string;
    navBlog: string;
    /** drawer <nav> aria-label. */
    drawerLabel: string;
    /** breadcrumb <nav> aria-label. */
    breadcrumbLabel: string;
    /** language switcher aria-label. */
    languageLabel: string;
  };

  home: {
    /** <title> — en must stay byte-equal to the pre-i18n copy. */
    title: string;
    metaDescription: string;
    eyebrow: string;
    /** hero title = lead + <em>em</em> + tail; concatenation must equal
     *  the Owner-provided tagline VERBATIM. */
    titleLead: string;
    titleEm: string;
    titleTail: string;
    /** hero chips — technical tokens (github.com/jixoai) stay verbatim. */
    badges: readonly string[];
    /** Owner-provided canonical summary — verbatim. */
    summary: string;
    projectsButton: string;
    barTitle: string;
    command: string;
    /** first terminal output line (brand + mission). */
    missionLine: string;
    /** fleet-listing label inside the terminal output. */
    flagships: string;
    projectsHeading: string;
    projectsSummary: string;
    allProjects: string;
    allRepositories: string;
    /** version strip, fed the captured-at ISO date. */
    versionData: (date: string) => string;
    latestPosts: string;
    allPosts: string;
    noPosts: string;
  };

  projectsIndex: {
    title: string;
    metaDescription: string;
    heading: string;
    /** fed the captured-at ISO date. */
    summary: (date: string) => string;
  };

  projectDetail: {
    /** <title> suffix pattern — "{name} — jixoai" stays name-first. */
    titleSuffix: string;
    officialSite: string;
    readmeOnGitHub: string;
    latestRelease: (tag: string) => string;
    noRelease: string;
    readmeUnavailableLead: string;
    readmeUnavailableLink: string;
  };

  card: {
    site: string;
    readme: string;
  };

  blogIndex: {
    title: string;
    metaDescription: string;
    heading: string;
    summary: string;
  };

  blogPost: {
    /** <title> suffix pattern after the post title. */
    titleSuffix: string;
  };
}
