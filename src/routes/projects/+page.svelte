<!--
  Projects index (src/routes/projects/+page.svelte).

  Orthogonal intents (maintained 2026-09-06): the manifest-driven roster
  surface — one card per generated project, linking each official site,
  GitHub repo, and README detail page. The roster changes only through
  projects.manifest.json (project-hub spec).
-->
<script lang="ts">
  import CardGrid from '$lib/ui/card-grid/card-grid.svelte';
  import ProjectCard from '$lib/components/project-card.svelte';
  import { projects, projectsData } from '$lib/projects';
</script>

<svelte:head>
  <title>Projects — jixoai</title>
  <meta
    name="description"
    content="The jixoai flagship roster: UniPty, OpenSpecUI, jixoai/ui, OpenTray, OpenDWeb and OpenIWeb — official sites, GitHub repositories, live release versions, and rendered READMEs."
  />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label="Projects">
  <h1 class="font-nav flex items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    Projects
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h1>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    Every jixoai flagship in one grid — the hub itself is configuration: adding, removing or
    relinking a project is a projects.manifest.json edit plus a logo asset. Version pills
    mirror the latest GitHub Release (captured {new Date(projectsData.fetchedAt).toISOString().slice(0, 10)});
    READMEs render from the repository head at build time.
  </p>

  <CardGrid min="300px" class="mt-6" foot>
    {#each projects as project (project.slug)}
      <div data-reveal="">
        <ProjectCard {project} />
      </div>
    {/each}
  </CardGrid>
</section>
