<!--
  Locale home route (src/routes/[lang=lang]/+page.svelte) — the eight
  non-English mirrors at /zh/ /es/ /fr/ /de/ /ru/ /ja/ /ko/ /ar/;
  markup shared with the root via src/lib/pages/home-page.svelte.
-->
<script lang="ts">
  import HomePage from '$lib/pages/home-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<HomePage locale={data.locale} />
