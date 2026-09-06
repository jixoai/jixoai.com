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
  grammar as the projects grid / blog index card). 2026-09-06 mobile
  audit: a one-time notice renders when the UI locale differs from the
  post's authored language (the body itself stays as-authored, and its
  container lang follows the content language).
  2026-09-07 walkthrough fixes: D.4 — the header ISO date is an LTR
  island; F — the notice names the authored language in the UI locale
  (langNames, e.g. en shows "Chinese") and links the mirrored sibling
  post (slug ± "-en") when it exists.
-->
<script lang="ts">
  import { blogPostBySlug, displayDate, postLang, postDir, postRelease, type BlogPost } from '$lib/blog';
  import { dict, localeHref, type Locale } from '$lib/i18n';

  let { post, html, locale }: { post: BlogPost; html: string; locale: Locale } = $props();

  const t = $derived(dict[locale]);
  const release = $derived(postRelease(post));
  const lang = $derived(postLang(post));

  // Mirror sibling (fix F): the -en convention pairs every zh post with
  // its English translation; the link renders only when the sibling
  // actually ships.
  const mirrorSlug = $derived(
    post.slug.endsWith('-en') ? post.slug.slice(0, -'-en'.length) : `${post.slug}-en`,
  );
  const mirror = $derived(blogPostBySlug.get(mirrorSlug) ?? null);
  const mirrorLang = $derived(mirror ? postLang(mirror) : null);
  const mirrorName = $derived(
    mirrorLang ? (t.langNames[mirrorLang] ?? dict[mirrorLang].label) : '',
  );
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
      <!-- dir="ltr": the ISO date is a hard-LTR island (fix D.4) -->
      <time datetime={post.date} dir="ltr">{displayDate(post.date)}</time>
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
      <p class="text-muted-foreground mt-3 text-pretty text-[13px] leading-6" dir={postDir(post)} lang={lang}>{post.description}</p>
    {/if}
  </header>

  {#if lang !== locale}
    <!-- one-time mismatch notice: the chrome speaks the UI locale, the
         article below stays in its authored language. The language name
         renders in the UI locale (langNames); when the mirrored sibling
         post exists, the notice links across (fix F). -->
    <p class="text-muted-foreground mt-6 flex flex-wrap items-center gap-3 text-[13px]" data-reveal="">
      <span class="border-border font-nav border px-1.5 py-0.5 text-[10.5px] tracking-[0.12em]">
        {t.blogPost.writtenIn(t.langNames[lang] ?? dict[lang].label)}
      </span>
      {#if mirror && mirrorLang}
        <a
          href={localeHref(locale, `/blog/${mirrorSlug}/`)}
          class="hover:text-primary underline-offset-4 transition-colors hover:underline"
        >
          {t.blogPost.readIn(mirrorName)}
        </a>
      {/if}
    </p>
  {/if}

  <div class="markdown-body mt-8" lang={lang} dir={postDir(post)}>
    {@html html}
  </div>
</article>
