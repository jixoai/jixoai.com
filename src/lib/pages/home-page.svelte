<!--
  Home surface (src/lib/pages/home-page.svelte) — rendered by the root
  route (en) and every /[lang]/ mirror.

  Orthogonal intents (maintained 2026-09-07): hero — the mission story +
  live fleet terminal (release versions captured at build time); latest
  posts LEAD the page (Owner 2026-09-07); projects — the config-driven
  roster as a LIST in the same grammar (Owner 2026-09-07; was a card
  grid — the cards live on at /projects/).

  2026-09-06 nine-locales: every string renders from the locale
  dictionary (Owner translations verbatim; en byte-equal to the
  pre-i18n copy); internal links stay on the locale mirror.
  2026-09-06 mobile audit: the hero terminal is a hard LTR island
  (dir="ltr" — commands, prompts and version columns never reorder
  under the Arabic mirror), and the latest-posts strip lists the UI
  locale's posts first (postsForLocale).
  2026-09-07 walkthrough fixes: C — the hero's PRIMARY CTA is the real
  Projects action (copy snippet replaces the empty clipboard ghost,
  secondary keeps GitHub only); B — the strip rides the deduped
  postsForLocale; D.3/D.4 — section heads wrap instead of overflowing
  and every ISO date renders as an LTR island / bdi under RTL.
-->
<script lang="ts">
  import HeroSection from '$lib/ui/hero-section/hero-section.svelte';
  import PressButton from '$lib/ui/press-button/press-button.svelte';
  import TerminalCard from '$lib/ui/terminal-card/terminal-card.svelte';
  import { projectsData, projects, projectsUrl, localizedDescription } from '$lib/projects';
  import { postsForLocale, postDir, displayDate } from '$lib/blog';
  import { GITHUB_ORG_URL, HOME_POSTS_COUNT } from '$lib/site';
  import { dict, localeHref, type Locale } from '$lib/i18n';

  let { locale }: { locale: Locale } = $props();

  const t = $derived(dict[locale]);
  const homeHref = $derived((route: string) => localeHref(locale, route));

  // The hero terminal narrates the mission, then lists the fleet with the
  // live release versions captured at build time.
  const terminalOutputs: readonly string[] = [
    t.home.missionLine,
    '',
    t.home.flagships,
    // lowercase + hyphenate: fleet rows use each name's package form
    // ("jixoai-ui", never "jixoai ui" — Owner naming law 2026-09-07)
    ...projects.map((p) => `  ${p.name.toLowerCase().replaceAll(' ', '-').padEnd(15)}${p.version}`),
  ];

  const latestPosts = $derived(postsForLocale(locale).slice(0, HOME_POSTS_COUNT));

  // The captured-at date crosses into localized sentences at a
  // locale-specific position, so the LTR isolation rides the injected
  // value itself (fix D.4): the dictionary interpolates this bdi island.
  const capturedDate = `<bdi>${new Date(projectsData.fetchedAt).toISOString().slice(0, 10)}</bdi>`;
</script>

<svelte:head>
  <title>{t.home.title}</title>
  <meta name="description" content={t.home.metaDescription} />
</svelte:head>

