<!--
  Project detail (src/routes/projects/[repo]/+page.svelte).

  Orthogonal intents (maintained 2026-09-06): the project's README
  surface — build-time fetched markdown rendered into the page (marked,
  first-party content); the identity header — logo/wordmark, live
  version pill, and the outbound link trio (site / GitHub / release).
  The slug is the repo path with `/` → `--`.
-->
<script lang="ts">
  import PressButton from '$lib/ui/press-button/press-button.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const { project, readmeHtml } = $derived(data);

  const wordmark = $derived(
    project.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'JX',
  );
</script>

<svelte:head>
  <title>{project.name} — jixoai</title>
  <meta name="description" content={project.description} />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label="{project.name}">
  <!-- breadcrumb back to the roster -->
  <nav class="font-nav text-muted-foreground mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em]" aria-label="Breadcrumb">
    <a href="/projects/" class="hover:text-foreground transition-colors">Projects</a>
    <span aria-hidden="true">/</span>
    <span class="text-foreground">{project.name}</span>
  </nav>

  <!-- identity header: logo/wordmark, name, description, version, links -->
  <header class="border-border flex flex-wrap items-start gap-5 border-b pb-8" data-reveal="">
    {#if project.logo}
      <img
        src={project.logo}
        alt="{project.name} logo"
        class="h-16 w-16 flex-none rounded-[6px] object-contain"
        draggable="false"
      />
    {:else}
      <span
        class="font-nav bg-primary/10 text-primary flex h-16 w-16 flex-none items-center justify-center rounded-[6px] border text-xl"
        aria-hidden="true"
      >
        {wordmark}
      </span>
    {/if}
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-center gap-3">
        <h1 class="text-2xl font-bold tracking-tight">{project.name}</h1>
        {#if project.releaseUrl}
          <a
            class="version-pill font-nav"
            href={project.releaseUrl}
            target="_blank"
            rel="noreferrer"
            title="latest release ({project.tag})"
          >
            {project.version}
          </a>
        {:else}
          <span class="version-pill font-nav" title="no release published yet">{project.version}</span>
        {/if}
      </div>
      <p class="text-muted-foreground mt-2 max-w-[62ch] text-pretty text-[13px] leading-6">{project.description}</p>
      <div class="mt-4 flex flex-wrap items-center gap-2">
        {#if project.site}
          <PressButton variant="fill" href={project.site} external>Official site ↗</PressButton>
        {/if}
        <PressButton variant="outline" href={project.repoUrl} external>GitHub ↗</PressButton>
        <a
          href="{project.repoUrl}#readme"
          target="_blank"
          rel="noreferrer"
          class="text-muted-foreground hover:text-primary ml-1 text-xs underline-offset-4 transition-colors hover:underline"
        >
          README on GitHub ↗
        </a>
      </div>
    </div>
  </header>

  <!-- README body: rendered from the repository head at build time -->
  {#if readmeHtml}
    <article class="markdown-body mt-8 max-w-[76ch]" data-reveal="">
      {@html readmeHtml}
    </article>
  {:else}
    <p class="text-muted-foreground mt-8 text-[13px]">
      README unavailable at build time — read it on
      <a href="{project.repoUrl}#readme" target="_blank" rel="noreferrer" class="underline underline-offset-4">GitHub ↗</a>.
    </p>
  {/if}
</section>
