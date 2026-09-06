<!--
  Locale projects index (src/routes/[lang=lang]/projects/+page.svelte) —
  mirror of /projects/; markup shared via src/lib/pages/projects-page.svelte.
-->
<script lang="ts">
  import ProjectsPage from '$lib/pages/projects-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<ProjectsPage locale={data.locale} />
