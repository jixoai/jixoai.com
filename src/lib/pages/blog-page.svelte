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
-->
<script lang="ts">
  import { postsForLocale, postDir, postLang, displayDate, postRelease } from '$lib/blog';
  import { dict, localeHref, type Locale } from '$lib/i18n';

  let { locale }: { locale: Locale } = $props();

  const t = $derived(dict[locale]);
  const listing = $derived(postsForLocale(locale));
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

  <ul class="mt-6 divide-y divide-border/60" data-reveal="">
    {#each listing as post (post.slug)}
      {@const release = postRelease(post)}
      {@const href = localeHref(locale, `/blog/${post.slug}/`)}
      {@const foreign = postLang(post) !== locale}
      {@const foreignName = t.langNames[postLang(post)] ?? dict[postLang(post)].label}
      <li class="group py-5">
        <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <!-- dir="ltr": the ISO date is a hard-LTR island (fix D.4) -->
          <time datetime={post.date} dir="ltr" class="font-nav text-primary text-xs tracking-[0.14em]">{displayDate(post.date)}</time>
          <h2 class="group-hover:text-primary text-lg font-semibold transition-colors"><a href={href}>{post.title}</a></h2>
          {#if foreign}
            <span
              class="border-border text-muted-foreground font-nav border px-1.5 py-0.5 text-[10.5px] tracking-[0.12em]"
              title={t.blogPost.writtenIn(foreignName)}
            >
              {dict[postLang(post)].label}
            </span>
          {/if}
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
          <span class="text-muted-foreground font-nav ms-auto text-xs">{post.author}</span>
        </div>
        <a href={href} class="block">
          {#if post.description}
            <p class="text-muted-foreground mt-1.5 max-w-[72ch] text-pretty text-[13px] leading-6" dir={postDir(post)} lang={postLang(post)}>{post.description}</p>
          {/if}
          {#if post.tags.length > 0}
            <p class="font-nav text-muted-foreground/80 mt-2 flex flex-wrap gap-2 text-[10.5px] uppercase tracking-[0.12em]">
              {#each post.tags as tag (tag)}
                <span class="border-border border px-1.5 py-0.5">{tag}</span>
              {/each}
            </p>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
</section>
