// Orthogonal intents (maintained 2026-09-06): the single server hook —
// render-time substitution of the app.html root-element placeholders
// with the route's locale (language + text direction). Prerendering
// runs through the same handle pipeline, so every static artifact
// ships with the real attrs — no client-side patching, no flash.
//
// Original request (2026-09-06): nine-locale hub surface incl. RTL
// Arabic — pattern borrowed from the dweb bilingual site, extended
// with the direction placeholder.
import type { Handle } from '@sveltejs/kit';
import { dict, localeOfPath } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
  const locale = localeOfPath(event.url.pathname);
  const { htmlLang, dir } = dict[locale];
  return resolve(event, {
    // replaceAll (not first-match): if a placeholder literal ever
    // reappears further down the document, the first hit still lands
    // on the root element where it belongs — and a literal inside a
    // comment only rewrites that comment, never the element.
    transformPageChunk: ({ html }) =>
      html.replaceAll('%lang%', htmlLang).replaceAll('%dir%', dir),
  });
};
