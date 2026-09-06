<!--
  BrandLogo (src/lib/components/brand-logo.svelte) — the org mark through
  the same responsive pipeline as project logos (Owner image-optimization
  law, 2026-09-07): webp srcset + png fallback at 64/128px for a 32px
  header slot, rendered eager (above the fold, every page).
-->
<script lang="ts">
  import ResponsivePicture, { type PictureSet } from './responsive-picture.svelte';
  import logo from '$lib/assets/jixoai-logo.webp?w=64;128&format=webp;png&as=picture';
  let { class: klass = '' }: { class?: string } = $props();
</script>

<ResponsivePicture set={logo as PictureSet} alt="jixoai logo" class={klass} eager />
