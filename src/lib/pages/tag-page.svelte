<!--
  Tag group surface (src/lib/pages/tag-page.svelte) — one prerendered
  page per tag: /blog/tags/<tag>/ plus every /[lang]/ mirror.

  Orthogonal intents (2026-09-08): the same cards as the flat index,
  narrowed to one tag — the grouping axis the blog was missing. The
  listing rides src/lib/pages/post-list.svelte, so a tag page cannot
  drift from the index; membership comes from tagsForLocale, which
  derives from postsForLocale (mirror-deduped, locale-preferred). Tag
  names are frontmatter data (repo names) and stay untranslated — only
  the chrome localizes.
-->
<script lang="ts">
  import type { TagGroup } from '$lib/blog';
  import { dict, localeHref, type Locale } from '$lib/i18n';
  import PostList from './post-list.svelte';

  let { group, locale }: { group: TagGroup; locale: Locale } = $props();

  const t = $derived(dict[locale]);
</script>

<svelte:head>
  <title>{t.blogTags.titleForTag(group.tag)}</title>
  <meta name="description" content={t.blogTags.metaForTag(group.tag, group.posts.length)} />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label={group.tag}>
  <nav class="font-nav text-muted-foreground mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em]" aria-label={t.chrome.breadcrumbLabel}>
    <a href={localeHref(locale, '/blog/')} class="hover:text-foreground transition-colors">{t.chrome.navBlog}</a>
    <span aria-hidden="true">/</span>
    <a href={localeHref(locale, '/blog/tags/')} class="hover:text-foreground transition-colors">{t.blogTags.allTags}</a>
    <span aria-hidden="true">/</span>
    <span class="text-foreground"><bdi>{group.tag}</bdi></span>
  </nav>

  <!-- min-w-0 + flex-wrap: tracked uppercase headings wrap instead of
       overflowing on narrow locales (fix D.3) -->
  <h1 class="font-nav flex min-w-0 flex-wrap items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    <bdi>{group.tag}</bdi>
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
    <span class="text-muted-foreground text-xs tracking-[0.14em]">{t.blogTags.postCount(group.posts.length)}</span>
  </h1>

  <div class="mt-6">
    <PostList posts={group.posts} {locale} />
  </div>
</section>
