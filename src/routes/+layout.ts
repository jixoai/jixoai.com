// Orthogonal intents (maintained 2026-09-06): whole-site prerender
// declaration (adapter-static contract — every route prerenders); URL
// shape — trailingSlash 'always' since 2026-09-06 so the grown route
// tree (/projects/<slug>/, /blog/<slug>/) emits directory/index.html,
// servable by both GitHub Pages and a plain file server.
export const prerender = true;
export const trailingSlash = 'always';
