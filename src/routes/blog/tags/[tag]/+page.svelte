<!--
  Tag-group route (src/routes/blog/tags/[tag]/+page.svelte) — the
  canonical English surface at `/blog/tags/<tag>/`; the markup lives in
  src/lib/pages/tag-page.svelte (shared with the eight /[lang]/
  mirrors). Data (the resolved tag group) comes from ./+page.ts.

  Added 2026-09-08 — the blog's tag-grouping axis.
-->
<script lang="ts">
  import TagPage from '$lib/pages/tag-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<TagPage group={data.group} locale="en" />
