<!--
  Blog index surface (src/lib/pages/blog-page.svelte) — rendered by the
  root route (en) and every /[lang]/ mirror.

  Orthogonal intents (maintained 2026-09-06): the pure-static blog
  surface — build-time discovered markdown under content/blog/, listed
  newest first, every post prerendered (blog spec). Zero server runtime,
  zero client fetches. 2026-09-06 nine-locales: chrome copy from the
  locale dictionary; posts render as-authored under every locale and the
  index lists all of them (localization tier 3).
-->
<script lang="ts">
  import { blogPosts, displayDate } from '$lib/blog';
  import { dict, localeHref, type Locale } from '$lib/i18n';

  let { locale }: { locale: Locale } = $props();

  const t = $derived(dict[locale]);
</script>

<svelte:head>
  <title>{t.blogIndex.title}</title>
  <meta name="description" content={t.blogIndex.metaDescription} />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label={t.blogIndex.heading}>
  <h1 class="font-nav flex items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    {t.blogIndex.heading}
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h1>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    {t.blogIndex.summary}
  </p>

  <ul class="mt-6 divide-y divide-border/60" data-reveal="">
    {#each blogPosts as post (post.slug)}
      <li>
        <a href={localeHref(locale, `/blog/${post.slug}/`)} class="group block py-5">
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <time datetime={post.date} class="font-nav text-primary text-xs tracking-[0.14em]">{displayDate(post.date)}</time>
            <h2 class="group-hover:text-primary text-lg font-semibold transition-colors">{post.title}</h2>
            <span class="text-muted-foreground font-nav ms-auto text-xs">{post.author}</span>
          </div>
          {#if post.description}
            <p class="text-muted-foreground mt-1.5 max-w-[72ch] text-pretty text-[13px] leading-6">{post.description}</p>
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
