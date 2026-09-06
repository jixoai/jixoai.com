<!--
  Blog post surface (src/lib/pages/post-page.svelte) — rendered by the
  root route (en) and every /[lang]/ mirror.

  Orthogonal intents (maintained 2026-09-06): the article surface —
  frontmatter header (date/author/tags) + the markdown body rendered at
  build time; mono-styled code blocks via the .markdown-body surface.
  2026-09-06 nine-locales: chrome copy from the locale dictionary; the
  body renders as-authored under every locale (localization tier 3 —
  linked, not translated). 2026-09-06 release-blog: posts with
  repo+version frontmatter carry the version pill in the header (same
  grammar as the projects grid / blog index card).
-->
<script lang="ts">
  import { displayDate, postRelease, type BlogPost } from '$lib/blog';
  import { dict, localeHref, type Locale } from '$lib/i18n';

  let { post, html, locale }: { post: BlogPost; html: string; locale: Locale } = $props();

  const t = $derived(dict[locale]);
  const release = $derived(postRelease(post));
</script>

<svelte:head>
  <title>{post.title} — {t.blogPost.titleSuffix}</title>
  <meta name="description" content={post.description} />
</svelte:head>

<article class="mx-auto w-full max-w-[76ch] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
  <nav class="font-nav text-muted-foreground mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em]" aria-label={t.chrome.breadcrumbLabel}>
    <a href={localeHref(locale, '/blog/')} class="hover:text-foreground transition-colors">{t.chrome.navBlog}</a>
    <span aria-hidden="true">/</span>
    <span class="text-foreground truncate">{post.title}</span>
  </nav>

  <header class="border-border border-b pb-6" data-reveal="">
    <h1 class="text-[clamp(1.8rem,4.5cqi,2.6rem)] font-bold leading-tight tracking-tight text-balance">{post.title}</h1>
    <div class="font-nav text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-[0.14em]">
      <time datetime={post.date}>{displayDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.author}</span>
      {#if release}
        <a
          class="version-pill font-nav"
          href={release.url}
          target="_blank"
          rel="noreferrer"
          title={t.blogIndex.releasePill(release.version)}
        >
          {release.version}
        </a>
      {/if}
      {#if post.tags.length > 0}
        <span class="ms-auto flex flex-wrap gap-2">
          {#each post.tags as tag (tag)}
            <span class="border-border border px-1.5 py-0.5 text-[10.5px]">{tag}</span>
          {/each}
        </span>
      {/if}
    </div>
    {#if post.description}
      <p class="text-muted-foreground mt-3 text-pretty text-[13px] leading-6">{post.description}</p>
    {/if}
  </header>

  <div class="markdown-body mt-8">
    {@html html}
  </div>
</article>
