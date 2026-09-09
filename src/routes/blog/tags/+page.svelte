<!--
  Tag index route (src/routes/blog/tags/+page.svelte) — the canonical
  English surface at `/blog/tags/`; the markup lives in
  src/lib/pages/tags-page.svelte (shared with the eight /[lang]/blog/
  mirrors). Static route: it wins over /blog/[slug]/ because a static
  segment outranks a dynamic one (no post is named `tags`).

  Added 2026-09-08 — the blog's tag-grouping axis.
-->
<script lang="ts">
  import TagsPage from '$lib/pages/tags-page.svelte';
</script>

<TagsPage locale="en" />
