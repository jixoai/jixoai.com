<!--
  ProjectLogo (src/lib/components/project-logo.svelte)

  Orthogonal intents (created 2026-09-07, Owner image-optimization law):
  1. ONE renderer for every project logo surface (home list, projects
     cards, detail header) — raster logos ride the vite-imagetools
     responsive pipeline (webp sources + png fallback at 48/96/192px,
     see responsive-picture.svelte), vector logos render as-is, unknown
     keys degrade to the manifest static path or the typographic mark
     (callers decide the fallback).
  2. The logo key comes from projects.manifest.json (`logo`), keeping the
     roster config-driven; the key→asset map below is the single place a
     new logo lands.
-->
<script lang="ts">
  import ResponsivePicture, { type PictureSet } from './responsive-picture.svelte';
  import opentrayLogo from '$lib/assets/logos/opentray.png?w=48;96;192&format=webp;png&as=picture';
  import uiLogo from '$lib/assets/logos/ui.webp?w=48;96;192&format=webp;png&as=picture';
  import opendwebLogo from '$lib/assets/logos/opendweb.svg';
  import openiwebLogo from '$lib/assets/logos/openiweb.svg';
  import uniptyLogo from '$lib/assets/logos/unipty.svg';
  import openspecuiLogo from '$lib/assets/logos/openspecui.svg';

  /** raster logos → responsive picture sets; vector logos → plain urls */
  const pictures: Record<string, PictureSet> = {
    opentray: opentrayLogo as PictureSet,
    ui: uiLogo as PictureSet,
  };
  const vectors: Record<string, string> = {
    opendweb: opendwebLogo,
    openiweb: openiwebLogo,
    unipty: uniptyLogo,
    openspecui: openspecuiLogo,
  };

  let {
    logo,
    class: klass = '',
    /** static fallback path when the key has no optimized asset */
    fallback = '',
  }: { logo?: string; class?: string; fallback?: string } = $props();

  const picture = $derived(logo ? pictures[logo] : undefined);
  const vector = $derived(logo ? vectors[logo] : undefined);
</script>

{#if picture}
  <ResponsivePicture set={picture} class={klass} />
{:else if vector}
  <img src={vector} alt="" class={klass} loading="lazy" decoding="async" />
{:else if fallback}
  <img src={fallback} alt="" class={klass} loading="lazy" decoding="async" />
{/if}
