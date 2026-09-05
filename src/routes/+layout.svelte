<!--
  Orthogonal intents (maintained 2026-09-06): site shell — the registry
  website-scaffold wraps every page (immersive TerminalHeader + ghost
  TerminalFooter); scrollbar law — the measure probe is imported ONCE
  here; navigation — the header composes the navigation-menu family
  (composition-first APIs, jixoai-ui 0.3.0).

  Original request (2026-09-06): the hub grows /projects/ and /blog/
  surfaces; the chrome ships as registry items under jixoai-ui.lock
  (hue 0 — the organization red).
-->
<script lang="ts">
  import '../app.css';
  import '$lib/scrollbar-measure';
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import WebsiteScaffold from '$lib/ui/website-scaffold/website-scaffold.svelte';
  import TerminalFooter from '$lib/ui/terminal-footer/terminal-footer.svelte';
  import TerminalFooterColumn from '$lib/ui/terminal-footer/terminal-footer-column.svelte';
  import TerminalHeader from '$lib/ui/terminal-header/terminal-header.svelte';
  import NavigationMenu from '$lib/ui/navigation-menu/navigation-menu.svelte';
  import NavigationMenuLink from '$lib/ui/navigation-menu/navigation-menu-link.svelte';
  import ThemeToggle from '$lib/ui/theme-toggle/theme-toggle.svelte';
  import { cn } from '$lib/utils';
  import { projects } from '$lib/projects';
  import { GITHUB_ORG_URL } from '$lib/site';

  let { children }: { children: Snippet } = $props();

  // Directory pages (trailingSlash 'always'): current detection matches
  // the section root, not each leaf.
  const nav = [
    { href: '/', label: 'Home', match: (p: string) => p === '/' },
    { href: '/projects/', label: 'Projects', match: (p: string) => p.startsWith('/projects') },
    { href: '/blog/', label: 'Blog', match: (p: string) => p.startsWith('/blog') },
  ];

  // Pill paint: the bezel language layered on the navigation-menu family
  // (same composition law as the registry www reference).
  const pill = (current: boolean): string =>
    cn('px-2.5 py-1 lg:px-3', current ? 'text-terminal-foreground' : 'text-terminal-foreground/70 hover:text-terminal-foreground');

  let drawerOpen = $state(false);
</script>

<WebsiteScaffold>
  {#snippet header()}
    <TerminalHeader brand="jixoai" domain="jixoai.com" subtitle="the jixoai open-source lab" bind:open={drawerOpen}>
      <NavigationMenu label="Primary" class="flex-nowrap items-center gap-0">
        {#each nav as item (item.href)}
          <NavigationMenuLink href={item.href} current={item.match(page.url.pathname)} class={pill(item.match(page.url.pathname))}>
            {item.label}
          </NavigationMenuLink>
        {/each}
        <NavigationMenuLink href={GITHUB_ORG_URL} class={pill(false)} target="_blank" rel="noreferrer">
          GitHub&nbsp;↗
        </NavigationMenuLink>
      </NavigationMenu>
      {#snippet logo()}
        <img src="/logo.webp" alt="jixoai logo" class="h-8 w-8 object-contain" draggable="false" />
      {/snippet}
      {#snippet switcher()}
        <!-- compact control carries its own frame padding — the header's
             switcher frame law turns OFF to avoid a double border -->
        <ThemeToggle variant="compact" />
      {/snippet}
      {#snippet drawer()}
        <nav class="flex flex-col border-t border-terminal-foreground/10 py-2 text-xs" aria-label="Primary">
          {#each nav as item (item.href)}
            <a
              href={item.href}
              onclick={() => (drawerOpen = false)}
              aria-current={item.match(page.url.pathname) ? 'page' : undefined}
              class={cn(
                'px-1 py-2 transition-colors',
                item.match(page.url.pathname)
                  ? 'bg-terminal-hover text-terminal-foreground'
                  : 'text-terminal-foreground/70 hover:text-terminal-foreground',
              )}
            >
              {item.label}
            </a>
          {/each}
          <a
            href={GITHUB_ORG_URL}
            onclick={() => (drawerOpen = false)}
            target="_blank"
            rel="noreferrer"
            class="px-1 py-2 text-terminal-foreground/70 transition-colors hover:text-terminal-foreground"
          >
            GitHub&nbsp;↗
          </a>
        </nav>
      {/snippet}
    </TerminalHeader>
  {/snippet}

  {@render children()}

  {#snippet footer()}
    <TerminalFooter ghost="JIXOAI" copyright="© {new Date().getFullYear()} jixoai">
      <TerminalFooterColumn title="fleet">
        {#each projects as project (project.slug)}
          <a href={project.site ?? project.repoUrl} target="_blank" rel="noreferrer">{project.name}</a>
        {/each}
      </TerminalFooterColumn>
      <TerminalFooterColumn title="hub">
        <a href="/projects/">Projects</a>
        <a href="/blog/">Blog</a>
      </TerminalFooterColumn>
      <TerminalFooterColumn title="org">
        <a href={GITHUB_ORG_URL} target="_blank" rel="noreferrer">GitHub</a>
      </TerminalFooterColumn>
    </TerminalFooter>
  {/snippet}
</WebsiteScaffold>
