/**
 * i18n dictionary type contract (src/lib/i18n/schema.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): the shape every locale
 * dictionary must satisfy — all nine dictionaries are structurally
 * identical, so pages render purely from the contract and structure
 * drift is a type error. Verbatim fields (tagline title pieces, hero
 * summary) come from the Owner translation table in the
 * 2026-09-06-site-i18n-nine-locales proposal — do not reword them.
 * (maintained 2026-09-07 walkthrough fixes): projectDescriptions —
 * per-locale project card copy keyed by manifest repo (en omits the
 * map and falls back to the manifest English description); langNames +
 * blogPost.readIn — the writtenIn notice speaks the UI locale's name
 * for the authored language and links the mirrored post; footer — the
 * footer column heads localize. (maintained 2026-09-08): blogTags —
 * the tag-grouping surfaces (the /blog/tags/ index and one
 * /blog/tags/<tag>/ page per tag).
 */

export interface Dictionary {
  /** <html lang> value (identity of the dictionary itself). */
  htmlLang: string;
  /** text direction of the locale. */
  dir: 'ltr' | 'rtl';
  /** switcher trigger label (native endonym, e.g. "中文" / "Español"). */
  label: string;

  /** language names in THIS locale's voice, keyed by locale code —
   *  every dictionary must carry at least zh/en (the post authoring
   *  languages); drives the writtenIn notice so an English reader sees
   *  "Chinese", not the autonym 中文 (2026-09-07 walkthrough fix). */
  langNames: Record<string, string>;

  /** footer column heads (2026-09-07 walkthrough fix G1). */
  footer: {
    /** the fleet column — every flagship project. */
    fleet: string;
    /** the hub column — in-site surfaces. */
    hub: string;
    /** the org column — outbound organization links. */
    org: string;
  };

  /** locale-translated project descriptions, keyed by the manifest
   *  repo name (2026-09-07 walkthrough fix A). Optional by design: en
   *  omits the map entirely and every locale falls back to the
   *  manifest's English `description` for repos it does not cover. */
  projectDescriptions?: Partial<Record<string, string>>;

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
    /** fallback pill shown when the locale has no README translation
     *  and the English original renders instead (readme-i18n). The
     *  source is always English, so every locale names it verbatim. */
    originalLanguage: string;
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
    /** version-pill title for posts carrying repo+version frontmatter;
     *  shared with the post header pill (same interaction contract as
     *  the projects grid pill — release-blog spec). */
    releasePill: (version: string) => string;
  };

  /** Tag-grouping surfaces (2026-09-08): the /blog/tags/ index and one
   *  /blog/tags/<tag>/ page per tag. Tag names themselves are
   *  frontmatter data (repo names like `unipty`) and stay untranslated
   *  in every locale — only the chrome around them localizes. */
  blogTags: {
    /** tag index <title>. */
    title: string;
    /** tag index meta description. */
    metaDescription: string;
    /** index H1 + the eyebrow above the chip row on the blog index. */
    heading: string;
    /** index lead paragraph. */
    summary: string;
    /** tag detail <title>, fed the tag name. */
    titleForTag: (tag: string) => string;
    /** tag detail meta description, fed the tag name and post count. */
    metaForTag: (tag: string, count: number) => string;
    /** post-count chip on both surfaces; must pluralize. */
    postCount: (count: number) => string;
    /** breadcrumb back-link label (tag page → tag index). */
    allTags: string;
  };

  blogPost: {
    /** <title> suffix pattern after the post title. */
    titleSuffix: string;
    /** one-time notice when the UI locale ≠ the post's authored
     *  language; fed the language's name in the UI locale
     *  (langNames), e.g. en UI over a zh post: "This post is written
     *  in Chinese." The body still renders as-authored (tier law
     *  unchanged; 2026-09-07 the autonym feed became langNames). */
    writtenIn: (language: string) => string;
    /** mirror-crossing link appended to the notice when the post's
     *  sibling variant (slug ± "-en") exists; fed the mirror's
     *  language name in the UI locale (2026-09-07 walkthrough fix F). */
    readIn: (language: string) => string;
  };
}
