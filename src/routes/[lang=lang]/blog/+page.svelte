<!--
  Locale blog index (src/routes/[lang=lang]/blog/+page.svelte) — mirror
  of /blog/; markup shared via src/lib/pages/blog-page.svelte.
-->
<script lang="ts">
  import BlogPage from '$lib/pages/blog-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<BlogPage locale={data.locale} />
