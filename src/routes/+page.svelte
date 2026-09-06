<!--
  Home route (src/routes/+page.svelte) — the canonical English surface
  at `/`. The markup lives in src/lib/pages/home-page.svelte and renders
  once per locale; since 2026-09-06 every /[lang]/ mirror renders the
  same component (nine-locale change — en stays the stable root).
-->
<script lang="ts">
  import HomePage from '$lib/pages/home-page.svelte';
</script>

<HomePage locale="en" />
