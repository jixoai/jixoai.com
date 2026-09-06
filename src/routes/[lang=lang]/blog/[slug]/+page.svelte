<!--
  Locale blog post (src/routes/[lang=lang]/blog/[slug]/+page.svelte) —
  mirror of /blog/<slug>/; markup shared via src/lib/pages/post-page.svelte
  (post body renders as-authored under every locale).
-->
<script lang="ts">
  import PostPage from '$lib/pages/post-page.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<PostPage post={data.post} html={data.html} locale={data.locale} />
