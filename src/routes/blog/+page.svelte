<!--
  Blog index route (src/routes/blog/+page.svelte) — the canonical
  English surface at `/blog/`; the markup lives in
  src/lib/pages/blog-page.svelte (nine-locale change, 2026-09-06).
-->
<script lang="ts">
  import BlogPage from '$lib/pages/blog-page.svelte';
</script>

<BlogPage locale="en" />
