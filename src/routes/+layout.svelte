<!--
  Site shell (src/routes/+layout.svelte).

  Orthogonal intents (maintained 2026-09-06): site shell — the registry
  website-scaffold wraps every page (immersive TerminalHeader + ghost
  TerminalFooter); scrollbar law — the measure probe is imported ONCE
  here; navigation — the header composes the navigation-menu family
  (composition-first APIs, jixoai-ui 0.3.0); locale-aware chrome +
  hreflang (2026-09-06 nine-locales) — nav/footer copy, switcher, and
  the 9 + x-default alternates all derive from the current route.

  Original request (2026-09-06): the hub grows /projects/ and /blog/
  surfaces; the chrome ships as registry items under jixoai-ui.lock
  (hue 0 — the organization red). Same day, nine locales: en at the
  root (stable URLs), eight /[lang]/ mirrors, ar RTL.
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
  import LanguageSwitcher from '$lib/ui/language-switcher/language-switcher.svelte';
  import { cn } from '$lib/utils';
  import { projects } from '$lib/projects';
  import { GITHUB_ORG_URL, SITE_URL } from '$lib/site';
  import {
    dict,
    hreflangFor,
    localeHref,
    localeOfPath,
    routeOfPath,
    switcherLocalesFor,
  } from '$lib/i18n';

  let { children }: { children: Snippet } = $props();

  // Locale from the current pathname (`/zh/projects/` → zh, `/` → en);
  // route is the locale-stripped remainder every localized href derives
  // from. Static at prerender time, reactive after client navigation.
  // (paths.base stays '' on the CNAME root deployment — never join the
  // $app/paths `base` into absolute URLs: it is RELATIVE under
  // paths.relative, which corrupts the hreflang/canonical absolutes.)
  const locale = $derived(localeOfPath(page.url.pathname));
  const route = $derived(routeOfPath(page.url.pathname));
  const t = $derived(dict[locale]);
  const href = $derived((target: string) => localeHref(locale, target));
  const home = $derived(localeHref(locale, '/'));

  // hreflang: 9 locales + x-default → the en (root) URL, absolute.
  const alternates = $derived(hreflangFor(SITE_URL, route));
  const canonical = $derived(`${SITE_URL}${localeHref(locale, route)}`);

  // Directory pages (trailingSlash 'always'): current detection matches
  // the section root, not each leaf — tested in route space so every
  // locale mirror marks the same section current.
  const sections = [
    { route: '/', label: t.chrome.navHome, match: (r: string) => r === '/' },
    { route: '/projects/', label: t.chrome.navProjects, match: (r: string) => r.startsWith('/projects') },
    { route: '/blog/', label: t.chrome.navBlog, match: (r: string) => r.startsWith('/blog') },
  ] as const;

  // Pill paint: the bezel language layered on the navigation-menu family
  // (same composition law as the registry www reference).
  const pill = (current: boolean): string =>
    cn('px-2.5 py-1 lg:px-3', current ? 'text-terminal-foreground' : 'text-terminal-foreground/70 hover:text-terminal-foreground');

  let drawerOpen = $state(false);

  // Language switcher: nine entries, each linking the SAME page in the
  // target locale (current-page preserving; menu variant — the pair
  // variant only fits two locales).
  const switcherLocales = $derived(switcherLocalesFor(route));

  // Client-side mirror of the hooks %lang%/%dir% substitution: the
  // prerendered artifact ships correct attrs, but SvelteKit's client
  // router swaps only body+head on internal navigation — without this
  // effect a locale switch would keep the previous document lang/dir
  // (a stuck dir="rtl" visibly breaks the zh layout after switching
  // from Arabic). No-op when the attrs already match.
  $effect(() => {
    document.documentElement.setAttribute('lang', t.htmlLang);
    document.documentElement.setAttribute('dir', t.dir);
  });
</script>

<svelte:head>
  <link rel="canonical" href={canonical} />
  {#each alternates as alternate (alternate.code)}
    <link rel="alternate" hreflang={alternate.code} href={alternate.href} />
  {/each}
</svelte:head>

<WebsiteScaffold>
  {#snippet header()}
    <TerminalHeader brand="jixoai" domain="jixoai.com" subtitle={t.chrome.subtitle} homeHref={home} bind:open={drawerOpen}>
      <NavigationMenu label={t.chrome.drawerLabel} class="flex-nowrap items-center gap-0">
        {#each sections as item (item.route)}
          <NavigationMenuLink href={href(item.route)} current={item.match(route)} class={pill(item.match(route))}>
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
        <!-- compact controls carry their own frame padding — the header's
             switcher frame law turns OFF to avoid a double border -->
        <div class="flex flex-wrap items-center gap-2">
          <ThemeToggle variant="compact" />
          <LanguageSwitcher
            variant="menu"
            locales={switcherLocales}
            current={locale}
            ariaLabel={t.chrome.languageLabel}
          />
        </div>
      {/snippet}
      {#snippet drawer()}
        <nav class="flex flex-col border-t border-terminal-foreground/10 py-2 text-xs" aria-label={t.chrome.drawerLabel}>
          {#each sections as item (item.route)}
            <a
              href={href(item.route)}
              onclick={() => (drawerOpen = false)}
              aria-current={item.match(route) ? 'page' : undefined}
              class={cn(
                'px-1 py-2 transition-colors',
                item.match(route)
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
        <a href={href('/projects/')}>{t.chrome.navProjects}</a>
        <a href={href('/blog/')}>{t.chrome.navBlog}</a>
      </TerminalFooterColumn>
      <TerminalFooterColumn title="org">
        <a href={GITHUB_ORG_URL} target="_blank" rel="noreferrer">GitHub</a>
      </TerminalFooterColumn>
    </TerminalFooter>
  {/snippet}
</WebsiteScaffold>
