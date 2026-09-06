<!--
  Projects index surface (src/lib/pages/projects-page.svelte) — rendered
  by the root route (en) and every /[lang]/ mirror.

  Orthogonal intents (maintained 2026-09-06): the manifest-driven roster
  surface — one card per generated project, linking each official site,
  GitHub repo, and README detail page. The roster changes only through
  projects.manifest.json (project-hub spec). 2026-09-06 nine-locales:
  copy renders from the locale dictionary. 2026-09-07 walkthrough
  fixes: D.3 — the heading wraps on narrow locales; D.4 — the
  captured-at date crosses into the localized summary as a bdi island.
-->
<script lang="ts">
  import CardGrid from '$lib/ui/card-grid/card-grid.svelte';
  import ProjectCard from '$lib/components/project-card.svelte';
  import { projects, projectsData } from '$lib/projects';
  import { dict, type Locale } from '$lib/i18n';

  let { locale }: { locale: Locale } = $props();

  const t = $derived(dict[locale]);
  // LTR isolation rides the injected date value (fix D.4 — the bdi
  // survives whatever position the locale's summary gives it).
  const capturedDate = `<bdi>${new Date(projectsData.fetchedAt).toISOString().slice(0, 10)}</bdi>`;
</script>

<svelte:head>
  <title>{t.projectsIndex.title}</title>
  <meta name="description" content={t.projectsIndex.metaDescription} />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label={t.projectsIndex.heading}>
  <h1 class="font-nav flex min-w-0 flex-wrap items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    {t.projectsIndex.heading}
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h1>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    <!-- {@html}: carries only the bdi-wrapped ISO date (fix D.4) -->
    {@html t.projectsIndex.summary(capturedDate)}
  </p>

  <CardGrid min="300px" class="mt-6" foot>
    {#each projects as project (project.slug)}
      <div data-reveal="">
        <ProjectCard {project} {locale} />
      </div>
    {/each}
  </CardGrid>
</section>
