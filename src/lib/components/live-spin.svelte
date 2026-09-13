<script lang="ts">
  /**
   * live-spin.svelte — a LIVE component demo block for blog posts (the
   * ```spin fence, blog.ts splitLiveDemos): the real registry <Spin>
   * mounted in the page instead of a screenshot — the text lane is pure
   * CSS animation and the svg lane raw SMIL, so the effect is alive in
   * the static prerender itself. The block is deliberately restrained
   * (the screenshot-restraint law): effect + name label, nothing else;
   * a demo that needs prose around it belongs to the article body.
   */
  import Spin from '$lib/ui/spin/spin.svelte';
  import type { SpinDemo } from '$lib/blog';

  let { demos, caption }: { demos: SpinDemo[]; caption?: string } = $props();
</script>

{#if demos.length > 0}
  <figure class="not-prose my-8 border border-border bg-muted/30 py-6">
    <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-7 px-6">
      {#each demos as demo, i (i)}
        <div class="flex flex-col items-center gap-2.5">
          <Spin
            spinner={demo.spinner}
            label={demo.label ?? demo.spinner}
            interval={demo.interval}
            linger={demo.linger}
            lingerType={demo.lingerType}
            size={demo.size}
          />
          <span class="font-mono text-xs text-muted-foreground">{demo.label ?? demo.spinner}</span>
        </div>
      {/each}
    </div>
    {#if caption}
      <figcaption class="mt-5 border-t border-border/60 px-6 pt-3 text-center font-mono text-xs text-muted-foreground">
        {caption}
      </figcaption>
    {/if}
  </figure>
{/if}
