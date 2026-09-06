<!--
  Project card (src/lib/components/project-card.svelte).

  Orthogonal intents (maintained 2026-09-06): the single card surface for
  the project hub — logo (typographic wordmark fallback when the manifest
  entry carries none), description, live version pill, and the three-link
  contract (official site / GitHub / README detail page). Config-driven:
  all data arrives as props from the generated project record.
  2026-09-06 nine-locales: labels + description render in the page
  locale (zh shows the manifest's curated descriptionZh); the README
  link stays on the locale mirror.
-->
<script lang="ts">
  import PressButton from '$lib/ui/press-button/press-button.svelte';
  import SectionCard from '$lib/ui/section-card/section-card.svelte';
  import { projectsUrl, localizedDescription, type GeneratedProject } from '$lib/projects';
  import { dict, type Locale } from '$lib/i18n';

  let { project, locale }: { project: GeneratedProject; locale: Locale } = $props();

  const t = $derived(dict[locale]);

  // Typographic mark: the first two alphanumerics of the display name,
  // uppercase — the no-logo fallback the project-hub spec demands.
  const wordmark = $derived(project.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'JX');
</script>

<SectionCard class="proj-card" eyebrow={project.repo} title={project.name} summary={localizedDescription(project, locale)}>
  <div class="flex items-center gap-3">
    {#if project.logo}
      <img
        src={project.logo}
        alt="{project.name} logo"
        class="h-10 w-10 flex-none rounded-[4px] object-contain"
        loading="lazy"
        draggable="false"
      />
    {:else}
      <span
        class="font-nav bg-primary/10 text-primary flex h-10 w-10 flex-none items-center justify-center rounded-[4px] border text-sm"
        aria-hidden="true"
      >
        {wordmark}
      </span>
    {/if}
    {#if project.releaseUrl}
      <a
        class="version-pill font-nav"
        href={project.releaseUrl}
        target="_blank"
        rel="noreferrer"
        title={t.projectDetail.latestRelease(project.tag ?? '')}
      >
        {project.version}
      </a>
    {:else}
      <span class="version-pill font-nav" title={t.projectDetail.noRelease}>{project.version}</span>
    {/if}
  </div>
  <div class="mt-auto flex flex-wrap items-center gap-2 pt-4">
    {#if project.site}
      <PressButton variant="outline" href={project.site} external>{t.card.site}</PressButton>
    {/if}
    <PressButton variant="outline" href={project.repoUrl} external>GitHub ↗</PressButton>
    <PressButton variant="ghost" href={projectsUrl(project.slug, locale)}>{t.card.readme}</PressButton>
  </div>
</SectionCard>

<style>
  /* Equal-height cards with true header/body alignment (subgrid law):
   * the section inside re-grids its header/body blocks into the card
   * grid's shared rows; the foot block fills to the tallest sibling. */
  :global(.proj-card) {
    display: grid;
    grid-row: 1 / -1;
    grid-template-rows: subgrid;
  }
  :global(.proj-card > div:last-child) {
    display: flex;
    flex-direction: column;
  }
</style>
