<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import WebsiteScaffold from '$lib/ui/website-scaffold.svelte';
  import '$lib/website-scaffold.css';
  import TerminalFooter from '$lib/ui/terminal-footer.svelte';
  import TerminalHeader from '$lib/ui/terminal-header.svelte';
  import ThemeToggle from '$lib/ui/theme-toggle.svelte';
  import { GITHUB_ORG_URL } from '$lib/site';

  let { children }: { children: Snippet } = $props();

  // Single-page site: the nav carries one in-page anchor and the org link.
  const items = $derived([
    { href: '#projects', label: 'Projects' },
    { href: GITHUB_ORG_URL, label: 'GitHub', external: true },
  ]);
</script>

<WebsiteScaffold>
  {#snippet header()}
    <TerminalHeader
      brand="jixoai"
      domain="jixoai.com"
      subtitle="the jixoai open-source lab"
      {items}
    >
      {#snippet switcher()}
        <ThemeToggle variant="compact" />
      {/snippet}
    </TerminalHeader>
  {/snippet}

  {@render children()}

  {#snippet footer()}
    <TerminalFooter
      ghost="JIXOAI"
      links={[{ label: 'GitHub', href: GITHUB_ORG_URL }]}
      copyright="© {new Date().getFullYear()} jixoai"
    />
  {/snippet}
</WebsiteScaffold>
