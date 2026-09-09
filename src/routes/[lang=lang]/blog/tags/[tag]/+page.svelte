<!--
  Locale tag group (src/routes/[lang=lang]/blog/tags/[tag]/+page.svelte)
  — mirror of /blog/tags/<tag>/; markup shared via
  src/lib/pages/tag-page.svelte. Added 2026-09-08.
-->
<script lang="ts">
  import TagPage from '$lib/pages/tag-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<TagPage group={data.group} locale={data.locale} />
