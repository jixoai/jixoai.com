<!--
  Home (src/routes/+page.svelte).

  Orthogonal intents (maintained 2026-09-06): hero — the mission story +
  live fleet terminal (release versions captured at build time); projects
  — the config-driven roster grid (manifest → generated data); latest
  posts — the blog strip. Copy + fleet terminal carried over from the
  pre-2026-09-06 single-page site.

  Original request (2026-09-06): hub relaunch — configurable project
  surface (sites/logos/READMEs) + a blog; roster swaps proxy and
  skill-creator for dweb and iweb.
-->
<script lang="ts">
  import CardGrid from '$lib/ui/card-grid/card-grid.svelte';
  import HeroSection from '$lib/ui/hero-section/hero-section.svelte';
  import PressButton from '$lib/ui/press-button/press-button.svelte';
  import ProjectCard from '$lib/components/project-card.svelte';
  import TerminalCard from '$lib/ui/terminal-card/terminal-card.svelte';
  import { projectsData, projects } from '$lib/projects';
  import { blogPosts, displayDate } from '$lib/blog';
  import { GITHUB_ORG_URL, HOME_POSTS_COUNT, MISSION } from '$lib/site';

  // The hero terminal narrates the mission, then lists the fleet with the
  // live release versions captured at build time.
  const terminalOutputs: readonly string[] = [
    `jixoai — ${MISSION.charAt(0).toLowerCase()}${MISSION.slice(1)}`,
    '',
    'flagships:',
    ...projects.map((p) => `  ${p.name.toLowerCase().padEnd(15)}${p.version}`),
  ];

  const latestPosts = blogPosts.slice(0, HOME_POSTS_COUNT);

  // NOT named `badges` — that name belongs to the hero-section snippet
  // slot; a collision silently suppresses the row.
  const badgeLabels = ['open source', 'MIT licensed', 'evidence-gated', 'github.com/jixoai'];
</script>

<svelte:head>
  <title>jixoai — reliable infrastructure for the AI era</title>
  <meta
    name="description"
    content="jixoai builds the load-bearing layer the AI era stands on — UniPty, OpenSpecUI, the jixoai design language, OpenDWeb, OpenIWeb and more. Official sites, live release versions, and the lab blog."
  />
</svelte:head>

<!-- Hero: mission headline, clone CTA, live fleet terminal. -->
<HeroSection
  eyebrow="jixoai · open-source lab"
  summary="jixoai builds the boring, load-bearing layer the AI era stands on: terminal runtimes, design languages, and developer tools that ship one honest contract at a time. Open source, evidence-gated, MIT."
  copyCommand="gh repo clone jixoai/unipty"
>
  {#snippet title()}Reliable infrastructure <em>for the AI era.</em>{/snippet}
  {#snippet badges()}
    {#each badgeLabels as badge (badge)}
      <span class="border-border text-muted-foreground border px-2 py-0.5 text-[10.5px] tracking-[0.12em]">{badge}</span>
    {/each}
  {/snippet}
  {#snippet secondary()}
    <PressButton variant="outline" href="/projects/">Projects ↓</PressButton>
    <PressButton variant="outline" href={GITHUB_ORG_URL} external>GitHub ↗</PressButton>
  {/snippet}
  {#snippet terminal()}
    <TerminalCard barTitle="jixoai — zsh" command="cat ~/jixoai/MISSION.txt" outputs={terminalOutputs} />
  {/snippet}
</HeroSection>

<!-- Projects: card-grid + section-card, subgrid-equalized, live versions. -->
<section id="projects" class="mx-auto w-full max-w-[90rem] px-4 pb-12 sm:px-6 lg:px-8" aria-label="Projects">
  <h2 class="font-nav flex items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    Projects
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h2>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    The flagship repositories of the organization — each with its official site, its GitHub
    repo, and its README rendered as a detail page. Version pills mirror the latest GitHub
    Release and refresh automatically: this site rebuilds on every push and on a daily
    schedule.
  </p>

  <CardGrid min="300px" class="mt-6" foot>
    {#each projects as project, index (project.slug)}
      <div data-reveal="">
        <ProjectCard {project} />
      </div>
    {/each}
  </CardGrid>

  <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal="">
    <PressButton variant="outline" href="/projects/">All projects →</PressButton>
    <PressButton variant="outline" href={GITHUB_ORG_URL} external>All repositories ↗</PressButton>
    <p class="text-muted-foreground text-[12.5px]">
      Version data captured {new Date(projectsData.fetchedAt).toISOString().slice(0, 10)} from GitHub Releases.
    </p>
  </div>
</section>

<!-- Latest posts: the blog strip (pure static, newest first). -->
<section id="blog" class="mx-auto w-full max-w-[90rem] px-4 pb-16 sm:px-6 lg:px-8" aria-label="Latest posts">
  <h2 class="font-nav flex items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    Latest posts
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h2>
  {#if latestPosts.length > 0}
    <ul class="mt-4 divide-y divide-border/60" data-reveal="">
      {#each latestPosts as post (post.slug)}
        <li>
          <a href="/blog/{post.slug}/" class="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
            <time datetime={post.date} class="font-nav text-primary text-xs tracking-[0.14em]">{displayDate(post.date)}</time>
            <span class="group-hover:text-primary transition-colors">{post.title}</span>
            <span class="text-muted-foreground ml-auto hidden max-w-[46ch] truncate text-xs sm:block">{post.description}</span>
          </a>
        </li>
      {/each}
    </ul>
    <div class="mt-4" data-reveal="">
      <PressButton variant="outline" href="/blog/">All posts →</PressButton>
    </div>
  {:else}
    <p class="text-muted-foreground mt-3 text-[13px]" data-reveal="">No posts yet — the blog ships with the relaunch.</p>
  {/if}
</section>
