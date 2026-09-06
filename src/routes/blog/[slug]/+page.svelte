<!--
  Blog post route (src/routes/blog/[slug]/+page.svelte) — the canonical
  English surface; the markup lives in src/lib/pages/post-page.svelte
  (nine-locale change, 2026-09-06). Data (post + rendered markdown)
  comes from ./+page.ts.
-->
<script lang="ts">
  import PostPage from '$lib/pages/post-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<PostPage post={data.post} html={data.html} locale="en" />
