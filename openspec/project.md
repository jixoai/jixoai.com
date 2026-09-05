# jixoai.com

The jixoai organization hub site — pure static (SvelteKit + adapter-static,
GitHub Pages). Mission + flagship projects with build-time release versions,
config-driven sub-site links, and a static blog.

Conventions:

- Sites in the jixoai family take their identity from the `@jixoai`
  registry (jixoai-ui CLI; this repo's hue is 0 — the organization red).
- Build-time data (release versions, README sources) is fetched by
  `scripts/fetch-projects.mjs` into gitignored generated files; the static
  output must never require a server runtime.
- OpenSpec changes live under `openspec/changes/`.
