<!--
  Home surface (src/lib/pages/home-page.svelte) — rendered by the root
  route (en) and every /[lang]/ mirror.

  Orthogonal intents (maintained 2026-09-06): hero — the mission story +
  live fleet terminal (release versions captured at build time); projects
  — the config-driven roster grid (manifest → generated data); latest
  posts — the blog strip. Copy + fleet terminal carried over from the
  pre-2026-09-06 single-page site.

  2026-09-06 nine-locales: every string renders from the locale
  dictionary (Owner translations verbatim; en byte-equal to the
  pre-i18n copy); internal links stay on the locale mirror.
  2026-09-06 mobile audit: the hero terminal is a hard LTR island
  (dir="ltr" — commands, prompts and version columns never reorder
  under the Arabic mirror), and the latest-posts strip lists the UI
  locale's posts first (postsForLocale).
-->
<script lang="ts">
  import CardGrid from '$lib/ui/card-grid/card-grid.svelte';
  import HeroSection from '$lib/ui/hero-section/hero-section.svelte';
  import PressButton from '$lib/ui/press-button/press-button.svelte';
  import ProjectCard from '$lib/components/project-card.svelte';
  import TerminalCard from '$lib/ui/terminal-card/terminal-card.svelte';
  import { projectsData, projects } from '$lib/projects';
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
    ...projects.map((p) => `  ${p.name.toLowerCase().padEnd(15)}${p.version}`),
  ];

  const latestPosts = $derived(postsForLocale(locale).slice(0, HOME_POSTS_COUNT));
</script>

<svelte:head>
  <title>{t.home.title}</title>
  <meta name="description" content={t.home.metaDescription} />
</svelte:head>

<!-- Hero: mission headline, clone CTA, live fleet terminal. -->
<HeroSection
  eyebrow={t.home.eyebrow}
  summary={t.home.summary}
  copyCommand="gh repo clone jixoai/unipty"
>
  {#snippet title()}{t.home.titleLead}<em>{t.home.titleEm}</em>{t.home.titleTail}{/snippet}
  {#snippet badges()}
    {#each t.home.badges as badge (badge)}
      <span class="border-border text-muted-foreground border px-2 py-0.5 text-[10.5px] tracking-[0.12em]">{badge}</span>
    {/each}
  {/snippet}
  {#snippet secondary()}
    <PressButton variant="outline" href={homeHref('/projects/')}>{t.home.projectsButton}</PressButton>
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

<!-- Projects: card-grid + section-card, subgrid-equalized, live versions. -->
<section id="projects" class="mx-auto w-full max-w-[90rem] px-4 pb-12 sm:px-6 lg:px-8" aria-label={t.home.projectsHeading}>
  <h2 class="font-nav flex items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    {t.home.projectsHeading}
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h2>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    {t.home.projectsSummary}
  </p>

  <CardGrid min="300px" class="mt-6" foot>
    {#each projects as project, index (project.slug)}
      <div data-reveal="">
        <ProjectCard {project} {locale} />
      </div>
    {/each}
  </CardGrid>

  <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal="">
    <PressButton variant="outline" href={homeHref('/projects/')}>{t.home.allProjects}</PressButton>
    <PressButton variant="outline" href={GITHUB_ORG_URL} external>{t.home.allRepositories}</PressButton>
    <p class="text-muted-foreground text-[12.5px]">
      {t.home.versionData(new Date(projectsData.fetchedAt).toISOString().slice(0, 10))}
    </p>
  </div>
</section>

<!-- Latest posts: the blog strip (pure static, newest first). -->
<section id="blog" class="mx-auto w-full max-w-[90rem] px-4 pb-16 sm:px-6 lg:px-8" aria-label={t.home.latestPosts}>
  <h2 class="font-nav flex items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    {t.home.latestPosts}
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h2>
  {#if latestPosts.length > 0}
    <ul class="mt-4 divide-y divide-border/60" data-reveal="">
      {#each latestPosts as post (post.slug)}
        <li>
          <a href={homeHref(`/blog/${post.slug}/`)} class="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
            <time datetime={post.date} class="font-nav text-primary text-xs tracking-[0.14em]">{displayDate(post.date)}</time>
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
