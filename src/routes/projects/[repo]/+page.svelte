<!--
  Project detail route (src/routes/projects/[repo]/+page.svelte) — the
  canonical English surface; the markup lives in
  src/lib/pages/project-page.svelte (nine-locale change, 2026-09-06).
  Data (project + rendered README) comes from ./+page.ts.
-->
<script lang="ts">
  import ProjectPage from '$lib/pages/project-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<ProjectPage
  project={data.project}
  readmeHtml={data.readmeHtml}
  readmeLang={data.readmeLang}
  readmeTranslated={data.readmeTranslated}
  locale="en"
/>
