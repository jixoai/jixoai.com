<script lang="ts">
  import generated from '$lib/projects.generated.json';
  import CardGrid from '$lib/ui/card-grid.svelte';
  import HeroSection from '$lib/ui/hero-section.svelte';
  import PressButton from '$lib/ui/press-button.svelte';
  import SectionCard from '$lib/ui/section-card.svelte';
  import TerminalCard from '$lib/ui/terminal-card.svelte';
  import { reveal } from '$lib/reveal';
  import { GITHUB_ORG_URL, MISSION } from '$lib/site';

  interface GeneratedProject {
    repo: string;
    name: string;
    description: string;
    /** raw latest-release tag, null when the repo has no release */
    tag: string | null;
    /** display version: v-prefixed semver, "v—" when no release */
    version: string;
    repoUrl: string;
    releaseUrl: string | null;
  }

  const { projects } = generated as { fetchedAt: string; projects: GeneratedProject[] };

  // The hero terminal narrates the mission, then lists the fleet with the
  // live release versions captured at build time.
  const terminalOutputs: readonly string[] = [
    `jixoai — ${MISSION.charAt(0).toLowerCase()}${MISSION.slice(1)}`,
    '',
    'flagships:',
    ...projects.map((p) => `  ${p.name.toLowerCase().padEnd(15)}${p.version}`),
  ];
</script>

<svelte:head>
  <title>jixoai — reliable infrastructure for the AI era</title>
  <meta
    name="description"
    content="jixoai builds the load-bearing layer the AI era stands on — UniPty, OpenSpecUI, the jixoai design language, and more. Release versions update automatically from GitHub."
  />
</svelte:head>

<!-- Hero: mission headline, clone CTA, live fleet terminal. -->
<HeroSection
  eyebrow="jixoai · open-source lab"
  titleLead="Reliable infrastructure "
  titleAccent="for the AI era."
  summary="jixoai builds the boring, load-bearing layer the AI era stands on: terminal runtimes, design languages, and developer tools that ship one honest contract at a time. Open source, evidence-gated, MIT."
  badges={['open source', 'MIT licensed', 'evidence-gated', 'github.com/jixoai']}
  copyCommand="gh repo clone jixoai/unipty"
>
  {#snippet secondary()}
    <PressButton variant="outline" href="#projects">Projects ↓</PressButton>
    <PressButton variant="outline" href={GITHUB_ORG_URL} external>GitHub ↗</PressButton>
  {/snippet}
  {#snippet terminal()}
    <TerminalCard
      barTitle="jixoai — zsh"
      command="cat ~/jixoai/MISSION.txt"
      outputs={terminalOutputs}
    />
  {/snippet}
</HeroSection>

<!-- Projects: card-grid + section-card, subgrid-equalized, live versions. -->
<section
  id="projects"
  class="mx-auto w-full max-w-[90rem] px-4 pb-12 sm:px-6 lg:px-8"
  aria-label="Projects"
>
  <h2
    class="font-nav flex items-baseline gap-4 text-lg uppercase tracking-[0.3em]"
    data-reveal=""
    use:reveal
  >
    Projects
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h2>
  <p
    class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6"
    data-reveal=""
    use:reveal={{ delay: 80 }}
  >
    The flagship repositories of the organization. Version pills mirror each
    project's latest GitHub Release and refresh automatically — this site rebuilds
    on every push and on a daily schedule.
  </p>

  <CardGrid min="300px" class="mt-6">
    {#each projects as project, index (project.repo)}
      <div data-reveal="" use:reveal={{ delay: index * 70, rise: 12 }}>
        <SectionCard
          class="proj-card"
          eyebrow={project.repo}
          title={project.name}
          summary={project.description}
        >
          <div class="mt-auto flex flex-wrap items-center gap-3 pt-1">
            {#if project.releaseUrl}
              <a
                class="version-pill font-nav"
                href={project.releaseUrl}
                target="_blank"
                rel="noreferrer"
                title={`latest release (${project.tag})`}
              >
                {project.version}
              </a>
            {:else}
              <span class="version-pill font-nav" title="no release published yet">
                {project.version}
              </span>
            {/if}
            <PressButton variant="outline" href={project.repoUrl} external>GitHub ↗</PressButton>
          </div>
        </SectionCard>
      </div>
    {/each}
  </CardGrid>

  <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal="" use:reveal>
    <PressButton variant="outline" href={GITHUB_ORG_URL} external>All repositories ↗</PressButton>
    <p class="text-muted-foreground text-[12.5px]">
      Version data captured {new Date(generated.fetchedAt).toISOString().slice(0, 10)} from GitHub Releases.
    </p>
  </div>
</section>

<style>
  /* Equal-height project cards with true header/body alignment: the reveal
   * wrapper is the card-grid subgrid item; the section inside re-subgrids
   * its header/body blocks into the shared rows, so every header aligns to
   * the tallest header and every body fills to the tallest body. */
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
