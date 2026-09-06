<!--
  Locale project detail (src/routes/[lang=lang]/projects/[repo]/+page.svelte)
  — mirror of /projects/<repo>/; markup shared via
  src/lib/pages/project-page.svelte (README body renders as-authored).
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
  locale={data.locale}
/>
