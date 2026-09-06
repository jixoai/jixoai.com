/**
 * Locale resolution (src/lib/i18n/index.ts).
 *
 * Orthogonal intents (maintained 2026-09-06): locale enumeration —
 * en lives at the root (canonical, stable URLs), the other eight at
 * /[lang]/ mirrors; route helpers — pathname ⇄ locale-aware href
 * conversion (nav links, language switcher, hreflang alternates all
 * derive from these, never hand-built prefixes); dictionary access —
 * the per-locale content module.
 *
 * Original request (2026-09-06): nine-locale hub surface
 * (openspec/changes/2026-09-06-site-i18n-nine-locales) — pattern
 * borrowed from the dweb bilingual site, generalized to nine.
 */

import { ar } from './locales/ar';
import { de } from './locales/de';
import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { ja } from './locales/ja';
import { ko } from './locales/ko';
import { ru } from './locales/ru';
import { zh } from './locales/zh';
import type { Dictionary } from './schema';

export const LOCALES = ['en', 'zh', 'es', 'fr', 'de', 'ru', 'ja', 'ko', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

/** en serves from `/` — only these eight own a /[lang]/ mirror (the
 *  route matcher consumes the same list). */
export const PREFIXED_LOCALES: readonly Exclude<Locale, 'en'>[] = [
  'zh', 'es', 'fr', 'de', 'ru', 'ja', 'ko', 'ar',
];

export const DEFAULT_LOCALE: Locale = 'en';

export const dict: Record<Locale, Dictionary> = { en, zh, es, fr, de, ru, ja, ko, ar };

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/**
 * Normalize a pathname into route space: strip the kit base (empty on
 * the CNAME deployment, a subpath on Pages) and a leading /[lang]/
 * mirror prefix, returning the remainder (always `/`-prefixed). The
 * inverse of {@link localeHref}.
 */
export function routeOfPath(pathname: string, base = ''): string {
  let route = pathname;
  if (base !== '' && route.startsWith(base)) route = route.slice(base.length);
  if (!route.startsWith('/')) route = `/${route}`;
  const [, first = '', ...rest] = route.split('/');
  if (first && (PREFIXED_LOCALES as readonly string[]).includes(first)) {
    route = `/${rest.join('/')}`;
  }
  return route || '/';
}

/** Pathname → locale (`/zh/…` → zh; `/` and unknown prefixes → en). */
export function localeOfPath(pathname: string, base = ''): Locale {
  let route = pathname;
  if (base !== '' && route.startsWith(base)) route = route.slice(base.length);
  if (!route.startsWith('/')) route = `/${route}`;
  const first = route.split('/')[1] ?? '';
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

/** Locale-aware href: `/projects/` under zh → `/zh/projects/`; en →
 *  the bare route (root stability). */
export function localeHref(locale: Locale, route: string): string {
  const suffix = route.startsWith('/') ? route : `/${route}`;
  return locale === DEFAULT_LOCALE ? suffix : `/${locale}${suffix === '/' ? '/' : suffix}`;
}

export interface AlternateLink {
  code: Locale | 'x-default';
  href: string;
}

/** hreflang alternates for a route: all nine locales + x-default →
 *  the en (root) URL. Absolute, per the localization spec. */
export function hreflangFor(siteUrl: string, route: string, base = ''): AlternateLink[] {
  return [
    ...LOCALES.map((code) => ({
      code,
      href: `${siteUrl}${base}${localeHref(code, route)}`,
    })),
    { code: 'x-default', href: `${siteUrl}${base}${localeHref(DEFAULT_LOCALE, route)}` },
  ];
}

/** Language-switcher entry list for a route (nine entries, current-page
 *  preserving). */
export function switcherLocalesFor(route: string): { code: Locale; label: string; href: string }[] {
  return LOCALES.map((code) => ({
    code,
    label: dict[code].label,
    href: localeHref(code, route),
  }));
}