<!-- Hero: mission headline, live fleet terminal. -->
<HeroSection eyebrow={t.home.eyebrow} summary={t.home.summary}>
  {#snippet title()}{t.home.titleLead}<em>{t.home.titleEm}</em>{t.home.titleTail}{/snippet}
  {#snippet badges()}
    {#each t.home.badges as badge (badge)}
      <span class="border-border text-muted-foreground border px-2 py-0.5 text-[10.5px] tracking-[0.12em]">{badge}</span>
    {/each}
  {/snippet}
  <!-- the PRIMARY CTA is the Projects action (2026-09-07 fix C): the
       copy snippet replaces the default clipboard button — an empty
       copyCommand rendered a ghost fill button with no label -->
  {#snippet copy()}
    <PressButton variant="fill" href={homeHref('/projects/')}>{t.home.projectsButton}</PressButton>
  {/snippet}
  {#snippet secondary()}
    <PressButton variant="outline" href={GITHUB_ORG_URL} external>GitHub ↗</PressButton>
  {/snippet}
  {#snippet terminal()}
    <!-- dir="ltr": the terminal is a hard LTR island — the $ prompt, the
         typed command, the cursor and the version columns keep their
         order under dir="rtl" (registry component stays untouched) -->
    <div dir="ltr">
      <TerminalCard barTitle={t.home.barTitle} command={t.home.command} outputs={terminalOutputs} />
    </div>
  {/snippet}
</HeroSection>

<!-- Latest posts first (Owner 2026-09-07): the blog strip (pure static,
     newest first) leads the page; the projects roster follows in the same
     list grammar. -->
<section id="blog" class="mx-auto w-full max-w-[90rem] px-4 pb-12 sm:px-6 lg:px-8" aria-label={t.home.latestPosts}>
  <h2 class="font-nav flex min-w-0 flex-wrap items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    {t.home.latestPosts}
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h2>
  {#if latestPosts.length > 0}
    <ul class="mt-4 divide-y divide-border/60" data-reveal="">
      {#each latestPosts as post (post.slug)}
        <li>
          <a href={homeHref(`/blog/${post.slug}/`)} class="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
            <!-- dir="ltr": the ISO date is a hard-LTR island (fix D.4 —
                 digit-hyphen runs reorder under dir="rtl") -->
            <time datetime={post.date} dir="ltr" class="font-nav text-primary text-xs tracking-[0.14em]">{displayDate(post.date)}</time>
            <span class="group-hover:text-primary transition-colors">{post.title}</span>
            <span class="text-muted-foreground ms-auto hidden max-w-[46ch] truncate text-xs sm:block" dir={postDir(post)}>{post.description}</span>
          </a>
        </li>
      {/each}
    </ul>
    <div class="mt-4" data-reveal="">
      <PressButton variant="outline" href={homeHref('/blog/')}>{t.home.allPosts}</PressButton>
    </div>
  {:else}
    <p class="text-muted-foreground mt-3 text-[13px]" data-reveal="">{t.home.noPosts}</p>
  {/if}
</section>

<!-- Projects: the roster as a list (Owner 2026-09-07) — same grammar as
     the blog strip: mono version accent, name (+logo), localized
     description; each row links the project detail page. -->
<section id="projects" class="mx-auto w-full max-w-[90rem] px-4 pb-16 sm:px-6 lg:px-8" aria-label={t.home.projectsHeading}>
  <!-- min-w-0 + flex-wrap (2026-09-07 fix D.3): the tracked uppercase
       heading wraps to its own lines on narrow locales (es "ÚLTIMAS
       PUBLICACIONES") instead of overflowing the measure; the trailing
       rule spans the wrapped last row -->
  <h2 class="font-nav flex min-w-0 flex-wrap items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    {t.home.projectsHeading}
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h2>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    {t.home.projectsSummary}
  </p>

  <ul class="mt-4 divide-y divide-border/60" data-reveal="">
    {#each projects as project (project.slug)}
      <li>
        <a href={projectsUrl(project.slug, locale)} class="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
          <!-- dir="ltr": version tags (opentray@0.21.1) are a hard-LTR island -->
          <span dir="ltr" class="font-nav text-primary text-xs tracking-[0.14em]">{project.version}</span>
          <span class="group-hover:text-primary transition-colors inline-flex items-center gap-2">
            {#if project.logo}
              <img src={project.logo} alt="" class="h-4 w-4 self-center" loading="lazy" decoding="async" />
            {/if}
            {project.name}
          </span>
          <span class="text-muted-foreground ms-auto hidden max-w-[46ch] truncate text-xs sm:block">{localizedDescription(project, locale)}</span>
        </a>
      </li>
    {/each}
  </ul>

  <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal="">
    <PressButton variant="outline" href={homeHref('/projects/')}>{t.home.allProjects}</PressButton>
    <PressButton variant="outline" href={GITHUB_ORG_URL} external>{t.home.allRepositories}</PressButton>
    <p class="text-muted-foreground text-[12.5px]">
      <!-- {@html}: carries only the bdi-wrapped ISO date (fix D.4) -->
      {@html t.home.versionData(capturedDate)}
    </p>
  </div>
</section>
