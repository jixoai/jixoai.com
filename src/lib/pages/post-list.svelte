<!--
  Post list surface (src/lib/pages/post-list.svelte) — the one renderer
  behind every blog listing: the /blog/ index, and (2026-09-08) each
  prerendered /blog/tags/<tag>/ group.

  Orthogonal intents: cards minted from the build-time post map — date,
  localized title, language badge, release pill, author; tags are
  links into the tag-grouping axis (2026-09-08). 2026-09-06 mobile
  audit: locale-first listing — the UI locale's posts lead, the rest
  follow by date with a language badge, and each summary carries its
  authored language's bidi direction (no punctuation drift on RTL
  surfaces). 2026-09-07 walkthrough fixes: B — the caller passes the
  deduped postsForLocale output (one variant per base slug); D.3 — the
  heading wraps on narrow locales; D.4 — ISO dates are LTR islands;
  F — the badge tooltip names the language in the UI locale (the badge
  itself keeps the autonym, the marker convention).

  Extracted 2026-09-08 so the tag pages cannot drift from the index —
  one card, one place.
-->
<script lang="ts">
  import { postDir, postLang, displayDate, postRelease, type BlogPost } from '$lib/blog';
  import { dict, localeHref, type Locale } from '$lib/i18n';

  let { posts, locale }: { posts: readonly BlogPost[]; locale: Locale } = $props();

  const t = $derived(dict[locale]);
</script>

<ul class="divide-y divide-border/60" data-reveal="">
  {#each posts as post (post.slug)}
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
      {#if post.description}
        <a href={href} class="block">
          <p class="text-muted-foreground mt-1.5 max-w-[72ch] text-pretty text-[13px] leading-6" dir={postDir(post)} lang={postLang(post)}>{post.description}</p>
        </a>
      {/if}
      {#if post.tags.length > 0}
        <!-- outside the card anchor: a link inside a link is invalid
             markup, and the tag row IS a link row since 2026-09-08 -->
        <p class="font-nav text-muted-foreground/80 mt-2 flex flex-wrap gap-2 text-[10.5px] uppercase tracking-[0.12em]">
          {#each post.tags as tag (tag)}
            <a
              href={localeHref(locale, `/blog/tags/${tag}/`)}
              class="border-border hover:border-primary hover:text-primary border px-1.5 py-0.5 transition-colors"
            >
              {tag}
            </a>
          {/each}
        </p>
      {/if}
    </li>
  {/each}
</ul>
