<!--
  Locale tag index (src/routes/[lang=lang]/blog/tags/+page.svelte) —
  mirror of /blog/tags/; markup shared via
  src/lib/pages/tags-page.svelte. Added 2026-09-08.
-->
<script lang="ts">
  import TagsPage from '$lib/pages/tags-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<TagsPage locale={data.locale} />
