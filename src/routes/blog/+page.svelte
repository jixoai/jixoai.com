<!--
  Blog index (src/routes/blog/+page.svelte).

  Orthogonal intents (maintained 2026-09-06): the pure-static blog
  surface — build-time discovered markdown under content/blog/, listed
  newest first, every post prerendered (blog spec). Zero server runtime,
  zero client fetches.
-->
<script lang="ts">
  import { blogPosts, displayDate } from '$lib/blog';
</script>

<svelte:head>
  <title>Blog — jixoai</title>
  <meta
    name="description"
    content="The jixoai lab blog: relaunch notes, architecture decisions, and fleet announcements — written by the maintainers, published as plain static pages."
  />
</svelte:head>

<section class="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8" aria-label="Blog">
  <h1 class="font-nav flex items-baseline gap-4 text-lg uppercase tracking-[0.3em]" data-reveal="">
    Blog
    <span class="bg-border h-px flex-1" aria-hidden="true"></span>
  </h1>
  <p class="text-muted-foreground mt-3 max-w-[62ch] text-pretty text-[13px] leading-6" data-reveal="">
    Notes from the lab — written by the maintainers, rendered at build time, served as plain
    static pages. No server, no client fetches, no tracking.
  </p>

  <ul class="mt-6 divide-y divide-border/60" data-reveal="">
    {#each blogPosts as post (post.slug)}
      <li>
        <a href="/blog/{post.slug}/" class="group block py-5">
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <time datetime={post.date} class="font-nav text-primary text-xs tracking-[0.14em]">{displayDate(post.date)}</time>
            <h2 class="group-hover:text-primary text-lg font-semibold transition-colors">{post.title}</h2>
            <span class="text-muted-foreground font-nav ml-auto text-xs">{post.author}</span>
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
