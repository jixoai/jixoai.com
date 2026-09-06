<!--
  Project detail surface (src/lib/pages/project-page.svelte) — rendered
  by the root route (en) and every /[lang]/ mirror.

  Orthogonal intents (maintained 2026-09-06): the project's README
  surface — build-time fetched markdown rendered into the page (marked,
  first-party content); the identity header — logo/wordmark, live
  version pill, and the outbound link trio (site / GitHub / release).
  The slug is the repo path with `/` → `--`. 2026-09-06 nine-locales:
  chrome copy from the locale dictionary; the curated description is
  locale-aware (zh → descriptionZh). 2026-09-06 readme-i18n: the README
  body prefers the locale's fetched translation and the container lang
  tag follows the content language (CJK typography); an untranslated
  locale under L≠en gets the "original (English)" pill above the body.
  2026-09-07 walkthrough fixes: E — the README body column widens and
  centers on desktop (mx-auto — no dead right half), the version pill
  gains a visible "latest release (tag)" link beside it, and the
  README's leading h1 no longer duplicates the identity header's name
  (src/lib/readme.ts stripDuplicateTitle); A — the description tier
  rides the dictionary's projectDescriptions via localizedDescription.
-->
<script lang="ts">
  import PressButton from '$lib/ui/press-button/press-button.svelte';
  import { localizedDescription, type GeneratedProject } from '$lib/projects';
  import { dict, localeHref, type Locale } from '$lib/i18n';

  let {
    project,
    readmeHtml,
    readmeLang,
    readmeTranslated,
    locale,
  }: {
    project: GeneratedProject;
    readmeHtml: string | null;
    readmeLang: string;
    readmeTranslated: boolean;
    locale: Locale;
  } = $props();

  const t = $derived(dict[locale]);
  import ProjectLogo from '$lib/components/project-logo.svelte';

  const wordmark = $derived(
    project.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'JX',
  );
</script>

<svelte:head>
  <title>{project.name} — {t.projectDetail.titleSuffix}</title>
  <meta name="description" content={localizedDescription(project, locale)} />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label="{project.name}">
  <!-- breadcrumb back to the roster -->
  <nav class="font-nav text-muted-foreground mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em]" aria-label={t.chrome.breadcrumbLabel}>
    <a href={localeHref(locale, '/projects/')} class="hover:text-foreground transition-colors">{t.chrome.navProjects}</a>
    <span aria-hidden="true">/</span>
    <span class="text-foreground">{project.name}</span>
  </nav>

  <!-- identity header: logo/wordmark, name, description, version, links -->
  <header class="border-border flex flex-wrap items-start gap-5 border-b pb-8" data-reveal="">
    {#if project.logo}
      <!-- responsive logo (webp srcset + png fallback); key → asset map -->
      <ProjectLogo logo={project.logo} class="h-16 w-16 flex-none rounded-[6px] object-contain" />
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
            title={t.projectDetail.latestRelease(project.tag ?? '')}
          >
            {project.version}
          </a>
        {:else}
          <span class="version-pill font-nav" title={t.projectDetail.noRelease}>{project.version}</span>
        {/if}
        <!-- visible latest-release link (fix E): the pill alone reads as
             a bare version number — this anchor states what it opens -->
        {#if project.releaseUrl}
          <a
            href={project.releaseUrl}
            target="_blank"
            rel="noreferrer"
            class="text-muted-foreground hover:text-primary text-xs underline-offset-4 transition-colors hover:underline"
          >
            {t.projectDetail.latestRelease(project.tag ?? '')}
          </a>
        {/if}
      </div>
      <p class="text-muted-foreground mt-2 max-w-[62ch] text-pretty text-[13px] leading-6">{localizedDescription(project, locale)}</p>
      <div class="mt-4 flex flex-wrap items-center gap-2">
        {#if project.site}
          <PressButton variant="fill" href={project.site} external>{t.projectDetail.officialSite}</PressButton>
        {/if}
        <PressButton variant="outline" href={project.repoUrl} external>GitHub ↗</PressButton>
        <a
          href="{project.repoUrl}#readme"
          target="_blank"
          rel="noreferrer"
          class="text-muted-foreground hover:text-primary ms-1 text-xs underline-offset-4 transition-colors hover:underline"
        >
          {t.projectDetail.readmeOnGitHub}
        </a>
      </div>
    </div>
  </header>

  <!-- README body: rendered from the repository head at build time; the
       lang tag follows the CONTENT language, and an untranslated locale
       (L≠en on the English fallback) gets the one-time original pill.
       The column widens to 88ch and centers (fix E) — the identity
       header stays full-measure, the reading column breathes alone -->
  {#if readmeHtml}
    <article class="markdown-body mx-auto mt-8 w-full max-w-[88ch]" lang={readmeLang} data-reveal="">
      {#if !readmeTranslated && locale !== 'en'}
        <p class="mb-6">
          <span class="version-pill font-nav">{t.projectDetail.originalLanguage}</span>
        </p>
      {/if}
      {@html readmeHtml}
    </article>
  {:else}
    <p class="text-muted-foreground mt-8 text-[13px]">
      {t.projectDetail.readmeUnavailableLead}
      <a href="{project.repoUrl}#readme" target="_blank" rel="noreferrer" class="underline underline-offset-4">{t.projectDetail.readmeUnavailableLink}</a>
    </p>
  {/if}
</section>
