<!--
  Blog index surface (src/lib/pages/blog-page.svelte) — rendered by the
  root route (en) and every /[lang]/ mirror.

  Orthogonal intents (maintained 2026-09-06): the pure-static blog
  surface — build-time discovered markdown under content/blog/, every
  post prerendered (blog spec). Zero server runtime, zero client
  fetches. 2026-09-06 nine-locales: chrome copy from the locale
  dictionary; posts render as-authored under every locale (tier 3).
  2026-09-06 release-blog: version pill linked to the GitHub Release
  (same pill grammar as the projects grid). 2026-09-06 mobile audit:
  locale-first listing — the UI locale's posts lead, the rest follow by
  date with a language badge, and each summary carries its authored
  language's bidi direction (no punctuation drift on RTL surfaces).
  2026-09-07 walkthrough fixes: B — the listing rides the deduped
  postsForLocale (one variant per base slug); D.3 — the heading wraps
  on narrow locales; D.4 — ISO dates are LTR islands; F — the badge
  tooltip names the language in the UI locale (the badge itself keeps
  the autonym, the marker convention).
  2026-09-08 tag grouping: the card list moved to
  src/lib/pages/post-list.svelte (shared with the tag pages) and a tag
  chip row now sits between the summary and the listing — the entry
  point to /blog/tags/<tag>/.
-->
<script lang="ts">
  import { postsForLocale, tagsForLocale } from '$lib/blog';
  import { dict, localeHref, type Locale } from '$lib/i18n';
  import PostList from './post-list.svelte';

  let { locale }: { locale: Locale } = $props();

  const t = $derived(dict[locale]);
  const listing = $derived(postsForLocale(locale));
  const groups = $derived(tagsForLocale(locale));
</script>

<svelte:head>
  <title>{t.blogIndex.title}</title>
  <meta name="description" content={t.blogIndex.metaDescription} />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label={t.blogIndex.heading}>
  <!-- min-w-0 + flex-wrap (2026-09-07 fix D.3): tracked uppercase
       headings wrap instead of overflowing on narrow locales -->
  <h1 class="font-nav flex min-w-0 flex-wrap items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    {t.blogIndex.heading}
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h1>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    {t.blogIndex.summary}
  </p>

  {#if groups.length > 0}
    <!-- Tag row (2026-09-08): the entry point to the grouping axis.
         The eyebrow links the tag index; each chip links one group. -->
    <div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2" data-reveal="">
      <a
        href={localeHref(locale, '/blog/tags/')}
        class="font-nav text-muted-foreground hover:text-primary text-[10.5px] uppercase tracking-[0.12em] transition-colors"
      >
        {t.blogTags.heading}
      </a>
      <nav class="flex flex-wrap gap-2" aria-label={t.blogTags.heading}>
        {#each groups as group (group.tag)}
          <a
            href={localeHref(locale, `/blog/tags/${group.tag}/`)}
            class="font-nav border-border text-muted-foreground/80 hover:border-primary hover:text-primary border px-1.5 py-0.5 text-[10.5px] uppercase tracking-[0.12em] transition-colors"
          >
            <bdi>{group.tag}</bdi>
          </a>
        {/each}
      </nav>
    </div>
  {/if}

  <div class="mt-6">
    <PostList posts={listing} {locale} />
  </div>
</section>
