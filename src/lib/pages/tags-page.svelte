<!--
  Tag index surface (src/lib/pages/tags-page.svelte) — rendered by the
  root /blog/tags/ route and every /[lang]/blog/tags/ mirror.

  Orthogonal intents (2026-09-08): the blog's second axis — one
  prerendered list page per tag, so a reader can follow a single
  project's thread (unipty, openspecui, …) without scanning the flat
  newest-first index. Every group is a plain static page: the tag list
  and each group's membership are computed at build time from the same
  deduped listing the index renders (tagsForLocale → postsForLocale),
  so no group can ever list the same article twice. Tag names are
  frontmatter data (repo names) and stay untranslated in every locale —
  only the chrome around them localizes.
-->
<script lang="ts">
  import { tagsForLocale } from '$lib/blog';
  import { dict, localeHref, type Locale } from '$lib/i18n';

  let { locale }: { locale: Locale } = $props();

  const t = $derived(dict[locale]);
  const groups = $derived(tagsForLocale(locale));
</script>

<svelte:head>
  <title>{t.blogTags.title}</title>
  <meta name="description" content={t.blogTags.metaDescription} />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label={t.blogTags.heading}>
  <!-- min-w-0 + flex-wrap: tracked uppercase headings wrap instead of
       overflowing on narrow locales (fix D.3) -->
  <h1 class="font-nav flex min-w-0 flex-wrap items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    {t.blogTags.heading}
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h1>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    {t.blogTags.summary}
  </p>

  <nav class="mt-6" aria-label={t.chrome.breadcrumbLabel} data-reveal="">
    <a
      href={localeHref(locale, '/blog/')}
      class="hover:text-primary font-nav text-muted-foreground text-[10.5px] uppercase tracking-[0.12em] transition-colors"
    >
      {t.chrome.navBlog} →
    </a>
  </nav>

  <ul class="mt-3 divide-y divide-border/60" data-reveal="">
    {#each groups as group (group.tag)}
      {@const href = localeHref(locale, `/blog/tags/${group.tag}/`)}
      <li class="group">
        <a {href} class="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4">
          <!-- bdi: a tag is frontmatter data (a repo name), never
               translated — isolate it so the Latin token keeps its
               shape inside RTL chrome -->
          <h2 class="group-hover:text-primary text-lg font-semibold transition-colors">
            <bdi>{group.tag}</bdi>
          </h2>
          <span class="text-muted-foreground font-nav ms-auto text-xs">{t.blogTags.postCount(group.posts.length)}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>
